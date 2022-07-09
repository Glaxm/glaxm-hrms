import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaveBalComponent } from './leave-bal.component';

describe('LeaveBalComponent', () => {
  let component: LeaveBalComponent;
  let fixture: ComponentFixture<LeaveBalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeaveBalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeaveBalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
