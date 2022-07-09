import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RamdanRuleService {

  constructor(private http:HttpClient) { }

  getCompanyListByHoldingId(id){
    return this.http.get(environment.IP+"/api/masters/company/getallcompaniesbyholdingid/"+id);
  }

  getHoldingList(){
    return this.http.get(environment.IP+"/api/masters/holding/getallholding");
  }

  getRamadanRulesList(){
    return this.http.get(environment.IP+"/api/masters/ramadanrule/getallramadanrule");
  }

  getRamadanRulesById(id){
    return this.http.get(environment.IP+"/api/masters/ramadanrule/getramadanrulebyid/"+id);
  }

  addUpdateRamadanRules(data){
    return this.http.post(environment.IP+"/api/masters/ramadanrule/saveramadanrule",data);
  }

  getEmpCatList(){
    return this.http.get(environment.IP+"/api/masters/empcat/getallempcat?userId="+sessionStorage.getItem("userId"));
  }

  ramadanRulesdatatable(){
    return this.http.get(environment.IP+"/api/masters/ramadanrule/getramadanruleSummary?userId="+sessionStorage.getItem("userId")+"&length=10&page=1");
  }

  ramadanRulesdatatable1(data){
    return this.http.get(environment.IP+"/api/masters/ramadanrule/getramadanruleSummary?userId="+sessionStorage.getItem("userId")+"&"+data);
  }

  ramadanRulesExport(data){
    return this.http.get(environment.IP+"/api/masters/ramadanrule/exportramadanruleSummary?userId="+sessionStorage.getItem("userId")+"&"+data);
  }

}

