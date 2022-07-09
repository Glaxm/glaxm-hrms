import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AssetgroupRoutingModule } from './assetgroup-routing.module';
import { AssetgroupComponent } from './assetgroup.component';
import { AddAssetgroupComponent } from './add-assetgroup/add-assetgroup.component';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [AssetgroupComponent, AddAssetgroupComponent],
  imports: [
    CommonModule,
    AssetgroupRoutingModule,
    NgbDropdownModule,
    SharedModule
  ]
})
export class AssetgroupModule { }
