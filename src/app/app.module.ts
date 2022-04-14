import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from "@angular/material/table";
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTooltipModule } from '@angular/material/tooltip'; 
import { MatSortModule } from '@angular/material/sort';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatListModule } from '@angular/material/list'
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core'

import { AppComponent } from './app.component';
import { TransactionsTableComponent } from './data-exploration/transactions-table/transactions-table.component';
import { DataExplorationComponent } from './data-exploration/data-exploration.component';
import { DistrictProfileComponent } from './data-exploration/district-profile/district-profile.component';
import { DataVisualizationsComponent } from './data-exploration/data-visualizations/data-visualizations.component';
import { LoginComponent } from './login/login.component';
import { AppRoutingModule } from './app-routing.module';
import { UnauthorizedComponent } from './unauthorized/unauthorized.component';
import { AdminSectionComponent } from './admin-section/admin-section.component';
import { DataUploadComponent } from './admin-section/data-upload/data-upload.component';
import { QueryBoxComponent } from './admin-section/query-box/query-box.component';

@NgModule({
  declarations: [
    AppComponent,
    TransactionsTableComponent,
    DataExplorationComponent,
    DistrictProfileComponent,
    DataVisualizationsComponent,
    LoginComponent,
    UnauthorizedComponent,
    AdminSectionComponent,
    DataUploadComponent,
    QueryBoxComponent
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
    NgxChartsModule,
    AppRoutingModule,
    MatIconModule,
    MatInputModule,
    FormsModule, 
    ReactiveFormsModule,
    MatListModule,
    MatDividerModule,
    MatExpansionModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
