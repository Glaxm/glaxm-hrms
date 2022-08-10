import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DivisionService {

  constructor(private http:HttpClient) { }

  getAllDivision(data){
    return this.http.post(environment.IP+"/api/division/getdivSummary?userId="+sessionStorage.getItem("userId")+"&length=10&page=1",data);
  }

  getAllHolding(){
    return this.http.get(environment.IP+"/api/masters/holding/getallholding");
  }

  getAllCompaniesByHoldingId(id){
    return this.http.get(environment.IP+"/api/masters/company/getallcompaniesbyholdingid/"+id);
  }

  addUpdateDivision(data){
    return this.http.post(environment.IP+"/api/division/savedivision",data);
  }

  getDivisionById(id){
    return this.http.get(environment.IP+"/api/division/getdivisionbyid/"+id);
  }

  searchDivision(data,company){
    return this.http.post(environment.IP+"/api/division/getdivSummary?userId="+sessionStorage.getItem("userId")+"&"+data,company);
  }
}
