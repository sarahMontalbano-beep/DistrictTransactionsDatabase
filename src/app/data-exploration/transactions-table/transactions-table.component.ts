import { Component, OnInit, OnChanges, ViewChild, Input, SimpleChange, SimpleChanges } from '@angular/core';
import { Neo4jService } from '../../neo4j.service';
import {PageEvent} from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import {MatSort, Sort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';

@Component({
  selector: 'app-transactions-table',
  templateUrl: './transactions-table.component.html',
  styleUrls: ['./transactions-table.component.css']
})

export class TransactionsTableComponent implements OnInit {

  keywords = ['Name', 'Year','Object', 'Amount', 'Fund', 'Vendor'];

  @Input() transactions: any[] = [];

  dataSource = new MatTableDataSource();
  // @Input() transactions = this.dataSource.data;
  @Input() labels: string[] = [];
  @Input() dColumns: string[] = []
  @Input() displayedColumns: Map<string, string> = new Map();
  
  // MatPaginator Inputs
  length = 100;
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 25, 100];

  @ViewChild(MatSort)
  sort!: MatSort | null;
  @ViewChild(MatPaginator)
  paginator!: MatPaginator | null;

  constructor() { }

  ngOnInit(): void {
    // this.getTransactions();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator
  }

  ngOnChanges(changes: SimpleChanges) {
    let tmpList = changes['transactions'].currentValue;
    tmpList = this.dateObjectsToString(tmpList);
    this.dataSource.data = tmpList;
  }

  pagerEvent(event: PageEvent): void {
    console.log(event);
  }

  dateObjectsToString(list: any[]) {
    list.forEach(o => o.Date = `${o.Date.month}-${o.Date.day}-${o.Date.year}`);
    return list;
  }

}
