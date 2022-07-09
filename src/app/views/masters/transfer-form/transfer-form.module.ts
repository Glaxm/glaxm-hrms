import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TransferFormRoutingModule } from './transfer-form-routing.module';
import { TransferFormComponent } from './transfer-form.component';
import { AddTransferFormComponent } from './add-transfer-form/add-transfer-form.component';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';


@NgModule({
  declarations: [TransferFormComponent, AddTransferFormComponent],
  imports: [
    CommonModule,
    TransferFormRoutingModule,
    NgbDropdownModule,
    SharedModule,
    NgMultiSelectDropDownModule.forRoot()
  ]
})
export class TransferFormModule { }
