import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RequestappService {

  constructor(private http:HttpClient) { }

  //============================
  private subject = new Subject<any>();
  
  setCompanyId(companyid){
      this.subject.next({companyid: companyid});
  }

  getCompanyId(): Observable<any> {
    return this.subject.asObservable();
  }
  
  //============================

  updataeEmpLeaveStatus(leaveid,status){
    return this.http.post(environment.IP+"/api/transaction/empleavetransaction/updtaeempLeavestatus?lEmpleaveId="+leaveid+"&isActive="+status,{});  
  }

  getrequestList(){
    return this.http.get(environment.IP+"/api/masters/request/getallrequest");
  }

  getCompanyListByHoldingId(id){
    return this.http.get(environment.IP+"/api/masters/company/getallcompaniesbyholdingid/"+id)
  }

  getHoldingList(){
    return this.http.get(environment.IP+"/api/masters/holding/getallholding")
  }

  fileUpload(id,imgData){
    return this.http.post(environment.IP+"/api/transaction/empleavetransaction/saveleavedoc/"+id,imgData)
  }

  uploadLoanAttachment(id,imgData){
    return this.http.post(environment.IP+"/api/transaction/emploan/saveemploandoc/"+id,imgData)
  }


  getApprovalRequestSummary(id){
    // return this.http.get(environment.IP+"/api/approvals/G_APPROVALREQ/Get_all_req")'
    return this.http.get(environment.IP+"/api/approvals/G_APPROVALREQ/Get_requester_summary/"+id)

  }

  chkEligibity(id){
    return this.http.get(environment.IP+"/api/employee/checkeligibilityforLoan/"+id)
  }

  addUpdaterequest(data){
    return this.http.post(environment.IP+"/api/approvals/G_APPROVALREQ/Post_req",data)
  }

  addEmpLeaveRequest(data){
    return this.http.post(environment.IP+"/api/transaction/empleavetransaction/saveempleavetransaction",data) 
  }

  addEmpLoanRequest(data){
    return this.http.post(environment.IP+"/api/transaction/emploan/saveemploan",data) 
  }

  addExitRequest(data){
    return this.http.post(environment.IP+"/api/empEOSB/saveeempeosb",data)
  }

  addPreApprovalAbsence(data){
    return this.http.post(environment.IP+"/api/empabsence/saveempabsence",data)
  }

  getApprovalReqHistory(id){
    return this.http.get(environment.IP+"/api/approvals/G_APPROVALREQ/GetLevelWiseStatus/"+id);
  }

  getLeaveBaList(id){
    return this.http.get(environment.IP+"/api/transaction/empleavetransaction/getempleavebalbyreqid/"+id);
  }

  getEmployeeList(moduleid,data){
    return this.http.post(environment.IP+"/api/employee/getallemployee?userId="+sessionStorage.getItem("userId")+"&moduleId="+moduleid,data)
  }


  saveReplacementData(data){
    return this.http.post(environment.IP+"/api/transaction/empleavetransaction/saveempreplacement",data)
  }

  updateempleavedata(data){
    return this.http.post(environment.IP+"/api/transaction/empleavetransaction/updateempleavedata",data)
  }
  updateLoanDates(data){
    return this.http.post(environment.IP+"/api/transaction/emploantransaction/saveemploandates",data)  
  }

  getLeaveBal(data){
    return this.http.post(environment.IP+"/api/transaction/empleavetransaction/allowedLeaves",data)
  }

  getReplacementData(id){
    return this.http.get(environment.IP+"/api/transaction/empleavetransaction/getempreplacementbyreqid/"+id);
  }

  getrequestById(id){
    return this.http.get(environment.IP+"/api/approvals/G_APPROVALREQ/Get_reqdetails_byID/"+id);
  }
  updateApprovalStatus(data){
    return this.http.post(environment.IP+"/api/approvals/approvestatus/updatestatus",data)
  }

  getApprovalWorkflow(userid){
    return this.http.get(environment.IP+"/api/approvalwf/getallapprovalwfbyUserid/"+userid);
  }

  getModuleDetailsById(id){
    return this.http.get(environment.IP+"/api/module/getbyid/"+id);
  }

  approveRequestdatatable(){
    return this.http.get(environment.IP+"/api/approvals/G_APPROVALREQ/Get_requester_summary?userId="+sessionStorage.getItem("userId")+"&length=10&page=1");
  }

  approveRequestdatatable1(data){
    return this.http.get(environment.IP+"/api/approvals/G_APPROVALREQ/Get_requester_summary?userId="+sessionStorage.getItem("userId")+"&"+data);
  }

  fileUploadPreApproval(id,imgData){
    return this.http.post(environment.IP+"/api/empabsence/saveempabsencedoc/"+id,imgData)
  }

}
