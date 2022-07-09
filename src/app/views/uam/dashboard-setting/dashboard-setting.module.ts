import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardSettingRoutingModule } from './dashboard-setting-routing.module';
import { DashboardSettingComponent } from './dashboard-setting.component';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { AddDashboardSettingComponent } from './add-dashboard-setting/add-dashboard-setting.component';


@NgModule({
  declarations: [DashboardSettingComponent, AddDashboardSettingComponent],
  imports: [
    CommonModule,
    DashboardSettingRoutingModule,
    SharedModule,
    NgbDropdownModule,
    NgMultiSelectDropDownModule.forRoot()
  ]
})
export class DashboardSettingModule { }
