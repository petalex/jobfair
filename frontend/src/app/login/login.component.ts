import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService } from '../authentication.service';

import { Student } from '../interfaces/student';
import { Admin } from '../interfaces/admin';
import { Company } from '../interfaces/company';
import { Usertype } from '../interfaces/usertype';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public usertype: Usertype;

  public username: String;

  public password: String;
  
  public errors: String[] = [];

  constructor(private router: Router, private service: AuthenticationService) { }

  ngOnInit() {
    this.usertype = this.service.getChosenUsertype();
  }

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

    this.service.login(this.username, this.password, this.usertype.type).subscribe((user: Student | Admin | Company) => {
      if (user) {

        /* TO-DO: Session */

        switch (this.usertype.type) {
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
      }
    });
  }

}
