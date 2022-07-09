import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmpleaveresumptionService {

  constructor(private http:HttpClient) { }

  getAllEmpleaveresumption(data){
    return this.http.post(environment.IP+"/api/empleaveresumption/getallempleaveresum?userId="+sessionStorage.getItem("userId"),data);
  } 

  empleaveresumptiondatatable(userid,moduleid,data){
    // return this.http.get(environment.IP+"/api/empleaveresumption/getleaveresumeSummary?userId="+sessionStorage.getItem("userId")+"&length=10&page=1");
     return this.http.post(environment.IP+"/api/empleaveresumption/getleaveresumeSummary?userId="+userid+"&moduleId="+moduleid+"&length=10&page=1",data);
   }
 
   empleaveresumptiondatatable1(userid,companylist,data){
    // return this.http.get(environment.IP+"/api/empleaveresumption/getleaveresumeSummary?userId="+sessionStorage.getItem("userId")+"&"+data);
     return this.http.post(environment.IP+"/api/empleaveresumption/getleaveresumeSummary?userId="+userid+"&"+data,companylist);
   }

  getAllHolding(){
    return this.http.get(environment.IP+"/api/masters/holding/getallholding");
  }

  getAllCompaniesByHoldingId(id){
    return this.http.get(environment.IP+"/api/masters/company/getallcompaniesbyholdingid/"+id);
  }

  getReferenceByID(id,isedit:boolean){
    if (isedit){
      return this.http.get(environment.IP+"/api/transaction/empleavetransaction/getempleavealldocnobyempid/"+id);  
    } else{
    return this.http.get(environment.IP+"/api/transaction/empleavetransaction/getempleavedocnobyempid/"+id);
  }}




  getAllLeaveType(){
    return this.http.get(environment.IP+"/api/masters/leaveitem/getallleaveitem");
  }

  getEmployeeList(moduleid,data) {
    return this.http.post(environment.IP+"/api/employee/getallemployee?userId="+sessionStorage.getItem("userId")+"&moduleId="+moduleid,data)
  }

  addUpdateEmpleaveresumption(data){
    return this.http.post(environment.IP+"/api/empleaveresumption/saveempleaveresume",data);
  }

  getEmpleaveresumptionById(id){
    return this.http.get(environment.IP+"/api/empleaveresumption/getempleaveresumbyid/"+id);
  }

  empleaveresumptionDatabase(){
    return this.http.get(environment.IP+"/api/masters/empleaveresumption/datatable");
  }

  empLeaveResumptionExport(data){
    return this.http.get(environment.IP+"/api/empleaveresumption/exportleaveresumeSummary?userId="+sessionStorage.getItem("userId")+"&"+data);
  }

}

