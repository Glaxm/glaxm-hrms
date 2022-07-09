import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddJobDefinationComponent } from './add-job-defination.component';

describe('AddJobDefinationComponent', () => {
  let component: AddJobDefinationComponent;
  let fixture: ComponentFixture<AddJobDefinationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddJobDefinationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddJobDefinationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
