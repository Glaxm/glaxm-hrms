import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class JobFunctionService {

  constructor(private http:HttpClient) { }
  getJobFunList(){
    return this.http.get(environment.IP+"/api/masters/jobfunction/getalljobfunction?userId="+sessionStorage.getItem("userId"));
  }

  // getAllDept(){
  //   return this.http.get(environment.IP+"/api/masters/dept/getalldept");
  // }

  getAllDept(data){
    return this.http.post(environment.IP+"/api/masters/dept/getalldept?userId="+sessionStorage.getItem("userId"),data);
  }

  getAllDiv(){
    return this.http.get(environment.IP+"/api/division/getalldivision?userId="+sessionStorage.getItem("userId"));
  }

  getJobFunDataById(id){
    return this.http.get(environment.IP+"/api/masters/jobfunction/getjobfunctionbyid/"+id);
  }

  getCompanyListByHoldingId(id){
    return this.http.get(environment.IP+"/api/masters/company/getallcompaniesbyholdingid/"+id)
  }

  getHoldingList(){
    return this.http.get(environment.IP+"/api/masters/holding/getallholding")
  }

  addUpdateJobFun(data){
    return this.http.post(environment.IP+"/api/masters/jobfunction/savejobfunction",data);
  }
}
