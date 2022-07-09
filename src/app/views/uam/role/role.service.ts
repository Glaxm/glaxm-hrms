import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  constructor(private http:HttpClient) { }

  roleDateTable(){
    return this.http.get(environment.IP+'/api/role/getall');
  }

  saveRole(data){
    return this.http.post(environment.IP+'/api/role/saverole',data);
  }

  getRoleDataById(id){
    return this.http.get(environment.IP+'/api/role/getbyid/'+id);
  }

  ////////////////////////////////////////////////////////////////////////////////

  roleModuleDataTable(roleId){
    return this.http.get(environment.IP+'/api/rolemodule/getallrolemodulebyroleid/'+roleId);
  }

  getAllActiveModule(){
    return this.http.get(environment.IP+'/api/module/getallactivemodule');
  }
  addRoleModule(data){
    return this.http.post(environment.IP+'/api/rolemodule/saverolemodule',data);
  }

  getRoleModuleByRoleModuleId(id){
    return this.http.get(environment.IP+'/api/rolemodule/getbyid/'+id);
  }

  roledatatable(){
    return this.http.get(environment.IP+"/api/role/getrolesummary?userId="+sessionStorage.getItem("userId")+"&length=10&page=1");
  }

  roledatatable1(data){
    return this.http.get(environment.IP+"/api/role/getrolesummary?userId="+sessionStorage.getItem("userId")+"&"+data);
  }

  roleExport(data){
    return this.http.get(environment.IP+"/api/role/exportrolesummary?userId="+sessionStorage.getItem("userId")+"&"+data);
  }
}
