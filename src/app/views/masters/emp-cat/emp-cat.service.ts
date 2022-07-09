import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmpCatService {

  constructor(private http:HttpClient) { }

  getEmpCat(){
      return this.http.get(environment.IP+"/api/masters/empcat/getallempcat?userId="+sessionStorage.getItem("userId"));
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
}
