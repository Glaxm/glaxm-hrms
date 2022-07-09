import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApprovestatusService {

  constructor(private http:HttpClient) { }
  
  getapprovestatusList(id){
    return this.http.get(environment.IP+"/api/approvals/G_APPROVALREQ/Get_Approver_summary/"+id);
  }

  approvestatusdatatable(){
    return this.http.get(environment.IP+"/api/approvals/G_APPROVALREQ/Get_Approver_summary?approver_id="+sessionStorage.getItem("userId")+"&length=10&page=1");
  }

  approvestatusdatatable1(data){
    return this.http.get(environment.IP+"/api/approvals/G_APPROVALREQ/Get_Approver_summary?approver_id="+sessionStorage.getItem("userId")+"&"+data);
  }


  getCompanyListByHoldingId(id){
    return this.http.get(environment.IP+"/api/masters/company/getallcompaniesbyholdingid/"+id)
  }

  getHoldingList(){
    return this.http.get(environment.IP+"/api/masters/holding/getallholding")
  }

  addUpdateapprovestatus(data){
    return this.http.post(environment.IP+"/api/masters/approvestatus/saveapprovestatus",data)
  }

  getapprovestatusById(id){
    return this.http.get(environment.IP+"/api/masters/approvestatus/getapprovestatusbyid/"+id);
  }

  updateApprovalStatus(data){
    return this.http.post(environment.IP+"/api/approvals/approvestatus/updatestatus",data)
  }


}
