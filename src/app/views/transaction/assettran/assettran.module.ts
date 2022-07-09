import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AssettranRoutingModule } from './assettran-routing.module';
import { AssettranComponent } from './assettran.component';
import { AddAssettranComponent } from './add-assettran/add-assettran.component';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [AssettranComponent, AddAssettranComponent],
  imports: [
    CommonModule,
    NgMultiSelectDropDownModule.forRoot(),
    AssettranRoutingModule,
    NgbDropdownModule,
    SharedModule
  ]
})
export class AssettranModule { }
