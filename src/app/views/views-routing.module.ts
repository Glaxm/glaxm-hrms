import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  { path:'module', loadChildren:()=> import('./uam/module/module.module').then(m=>m.ModuleModule) },
  { path:'role', loadChildren: ()=> import('./uam/role/role.module').then(m=>m.RoleModule) },
  { path:'user', loadChildren: ()=> import('./uam/user/user.module').then(m=>m.UserModule) },
  { path:'dashboard-setting', loadChildren: ()=> import('./uam/dashboard-setting/dashboard-setting.module').then(m=>m.DashboardSettingModule) },
  { path: "masters", loadChildren: ()=> import("./masters/masters.module").then(m=>m.MastersModule)},
  { path:'transaction',loadChildren:()=>import("./transaction/transaction.module").then(m=>m.TransactionModule)},
  { path: 'payroll', loadChildren:()=>import("./payroll/payroll.module").then(m=>m.PayrollModule)},
  { path: 'report', loadChildren:()=>import("./report/report.module").then(m=>m.ReportModule)},
  { path: 'approval-flow', loadChildren:()=>import("./approvals/approvals.module").then(m=>m.ApprovalsModule)},
  { path:'profile', loadChildren:()=>import("./profile/profile.module").then(m=>m.ProfileModule)}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ViewsRoutingModule { }
