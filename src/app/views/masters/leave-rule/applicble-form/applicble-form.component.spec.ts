import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicbleFormComponent } from './applicble-form.component';

describe('ApplicbleFormComponent', () => {
  let component: ApplicbleFormComponent;
  let fixture: ComponentFixture<ApplicbleFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApplicbleFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplicbleFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
