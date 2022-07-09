import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddSectionComponent } from './add-section/add-section.component';
import { SectionComponent } from './section.component';


const routes: Routes = [
  {path:'section-summary',component:SectionComponent},
  { path:'add-section', component:AddSectionComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SectionRoutingModule { }
