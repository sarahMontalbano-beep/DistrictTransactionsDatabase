import { Component, OnInit } from '@angular/core';
import { Transaction } from 'src/shared/transaction';
import { Neo4jService } from '../neo4j.service';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css']
})

export class TransactionsComponent implements OnInit {

  keywords = ['Name', 'Year','Object', 'Amount', 'Fund', 'Vendor'];

  transactions: any[] = [];
  labels: string[] = [];
  displayedColumns: string[] = [];
  

  constructor(private neo4jService: Neo4jService) { }

  ngOnInit(): void {
    this.getTransactions();
  }

  async getTransactions(): Promise<void> {
    let res = this.neo4jService.getTransactions();
    res.then(x => this.formatForTable(x));
  }

  formatForTable(data:Object[]): void {
    if (data.length > 0) {
      // data.forEach( o => this.transactions.push(Object.values(o)))
      this.transactions = data;
      let names = Object.getOwnPropertyNames(data[0]);
      this.getImportantColumnNames(names);
    }
    console.log(this.displayedColumns);
    console.log(this.labels);
    console.log(data);
  } 

  getImportantColumnNames(data:string[]): void {
    for (let i = 0; i < data.length; i++) {
      const prop = data[i];
      if (prop.indexOf('_') > -1) {
        let splitName = prop.split('_');
        if (splitName.filter(n => this.keywords.includes(n)).length > 0) {
          // tempArr.push(prop.replace('_', ' '));
          this.labels.push(prop.replace('_', ' '));
          this.displayedColumns.push(prop);
        }
      }
      else {
        let splitArr = prop.split(/(?=[A-Z])/);
        if (splitArr.length > 0) {
          if (splitArr.filter(n => this.keywords.includes(n)).length > 0) {
            let tempStr = '';
            splitArr.forEach(x => tempStr += ' ' + x);
            // tempArr.push(tempStr);
            this.labels.push(tempStr);
            this.displayedColumns.push(prop);
          }
        }
        else {
          if (prop && this.keywords.includes(prop)) {
            // tempArr.push(prop);
            this.labels.push(prop);
            this.displayedColumns.push(prop);
          }
        }
      }
    }
  }

}
