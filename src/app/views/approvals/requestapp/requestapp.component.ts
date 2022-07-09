import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { EmployeeService } from '../../masters/employee/employee.service';
import { ToastrService } from '../../services/toastr.service';
import { RequestappService } from './requestapp.service';

@Component({
  selector: 'app-requestapp',
  templateUrl: './requestapp.component.html',
  styleUrls: ['./requestapp.component.scss']
})
export class RequestappComponent implements OnInit {
  enableFilter:boolean=false;
  requestList:any=[];
  appReqId:any;
  reqStatus:any;
  isActive:any;
  
  moduleId:any;
  moduleList: any = [];
  flags = {
    createFlag: '',
    editFlag: '',
    readFlag: '',
    deleteFlag: '',
    exportFlag:'',
    importFlag:'',
    forSelf: ''
  }

  leaveballist:any =[];

  constructor(private empService:EmployeeService,private router:Router, private toastService:ToastrService,private requestAppService:RequestappService) { }

  ngOnInit() {

    this.moduleList = JSON.parse(sessionStorage.getItem("moduleList"));
    if (this.moduleList) {
      this.moduleList.map((e) => {
        if (e.moduleGroup == 'Request' && e.moduleName == 'Approval Request') {
         this.moduleId = e.moduleId;
          this.flags = { 
                'createFlag': e.createFlag, 
                'editFlag': e.editFlag, 
                'readFlag': e.readFlag, 
                'deleteFlag': e.deleteFlag,
                'importFlag': e.importFlag,
                'exportFlag': e.exportFlag,
                'forSelf': e.forSelf
                };
        }
      });
  }

  this.getapproveRequestList();

}

navigate(event){
  if(event.lEmpleaveId && event.status_code=='A'){
    window.open(environment.LEAVE_FORM_LINK + event.lEmpleaveId);
  } else{
    this.toastService.showToast('danger', 'Request not in Approved state.');
  }  
}



  add(){
    this.router.navigate(['/views/approval-flow/approvalrequest/add-request'])
  }
  view(){
    if (this.appReqId && this.isActive!="V") {
      this.router.navigate(['/views/approval-flow/approvalrequest/add-request'], { queryParams: { id: this.appReqId } });
    } else{
      this.toastService.showToast('danger', "Voided record.");
    }
  }
  // getDataUsingRedioBtn(evnt){
  //   this.appReqId = evnt.req_no;
  //   this.reqStatus = evnt.status_code;
  // }

   //============================================ Datatable

 data: any = [];
 getapproveRequestList() {
   this.requestAppService.approveRequestdatatable().subscribe(s => {
   this.data = s;
   });
}
 
  search(data) {
    this.data = {};
    this.requestAppService.approveRequestdatatable1(data).subscribe(s => {
    this.data = s;
   });

  }


  getRows(evnt){
    this.appReqId = evnt.req_no;
    this.reqStatus = evnt.status_code;
    this.isActive = evnt.isActive;
    if(evnt.key==""){

    } else{
      if(evnt.key=='Form'){
      } else{
        this.view();
      }
    }
  }

  getLeaveBalList(){
    
    this.empService.getLeaveBalList(sessionStorage.getItem('employeeId')).subscribe(data=>{
          this.leaveballist = data;
    });
} 


}
