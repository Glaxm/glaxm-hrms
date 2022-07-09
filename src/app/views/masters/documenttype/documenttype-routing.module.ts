import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddDocumenttypeComponent } from './add-documenttype/add-documenttype.component';
import { DocumenttypeComponent } from './documenttype.component';


const routes: Routes = [
  {path:'documenttype-summary',component:DocumenttypeComponent},
  { path:'add-documenttype', component:AddDocumenttypeComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DocumenttypeRoutingModule { }
