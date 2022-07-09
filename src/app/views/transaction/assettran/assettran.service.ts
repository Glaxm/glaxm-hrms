import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AssettranService {

  constructor(private http:HttpClient) { }

  getAssettranList(){
    return this.http.get(environment.IP+"/api/assets/AssetTran/getallassettran");
  }

  getCompanyListByHoldingId(id){
    return this.http.get(environment.IP+"/api/masters/company/getallcompaniesbyholdingid/"+id)
  }

  getHoldingList(){
    return this.http.get(environment.IP+"/api/masters/holding/getallholding")
  }

  getAssettranById(id){
    return this.http.get(environment.IP+"/api/assets/AssetTran/getassettranbyid/"+id)
  }

  addUpdateAssettran(data){
    return this.http.post(environment.IP+"/api/assets/AssetTran/saveassettran",data)
  }

  getAssetGroupList(){
    return this.http.get(environment.IP+"/api/assets/AssetGroup/getallassetgroup")
  }

  getAssetTypeListByGroup(id){
    return this.http.get(environment.IP+"/api/assets/AssetType/getassettypebygrpid/"+id)
  }

  getAssetItemListByType(id){
    return this.http.get(environment.IP+"/api/assets/AssetItem/getassetitembytypeid/"+id)
  }

  getEmpListByCompany(id){
    return this.http.get(environment.IP+"/api/employee/getemployeebycompid/"+id)
  }

  getAllEmployee(moduleid,data){
    return this.http.post(environment.IP+"/api/employee/getallemployee?userId="+sessionStorage.getItem("userId")+"&moduleId="+moduleid,data);
  }

}

//api/assets/AssetTran/getallassettran
//api/assets/AssetTran/getassettranbyid/1
//api/assets/AssetTran/saveassettran
//api/assets/AssetTran/deleteassetgroup
