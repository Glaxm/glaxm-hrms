import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CurrencyRoutingModule } from './currency-routing.module';
import { AddCurrencyComponent } from './add-currency/add-currency.component';
import { CurrencyComponent } from './currency.component';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';


@NgModule({
  declarations: [CurrencyComponent,AddCurrencyComponent],
  imports: [
    CommonModule,
    CurrencyRoutingModule,
    NgbDropdownModule,
    NgMultiSelectDropDownModule.forRoot(),
    SharedModule
  ]
})
export class CurrencyModule { }
