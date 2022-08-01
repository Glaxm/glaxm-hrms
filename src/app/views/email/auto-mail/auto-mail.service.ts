import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AutoMailService {

  constructor(private http:HttpClient) { }

  getAutoMailDatatable(){
    return this.http.get(environment.IP+"/api/mailGroup/getallmailGrp?userId="+sessionStorage.getItem("userId"));//+"&length=10&page=1",l);
  }

  getAutoMailHeaderByXmailgrpId(id){
    return this.http.get(environment.IP+"/api/mailGroup/getbyid?mailGrpid="+id);
  }

  getHoldingList(){
    return this.http.get(environment.IP+"/api/masters/holding/getallholding");
  }

  getCompanyListByHoldingId(holdingId){
    return this.http.get(environment.IP+"/api/masters/company/getallcompaniesbyholdingid/"+holdingId);    
  }

  getAllUser(){
    return this.http.get(environment.IP+"/api/users/getall");
  }

  getSponsorDataByComapnyID(ids){
    return this.http.post(environment.IP+"/api/masters/visasponsor/getallvisaSponsername",ids);
  }

  getDeptDataByComapnyID(ids){
    return this.http.post(environment.IP+"/api/masters/dept/getdeptbyCompid",ids);
  }

  getShiftDataByComapnyID(ids){
    return this.http.post(environment.IP+"/api/masters/shiftrule/getallshiftrule",ids);
  }

  saveAutoMail(data){
    return this.http.post(environment.IP+"/api/mailGroup/savemailGroup",data);
  }

  getAutoMailLinesSummaryByXmailGroupId(id){
    return this.http.get(environment.IP+"/api/mailGroupLine/getgrLinesbyMailGrpId?mailgrpid="+id);    
  }

  saveAutoMailLine(data){
    return this.http.post(environment.IP+"/api/mailGroupLine/saveMailDetails",data);
  }

  getAutoMailLineByXmailgrplineId(id){
    return this.http.get(environment.IP+"/api/mailGroupLine/getmailgrLinebyid?id="+id);   
  }

}
