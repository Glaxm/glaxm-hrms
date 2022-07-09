import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GenerallistComponent } from './generallist.component';
import { AddGenerallistComponent } from './add-generallist/add-generallist.component';

const routes: Routes = [
  {path:"generallist-summary",component:GenerallistComponent},
  { path:"add-generallist",component:AddGenerallistComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GenerallistRoutingModule { }
