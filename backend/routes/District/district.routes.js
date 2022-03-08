const router = require('express').Router();

router.route('/').get( async (req, res, next) => {
    const districts = await req.app.locals.redisClient.get('districts');
    

    if (districts == null) {
        const results = await res.locals.neo4jSession.run('MATCH (d:District) RETURN d');
        const resultsArr = [];
        results.records.forEach(element => {
            resultsArr.push(element._fields[0].properties);
        });
        // const resultsjson = 
        await req.app.locals.redisClient.set('districts', JSON.stringify({districts: resultsArr}));
        res.json({neo4j: results, mod: resultsArr});
    }
    else {
        res.json({redis: districts});
    }
});

module.exports = router;