const router = require('express').Router();

async function getDistrictNames(req, res) {

  const districtNames = await req.app.locals.redisClient.get('districtNames');

  if (districtNames == null) {
    const results = await res.locals.neo4jSession.run('MATCH (d:District) RETURN d.District_Name');
    const resultsArr = [];
    results.records.forEach(element => {
      resultsArr.push(element._fields[0]);
    });
    await req.app.locals.redisClient.set('districtNames', JSON.stringify(resultsArr));
    return resultsArr;
  }
  else {
    return JSON.parse(districtNames);
  }

}

router.route('/getbydistrict').get( async (req, res, next) => {
  try {
    let districtName = req.query.district;
    let flag = false;
    let query = 'MATCH (t:FullTransaction{District_Name:$district})-[:OCCURRED_IN]->(fy) RETURN DISTINCT fy.FiscalYear';

    let districtNames = await getDistrictNames(req, res);

    if (districtNames.indexOf(districtName) == -1) {
      flag = true;
      res.json({error: "District name is not valid."});
    }

    const key = 'FY__'

    // console.log(key + districtName.replaceAll(' ', ''));

    const years = await req.app.locals.redisClient.get(key + districtName.replaceAll(' ', ''));

    if (flag == false && years==null) {
      const results = await res.locals.neo4jSession.readTransaction(
        tx => tx.run(query, {'district': districtName,}));
      const resultsArr = [];
      results.records.forEach(element => {
        resultsArr.push(element._fields[0]);
      });
      await req.app.locals.redisClient.set(key + districtName.replaceAll(' ', ''), JSON.stringify(resultsArr));
      res.json({data: resultsArr});
    }
    else {
      return res.json({data: JSON.parse(years)});
    }
  }
  catch {
    next();
  }
});

module.exports = router;
