import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RamadanRuleComponent } from './ramadan-rule.component';

describe('RamadanRuleComponent', () => {
  let component: RamadanRuleComponent;
  let fixture: ComponentFixture<RamadanRuleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RamadanRuleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RamadanRuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
