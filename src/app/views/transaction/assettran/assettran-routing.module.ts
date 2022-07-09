import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddAssettranComponent } from './add-assettran/add-assettran.component';
import { AssettranComponent } from './assettran.component';


const routes: Routes = [
  {path:'assettran-summary',component:AssettranComponent},
  {path:'add-asseettran',component:AddAssettranComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AssettranRoutingModule { }
