import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AirSectorRoutingModule } from './air-sector-routing.module';
import { AddAirSectorComponent } from './add-air-sector/add-air-sector.component';
import { AirSectorComponent } from './air-sector.component';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [AirSectorComponent,AddAirSectorComponent],
  imports: [
    CommonModule,
    AirSectorRoutingModule,
    NgbDropdownModule,
    SharedModule
  ]
})
export class AirSectorModule { }
