import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService } from '../authentication.service';
import { StudentService } from '../student.service';

import { Student } from '../models/student';
import { Company } from '../models/company';
import { Admin } from '../models/admin';
import { Contest } from '../models/contest';

@Component({
  selector: 'app-student-contests',
  templateUrl: './student-contests.component.html',
  styleUrls: ['./student-contests.component.css']
})
export class StudentContestsComponent implements OnInit {

  user: Student | Company | Admin;
  contests: Contest[] = null;
  contest: Contest = null;

  constructor(private router: Router, private studentService: StudentService, private authenticationService: AuthenticationService) { }

  ngOnInit() {
    this.user = this.authenticationService.getCurrentUser();
    this.studentService.getAppliedContests(this.user.username).subscribe((contests: Contest[]) => {
      this.contests = contests;
    });
  }

  selectContest(contest: Contest) {
    this.contest = contest;
  }

  isFinished() {
    return this.contest.deadline < new Date();
  }

  respondToOffer(answer: Boolean) {
    
  }

}