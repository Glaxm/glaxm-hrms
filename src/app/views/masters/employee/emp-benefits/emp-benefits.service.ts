import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmpBenefitsService {

  constructor(private http:HttpClient) { }

  getAirsectorDetails(){
    return this.http.get(environment.IP+"/api/masters/airsector/getallairsector");
  }

  addUpdateBenefits(data){
    return this.http.post(environment.IP+"/api/masters/emppbenefits/saveemppbenefits",data)
  }

  getEmpbenefitsListByEmpId(id){
    return this.http.get(environment.IP+"/api/masters/emppbenefits/getbenifitsbyempid/"+id);
  }

  getBenefitsById(id){
    return this.http.get(environment.IP+"/api/masters/emppbenefits/getbenefitsbyemployeeid/"+id);
  }
  getAllFamilyDetailsByEmpId(id){
    return this.http.get(environment.IP+"/api/masters/employee/emprelation/getemprelationbyempid/"+id);
  }

  saveRelation(data){
    return this.http.post(environment.IP+"/api/masters/employee/emprelation/saveemprelation",data)
  }
  getRelationById(id){
    return this.http.get(environment.IP+"/api/masters/employee/emprelation/getemprelationbyid/"+id);
  }

   // LIC API

   addUpdateLIC(data){
    return this.http.post(environment.IP+"/api/masters/employee/empinsureance/saveempinsurance",data)
  }

  getLICSummaryByEmpid(id){
    return this.http.get(environment.IP+"/api/masters/employee/empinsureance/getempinsurancebyempid/"+id);
  }

  editLIC(id){
    return this.http.get(environment.IP+"/api/masters/employee/empinsureance/getempinsurancebyid/"+id);
  }

}
