import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmployeeloanComponent } from './employeeloan.component';
import { AddEmployeeloanComponent } from './add-employeeloan/add-employeeloan.component';



const routes: Routes = [
  {path:"employeeloan-summary",component:EmployeeloanComponent},
  { path:"add-employeeloan",component:AddEmployeeloanComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeeloanRoutingModule { }
