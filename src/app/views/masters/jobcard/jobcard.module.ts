import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { JobcardRoutingModule } from './jobcard-routing.module';
import { JobcardComponent } from './jobcard.component';
import { AddJobcardComponent } from './add-jobcard/add-jobcard.component';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';


@NgModule({
  declarations: [JobcardComponent, AddJobcardComponent],
  imports: [
    CommonModule,
    JobcardRoutingModule,
    NgbDropdownModule,
    NgMultiSelectDropDownModule.forRoot(),
    SharedModule
  ]
})
export class JobcardModule { }
