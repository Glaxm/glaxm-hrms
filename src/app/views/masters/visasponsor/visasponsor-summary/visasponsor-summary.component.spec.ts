import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VisasponsorSummaryComponent } from './visasponsor-summary.component';

describe('VisasponsorSummaryComponent', () => {
  let component: VisasponsorSummaryComponent;
  let fixture: ComponentFixture<VisasponsorSummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VisasponsorSummaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VisasponsorSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
