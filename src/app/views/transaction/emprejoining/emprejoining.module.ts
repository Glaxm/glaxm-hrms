import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmprejoiningRoutingModule } from './emprejoining-routing.module';
import { EmprejoiningComponent } from './emprejoining.component';
import { AddEmprejoiningComponent } from './add-emprejoining/add-emprejoining.component';
import { SharedModule } from 'src/app/theme/shared/shared.module';


@NgModule({
  declarations: [EmprejoiningComponent, AddEmprejoiningComponent],
  imports: [
    CommonModule,
    SharedModule,
    EmprejoiningRoutingModule
  ]
})
export class EmprejoiningModule { }
