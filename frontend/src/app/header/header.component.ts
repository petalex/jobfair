import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Input()
  type: String;
  name: String;

  constructor(private router: Router, private service: AuthenticationService) { }

  ngOnInit() {
    this.name = this.service.getCurrentUser();
    if (this.name == null) {
      if (this.type !== "welcome" && this.type !== "guest") {
        this.router.navigate(["/"]);
      }
    }
  }

  logout() {
    this.service.removeCurrentUser();
    this.router.navigate(['/login']);
  }
}
