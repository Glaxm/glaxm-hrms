import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PayrollProcessingDetailComponent } from './payroll-processing-detail.component';

describe('PayrollProcessingDetailComponent', () => {
  let component: PayrollProcessingDetailComponent;
  let fixture: ComponentFixture<PayrollProcessingDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PayrollProcessingDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PayrollProcessingDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
