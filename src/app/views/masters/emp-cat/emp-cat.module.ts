import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmpCatRoutingModule } from './emp-cat-routing.module';
import { EmpCatComponent } from './emp-cat.component';
import { AddEmpCatComponent } from './add-emp-cat/add-emp-cat.component';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';

@NgModule({
  declarations: [EmpCatComponent, AddEmpCatComponent],
  imports: [
    CommonModule,
    EmpCatRoutingModule,
    NgbDropdownModule,
    SharedModule,
    NgMultiSelectDropDownModule.forRoot()
  ]
})
export class EmpCatModule { }
