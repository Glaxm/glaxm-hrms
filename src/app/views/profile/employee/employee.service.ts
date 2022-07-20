import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private http:HttpClient) { }

  getAllEmployee(moduleid,data){
    return this.http.post(environment.IP+"/api/employee/getallemployee?userId="+sessionStorage.getItem("userId")+"&moduleId="+moduleid,data)
  }

  getEmpaccommodationList(id){
    return this.http.get(environment.IP+"/api/masters/accomodation/getempaccobyempid/"+id)
  }

  addUpdateAccommodation(data){
    return this.http.post(environment.IP+"/api/masters/accomodation/saveempacco",data)
  }

  getAccommodationById(id){
    return this.http.get(environment.IP+"/api/masters/accomodation/getempaccobyid/"+id)
  }

  addUpdateVehicleInfo(data){
    return this.http.post(environment.IP+"/api/masters/empvehicleinfo/saveempvehicleinfo",data)
  }

  getLeaveBalList(id){
      return this.http.get(environment.IP+"/api/empleavebalance/getleavebalancebyempid/"+id);
  }

  getSponsorTypeList(data){
    return this.http.post(environment.IP+"/api/masters/visasponsor/getallvisaSponsername",data);
  }

  getEmpvehicleList(id){
    return this.http.get(environment.IP+"/api/masters/empvehicleinfo/getempvehicleinfobyempid/"+id)
  }

  getVehicleById(id){
    return this.http.get(environment.IP+"/api/masters/empvehicleinfo/getempvehicleinfobyid/"+id)
  }

  getEmpList(userid,companylist,moduleid){
    return this.http.post(environment.IP+"/api/employee/getemployeesummary?userId="+userid+"&length=10&page=1&moduleid="+moduleid,companylist);
  }


  getHolderList(){
    return this.http.get(environment.IP+"/api/masters/holding/getallholding");
  }

  getCompanyListByHoldingId(id){
    return this.http.get(environment.IP+"/api/masters/company/getallcompaniesbyholdingid/"+id)
  }

  getEmpCatList(data){
    return this.http.post(environment.IP+"/api/masters/empcat/getempcatbyCompid",data)
  }


  getDeptList(data){
    return this.http.post(environment.IP+"/api/masters/dept/getdeptbyCompid",data)
  }

  getEmpGrade(data){
    // return this.http.get(environment.IP+"/api/masters/empgrade/getallempgrade?userId="+sessionStorage.getItem("userId"))
    return this.http.post(environment.IP+"/api/masters/empgrade/getempgradebyCompid",data)
  }

  getDivisionList(data){
    // return this.http.post(environment.IP+"/api/division/getalldivision?userId="+sessionStorage.getItem("userId"),data)
    return this.http.post(environment.IP+"/api/division/getdivisionbyCompid",data)
  }

  grtSectionList(data){
    return this.http.post(environment.IP+"/api/section/getsectbyCompid",data)
  }

  getSubsectionList(data){
    return this.http.post(environment.IP+"/api/subsection/getsubsectbyCompid",data)
  }

  getDesignationList(data){
    // return this.http.get(environment.IP+"/api/masters/empdesig/getallempdesig?userId="+sessionStorage.getItem("userId"))
    return this.http.post(environment.IP+"/api/masters/empdesig/getempdesigbyCompid",data)
  }

  getJobFunctionList(){
    return this.http.get(environment.IP+"/api/masters/jobfunction/getalljobfunction?userId="+sessionStorage.getItem("userId"))
  }

  getReligionList(data){
    return this.http.post(environment.IP+"/api/masters/religion/getreligionbyCompid",data)
  }

  saveEmpDetails(data){
    return this.http.post(environment.IP+"/api/employee/saveemployee",data)
  }

  fileUpload(id,imgData){
    return this.http.put(environment.IP+"/api/employee/saveemployeeimage/"+id,imgData)
  }

  empDatatable(userid,companylist,data,moduleid){
    return this.http.post(environment.IP+"/api/employee/getemployeesummary?userId="+userid+"&moduleid="+moduleid+"&"+data,companylist);
  }

  addUpdateDoc(data){
    return this.http.post(environment.IP+"/api/masters/emppdocs/saveemppdocs",data)
  }

  getPDocSummaryByEmpId(id){
    return this.http.get(environment.IP+"/api/masters/emppdocs/getemppdocsbyempid/"+id)
  }

  getPDocById(id){
    return this.http.get(environment.IP+"/api/masters/emppdocs/getdocsbyemployeeid/"+id)
  }

  getEmpDetailsById(id){
    return this.http.get(environment.IP+"/api/employee/getemployeebyid/"+id)
  }

  // -------------------------------------------------------------------------------------------SEMPLOYEE EDUCATION 
  getAllEducationCategory(data){
      // return this.http.get(environment.IP+"/api/masters/educategory/getalleducategory?userId="+sessionStorage.getItem("userId"))
    
      return this.http.post(environment.IP+"/api/masters/educategory/geteducategorybyCompid",data)

    }

  //-------------------------------------------------------------------------------------------- PAY ITEM
  getPayItemList(){
    return this.http.get(environment.IP+"/api/masters/payitem/getallpayitem")
  }
  addUpdatePayItem(data){
    return this.http.post(environment.IP+"/api/masters/emp/payitem/saveeemppayitem",data)
  }

  getEmpPayItemList(id){
    return this.http.get(environment.IP+"/api/masters/emp/payitem/getallemppayitembyempid/"+id)
  }
  getPayItemById(id){
    return this.http.get(environment.IP+"/api/masters/emp/payitem/getemppayitembyid/"+id)
  }

  getCurrency(data){
    return this.http.post(environment.IP+"/api/masters/currency/getcurrencybyCompid",data);
  }

  
  getAllActiveMonthList(companyid){
    return this.http.get(environment.IP+"/api/master/months/getactiveforprocessmonths?companyId="+companyid);
  }

  getallpayitemList(){
    return this.http.get(environment.IP+"/api/masters/payitem/getallpayitem");
  }

  getEmpSalaryByEmpId(id){
    return this.http.get(environment.IP+"/api/masters/emp/empsalary/getempsalarybyempid/"+id);
  }

  getAllBank(data){
    return this.http.post(environment.IP+"/api/masters/bank/getallbank?userId="+sessionStorage.getItem("userId"),data);
  }

  saveUpdateEmpSalary(data){
    return this.http.post(environment.IP+"/api/masters/emp/empsalary/saveeempsalary",data)
  }

  getBankDetails(data){
    return this.http.post(environment.IP+"/api/masters/bank/getbankbyCompid",data);
  }

  getEmpSkillsByEmpId(id){
    return this.http.get(environment.IP+"/api/employee/empskills/getempskillbyid/"+id);
  }

  saveUpdateEmpSkills(data){
    return this.http.post(environment.IP+"/api/employee/empskills/saveempskills",data)
  }

  getAllSkillsList(){
    return this.http.get(environment.IP+"/api/masters/skill/getallskill?userId="+sessionStorage.getItem("userId"));
  }

  saveUpdateEmpLeave(data){
    return this.http.post(environment.IP+"/api/masters/empleave/saveempleave",data)
  }

  getEmpleaveByEmpId(id){
    return this.http.get(environment.IP+"/api/masters/empleave/getempleavebyid/"+id);
  }

  uploadCsvFile(data,moduleid){
    return this.http.post(environment.IP+"/api/employee/uploadempprofile?userId="+sessionStorage.getItem("userId")+"&moduleId="+moduleid,data);
  }

  addUpdatePInfo(data){
    return this.http.post(environment.IP+"/api/masters/emppinfo/saveemppinfo",data);
  }

  getPersonalinfoById(id){
    return this.http.get(environment.IP+"/api/masters/emppinfo/getinfobyemployeeid/"+id);
  }

  getAllShiftRule(data){
    return this.http.post(environment.IP+"/api/masters/shiftrule/getallshiftrule",data);
  }

  getEmpPersonalinfoList(id){
    return this.http.get(environment.IP+"/api/masters/emppinfo/getemppinfobyempid/"+id);
  }

  uploadCsvFilePayitem(data){
    return this.http.post(environment.IP+"/api/employee/uploadpaymentinfo",data);
  }

  exportEmpData(str,company,moduleid){
    return this.http.post(environment.IP+"/api/employee/exportallemployees?userId="+sessionStorage.getItem("userId")+"&"+str+"&moduleId="+moduleid,company);
  }
  

  uploadCsvFileSaaryMode(data){
    return this.http.post(environment.IP+"/api/employee/uploadsalarymode",data);
  }
/////////////////////////////////
  saveEmpBank(data){
    return this.http.post(environment.IP+"/api/masters/employee/empbank/saveempbank",data)
  }

  getEmpBankByEmpId(id){
    return this.http.get(environment.IP+"/api/masters/employee/empbank/getempbankbyempid/"+id)
  }

  getEmpBankById(id){
    return this.http.get(environment.IP+"/api/masters/employee/empbank/getempbankbyid/"+id)
  }

  getAllCurrency(){
    return this.http.get(environment.IP+"/api/masters/currency/getallcurrenct?userId="+sessionStorage.getItem("userId"))
  }

  getAllEmpBank(){
    return this.http.get(environment.IP+"/api/masters/employee/empbank/getallempbank")
  }

  getAirSectorList(){
    return this.http.get(environment.IP+"/api/masters/airsector/getallairsector");
}


saveChat(data){
  return this.http.post(environment.IP+"/api/masters/employee/empchat/saveempchat",data)
}

getAllChatDetailsByEmpId(id){
  return this.http.get(environment.IP+"/api/masters/employee/empchat/getempchatbyempid/"+id)
}

getChatById(id){
  return this.http.get(environment.IP+"/api/masters/employee/empchat/getempchatbyid/"+id)
}

getDocListByEmpId(id){
  return this.http.get(environment.IP+"/api/transaction/empdoctransaction/getdochistorybyempId/"+id)
}

// Relationship with Employee

saveRelationshipWithEmp(data){
  return this.http.post(environment.IP+"/api/masters/employee/emprelatives/saveemprelative",data)
}

getEmpRelativeByEmpid(id){
  return this.http.get(environment.IP+"/api/masters/employee/emprelatives/getemprelativebyempid/"+id)
}

getEmpRelativeById(id){
  return this.http.get(environment.IP+"/api/masters/employee/emprelatives/getemprelativebyid/"+id)
}

}
