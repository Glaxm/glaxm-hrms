import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  constructor(private http:HttpClient) { }

  getAllEmpAttendance(){
    return this.http.get(environment.IP+"/api/empattendance/getallattendance");
  }
  getEmpList(moduleid,data){
    return this.http.post(environment.IP+"/api/employee/getallemployee?userId="+sessionStorage.getItem("userId")+"&moduleId="+moduleid,data);
  }

  getApprovalReqStatus(data){
    return this.http.post(environment.IP+"/api/approvals/G_APPROVALREQ/getApprovalreqstatus",data);
  }

  getempabsencebyDt(empId,absDt){
    return this.http.get(environment.IP+"/api/empabsence/getempabsencebyDt?empId="+empId+"&absDt="+absDt);
  }

  getShiftRuleByCompId(data){
    return this.http.post(environment.IP+"/api/masters/shiftrule/getshiftrulebycompId",data);
  }

  getAttendanceByFilter(comId,code,empId,stdate,endate,status,sponType,shift){
    return this.http.post(environment.IP+"/api/empattendance/getattendancebyfilter/"+code+"/"+stdate+"/"+endate+"/"+status+"/"+sponType,{emp_id:empId, shiftRuleId:shift})
  }

  getEmpBySponsorType(moduleid,deptId,sponsorid,data){
    return this.http.post(environment.IP+"/api/employee/getallemployee?userId="+sessionStorage.getItem("userId")+"&moduleId="+moduleid+"&deptId="+deptId+"&visaspId="+(sponsorid ? sponsorid : ''),data)
  }

  exportDataList(comId,code,empId,stdate,endate,status,sponType,shift){
    return this.http.post(environment.IP+"/api/empattendance/getattnforExport/"+code+"/"+stdate+"/"+endate+"/"+status+"/"+sponType,{emp_id:empId,shiftRuleId:shift})
  }

  getStatusList(){
    return this.http.get(environment.IP+"/api/empattendance/getallattendanceStatus");
  }

  getDepartmentList(id){
    return this.http.post(environment.IP+"/api/masters/dept/getdeptNamebyCompid?userId="+sessionStorage.getItem("userId"),id);
  }

  getSponsorTypeList(data){
    return this.http.post(environment.IP+"/api/masters/visasponsor/getallvisaSponsername",data);
  }
    
  getAllComapny(){
    return this.http.get(environment.IP+"/api/masters/company/getallcompanies?userId="+sessionStorage.getItem("userId"))
  }

  reportSummary(comId,code,empId,stdate,endate,sponType,shift){
    return this.http.post(environment.IP+"/api/empattendance/empattnsummarydata/"+code+"/"+stdate+"/"+endate+"/"+sponType,{emp_id:empId,shiftRuleId:shift})
  }

  reProcessManually(comId,deptId,empId, stdate, endate,status,sponType,ismanual,shift){
    return this.http.post(environment.IP+"/api/transaction/empattenEvent/reprocessattnCalculation/"+deptId+"/"+stdate+"/"+endate+"/"+status+"/"+sponType+"/"+ismanual,{emp_id:empId,shiftRuleId:shift})
  }

  updateTime(data){
    return this.http.post(environment.IP+"/api/empattendance/saveempattenline",data);
  }

  getPunchList(id,date){
    return this.http.get(environment.IP+"/api/transaction/empattenEvent/getempattendancebyid/"+id+"/"+date)
  }

  getEmpAttendanceLineId(id){
    return this.http.get(environment.IP+"/api/empattendance/getempattnbylineId/"+id)
  }

  
  getAllDocType(){
    return this.http.get(environment.IP+"/api/doctype/getalldocType?userId="+sessionStorage.getItem("userId"))
  }

  getAssetItemList(){
    return this.http.get(environment.IP+"/api/assets/AssetItem/getallassetitem")
  }

  getShiftByShiftId(id){
    return this.http.get(environment.IP+"/api/masters/shiftrule/getshiftrulebyid/"+id)
  }

  getAllLeaveType(){
    return this.http.get(environment.IP+"/api/masters/leaveitem/getallleaveitem")
  }

  getAllPayitems(){
    // return this.http.get(environment.IP+"/api/masters/payitem/getpayitembytype/D")
    return this.http.get(environment.IP+"/api/masters/payitem/getpayitembytype/D")
  }

  getAllPayitemsforPaytrans(){
    // return this.http.get(environment.IP+"/api/masters/payitem/getpayitembytype/D")
    return this.http.get(environment.IP+"/api/masters/payitem/getpayitemforPaytrans")
  }

  getEmpDocHistoryReportSummary(data,stdate,endate){
    return this.http.post(environment.IP+"/api/transaction/empdoctransaction/empdocreportsummary/"+stdate+'/'+endate,data)
  }

  getPunchingDetailsReportSummary(data,stdate,endate){
    return this.http.post(environment.IP+"/api/transaction/empattenEvent/getpunchDetailsbyfilter/"+stdate+'/'+endate,data)
  }

  getLoanReportSummary(data,stdate,endate){
    return this.http.post(environment.IP+"/api/transaction/emploan/emploanreportsummary/"+stdate+'/'+endate,data)
  }

  getLoanInstallementReportSummary(data,stdate,endate){
    return this.http.post(environment.IP+"/api/emploanline/emploanlinereportsummary/"+stdate+'/'+endate,data)
  }

  getPayitemReportSummary(data,stdate,endate){
    return this.http.post(environment.IP+"/api/transaction/emppaytransaction/emptransreportsummary/"+stdate+'/'+endate,data)
  }

  getExportEmpLeaveReport(data,stdate,endate){
    return this.http.post(environment.IP+"/api/transaction/empleavetransaction/exportempLeavereport/"+stdate+'/'+endate,data)
  }

  getExportEmpDocExpiryReport(data,stdate,endate){
    return this.http.post(environment.IP+"/api/transaction/empdoctransaction/empdocreportsummary/"+stdate+'/'+endate,data)
  }

  getLoanLinesById(id) {
    return this.http.get(environment.IP+"/api/emploanline/getemploanlinesbyloanid/"+id)
  }
  
  exportReport(comId,code,empId,stdate,endate){
    return this.http.get(environment.IP+"/api/excelExport/getattendanceExcel/"+comId+"/"+code+"/"+empId+"/"+stdate+"/"+endate)
  }

  getEmpLeaveReportSummary(data,stdate,endate){
    return this.http.post(environment.IP+"/api/transaction/empleavetransaction/empleavereportsummary/"+stdate+'/'+endate,data)
  }

  uploadFileAttendance(data){
    return this.http.post(environment.IP+"/api/empattendance/uploadattendanceRecords?userId="+sessionStorage.getItem('userId'),data)
  }

  getEnableFlag(empId,date){
      return this.http.get(environment.IP+"/api/transaction/empattenEvent/getempattendancebyid/"+empId+"/"+date)
  }

  downloadAttnReportFun(){
    let data = [21,22,23,102,127,24];
    return this.http.post(environment.IP+"/api/empattendance/exportAttn?dept_id=0&st=24-Sep-2021&en=24-Sep-2021&reqstatus=null&sponsor=0",data)
  }

  getLeaveResumptionSummary(data){
    return this.http.post(environment.IP+"/api/empleaveresumption/leaveResumereportsummary",data)
  }
  
}
