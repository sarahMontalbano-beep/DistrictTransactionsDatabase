import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from "@angular/material/table";
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import {MatTooltipModule} from '@angular/material/tooltip'; 
import { MatSortModule } from '@angular/material/sort';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxChartsModule } from '@swimlane/ngx-charts';
// import {GoogleChartsModule} from 'angular-google-charts';

import { AppComponent } from './app.component';
import { TransactionsTableComponent } from './data-exploration/transactions-table/transactions-table.component';
import { DataExplorationComponent } from './data-exploration/data-exploration.component';
import { DistrictProfileComponent } from './data-exploration/district-profile/district-profile.component';
import { DataVisualizationsComponent } from './data-exploration/data-visualizations/data-visualizations.component';

@NgModule({
  declarations: [
    AppComponent,
    TransactionsTableComponent,
    DataExplorationComponent,
    DistrictProfileComponent,
    DataVisualizationsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    MatButtonModule,
    MatFormFieldModule,
    MatSelectModule,
    MatTableModule,
    MatSortModule,
    MatProgressBarModule,
    MatTooltipModule,
    MatPaginatorModule,
    BrowserAnimationsModule,
    NgxChartsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
