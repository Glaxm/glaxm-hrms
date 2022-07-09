import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BankComponent } from './bank.component';
import { AddEditBankComponent } from './add-edit-bank/add-edit-bank.component';


const routes: Routes = [
  {path:"bank-summary",component:BankComponent},
  { path:"add-edit-bank",component:AddEditBankComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BankRoutingModule { }
