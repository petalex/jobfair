import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService } from '../authentication.service';

import { Usertype } from '../interfaces/usertype';
import { Field } from '../interfaces/field';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public usertype: Usertype;

  public fields: Field[];

  constructor(private router: Router, private service: AuthenticationService) { }

  ngOnInit() {
    this.usertype = this.service.getChosenUsertype();
    if (this.usertype.type === "company") {
      this.service.getFields().subscribe((fields: Field[]) => {
        this.fields = fields;
      });
    }
  }

}
