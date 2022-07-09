import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RamadanRuleComponent } from './ramadan-rule.component';
import { AddRamadanRuleComponent } from './add-ramadan-rule/add-ramadan-rule.component';


const routes: Routes = [
  {path:'ramdan-rules-summary',component:RamadanRuleComponent},
  {path:'add-ramdan-rules', component:AddRamadanRuleComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RamadanRuleRoutingModule { }
