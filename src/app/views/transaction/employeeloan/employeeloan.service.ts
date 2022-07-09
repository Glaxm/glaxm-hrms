import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { env } from 'process';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmployeeloanService {

  constructor(private http:HttpClient) { }

  getAllEmploan(data){
    return this.http.post(environment.IP+"/api/transaction/emploan/getallemploan?userId="+sessionStorage.getItem("userId"),data);
  }

  getLoanDetailsByRequestID(id){
    return this.http.get(environment.IP+"/api/transaction/emploan/getemploaninfobyreqid/"+id);
  }

  getLoanHistoryListByEmpId(id){
    return this.http.get(environment.IP+"/api/transaction/emploan/getemploansummarybyempid/"+id);
  }

  getAllHolding(){
    return this.http.get(environment.IP+"/api/masters/holding/getallholding")
  }
  getCompanyById(holdingId){
    return this.http.get(environment.IP+"/api/masters/company/getallcompaniesbyholdingid/"+holdingId);
  }

  saveUpdateEmploan(data){
    return this.http.post(environment.IP+"/api/transaction/emploan/saveemploan",data);
  }

  getEmploanDetailsById(id){
    return this.http.get(environment.IP+"/api/transaction/emploan/getemploanbyid/"+id);
  }

  pauseInstallment(data){
    return this.http.post(environment.IP+"/api/emploanline/updateemploanlinestatus",data)//+data.lEmploanlineId+"/"+data.lEmploanId+"/"+data.isActive,{});
  }

  repayment(data){
    return this.http.post(environment.IP+"/api/emploanline/saveemploanline",data);
  }

  getEmployeeList(moduleid,data) {
    return this.http.post(environment.IP+"/api/employee/getallemployee?userId="+sessionStorage.getItem("userId")+"&moduleId="+moduleid,data)
  }

  getLoanLinesById(id) {
    return this.http.get(environment.IP+"/api/emploanline/getemploanlinesbyloanid/"+id)
  }

  getPayitemList(){
    return this.http.get(environment.IP+"/api/masters/payitem/getallpayitem")
  }

  getPayitemListByType(){
    return this.http.get(environment.IP+"/api/masters/payitem/getpayitembytype/D")
  }

  loandatatable(userid,moduleid,data){
    return this.http.post(environment.IP+"/api/transaction/emploan/getemploanSummary?userId="+userid+"&moduleId="+moduleid+"&length=10&page=1",data);
  }

  loandatatable1(userid,companylist,data){
     return this.http.post(environment.IP+"/api/transaction/emploan/getemploanSummary?userId="+userid+"&"+data,companylist);
  }

  loanExport(data){
    return this.http.get(environment.IP+"/api/transaction/emploan/exportemploanSummary?userId="+sessionStorage.getItem("userId")+"&"+data);
  }
  uploadCsvFile(data){
    return this.http.post(environment.IP+"/api/emploan/uploademploan?userId="+sessionStorage.getItem("userId"),data)   
  }

  getemploanlnbyloanlineid(id){
    return this.http.get(environment.IP+"/api/emploanline/getemploanlnbyloanlineid/"+id);
  }

}
