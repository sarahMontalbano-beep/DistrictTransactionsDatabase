import { Injectable } from '@angular/core';
import { Transaction } from 'src/shared/transaction';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class Neo4jService {
private neo4jUrl = 'http://localhost:7474/db/data/transaction/commit';

  transactions: Transaction[] = [];

  constructor(private http: HttpClient) { }

  // getTransactions(): Observable<Transaction[]> {
  //   // const transactions = of();
  //   // return transactions
  //   return this.http.get<Transaction[]>(this.neo4jUrl)
  // }

  getTransactions(): Observable<any> {
    const headers = {'content-type': 'application/json', 'Authorization': 'Basic Ynlyb246cGFzc3dvcmQ='}
    const body = {
      "statements":[
        { 
          "statement": "MATCH (n:FullTransaction) WHERE n.Fund = $fund RETURN n",
         "parameters": {
            "fund":"209"
         }
        }
      ]
    }
    var r = this.http.post<any>(this.neo4jUrl, body, {'headers':headers});
    return r;
  }

}
