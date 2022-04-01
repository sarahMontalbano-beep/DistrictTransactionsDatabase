const auth = require('../../middleware/authentication');

const router = require('express').Router();

router.route('/query').post( async (req, res, next) => {
    if (!res.locals.user) {
        res.status(401).send({ detail: 'Unauthorized user' });
    }
    else {
        try {
            let query = req.body.query ?? '';
            let queryLower = query.toLowerCase();

            if (queryLower && queryLower.indexOf('set') == -1 && queryLower.indexOf('create') == -1 
            && queryLower.indexOf('delete') == -1) {
                const results = await res.locals.neo4jSession.readTransaction(
                    tx => tx.run(query));
                const resultsArr = [];
                results.records.forEach(element => {
                    resultsArr.push(element._fields[0].properties);
                });
                let data = {results: resultsArr, summary: results.summary}
                res.json({data: data});
            }
            else {
                const result = await res.locals.neo4jSession.writeTransaction(
                    tx => tx.run(query));
                res.json({result: result});
            }
        }
        catch {
            next();
        }
    }
});

module.exports = router;