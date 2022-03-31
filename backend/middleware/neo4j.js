// import { Database } from '../database';
const database = require('../database');

// This class was heavily inspired by https://github.com/CharlBest/nean-stack-starter

class Neo4j {

  static sessionSetup(req, res, next) {
    if (!res.locals.neo4jSession) {
      res.locals.neo4jSession = database.Database.createSession();
    }
    next();
  }

  static sessionCleanup(req, res, next) {
    res.on('finish', () => {
      if (res.locals.neo4jSession) {
        res.locals.neo4jSession.close();
        delete res.locals.neo4jSession;
      }
    });
    next();
  }
}

module.exports = {Neo4j};
