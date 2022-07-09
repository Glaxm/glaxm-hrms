import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddAssettypeComponent } from './add-assettype/add-assettype.component';
import { AssettypeComponent } from './assettype.component';


const routes: Routes = [
  {path:'assettype-summary',component:AssettypeComponent},
  {path:'add-assettype',component:AddAssettypeComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AssettypeRoutingModule { }
