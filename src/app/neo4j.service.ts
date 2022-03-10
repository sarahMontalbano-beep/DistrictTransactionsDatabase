import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Neo4jService {

  constructor(private httpClient: HttpClient) {}


  async getTransactions(district: number, fy: string): Promise<any> {

    let params = new HttpParams();

    params = params.append('district', district);

    params = params.append('year', fy);

    let observable = this.httpClient.get('http://localhost:5005/api/transactions', { params: params });

    let values = await lastValueFrom(observable);

    return values;

  }

  async getDistricts(): Promise<any> {

    let observable = this.httpClient.get('http://localhost:5005/api/districts');

    let values = await lastValueFrom(observable);

    return values;

  }

  async getFiscalYears(district: string): Promise<any> {

    if (district != '') {
        let params = new HttpParams().set('district', district);

        let observable = this.httpClient.get('http://localhost:5005/api/years/getbydistrict', { params: params });

        let values = await lastValueFrom(observable);

        return values;
    }
    else {
        return {data:[]}
    }

  }

}
