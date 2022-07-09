import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmpIncreamentRoutingModule } from './emp-increament-routing.module';
import { EmpIncreamentComponent } from './emp-increament.component';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { AddEmpIncrementComponent } from './add-emp-increment/add-emp-increment.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [EmpIncreamentComponent, AddEmpIncrementComponent],
  imports: [
    NgMultiSelectDropDownModule.forRoot(),
    CommonModule,
    SharedModule,
    NgbDropdownModule,

    EmpIncreamentRoutingModule
  ]
})
export class EmpIncreamentModule { }
