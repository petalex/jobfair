import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const uri: String = "http://localhost:4000";

@Injectable({
  providedIn: 'root'
})
export class GuestService {

  constructor(private http: HttpClient) { }

  getFields() {
    return this.http.get(uri + '/fields');
  }

  getCompanies(name: String, city: String, fields: String[]) {
    const data = {
      name: name,
      city: city,
      fields: fields
    }
    return this.http.post(uri + '/guest/companies', data);
  }

}
