import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ApprovalStatusReportComponent } from './approval-status-report/approval-status-report.component';
import { EmpAttendanceReportComponent } from './emp-attendance-report/emp-attendance-report.component';
import { EmpPunchAttendanceComponent } from './emp-punch-attendance/emp-punch-attendance.component';
import { ExpiryReportComponent } from './expiry-report/expiry-report.component';
import { LeaveHistoryReportComponent } from './leave-history-report/leave-history-report.component';
import { LeaveResumptionComponent } from './leave-resumption/leave-resumption.component';
import { LoanHistoryReportComponent } from './loan-history-report/loan-history-report.component';
import { LoanPaidInstallmentReportComponent } from './loan-paid-installment-report/loan-paid-installment-report.component';
import { PayitemReportComponent } from './payitem-report/payitem-report.component';
import { PunchDataReportComponent } from './punch-data-report/punch-data-report.component';
import { EmpEttendanceCalendarViewComponent } from './emp-ettendance-calendar-view/emp-ettendance-calendar-view.component';
import { AssetExpiryReportComponent } from './asset-expiry-report/asset-expiry-report.component';


const routes: Routes = [
  {
    path:'asset-expiry-report', component:AssetExpiryReportComponent
  },
  {
    path:'calendar-view', component:EmpEttendanceCalendarViewComponent
  },
  {
    path:'punch-data-report',component:PunchDataReportComponent
  },
  {
    path:'approval-status-report', component:ApprovalStatusReportComponent
  },
  {
    path:'leave-resumption-report', component:LeaveResumptionComponent
  },
  {
    path:'emp-attendance-report', component:EmpAttendanceReportComponent,
  },
  {
    path:'emp-punch-atendance', component:EmpPunchAttendanceComponent
  },
  {
    path:'leave-history-report', component:LeaveHistoryReportComponent
  },
  {
    path:'payitem-report', component:PayitemReportComponent
  },
  {
    path:'expiry-report', component:ExpiryReportComponent
  },
  {
    path:'loan-history-report', component:LoanHistoryReportComponent
  },
  {
    path:'loan-installment-report', component:LoanPaidInstallmentReportComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportRoutingModule { }
