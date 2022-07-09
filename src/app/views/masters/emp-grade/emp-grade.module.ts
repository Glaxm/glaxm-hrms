import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmpGradeRoutingModule } from './emp-grade-routing.module';
import { EmpGradeComponent } from './emp-grade.component';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { AddEmpGradeComponent } from './add-emp-grade/add-emp-grade.component';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';


@NgModule({
  declarations: [EmpGradeComponent, AddEmpGradeComponent],
  imports: [
    CommonModule,
    EmpGradeRoutingModule,
    NgbDropdownModule,
    SharedModule,
    NgMultiSelectDropDownModule.forRoot()
  ]
})
export class EmpGradeModule { }
