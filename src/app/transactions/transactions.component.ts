import { Component, OnInit } from '@angular/core';
import { Transaction } from 'src/shared/transaction';
import { Neo4jService } from '../neo4j.service';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css']
})
export class TransactionsComponent implements OnInit {

  // transactions: Transaction[] = [];
  transactions: any[] = [];
  labels: string[]|undefined = [];

  constructor(private neo4jService: Neo4jService) { }

  ngOnInit(): void {
    this.getTransactions();
  }

  async getTransactions(): Promise<void> {
    // this.neo4jService.getTransactions()
    //   .subscribe(transactions => this.toTransactionList(transactions));
    let res = this.neo4jService.getTransactions();
    res.then(x => this.formatForTable(x));
  }

  formatForTable(data:Object[]): void {
    if (data.length > 0) {
      data.forEach( o => this.transactions.push(Object.values(o)))
      this.labels = Object.getOwnPropertyNames(data[0]);
    }
    console.log(this.transactions);
    console.log(this.labels);
  } 

  // toTransactionList(res:any): void {
  //   const results = res.results[0].data;
  //   // console.log(results);
  //   for (let index = 0; index < results.length; index++) {
  //     const element = results[index].row[0];
  //     // console.log(element);
  //     const t: Transaction= {
  //       District_Name: element.District_Name,
  //       FiscalYear: element.FiscalYear,
  //       JournalDate: element.JournalDate,
  //       Fund: element.Fund,
  //       Reference: element.Reference,
  //       FunctionCode: element.FunctionCode,
  //       BatchNo: element.BatchNo,
  //       CreditAmount: element.CreditAmount,
  //       ThrowawayCode: element.ThrowawayCode,
  //       ProgramCode: element.ProgramCode,
  //       SchoolCode: element.SchoolCode,
  //       Transaction: element.Transaction,
  //       DebitAmount: element.DebitAmount,
  //       Object_Code: element.Object_Code,
  //       Object_Suffix: element.Object_Suffix
  //     }
  //     this.transactions.push(t);
  //     console.log(t.District_Name)
  //   }
  // }

}
