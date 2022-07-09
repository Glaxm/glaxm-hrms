import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DocumenttypeService {

  constructor(private http:HttpClient) { }

  getAllDocumenttype(){
    return this.http.get(environment.IP+"/api/doctype/getalldocType?userId="+sessionStorage.getItem("userId"));
  }

  getAllHolding(){
    return this.http.get(environment.IP+"/api/masters/holding/getallholding");
  }

  getAllCompaniesByHoldingId(id){
    return this.http.get(environment.IP+"/api/masters/company/getallcompaniesbyholdingid/"+id);
  }

  addUpdateDocumenttype(data){
    return this.http.post(environment.IP+"/api/doctype/savedocType",data);
  }

  getDocumenttypeById(id){
    return this.http.get(environment.IP+"/api/doctype/getdoctypebyid/"+id);
  }

  DocumenttypeDatabase(){
    return this.http.get(environment.IP+"/api/masters/documenttype/datatable");
  }

}
