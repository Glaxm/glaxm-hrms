import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RequestappRoutingModule } from './requestapp-routing.module';
import { RequestappComponent } from './requestapp.component';
import { AddRequestappComponent } from './add-requestapp/add-requestapp.component';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { LeaveRequestComponent } from './add-requestapp/leave-request/leave-request.component';
import { EmpLeave } from './add-requestapp/leave-request/emp-leave.model';
import { LoanRequestComponent } from './add-requestapp/loan-request/loan-request.component';
import { EmpLoan } from './add-requestapp/loan-request/emp-loan.model';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { ExitRequestComponent } from './add-requestapp/exit-request/exit-request.component';
import { ExitRequest } from './add-requestapp/exit-request/exit-request.model';
import { PreApprovalComponent } from './add-requestapp/pre-approval/pre-approval.component';
import { PreApproval } from './add-requestapp/pre-approval/pre-approval.model';


@NgModule({
  declarations: [RequestappComponent, AddRequestappComponent, LeaveRequestComponent, LoanRequestComponent, ExitRequestComponent, PreApprovalComponent],
  imports: [
    CommonModule,
    RequestappRoutingModule,
    SharedModule,
    NgMultiSelectDropDownModule.forRoot(),
  ],providers:[EmpLeave,EmpLoan,ExitRequest,PreApproval]
})
export class RequestappModule { }
