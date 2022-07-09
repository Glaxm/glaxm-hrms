import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmpPayTransactionComponent } from './emp-pay-transaction.component';
import { AddEmpPayTransactionComponent } from './add-emp-pay-transaction/add-emp-pay-transaction.component';

const routes: Routes = [
  {path:"emp-pay-transaction-summary",component:EmpPayTransactionComponent},
  { path:"add-emp-pay-transaction",component:AddEmpPayTransactionComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmpPayTransactionRoutingModule { }
