import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService } from '../authentication.service';

import { Type } from '../models/type';
import { Field } from '../models/field';
import { Student } from '../models/student';
import { Company } from '../models/company';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  type: String = null;

  types: Type[];

  fields: Field[];

  user: Student | Company; 

  constructor(private router: Router, private service: AuthenticationService) { }

  ngOnInit() {
    this.service.getTypes().subscribe((types: Type[]) => {
      this.types = types.filter(function(type) {
        return type.type != "admin";
      });
    });
    this.service.getFields().subscribe((fields: Field[]) => {
      this.fields = fields;
    });
  }

  createUser() {
    switch (this.type) {
      case "student":{
        this.user = new Student();
        break;
      }
      case "company": {
        this.user = new Company();
        break;
      }
    }
  }

  register() {
    // TO-DO: RegEx
    this.service.register(this.user).subscribe((transaction) => {
      this.router.navigate(["/login"]);
    });
  }

}
