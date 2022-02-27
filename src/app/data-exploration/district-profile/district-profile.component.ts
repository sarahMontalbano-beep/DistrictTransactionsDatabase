import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { District } from 'src/shared/district';

@Component({
  selector: 'app-district-profile',
  templateUrl: './district-profile.component.html',
  styleUrls: ['./district-profile.component.css']
})
export class DistrictProfileComponent implements OnInit {

  @Input() district: District|undefined = undefined

  districtName: string = ''

  ela_bar_color: string = 'warn'
  math_bar_color: string = 'warn'

  ela_bar_value: string = ''
  math_bar_value: string = ''

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if ('district' in changes && changes['district'].currentValue) {
      this.ela_bar_value = String(Math.round(changes['district'].currentValue.PEAKS_ELA*100));
      this.math_bar_value = String(Math.round(changes['district'].currentValue.PEAKS_Math*100));
      this.ela_bar_color = (Number(this.ela_bar_value) < 30)? 'warn' : 'primary';
      this.math_bar_color = (Number(this.math_bar_value) < 30)? 'warn' : 'primary';
    }
  }

}
