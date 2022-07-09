import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HoldingRoutingModule } from './holding-routing.module';
import { HoldingComponent } from './holding.component';
import { AddHoldingComponent } from './add-holding/add-holding.component';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [HoldingComponent, AddHoldingComponent],
  imports: [
    CommonModule,
    HoldingRoutingModule,
    NgbDropdownModule,
    SharedModule
  ]
})
export class HoldingModule { }
