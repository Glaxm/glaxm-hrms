import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApprovalService {

  constructor(private http:HttpClient) { }

  getAllApprovalList(){
    return this.http.get(environment.IP+"/api/approvalwf/getallapprovalwf");
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


  saveUpdateApproval(data){
    return this.http.post(environment.IP+"/api/approvalwf/saveupdateapprovalwf",data);
  }
 
  getApprovalLevelListById(id){
    return this.http.get(environment.IP+"/api/approvallevel/getallapprovallevelbywfid/"+id);
  }

  getApprovalLevelById(id){
    return this.http.get(environment.IP+"/api/approvallevel/getapprovallevelbyid/"+id);
  }
getUserList(){
  return this.http.get(environment.IP+"/api/users/getall");
}
saveUpdateApprovalLevel(data){
  return this.http.post(environment.IP+"/api/approvallevel/saveupdateapprovallevel",data);
}
  
}
