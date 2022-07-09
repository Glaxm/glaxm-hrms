import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddJobDefinationComponent } from './add-job-defination/add-job-defination.component';
import { JobDefinationComponent } from './job-defination.component';


const routes: Routes = [
  {path:'job-defination-summary',component:JobDefinationComponent},
  { path:'add-job-defination', component:AddJobDefinationComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class JobDefinationRoutingModule { }
