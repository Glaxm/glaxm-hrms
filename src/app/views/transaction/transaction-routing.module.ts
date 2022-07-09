import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path:"emp-attendance",loadChildren:()=>import('./emp-attendance/emp-attendance.module').then(m=>m.EmpAttendanceModule)
  },
  {
    path:'emp-pay-transaction', loadChildren:()=>import('./emp-pay-transaction/emp-pay-transaction.module').then(m=>m.EmpPayTransactionModule)
  },
  {
    path:'emp-leave', loadChildren:()=>import('./emp-leave/emp-leave.module').then(m=>m.EmpLeaveModule)
  },
  {
      path:'emp-rejoin', loadChildren:()=>import('./emprejoining/emprejoining.module').then(m=>m.EmprejoiningModule)
  },
  {
    path:'emp-loan', loadChildren:()=>import('./employeeloan/employeeloan.module').then(m=>m.EmployeeloanModule)
  },
  {
    path:'assettran', loadChildren:()=>import('./assettran/assettran.module').then(m=>m.AssettranModule)
  },
  {
    path:'empleaveresumption', loadChildren:()=>import('./resumption/empleaveresumption/empleaveresumption.module').then(m=>m.EmpleaveresumptionModule)
  },
  {
    path:'exitemp', loadChildren:()=>import('./exit-form/exit-form.module').then(m=>m.ExitFormModule)
  },
  {
    path:'documents', loadChildren:()=>import('./documents/documents.module').then(m=>m.DocumentsModule)
  },
  {
    path:'pre-approval', loadChildren:()=>import('./pre-approval/pre-approval.module').then(m=>m.PreApprovalModule)
  }

  

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TransactionRoutingModule { }

