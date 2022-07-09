import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VisasponsorService {

  constructor(private http:HttpClient) { }

  getVisasponsorList(data){
    return this.http.post(environment.IP+"/api/masters/visasponsor/getallvisaSponser?userId="+sessionStorage.getItem("userId"),data);
  }

  getCompanyListByHoldingId(id){
    return this.http.get(environment.IP+"/api/masters/company/getallcompaniesbyholdingid/"+id)
  }

  getHoldingList(){
    return this.http.get(environment.IP+"/api/masters/holding/getallholding")
  }

  addUpdateVisasponsor(data){
    return this.http.post(environment.IP+"/api/masters/visasponsor/savevisasponsordetails",data);
  }

  getVisasponsorDataById(id){
    return this.http.get(environment.IP+"/api/masters/visasponsor/getvisasponsorbyid/"+id);
  }

}
