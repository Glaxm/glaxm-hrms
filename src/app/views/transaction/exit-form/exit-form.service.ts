import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ExitFormService {

  constructor(private http:HttpClient) { }

  getAllHolding(){
    return this.http.get(environment.IP+"/api/masters/holding/getallholding")
  }
  getCompanyById(holdingId){
    return this.http.get(environment.IP+"/api/masters/company/getallcompaniesbyholdingid/"+holdingId);
  }


  addUpdateExitEmpployee(data){
    return this.http.post(environment.IP+"/api/empEOSB/saveeempeosb",data);
  }

  uploadCsvFile(data){
    return this.http.post(environment.IP+"/api/transaction/empleavetransaction/uploadempleave?userId="+sessionStorage.getItem("userId"),data);
  }

  
  getEmployeeList(moduleid,data) {
    return this.http.post(environment.IP+"/api/employee/getallemployee?userId="+sessionStorage.getItem("userId")+"&moduleId="+moduleid,data)
  }

  getAllExitEmp(moduleid,data){
    return this.http.post(environment.IP+"/api/empEOSB/getallempeosb?userId="+sessionStorage.getItem("userId")+"&moduleId="+moduleid,data);
  }

  getEmpeosbById(id){   
    return this.http.get(environment.IP+"/api/empEOSB/getempeosbbyreqid/"+id);
  }

  getEOSbById(id){   
    return this.http.get(environment.IP+"/api/empEOSB/getempeosbbyid/"+id);
  }


}
