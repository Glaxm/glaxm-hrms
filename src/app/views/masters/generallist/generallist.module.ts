import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GenerallistRoutingModule } from './generallist-routing.module';
import { GenerallistComponent } from './generallist.component';
import { AddGenerallistComponent } from './add-generallist/add-generallist.component';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [GenerallistComponent, AddGenerallistComponent],
  imports: [
    CommonModule,
    SharedModule,
    NgbDropdownModule,
    GenerallistRoutingModule
  ]
})
export class GenerallistModule { }
