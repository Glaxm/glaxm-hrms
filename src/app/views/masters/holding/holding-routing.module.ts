import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HoldingComponent } from './holding.component';
import { AddHoldingComponent } from './add-holding/add-holding.component';


const routes: Routes = [
  { path:'holding-summary',component:HoldingComponent},
  { path:'add-edit-holding', component:AddHoldingComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HoldingRoutingModule { }
