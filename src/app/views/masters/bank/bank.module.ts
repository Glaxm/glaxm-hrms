import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BankRoutingModule } from './bank-routing.module';
import { BankComponent } from './bank.component';
import { AddEditBankComponent } from './add-edit-bank/add-edit-bank.component';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';


@NgModule({
  declarations: [BankComponent, AddEditBankComponent],
  imports: [
    CommonModule,
    BankRoutingModule,
    NgbDropdownModule,
    SharedModule,
    NgMultiSelectDropDownModule.forRoot()
  ]
})
export class BankModule { }
