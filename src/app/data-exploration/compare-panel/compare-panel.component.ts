import { Component, OnInit, Input } from '@angular/core';
import { Neo4jService } from 'src/app/neo4j.service';
import { District } from 'src/shared/district';

@Component({
  selector: 'app-compare-panel',
  templateUrl: './compare-panel.component.html',
  styleUrls: ['./compare-panel.component.css']
})
export class ComparePanelComponent implements OnInit {

  district: District|undefined = undefined
  currentDistrict: number = 0;
  currentYear = '';
  objectCodeData: Object[] = []

  @Input() districts: District[] = [];
  @Input() fiscalYears: string[] = [];

  constructor(private neo4jService: Neo4jService) { }

  ngOnInit(): void {
  }

  districtUpdate(): void {
    this.district = this.districts.find( e => e.id == this.currentDistrict);
    this.getFiscalYears();
    // console.log(this.district)
  }

  async getFiscalYears(): Promise<void> {

    this.fiscalYears = [];
    
    let name = (this.district)? this.district.District_Name : '';

    let res = await this.neo4jService.getFiscalYears(name);

    if (res.data.length > 0) {
      this.fiscalYears.push('Any');
    }

    res.data.forEach((fy: number) => this.fiscalYears.push(fy.toString()));

    this.fiscalYears.sort();

  }

  async getObjectCodeData() {
    let res = await this.neo4jService.getObjectCodeData(this.currentDistrict, this.currentYear);

    if (res.data.length > 0) {
      this.objectCodeData = res.data
    }
  }

  onUpdateButton(): void {
    this.getObjectCodeData();
  }

}
