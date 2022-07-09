import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  constructor(private http:HttpClient) { }

  getAllComapny(){
    return this.http.get(environment.IP+"/api/masters/company/getallcompanies?userId="+sessionStorage.getItem("userId"))
  }
  getAllHolding(){
    return this.http.get(environment.IP+"/api/masters/holding/getallholding")
  }
  getCompanyById(id){
    return this.http.get(environment.IP+"/api/masters/company/getcompanybyid/"+id)
  }
  addUpdateCompany(data){
    return this.http.post(environment.IP+"/api/masters/company/savecompanydetails",data);
  }
  fileUpload(companyid,data){
    return this.http.post(environment.IP+"/api/masters/company/savecompanylogo/"+companyid,data);
  }
}
