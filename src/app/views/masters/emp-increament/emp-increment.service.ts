import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmpIncrementService {

  constructor(private http:HttpClient) { }

  getEmpIncrementList(l){
    return this.http.post(environment.IP+"/api/masters/empincrement/getallempincrement?userId="+sessionStorage.getItem("userId"),l);
  }

  uploadCsvFile(data){
    return this.http.post(environment.IP+"/api/employee/uploadRevisedSalary?userId="+sessionStorage.getItem("userId"),data)   
  }

  EmpIncrementdatatable(userid,moduleid,data){
    // return this.http.get(environment.IP+"/api/masters/empincrement/getempincrementsummary?userId="+sessionStorage.getItem("userId")+"&length=10&page=1");
     return this.http.post(environment.IP+"/api/masters/empincrement/getempincrementsummary?userId="+userid+"&moduleId="+moduleid+"&length=10&page=1",data);
 }

 EmpIncrementdatatable1(userid,companylist,data){
     // return this.http.get(environment.IP+"/api/masters/empincrement/getempincrementsummary?userId="+sessionStorage.getItem("userId")+"&"+data);
      return this.http.post(environment.IP+"/api/masters/empincrement/getempincrementsummary?userId="+userid+"&"+data,companylist);
 }

 getAllPayitems(){
  return this.http.get(environment.IP+"/api/masters/payitem/getallpayitem");
}

  lineDataTable(id){
    return this.http.get(environment.IP+"/api/masters/empincrementline/getempincrementlinebyincid/"+id);
  }

  getComapnyList(holdingId){
    return this.http.get(environment.IP+"/api/masters/company/getallcompaniesbyholdingid/"+holdingId);
  }

  getHoldingList(){
    return this.http.get(environment.IP+"/api/masters/holding/getallholding");
  }

  getLineById(id){
    return this.http.get(environment.IP+"/api/masters/empincrementline/getempincrementlinebyid/"+id)
  }

  onSelectPayItem(empId,PayitemId){
    return this.http.get(environment.IP+"/api/masters/emp/payitem/getemppayitemdetails/"+empId+"/"+PayitemId)
  }

  addUpdateEmpIncrement(data){
    return this.http.post(environment.IP+"/api/masters/empincrement/saveeempincrement",data);
  }

  getEmpIncrementById(id){
    return this.http.get(environment.IP+"/api/masters/empincrement/getempincrementbyid/"+id)
  }

  getAllEmployee(moduleid,data){
    return this.http.post(environment.IP+"/api/employee/getallemployee?userId="+sessionStorage.getItem("userId")+"&moduleId="+moduleid,data)
  }

  getAllGrade(){
    return this.http.get(environment.IP+"/api/masters/empgrade/getallempgrade?userId="+sessionStorage.getItem("userId"));
  }

  getEmployeeById(id){
    return this.http.get(environment.IP+"/api/employee/getemployeebyid/"+id);
  }

  saveLines(data){
    return this.http.post(environment.IP+"/api/masters/empincrementline/saveeempincrementline",data);
  }

  getAllDesignation(){
    return this.http.get(environment.IP+"/api/masters/empdesig/getallempdesig?userId="+sessionStorage.getItem("userId"));
  }

  empIncrementExport(data){
    return this.http.get(environment.IP+"/api/masters/empincrement/exportempincrementsummary?userId="+sessionStorage.getItem("userId")+"&"+data);
  }

}
