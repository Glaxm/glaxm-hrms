import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CompanyComponent } from './company.component';
import { AddCompanyComponent } from './add-company/add-company.component';


const routes: Routes = [
  { path:'company-summary',component:CompanyComponent },
  { path:'add-edit-company', component:AddCompanyComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CompanyRoutingModule { }
