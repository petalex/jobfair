import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { StudentService } from '../student.service';
import { AuthenticationService } from '../authentication.service';

import { Student } from '../models/student';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {

  username: String;

  constructor(private router: Router, private studentService: StudentService, private authService: AuthenticationService) { }

  ngOnInit() {
    this.username = this.authService.getCurrentUser();
  }

  logout() {
    this.authService.removeCurrentUser();
    this.router.navigate(['/login']);
  }
}
