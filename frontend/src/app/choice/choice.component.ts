import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-choice',
  templateUrl: './choice.component.html',
  styleUrls: ['./choice.component.css']
})
export class ChoiceComponent implements OnInit {

  public userTypes: String[];

  constructor(private service: AuthenticationService) { }

  ngOnInit() {
    this.service.getUserTypes().subscribe((userTypes: String[]) => {
      this.userTypes = userTypes;
    });
  }

}
