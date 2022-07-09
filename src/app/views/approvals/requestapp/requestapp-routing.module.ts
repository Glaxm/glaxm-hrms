import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddRequestappComponent } from './add-requestapp/add-requestapp.component';
import { RequestappComponent } from './requestapp.component';


const routes: Routes = [
  {path:'request-summary',component:RequestappComponent},
  {path:'add-request',component:AddRequestappComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RequestappRoutingModule { }
