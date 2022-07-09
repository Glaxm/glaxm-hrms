import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from './login.service';
import { moment } from 'ngx-bootstrap/chronos/test/chain';
import { CommonService } from '../views/services/common.service';
import { ToastrService } from 'src/app/views/services/toastr.service';
import { Base64 } from 'js-base64';
import { ConfirmedValidator } from './confirmed.validator';
import { FormBuilder, FormGroup, FormControl, Validators} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { SwiperConfigInterface, SwiperPaginationInterface } from 'ngx-swiper-wrapper';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  
  public config: SwiperConfigInterface = {};
  public slides = [
    { title: 'Webstore under construction', subtitle: 'coming soon', image: 'assets/images/slider/slider1.jpg' },
    { title: 'Webstore under construction', subtitle: 'coming soon', image: 'assets/images/slider/slider2.jpg' },
    { title: 'Webstore under construction', subtitle: 'coming soon', image: 'assets/images/slider/slider3.jpg' },
    { title: 'Webstore under construction', subtitle: 'coming soon', image: 'assets/images/slider/slider4.jpg' },
    { title: 'Webstore under construction', subtitle: 'coming soon', image: 'assets/images/slider/slider5.jpg' },
    { title: 'Webstore under construction', subtitle: 'coming soon', image: 'assets/images/slider/slider6.jpg' },
    { title: 'Webstore under construction', subtitle: 'coming soon', image: 'assets/images/slider/slider7.jpg' }
  ];
  

  public type: string = 'component';
  public disabled: boolean = false;
  
  
  
  empAttendanceObj: any={
    empAttendanceLineId:null,
    employeeId:null,
    dateAttendance:null,
    startTime:null,
    endTime:null,
    remark:null,
    hours:null
  };

  btnLoader:boolean;
  password;
  show = false;
  email:any;
  public isForgotScreen: boolean = false;
  public isLoginScreen: boolean = true;

  constructor(private toastService:ToastrService,private commService:CommonService,private loginService:LoginService,private router:Router) { }
  // startTime =new Date();
  
  ngOnInit() {
    this.btnLoader=false;
    this.password = 'password';
  }
  
username:any;
password1:any;

getGeoLocation() {
  this.loginService.getIpAddress().subscribe(res => {
    sessionStorage.setItem("ipaddress",  res['ip']);
    this.loginService.getGEOLocation(res['ip']).subscribe(res => {
      sessionStorage.setItem("longitude", res['longitude']);
      sessionStorage.setItem("latitude", res['latitude']);
      sessionStorage.setItem("location", res['city']+','+res['state_prov']+','+res['country_code2']);
    });
    //console.log(res);

  });
}
forgotPassword()
{
  this.isForgotScreen = true;
  this.isLoginScreen = false;
}
back()
{
  this.isForgotScreen = false;
  this.isLoginScreen = true;
}
//below lines of code for sending the password reset link
submit()
{
  console.log(this.email);
  this.loginService.sendResetLink(this.email).subscribe(res => {
    console.log(res);
      //if email id is valid
    if(res['code']==1)
    {
      this.isForgotScreen = false;
      this.isLoginScreen = false;
      this.toastService.showToastCenter('success',"Reset link sent successfully.",);
      this.loginService.userslist = res['userIds'];
      const userIds: string = res['userIds'].join(',')
      // var userIds = res['userIds'];
      console.log(this.loginService.userslist);
      // this.goToPage(userIds);
    }
    else
    {
      this.toastService.showToastCenter('danger',"Please enter valid email id.",);
    }

  })
 
}
login(){
  this.getGeoLocation();
   var pass:any;
  if(this.password1){
    pass = Base64.encode(this.password1);
  }
  this.btnLoader=true;
  this.loginService.loginUser(this.username, pass).subscribe(
    data => {
    
      var data1:any=data;
      sessionStorage.setItem("username",this.username);
      sessionStorage.setItem("token",data1.token);
      sessionStorage.setItem("userId",data1.userId);
      sessionStorage.setItem("formatedloginTime",data1.formatedloginTime);
      sessionStorage.removeItem('moduleList');
      sessionStorage.setItem("employeeId",data1.employeeId);
      sessionStorage.setItem("company",JSON.stringify(data1.companyId1));
      this.getUsersModule(data1.userId);
      this.getEmployeeDetails(data1.employeeId);
      this.btnLoader=false;
    },
    error => {
      this.btnLoader=false;
      this.toastService.showToastCenter('danger',"Please enter valid username or password.",);
    });
}
// goToPage(userIds) {
//   this.router.navigate(['/reset'], { queryParams: { userId: userIds } });
// }
getEmployeeDetails(id){
  this.loginService.employeeDetails(id).subscribe(s=>{
    var success:any= s;
    if(success){
      sessionStorage.setItem("empinfo",JSON.stringify(success));
    }
  });
}

getUsersModule(userId){
    this.loginService.getUsersModule(userId).subscribe(s=>{
      var success:any= s;
      if(success){
        sessionStorage.setItem("moduleList",JSON.stringify(success));
        this.router.navigate(['dashboard/analytics']);
      }
      // this.router.navigate(['dashboard/analytics']);
      // sessionStorage.setItem("moduleList",JSON.stringify(success));
    });
}


onClick() {
  // if (this.password === 'password') {
  //   this.password = 'text';
  //   this.show = true;
  // } else {
  //   this.password = 'password';
  //   this.show = false;
  // }
  
  this.password === 'password' ?(this.password = 'text',this.show = true):(this.password = 'password',this.show = false); 
}


resetPassword(){
  this.router.navigate(['/reset-password']);
}

// -------------------------------------------------------------------


}
@Component({
  selector: 'app-reset_pwd',
  templateUrl: './reset_pwd.component.html',
  styleUrls: ['./reset_pwd.component.scss']
})
export class ResetPwdComponent {
  form: FormGroup = new FormGroup({});
  public showEye: boolean = false;
  password;
  public userId: string;
  confirm_pwd;
  userslist:any;
  redirectToLogin: boolean = false;
  constructor(private toastService:ToastrService,private route: ActivatedRoute,private commService:CommonService,private fb: FormBuilder,private loginService:LoginService,private router:Router) {
    this.form = fb.group({
      userId: ['', [Validators.required]],
      password: ['', [Validators.required]],
      confirm_password: ['', [Validators.required]]
    }, { 
      validator: ConfirmedValidator('password', 'confirm_password')
    })
   
    this.route.queryParams.subscribe(params => {
      this.userId = params['userId'];
      console.log(this.userId); // Print the parameter to the console.
      const ids = this.userId.split(",").map((text) => 
        Number(text.trim())
        
      ); 
      console.log(ids);
      this.loginService.getUserInfo(ids).subscribe(response=>{
        this.userslist = response['userIds'];
        console.log(this.userslist);
      });
  });
  }
    
  get f(){
    return this.form.controls;
  }
   
  ResetPwd(){
    console.log(this.form.value);
    if(this.form.value.password){
    var encrypted = Base64.encode(this.form.value.password);
   
    // var encrypted = this.loginService.set('123456$#@$^@1ERF', this.form.value.password);
    // var decrypted = this.loginService.get('123456$#@$^@1ERF', encrypted);
    var userId = this.form.value.userId;
    console.log('Encrypted :' + encrypted);
   
    // console.log('Decrypted :' + decrypted);
    if(this.form.value.password == this.form.value.confirm_password)
    {
      this.form.value.password = encrypted;
      this.loginService.updatePassword(this.form.value).subscribe(response=>{
        if(response['code']==1)
        {
          this.toastService.showToastCenter('success',"Password Updated Successfully.",);
          this.redirectToLogin = true;
        }
      }); 
    }
    else
    {
      this.toastService.showToastCenter('danger',"Password and Confirm Password must be match.",);
    }
  }
  }
  redirectLogin()
  {
    this.router.navigate(['/login']);
  }
}
 
  
  
  



