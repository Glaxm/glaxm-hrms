import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path:'approvals', loadChildren:()=>import('./approval/approval.module').then(m=>m.ApprovalModule)
  },
  {
    path:'approvalstatus',loadChildren:()=>import('./approvestatus/approvestatus.module').then(m=>m.ApprovestatusModule)
  },
  {
    path:'approvalrequest',loadChildren:()=>import('./requestapp/requestapp.module').then(m=>m.RequestappModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ApprovalsRoutingModule { }
