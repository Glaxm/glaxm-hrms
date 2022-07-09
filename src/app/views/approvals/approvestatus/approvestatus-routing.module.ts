import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddApprovestatusComponent } from './add-approvestatus/add-approvestatus.component';
import { ApprovestatusComponent } from './approvestatus.component';


const routes: Routes = [
  {path:'approvestatus-summary',component:ApprovestatusComponent},
  {path:'add-approvestatus',component:AddApprovestatusComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ApprovestatusRoutingModule { }
