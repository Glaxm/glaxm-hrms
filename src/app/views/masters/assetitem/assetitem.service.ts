import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AssetitemService {

  constructor(private http:HttpClient) { }

  getAssetitemList(){
    return this.http.get(environment.IP+"/api/assets/AssetItem/getallassetitem");
  }

  getCompanyListByHoldingId(id){
    return this.http.get(environment.IP+"/api/masters/company/getallcompaniesbyholdingid/"+id)
  }

  getHoldingList(){
    return this.http.get(environment.IP+"/api/masters/holding/getallholding")
  }

  getAssetitemById(id){
    return this.http.get(environment.IP+"/api/assets/AssetItem/getassetitembyid/"+id)
  }

  addUpdateAssetitem(data){
    return this.http.post(environment.IP+"/api/assets/AssetItem/saveassetitem",data)
  }

  getAllAssetGroup(){
    return this.http.get(environment.IP+"/api/assets/AssetGroup/getallassetgroup")
  }

  getAllAssetType(id){
    return this.http.get(environment.IP+"/api/assets/AssetType/getassettypebygrpid/"+id)
  }

}
//api/assets/AssetItem/getallassetitem
//api/assets/AssetItem/getassetitembyid/1
//api/assets/AssetItem/getassetitembyempid/3
//api/assets/AssetItem/saveassetitem
//api/assets/AssetItem/deleteassetitem