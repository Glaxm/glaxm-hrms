import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpPunchAttendanceComponent } from './emp-punch-attendance.component';

describe('EmpPunchAttendanceComponent', () => {
  let component: EmpPunchAttendanceComponent;
  let fixture: ComponentFixture<EmpPunchAttendanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmpPunchAttendanceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmpPunchAttendanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
