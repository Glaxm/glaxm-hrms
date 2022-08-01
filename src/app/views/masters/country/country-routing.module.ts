import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddUpdateCountryComponent } from './add-update-country/add-update-country.component';
import { CountryComponent } from './country.component';


const routes: Routes = [
  {path:'country-summary',component:CountryComponent},
  {path:'add-update-country',component:AddUpdateCountryComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CountryRoutingModule { }
