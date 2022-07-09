import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OpeningLeaveBalService {

  constructor(private http:HttpClient) {

  }
 
  getAllEmpleaveBal(data){
    return this.http.post(environment.IP+"/api/empleavebalance/empleavebalancesummary",data);
  }

  getAllHolding(){
    return this.http.get(environment.IP+"/api/masters/holding/getallholding")
  }

  getCompanyById(holdingId){
    return this.http.get(environment.IP+"/api/masters/company/getallcompaniesbyholdingid/"+holdingId);
  }

  uploadCsvFile(data){
    return this.http.post(environment.IP+"/api/transaction/empleavetransaction/uploadempleaveBal?userId="+sessionStorage.getItem("userId"),data);
  }
}
