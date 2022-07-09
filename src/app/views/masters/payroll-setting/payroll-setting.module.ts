import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PayrollSettingRoutingModule } from './payroll-setting-routing.module';
import { PayrollSettingComponent } from './payroll-setting.component';
import { AddPayrollSettingComponent } from './add-payroll-setting/add-payroll-setting.component';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';

@NgModule({
  declarations: [PayrollSettingComponent, AddPayrollSettingComponent],
  imports: [
    CommonModule,
    PayrollSettingRoutingModule,
    NgbDropdownModule,
    SharedModule,
    NgMultiSelectDropDownModule.forRoot()
  ]
})
export class PayrollSettingModule { }
