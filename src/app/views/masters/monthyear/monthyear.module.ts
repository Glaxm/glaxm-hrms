import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MonthyearRoutingModule } from './monthyear-routing.module';
import { MonthyearComponent } from './monthyear.component';
import { AddMonthyearComponent } from './add-monthyear/add-monthyear.component';

import { SharedModule } from 'src/app/theme/shared/shared.module';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';


@NgModule({
  declarations: [MonthyearComponent, AddMonthyearComponent],
  imports: [
    CommonModule,
    MonthyearRoutingModule,
    NgbDropdownModule,
    SharedModule,
    NgMultiSelectDropDownModule.forRoot()
  ]
})
export class MonthyearModule { }
