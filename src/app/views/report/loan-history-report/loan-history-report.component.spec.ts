import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoanHistoryReportComponent } from './loan-history-report.component';

describe('LoanHistoryReportComponent', () => {
  let component: LoanHistoryReportComponent;
  let fixture: ComponentFixture<LoanHistoryReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoanHistoryReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoanHistoryReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
