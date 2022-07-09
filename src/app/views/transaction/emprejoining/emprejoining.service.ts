import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmprejoiningService {

  constructor(private http:HttpClient) { }
  getAllEmprejoining(){
    return this.http.get(environment.IP+"/api/transaction/empleaverejoin/getallempleaverejoin");
  }

  getAllHolding(){
    return this.http.get(environment.IP+"/api/masters/holding/getallholding")
  }

  getEmpLeaveList(data){
    return this.http.post(environment.IP+"/api/transaction/empleavetransaction/getallempleavetransaction",data)
  }
  
  getEmployeeList(moduleid,data) {
    return this.http.post(environment.IP+"/api/employee/getallemployee?userId="+sessionStorage.getItem("userId")+"&moduleId="+moduleid,data)
  }

  getCompanyById(holdingId){
    return this.http.get(environment.IP+"/api/masters/company/getallcompaniesbyholdingid/"+holdingId);
  }

  saveUpdateEmprejoining(data){
    return this.http.post(environment.IP+"/api/transaction/empleaverejoin/saveemprejoin",data);
  }

  getEmprejoiningDetailsById(id){
    return this.http.get(environment.IP+"/api/transaction/empleaverejoin/getempleaverejoinbyid/"+id);
  }

}
