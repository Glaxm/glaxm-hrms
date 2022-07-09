import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddLeaveRuleComponent } from './add-leave-rule.component';

describe('AddLeaveRuleComponent', () => {
  let component: AddLeaveRuleComponent;
  let fixture: ComponentFixture<AddLeaveRuleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddLeaveRuleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddLeaveRuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
