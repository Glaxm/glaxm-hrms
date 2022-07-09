import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VehicletranRoutingModule } from './vehicletran-routing.module';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { VehicletranComponent } from './vehicletran.component';
import { AddVehicletranComponent } from './add-vehicletran/add-vehicletran.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [VehicletranComponent, AddVehicletranComponent],
  imports: [
    CommonModule,
    VehicletranRoutingModule,
    NgbDropdownModule,
    NgMultiSelectDropDownModule.forRoot(),
    SharedModule
  ]
})
export class VehicletranModule { }
