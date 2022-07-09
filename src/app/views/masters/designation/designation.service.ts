import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DesignationService {

  constructor(private http:HttpClient) { }

  getDesignationList(){
    return this.http.get(environment.IP+"/api/masters/empdesig/getallempdesig?userId="+sessionStorage.getItem("userId"));
  }

  getCompanyListByHoldingId(id){
    return this.http.get(environment.IP+"/api/masters/company/getallcompaniesbyholdingid/"+id)
  }

  getHoldingList(){
    return this.http.get(environment.IP+"/api/masters/holding/getallholding")
  }

  addUpdateDesignation(data){
    return this.http.post(environment.IP+"/api/masters/empdesig/saveempdesig",data);
  }

  getDesigDataById(id){
    return this.http.get(environment.IP+"/api/masters/empdesig/getempdesigbyid/"+id);
  }

}
