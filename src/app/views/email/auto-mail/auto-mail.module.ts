import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AutoMailRoutingModule } from './auto-mail-routing.module';
import { AutoMailComponent } from './auto-mail.component';
import { AddUpdateAutoMailComponent } from './add-update-auto-mail/add-update-auto-mail.component';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';


@NgModule({
  declarations: [AutoMailComponent, AddUpdateAutoMailComponent],
  imports: [
    CommonModule,
    AutoMailRoutingModule,
    NgbDropdownModule,
    SharedModule,
    NgMultiSelectDropDownModule.forRoot()
  ]
})
export class AutoMailModule { }
