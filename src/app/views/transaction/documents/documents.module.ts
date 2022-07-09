import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DocumentsRoutingModule } from './documents-routing.module';
import { DocumentsComponent } from './documents.component';
import { AddDocumentsComponent } from './add-documents/add-documents.component';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';


@NgModule({
  declarations: [DocumentsComponent, AddDocumentsComponent],
  imports: [
    CommonModule,
    DocumentsRoutingModule,
    NgMultiSelectDropDownModule.forRoot(),
    NgbDropdownModule,
    SharedModule
  ],
  providers:[]
})
export class DocumentsModule { }
