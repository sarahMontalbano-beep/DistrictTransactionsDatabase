import { Component, OnInit } from '@angular/core';
import { Neo4jService } from '../neo4j.service';
import { District } from 'src/shared/district';

@Component({
  selector: 'app-data-exploration',
  templateUrl: './data-exploration.component.html',
  styleUrls: ['./data-exploration.component.css']
})

export class DataExplorationComponent implements OnInit {

  district: District|undefined = undefined
  compDistrict: District|undefined = undefined
  districts: District[] = [];
  fiscalYears: string[] = [];

  currentDistrict = '';
  currentCompDistrict = '';
  currentYear = '';
  currentCompYear = '';

  keywords = ['Name', 'Year','Object', 'Amount', 'Description', 'Vendor'];

  transactions: any[] = [];
  labels: string[] = [];
  dColumns: string[] = []
  displayedColumns: Map<string, string> = new Map();

  compTransactions: any[] = [];
  compLabels: string[] = [];
  compdColumns: string[] = []
  compDisplayedColumns: Map<string, string> = new Map();

  constructor(private neo4jService: Neo4jService) { }

  ngOnInit(): void {
    this.getDistricts();
    this.getFiscalYears();
  }

  onUpdateButton(): void {
    this.getTransactions();
    this.getCompTransactions();
  }

  async getTransactions(): Promise<void> {
    this.transactions = [];
    this.labels = [];
    this.dColumns = []
    this.displayedColumns = new Map();
    let res = this.neo4jService.getTransactions(this.currentDistrict, this.currentYear);
    res.then(x => this.formatForTable(x));
  }

  async getCompTransactions(): Promise<void> {
    this.compTransactions = [];
    this.compLabels = [];
    this.compdColumns = []
    this.compDisplayedColumns = new Map();
    this.compTransactions = await this.neo4jService.getTransactions(this.currentCompDistrict, this.currentCompYear);
  }

  async getDistricts(): Promise<void> {
    let res = this.neo4jService.getDistricts();
    res.then(x => x.forEach(dis => this.districts.push(dis as District)));
  }

  async getFiscalYears(): Promise<void> {
    this.fiscalYears = [];
    let res = this.neo4jService.getFiscalYears(this.currentDistrict);
    res.then(x => x.forEach(y => this.fiscalYears.push(y.FiscalYear)));
  }

  districtUpdate(): void {
    this.getFiscalYears();
    this.district = this.districts.find( e => e.District_Name == this.currentDistrict)
    console.log(this.district)
  }

  compDistrictUpdate(): void {
    this.getFiscalYears();
    this.compDistrict = this.districts.find( e => e.District_Name == this.currentCompDistrict)
    console.log(this.compDistrict)
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
