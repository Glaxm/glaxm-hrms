import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddApprovalWorkflowComponent } from './approval-workflow/add-approval-workflow/add-approval-workflow.component';
import { ApprovalWorkflowComponent } from './approval-workflow/approval-workflow.component';


const routes: Routes = [
  {path:"approval-summary",component:ApprovalWorkflowComponent},
  { path:"add-approval",component:AddApprovalWorkflowComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ApprovalRoutingModule { }
