import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaveHistoryReportComponent } from './leave-history-report.component';

describe('LeaveHistoryReportComponent', () => {
  let component: LeaveHistoryReportComponent;
  let fixture: ComponentFixture<LeaveHistoryReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeaveHistoryReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeaveHistoryReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
