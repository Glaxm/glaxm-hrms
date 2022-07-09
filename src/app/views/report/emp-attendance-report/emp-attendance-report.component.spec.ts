import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpAttendanceReportComponent } from './emp-attendance-report.component';

describe('EmpAttendanceReportComponent', () => {
  let component: EmpAttendanceReportComponent;
  let fixture: ComponentFixture<EmpAttendanceReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmpAttendanceReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmpAttendanceReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
