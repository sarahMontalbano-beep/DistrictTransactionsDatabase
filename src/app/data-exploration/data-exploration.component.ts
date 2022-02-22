import { Component, OnInit } from '@angular/core';
import { Neo4jService } from '../neo4j.service';

@Component({
  selector: 'app-data-exploration',
  templateUrl: './data-exploration.component.html',
  styleUrls: ['./data-exploration.component.css']
})
export class DataExplorationComponent implements OnInit {

  schoolDistricts: string[] = [];
  fiscalYears: string[] = [];

  currentDistrict = '';
  currentYear = '';

  keywords = ['Name', 'Year','Object', 'Amount', 'Fund', 'Vendor'];

  transactions: any[] = [];
  labels: string[] = [];
  dColumns: string[] = []
  displayedColumns: Map<string, string> = new Map();

  constructor(private neo4jService: Neo4jService) { }

  ngOnInit(): void {
    this.getDistricts();
    this.getFiscalYears();
    
  }

  onUpdateButton(): void {
    this.getTransactions();
  }

  async getTransactions(): Promise<void> {
    this.transactions = [];
    this.labels = [];
    this.dColumns = []
    this.displayedColumns = new Map();
    let res = this.neo4jService.getTransactions(this.currentDistrict, this.currentYear);
    res.then(x => this.formatForTable(x));
  }

  async getDistricts(): Promise<void> {
    let res = this.neo4jService.getDistricts();
    res.then(x => x.forEach(dis => this.schoolDistricts.push(dis.District_Name)));
  }
  
  async getFiscalYears(): Promise<void> {
    this.fiscalYears = [];
    let res = this.neo4jService.getFiscalYears(this.currentDistrict);
    res.then(x => x.forEach(y => this.fiscalYears.push(y.FiscalYear)));
    console.log(this.fiscalYears)
  }

  districtUpdate(): void {
    this.getFiscalYears();
  }

  formatForTable(data:Object[]): void {
    if (data.length > 0) {
      this.transactions = data;
      let names = Object.getOwnPropertyNames(data[0]);
      this.getImportantColumnNames(names);
    }
  } 

  getImportantColumnNames(data:string[]): void {
    let tempLabels: string[] = [];
    let tempDColumns: string[] = []
    let tempDisplayedColumns: Map<string, string> = new Map();
    for (let i = 0; i < data.length; i++) {
      const prop = data[i];
      if (prop.indexOf('_') > -1) {
        let splitName = prop.split('_');
        if (splitName.filter(n => this.keywords.includes(n)).length > 0) {
          tempLabels.push(prop.replace('_', ' '));
          tempDColumns.push(prop);
          tempDisplayedColumns.set(prop.replace('_', ' '), prop);
        }
      }
      else {
        let splitArr = prop.split(/(?=[A-Z])/);
        if (splitArr.length > 0) {
          if (splitArr.filter(n => this.keywords.includes(n)).length > 0) {
            let tempStr = '';
            splitArr.forEach(x => tempStr += ' ' + x);
            tempLabels.push(tempStr);
            tempDColumns.push(prop);
            tempDisplayedColumns.set(tempStr, prop);
          }
        }
        else {
          if (prop && this.keywords.includes(prop)) {
            tempLabels.push(prop);
            tempDColumns.push(prop);
            tempDisplayedColumns.set(prop, prop);
          }
        }
      }
    }
    this.labels = tempLabels
    this.dColumns = tempDColumns
    this.displayedColumns = tempDisplayedColumns
  }

}
