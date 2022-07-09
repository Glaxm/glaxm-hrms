import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AssignShiftComponent } from './assign-shift.component';


const routes: Routes = [
  {
    path:'shift-assign',component:AssignShiftComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AssignShiftRoutingModule { }
