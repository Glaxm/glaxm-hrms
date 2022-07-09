import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AirSectorService {

  constructor(private http:HttpClient) { }

  getAirSectorList(){
      return this.http.get(environment.IP+"/api/masters/airsector/getallairsector");
  }

  uploadCsvFile(data){
    return this.http.post(environment.IP+"/api/airsector/uploadairSector?userId="+sessionStorage.getItem("userId"),data)   
  }

  airsectordatatable(){
     return this.http.get(environment.IP+"/api/masters/airsector/getairsectorsummary?userId="+sessionStorage.getItem("userId")+"&length=10&page=1");
  }

   airsectordatatable1(data){
     return this.http.get(environment.IP+"/api/masters/airsector/getairsectorsummary?userId="+sessionStorage.getItem("userId")+"&"+data);
  }
  
  getAirSectorById(id){
    return this.http.get(environment.IP+"/api/masters/airsector/getairsectorbyid/"+id);
  }
 
  getCompanyListByHoldingId(id){
    return this.http.get(environment.IP+"/api/masters/company/getallcompaniesbyholdingid/"+id)
  }

  getHoldingList(){
    return this.http.get(environment.IP+"/api/masters/holding/getallholding")
  }
  addUpdateAirSector(data){
    return this.http.post(environment.IP+"/api/masters/airsector/saveairsector",data)
  }

  getAllDept(){
    return this.http.get(environment.IP+"/api/masters/dept/getalldept?userId="+sessionStorage.getItem("userId"));
  }
}
