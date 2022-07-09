import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModuleRoutingModule } from './module-routing.module';
import { ModuleComponent } from './module.component';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { AddModuleComponent } from './add-module/add-module.component';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [ModuleComponent, AddModuleComponent],
  imports: [
    CommonModule,
    ModuleRoutingModule,
    NgbDropdownModule,
    SharedModule
  ]
})
export class ModuleModule { }
