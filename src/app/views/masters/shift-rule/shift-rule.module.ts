import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShiftRuleRoutingModule } from './shift-rule-routing.module';
import { ShiftRuleComponent } from './shift-rule.component';
import { AddShiftRuleComponent } from './add-shift-rule/add-shift-rule.component';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [ShiftRuleComponent, AddShiftRuleComponent],
  imports: [
    CommonModule,
    ShiftRuleRoutingModule,
    NgbDropdownModule,
    SharedModule
  ]
})
export class ShiftRuleModule { }
