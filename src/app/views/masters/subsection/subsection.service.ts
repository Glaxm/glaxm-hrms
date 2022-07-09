import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SubsectionService {

  constructor(private http:HttpClient) { }

  getAllSubsection(){
    return this.http.get(environment.IP+"/api/masters/subsection/getallsubsection");
  }

  getAllHolding(){
    return this.http.get(environment.IP+"/api/masters/holding/getallholding");
  }

  getAllCompaniesByHoldingId(id){
    return this.http.get(environment.IP+"/api/masters/company/getallcompaniesbyholdingid/"+id);
  }

  addUpdateSubsection(data){
    return this.http.post(environment.IP+"/api/subsection/savesubsection",data);
  }

  getSubsectionById(id){
    return this.http.get(environment.IP+"/api/subsection/getsubsectionbyid/"+id);
  }

  subsectionDatabase(data){
    return this.http.post(environment.IP+"/api/subsection/getallsubsection?userId="+sessionStorage.getItem("userId"),data);
  }
}
