import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { NumberOrInteger } from 'neo4j-driver-core';

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
      // if (this.transactions.length > 0 && this.transactions[0].hasOwnProperty("Object_Code")) {
        this.sortByObjectCode(changes['transactions'].currentValue);
      // }
    }
  }

  sortByObjectCode(transactions: any[]) {
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
        else if (prop.toLowerCase().indexOf('debit') > -1) {
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
        let value = tempMap.get(keys[k]);
        let num = value ?? 0;
        if (num > 0) {
          tempArr.push({name: keys[k], value: tempMap.get(keys[k])});
        }
      }
      tempArr = this.doExraFormatting(tempArr);
      this.objectCodeData = [...tempArr]
    }
  }

  doExraFormatting(data: any[]): any[] {
    if (data.length > 7) {
      let tempArr = []
      data.sort(function(a, b){
        if (a.value < b.value) {
          return 1;
        }
        if (a.value > b.value) {
          return -1;
        }
        return 0;
      });
      let counter = 1;
      let other = 0;
      for (const d of data) {
        if (counter <= 7) {
          tempArr.push(d);
        }
        else {
          other += d.value;
        }
        counter += 1;
      }
      tempArr.push({name:"Other", value:other});
      return tempArr;
    }
    return data;
  }
  
}
