import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import {Neo4jService} from "../../neo4j.service";
import { District } from 'src/shared/district';


@Component({
  selector: 'app-data-visualizations',
  templateUrl: './data-visualizations.component.html',
  styleUrls: ['./data-visualizations.component.css']
})
export class DataVisualizationsComponent implements OnInit {

  saleData = [
    { name: "310", value: 6817.25 }
  ];

  // @Input() objectCodeData = []

  @Input() transactions: Object[] = []

  objectCodeData: Object[] = []
  bubbleChartData: Object[] = []
  columnChartData: Object[] = []
  oDataIndexes: any = {}
  districts: Object[] = [];


  constructor() { }

  ngOnInit(): void {
    this.formatForBubbleChart(this.districts);
    this.formatForColumnChart();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if ('transactions' in changes && changes['transactions'].currentValue) {
      this.transactions = changes['transactions'].currentValue;
      this.formatForPieChart(this.transactions);
    }

  }

  async formatForColumnChart() {
    console.log("enters column chart")
    let tempMap: Map<string, number> = new Map()

    let districts = await this.getDistricts();
    if (districts.length < 0) {
      console.log("need at least 1 district")
    } else {
      districts = await this.getDistricts();
      console.log(districts.values())
      for (let i = 0; i < districts.length; i++) {
        let d = districts[i]
        let district_name = String(d['District_Name'])
        //let ts = d['TotalStudents']
        let ELA = d['PEAKS_ELA']
        tempMap.set(district_name, ELA)
      }
      console.log(tempMap)
      let keys = Array.from(tempMap.keys())
      let tempArr = []
      for (let k = 0; k < keys.length; k++) {
        tempArr.push({name: keys[k], value: tempMap.get(keys[k])})
      }
      this.columnChartData = [...tempArr]
      console.log(this.columnChartData)

    }
  }

  async formatForBubbleChart(districts: any[]) {
    console.log("enters bubble chart")
    if (districts.length < 0) {
      console.log("need at least 1 district")
    } else {
      // want to fill with districts and size of bubble is total number of students (end goal to be amount),
      // fiscal year on x axis, and y = some metric like total students, % proficient in ELA, student-teacher ratio, etc
      districts = await this.getDistricts();
      console.log(districts.values().next())
      let tempMap: Map<number, string> = new Map()

      for (let i = 0; i < districts.length; i++) {
        let d = districts[i]
        let district_name = String(d['District_Name'])
        let ts = d['TotalStudents']
        let ELA = d['PEAKS_ELA']
        // map of total students and district name
        tempMap.set(ts, district_name)
      }

      let keys = districts.keys()

      console.log(tempMap)

      this.bubbleChartData = []
      console.log(this.bubbleChartData)
    }
  }


  formatForPieChart(transactions: any[]) {
    console.log('working');
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
      this.objectCodeData = [...tempArr]
      console.log(this.objectCodeData)
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
