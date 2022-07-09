import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VechicletranService {

  constructor(private http:HttpClient) { }

  getVehicletranList(){
    return this.http.get(environment.IP+"/api/masters/empvehicleinfo/getallempvehicleinfo?userId="+sessionStorage.getItem("userId"));
  }

  getCompanyListByHoldingId(id){
    return this.http.get(environment.IP+"/api/masters/company/getallcompaniesbyholdingid/"+id)
  }

  getHoldingList(){
    return this.http.get(environment.IP+"/api/masters/holding/getallholding")
  }

  getVehicletranById(id){
    return this.http.get(environment.IP+"/api/masters/empvehicleinfo/getempvehicleinfobyid/"+id)
  }

  addUpdateVehicletran(data){
    return this.http.post(environment.IP+"/api/masters/empvehicleinfo/saveempvehicleinfo",data)
      }

  getEmpList(moduleid,data){
    return this.http.post(environment.IP+"/api/employee/getallemployee?userId="+sessionStorage.getItem("userId")+"&moduleid="+moduleid,data);
  }
  getallempvehicleinfo
}
