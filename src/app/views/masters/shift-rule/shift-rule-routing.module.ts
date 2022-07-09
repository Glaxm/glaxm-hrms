import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ShiftRuleComponent } from './shift-rule.component';
import { AddShiftRuleComponent } from './add-shift-rule/add-shift-rule.component';


const routes: Routes = [
  {path:'shift-rule-summary',component:ShiftRuleComponent},
  { path:'add-shift-rule',component:AddShiftRuleComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShiftRuleRoutingModule { }
