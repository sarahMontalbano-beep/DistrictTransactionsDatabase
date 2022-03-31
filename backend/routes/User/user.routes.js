const router = require('express').Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

router.route('/login').post( async (req, res, next) => {
  try{
    let body = req.body;
    let username = body.username;
    let password = body.password;

    let user = null;

    const results = await res.locals.neo4jSession.readTransaction(
      tx => tx.run('MATCH (u:User {username:$username}) RETURN u LIMIT 5;', {'username': username}));

    if (results.records.length == 0) {
      res.status(401).json({msg: "Authorization failed"});
    }

    user = results.records[0]._fields[0].properties;
    if (!user || !(await bcrypt.compare(password, user.password))) {
      res.status(401).json({msg: "Authorization failed"});
    }
    else {
      const tokenData = {
        username: user.username,
        password: user.password
      };

      token = jwt.sign(
        {
          exp: Math.floor(Date.now() / 1000) + (60*60), /* 60 minute */
          data: tokenData
        },
        '37C0-E231-E1F5-C407-80AA-94B8-F7AE-E4BB',
        {
          issuer: process.env.ISSUER_NAME
        });

      res.status(200).json({
        token: token,
        expiresIn: 3600
      });
    }
  }
  catch (e) {
    console.log(e);
    next();
  }
});

module.exports = router;
