import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmpAttendanceComponent } from './emp-attendance.component';
import { EmpAttendanceSummaryComponent } from './emp-attendance-summary/emp-attendance-summary.component';


const routes: Routes = [
  { path:'emp-attendance-summary',component:EmpAttendanceSummaryComponent },
  { path:'emp-attendance',component:EmpAttendanceComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmpAttendanceRoutingModule { }
