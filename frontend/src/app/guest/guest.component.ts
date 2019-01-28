import { Component, OnInit } from '@angular/core';

import { GuestService } from '../guest.service';

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
  field: String = "";
  companies: Company[] = null;

  constructor(private service: GuestService) {
    this.search();
  }

  ngOnInit() {
    this.service.getFields().subscribe((fields: Field[]) => {
      this.fields = fields;
    });
  }

  search() {
    this.service.getCompanies(this.name, this.city, this.field).subscribe((companies: Company[]) => {
      this.companies = companies;
    });
  }
}
