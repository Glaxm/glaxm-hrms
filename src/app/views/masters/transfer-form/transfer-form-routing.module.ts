import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddTransferFormComponent } from './add-transfer-form/add-transfer-form.component';
import { TransferFormComponent } from './transfer-form.component';


const routes: Routes = [
  {
    path:"transfer-form-summary",
    component: TransferFormComponent
  },
  {
    path:"add-edit-transfer-form",
    component:AddTransferFormComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TransferFormRoutingModule { }
