import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmpLeaveService {
 

  constructor(private http:HttpClient) { }

  getLeaveHistoryListByEmpId(id){
    return this.http.get(environment.IP+"/api/transaction/empleavetransaction/getempleavesummarybyempid/"+id);
  }

  getAirsectorDetails(){
    return this.http.get(environment.IP+"/api/masters/airsector/getallairsector");
  }

  calSettlementDt(data){
    return this.http.post(environment.IP+"/api/transaction/empleavetransaction/calSettlementDt",data);
  }

  fileUpload(id,imgData){
    return this.http.post(environment.IP+"/api/transaction/empleavetransaction/saveleavedoc/"+id,imgData)
  }

  getAllEmployee(moduleid,data){
    return this.http.post(environment.IP+"/api/employee/getallemployee?userId="+sessionStorage.getItem("userId")+"&moduleId="+moduleid,data)
  }

  getLeaveBal(data){
    return this.http.post(environment.IP+"/api/transaction/empleavetransaction/allowedLeaves",data)
  }

  exportEmpLeave(data){
    return this.http.post(environment.IP+"/api/transaction/empleavetransaction/exportempLeaves?userId="+sessionStorage.getItem("userId"),data)
  }

  

  getAllEmpleave(data){
    return this.http.post(environment.IP+"/api/transaction/empleavetransaction/empleavetransactionsummary?userId="+sessionStorage.getItem("userId"),data);
  }

  getAllHolding(){
    return this.http.get(environment.IP+"/api/masters/holding/getallholding")
  }
  getCompanyById(holdingId){
    return this.http.get(environment.IP+"/api/masters/company/getallcompaniesbyholdingid/"+holdingId);
  }

  getLeaveItemList(){
    return this.http.get(environment.IP+"/api/masters/leaveitem/getallleaveitem")
  }



  getLeaveItemList_V1(empid){
    return this.http.get(environment.IP+"/api/masters/leaveitem/getleaveitembyEmp?empId="+empid)
  }

  convertToCaldays(obj){
    return this.http.get(environment.IP+"/api/transaction/empleavetransaction/convertToCaldays?empId="+obj.empid+"&encashDays="+obj.encashDays ? obj.encashDays : 0+"&stdate="+obj.stdate+"&endate="+obj.endate)
  }



  saveUpdateEmpleave(data,flag){
    return this.http.post(environment.IP+"/api/transaction/empleavetransaction/saveempleavetransaction?procSettlement="+flag,data);
  }

  uploadCsvFile(data){
    return this.http.post(environment.IP+"/api/transaction/empleavetransaction/uploadempleave?userId="+sessionStorage.getItem("userId"),data);
  }

  uploadCsvFileNew(data){
    return this.http.post(environment.IP+"/api/transaction/empleavetransaction/uploadempleavesimpleform?userId="+sessionStorage.getItem("userId"),data);
  }

  getEmployeeList(moduleid,data) {
    return this.http.post(environment.IP+"/api/employee/getallemployee?userId="+sessionStorage.getItem("userId")+"&moduleId="+moduleid,data)
  }

  getMonthsByCompanyId(id){
    return this.http.get(environment.IP+"/api/master/months/getactiveforprocessmonths?companyId="+id)
  }

  getEmpleaveDetailsById(id){
    return this.http.get(environment.IP+"/api/transaction/empleavetransaction/getempleavetransactionbyid/"+id);
  }

  getEmpleaveByRequestId(id){
    return this.http.get(environment.IP+"/api/transaction/empleavetransaction/getempleavetransbyreqid/"+id);
  }

  
  empleavetransactionsummary(companyIds){
    return this.http.post(environment.IP+"/api/transaction/empleavetransaction/empleavetransactionsummary?userId="+sessionStorage.getItem("userId")+"&length=10&page=1",companyIds);
  }

  empleavetransactionsummary1(data,companyIds){
    return this.http.post(environment.IP+"/api/transaction/empleavetransaction/empleavetransactionsummary?userId="+sessionStorage.getItem("userId")+"&"+data,companyIds);
  }


}
