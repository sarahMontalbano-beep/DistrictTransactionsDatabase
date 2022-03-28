import { Component, OnInit } from '@angular/core';

import { AuthService } from '../auth.service';

@Component({
  selector: 'app-admin-section',
  templateUrl: './admin-section.component.html',
  styleUrls: ['./admin-section.component.css']
})
export class AdminSectionComponent implements OnInit {

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  extendSession(): void {
    if (this.authService.isAuthenticated) {
      this.authService.extendTokenExp();
    }
  }

}
