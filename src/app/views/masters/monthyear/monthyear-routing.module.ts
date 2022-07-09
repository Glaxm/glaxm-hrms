import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MonthyearComponent } from './monthyear.component';
import { AddMonthyearComponent } from './add-monthyear/add-monthyear.component';


const routes: Routes = [
  {path:"monthyear-summary",component:MonthyearComponent},
  { path:"add-monthyear",component:AddMonthyearComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MonthyearRoutingModule { }
