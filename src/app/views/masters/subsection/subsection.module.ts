import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SubsectionRoutingModule } from './subsection-routing.module';
import { SubsectionComponent } from './subsection.component';
import { AddSubsectionComponent } from './add-subsection/add-subsection.component';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';


@NgModule({
  declarations: [SubsectionComponent, AddSubsectionComponent],
  imports: [
    CommonModule,
    SubsectionRoutingModule,
    NgbDropdownModule,
    SharedModule,
    NgMultiSelectDropDownModule.forRoot()
  ]
})
export class SubsectionModule { }
