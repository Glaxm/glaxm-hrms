import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {

  constructor(private http:HttpClient) { }

  getAllCurrency(){
      return this.http.get(environment.IP+"/api/masters/currency/getallcurrenct?userId="+sessionStorage.getItem("userId"));
  }
  getAllHolding(){
    return this.http.get(environment.IP+"/api/masters/holding/getallholding")
  }
  getCompanyById(holdingId){
    return this.http.get(environment.IP+"/api/masters/company/getallcompaniesbyholdingid/"+holdingId);

  }
  addUpdateCurrency(data){
    return this.http.post(environment.IP+"/api/masters/currency/savecurrencydetails",data)
  }

  getCurrencyById(id){
    return this.http.get(environment.IP+"/api/masters/currency/getcurrenctbyid/"+id);
  }

}
