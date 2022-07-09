import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LeaveItemRoutingModule } from './leave-item-routing.module';
import { LeaveItemComponent } from './leave-item.component';


@NgModule({
  declarations: [LeaveItemComponent],
  imports: [
    CommonModule,
    LeaveItemRoutingModule
  ]
})
export class LeaveItemModule { }
