import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmpGradeService {

  constructor(private http:HttpClient) { }

  getEmpGradeList(company){
    return this.http.post(environment.IP+"/api/masters/empgrade/getempgradeSummary?userId="+sessionStorage.getItem("userId")+"&page=1&length=10",company);
  }

  getComapnyList(holdingId){
    return this.http.get(environment.IP+"/api/masters/company/getallcompaniesbyholdingid/"+holdingId);
  }

  getHoldingList(){
    return this.http.get(environment.IP+"/api/masters/holding/getallholding");
  }

  addUpdateEmpGrade(data){
    return this.http.post(environment.IP+"/api/masters/empgrade/saveempgrade",data);
  }

  getEmpGradeById(id){
    return this.http.get(environment.IP+"/api/masters/empgrade/getempgradebyid/"+id)
  }

  searchGrade(data,company){
    return this.http.post(environment.IP+"/api/masters/empgrade/getempgradeSummary?userId="+sessionStorage.getItem("userId")+"&"+data,company);
  }

}
