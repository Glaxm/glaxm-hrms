import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { JobDefinationRoutingModule } from './job-defination-routing.module';
import { JobDefinationComponent } from './job-defination.component';
import { AddJobDefinationComponent } from './add-job-defination/add-job-defination.component';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [JobDefinationComponent, AddJobDefinationComponent],
  imports: [
    CommonModule,
    JobDefinationRoutingModule,
    NgbDropdownModule,
    SharedModule
  ]
})
export class JobDefinationModule { }
