import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPayrollSettingComponent } from './add-payroll-setting.component';

describe('AddPayrollSettingComponent', () => {
  let component: AddPayrollSettingComponent;
  let fixture: ComponentFixture<AddPayrollSettingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddPayrollSettingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPayrollSettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
