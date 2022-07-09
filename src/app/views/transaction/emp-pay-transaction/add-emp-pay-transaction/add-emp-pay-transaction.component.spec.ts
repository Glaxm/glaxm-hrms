import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEmpPayTransactionComponent } from './add-emp-pay-transaction.component';

describe('AddEmpPayTransactionComponent', () => {
  let component: AddEmpPayTransactionComponent;
  let fixture: ComponentFixture<AddEmpPayTransactionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddEmpPayTransactionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEmpPayTransactionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
