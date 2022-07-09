import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployeeRoutingModule } from './employee-routing.module';
import { EmployeeComponent } from './employee.component';
import { NgWizardModule, NgWizardConfig, THEME } from 'ng-wizard';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { ArchwizardModule } from 'ng2-archwizard';
import { EmployeeSummaryComponent } from './employee-summary/employee-summary.component';
import { PayItemComponent } from './pay-item/pay-item.component';
import { EmpSalaryComponent } from './emp-salary/emp-salary.component';
import { EmpSkillsComponent } from './emp-skills/emp-skills.component';
import { EmpLeaveComponent } from './emp-leave/emp-leave.component';
import { BonusComponent } from './bonus/bonus.component';
import { PersonalinfoComponent } from './personalinfo/personalinfo.component';
import { PersonalDocsComponent } from './personal-docs/personal-docs.component';
import { VehicleComponent } from './vehicle/vehicle.component';
import { EmpBankComponent } from './emp-bank/emp-bank.component';
import { AccommodationComponent } from './accommodation/accommodation.component';
import { EmpBenefitsComponent } from './emp-benefits/emp-benefits.component';
import { EmpDocsComponent } from './emp-docs/emp-docs.component';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { LeaveBalComponent } from './leave-bal/leave-bal.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { FormsModule } from '@angular/forms';
import { EmployeeUpdateComponent } from './employee-update/employee-update.component';
// import { ClrWizard, ClrWizardPage } from "@clr/angular";
const ngWizardConfig: NgWizardConfig = {
  theme: THEME.default
};

@NgModule({
  declarations: [EmployeeComponent, EmployeeSummaryComponent, AccommodationComponent,EmpBenefitsComponent,PayItemComponent,VehicleComponent,EmpBankComponent,EmpSalaryComponent,PersonalinfoComponent,EmpSkillsComponent,EmpLeaveComponent,BonusComponent, PersonalDocsComponent,EmpDocsComponent, LeaveBalComponent, EmployeeUpdateComponent],
  imports: [
    CommonModule,
    FormsModule,
    EmployeeRoutingModule,
    SharedModule,
    NgbDropdownModule,
    ArchwizardModule,
    NgMultiSelectDropDownModule.forRoot(),
    NgWizardModule.forRoot(ngWizardConfig)
  ]
})
export class EmployeeModule { }
