import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Usertype } from './interfaces/usertype';

const uri: String = "http://localhost:4000";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private chosenUsertype: Usertype;

  constructor(private http: HttpClient) { }

  getUsertypes() {
    return this.http.get(uri + '/usertypes');
  }

  getFields() {
    return this.http.get(uri + '/fields');
  }

  getChosenUsertype() {
    // TO-DO Session
    return this.chosenUsertype;
  }

  setChosenUsertype(usertype: Usertype) {
    // TO-DO Session
    this.chosenUsertype = usertype;
  }

  login(username: String, password: String, type: String) {
    const data = {
      username: username,
      password: password,
      type: type
    };

    return this.http.post(uri + '/login/', data);
  }

  register() {}

}
