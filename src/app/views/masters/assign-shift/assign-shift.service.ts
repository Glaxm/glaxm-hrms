import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AssignShiftService {

  constructor(private http:HttpClient) { }

  getShiftRuleList(){
    return this.http.get(environment.IP+"/api/masters/shiftrule/getallshiftrule");
  }
  
  getEmpList(moduleid,data){
    return this.http.post(environment.IP+'/api/employee/getallemployee?userId='+sessionStorage.getItem("userId")+"&moduleId="+moduleid,data);
  }

  getEmpCatList(){
    return this.http.get(environment.IP+"/api/masters/empcat/getallempcat?userId="+sessionStorage.getItem("userId"))
  }

  uploadCsvFileAssignShift(data){
    return this.http.post(environment.IP+"/api/employee/uploadshiftalloc?userId="+sessionStorage.getItem("userId"),data)
  }

  getDivList(){
    return this.http.get(environment.IP+"/api/division/getalldivision?userId="+sessionStorage.getItem("userId"))
  }

  getSectionList(){
    return this.http.get(environment.IP+"/api/section/getallsection?userId="+sessionStorage.getItem("userId"))
  }

  getDeptList(){
    return this.http.get(environment.IP+"/api/masters/dept/getalldept?userId="+sessionStorage.getItem("userId"))
  }

  getExistingShiftSelectionList(){
    return null;//this.http.get(environment.IP+"/api/section/getallsection")
  }

}
