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

  type: String = "";
  types: Type[];
  fields: Field[];
  user: Student | Company;
  image: File;
  errors: String[] = [];

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
    this.errors = [];
  }

  selectImage(event) {
    this.image = event.target.files[0];
  }

  private validateStudent() {
    this.user = this.user as Student;
    if (this.user.firstname === undefined || this.user.firstname === "") {
      this.errors.push("Please enter your first name");
    }
    if (this.user.lastname === undefined || this.user.lastname === "") {
      this.errors.push("Please enter your last name");
    }
    if (this.user.phone === undefined || this.user.phone === "") {
      this.errors.push("Please enter your phone");
    }
    if (this.user.mail === undefined || this.user.mail === "") {
      this.errors.push("Please enter your e-mail");
    } else {
      let pattern = /^[A-Za-z][A-Za-z0-9.]*@[a-z.]+$/;
      if (!pattern.test(this.user.mail.toString())) {
        this.errors.push("Please enter valid e-mail");
      }
    }
    if (this.user.year === undefined) {
      this.errors.push("Please choose your year of studies");
    }
    if (this.user.profile === undefined || this.user.profile === null) {
      this.errors.push("Please upload your profile photo");
    }
    return this.errors.length == 0;
  }

  private validateCompany() {
    this.user = this.user as Company;
    if (this.user.name === undefined || this.user.name === "") {
      this.errors.push("Please enter comapny name");
    }
    if (this.user.city === undefined || this.user.city === "") {
      this.errors.push("Please enter city");
    }
    if (this.user.address === undefined || this.user.address === "") {
      this.errors.push("Please enter address");
    }
    if (this.user.executive === undefined || this.user.executive === "") {
      this.errors.push("Please enter executive");
    }
    if (this.user.taxid === undefined) {
      this.errors.push("Please enter tax id");
    } else {
      let pattern = /^[0-9]+$/;
      if (!pattern.test(this.user.taxid.toString())) {
        this.errors.push("Tax ID must be a number");
      }
    }
    if (this.user.employees === undefined) {
      this.errors.push("Please enter number of employees");
    } else {
      let pattern = /^[0-9]+$/;
      if (!pattern.test(this.user.employees.toString())) {
        this.errors.push("Number of employees must be a number");
      }
    }
    if (this.user.mail === undefined || this.user.mail === "") {
      this.errors.push("Please enter e-mail");
    } else {
      let pattern = /^[A-Za-z][A-Za-z0-9.]*@[a-z.]+$/;
      if (!pattern.test(this.user.mail.toString())) {
        this.errors.push("Please enter valid e-mail");
      }
    }
    if (this.user.site === undefined || this.user.site === "") {
      this.errors.push("Please enter web site");
    }
    if (this.user.field === undefined || this.user.field === "") {
      this.errors.push("Please choose field");
    }
    if (this.user.specialty === undefined || this.user.specialty === "") {
      this.errors.push("Please enter specialty");
    }
    if (this.user.logo === undefined || this.user.logo === null) {
      this.errors.push("Please upload company logo");
    }
    return this.errors.length == 0;
  }

  private validate(): Boolean {
    this.errors = [];
    if (this.user.username === undefined || this.user.username === "") {
      this.errors.push("Please enter your username");
    }
    if (this.user.password === undefined || this.user.password === "") {
      this.errors.push("Please enter your password");
    } else {
      let pattern = /^[A-Za-z0-9#*.!?\$]{8,12}$/;
      if (!pattern.test(this.user.password.toString())) {
        this.errors.push("Password must have minumum 8 and mamximum 12 characters");
      }
      pattern = /[A-Z]{1}/;
      if (!pattern.test(this.user.password.toString())) {
        this.errors.push("Password must have minumum 1 uppercase letter");
      }
      pattern = /[a-z]{3}/;
      if (!pattern.test(this.user.password.toString())) {
        this.errors.push("Password must have minumum 3 lowercase letters");
      }
      pattern = /[0-9]{1}/;
      if (!pattern.test(this.user.password.toString())) {
        this.errors.push("Password must have minumum 1 digit");
      }
      pattern = /[#*.!?\$]{1}/;
      if (!pattern.test(this.user.password.toString())) {
        this.errors.push("Password must have minumum 1 special character from (#*.!?\$)");
      }
    }
    switch (this.type) {
      case "student": return this.validateStudent();
      case "company": return this.validateCompany();
      default:  return this.errors.length == 0;
    }
  }

  register() {
    if (!this.validate()) return;
    this.service.register(this.user).subscribe((user: Student | Company) => {
      if (user) {
        this.service.uploadImage(user, this.image).subscribe((user: Student | Company) => {
          if (user) {
            this.router.navigate(["/login"]);
          } else {
            this.errors.push("Image upload failed");
          }
        });
      } else {
        this.errors.push("Username already exists");
      }
    });
  }  
}