import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../authentication.service';
import { Usertype } from '../interfaces/usertype';
import { Router } from '@angular/router';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  public usertypes: Usertype[];

  constructor(private router: Router, private service: AuthenticationService) { }

  ngOnInit() {
    this.service.getUsertypes().subscribe((usertypes: Usertype[]) => {
      this.usertypes = usertypes;
    });
    this.service.setChosenUsertype(null);
  }

  chooseUsertype(usertype: Usertype) {
    this.service.setChosenUsertype(usertype);
    if (usertype.type === "guest") {
      this.router.navigate(['/welcome']); // TO-DO
    } else{
      this.router.navigate(['/login']);
    }
  }

}
