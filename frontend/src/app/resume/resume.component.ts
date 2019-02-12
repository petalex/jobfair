import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService } from '../authentication.service';
import { StudentService } from '../student.service';

import { Resume } from '../models/resume/resume';
import { Education } from '../models/resume/education';
import { Organisation } from '../models/resume/organisation';
import { Work } from '../models/resume/work';
import { Employer } from '../models/resume/employer';
import { ForeignLanguage } from '../models/resume/foreign-language';
import { Student } from '../models/student';

@Component({
  selector: 'app-resume',
  templateUrl: './resume.component.html',
  styleUrls: ['./resume.component.css']
})
export class ResumeComponent implements OnInit {

  readonly NUM_OF_SECTIONS: number = 9;
  sections: Boolean[] = new Array(this.NUM_OF_SECTIONS).fill(false);
  user: Student;
  resume: Resume;

  constructor(private router: Router, private studentService: StudentService, private authenticationService: AuthenticationService) {
  }

  ngOnInit() {
    this.user = this.authenticationService.getCurrentUser() as Student;
    this.studentService.getResume(this.user.username).subscribe((resume: Resume) => {
      if (resume == null) {
        resume = new Resume();
        resume.educations = [];
        let education = new Education();
        education.organisation = new Organisation();
        resume.educations.push(education);
        resume.works = [];
        let work = new Work();
        work.employer = new Employer();
        resume.works.push(work);
        resume.foreigns = [];
        resume.foreigns.push(new ForeignLanguage());
      }
      this.resume = resume;
    });
  }

  toggle(index: number) {
    if (index < 0 || index > this.NUM_OF_SECTIONS) return;
    this.sections[index] = !this.sections[index];
  }

  addEducation() {
    let education = new Education();
    education.organisation = new Organisation();
    this.resume.educations.push(education);
  }

  deleteEducation(index: number) {
    this.resume.educations.splice(index, 1);
  }

  addWork() {
    let work = new Work();
    work.employer = new Employer();
    this.resume.works.push(work);
  }

  deleteWork(index: number) {
    this.resume.works.splice(index, 1);
  }

  addForeign() {
    this.resume.foreigns.push(new ForeignLanguage());
  }

  deleteForeign(index: number) {
    this.resume.foreigns.splice(index, 1);
  }

  save() {
    this.studentService.saveResume(this.user.username, this.resume).subscribe((user: Student) => {
      if (user) {
        this.router.navigate(['/student']);
      }
    });
  }
}
