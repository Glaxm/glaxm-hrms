import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { ToastrService } from '../../services/toastr.service';
import { ApprovestatusService } from './approvestatus.service';

@Component({
  selector: 'app-approvestatus',
  templateUrl: './approvestatus.component.html',
  styleUrls: ['./approvestatus.component.scss']
})
export class ApprovestatusComponent implements OnInit {

  approvestatussList: any = [];
  appReqId:any;
  enableFilter:boolean=false;
  empObj:any;
  statuscode:any;
  filterString = "";
  filtered;
  items = [];
  constructor(private toastService:ToastrService,private router: Router, private approvestatusService:ApprovestatusService ) {
    this.empObj = JSON.parse(sessionStorage.getItem("empinfo"));
   }

  ngOnInit() {
    this.getapprovestatusList();
  }

  navigate(event){
    if(event.lEmpleaveId && event.status_code=='A'){
      window.open(environment.LEAVE_FORM_LINK + event.lEmpleaveId);
    } else{
      this.toastService.showToast('danger', 'Request not in Approved state.');
    }  
  }

  view(){
    if (this.appReqId) {
      this.router.navigate(['/views/approval-flow/approvalrequest/add-request'], { queryParams: { id: this.appReqId, isapprove:true,statuscode:this.statuscode } });
    }
  }
  // getDataUsingRedioBtn(evnt){
  //   this.appReqId = evnt.req_no;
  //   this.statuscode = evnt.status_code;
  // }

 
  // getapprovestatusList() {
  //   this.approvestatusService.getapprovestatusList(sessionStorage.getItem("userId")).subscribe(s => {
  //     this.approvestatussList = s;

  //     this.filtered = Array(this.approvestatussList.length).fill(0).map((x, i) => (
  //       {
  //         req_no: this.approvestatussList[i].req_no,
  //         status_code:this.approvestatussList[i].status_code,
  //         req_by: this.approvestatussList[i].req_by,
  //         req_type: this.approvestatussList[i].req_type,
  //         empname: this.approvestatussList[i].empname,
  //         req_date: this.approvestatussList[i].req_date,
  //         status: this.approvestatussList[i].status
  //       }));

  //   });
  // }

  requestUpdate(data, status){
      var obj = {
              g_APPROVALREQ_ID:data.req_no,
              holdingId:this.empObj.data.holdingId,
              companyId:this.empObj.data.companyId,
              approveR_ID: Number(sessionStorage.getItem("userId")),
              datestatus:new Date(),
              isactive: 'Y',
              updated:new Date(),
              updatedby: Number(sessionStorage.getItem("userId")),
              approvalstatus : status,
              processing: null,
              processed: 'Y',
              remarks: null
          };



     // alert(JSON.stringify(obj))

      this.approvestatusService.updateApprovalStatus(obj).subscribe(data=>{
        var s: any =data;
        this.toastService.showToast('success', s.message);
        this.getapprovestatusList();
        //alert(JSON.stringify(data));
      })
  }

  // onFilterChange() {
  //   this.filtered = this.approvestatussList.filter((data) => this.isMatch(data));
  // }

  // isMatch(item) {
  //   if (item instanceof Object) {
  //     return Object.keys(item).some((k) => this.isMatch(item[k]));
  //   } else {
  //     return item ? item.toString().indexOf(this.filterString) > -1 : null;
  //   }
  // }

 //============================================ Datatable

 data: any = [];
 getapprovestatusList() {
   this.approvestatusService.approvestatusdatatable().subscribe(s => {
   this.data = s;
   });
}
 
  search(data) {
    this.data = {};
    this.approvestatusService.approvestatusdatatable1(data).subscribe(s => {
    this.data = s;
   });

  }


  getRows(evnt){
    this.appReqId = evnt.req_no;
       this.statuscode = evnt.status_code;
       
  }


}
