import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient) { }
  
  userDateTable(){
      return this.http.get(environment.IP+'/api/users/getall');
  }
  getUserDataById(userId){
    return this.http.get(environment.IP+'/api/users/getbyid/'+userId);
  }
  getAllEmployee(moduleid,data){
    return this.http.post(environment.IP+'/api/employee/getallemployee?userId='+sessionStorage.getItem("userId")+"&moduleId="+moduleid,data);
  }

  getDashboardSettingList(){
    return this.http.get(environment.IP+'/api/Dashboard/getallDashboard');
  }

  getAllDept(data){
    return this.http.post(environment.IP+"/api/masters/dept/getalldept?userId="+sessionStorage.getItem("userId"),data);
  }

  saveUser(data){
    return this.http.post(environment.IP+'/api/users/saveusers',data);
  }

  getemplbycompDeptid(data){
    return this.http.post(environment.IP+'/api/employee/getemplbycompDeptid',data);
  }

  getWorkflowList(list){
    return this.http.post(environment.IP+"/api/approvalwf/getapprovalwfbyCompid",list);
  }

  getAllCompanies(){
    return this.http.get(environment.IP+"/api/masters/company/getallcompanies?userId="+sessionStorage.getItem("userId"));
  }

  userRoleDataTable(userId){
    return this.http.get(environment.IP+'/api/userrole/getalluserrolebyuserid/'+userId);
  }
  getUserRoleByUserRoleId(userRoleId){
    return this.http.get(environment.IP+'/api/userrole/getbyid/'+userRoleId);
  }

  addUserRole(data){
    return this.http.post(environment.IP+'/api/userrole/saveuserrole',data);
  }

  getAllActiveRoles(){
    return this.http.get(environment.IP+'/api/role/getallactiverole');
  }

  deleteUserRole(id){
    return this.http.delete(environment.IP+"/api/userrole/deleteuserrole/"+id);
  }

  userdatatable(){
    return this.http.get(environment.IP+"/api/users/getuserSummary?userId="+sessionStorage.getItem("userId")+"&length=10&page=1");
  }

  userdatatable1(data){
    return this.http.get(environment.IP+"/api/users/getuserSummary?userId="+sessionStorage.getItem("userId")+"&"+data);
  }

  userExport(data){
    return this.http.get(environment.IP+"/api/users/exportuserSummary?userId="+sessionStorage.getItem("userId")+"&"+data);
  }
}
