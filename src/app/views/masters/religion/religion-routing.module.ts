import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReligionComponent } from './religion.component';
import { AddReligionComponent } from './add-religion/add-religion.component';


const routes: Routes = [
  {path:'religion-summary',component:ReligionComponent},
  {path:'add-religion',component:AddReligionComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReligionRoutingModule { }
