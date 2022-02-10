import { Injectable } from '@angular/core';
import { Transaction } from 'src/shared/transaction';
import { auth, driver, Driver, ServerInfo, Session } from 'neo4j-driver';

@Injectable({
  providedIn: 'root'
})
export class Neo4jService {
  //Neo4j Aura
  // private neo4jUrl: string = 'neo4j+s://e5f3f164.databases.neo4j.io:7687';
  //Local
  private neo4jUrl: string = 'neo4j+s://e5f3f164.databases.neo4j.io:7687';
  
  static driver: Driver;


  constructor() {}

  private static createDriver(): Driver {
    return driver(
      'neo4j://localhost:7687',
        auth.basic('byron', 'newpassword'),
        {
            disableLosslessIntegers: true,
        }
    );
  }

  static createSession(): Session {
      if (!this.driver) {
          this.driver = this.createDriver();
      }

      return this.driver.session({
          database: 'neo4j'
      });
  }

  async getTransactions(): Promise<Object[]> {
    let d = Neo4jService.createDriver();
    let session = Neo4jService.createSession();
    
    let transactions: Object[] = [];

    try {
      const result = await session.readTransaction(tx =>
        tx.run('MATCH (t:FullTransaction) RETURN t LIMIT 25')
      )

      const records = result.records
      for (let i = 0; i < records.length; i++) {
        const title = records[i].get(0).properties;
        transactions.push(title);
      }

    } finally {
      session.close();
      d.close();
    }

    return transactions;
  }

}
