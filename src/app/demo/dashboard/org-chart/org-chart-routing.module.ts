import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OrgChartComponent } from './org-chart.component';


const routes: Routes = [
  {
    path:'',
    component:OrgChartComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrgChartRoutingModule { }
