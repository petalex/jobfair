import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Resume } from './models/resume/resume';
import { Company } from './models/company';
import { Contest } from './models/contest';

const uri: String = "http://localhost:4000";

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  constructor(private http: HttpClient) { }

  getResume(username: String) {
    const data = {
      username: username
    }
    return this.http.post(uri + '/student/resume', data);
  }

  saveResume(username: String, resume: Resume) {
    const data = {
      username: username,
      resume: resume
    }
    return this.http.post(uri + '/student/resume/save', data);
  }

  getCompanies(name: String) {
    const data = {
      name: name
    }
    return this.http.post(uri + '/student/companies', data);
  }

  getContests(types: String[], name: String, title: String) {
    const data = {
      types: types,
      name: name,
      title: title
    }
    return this.http.post(uri + '/student/contests', data);
  }

  applyToContest(contest: Contest) {
    const data = {
      contest: contest
    }
    return this.http.post(uri + '/student/contest/apply', data);
  }

  getAppliedContests(username: String) {
    const data = {
      username: username
    }
    return this.http.post(uri + '/student/contests/applied', data);
  }
  
}