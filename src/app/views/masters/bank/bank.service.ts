import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BankService {

  constructor(private http:HttpClient) { }

  getAllBank(data){
    return this.http.post(environment.IP+"/api/masters/bank/getallbank?userId="+sessionStorage.getItem("userId"),data);
  }

  getAllHolding(){
    return this.http.get(environment.IP+"/api/masters/holding/getallholding")
  }
  getCompanyById(holdingId){
    return this.http.get(environment.IP+"/api/masters/company/getallcompaniesbyholdingid/"+holdingId);
  }

  saveUpdateBank(data){
    return this.http.post(environment.IP+"/api/masters/bank/savebankdetails",data);
  }

  getBankDetailsById(id){
    return this.http.get(environment.IP+"/api/masters/bank/getbankbyid/"+id);
  }

}

