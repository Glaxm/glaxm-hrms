import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SectionService {

  constructor(private http:HttpClient) { }

  getAllSection(){
    return this.http.get(environment.IP+"/api/masters/section/getallsection");
  }

  getAllHolding(){
    return this.http.get(environment.IP+"/api/masters/holding/getallholding");
  }

  getAllCompaniesByHoldingId(id){
    return this.http.get(environment.IP+"/api/masters/company/getallcompaniesbyholdingid/"+id);
  }

  addUpdateSection(data){
    return this.http.post(environment.IP+"/api/section/savesection",data);
  }

  getSectionById(id){
    return this.http.get(environment.IP+"/api/section/getsectionbyid/"+id);
  }

  sectionDatabase(data){
    return this.http.post(environment.IP+"/api/section/getallsection?userId="+sessionStorage.getItem("userId"),data);
  }
}
