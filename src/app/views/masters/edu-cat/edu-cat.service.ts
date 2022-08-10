import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EduCatService {

  constructor(private http:HttpClient) { }

  getEduCatList(company){
   // return this.http.get(environment.IP+"/api/masters/empcat/getempcatSummary?userId="+sessionStorage.getItem("userId")+"&page=1&length=10",company);
   return this.http.get(environment.IP+"/api/masters/educategory/getalleducategory?userId="+sessionStorage.getItem("userId"));
  }

  searchEmpCat(data,company){
    return this.http.get(environment.IP+"/api/masters/empcat/getempcatSummary?userId="+sessionStorage.getItem("userId")+"&"+data,company);
  }

  getCompanyListByHoldingId(id){
    return this.http.get(environment.IP+"/api/masters/company/getallcompaniesbyholdingid/"+id)
  }

  getHoldingList(){
    return this.http.get(environment.IP+"/api/masters/holding/getallholding")
  }

  getEduCatById(id){
    return this.http.get(environment.IP+"/api/masters/educategory/geteducategorybyid/"+id)
  }

  addUpdateEduCat(data){
    return this.http.post(environment.IP+"/api/masters/educategory/saveeducategory",data)
  }

}
