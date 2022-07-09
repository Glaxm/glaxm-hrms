import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddDocumentsComponent } from './add-documents/add-documents.component';
import { DocumentsComponent } from './documents.component';


const routes: Routes = [
  {path: 'documents-summary' , component:DocumentsComponent },
  {path: 'add-documents' , component:AddDocumentsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DocumentsRoutingModule { }
