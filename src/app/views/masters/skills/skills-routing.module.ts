import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SkillsComponent } from './skills.component';
import { AddSkillsComponent } from './add-skills/add-skills.component';


const routes: Routes = [
  {path:'skills-summary',component:SkillsComponent},
  {path:'add-skills',component:AddSkillsComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SkillsRoutingModule { }
