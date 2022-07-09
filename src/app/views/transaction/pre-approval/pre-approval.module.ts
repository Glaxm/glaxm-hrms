import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PreApprovalRoutingModule } from './pre-approval-routing.module';
import { PreApprovalComponent } from './pre-approval.component';
import { AddEditPreapprovalComponent } from './add-edit-preapproval/add-edit-preapproval.component';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';


@NgModule({
  declarations: [PreApprovalComponent, AddEditPreapprovalComponent],
  imports: [
    CommonModule,
    PreApprovalRoutingModule,
    SharedModule,
    NgbDropdownModule,
    NgMultiSelectDropDownModule.forRoot()
  ]
})
export class PreApprovalModule { }
