import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddUomComponent } from './add-uom/add-uom.component';
import { UomComponent } from './uom.component';


const routes: Routes = [
  { path:'uom-summary',component:UomComponent },
  { path:'add-uom', component:AddUomComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UomRoutingModule { }
