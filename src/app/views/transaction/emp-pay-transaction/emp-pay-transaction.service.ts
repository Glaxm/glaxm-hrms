import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmpPayTransactionService {
  

  constructor(private http:HttpClient) { }

  getRatingList(){
    return this.http.get(environment.IP+"/api/masters/rating/getallrating");
  }

  getCompanyListByHoldingId(id){
    return this.http.get(environment.IP+"/api/masters/company/getallcompaniesbyholdingid/"+id)
  }
  getAllEmployee(moduleid,data){
    return this.http.post(environment.IP+"/api/employee/getallemployee?userid="+sessionStorage.getItem("userId")+"&moduleId="+moduleid,data);
  }

  getHoldingList(){
    return this.http.get(environment.IP+"/api/masters/holding/getallholding")
  }

  addUpdateEmppaytransaction(data){
    return this.http.post(environment.IP+"/api/transaction/emppaytransaction/saveemppay",data)
  }

  getPayitemList(){
    return this.http.get(environment.IP+"/api/masters/payitem/getallpayitem");
  }
  getAllPayitemList(){
    // return this.http.get(environment.IP+"/api/masters/payitem/getallpayitem");
    return this.http.get(environment.IP+"/api/masters/payitem/getpayitemforPaytrans")
  }
  getEmpPayTransactionList(userid,companylist,data){
    return this.http.post(environment.IP+"/api/transaction/emppaytransaction/emppaysummary?userId="+userid+"&"+data,companylist);

  }

  empPayTransactionDatatTable(userid,moduleid,data){
    return this.http.post(environment.IP+"/api/transaction/emppaytransaction/emppaysummary?userId="+userid+"&moduleId="+moduleid+"&length=10&page=1",data);
    
  }

  getEmppaytransactionById(id){
    return this.http.get(environment.IP+"/api/transaction/emppaytransaction/getemppaybyid/"+id);
  }

  uploadCsvFile(data){
    return this.http.post(environment.IP+"/api/transaction/emppaytransaction/uploademptransfile?userId="+sessionStorage.getItem("userId"),data);
  }

  empPayTransactionExport(data){
    return this.http.get(environment.IP+"/api/transaction/emppaytransaction/emppaysummaryExport?userId="+sessionStorage.getItem("userId")+"&"+data);
  }

}
