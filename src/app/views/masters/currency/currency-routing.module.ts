import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CurrencyComponent } from './currency.component';
import { AddCurrencyComponent } from './add-currency/add-currency.component';


const routes: Routes = [
  { path:'currency-summary',component:CurrencyComponent },
  { path:'add-edit-currency', component:AddCurrencyComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CurrencyRoutingModule { }
