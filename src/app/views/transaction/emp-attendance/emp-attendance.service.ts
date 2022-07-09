import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmpAttendanceService {

  constructor(public http:HttpClient) { }
  getCompanyListByHoldingId(id){
    return this.http.get(environment.IP+"/api/masters/company/getallcompaniesbyholdingid/"+id)
  }

  getHoldingList(){
    return this.http.get(environment.IP+"/api/masters/holding/getallholding")
  }

  getAttenDataByDate(stdate,endate,companyList){
    return this.http.post(environment.IP+"/api/transaction/employeeattendance/empattnfromDate/"+sessionStorage.getItem("userId")+'/'+stdate+'/'+endate,companyList)
  }

  getByDateDatatable(stdate,endate,companyList){
    return this.http.post(environment.IP+"/api/transaction/employeeattendance/empattnfromDate?page=1&length=10&userId="+sessionStorage.getItem("userId")+'&fromDate='+stdate+'&todate='+endate,companyList)
  }
  getByDateSearch(from, to, cmplist,data){
    return this.http.post(environment.IP+"/api/transaction/employeeattendance/empattnfromDate?userId="+sessionStorage.getItem("userId")+'&fromDate='+from+'&todate='+to+'&'+data,cmplist)
  }

  getEmployeeList(moduleid,data){
    return this.http.post(environment.IP+"/api/employee/getallemployee?userId="+sessionStorage.getItem("userId")+"&moduleId="+moduleid,data)
  }
  uploadCsvFileAssignShift(data){
    return this.http.post(environment.IP+"/api/employee/uploadshiftalloc?userId="+sessionStorage.getItem("userId"),data)
  }
  addUpdateEmpAttendance(data){
    return this.http.post(environment.IP+"/api/transaction/employeeattendance/saveempattendance",data);
  }

  getLinesDataByAttnId(id){
    return this.http.get(environment.IP+"/api/transaction/employeeattendancelines/getempattendancelinesbyattenId/"+id)
  }

  getAllAttenList(data){
    return this.http.post(environment.IP+"/api/transaction/employeeattendance/empattndatatable",data);
  }

  getAttenHeaderById(id,fromdate){
    return this.http.get(environment.IP+"/api/transaction/employeeattendance/getempattnbyempIdDt?empId="+id+"&attnDt="+fromdate)
  }

  updateDaywiseAtten(data){
    return this.http.post(environment.IP+"/api/transaction/employeeattendancelines/saveempattenline",data);
  }

  uploadFile(data){
    return this.http.post(environment.IP+"/api/upload/csvfile/uploadfile",data);
  }

  uploadFileAttendance(data){
    return this.http.post(environment.IP+"/api/empattendance/uploadattendanceRecords?userId="+sessionStorage.getItem('userId'),data)
  }

  getAllShiftRule(data){
    return this.http.post(environment.IP+"/api/masters/shiftrule/getallshiftrule",data);
  }

  exportShiftRoasterFormat(date,compList){
    return this.http.post(environment.IP+"/api/transaction/employeeattendance/exportallocatedShift?userId="+sessionStorage.getItem('userId')+"&fromDate="+date,compList);
  }

}
