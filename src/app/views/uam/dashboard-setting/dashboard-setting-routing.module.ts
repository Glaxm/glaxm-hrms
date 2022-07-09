import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddDashboardSettingComponent } from './add-dashboard-setting/add-dashboard-setting.component';
import { DashboardSettingComponent } from './dashboard-setting.component';


const routes: Routes = [
  {path:'dashboard-setting-summary',component:DashboardSettingComponent},
  { path:'add-edit-dashboard-setting', component:AddDashboardSettingComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardSettingRoutingModule { }
