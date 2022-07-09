import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EduCatComponent } from './edu-cat.component';
import { AddEduCatComponent } from './add-edu-cat/add-edu-cat.component';


const routes: Routes = [
  {path:'edu-cat-summary',component:EduCatComponent},
  {path:'add-edu-cat',component:AddEduCatComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EduCatRoutingModule { }
