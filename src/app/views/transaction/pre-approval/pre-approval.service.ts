import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PreApprovalService {

  constructor(private http:HttpClient) { }

  preApprovalDatatTable(userid,moduleid,data){
    return this.http.post(environment.IP+"/api/empabsence/getempabsenceSummary?userId="+userid+"&length=10&page=1",data);
  }

  preApprovalDatatTableSearch(userid,companylist,data){
    return this.http.post(environment.IP+"/api/empabsence/getempabsenceSummary?userId="+userid+"&"+data,companylist);
  }

  getEmpDetailsById(id){
    return this.http.get(environment.IP+"/api/employee/getempdetailsbyId?empId="+id)
  }

  getEmpAbsenceReqById(id){
    return this.http.get(environment.IP+"/api/empabsence/getempabsencebyid?lEmpabcenceId="+id)
  }


  getEmployeeList(moduleid,data){
    return this.http.post(environment.IP+"/api/employee/getallemployee?userId="+sessionStorage.getItem("userId")+"&moduleId="+moduleid,data)
  }

  addPreapproval(data){
    return this.http.post(environment.IP+"/api/empabsence/saveempabsence",data)
  }


}
