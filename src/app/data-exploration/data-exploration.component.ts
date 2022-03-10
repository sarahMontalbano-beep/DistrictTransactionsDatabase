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
  districts: District[] = [];
  fiscalYears: string[] = [];

  currentDistrict: number = 0;
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
    let res = await this.neo4jService.getTransactions(this.currentDistrict, this.currentYear);
    this.formatForTable(res.data);
    // console.log(res);
  }

  async getDistricts(): Promise<void> {

    let res = await this.neo4jService.getDistricts();

    res.data.districts.forEach((dis: Object) => this.districts.push(dis as District));

  }
  
  async getFiscalYears(): Promise<void> {

    this.fiscalYears = [];
    
    let name = (this.district)? this.district.District_Name : '';

    let res = await this.neo4jService.getFiscalYears(name);

    res.data.forEach((fy: number) => this.fiscalYears.push(fy.toString()));

  }

  districtUpdate(): void {
    this.district = this.districts.find( e => e.id == this.currentDistrict);
    this.getFiscalYears();
    // console.log(this.district)
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
