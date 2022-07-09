import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmpAttendanceRoutingModule } from './emp-attendance-routing.module';
import { EmpAttendanceComponent } from './emp-attendance.component';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { EmpAttendanceSummaryComponent } from './emp-attendance-summary/emp-attendance-summary.component';
import { FormsModule } from '@angular/forms';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [EmpAttendanceComponent, EmpAttendanceSummaryComponent],
  imports: [
    CommonModule,
    FormsModule,
    EmpAttendanceRoutingModule,
    SharedModule,
    NgbDropdownModule,
    NgMultiSelectDropDownModule.forRoot()
  ]
})
export class EmpAttendanceModule { }
