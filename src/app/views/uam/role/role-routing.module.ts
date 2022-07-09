import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RoleComponent } from './role.component';
import { AddRoleComponent } from './add-role/add-role.component';


const routes: Routes = [
  {
    path:'role-summary',
    component:RoleComponent
  },
  {path:'add-edit-role',component:AddRoleComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RoleRoutingModule { }
