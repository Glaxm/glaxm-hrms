import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { JobFunctionRoutingModule } from './job-function-routing.module';
import { AddEditJobFunctionComponent } from './add-edit-job-function/add-edit-job-function.component';
import { JobFunctionComponent } from './job-function.component';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';


@NgModule({
  declarations: [JobFunctionComponent,AddEditJobFunctionComponent],
  imports: [
    CommonModule,
    JobFunctionRoutingModule,
    NgbDropdownModule,
    SharedModule,
    NgMultiSelectDropDownModule.forRoot()
  ]
})
export class JobFunctionModule { }
