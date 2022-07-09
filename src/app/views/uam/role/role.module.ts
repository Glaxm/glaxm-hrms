import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RoleRoutingModule } from './role-routing.module';
import { RoleComponent } from './role.component';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { AddRoleComponent } from './add-role/add-role.component';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [RoleComponent, AddRoleComponent],
  imports: [
    CommonModule,
    RoleRoutingModule,
    NgbDropdownModule,
    SharedModule
  ]
})
export class RoleModule { }
