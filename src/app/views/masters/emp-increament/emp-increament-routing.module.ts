import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddEmpIncrementComponent } from './add-emp-increment/add-emp-increment.component';
import { EmpIncreamentComponent } from './emp-increament.component';


const routes: Routes = [
  {
    path:'increment-summary',component:EmpIncreamentComponent
  },
  {
    path:'add-increment-summary',component:AddEmpIncrementComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmpIncreamentRoutingModule { }
