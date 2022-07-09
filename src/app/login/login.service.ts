import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(public http:HttpClient) { }
  userslist:any;
  loginUser(user, pass){
    return this.http.post(environment.IP+"/authenticate",{username:user, password:pass, currentloginTime:new Date()});
  }
  getUserInfo(userId){
    return this.http.post(environment.IP+"/api/users/getuserInfo",userId);
  }
  employeeDetails(id){
    return this.http.get(environment.IP+"/api/employee/getemployeebyid/"+id);
  }
  //for sending the reset link to specified email
  sendResetLink(email){
    return this.http.get(environment.IP+"/api/users/resetPassword?mailId="+email);
  }

  getUsersModule(userid){
      return this.http.get(environment.IP+"/api/module/getallmodulesbyuserid/"+userid);
  }

  addEmpAttendance(obj){
    return this.http.post(environment.IP+"/api/empattendance/saveempattendance",obj);
  }

  getTodayAttendanceData(empId, date){
    return this.http.get(environment.IP+"/api/empattendance/getattendancebyempidandcurrentdate/"+empId+"/"+date);
  }

  getUserByUsername(name){
    return this.http.get(environment.IP+"/api/users/getuserbyname/"+name);
  }

  getUserByUserid(id){
    return this.http.get(environment.IP+"/api/users/getbyid/"+id);
  }

  changePwd(data){
    return this.http.post(environment.IP+"/api/users/changepwd",data);
  }
  updatePassword(data){
    return this.http.post(environment.IP+"/api/users/updatePassword",data);
  }
  getIpAddress(){
    return this.http.get('https://api.ipify.org/?format=json').pipe(
      catchError(this.handleError)
    );
  }

  getGEOLocation(ip){
    let url = "https://api.ipgeolocation.io/ipgeo?apiKey=b81cc74e124247a0b99438bc3c22f79c&ip="+ip+"&fields=geo"; 
    return this.http.get(url).pipe(
            catchError(this.handleError)
          );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {

      console.error('An error occurred:', error.error.message);
    } else {

      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    
    return throwError(
      'Something bad happened; please try again later.');
  }

}
