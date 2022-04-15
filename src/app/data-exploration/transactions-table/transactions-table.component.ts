// Utilized code from https://developer.fireflysemantics.com/tasks/tasks--angular--debouncing-your-angular-search-field

import { Component, OnInit, ElementRef, ViewChild, Input, AfterViewInit, SimpleChanges } from '@angular/core';
import {PageEvent} from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import {MatSort, Sort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';
import {fromEvent } from 'rxjs';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';

@Component({
  selector: 'app-transactions-table',
  templateUrl: './transactions-table.component.html',
  styleUrls: ['./transactions-table.component.css']
})

export class TransactionsTableComponent implements OnInit {

  keywords = ['Name', 'Year','Object', 'Amount', 'Fund', 'Vendor'];

  // input: ElementRef | undefined = undefined;

  // input: ElementRef | undefined = undefined;

  @ViewChild('search')
  input!: ElementRef;

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

  searchValue: string = '';

  constructor() { }

  ngOnInit(): void {
    // this.getTransactions();
  }

  applyFilter(evnt: unknown) {
    this.dataSource.filter = this.searchValue.trim().toLocaleLowerCase();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator
    fromEvent(this.input.nativeElement,'keyup')
          .pipe(
              debounceTime(150),
              distinctUntilChanged(),
              tap((text) => this.applyFilter(text))
          )
          .subscribe();
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
    if (list.length > 0  && list[0].hasOwnProperty('Date')) {
      list.forEach(o => o.Date = `${o.Date.month}-${o.Date.day}-${o.Date.year}`);
    }
    return list;
  }

}
