import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmpleaveresumptionRoutingModule } from './empleaveresumption-routing.module';
import { EmpleaveresumptionComponent } from './empleaveresumption.component';
import { AddEmpleaveresumptionComponent } from './add-empleaveresumption/add-empleaveresumption.component';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [EmpleaveresumptionComponent, AddEmpleaveresumptionComponent],
  imports: [
    CommonModule,
    SharedModule,
    EmpleaveresumptionRoutingModule,
    NgbDropdownModule,
    NgMultiSelectDropDownModule.forRoot()
  ]
})
export class EmpleaveresumptionModule { }
