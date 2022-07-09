import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ApprovalRoutingModule } from './approval-routing.module';
import { ApprovalWorkflowComponent } from './approval-workflow/approval-workflow.component';
import { AddApprovalWorkflowComponent } from './approval-workflow/add-approval-workflow/add-approval-workflow.component';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';


@NgModule({
  declarations: [ApprovalWorkflowComponent, AddApprovalWorkflowComponent],
  imports: [
    CommonModule,
    SharedModule,
    ApprovalRoutingModule,
    NgbDropdownModule,
    NgMultiSelectDropDownModule.forRoot(),
  ]
})
export class ApprovalModule { }
