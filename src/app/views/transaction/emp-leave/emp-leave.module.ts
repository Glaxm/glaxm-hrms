import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmpLeaveRoutingModule } from './emp-leave-routing.module';
import { EmpLeaveComponent } from './emp-leave.component';
import { AddEmpleaveComponent } from './add-empleave/add-empleave.component';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';


@NgModule({
  declarations: [EmpLeaveComponent, AddEmpleaveComponent],
  imports: [
    CommonModule,
    SharedModule,
    EmpLeaveRoutingModule,
    NgbDropdownModule,
    NgMultiSelectDropDownModule.forRoot()
  ]
})
export class EmpLeaveModule { }
