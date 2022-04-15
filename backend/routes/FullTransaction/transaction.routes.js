const router = require('express').Router();

router.route('/').get( async (req, res, next) => {
    try {
        let districtId = parseInt(req.query.district);
        let fiscalYear = req.query.year;
        let fyParsed = parseInt(fiscalYear);
        let flag = false;
        let query = '';

        let startDate = req.query?.startDate;
        let endDate = req.query?.endDate;

        let parsedStartDate = startDate? Date.parse(startDate): 0;
        let parsedEndDate = startDate? Date.parse(endDate):0;

        let minAmount = parseInt(req.query?.minAmount);
        let maxAmount = parseInt(req.query?.maxAmount);

        // console.log(req.query.district);
        // console.log(req.query.year);
        // console.log(startDate);
        // console.log(e    ndDate);
        // console.log(parsedStartDate);
        // console.log(parsedEndDate);
        // console.log(minAmount);
        // console.log(maxAmount);

        if (isNaN(districtId)) {
            flag = true;
            res.json({error: "District id must be a number"});
        }
        if (typeof(fiscalYear) == 'string' && fiscalYear == "Any") {
            query = 'MATCH (d:District)<-[:BELONGS_TO]-(t) WHERE id(d)=$id '
        } 
        else if (!isNaN(fyParsed)) {
            query = 'MATCH (d:District)<-[:BELONGS_TO]-(t{Fiscal_Year:$fy}) WHERE id(d)=$id '
        } 
        else {
            flag = true;
            res.json({error: "Fiscal year must be a number or 'any'."});
        }

        if (parsedStartDate > 0) {
            query += 'AND apoc.date.parse(apoc.convert.toString(t.Date), "ms", "yyyy-MM-dd")>=$startDate ';
        }

        if (parsedEndDate > 0) {
            query += 'AND apoc.date.parse(apoc.convert.toString(t.Date), "ms", "yyyy-MM-dd")<=$endDate ';
        }

        if (!isNaN(minAmount)) {
            query += 'AND (t.Credit >= $minAmount OR t.Debit >= $minAmount OR t.Amount >= $minAmount) ';
        }

        if (!isNaN(maxAmount)) {
            query += 'AND (t.Credit <= $maxAmount OR t.Debit <= $maxAmount OR t.Amount <= $maxAmount) '
        }

        query += "RETURN t LIMIT 5001"

        let params = {'id': districtId, 'fy': fyParsed, 'startDate': parsedStartDate,
        'endDate':parsedEndDate, 'minAmount': minAmount, 'maxAmount': maxAmount}

        // console.log(query);

        if (flag == false) {
            // console.log(fyParsed);
            const results = await res.locals.neo4jSession.readTransaction(
                tx => tx.run(query, params));
            const resultsArr = [];
            results.records.forEach(element => {
                resultsArr.push(element._fields[0].properties);
            });
            // console.log(results)
            res.json({data: resultsArr});
        }
    }
    catch {
        next();
    }
});

module.exports = router;