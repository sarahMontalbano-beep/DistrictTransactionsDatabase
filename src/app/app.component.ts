import { Component } from '@angular/core';

import { Router } from '@angular/router';

import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Districts Database';
  // isUserLoggedIn = false;

  t : any | undefined = undefined;

  constructor(public authService: AuthService, private router : Router) {}

  ngOnInit() {
    this.authService.init();
  }

}
