import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmpPayTransactionRoutingModule } from './emp-pay-transaction-routing.module';
import { EmpPayTransactionComponent } from './emp-pay-transaction.component';
import { AddEmpPayTransactionComponent } from './add-emp-pay-transaction/add-emp-pay-transaction.component';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';


@NgModule({
  declarations: [EmpPayTransactionComponent, AddEmpPayTransactionComponent],
  imports: [
    CommonModule,
    SharedModule,
    EmpPayTransactionRoutingModule,
    NgbDropdownModule,
    NgMultiSelectDropDownModule.forRoot()
  ]
})
export class EmpPayTransactionModule { }
