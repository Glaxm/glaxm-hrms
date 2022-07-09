import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpPayTransactionComponent } from './emp-pay-transaction.component';

describe('EmpPayTransactionComponent', () => {
  let component: EmpPayTransactionComponent;
  let fixture: ComponentFixture<EmpPayTransactionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmpPayTransactionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmpPayTransactionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
