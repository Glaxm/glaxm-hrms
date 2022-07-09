import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PreApprovalService {

  constructor(private http:HttpClient) { }

  getEmpDetailsById(id){
    return this.http.get(environment.IP+"/api/employee/getempdetailsbyId?empId="+id)
  }

  getEmpAbsenceReqByRquestId(requestId){
    return this.http.get(environment.IP+"/api/empabsence/getempabsencebyreqid?G_APPROVALREQ_ID="+requestId)
  }

  getempAttnbyDt(empId,date){
      return this.http.get(environment.IP+"/api/empattendance/getempAttnbyDt?empId="+empId+"&attnDt="+date);
  }


}