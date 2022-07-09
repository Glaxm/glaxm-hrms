import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExitFormSummaryComponent } from './exit-form-summary.component';

describe('ExitFormSummaryComponent', () => {
  let component: ExitFormSummaryComponent;
  let fixture: ComponentFixture<ExitFormSummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExitFormSummaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExitFormSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
