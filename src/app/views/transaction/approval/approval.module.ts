import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ApprovalRoutingModule } from './approval-routing.module';
import { ApprovalWorkflowComponent } from './approval-workflow/approval-workflow.component';
import { AddApprovalWorkflowComponent } from './approval-workflow/add-approval-workflow/add-approval-workflow.component';
import { SharedModule } from 'src/app/theme/shared/shared.module';


@NgModule({
  declarations: [ApprovalWorkflowComponent, AddApprovalWorkflowComponent],
  imports: [
    CommonModule,
    SharedModule,
    ApprovalRoutingModule
  ]
})
export class ApprovalModule { }
