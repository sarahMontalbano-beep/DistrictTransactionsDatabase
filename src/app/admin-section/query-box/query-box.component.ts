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

  constructor(private neo4jSerive : Neo4jService) { }

  ngOnInit(): void {
  }

  async onSubmit() {
    let results = await this.neo4jSerive.runQuery(this.query);

    this.msg = JSON.stringify(results);

  }

}
