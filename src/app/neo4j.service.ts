import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { auth, driver, Driver, ServerInfo, Session } from 'neo4j-driver';

@Injectable({
  providedIn: 'root'
})
export class Neo4jService {

  constructor(private httpClient: HttpClient) {}

  async getTransactions(district: string, fy: string): Promise<any> {
    
    let transactions: Object[] = [];

    let query = 'MATCH (t:FullTransaction) RETURN t LIMIT 25';

    if (district!='' || fy!='') {
      query = 'MATCH (t:FullTransaction {District_Name:$dis, Fiscal_Year:$fy}) RETURN t LIMIT 25';
    }

    // try {
    //   const result = this.httpClient.get('http://localhost:5005/api/neo4j');

    //   const records = result.records
    //   for (let i = 0; i < records.length; i++) {
    //     const title = records[i].get(0).properties;
    //     transactions.push(title);
    //   }

    // } finally {
    // }

    // return result;
    return this.httpClient.get('http://localhost:5005/api/neo4j').toPromise();
  }

  async getDistricts(): Promise<any[]> {

    let districts: Object[] = [];

    // try {
    //   const result = await 

    //   const records = result.records
    //   for (let i = 0; i < records.length; i++) {
    //     const title = records[i].get(0).properties;
    //     districts.push(title);
    //   }

    // } finally {
    // }

    return districts;
  }

  async getFiscalYears(district: string): Promise<any[]> {
    
    let years: Object[] = [];

    let query = 'MATCH (d:FullTransaction)-[OCCURRED_IN]->(fy:Fiscal_Year) RETURN DISTINCT fy'

    if (district!='') {
      query = 'MATCH (d:FullTransaction{District_Name:$dn})-[OCCURRED_IN]->(fy:Fiscal_Year) RETURN DISTINCT fy'
    }

    // try {
    //   const result = 
  
    //   const records = result.records
    //   for (let i = 0; i < records.length; i++) {
    //     const title = records[i].get(0).properties;
    //     years.push(title);
    //   }
  
    // } finally {
    // } 
  
    return years;
  }

}
