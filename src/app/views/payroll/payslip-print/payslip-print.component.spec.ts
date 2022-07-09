import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PayslipPrintComponent } from './payslip-print.component';

describe('PayslipPrintComponent', () => {
  let component: PayslipPrintComponent;
  let fixture: ComponentFixture<PayslipPrintComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PayslipPrintComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PayslipPrintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
