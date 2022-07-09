import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AssetgroupService {

  constructor(private http:HttpClient) { }

  getAssetgroupList(){
    return this.http.get(environment.IP+"/api/assets/AssetGroup/getallassetgroup");
  }

  getCompanyListByHoldingId(id){
    return this.http.get(environment.IP+"/api/masters/company/getallcompaniesbyholdingid/"+id)
  }

  getHoldingList(){
    return this.http.get(environment.IP+"/api/masters/holding/getallholding")
  }

  getAssetgroupById(id){
    return this.http.get(environment.IP+"/api/assets/AssetGroup/getassetgroupbyid/"+id)
  }

  addUpdateAssetgroup(data){
    return this.http.post(environment.IP+"/api/assets/AssetGroup/saveassetgroup",data)
  }

}
//api/assets/AssetGroup/getallassetgroup
//api/assets/AssetGroup/getassetgroupbyid/1
//api/assets/AssetGroup/saveassetgroup
//api/assets/AssetGroup/deleteassetgroup