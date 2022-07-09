import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmpLeaveComponent } from './emp-leave.component';
import { AddEmpleaveComponent } from './add-empleave/add-empleave.component';


const routes: Routes = [
  {path:"emp-leave-summary",component:EmpLeaveComponent},
  { path:"add-empleave",component:AddEmpleaveComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmpLeaveRoutingModule { }
