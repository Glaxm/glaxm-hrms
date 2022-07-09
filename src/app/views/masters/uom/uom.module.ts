import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UomRoutingModule } from './uom-routing.module';
import { UomComponent } from './uom.component';
import { AddUomComponent } from './add-uom/add-uom.component';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [UomComponent, AddUomComponent],
  imports: [
    CommonModule,
    UomRoutingModule,
    NgbDropdownModule,
    SharedModule
  ]
})
export class UomModule { }
