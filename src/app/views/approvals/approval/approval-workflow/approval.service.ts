import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApprovalService {

  constructor(private http:HttpClient) { }

  getAllApprovalList(data){
    return this.http.post(environment.IP+"/api/approvalwf/getapprovalwfbyCompid",data);
  }

  getApprovalDetailsById(id){
    return this.http.get(environment.IP+"/api/approvalwf/getapprovalwfbyid/"+id);
  }

  getAllHolding(){
    return this.http.get(environment.IP+"/api/masters/holding/getallholding")
  }
  getCompanyById(holdingId){
    return this.http.get(environment.IP+"/api/masters/company/getallcompaniesbyholdingid/"+holdingId);
  }

  getModuleList(){
    return this.http.get(environment.IP+'/api/module/getall');
  }

  getAllFunction(data){
    return this.http.post(environment.IP+"/api/division/getdivisionbyCompid",data);
  }

  saveUpdateApproval(data){
    return this.http.post(environment.IP+"/api/approvalwf/saveupdateapprovalwf",data);
  }
 
  getApprovalLevelListById(id){
    return this.http.get(environment.IP+"/api/approvals/G_APPROVALLEVEL/getallapprovallevelbywfid/"+id);
  }

  getApprovalEmailListById(id){
    return this.http.get(environment.IP+"/api/mailGroup/getmailGroupbywfId?wfId="+id);
   }

  getApprovalLevelById(id){
    ///  return this.http.get(environment.IP+"/api/approvallevel/getapprovallevelbyid/"+id);
    return this.http.get(environment.IP+"/api/approvals/G_APPROVALLEVEL/getapprovallevelbyid/"+id);
   
  }
getUserList(){
  return this.http.get(environment.IP+"/api/users/getall");
}
saveUpdateApprovalLevel(data){
  return this.http.post(environment.IP+"/api/approvals/G_APPROVALLEVEL/saveupdateapprovallevel",data);
  
}

saveUpdateApprovalEmail(data){
  return this.http.post(environment.IP+"/api/mailGroupLine/saveMailDetails",data);
}

getApprovalEmailById(id){
  return this.http.get(environment.IP+"/api/mailGroupLine/getmailgrLinebyid?id="+id);
}

getemplbycompDeptid(data){
  return this.http.post(environment.IP+"/api/employee/getemplbycompDeptid",data);
}

getAllDept(data){
  return this.http.post(environment.IP+"/api/masters/dept/getdeptbyCompid",data);
}

  
}
