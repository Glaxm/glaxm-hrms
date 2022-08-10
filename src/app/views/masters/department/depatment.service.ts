import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DepatmentService {

  constructor(private http:HttpClient) { }

  getAllDept(data){
    return this.http.post(environment.IP+"/api/masters/dept/getdeptSummary?userId="+sessionStorage.getItem("userId")+"&page=1&length=10",data);
  }

 

  getAllHolding(){
    return this.http.get(environment.IP+"/api/masters/holding/getallholding");
  }

  getAllCompaniesByHoldingId(id){
    return this.http.get(environment.IP+"/api/masters/company/getallcompaniesbyholdingid/"+id);
  }

  addUpdateDept(data){
    return this.http.post(environment.IP+"/api/masters/dept/savedept",data);
  }

  getDeptById(id){
    return this.http.get(environment.IP+"/api/masters/dept/getdeptbyid/"+id);
  }

  searchDept(data,company){
    return this.http.post(environment.IP+"/api/masters/dept/getdeptSummary?userId="+sessionStorage.getItem("userId")+"&"+data,company);
  }

}
