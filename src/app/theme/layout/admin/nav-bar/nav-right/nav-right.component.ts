import { Component, OnInit } from '@angular/core';
import { NgbDropdownConfig } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/login/login.service';
import { FormGroup, FormControl } from '@angular/forms';
import { ToastrService } from 'src/app/views/services/toastr.service';
import { environment } from 'src/environments/environment';
import { Base64 } from 'js-base64';

@Component({
  selector: 'app-nav-right',
  templateUrl: './nav-right.component.html',
  styleUrls: ['./nav-right.component.scss'],
  providers: [NgbDropdownConfig]
})
export class NavRightComponent implements OnInit {
  empAttendanceObj: any = {
    empAttendanceLineId: null,
    employeeId: null,
    dateAttendance: null,
    startTime: null,
    endTime: null,
    remark: null,
    hours: null,
    ipaddress:null,
		longitude:null,
		latitude:null,
		location:null
  };

  changePasswordForm: any;
  userObj: any;
  userName:any = sessionStorage.getItem("username");
  empObj:any = JSON.parse(sessionStorage.getItem("empinfo"));
  constructor(private toastService: ToastrService, private loginService: LoginService, private router: Router) {
    this.changePasswordForm = new FormGroup({
      password: new FormControl(null),
      confirmPassword: new FormControl(null)
    });
  }

  ngOnInit() {
   
   
  }

  callApi(){
    this.loginService.getUserByUserid(sessionStorage.getItem("userId")).subscribe(s => {
      var data:any = s;
      this.userObj = data.data;
    });
  }

  logout() {
    //this.addEmpAttendance();
    this.router.navigate(["login"]).then(() => { window.location.reload(); });
  }

  changePassword() {
//alert(this.changePasswordForm.value.password)
    if (this.changePasswordForm.value.password == this.changePasswordForm.value.confirmPassword) {
      if(this.userObj){

        this.userObj.password = Base64.encode(this.changePasswordForm.value.password);
      }
      this.loginService.changePwd(this.userObj).subscribe(s => {
        var success: any = s;
        this.toastService.showToast('success', success.message);

      });
    } else {
      this.toastService.showToast('danger', "Password does not match!");
    }
  }

  addEmpAttendance() {

    this.empAttendanceObj.empAttendanceLineId = sessionStorage.getItem("attendanceId");
    this.empAttendanceObj.employeeId = sessionStorage.getItem("employeeId");
    this.empAttendanceObj.dateAttendance = new Date();
    this.empAttendanceObj.startTime = sessionStorage.getItem("startTime");
    this.empAttendanceObj.endTime = new Date().toLocaleTimeString();
    this.empAttendanceObj.hours = sessionStorage.getItem("totalHours");
    this.empAttendanceObj.remark = sessionStorage.getItem("remark");
    
    this.empAttendanceObj.ipaddress = sessionStorage.getItem("ipaddress");
    this.empAttendanceObj.longitude = sessionStorage.getItem("longitude");
    this.empAttendanceObj.latitude = sessionStorage.getItem("latitude");
    this.empAttendanceObj.location = sessionStorage.getItem("location");

    this.loginService.addEmpAttendance(this.empAttendanceObj).subscribe(s => {
      var success: any = s;
      sessionStorage.clear();
     // this.router.navigate([""]); //.then(() => { window.location.reload(); });
     this.router.navigate(["login"]).then(() => { window.location.reload(); });;
    });
  }


}
