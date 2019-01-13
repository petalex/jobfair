import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Student } from './models/student';
import { Admin } from './models/admin';
import { Company } from './models/company';

const uri: String = "http://localhost:4000";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http: HttpClient) { }

  setCurrentUser(user: Student | Admin | Company) {
    sessionStorage.setItem("username", user.username.toString());
  }

  getCurrentUser() {
    // TO-DO: Find the user
    return sessionStorage.getItem("username");
  }

  removeCurrentUser() {
    sessionStorage.removeItem("username");
  }

  getTypes() {
    return this.http.get(uri + '/types');
  }

  getFields() {
    return this.http.get(uri + '/fields');
  }

  login(username: String, password: String) {
    const data = {
      username: username,
      password: password
    };
    return this.http.post(uri + '/login', data);
  }

  register(user: Student | Company) {
    const data = {
      user: user
    };
    return this.http.post(uri + '/register', data);
  }

  reset(username: String, password: String, newPassword: String) {
    const data = {
      username: username,
      password: password,
      newPassword: newPassword
    };
    return this.http.post(uri + '/reset', data);
  }

}
