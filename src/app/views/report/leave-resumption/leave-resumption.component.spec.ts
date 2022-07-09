import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaveResumptionComponent } from './leave-resumption.component';

describe('LeaveResumptionComponent', () => {
  let component: LeaveResumptionComponent;
  let fixture: ComponentFixture<LeaveResumptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeaveResumptionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeaveResumptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
