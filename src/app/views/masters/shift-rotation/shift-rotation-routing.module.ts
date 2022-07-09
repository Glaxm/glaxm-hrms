import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddShiftRotationComponent } from './add-shift-rotation/add-shift-rotation.component';
import { ShiftRotationComponent } from './shift-rotation.component';


const routes: Routes = [
  {
    path:'shiftrotation-summary',component:ShiftRotationComponent
  },
  {
    path:'add-shiftrotation',component:AddShiftRotationComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShiftRotationRoutingModule { }
