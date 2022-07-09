import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PayItemRoutingModule } from './pay-item-routing.module';
import { PayItemComponent } from './pay-item.component';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { AddPayItemComponent } from './add-pay-item/add-pay-item.component';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [PayItemComponent, AddPayItemComponent],
  imports: [
    CommonModule,
    PayItemRoutingModule,
    NgbDropdownModule,
    SharedModule
  ]
})
export class PayItemModule { }
