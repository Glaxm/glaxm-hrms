import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmprejoiningComponent } from './emprejoining.component';
import { AddEmprejoiningComponent } from './add-emprejoining/add-emprejoining.component';


const routes: Routes = [
  {path:"emprejoining-summary",component:EmprejoiningComponent},
  { path:"add-emprejoining",component:AddEmprejoiningComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmprejoiningRoutingModule { }
