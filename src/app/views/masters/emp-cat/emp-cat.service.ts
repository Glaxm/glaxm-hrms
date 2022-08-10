import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmpCatService {

  constructor(private http:HttpClient) { }

  getEmpCat(company){
      return this.http.post(environment.IP+"/api/masters/empcat/getempcatSummary?userId="+sessionStorage.getItem("userId")+"&page=1&length=10",company);
  }
  getEmpCatById(id){
    return this.http.get(environment.IP+"/api/masters/empcat/getempcatbyid/"+id);
  }

  getComapnyList(holdingId){
    return this.http.get(environment.IP+"/api/masters/company/getallcompaniesbyholdingid/"+holdingId);
  }

  getHoldingList(){
    return this.http.get(environment.IP+"/api/masters/holding/getallholding");
  }
  addUpdateEmpCat(data){
    return this.http.post(environment.IP+"/api/masters/empcat/saveupdateempcat",data);
  }

  empCatSearch(data,company){
    return this.http.post(environment.IP+"/api/masters/empcat/getempcatSummary?userId="+sessionStorage.getItem("userId")+"&"+data,company);
  }
}
