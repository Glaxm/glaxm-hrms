import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ModuleService {

  constructor(private http:HttpClient) { }

  moduleDateTable(){
    return this.http.get(environment.IP+'/api/module/getall');
  }

  saveModule(data){
    return this.http.post(environment.IP+'/api/module/savemodule',data);
  }
  getModuleById(moduleId){
    return this.http.get(environment.IP+'/api/module/getbyid/'+moduleId);
  }

  moduleDatatable(){
    return this.http.get(environment.IP+"/api/module/getmoduleSummary?userId="+sessionStorage.getItem("userId")+"&length=10&page=1");
  }

  moduleDatatable1(data){
    return this.http.get(environment.IP+"/api/module/getmoduleSummary?userId="+sessionStorage.getItem("userId")+"&"+data);
  }

  moduleExport(data){
    return this.http.get(environment.IP+"/api/module/exportmoduleSummary?userId="+sessionStorage.getItem("userId")+"&"+data);
  }
}
