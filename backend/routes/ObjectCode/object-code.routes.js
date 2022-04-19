const router = require('express').Router();

router.route('/aggregate').get( async (req, res, next) => {
    try {
        let districtId = parseInt(req.query.district);
        let fiscalYear = req.query.year;
        let fyParsed = parseInt(fiscalYear);
        let flag = false;
        let query = '';

        if (isNaN(districtId)) {
            flag = true;
            res.json({error: "District id must be a number"});
        }
        if (typeof(fiscalYear) == 'string' && fiscalYear == "Any") {
            query = 'MATCH (d:District)<-[:BELONGS_TO]-(t) WHERE id(d)=$id RETURN sum(t.Amount), sum(t.Credit), sum(t.Debit), t.Object_Code'
        } 
        else if (!isNaN(fyParsed)) {
            query = 'MATCH (d:District)<-[:BELONGS_TO]-(t{Fiscal_Year:$fy}) WHERE id(d)=$id RETURN sum(t.Amount), sum(t.Credit), sum(t.Debit), t.Object_Code'
        } 
        else {
            flag = true;
            res.json({error: "Fiscal year must be a number or 'any'."});
        }

        // console.log(query);

        if (flag == false) {
            // console.log(fyParsed);
            const results = await res.locals.neo4jSession.readTransaction(
                tx => tx.run(query, {'id': districtId, 'fy': fyParsed}));
            const resultsArr = [];
            results.records.forEach(element => {
                resultsArr.push({'name':element._fields[3].toString(), 'value':Math.max(element._fields[0],element._fields[1],element._fields[2])});
            });
            // console.log(results)
            // res.json({data:results});
            res.json({data: resultsArr});
        }
    }
    catch {
        next();
    }
});

module.exports = router;