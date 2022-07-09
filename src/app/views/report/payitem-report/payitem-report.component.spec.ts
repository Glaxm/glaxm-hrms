import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PayitemReportComponent } from './payitem-report.component';

describe('PayitemReportComponent', () => {
  let component: PayitemReportComponent;
  let fixture: ComponentFixture<PayitemReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PayitemReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PayitemReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
