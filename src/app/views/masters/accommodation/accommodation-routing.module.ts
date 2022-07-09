import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AccommodationMasterComponent } from './accommodation.master.component';
import { AddAccommodationComponent } from './add-accommodation/add-accommodation.component';


const routes: Routes = [
  {path:'accommodation-summary',component:AccommodationMasterComponent},
  {path:'add-accommodation',component:AddAccommodationComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccommodationRoutingModule { }
