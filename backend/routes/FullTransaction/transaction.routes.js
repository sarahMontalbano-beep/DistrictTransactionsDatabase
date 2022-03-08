const router = require('express').Router();

router.route('/').get( async (req, res, next) => {
    const results = await res.locals.neo4jSession.run('MATCH (t:FullTransaction) RETURN t LIMIT 25');
    console.log(results);

    res.json({transactions: results});
});

module.exports = router;