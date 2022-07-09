import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TransferFormService {

  constructor(private http:HttpClient) { }

  getallupdatetrack(){
    return this.http.get(environment.IP+"/api/updateTracker/getallupdatetrack");
  }

  getAllHolding(){
    return this.http.get(environment.IP+"/api/masters/holding/getallholding")
  }
  getCompanyById(holdingId){
    return this.http.get(environment.IP+"/api/masters/company/getallcompaniesbyholdingid/"+holdingId);
  }

  getAllEmployee(moduleid,data){
    return this.http.post(environment.IP+'/api/employee/getallemployee?userId='+sessionStorage.getItem("userId")+"&moduleId="+moduleid,data);
  }

  getCurrPosDetails(id,code){
    return this.http.get(environment.IP+"/api/updateTracker/getCurrentId?empId="+id+"&moduleCode="+code);
  }

  getAllDept(companyid){
    return this.http.post(environment.IP+'/api/masters/dept/getalldept?userId='+sessionStorage.getItem("userId"),companyid);
  }

  getDeptList(data){
    return this.http.post(environment.IP+"/api/masters/dept/getdeptbyCompid",data)
  }

  getAllSubsection(companyId){
    return this.http.post(environment.IP+"/api/subsection/getsubsectbyCompid",companyId)
  }

  getAllSection(companyid){
    return this.http.post(environment.IP+"/api/section/getsectbyCompid",companyid)
  }

  getAllFunction(companyId){
    return this.http.post(environment.IP+"/api/division/getdivisionbyCompid",companyId)
  }

  saveupdatetrack(data){
    return this.http.post(environment.IP+"/api/updateTracker/saveupdatetrack",data)
  }

  
  userdatatable(){
    return this.http.get(environment.IP+"/api/updateTracker/getallupdatetrack?userId="+sessionStorage.getItem("userId")+"&length=10&page=1");
  }

  userdatatable1(data){
    return this.http.get(environment.IP+"/api/updateTracker/getallupdatetrack?userId="+sessionStorage.getItem("userId")+"&"+data);
  }

  getTransferdetailsById(id){
    return this.http.get(environment.IP+"/api/updateTracker/getupdatetrackbyid/"+id);
  }

  getHistoryByEmpId(id){
    return this.http.get(environment.IP+"/api/updateTracker/getUpdatedHistorybyempid?empId="+id);
  }

  getEmpGrade(data){
    return this.http.post(environment.IP+"/api/masters/empgrade/getempgradebyCompid",data)
  }

  getSponsorTypeList(data){
    return this.http.post(environment.IP+"/api/masters/visasponsor/getallvisaSponsername",data);
  }

  getDesignationList(data){
    return this.http.post(environment.IP+"/api/masters/empdesig/getempdesigbyCompid",data)
  }

  getCompanyList(holdingId){
    return this.http.get(environment.IP+"/api/masters/company/getallcompaniesbyholdingid/"+holdingId);
  }

  
}
