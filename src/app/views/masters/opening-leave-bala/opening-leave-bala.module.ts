import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OpeningLeaveBalaRoutingModule } from './opening-leave-bala-routing.module';
import { OpeningLeaveBalaComponent } from './opening-leave-bala.component';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';



@NgModule({
  declarations: [OpeningLeaveBalaComponent],
  imports: [
    CommonModule,
    OpeningLeaveBalaRoutingModule,
    NgbDropdownModule,
    SharedModule
  ]
})
export class OpeningLeaveBalaModule { }
