import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UomService {

  constructor(private http:HttpClient) { }

  getAllUom(){
      return this.http.get(environment.IP+"/api/masters/unitMeasure/getallunitmeasure");
  }
  getAllHolding(){
    return this.http.get(environment.IP+"/api/masters/holding/getallholding")
  }
  getCompanyById(holdingId){
    return this.http.get(environment.IP+"/api/masters/company/getallcompaniesbyholdingid/"+holdingId);

  }
  addUpdateUom(data){
    return this.http.post(environment.IP+"/api/masters/unitMeasure/saveunitmeasure",data)
  }

  getUomById(id){
    return this.http.get(environment.IP+"/api/masters/unitMeasure/getunitmeasurebyid/"+id);
  }


}
