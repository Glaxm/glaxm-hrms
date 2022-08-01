import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CountryRoutingModule } from './country-routing.module';
import { CountryComponent } from './country.component';
import { AddUpdateCountryComponent } from './add-update-country/add-update-country.component';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [CountryComponent, AddUpdateCountryComponent],
  imports: [
    CommonModule,
    CountryRoutingModule,
    NgbDropdownModule,
    SharedModule
  ]
})
export class CountryModule { }
