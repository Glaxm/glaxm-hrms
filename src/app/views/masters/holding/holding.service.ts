import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HoldingService {

  constructor(private http:HttpClient) { }

  getAllHolding(){
    return this.http.get(environment.IP+"/api/masters/holding/getallholding")
  }

  getCompanyList(){
    return this.http.get(environment.IP+"/api/masters/company/getallcompanies?userId="+sessionStorage.getItem("userId"))
  }

  addUpdateHolding(data){
    return this.http.post(environment.IP+"/api/masters/holding/saveholding",data);
  }

  getHoldingById(id){
    return this.http.get(environment.IP+"/api/masters/holding/getholdingbyid/"+id);
  }

  fileUpload(holdingid,data){
    return this.http.post(environment.IP+"/api/masters/holding/saveholdinglogo?holdingId="+holdingid,data);
  }

}
