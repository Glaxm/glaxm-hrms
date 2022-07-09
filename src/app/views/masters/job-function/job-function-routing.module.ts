import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { JobFunctionComponent } from './job-function.component';
import { AddEditJobFunctionComponent } from './add-edit-job-function/add-edit-job-function.component';


const routes: Routes = [
  {
    path:'jobfunction-summary',component:JobFunctionComponent
  },
  {
    path:'add-jobfunction',component:AddEditJobFunctionComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class JobFunctionRoutingModule { }
