import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ExitFormSummaryComponent } from './exit-form-summary/exit-form-summary.component';
import { ExitFormComponent } from './exit-form.component';


const routes: Routes = [{
  path:'exit-form',
  component:ExitFormComponent
},
{
  path:'exit-form-summary',
  component:ExitFormSummaryComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExitFormRoutingModule { }
