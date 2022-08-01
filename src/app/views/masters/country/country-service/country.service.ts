import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  constructor(private http:HttpClient) { }

  
  getCountrySummary(){
    return this.http.get(environment.IP+"/api/masters/xflycountry/getflycountrysummary?userId="+sessionStorage.getItem("userId")+"&length=10&page=1");
 }

 getCountrySummaryWithSearch(data){
    return this.http.get(environment.IP+"/api/masters/xflycountry/getflycountrysummary?userId="+sessionStorage.getItem("userId")+"&"+data);
 }

getCompanyListByHoldingId(id){
  return this.http.get(environment.IP+"/api/masters/company/getallcompaniesbyholdingid/"+id)
}

getHoldingList(){
  return this.http.get(environment.IP+"/api/masters/holding/getallholding")
}

addUpdateCountry(data:any){
  return this.http.post(environment.IP+"/api/masters/xflycountry/saveflycountry",data);
}
getCountryById(id){
  return this.http.get(environment.IP+"/api/masters/xflycountry/getflycountrybyid/"+id)
}

}
