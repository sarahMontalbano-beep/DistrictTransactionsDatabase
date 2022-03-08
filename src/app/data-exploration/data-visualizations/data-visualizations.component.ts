import { Component, OnInit, Input, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-data-visualizations',
  templateUrl: './data-visualizations.component.html',
  styleUrls: ['./data-visualizations.component.css']
})
export class DataVisualizationsComponent implements OnInit {

  @Input() transactions: Object[] = []

  objectCodeData: Object[] = []
  oDataIndexes: any = {}

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if ('transactions' in changes && changes['transactions'].currentValue) {
      this.transactions = changes['transactions'].currentValue;
      this.formatForPieChart(this.transactions);
    }
  }

  formatForPieChart(transactions: any[]) {
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
            tempMap.set(oc, tempMap.get(oc)+t[key])
          }
          else {
            tempMap.set(oc, t[key])
          }
        }
      }
      let keys = Array.from(tempMap.keys())
      let tempArr = []
      for (let k = 0; k < keys.length; k++) {
        tempArr.push({name: keys[k], value: tempMap.get(keys[k])})
      }
      this.objectCodeData = [...tempArr]
    }
  }

}
