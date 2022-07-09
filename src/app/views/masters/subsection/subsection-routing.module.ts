import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddSubsectionComponent } from './add-subsection/add-subsection.component';
import { SubsectionComponent } from './subsection.component';


const routes: Routes = [
  {path:'subsection-summary',component:SubsectionComponent},
  { path:'add-subsection', component:AddSubsectionComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SubsectionRoutingModule { }
