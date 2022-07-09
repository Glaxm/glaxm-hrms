import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DesignationComponent } from './designation.component';
import { AddDesignationComponent } from './add-designation/add-designation.component';


const routes: Routes = [
  {
    path:'designation-summary',component:DesignationComponent
  },
  {
    path:'add-designation',component:AddDesignationComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DesignationRoutingModule { }
