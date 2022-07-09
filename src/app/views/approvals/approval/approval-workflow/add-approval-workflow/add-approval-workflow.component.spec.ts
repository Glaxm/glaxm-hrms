import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddApprovalWorkflowComponent } from './add-approval-workflow.component';

describe('AddApprovalWorkflowComponent', () => {
  let component: AddApprovalWorkflowComponent;
  let fixture: ComponentFixture<AddApprovalWorkflowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddApprovalWorkflowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddApprovalWorkflowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
