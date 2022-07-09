import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PaySlipComponent } from './pay-slip/pay-slip.component';
import { PayrollProcessingDetailComponent } from './payroll-processing-detail/payroll-processing-detail.component';
import { PayrollProcessingComponent } from './payroll-processing/payroll-processing.component';
import { PayslipPrintComponent } from './payslip-print/payslip-print.component';


const routes: Routes = [
  {path:'payroll-processing', component:PayrollProcessingComponent},
  {path:'payslip-preview', component:PayrollProcessingDetailComponent},
  {path:'pay-slip', component:PaySlipComponent},
  {path:'pay-slip-print', component:PayslipPrintComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PayrollRoutingModule { }
