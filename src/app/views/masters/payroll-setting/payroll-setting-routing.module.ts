import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddPayrollSettingComponent } from './add-payroll-setting/add-payroll-setting.component';
import { PayrollSettingComponent } from './payroll-setting.component';


const routes: Routes = [  
  {path:'payroll-setting-summary',component:PayrollSettingComponent},
  {path:'add-payroll-setting', component:AddPayrollSettingComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PayrollSettingRoutingModule { }
