import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { AuthService } from './auth.service';
import { LocalStorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class Neo4jService {

  constructor(private httpClient: HttpClient, 
    private authService: AuthService, private localStorageService: LocalStorageService) {}


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

  async getAllFiscalYears(): Promise<any> {

    let observable = this.httpClient.get('http://localhost:5005/api/years/getall');

    let values = await lastValueFrom(observable);

    return values;

  }

  async runQuery(query: string): Promise<any> {
    if (this.authService.isAuthenticated){

      if (query != '') {
        console.log(query);

        let headers = new HttpHeaders().set('Authorization', 'Bearer ' + this.localStorageService.storageData.token);

        let observable = this.httpClient.post('http://localhost:5005/api/admin/query', {query: query}, {headers: headers});

        let values = await lastValueFrom(observable);

        return values;
      }
      else {
          return {data:[]}
      }

    }

  }

  async uploadFile(data: any): Promise<any> {
    if (this.authService.isAuthenticated){

      if (data) {

        // console.log(data)

        let headers = new HttpHeaders().set('Authorization', 'Bearer ' + this.localStorageService.storageData.token);

        let observable = this.httpClient.post('http://localhost:5005/api/admin/upload', data, {headers: headers});

        let values = await lastValueFrom(observable);

        return values;
      }
      else {
          return {data:[]}
      }

    }

  }

}
