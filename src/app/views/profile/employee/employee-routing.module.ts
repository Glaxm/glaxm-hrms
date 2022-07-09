import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmployeeComponent } from './employee.component';
import { EmployeeSummaryComponent } from './employee-summary/employee-summary.component';
import { EmployeeUpdateComponent } from './employee-update/employee-update.component';


const routes: Routes = [
  {
    path:'my-profile-info', component:EmployeeComponent
  },
  {
    path:'my-profile-summary', component:EmployeeSummaryComponent
  },
  {
    path:'employee-update', component:EmployeeUpdateComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeeRoutingModule { }
