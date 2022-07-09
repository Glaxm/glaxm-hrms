import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpAttendanceSummaryComponent } from './emp-attendance-summary.component';

describe('EmpAttendanceSummaryComponent', () => {
  let component: EmpAttendanceSummaryComponent;
  let fixture: ComponentFixture<EmpAttendanceSummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmpAttendanceSummaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmpAttendanceSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
