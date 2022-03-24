import { Component, OnInit } from '@angular/core';

import { FormGroup, FormControl } from '@angular/forms';
import { AuthService } from '../auth.service';
import { LoginService } from './login.service';
import { Router } from '@angular/router';

// This file was copied from https://www.tutorialspoint.com/angular8/angular8_authentication_and_authorization.htm

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  userName: string = '';
  password: string = '';
  formData: any;
  hide = true;
  warningMsg = '';

  constructor(private authService : AuthService, private router : Router,
    private loginService :  LoginService) { }

  ngOnInit() {
    this.formData = new FormGroup({
        userName: new FormControl("admin"),
        password: new FormControl("admin"),
    });
  }

  catchEnter(e: any): void {
    if (e.key == "Enter") {
      e.preventDefault();

      this.onClickSubmit(this.formData.value)
    }
  }

  async onClickSubmit(data: any) {
    this.userName  = data.userName;
    this.password = data.password;

    console.log("Login page: " + this.userName);
    console.log("Login page: " + this.password);

    try {
      const response = await this.loginService.login(this.userName, this.password);
      if (response && response.token) {
        // Login successful
        this.authService.setToken(response);

        this.router.navigate(['/admin']);
      } else {
        this.warningMsg = 'Authentication failed.';
      }
    } catch (error) {
      this.warningMsg = 'Authentication failed.';
    }

  }

}
