import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpBankComponent } from './emp-bank.component';

describe('EmpBankComponent', () => {
  let component: EmpBankComponent;
  let fixture: ComponentFixture<EmpBankComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmpBankComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmpBankComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
