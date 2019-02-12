import { Component, OnInit } from '@angular/core';

import { StudentService } from '../student.service';
import { AuthenticationService } from '../authentication.service';

import { Company } from '../models/company';
import { Contest } from '../models/contest';
import { Student } from '../models/student';
import { Resume } from '../models/resume/resume';
import { Participant } from '../models/participant';

@Component({
  selector: 'app-company-contest-search',
  templateUrl: './company-contest-search.component.html',
  styleUrls: ['./company-contest-search.component.css']
})
export class CompanyContestSearchComponent implements OnInit {

  types: String[] = ["job", "internship"];
  name: String = "";
  title: String = "";
  companies: Company[] = null;
  company: Company = null;
  contests: Contest[] = null;
  companyContests: Contest[] = null;
  contest: Contest = null;
  logoSrc: String = "";
  user: Student;
  resume: Resume;
  participant: Participant;

  constructor(private studentService: StudentService, private authenticationService: AuthenticationService) {
    this.search();
  }

  ngOnInit() {
    this.user = this.authenticationService.getCurrentUser() as Student;
    this.studentService.getResume(this.user.username).subscribe((resume: Resume) => {
      this.resume = resume;
    });
    this.participant = new Participant();
    this.participant.username = this.user.username;
  }

  search() {
    this.studentService.getCompanies(this.name).subscribe((companies: Company[]) => {
      this.companies = companies;
      this.setCompaniesLogoPath();
    });
    this.studentService.getContests(this.types, this.name, this.title).subscribe((contests: Contest[]) => {
      this.contests = contests;
    });
  }

  setCompaniesLogoPath() {
    for (let company of this.companies) {
      company.logo = this.authenticationService.getImageURI(company.logo);
    }
  }

  selectCompany(company: Company) {
    this.company = company;
    this.companyContests = [];
    for (let contest of this.contests) {
        if (company.name === contest.company) {
          this.companyContests.push(contest);
        }
    }
  }

  selectContest(contest: Contest) {
    this.contest = contest;
  }

  loadFromResume() {
    this.participant.firstname = this.resume.firstname;
    this.participant.lastname = this.resume.lastname;
    this.participant.phone = this.resume.phone;
    this.participant.mail = this.resume.mail;
  }

  resetParticipant() {
    this.participant = new Participant;
    this.participant.username = this.user.username;
  }

  apply() {
    this.participant.offered = null;
    this.participant.score = null;
    this.participant.accepted = null;
    this.contest.participants.push(this.participant);
    this.studentService.applyToContest(this.contest).subscribe((company: Company) => {});
    this.resetParticipant();
  }

}
