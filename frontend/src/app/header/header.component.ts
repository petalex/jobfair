import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../authentication.service';

import { Student } from '../models/student';
import { Company } from '../models/company';
import { Admin } from '../models/admin';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Input()
  type: String;
  user: Student | Company | Admin;
  imageSrc: String;

  constructor(private router: Router, private service: AuthenticationService) { }

  ngOnInit() {
    this.user = this.service.getCurrentUser();
    if (this.user == null) {
      if (this.type !== "welcome" && this.type !== "guest") {
        this.router.navigate(["/"]);
      }
    } else {
      let student = this.user as Student;
      this.imageSrc = this.service.getImageURI(student.profile);
    }
  }

  logout() {
    this.service.removeCurrentUser();
    this.router.navigate(['/login']);
  }
}
