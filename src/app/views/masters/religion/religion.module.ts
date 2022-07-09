import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReligionRoutingModule } from './religion-routing.module';
import { ReligionComponent } from './religion.component';
import { AddReligionComponent } from './add-religion/add-religion.component';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';


@NgModule({
  declarations: [ReligionComponent, AddReligionComponent],
  imports: [
    CommonModule,
    ReligionRoutingModule,
    NgbDropdownModule,
    NgMultiSelectDropDownModule.forRoot(),
    SharedModule
  ]
})
export class ReligionModule { }
