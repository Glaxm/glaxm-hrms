import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SkillsService {

  constructor(private http:HttpClient) { }
  
  getSkillsList(){
    return this.http.get(environment.IP+"/api/masters/skill/getallskill?userId="+sessionStorage.getItem("userId"));
  }

  getCompanyListByHoldingId(id){
    return this.http.get(environment.IP+"/api/masters/company/getallcompaniesbyholdingid/"+id)
  }

  getHoldingList(){
    return this.http.get(environment.IP+"/api/masters/holding/getallholding")
  }

  addUpdateSkills(data){
    return this.http.post(environment.IP+"/api/masters/skill/saveskill",data)
  }

  getSKillsById(id){
    return this.http.get(environment.IP+"/api/masters/skill/getskillbyid/"+id);
  }

}
