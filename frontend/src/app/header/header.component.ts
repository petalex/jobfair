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
        // Only logged users can access their pages
        this.router.navigate(["/"]);
      }
    } else {
      if (this.user.type === this.type) {
        if (this.user.type == "student") {
          let student = this.user as Student;
          this.imageSrc = this.service.getImageURI(student.profile);
        } else if (this.user.type == "company") {
          let company = this.user as Company;
          this.imageSrc = this.service.getImageURI(company.logo);
        } else if (this.user.type == "admin") {
          let admin = this.user as Admin;
          this.imageSrc = this.service.getImageURI(admin.profile);
        }
      } else {
        // Logged user can only access pages for their user type
        this.service.removeCurrentUser();
        this.router.navigate(["/"]);
      }
    }
  }

  logout() {
    this.service.removeCurrentUser();
    this.router.navigate(['/login']);
  }
}
