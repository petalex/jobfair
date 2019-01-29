import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { StudentService } from '../student.service';
import { AuthenticationService } from '../authentication.service';

import { Student } from '../models/student';
import { Company } from '../models/company';
import { Admin } from '../models/admin';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {

  user: Student | Company | Admin;

  constructor(private router: Router, private studentService: StudentService, private authService: AuthenticationService) { }

  ngOnInit() {
    this.user = this.authService.getCurrentUser();
  }
}
