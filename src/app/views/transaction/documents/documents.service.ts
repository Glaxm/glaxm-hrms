import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DocumentsService {

  constructor(private http:HttpClient) { }

  getdocumentsList(){
    return this.http.get(environment.IP+"/api/assets/AssetTran/getallassettran");
  }

  documentsdatatable(userid,moduleid,data){
    //return this.http.get(environment.IP+"/api/empdochistory/getdochistorySummary?userId="+sessionStorage.getItem("userId")+"&length=10&page=1");
    return this.http.post(environment.IP+"/api/empdochistory/getdochistorySummary?userId="+userid+"&moduleId="+moduleid+"&length=10&page=1",data);
  }

  documentsdatatable1(userid,companylist,data){
    // return this.http.get(environment.IP+"/api/empdochistory/getdochistorySummary?userId="+sessionStorage.getItem("userId")+"&"+data);
     return this.http.post(environment.IP+"/api/empdochistory/getdochistorySummary?userId="+userid+"&"+data,companylist);
  }

  getdocumentsExpiryList(data){
    return this.http.post(environment.IP+"/api/empdochistory/getalldochistory?userId="+sessionStorage.getItem("userId"),data);
  }

  getCompanyListByHoldingId(id){
    return this.http.get(environment.IP+"/api/masters/company/getallcompaniesbyholdingid/"+id)
  }

  uploadCsvFile(data){
    return this.http.post(environment.IP+"/api/empdoc/uploaddocHistory?userId="+sessionStorage.getItem("userId"),data);
  }

  getDocHistoryById(id){
    return this.http.get(environment.IP+"/api/empdochistory/getdoctypebyid/"+id)
  }

  getHoldingList(){
    return this.http.get(environment.IP+"/api/masters/holding/getallholding")
  }

  saveupdatedoc(data){
    return this.http.post(environment.IP+"/api/empdochistory/savedocType",data)
  }

  getAllDocumenttype(){
    return this.http.get(environment.IP+"/api/doctype/getalldocType?userId="+sessionStorage.getItem("userId"));
  }

  getdocumentsById(id){
    return this.http.get(environment.IP+"/api/assets/AssetTran/getassettranbyid/"+id)
  }

  documentsdocuments(data){
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

  uploadDocAttachment(id,imgData){
    return this.http.post(environment.IP+"/api/transaction/empdoctransaction/saveemphistorydoc/"+id,imgData)
  }

  documentExport(data){
    return this.http.get(environment.IP+"/api/empdochistory/exportdochistorySummary?userId="+sessionStorage.getItem("userId")+"&"+data);
  }


}
