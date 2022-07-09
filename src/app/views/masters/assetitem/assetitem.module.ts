import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AssetitemRoutingModule } from './assetitem-routing.module';
import { AssetitemComponent } from './assetitem.component';
import { AddAssetitemComponent } from './add-assetitem/add-assetitem.component';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [AssetitemComponent, AddAssetitemComponent],
  imports: [
    CommonModule,
    AssetitemRoutingModule,
    NgbDropdownModule,
    SharedModule
  ]
})
export class AssetitemModule { }
