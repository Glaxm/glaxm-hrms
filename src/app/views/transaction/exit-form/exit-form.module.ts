import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExitFormRoutingModule } from './exit-form-routing.module';
import { ExitFormComponent } from './exit-form.component';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { ExitFormSummaryComponent } from './exit-form-summary/exit-form-summary.component';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';


@NgModule({
  declarations: [ExitFormComponent, ExitFormSummaryComponent],
  imports: [
    CommonModule,
    SharedModule,
    NgbDropdownModule,
    NgMultiSelectDropDownModule.forRoot(),
    ExitFormRoutingModule
  ]
})
export class ExitFormModule { }
