// import { auth, driver } from 'neo4j-driver';
const { auth, driver } = require('./../node_modules/neo4j-driver');
// import { environment } from '../environments/environment';

// This class was heavily inspired by https://github.com/CharlBest/nean-stack-starter

class Database {

  static driver;

  static createDriver() {
    return driver(
      'neo4j://localhost:7687',
      auth.basic('byron', 'newpassword'),
      {
        disableLosslessIntegers: true,
      }
    );
  }

  static createSession() {
    if (!this.driver) {
      this.driver = this.createDriver();
    }

    return this.driver.session({
      database: 'neo4j'
    });
  }

  static clearDriver() {
    if (this.driver) {
      this.driver.close();
    }
  }

}

module.exports = { Database };
