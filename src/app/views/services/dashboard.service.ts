import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private http:HttpClient) { }

  getEmpLeaveCount(){
    
    return this.http.get(environment.IP+"/api/Dashboard/getempLeaveCount?userId="+sessionStorage.getItem('userId'));
  }

  getheadcountbyGender(companyid){
    return this.http.get(environment.IP+"/api/Dashboard/getheadcountbyGender?companyId="+companyid);
  }

  getnewJoineeDetails(companyid){
    return this.http.get(environment.IP+"/api/Dashboard/getnewJoineeDetails?companyId="+companyid);
  }

  getattendanceDetails(data){
    return this.http.get(environment.IP+"/api/Dashboard/getattendanceDetails?companyId="+data);
  }

  // getEmpAttendance(){
  //   return this.http.post(environment.IP+"/api/empattendance/getattendancebyfilter/0/01-Jun-2022/30-Jun-2022/null/0",{emp_id:[1026, 1054],shiftRuleId:[]});
  // }
  getEmpAttendance(empId,stdate,endate){
    return this.http.post(environment.IP+"/api/empattendance/getattendancebyfilter/0/"+stdate+"/"+endate+"/null/0",{emp_id:empId,shiftRuleId:[]});
  }
  
  getdeptwisePayheadcount(data){
    return this.http.get(environment.IP+"/api/Dashboard/getdeptwisePayheadcount?companyId="+data);
  }

  getEmploymentStatus(companyId){
    return this.http.get(environment.IP+"/api/Dashboard/getempstatusDetails?companyId="+companyId);
  }

  getcompanybyuserid(){
    return this.http.get(environment.IP+"/api/users/getcompanybyuserid?userId="+sessionStorage.getItem('userId'));
  }
  
  getcatwisePayheadcount(data){
    return this.http.get(environment.IP+"/api/Dashboard/getcatwisePayheadcount?companyId="+data);
  }

  getOtAnalysisList(data){
    return this.http.get(environment.IP+"/api/Dashboard/getdeptwiseOT?companyId="+data);
  }

  setDefaultCompany(defaultcompany){
    return this.http.post(environment.IP+"/api/users/changeDefaultcompany?companyId="+defaultcompany+"&userId="+sessionStorage.getItem('userId'),{});
  }

  getdeptwiseheadcount(data){
    return this.http.get(environment.IP+"/api/Dashboard/getdeptwiseheadcount?companyId="+data);
  }

  getBirthdayDetails(data){
    return this.http.post(environment.IP+"/api/Dashboard/getBirthdaydetails",data);
  }

  getLeaveRecords(data){
    return this.http.post(environment.IP+"/api/Dashboard/getLeavedetails?userId="+sessionStorage.getItem('userId'),data);
  }

  getOrgstucture(companyid){
    return this.http.get(environment.IP+"/api/OrgChart/getOrgstucture?companyId="+companyid+"&userId="+sessionStorage.getItem('userId'));
  }

  getLeaveRejoinDetails(data){
    return this.http.post(environment.IP+"/api/Dashboard/getLeaverejoindetails?userId="+sessionStorage.getItem('userId'),data);
  }

  getProbationCompletionDetails(data){
    return this.http.post(environment.IP+"/api/Dashboard/getProbcompletiondetails?userId="+sessionStorage.getItem('userId'),data);
  }

  getDocExpiryDetails(data){
    return this.http.post(environment.IP+"/api/Dashboard/getdocExpirydetails?userId="+sessionStorage.getItem('userId'),data);
  }

  getAssetExpiryDetails(data){
    return this.http.post(environment.IP+"/api/Dashboard/getAssetExpirydetails?userId="+sessionStorage.getItem('userId'),data);
  }

  getUserwiseDashboard(){
    return this.http.get(environment.IP+"/api/Dashboard/getdashboardbyUserid/"+sessionStorage.getItem('userId'));
  }

  getSixMonthSalarySlip(){
    return this.http.get(environment.IP+"/api/Dashboard/getProcessedpayslips?employeeId="+sessionStorage.getItem("employeeId")+"&monthcount="+6);
  }

  getLoanDetails(){
    return this.http.get(environment.IP+"/api/Dashboard/getemploandetails?employeeId="+sessionStorage.getItem("employeeId")+"&monthcount="+6);
  }

  getApprovalRequestDetails(){
    return this.http.get(environment.IP+"/api/Dashboard/getreqStatusCount?userId="+sessionStorage.getItem("userId"));
  }



}
