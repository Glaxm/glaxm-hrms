import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PayItemService {

  constructor(private http:HttpClient) { }
  getPayItemList(){
    return this.http.get(environment.IP+"/api/masters/payitem/getallpayitem");
  }

  getCompanyListByHoldingId(id){
    return this.http.get(environment.IP+"/api/masters/company/getallcompaniesbyholdingid/"+id)
  }

  getHoldingList(){
    return this.http.get(environment.IP+"/api/masters/holding/getallholding")
  }
  getPayItemDataById(id){
    return this.http.get(environment.IP+"/api/masters/payitem/getpayitembyid/"+id)
  }

  addUpdatePayItem(data){
    return this.http.post(environment.IP+"/api/masters/payitem/savepayitem",data)
  }

}
