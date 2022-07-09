import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AssettypeService {

  constructor(private http:HttpClient) { }

  getAssettypeList(){
    return this.http.get(environment.IP+"/api/assets/AssetType/getallassettype");
  }

  getCompanyListByHoldingId(id){
    return this.http.get(environment.IP+"/api/masters/company/getallcompaniesbyholdingid/"+id)
  }

  getHoldingList(){
    return this.http.get(environment.IP+"/api/masters/holding/getallholding")
  }

  getAssettypeById(id){
    return this.http.get(environment.IP+"/api/assets/AssetType/getassettypebyid/"+id)
  }

  getAllAssetGroup(){
    return this.http.get(environment.IP+"/api/assets/AssetGroup/getallassetgroup")
  }

  addUpdateAssettype(data){
    return this.http.post(environment.IP+"/api/assets/AssetType/saveassettype",data)
  }

}
//api/assets/AssetType/getallassettype
///api/assets/AssetType/getassettypebyid/1
//api/assets/AssetType/saveassettype
//api/assets/AssetType/deleteassettype