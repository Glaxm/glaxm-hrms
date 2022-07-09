import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VisasponsorRoutingModule } from './visasponsor-routing.module';
import { VisasponsorSummaryComponent } from './visasponsor-summary/visasponsor-summary.component';
import { AddVisasponsorComponent } from './add-visasponsor/add-visasponsor.component';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';


@NgModule({
  declarations: [VisasponsorSummaryComponent, AddVisasponsorComponent],
  imports: [
    CommonModule,
    SharedModule,
    NgMultiSelectDropDownModule.forRoot(),
    NgbDropdownModule,
    VisasponsorRoutingModule
  ]
})
export class VisasponsorModule { }
