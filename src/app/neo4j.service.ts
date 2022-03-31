import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { AuthService } from './auth.service';
import { LocalStorageService } from './storage.service';
import { auth, driver, Driver, ServerInfo, Session } from 'neo4j-driver';

@Injectable({
  providedIn: 'root'
})
export class Neo4jService {

  constructor(private httpClient: HttpClient,
              private authService: AuthService, private localStorageService: LocalStorageService) {}

  static driver: Driver;

  public static createDriver() {
    // if (!this.driver){
    this.driver = driver(
      'neo4j://localhost:7687',
      auth.basic('angular', 'newpassword'),
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

  async getTransactions(district: string, fy: string): Promise<any> {

    let params = new HttpParams();

    params = params.append('district', district);

    params = params.append('year', fy);

    let observable = this.httpClient.get('http://apf-districts.westus2.cloudapp.azure.com:5005/api/transactions', { params: params });

    let values = await lastValueFrom(observable);

    return values;

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

  async runQuery(query: string): Promise<any> {
    if (this.authService.isAuthenticated){

      if (query != '') {
        console.log(query);

        let headers = new HttpHeaders().set('Authorization', 'Bearer ' + this.localStorageService.storageData.token);

        let observable = this.httpClient.post('http://apf-districts.westus2.cloudapp.azure.com:5005/api/admin/query', {query: query}, {headers: headers});

        let values = await lastValueFrom(observable);

        return values;
      }
      else {
        return {data:[]}
      }

    }

  }

}
