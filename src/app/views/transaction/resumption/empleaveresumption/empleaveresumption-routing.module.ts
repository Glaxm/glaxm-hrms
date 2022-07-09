import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddEmpleaveresumptionComponent } from './add-empleaveresumption/add-empleaveresumption.component';
import { EmpleaveresumptionComponent } from './empleaveresumption.component';


const routes: Routes = [
  {path:'empleaveresumption-summary',component:EmpleaveresumptionComponent},
  { path:'add-empleaveresumption', component:AddEmpleaveresumptionComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmpleaveresumptionRoutingModule { }
