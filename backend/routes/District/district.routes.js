const router = require('express').Router();

// async function getFiscalYears(req, res, district) {

//     const key = 'FY__'

//     const years = await req.app.locals.redisClient.get(key + district.id.toString());
    
    // if (years == null) {
    //     let query = 'MATCH (t:FullTransaction{District_Name:$district})-[:OCCURRED_IN]->(fy) RETURN DISTINCT fy.FiscalYear';
    //     let tempSesh = Database.createSession();
    //     const results = await tempSesh.readTransaction(
    //         tx => tx.run(query, {'district': district.District_Name}));
    //     const resultsArr = [];
    //     results.records.forEach(element => {
    //         resultsArr.push(element._fields[0]);
    //     });
    //     tempSesh.close();
    //     await req.app.locals.redisClient.set(key + district.id.toString(), JSON.stringify(resultsArr));
    //     return resultsArr;
    // }
    // else {
    //     return JSON.parse(years);
    // }

// }

router.route('/').get( async (req, res, next) => {
    // let fy = await getFiscalYears(req, res, {id: 243, District_Name:"Alaska Gateway School District"});
    // res.json({results:fy});
    const districts = await req.app.locals.redisClient.get('districts');
    
    if (districts == null) {
        const results = await res.locals.neo4jSession.readTransaction(
            tx => tx.run('MATCH (d:District) RETURN d'));
        const resultsArr = [];
        results.records.forEach(element => {
            tempDict = element._fields[0].properties;
            tempDict['id'] = element._fields[0].identity;
            resultsArr.push(tempDict);
        });
        await req.app.locals.redisClient.set('districts', JSON.stringify({districts: resultsArr}));
        res.json({data: resultsArr});
    }
    else {
        res.json({data: JSON.parse(districts)});
    }
});

module.exports = router;