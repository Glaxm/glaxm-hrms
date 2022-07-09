import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddDivisionComponent } from './add-division/add-division.component';
import { DivisionComponent } from './division.component';


const routes: Routes = [
  {path:'division-summary',component:DivisionComponent},
  { path:'add-division', component:AddDivisionComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DivisionRoutingModule { }
