import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddVehicletranComponent } from './add-vehicletran/add-vehicletran.component';
import { VehicletranComponent } from './vehicletran.component';


const routes: Routes = [
  {path:'vehicletran-summary',component:VehicletranComponent},
  {path:'add-vehicletran',component:AddVehicletranComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VehicletranRoutingModule { }
