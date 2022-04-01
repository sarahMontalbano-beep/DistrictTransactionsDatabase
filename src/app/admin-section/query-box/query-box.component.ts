import { Component, OnInit } from '@angular/core';
import { Neo4jService } from 'src/app/neo4j.service';

@Component({
  selector: 'app-query-box',
  templateUrl: './query-box.component.html',
  styleUrls: ['./query-box.component.css']
})
export class QueryBoxComponent implements OnInit {

  query: string = "";

  msg: string = "";

  nodesRead: string = "";
  nodesCreated: string = "";
  nodesDeleted: string = "";
  relCreated: string = "";
  relDeleted: string = "";
  propsSet: string = "";
  labelsAdded: string = "";
  labelsRemoved: string = "";
  indexAdded: string = "";
  indexRemoved: string = "";
  constAdded: string = "";
  constRemoved: string = "";

  response: Object | undefined = undefined;

  keywords = ['Name', 'Year','Object', 'Amount', 'Fund', 'Vendor', 'Credit', 'Debit'];

  transactions: any[] = [];
  labels: string[] = [];
  dColumns: string[] = []
  displayedColumns: Map<string, string> = new Map();

constructor(private neo4jSerive : Neo4jService) { }

  ngOnInit(): void {
  }

  template(t: string): void {
    if (t == 'match') {
      this.query = "MATCH (n: _label_) RETURN n LIMIT 100;";
    }
    else if (t == 'mod_node') {
      this.query = 'MATCH (n: _label_ {_prop_: "_value_"}) SET n._prop_ = "_another_value_";';
    }
    else if (t == 'add_user') {
      this.query = 'CREATE (u:User {username: "_username_", password: "_encrypted_pw_"});';
    }
    else if (t == 'add_year') {
      this.query = 'CREATE (y:Fiscal_Year {FiscalYear: "_last_two_digits_of_year_"});';
    }
    else if (t == 'clear') {
      this.query = '';
    }
  }

  async onSubmit() {
    try {
      let results = await this.neo4jSerive.runQuery(this.query);

      this.msg = JSON.stringify(results);

      this.response = results;
      
      this.nodesRead = results.data.results.length as string
      this.nodesCreated = results.data.summary.counters._stats.nodesCreated as string
      this.nodesDeleted = results.data.summary.counters._stats.nodesDeleted as string
      this.relCreated = results.data.summary.counters._stats.relationshipsCreated as string
      this.relDeleted = results.data.summary.counters._stats.relationshipsDeleted as string
      this.propsSet = results.data.summary.counters._stats.propertiesSet as string
      this.labelsAdded = results.data.summary.counters._stats.labelsAdded as string
      this.labelsRemoved = results.data.summary.counters._stats.labelsRemoved as string
      this.indexAdded = results.data.summary.counters._stats.indexesAdded as string
      this.indexRemoved = results.data.summary.counters._stats.indexesRemoved as string
      this.constAdded = results.data.summary.counters._stats.constraintsAdded as string
      this.constRemoved = results.data.summary.counters._stats.constraintsRemoved as string

      this.transactions = [];
      this.labels = [];
      this.dColumns = []
      this.displayedColumns = new Map();
      this.formatForTable(results.data.results);

      console.log(results.data.results)

      this.msg = "Query ran successfully"
      // this.msg = JSON.stringify(results);
    }
    catch {
      this.msg = "Query failed. Check your query for errors."
    }
  }

  formatForTable(data:Object[]): void {
    if (data.length > 0) {
      this.transactions = data;
      let names = Object.getOwnPropertyNames(data[0]);
      if (data[0].hasOwnProperty("Object_Code")) {
        this.getImportantColumnNames(names, false);
      }
      else {
        this.getImportantColumnNames(names, true);
      }
    }
  } 

  getImportantColumnNames(data:string[], isTransactions:boolean): void {
    let tempLabels: string[] = [];
    let tempDColumns: string[] = []
    let tempDisplayedColumns: Map<string, string> = new Map();
    for (let i = 0; i < data.length; i++) {
      const prop = data[i];
      if (prop.indexOf('_') > -1) {
        let splitName = prop.split('_');
        if (isTransactions || splitName.filter(n => this.keywords.includes(n)).length > 0) {
          tempLabels.push(prop.replace('_', ' '));
          tempDColumns.push(prop);
          tempDisplayedColumns.set(prop.replace('_', ' '), prop);
        }
      }
      else {
        let splitArr = prop.split(/(?=[A-Z])/);
        if (splitArr.length > 0) {
          if (isTransactions || splitArr.filter(n => this.keywords.includes(n)).length > 0) {
            let tempStr = '';
            splitArr.forEach(x => tempStr += ' ' + x);
            tempLabels.push(tempStr);
            tempDColumns.push(prop);
            tempDisplayedColumns.set(tempStr, prop);
          }
        }
        else {
          if (prop && (isTransactions || this.keywords.includes(prop))) {
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