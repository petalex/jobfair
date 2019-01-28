import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-resume',
  templateUrl: './resume.component.html',
  styleUrls: ['./resume.component.css']
})
export class ResumeComponent implements OnInit {

  readonly NUM_OF_SECTIONS: number = 9;
  sections: Boolean[] = new Array(this.NUM_OF_SECTIONS).fill(false);

  constructor() { 
  }

  ngOnInit() {
  }

  toggle(index: number) {
    if (index < 0 || index > this.NUM_OF_SECTIONS) return;
    this.sections[index] = !this.sections[index];
  }
}
