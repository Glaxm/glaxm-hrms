import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PayItemComponent } from './pay-item.component';
import { AddPayItemComponent } from './add-pay-item/add-pay-item.component';


const routes: Routes = [
  {path:'pay-item-summary',component:PayItemComponent},
  {path:'add-pay-item',component:AddPayItemComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PayItemRoutingModule { }
