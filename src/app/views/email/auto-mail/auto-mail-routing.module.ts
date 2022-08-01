import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddUpdateAutoMailComponent } from './add-update-auto-mail/add-update-auto-mail.component';
import { AutoMailComponent } from './auto-mail.component';


const routes: Routes = [
  
    {path:"auto-mail-summary",component:AutoMailComponent},
    { path:"add-update-auto-mail",component:AddUpdateAutoMailComponent}
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AutoMailRoutingModule { }
