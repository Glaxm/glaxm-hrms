import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ApprovestatusRoutingModule } from './approvestatus-routing.module';
import { ApprovestatusComponent } from './approvestatus.component';
import { AddApprovestatusComponent } from './add-approvestatus/add-approvestatus.component';
import { SharedModule } from 'src/app/theme/shared/shared.module';


@NgModule({
  declarations: [ApprovestatusComponent, AddApprovestatusComponent],
  imports: [
    CommonModule,
    ApprovestatusRoutingModule,
    SharedModule
  ]
})
export class ApprovestatusModule { }
