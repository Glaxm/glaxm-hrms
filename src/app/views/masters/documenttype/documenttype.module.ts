import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DocumenttypeRoutingModule } from './documenttype-routing.module';
import { DocumenttypeComponent } from './documenttype.component';
import { AddDocumenttypeComponent } from './add-documenttype/add-documenttype.component';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';


@NgModule({
  declarations: [DocumenttypeComponent, AddDocumenttypeComponent],
  imports: [
    CommonModule,
    DocumenttypeRoutingModule,
    NgbDropdownModule,
    NgMultiSelectDropDownModule.forRoot(),
    SharedModule
  ]
})
export class DocumenttypeModule { }
