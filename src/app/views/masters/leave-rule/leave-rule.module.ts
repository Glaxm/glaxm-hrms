import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LeaveRuleRoutingModule } from './leave-rule-routing.module';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { LeaveRuleComponent } from './leave-rule.component';
import { AddLeaveRuleComponent } from './add-leave-rule/add-leave-rule.component';
import { NgbDropdownModule, NgbTabsetModule } from '@ng-bootstrap/ng-bootstrap';
import { EntitlementFormComponent } from './entitlement-form/entitlement-form.component';
import { ApplicbleFormComponent } from './applicble-form/applicble-form.component';
import { RestrictionFormComponent } from './restriction-form/restriction-form.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';


@NgModule({
  declarations: [LeaveRuleComponent, AddLeaveRuleComponent, EntitlementFormComponent, ApplicbleFormComponent, RestrictionFormComponent],
  imports: [
    CommonModule,
    LeaveRuleRoutingModule,
    SharedModule,
    NgbDropdownModule,
    NgbTabsetModule,
    NgMultiSelectDropDownModule.forRoot()
  ]
})
export class LeaveRuleModule { }
