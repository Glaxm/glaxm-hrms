import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EduCatRoutingModule } from './edu-cat-routing.module';
import { EduCatComponent } from './edu-cat.component';
import { AddEduCatComponent } from './add-edu-cat/add-edu-cat.component';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';


@NgModule({
  declarations: [EduCatComponent, AddEduCatComponent],
  imports: [
    CommonModule,
    EduCatRoutingModule,
    NgbDropdownModule,
    SharedModule,
    NgMultiSelectDropDownModule.forRoot()
  ]
})
export class EduCatModule { }
