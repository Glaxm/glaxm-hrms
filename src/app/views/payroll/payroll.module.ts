import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PayrollRoutingModule } from './payroll-routing.module';
import { PayrollProcessingComponent } from './payroll-processing/payroll-processing.component';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { PaySlipComponent } from './pay-slip/pay-slip.component';
import { PayrollProcessingDetailComponent } from './payroll-processing-detail/payroll-processing-detail.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { PayslipPrintComponent } from './payslip-print/payslip-print.component';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [PayrollProcessingComponent, PaySlipComponent, PayrollProcessingDetailComponent, PayslipPrintComponent],
  imports: [
    CommonModule,
    SharedModule,
    PayrollRoutingModule,
    NgbDropdownModule,
    NgMultiSelectDropDownModule.forRoot()
  ]
})
export class PayrollModule { }
