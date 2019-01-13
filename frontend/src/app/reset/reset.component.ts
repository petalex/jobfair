import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService } from '../authentication.service';

import { Student } from '../models/student';
import { Admin } from '../models/admin';
import { Company } from '../models/company';

@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.css']
})
export class ResetComponent implements OnInit {

  username: String;

  password: String;

  newPassword: String;
  
  errors: String[] = [];

  constructor(private router: Router, private service: AuthenticationService) { }

  ngOnInit() { }

  private validate(): Boolean {
    this.errors = [];
    if (this.username === undefined || this.username === "") {
      this.errors.push("Please enter your username");
    }
    if (this.password === undefined || this.password === "") {
      this.errors.push("Please enter your password");
    }
    if (this.newPassword === undefined || this.newPassword === "") {
      this.errors.push("Please enter your new password");
    } else {
      let pattern = /^[A-Za-z0-9#*.!?\$]{8,12}$/;
      if (!pattern.test(this.newPassword.toString())) {
        this.errors.push("New password must have minumum 8 and mamximum 12 characters");
      }
      pattern = /[A-Z]{1}/;
      if (!pattern.test(this.newPassword.toString())) {
        this.errors.push("New password must have minumum 1 uppercase letter");
      }
      pattern = /[a-z]{3}/;
      if (!pattern.test(this.newPassword.toString())) {
        this.errors.push("New password must have minumum 3 lowercase letters");
      }
      pattern = /[0-9]{1}/;
      if (!pattern.test(this.newPassword.toString())) {
        this.errors.push("New password must have minumum 1 digit");
      }
      pattern = /[#*.!?\$]{1}/;
      if (!pattern.test(this.newPassword.toString())) {
        this.errors.push("New password must have minumum 1 special character from (#*.!?\$)");
      }
    }
    return this.errors.length == 0;
  }

  reset(): void {
    if (!this.validate()) return;
    this.service.reset(this.username, this.password, this.newPassword).subscribe((user: Student | Admin | Company) => {
      if (user) {
        this.router.navigate(['/login']);
      } else {
        this.errors.push("Incorrect credentials. Please try again");
        this.password = "";
        this.newPassword = "";
      }
    });
  }

}
