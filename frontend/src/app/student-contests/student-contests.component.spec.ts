import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentContestsComponent } from './student-contests.component';

describe('StudentContestsComponent', () => {
  let component: StudentContestsComponent;
  let fixture: ComponentFixture<StudentContestsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentContestsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentContestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
