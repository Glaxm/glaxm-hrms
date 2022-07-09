import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditPreapprovalComponent } from './add-edit-preapproval.component';

describe('AddEditPreapprovalComponent', () => {
  let component: AddEditPreapprovalComponent;
  let fixture: ComponentFixture<AddEditPreapprovalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddEditPreapprovalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditPreapprovalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
