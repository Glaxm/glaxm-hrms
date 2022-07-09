import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRamadanRuleComponent } from './add-ramadan-rule.component';

describe('AddRamadanRuleComponent', () => {
  let component: AddRamadanRuleComponent;
  let fixture: ComponentFixture<AddRamadanRuleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddRamadanRuleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddRamadanRuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
