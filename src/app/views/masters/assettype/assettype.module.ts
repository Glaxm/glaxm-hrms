import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AssettypeRoutingModule } from './assettype-routing.module';
import { AssettypeComponent } from './assettype.component';
import { AddAssettypeComponent } from './add-assettype/add-assettype.component';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [AssettypeComponent, AddAssettypeComponent],
  imports: [
    CommonModule,
    AssettypeRoutingModule,
    NgbDropdownModule,
    SharedModule
  ]
})
export class AssettypeModule { }
