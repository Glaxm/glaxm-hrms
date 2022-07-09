import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HolidayService {

  constructor(private http:HttpClient) { }

  getHolidayList(data){
    return this.http.post(environment.IP+"/api/masters/holiday/getallholiday",data);
  }

  addUpdateHoliday(data){
    return this.http.post(environment.IP+"/api/masters/holiday/saveholiday",data);
  }
  getHolidayById(id){
    return this.http.get(environment.IP+"/api/masters/holiday/getholidaybyid/"+id);
  }

  getCompanyListByHoldingId(id){
    return this.http.get(environment.IP+"/api/masters/company/getallcompaniesbyholdingid/"+id)
  }

  getHoldingList(){
    return this.http.get(environment.IP+"/api/masters/holding/getallholding")
  }

  holidaydatatable(){
    return this.http.get(environment.IP+"/api/masters/holiday/getholidaySummary?userId="+sessionStorage.getItem("userId")+"&length=10&page=1");
 }

  holidaydatatable1(data){
    return this.http.get(environment.IP+"/api/masters/holiday/getholidaySummary?userId="+sessionStorage.getItem("userId")+"&"+data);
 }

 holidayExport(data){
  return this.http.get(environment.IP+"/api/masters/holiday/exportholidaySummary?userId="+sessionStorage.getItem("userId")+"&"+data);
}

}
