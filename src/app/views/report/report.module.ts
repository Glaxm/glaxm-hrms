import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportRoutingModule } from './report-routing.module';
import { EmpAttendanceReportComponent } from './emp-attendance-report/emp-attendance-report.component';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { EmpPunchAttendanceComponent } from './emp-punch-attendance/emp-punch-attendance.component';
import { NgbDropdownModule, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { LeaveHistoryReportComponent } from './leave-history-report/leave-history-report.component';
import { PayitemReportComponent } from './payitem-report/payitem-report.component';
import { ExpiryReportComponent } from './expiry-report/expiry-report.component';
import { LoanHistoryReportComponent } from './loan-history-report/loan-history-report.component';
import { LoanPaidInstallmentReportComponent } from './loan-paid-installment-report/loan-paid-installment-report.component';
import { LeaveResumptionComponent } from './leave-resumption/leave-resumption.component';
import { ApprovalStatusReportComponent } from './approval-status-report/approval-status-report.component';
import { PunchDataReportComponent } from './punch-data-report/punch-data-report.component';
import { FormsModule } from '@angular/forms';
import { FlatpickrModule } from 'angularx-flatpickr';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { EmpEttendanceCalendarViewComponent } from './emp-ettendance-calendar-view/emp-ettendance-calendar-view.component';
import { AssetExpiryReportComponent } from './asset-expiry-report/asset-expiry-report.component';

@NgModule({
  declarations: [ExpiryReportComponent,EmpAttendanceReportComponent, EmpPunchAttendanceComponent, LeaveHistoryReportComponent, PayitemReportComponent,LoanHistoryReportComponent, LoanPaidInstallmentReportComponent, LeaveResumptionComponent, ApprovalStatusReportComponent, PunchDataReportComponent, EmpEttendanceCalendarViewComponent, AssetExpiryReportComponent],
  imports: [
    CommonModule,
    SharedModule,
    ReportRoutingModule,
    NgbDropdownModule,
    NgMultiSelectDropDownModule.forRoot(),
    CommonModule,
    FormsModule,
    NgbModalModule,
    FlatpickrModule.forRoot(),
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
  ]
})
export class ReportModule { }
