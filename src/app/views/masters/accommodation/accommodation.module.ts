import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccommodationRoutingModule } from './accommodation-routing.module';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { AddAccommodationComponent } from './add-accommodation/add-accommodation.component';
import { AccommodationMasterComponent } from './accommodation.master.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [AccommodationMasterComponent, AddAccommodationComponent],
  imports: [
    CommonModule,
    NgMultiSelectDropDownModule.forRoot(),
    AccommodationRoutingModule,
    NgbDropdownModule,
    SharedModule
  ]
})
export class AccommodationModule { }
