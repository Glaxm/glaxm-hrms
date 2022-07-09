import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PunchDataReportComponent } from './punch-data-report.component';

describe('PunchDataReportComponent', () => {
  let component: PunchDataReportComponent;
  let fixture: ComponentFixture<PunchDataReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PunchDataReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PunchDataReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
