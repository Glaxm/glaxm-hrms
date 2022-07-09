import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaveItemComponent } from './leave-item.component';

describe('LeaveItemComponent', () => {
  let component: LeaveItemComponent;
  let fixture: ComponentFixture<LeaveItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeaveItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeaveItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
