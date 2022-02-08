import { Injectable } from '@angular/core';
import { Transaction } from 'src/shared/transaction';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { auth, driver, Driver, ServerInfo, Session } from 'neo4j-driver';

@Injectable({
  providedIn: 'root'
})
export class Neo4jService {
// private neo4jUrl = 'http://localhost:7474/db/data/transaction/commit';
  private neo4jUrl: string = 'neo4j+s://e5f3f164.databases.neo4j.io:7687';
  static driver: Driver;


  constructor() {}

  // constructor(private http: HttpClient) { }

  // getTransactions(): Observable<any> {
  //   const headers = {'content-type': 'application/json', 'Authorization': 'Basic Ynlyb246cGFzc3dvcmQ='}
  //   const body = {
  //     "statements":[
  //       { 
  //         "statement": "MATCH (n:FullTransaction) WHERE n.Fund = $fund RETURN n",
  //        "parameters": {
  //           "fund":"209"
  //        }
  //       }
  //     ]
  //   }
  //   var r = this.http.post<any>(this.neo4jUrl, body, {'headers':headers});
  //   return r;
  // }

  private static createDriver(): Driver {
    return driver(
      'neo4j+s://e5f3f164.databases.neo4j.io:7687',
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
