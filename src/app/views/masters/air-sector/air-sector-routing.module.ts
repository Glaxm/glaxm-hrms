import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AirSectorComponent } from './air-sector.component';
import { AddAirSectorComponent } from './add-air-sector/add-air-sector.component';


const routes: Routes = [
  { path:'airsector-summary',component:AirSectorComponent },
  { path:'add-edit-airsector', component:AddAirSectorComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AirSectorRoutingModule { }
