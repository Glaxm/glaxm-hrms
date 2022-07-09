import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddVisasponsorComponent } from './add-visasponsor/add-visasponsor.component';
import { VisasponsorSummaryComponent } from './visasponsor-summary/visasponsor-summary.component';


const routes: Routes = [
  {path:'visasponsor-summary',component:VisasponsorSummaryComponent},
  {path:'add-visasponsor',component:AddVisasponsorComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VisasponsorRoutingModule { }
