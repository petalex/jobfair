import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const uri: String = "http://localhost:4000";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http: HttpClient) { }

  getUserTypes() {
    return this.http.get(uri + '/usertypes');
  }

  login() {
    
  }
}
