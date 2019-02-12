import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyContestSearchComponent } from './company-contest-search.component';

describe('CompanyContestSearchComponent', () => {
  let component: CompanyContestSearchComponent;
  let fixture: ComponentFixture<CompanyContestSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompanyContestSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyContestSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
