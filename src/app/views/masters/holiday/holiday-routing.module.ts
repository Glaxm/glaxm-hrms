import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HolidayComponent } from './holiday.component';
import { AddHolidayComponent } from './add-holiday/add-holiday.component';


const routes: Routes = [
  {path:'holiday-summary',component:HolidayComponent},
  {path:'add-holiday',component:AddHolidayComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HolidayRoutingModule { }
