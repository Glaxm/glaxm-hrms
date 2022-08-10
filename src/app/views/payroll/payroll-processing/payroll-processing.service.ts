import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PayrollProcessingService {

  constructor(private http: HttpClient) { }

  getCompanyList(holdingId) {
    return this.http.get(environment.IP + "/api/masters/company/getallcompaniesbyholdingid/"+holdingId);
  }

  downloadRegister(){
    return this.http.get(environment.IP + "/api/payroll/payrolljournalsummary/download/summary.csv");
  }
  getEmpCat() {
    return this.http.get(environment.IP + "/api/masters/empcat/getallempcat?userId="+sessionStorage.getItem("userId"));
  }
  getAllDept(data) {
    return this.http.post(environment.IP + "/api/masters/dept/getalldept?userId="+sessionStorage.getItem("userId"),data);
  }
  getAllActiveMonthList(companyid){
    return this.http.get(environment.IP+"/api/master/months/getactiveforprocessmonths?companyId="+companyid);
  }

  getMonthList(){
    return this.http.get(environment.IP+"/api/master/months/getallmonths");
  }

  getSponsorTypeList(data){
    return this.http.post(environment.IP+"/api/masters/visasponsor/getallvisaSponsername",data);
  }

  getEmpGradeList(){
    return this.http.get(environment.IP+"/api/masters/empgrade/getallempgrade?userId="+sessionStorage.getItem("userId"));
  }
  getDesignationList(){
    return this.http.get(environment.IP+"/api/masters/empdesig/getallempdesig?userId="+sessionStorage.getItem("userId"));
  }
  getEmpList(moduleid,data){
    return this.http.post(environment.IP+"/api/employee/getallemployee?userId="+sessionStorage.getItem("userId")+"&moduleId="+moduleid,data);
  }

  getAllMonths(){
    return this.http.get(environment.IP+"/api/employee/getallemployee");
  }

  getHoldingList(){
    return this.http.get(environment.IP+"/api/masters/holding/getallholding");
  }

  payrollProcessing(data){
    return this.http.post(environment.IP+"/api/payroll/payrollprocessing/savepayrollprocessing",data)
  }

  payrollJournalSummary(c,e,m,d,s,w){
    return this.http.post(environment.IP+"/api/payroll/payrolljournalsummary/payrollsummarydatatable/"+c+"/"+m+"/"+d+"/"+s+"/"+w,e)
  }

  downloadFile(file){
    window.open(environment.IP+"/api/file/download"+file)
  }

  payslip(data){
    return this.http.post(environment.IP+"/api/payslip/paysliplist",data);
  }

  getMonthById(id){
    return this.http.get(environment.IP+"/api/master/months/getmonthbyid/"+id)
  }

  deleteRecord(id){
    return this.http.get(environment.IP+"/api/payroll/payrolljournalsummary/deletepayrollsummary/"+id);
 
  }

  getPayrollSummary(){
    return this.http.get(environment.IP+"/api/payroll/payrolljournalsummary/payrollsummarydatatable")
  }

  getAllPayrollProcessing(id){
    return this.http.get(environment.IP+"/api/payroll/payrolljournal/gettempdatabyinstanceid/"+id)
  }

  getpayslipsbyFilter(data){
    return this.http.post(environment.IP+"/api/payslip/getpayslipsbyFilter",data)
  }

  getEmpBySponsorType(id){
    return this.http.get(environment.IP+"/api/employee/getemployeebyVisacompid/"+id)
  }

  getPaslipObjById(id){
    return this.http.get(environment.IP+"/api/payslip/getpayslipobjbyid/"+id)
  }
  getEmployeeDetailsById(id){
    return this.http.get(environment.IP+"/api/employee/getemployeebyid/"+id)
  }

  getBankDetailsById(id){
    return this.http.get(environment.IP+"/api/masters/employee/empbank/getbankdetailsbyempid/"+id)
   
  }

  getMonthyearDetailsById(monthyearId: any) {
    return this.http.get(environment.IP+"/api/master/months/getmonthbyid/"+monthyearId)
  }

   getEmpSalaryByEmpId(id){
    return this.http.get(environment.IP+"/api/masters/emp/empsalary/getempsalarybyempid/"+id);
  }

  getJobFunDataById(id){
    return this.http.get(environment.IP+"/api/masters/jobfunction/getjobfunctionbyid/"+id);
  }

  getDeptDetailsById(id){
    return this.http.get(environment.IP+"/api/masters/dept/getdeptbyid/"+id);
  }

  getDesignationById(id){
    return this.http.get(environment.IP+"/api/masters/empdesig/getempdesigbyid/"+id);
  }

  getBankDetailsByEmpId(id){
    return this.http.get(environment.IP+"/api/masters/employee/empbank/getonlyactivebankdetailsbyempid/"+id);
  }

  getPayslipListDetails(){
    return this.http.get(environment.IP+"/api/payroll/lpayrolljournal/getalllpayrolljournaldetails")
  }

  getCompanyById(id){
    return this.http.get(environment.IP+"/api/masters/company/getcompanybyid/"+id)
  }

  publishPayslips(data,empId,moduleid){
    return this.http.post(environment.IP+"/api/payroll/payrollprocessing/publishPayslips?cid="+data.cid+"&from_dt="+data.from_dt+"&to_dt="+data.to_dt+"&dept_id="+data.dept_id+"&sponsor="+data.sponsor+"&wps="+data.wps+"&moduleId="+moduleid+"&monthId="+data.monthId,empId)
  }

  unpublishPayslips(data,empId,moduleid){
    return this.http.post(environment.IP+"/api/payroll/payrollprocessing/unpublishPayslips?cid="+data.cid+"&from_dt="+data.from_dt+"&to_dt="+data.to_dt+"&dept_id="+data.dept_id+"&sponsor="+data.sponsor+"&wps="+data.wps+"&moduleId="+moduleid+"&monthId="+data.monthId,empId)
  }

}
