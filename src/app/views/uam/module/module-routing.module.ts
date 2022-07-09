import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ModuleComponent } from './module.component';
import { AddModuleComponent } from './add-module/add-module.component';


const routes: Routes = [
  {
    path:'module-summary',
    component:ModuleComponent
  },
  {path:'add-edit-module',component:AddModuleComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ModuleRoutingModule { }
