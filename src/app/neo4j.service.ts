import { Injectable } from '@angular/core';
import { auth, driver, Driver, ServerInfo, Session } from 'neo4j-driver';

@Injectable({
  providedIn: 'root'
})
export class Neo4jService {
  //Neo4j Aura
  // private neo4jUrl: string = 'neo4j://localhost:7687';
  //Local
  private neo4jUrl: string = 'neo4j+s://e5f3f164.databases.neo4j.io:7687';
  
  static driver: Driver;


  constructor() {}

  private static createDriver(): Driver {
    // if (!this.driver){
      this.driver = driver(
        'neo4j://localhost:7687',
          auth.basic('byron', 'newpassword'),
          {
              disableLosslessIntegers: true,
          }
      );
    // }
    return this.driver;
  }

  static createSession(): Session {
      if (!this.driver) {
          this.driver = this.createDriver();
      }

      return this.driver.session({
          database: 'neo4j'
      });
  }

  async getTransactions(district: string, fy: string): Promise<Object[]> {
    let d = Neo4jService.createDriver();
    let session = Neo4jService.createSession();
    
    let transactions: Object[] = [];

    let query = 'MATCH (t:FullTransaction) RETURN t LIMIT 25';

    if (district!='' || fy!='') {
      query = 'MATCH (t:FullTransaction {District_Name:$dis, Fiscal_Year:$fy}) RETURN t LIMIT 25';
    }

    try {
      const result = await session.readTransaction(tx =>
        tx.run(query, {'dis': district, 'fy': fy})
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

  async getDistricts(): Promise<any[]> {
    let d = Neo4jService.createDriver();
    let session = Neo4jService.createSession();
    
    let districts: Object[] = [];

    try {
      const result = await session.readTransaction(tx =>
        tx.run('MATCH (d:District) RETURN d;')
      )

      const records = result.records
      for (let i = 0; i < records.length; i++) {
        const title = records[i].get(0).properties;
        districts.push(title);
      }

    } finally {
      session.close();
      d.close();
    }

    return districts;
  }

  async getFiscalYears(district: string): Promise<any[]> {
    let d = Neo4jService.createDriver();
    let session = Neo4jService.createSession();
    
    let years: Object[] = [];

    let query = 'MATCH (d:FullTransaction)-[OCCURRED_IN]->(fy:Fiscal_Year) RETURN DISTINCT fy'

    if (district!='') {
      query = 'MATCH (d:FullTransaction{District_Name:$dn})-[OCCURRED_IN]->(fy:Fiscal_Year) RETURN DISTINCT fy'
    }

    try {
      const result = await session.readTransaction(tx =>
        tx.run(query, {'dn':district})
      )
  
      const records = result.records
      for (let i = 0; i < records.length; i++) {
        const title = records[i].get(0).properties;
        years.push(title);
      }
  
    } finally {
      session.close();
      d.close();
    } 
  
    return years;
  }

}
