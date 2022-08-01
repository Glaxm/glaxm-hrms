import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ShiftRuleService {

  constructor(private http:HttpClient) { }

  getShiftRuleList(l){
    return this.http.post(environment.IP+"/api/masters/shiftrule/getshiftrulesummary?userId="+sessionStorage.getItem("userId")+"&length=10&page=1",l);
  }

  getShiftRuleDatabase(company,data){
    return this.http.post(environment.IP+"/api/masters/shiftrule/getshiftrulesummary?userId="+sessionStorage.getItem("userId")+"&"+data,company);
  }

  getShiftRoleDataById(id){
    return this.http.get(environment.IP+"/api/masters/shiftrule/getshiftrulebyid/"+id);
  }

  getCompanyListByHoldingId(id){
    return this.http.get(environment.IP+"/api/masters/company/getallcompaniesbyholdingid/"+id)
  }

  getHoldingList(){
    return this.http.get(environment.IP+"/api/masters/holding/getallholding")
  }

  addUpdateShiftRule(data){
    return this.http.post(environment.IP+"/api/masters/shiftrule/saveshiftrule",data)
  }

  getAllShiftRule(data){
    return this.http.post(environment.IP+"/api/masters/shiftrule/getallshiftrule",data);
  }

}
