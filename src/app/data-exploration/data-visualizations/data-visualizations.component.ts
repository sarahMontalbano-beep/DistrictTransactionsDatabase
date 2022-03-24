import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import {Neo4jService} from "../../neo4j.service";
import { District } from 'src/shared/district';

@Component({
  selector: 'app-data-visualizations',
  templateUrl: './data-visualizations.component.html',
  styleUrls: ['./data-visualizations.component.css']
})

export class DataVisualizationsComponent implements OnInit {

  @Input() transactions: Object[] = []
  @Input() compTransactions: Object[] = []

  District1ObjectCodeData: Object[] = []
  District2ObjectCodeData: Object[] = []
  columnChartData: Object[] = []
  oDataIndexes: any = {}
  districts: Object[] = [];

  constructor() { }

  ngOnInit(): void {
    this.formatForColumnChart();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if ('transactions' in changes && changes['transactions'].currentValue) {
      this.transactions = changes['transactions'].currentValue;
      this.formatForPieChart(this.transactions);

    }
    if ('compTransactions' in changes && changes['compTransactions'].currentValue) {
      this.compTransactions = changes['compTransactions'].currentValue;
      this.formatForCompPieChart(this.compTransactions);
    }
  }

  async formatForColumnChart() {
    //console.log("enters column chart")
    let tempMap: Map<string, number> = new Map()

    let districts = await this.getDistricts();
    if (districts.length < 0) {
      console.log("need at least 1 district")
    } else {
      districts = await this.getDistricts();
      //console.log(districts.values())
      for (let i = 0; i < districts.length; i++) {
        let d = districts[i]
        let district_name = String(d['District_Name'])
        let ELA = d['PEAKS_ELA']
        tempMap.set(district_name, ELA)
      }
      //console.log(tempMap)
      let keys = Array.from(tempMap.keys())
      let tempArr = []
      for (let k = 0; k < keys.length; k++) {
        tempArr.push({name: keys[k], value: tempMap.get(keys[k])})
      }
      this.columnChartData = [...tempArr]
      //console.log(this.columnChartData)
    }
  }

  formatForPieChart(transactions: any[]) {
    //console.log('working');
    if (transactions.length > 0) {
      let tempMap: Map<string, number> = new Map()
      let key = ''
      for(var prop of Object.keys(transactions[0])) {
        if (prop.toLowerCase().indexOf('amount') > -1) {
          key = prop;
          break;
        }
        else if (prop.toLowerCase().indexOf('credit') > -1) {
          key = prop;
          break;
        }
      }
      if (key != '') {
        for (let i = 0; i < transactions.length; i++) {
          let t = transactions[i]
          let oc = String(t['Object_Code'])
          if (oc in Array.from(tempMap.keys())) {
            // let index = this.oDataIndexes[String(t['Object_Code'])]
            tempMap.set(oc, tempMap.get(oc)+t[key])
          }
          else {
            tempMap.set(oc, t[key])
          }
        }
      }
      let keys = Array.from(tempMap.keys())
      console.log(keys)
      console.log(tempMap)
      let tempArr = []
      for (let k = 0; k < keys.length; k++) {
        tempArr.push({name: keys[k], value: tempMap.get(keys[k])})
      }
      this.District1ObjectCodeData = [...tempArr]
      console.log(this.District1ObjectCodeData)
    }
  }

  formatForCompPieChart(compTransactions: any[]) {
    console.log('working');
    if (compTransactions.length > 0) {
      let tempMap: Map<string, number> = new Map()

      let key = ''
      for(var prop of Object.keys(compTransactions[0])) {
        if (prop.toLowerCase().indexOf('amount') > -1) {
          key = prop;
          break;
        }
        else if (prop.toLowerCase().indexOf('credit') > -1) {
          key = prop;
          break;
        }
      }
      if (key != '') {
        for (let i = 0; i < compTransactions.length; i++) {
          let t = compTransactions[i]
          let oc = String(t['Object_Code'])
          if (oc in Array.from(tempMap.keys())) {
            tempMap.set(oc, tempMap.get(oc)+t[key])
          }
          else {
            tempMap.set(oc, t[key])
          }
        }
      }
      let keys = Array.from(tempMap.keys())
      console.log(keys)
      console.log(tempMap)
      let tempArr = []
      for (let k = 0; k < keys.length; k++) {
        tempArr.push({name: keys[k], value: tempMap.get(keys[k])})
      }
      this.District2ObjectCodeData = [...tempArr]
      console.log(this.District2ObjectCodeData)
    }
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

}
