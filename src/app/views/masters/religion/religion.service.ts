import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReligionService {

  constructor(private http:HttpClient) { }

  getReligionList(){
    return this.http.get(environment.IP+"/api/masters/religion/getallreligion?userId="+sessionStorage.getItem("userId"));
  }

  getCompanyListByHoldingId(id){
    return this.http.get(environment.IP+"/api/masters/company/getallcompaniesbyholdingid/"+id)
  }

  getHoldingList(){
    return this.http.get(environment.IP+"/api/masters/holding/getallholding")
  }

  getReligionById(id){
    return this.http.get(environment.IP+"/api/masters/religion/getreligionbyid/"+id)
  }

  addUpdateReligion(data){
    return this.http.post(environment.IP+"/api/masters/religion/savereligion",data)
  }

}
