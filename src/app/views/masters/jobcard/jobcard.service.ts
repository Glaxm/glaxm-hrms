import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class JobcardService {

  constructor(private http:HttpClient) { }

  getUomList(){
    return this.http.get(environment.IP+"/api/masters/unitMeasure/getallunitmeasure");
  }

  getJobCardDetailsById(id){
    return this.http.get(environment.IP+"/api/masters/jobCard/getjobcardbyid/"+id)
  }

  getAllCardLineSummaryByCardId(id){
    return this.http.get(environment.IP+"/api/masters/jobCardLine/getjobcardlinebycardid/"+id);
  }

  getjobcardlinebyid(id){
    return this.http.get(environment.IP+"/api/masters/jobCardLine/getjobcardlinebyid/"+id);
  }

  getAllEmployee(moduleid,data){
    return this.http.post(environment.IP+'/api/employee/getallemployee?userId='+sessionStorage.getItem("userId")+"&moduleId="+moduleid,data);
  }

  getJobCardList(){
    return this.http.get(environment.IP+"/api/masters/jobCard/getalljobcard");
  }

  saveupdateEmpJob(data){
    return this.http.post(environment.IP+'/api/masters/jobCardLine/savejobcardline',data);
  }

  getAllShiftRule(data){
    return this.http.post(environment.IP+"/api/masters/shiftrule/getallshiftrule",data);
  }

  getAllHolding(){
    return this.http.get(environment.IP+"/api/masters/holding/getallholding");
  }

  getAllCompaniesByHoldingId(id){
    return this.http.get(environment.IP+"/api/masters/company/getallcompaniesbyholdingid/"+id);
  }

  addUpdatejobcard(data){
    return this.http.post(environment.IP+"/api/masters/jobCard/savejobcard",data)
  }

  jobdefinationDatabase(){
    return this.http.get(environment.IP+"/api/masters/jobDefination/getalljobdefination");
  }

  getJobFunList(){
    return this.http.get(environment.IP+"/api/masters/jobfunction/getalljobfunction?userId="+sessionStorage.getItem("userId"));
  }
}
