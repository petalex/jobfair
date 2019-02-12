import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentCompanyRatingComponent } from './student-company-rating.component';

describe('StudentCompanyRatingComponent', () => {
  let component: StudentCompanyRatingComponent;
  let fixture: ComponentFixture<StudentCompanyRatingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentCompanyRatingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentCompanyRatingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
