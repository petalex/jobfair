import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService } from '../authentication.service';

import { Student } from '../models/student';
import { Admin } from '../models/admin';
import { Company } from '../models/company';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username: String;

  password: String;
  
  errors: String[] = [];

  constructor(private router: Router, private service: AuthenticationService) { }

  ngOnInit() { }

  login(): void {
    this.errors = [];
    if (this.username === undefined || this.username === "") {
      this.errors.push("Please enter your username");
    }

    if (this.password === undefined || this.password === "") {
      this.errors.push("Please enter your password");
    }

    if(this.errors.length) {
      return;
    }

    this.service.login(this.username, this.password).subscribe((user: Student | Admin | Company) => {
      if (user) {
        alert("Logged in!");
        this.service.setCurrentUser(user);
        
        switch (user.type) {
          case "student": {
            this.router.navigate(['/student']);
            break;
          }
          case "admin": {
            this.router.navigate(['/admin']);
            break;
          }
          case "company": {
            this.router.navigate(['/company']);
            break;
          }
        }
      } else {
        this.errors.push("Incorrect credentials. Please try again");
        this.password = "";
      }
    });
  }

}
