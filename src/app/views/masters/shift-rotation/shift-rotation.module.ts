import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShiftRotationRoutingModule } from './shift-rotation-routing.module';
import { ShiftRotationComponent } from './shift-rotation.component';
import { AddShiftRotationComponent } from './add-shift-rotation/add-shift-rotation.component';
import { SharedModule } from 'src/app/theme/shared/shared.module';


@NgModule({
  declarations: [ShiftRotationComponent, AddShiftRotationComponent],
  imports: [
    CommonModule,
    ShiftRotationRoutingModule,
    SharedModule
  ]
})
export class ShiftRotationModule { }
