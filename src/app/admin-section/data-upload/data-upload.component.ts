import { Component, OnInit } from '@angular/core';
import { District } from 'src/shared/district';
import { HttpClient } from '@angular/common/http';

import { FormGroup, FormControl } from '@angular/forms';

import { RedisDefaultModules } from 'redis';

import { Neo4jService } from 'src/app/neo4j.service';
import RedisClient from '@node-redis/client/dist/lib/client';

@Component({
  selector: 'app-data-upload',
  templateUrl: './data-upload.component.html',
  styleUrls: ['./data-upload.component.css']
})
export class DataUploadComponent implements OnInit {

  // INVALIDATE REDIS CACHE

    onFileSelected(event: any) {

        const file:File = event.target.files[0];

        if (file) {

          this.currentFile = file;

          this.fileName = file.name;

        }
    }

  district: District|undefined = undefined
  districts: District[] = [];
  fiscalYears: string[] = [];

  currentDistrict: number = 0;
  currentYear = '';
  fileName = '';
  currentFile: File|null = null; 

  resStatus = '';
  resOutput = '';

  constructor(private neo4jService: Neo4jService) { }

  ngOnInit(): void {
    this.getDistricts();
    this.getAllFiscalYears();
  //   this.formData = new FormGroup(
  //     {
  //       district: new FormControl(),
  //       year: new FormControl(),
  //       file: new FormControl()
  //     }
  //   );
  }

  async onUpload(): Promise<void> {
    if (this.currentDistrict && this.currentYear && this.currentFile) {
    const formData = new FormData();

      formData.append("file", this.currentFile);
      formData.append("year", this.currentYear);
      formData.append("district", this.currentDistrict.toString());

      // console.log(formData)
      // const upload$ = this.http.post("http://localhost:5005/api/admin/upload", formData);
      let res = await this.neo4jService.uploadFile(formData);
      // console.log(res)
      this.resStatus = res.status;
      this.resOutput = res.output;
    }
  }


  async getDistricts(): Promise<void> {

    let res = await this.neo4jService.getDistricts();

    res.data.districts.forEach((dis: Object) => this.districts.push(dis as District));

  }
  
  async getAllFiscalYears(): Promise<void> {

    let res = await this.neo4jService.getAllFiscalYears();

    console.log(res)

    res.data.forEach((fy: any) => this.fiscalYears.push(fy.properties.FiscalYear));

  }

  districtUpdate(): void {
    this.district = this.districts.find( e => e.id == this.currentDistrict);
  }

}
