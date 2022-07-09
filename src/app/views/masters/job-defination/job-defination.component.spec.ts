import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JobDefinationComponent } from './job-defination.component';

describe('JobDefinationComponent', () => {
  let component: JobDefinationComponent;
  let fixture: ComponentFixture<JobDefinationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JobDefinationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JobDefinationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
