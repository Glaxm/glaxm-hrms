import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OpeningLeaveBalaComponent } from './opening-leave-bala.component';


const routes: Routes = [
  {path:'openig-leave-balance-summary',component:OpeningLeaveBalaComponent},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OpeningLeaveBalaRoutingModule { }
