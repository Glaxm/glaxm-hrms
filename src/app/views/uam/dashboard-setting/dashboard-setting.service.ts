import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DashboardSettingService {

  constructor(private http:HttpClient) { }

  dashboardSettingsDateTable(){
    return this.http.get(environment.IP+"/api/Dashboard/getallDashboard");
  }

  getDashDetailsById(id){
    return this.http.get(environment.IP+"/api/Dashboard/getdashboardbyid/"+id);
  }

  saveDashSetting(data){
    return this.http.post(environment.IP+"/api/Dashboard/saveDashboard",data);
  }

}
