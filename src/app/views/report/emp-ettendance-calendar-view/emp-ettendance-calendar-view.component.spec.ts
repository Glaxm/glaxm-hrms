import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpEttendanceCalendarViewComponent } from './emp-ettendance-calendar-view.component';

describe('EmpEttendanceCalendarViewComponent', () => {
  let component: EmpEttendanceCalendarViewComponent;
  let fixture: ComponentFixture<EmpEttendanceCalendarViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmpEttendanceCalendarViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmpEttendanceCalendarViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
