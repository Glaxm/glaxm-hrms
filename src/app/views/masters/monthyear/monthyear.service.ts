import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MonthyearService {
  getAllMonthyear() {
    return this.http.get(environment.IP+"/api/master/months/getallmonths")
  }
  
  saveUpdateMonthyear(value: any) {
    return this.http.post(environment.IP+"/api/master/months/savemonth",value)
  }

  getAllHolding() {
    return this.http.get(environment.IP+"/api/masters/holding/getallholding")
  }

  getCompanyById(id,moduleId) {
    return this.http.get(environment.IP+"/api/masters/company/getuserwisecompbyholdingid?holdingId="+id+"&userId="+sessionStorage.getItem("userId")+"&moduleId="+moduleId)
  }

  

  getMonthyearDetailsById(monthyearId: any) {
    return this.http.get(environment.IP+"/api/master/months/getmonthbyid/"+monthyearId)
  }

  constructor(private http:HttpClient) { }

}
