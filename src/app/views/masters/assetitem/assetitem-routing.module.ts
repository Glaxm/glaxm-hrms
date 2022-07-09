import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddAssetitemComponent } from './add-assetitem/add-assetitem.component';
import { AssetitemComponent } from './assetitem.component';


const routes: Routes = [
  {path:'assetitem-summary',component:AssetitemComponent},
  {path:'add-assetitem',component:AddAssetitemComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AssetitemRoutingModule { }
