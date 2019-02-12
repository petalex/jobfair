import { Component, OnInit } from '@angular/core';

import { GuestService } from '../guest.service';
import { AuthenticationService } from '../authentication.service';

import { Field } from '../models/field';
import { Company } from '../models/company';

@Component({
  selector: 'app-guest',
  templateUrl: './guest.component.html',
  styleUrls: ['./guest.component.css']
})
export class GuestComponent implements OnInit {

  fields: Field[];
  name: String = "";
  city: String = "";
  selectedFields: String[] = null;
  companies: Company[] = null;
  company: Company = null;

  constructor(private service: GuestService, private authenticationService: AuthenticationService) {
    this.search();
  }

  ngOnInit() {
    this.service.getFields().subscribe((fields: Field[]) => {
      this.fields = fields;
    });
  }

  search() {
    this.service.getCompanies(this.name, this.city, this.selectedFields).subscribe((companies: Company[]) => {
      for (let company of companies) {
        company.logo = this.authenticationService.getImageURI(company.logo);
      }
      this.companies = companies;
    });
  }

  selectCompany(company: Company) {
    this.company = company;
  }

}
