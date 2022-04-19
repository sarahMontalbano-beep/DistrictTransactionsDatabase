import { temporaryAllocator } from '@angular/compiler/src/render3/view/util';
import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import {LegendPosition} from "@swimlane/ngx-charts";
import { objectCodes } from 'src/shared/object_codes';

@Component({
  selector: 'app-data-visualizations',
  templateUrl: './data-visualizations.component.html',
  styleUrls: ['./data-visualizations.component.css']
})
export class DataVisualizationsComponent implements OnInit {

  totalSpending: number = 0

  formatter: any = null;

  @Input() transactions: Object[] = []

  @Input() objectCodeData: Object[] = []
  oDataIndexes: any = {}
  below = LegendPosition.Below

  constructor() {
    this.formatter = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' });
   }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if ('transactions' in changes && changes['transactions'].currentValue) {
      this.transactions = changes['transactions'].currentValue;
      // if (this.transactions.length > 0 && this.transactions[0].hasOwnProperty("Object_Code")) {
        this.sortByObjectCode(changes['transactions'].currentValue);
      // }
    }
    if ('objectCodeData' in changes && changes['objectCodeData'].currentValue) {
      this.totalSpending = 0;
      let tempArr = this.doExraFormatting(changes['objectCodeData'].currentValue)
      this.objectCodeData = [...tempArr]
      
      // this.totalSpending = Math.round((this.totalSpending + Number.EPSILON) * 100) / 100
      this.totalSpending = this.formatter.format(this.totalSpending)

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
          let name = (objectCodes as any)[d.name] ?? d.name;
          tempArr.push({name:name, value:d.value});
          this.totalSpending += d.value;
        }
        else {
          other += d.value;
          this.totalSpending += d.value;
        }
        counter += 1;
      }
      tempArr.push({name:"Other", value:other});
      return tempArr;
    }
    return data;
  }
  
}
