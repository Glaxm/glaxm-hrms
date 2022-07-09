import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddShiftRuleComponent } from './add-shift-rule.component';

describe('AddShiftRuleComponent', () => {
  let component: AddShiftRuleComponent;
  let fixture: ComponentFixture<AddShiftRuleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddShiftRuleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddShiftRuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
