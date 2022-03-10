const router = require('express').Router();

router.route('/').get( async (req, res, next) => {
    try {
        let districtId = parseInt(req.query.district);
        let fiscalYear = req.query.year;
        let fyParsed = parseInt(fiscalYear);
        let flag = false;
        let query = '';

        console.log(req.query.district);
        console.log(req.query.year);

        if (isNaN(districtId)) {
            flag = true;
            res.json({error: "District id must be a number"});
        }
        if (typeof(fiscalYear) == 'string' && fiscalYear == "any") {
            query = 'MATCH (d:District)<-[:BELONGS_TO]-(t) WHERE id(d)=$id RETURN t LIMIT 51'
        } 
        else if (!isNaN(fyParsed)) {
            query = 'MATCH (d:District)<-[:BELONGS_TO]-(t{Fiscal_Year:$fy}) WHERE id(d)=$id RETURN t LIMIT 51'
        } 
        else {
            flag = true;
            res.json({error: "Fiscal year must be a number or 'any'."});
        }

        if (flag == false) {
            // console.log(fyParsed);
            const results = await res.locals.neo4jSession.readTransaction(
                tx => tx.run(query, {'id': districtId, 'fy': fyParsed}));
            const resultsArr = [];
            results.records.forEach(element => {
                resultsArr.push(element._fields[0].properties);
            });
            res.json({data: resultsArr});
        }
    }
    catch {
        next();
    }
});

module.exports = router;