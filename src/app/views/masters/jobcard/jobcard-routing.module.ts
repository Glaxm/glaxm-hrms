import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddJobcardComponent } from './add-jobcard/add-jobcard.component';
import { JobcardComponent } from './jobcard.component';


const routes: Routes = [
  {
    path:'jobcard-summary',component:JobcardComponent
  },
  {
    path:'add-jobcard',component:AddJobcardComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class JobcardRoutingModule { }
