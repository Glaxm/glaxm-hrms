import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoanPaidInstallmentReportComponent } from './loan-paid-installment-report.component';

describe('LoanPaidInstallmentReportComponent', () => {
  let component: LoanPaidInstallmentReportComponent;
  let fixture: ComponentFixture<LoanPaidInstallmentReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoanPaidInstallmentReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoanPaidInstallmentReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
