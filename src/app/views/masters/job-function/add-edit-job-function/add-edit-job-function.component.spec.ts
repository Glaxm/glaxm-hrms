import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditJobFunctionComponent } from './add-edit-job-function.component';

describe('AddEditJobFunctionComponent', () => {
  let component: AddEditJobFunctionComponent;
  let fixture: ComponentFixture<AddEditJobFunctionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddEditJobFunctionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditJobFunctionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
