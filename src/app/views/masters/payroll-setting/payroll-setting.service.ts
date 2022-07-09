import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PayrollSettingService {

  constructor(private http:HttpClient) { }

  getAllPayrollsetting(data){
    return this.http.post(environment.IP+"/api/masters/payrollsetting/getallpayrollsetting?userId="+sessionStorage.getItem("userId"),data);
  }
  getAllHolding(){
    return this.http.get(environment.IP+"/api/masters/holding/getallholding")
  }
  getCompanyById(holdingId){
    return this.http.get(environment.IP+"/api/masters/company/getallcompaniesbyholdingid/"+holdingId);
  }
  saveUpdatePayrollsetting(data){
    return this.http.post(environment.IP+"/api/masters/payrollsetting/savepayrollsetting",data);
  }

  getPayrollsettingDetailsById(id){
    return this.http.get(environment.IP+"/api/masters/payrollsetting/getpayrollsettingbyid/"+id);
  }
}
