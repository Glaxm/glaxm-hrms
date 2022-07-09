import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RamadanRuleRoutingModule } from './ramadan-rule-routing.module';
import { RamadanRuleComponent } from './ramadan-rule.component';
import { AddRamadanRuleComponent } from './add-ramadan-rule/add-ramadan-rule.component';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [RamadanRuleComponent, AddRamadanRuleComponent],
  imports: [
    CommonModule,
    RamadanRuleRoutingModule,
    NgbDropdownModule,
    SharedModule
  ]
})
export class RamadanRuleModule { }
