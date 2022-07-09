import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class JobDefinationService {

  constructor(private http:HttpClient) { }

  getAllJobdefination(){
    return this.http.get(environment.IP+"api/masters/jobDefination/getalljobdefination");
  }

  getJobfunList(){
    return this.http.get(environment.IP+"/api/masters/jobfunction/getalljobfunction?userId="+sessionStorage.getItem("userId"));
  }

  getUomList(){
    return this.http.get(environment.IP+"/api/masters/unitMeasure/getallunitmeasure");
  }


  getAllHolding(){
    return this.http.get(environment.IP+"/api/masters/holding/getallholding");
  }

  getAllCompaniesByHoldingId(id){
    return this.http.get(environment.IP+"/api/masters/company/getallcompaniesbyholdingid/"+id);
  }

  addUpdateJobdefination(data){
    return this.http.post(environment.IP+"/api/masters/jobDefination/savejobdefination",data);
  }

  getJobdefinationById(id){
    return this.http.get(environment.IP+"/api/masters/jobDefination/getjobdefinationbyid/"+id);
  }

  jobdefinationDatabase(){
    return this.http.get(environment.IP+"/api/masters/jobDefination/getalljobdefination");
  }
}
