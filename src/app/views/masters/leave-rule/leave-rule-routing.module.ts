import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LeaveRuleComponent } from './leave-rule.component';
import { AddLeaveRuleComponent } from './add-leave-rule/add-leave-rule.component';


const routes: Routes = [
  { path:'leave-rule-summary', component:LeaveRuleComponent},
  { path:'add-leave-rule',component:AddLeaveRuleComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LeaveRuleRoutingModule { }
