import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShiftRuleComponent } from './shift-rule.component';

describe('ShiftRuleComponent', () => {
  let component: ShiftRuleComponent;
  let fixture: ComponentFixture<ShiftRuleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShiftRuleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShiftRuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
