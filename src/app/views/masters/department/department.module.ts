import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DepartmentRoutingModule } from './department-routing.module';
import { AddDepartmentComponent } from './add-department/add-department.component';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { DepartmentComponent } from './department.component';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';


@NgModule({
  declarations: [DepartmentComponent,AddDepartmentComponent],
  imports: [
    CommonModule,
    DepartmentRoutingModule,
    NgMultiSelectDropDownModule.forRoot(),
    NgbDropdownModule,
    SharedModule
  ]
})
export class DepartmentModule { }
