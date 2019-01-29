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

  user: Student | Company | Admin;

  constructor(private http: HttpClient) { }

  setCurrentUser(user: Student | Admin | Company) {
    this.user = user;
    sessionStorage.setItem("username", user.username.toString());
  }

  getCurrentUser() {
    if (sessionStorage.getItem("username") === null) return null;
    return this.user;
  }

  removeCurrentUser() {
    this.user = null;
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

  uploadImage(user: Student | Company, image: File) {
    const formData: FormData = new FormData();
    formData.append("username", user.username.toString());
    formData.append("type", user.type.toString());
    formData.append("image", image);
    return this.http.post(uri + '/upload/image', formData);
  }

  getImageURI(imagePath: String) {
    return uri + "/" +  imagePath;
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
