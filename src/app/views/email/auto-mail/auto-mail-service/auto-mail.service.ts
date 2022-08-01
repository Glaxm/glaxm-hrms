import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AutoMailService {

  constructor(private http:HttpClient) { }

  getAllUser(){
    return this.http.get(environment.IP+"/api/users/getall");
  }
}
