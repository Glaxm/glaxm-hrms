import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmpGradeComponent } from './emp-grade.component';
import { AddEmpGradeComponent } from './add-emp-grade/add-emp-grade.component';


const routes: Routes = [
  {
    path:'empgrade-summary',component:EmpGradeComponent
  },
  {
    path:'add-empgrade',component:AddEmpGradeComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmpGradeRoutingModule { }
