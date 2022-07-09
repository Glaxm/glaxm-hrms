import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddEditPreapprovalComponent } from './add-edit-preapproval/add-edit-preapproval.component';
import { PreApprovalComponent } from './pre-approval.component';


const routes: Routes = [
  {
    path:"pre-approval-summary",
    component:PreApprovalComponent
  },
  {
    path:"add-update-preapproval",
    component:AddEditPreapprovalComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PreApprovalRoutingModule { }
