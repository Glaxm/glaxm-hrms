import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmpCatComponent } from './emp-cat.component';
import { AddEmpCatComponent } from './add-emp-cat/add-emp-cat.component';


const routes: Routes = [
  {
    path:'empcat-summary',component:EmpCatComponent
  },
  {
    path:'add-empcat',component:AddEmpCatComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmpCatRoutingModule { }
