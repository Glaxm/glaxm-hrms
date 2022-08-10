import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  
  { path:'module', loadChildren:()=> import('./module/module.module').then(m=>m.ModuleModule) },
  { path:'role', loadChildren: ()=> import('./role/role.module').then(m=>m.RoleModule) },
  { path:'user', loadChildren: ()=> import('./user/user.module').then(m=>m.UserModule) },
  { path:'dashboard-setting', loadChildren: ()=> import('./dashboard-setting/dashboard-setting.module').then(m=>m.DashboardSettingModule) },
  { path: "masters", loadChildren: ()=> import("./../masters/masters.module").then(m=>m.MastersModule)},
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ViewsRoutingModule { }
