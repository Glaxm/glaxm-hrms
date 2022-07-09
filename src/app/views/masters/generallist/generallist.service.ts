import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GenerallistService {

  constructor(private http:HttpClient) { }
  getAllGeneralList(){
    return this.http.get(environment.IP+"/api/masters/generallist/getallgenerallist");
  }

  getAllHolding(){
    return this.http.get(environment.IP+"/api/masters/holding/getallholding")
  }
  getCompanyById(holdingId){
    return this.http.get(environment.IP+"/api/masters/company/getallcompaniesbyholdingid/"+holdingId);
  }

  saveUpdateGenerallist(data){
    return this.http.post(environment.IP+"/api/masters/generallist/savegenerallist",data);
  }

  getGenerallistDetailsById(id){
    return this.http.get(environment.IP+"/api/masters/generallist/getgenerallistbyid/"+id);
  }

  getGeneralListValueListById(id){
    return this.http.get(environment.IP+"/api/masters/generallistvalue/getvaluebygeneralid/"+id);
  }

  saveUpdateGenerallistValue(data){
    return this.http.post(environment.IP+"/api/masters/generallistvalue/savegenerallistvalue",data)
  }

  getListValueById(id){
    return this.http.get(environment.IP+"/api/masters/generallistvalue/getgenerallistvaluebyid/"+id);
  }

}
