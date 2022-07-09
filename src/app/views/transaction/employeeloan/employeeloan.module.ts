import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployeeloanRoutingModule } from './employeeloan-routing.module';
import { EmployeeloanComponent } from './employeeloan.component';
import { AddEmployeeloanComponent } from './add-employeeloan/add-employeeloan.component';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [EmployeeloanComponent, AddEmployeeloanComponent],
  imports: [
    CommonModule,
    SharedModule,
    EmployeeloanRoutingModule,
    NgbDropdownModule,
    NgMultiSelectDropDownModule.forRoot()
  ]
})
export class EmployeeloanModule { }
