import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AssignShiftRoutingModule } from './assign-shift-routing.module';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { AssignShiftComponent } from './assign-shift.component';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [AssignShiftComponent],
  imports: [
    CommonModule,
    SharedModule,
    AssignShiftRoutingModule,
    NgbDropdownModule
  ]
})
export class AssignShiftModule { }
