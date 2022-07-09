import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AccommodationService {

  constructor(private http:HttpClient) { }

  getAccommodationList(data){
    return this.http.post(environment.IP+"/api/masters/accommodation/getallaccommodation?userId="+sessionStorage.getItem("userId"),data);
  }

  getCompanyListByHoldingId(id){
    return this.http.get(environment.IP+"/api/masters/company/getallcompaniesbyholdingid/"+id)
  }

  getHoldingList(){
    return this.http.get(environment.IP+"/api/masters/holding/getallholding")
  }

  getAccommodationById(id){
    return this.http.get(environment.IP+"/api/masters/accommodation/getaccommodationbyid/"+id)
  }

  addUpdateAccommodation(data){
    return this.http.post(environment.IP+"/api/masters/accommodation/saveaccommodation",data)
  }

  getEmpList(moduleid,data){
    return this.http.post(environment.IP+'/api/employee/getallemployee?userId='+sessionStorage.getItem("userId")+"&moduleId="+moduleid,data);
  }

}
