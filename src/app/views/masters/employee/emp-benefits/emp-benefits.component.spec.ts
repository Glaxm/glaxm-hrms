import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpBenefitsComponent } from './emp-benefits.component';

describe('EmpBenefitsComponent', () => {
  let component: EmpBenefitsComponent;
  let fixture: ComponentFixture<EmpBenefitsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmpBenefitsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmpBenefitsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
