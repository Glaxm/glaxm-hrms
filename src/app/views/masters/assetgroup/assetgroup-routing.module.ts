import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddAssetgroupComponent } from './add-assetgroup/add-assetgroup.component';
import { AssetgroupComponent } from './assetgroup.component';


const routes: Routes = [
  {path:'assetgroup-summary',component:AssetgroupComponent},
  {path:'add-assetgroup',component:AddAssetgroupComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AssetgroupRoutingModule { }
