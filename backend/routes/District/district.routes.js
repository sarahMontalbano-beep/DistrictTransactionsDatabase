const router = require('express').Router();
const database = require('../../database');

async function getFiscalYears(req, res, district) {

    const key = 'FY__'

    const years = await req.app.locals.redisClient.get(key + district.id.toString());
    
    if (years == null) {
        let query = 'MATCH (t:FullTransaction{District_Name:$district})-[:OCCURRED_IN]->(fy) RETURN DISTINCT fy.FiscalYear';
        let tempSesh = database.Database.createSession();
        const results = await tempSesh.readTransaction(
            tx => tx.run(query, {'district': district.District_Name}));
        const resultsArr = [];
        results.records.forEach(element => {
            resultsArr.push(element._fields[0]);
        });
        tempSesh.close();
        await req.app.locals.redisClient.set(key + district.id.toString(), JSON.stringify(resultsArr));
        return resultsArr;
    }
    else {
        return JSON.parse(years);
    }

}

async function addHasDataField(req, res, districtList) {
    console.log(districtList.districts.length);
    let tempList = [];
    for (let dist of districtList.districts){
        let data = await getFiscalYears(req, res, dist);
        dist.hasData = (data.length == 0);
        tempList.push(dist);
        // console.log(dist);
    }

    return tempList;
}

router.route('/').get( async (req, res, next) => {
    // let fy = await getFiscalYears(req, res, {id: 243, District_Name:"Alaska Gateway School District"});
    // res.json({results:fy});
    let districts = await req.app.locals.redisClient.get('districts');
    
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
        resultsArr = await addHasDataField(req, res, {districts: resultsArr});
        res.json({data: {districts:resultsArr}});
    }
    else {
        districts = await addHasDataField(req, res, JSON.parse(districts));
        res.json({data: {districts:districts}});
    }
});

module.exports = router;