import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService } from '../../services/common.service';
import { ToastrService } from '../../services/toastr.service';
import { ReportService } from '../report.service';

@Component({
  selector: 'app-emp-punch-attendance',
  templateUrl: './emp-punch-attendance.component.html',
  styleUrls: ['./emp-punch-attendance.component.scss']
})
export class EmpPunchAttendanceComponent implements OnInit {

  employeeId: any;
  dateAttendance: any;
  empcode: any;
  name: any;
  startTime: any;
  endTime: any;
  breakStart: any;
  breakEnd: any;
  empAttendanceLineId: any;
  comp_list:any;

  punchForm: any;
  punchDataList: any = [];
  btnLoader: boolean;
  departmentid : any;
  com_id: any;
  emp_id: any;
  emp_code: any;
  st_date: any;
  en_date: any;
  oldEmpId: any;
  shiftruleId: any;
  isActive: any;
  isPresent: any;
  holdingId:any;
  empAttnId:any;
  templist=[];
  shiftname:any;
  status:any;
  dateattendance:any;
  spontype:any;
  bioId:any;
  constructor(public commonService: CommonService, private toastService: ToastrService, private reportService: ReportService, private activatedRoute: ActivatedRoute, private router: Router) {
    this.activatedRoute.queryParams.subscribe(data => {
      this.empAttendanceLineId = data.empAttendanceLineId,
        this.dateAttendance = data.dateAttendance,
        this.employeeId = data.employeeId,
        this.com_id = data.com_id,
        this.comp_list = data.comp_list,
        this.emp_id = data.emp_id,
        this.emp_code = data.emp_code,
        this.st_date = data.st_date,
        this.en_date = data.en_date,
        this.oldEmpId = data.oldEmpId,
        this.shiftruleId = data.shiftruleId,
        this.isActive = data.isActive,
        this.isPresent = data.isPresent,
        this.holdingId=data.holdingId,
        this.empAttnId = data.empAttnId,
        this.templist = data.emp_list,
        this.departmentid = data.departmentid,
        this.shiftname=  data.shiftname,
        this.dateattendance=  data.dateattendance,
        this.status = data.status,
        this.spontype = data.spontype,
        this.bioId=data.bioId
    });

   // alert(JSON.stringify(this.templist))
    this.punchForm = new FormGroup({
      employeeId: new FormControl(null),
      dateAttendance: new FormControl(null),
      empcode: new FormControl(null),
      name: new FormControl(null),
      startTime: new FormControl(null),
      endTime: new FormControl(null),
      breakStart: new FormControl(null),
      breakEnd: new FormControl(null),
      empAttenLineId: new FormControl(null),
      companyId: new FormControl(null),
      holdingId: new FormControl(null),
      isActive: new FormControl(null),
      createdBy: new FormControl(null),
      updatedBy: new FormControl(null),
      created: new FormControl(null),
      updated: new FormControl(null),
      empAttnId: new FormControl(null),
      dateAttn: new FormControl(null),
      isPresent: new FormControl(null),
      processed: new FormControl(null),
      description: new FormControl(null),
      overTime: new FormControl(null),
      totbrkTime: new FormControl(null),
      xShiftruleId: new FormControl(null),
      x_SHIFTRULE: new FormControl(null),
      attn_dt: new FormControl(null),
      isHalfday: new FormControl(null),
      ishalfday1: new FormControl(null),

    });

    //alert(this.com_id+" = "+this.emp_id+" = "+this.emp_code+" = "+this.st_date+" = "+this.en_date)

  }

  ngOnInit() {
    this.punchForm.controls['empAttenLineId'].setValue(Number(this.empAttendanceLineId));
    this.getPunchList(this.bioId, this.commonService.dateFormat(this.dateAttendance));
    if (this.empAttendanceLineId) {
      this.getEmpAttendanceLineId(this.empAttendanceLineId);
    } else{     
      this.punchForm.controls['empcode'].setValue(this.emp_code);
      this.punchForm.get('employeeId').setValue(Number(this.employeeId));
      this.punchForm.get('dateAttn').setValue(this.dateAttendance);
      this.punchForm.get('xShiftruleId').setValue(Number(this.shiftruleId));
    
      this.punchForm.get('companyId').setValue(Number(this.com_id));
      this.punchForm.get('holdingId').setValue(Number(this.holdingId));
      this.punchForm.get('isActive').setValue(this.isActive);
      this.punchForm.get('empAttenLineId').setValue(undefined);
      this.punchForm.get('createdBy').setValue(Number(sessionStorage.getItem('userId')));
      this.punchForm.get('updatedBy').setValue(Number(sessionStorage.getItem('userId')));
      this.punchForm.get('updated').setValue(new Date());
      this.punchForm.get('empAttnId').setValue(Number(this.empAttnId));
      this.punchForm.get('isPresent').setValue(this.isPresent);
      this.punchForm.get('created').setValue(new Date());
    }
  }

  setColorOnDate(date){
    if(date==this.dateattendance) {
      return { color: '#4680ff' }
    }
  
    return { color: '#535763' }
  }

  getEmpAttendanceLineId(lineId) {
    this.reportService.getEmpAttendanceLineId(lineId).subscribe(data => {
      var success: any = data;
      this.punchForm.patchValue(success.data);

      success.data.isHalfday=="Y" ?this.punchForm.controls['ishalfday1'].setValue(true) : this.punchForm.controls['ishalfday1'].setValue(false);
    });
  }

  getShiftTiming(){
    if(this.shiftruleId){
      this.reportService.getShiftByShiftId(this.shiftruleId).subscribe(data=>{
          var d:any = data;
          this.punchForm.controls['startTime'].setValue(d.data.startTime);
          this.punchForm.controls['endTime'].setValue(d.data.endTime);
          this.punchForm.controls['breakStart'].setValue(d.data.breakStart);
          this.punchForm.controls['breakEnd'].setValue(d.data.breakEnd);
      });
    }
  }



  back() {
    this.router.navigate(['/views/report/emp-attendance-report']
    , {
      queryParams: {
        emp_list:this.templist,
        comp_list:this.comp_list,
        departmentid : this.departmentid,
        com_id: this.com_id,
        emp_id: this.emp_id,
        emp_code: this.emp_code,
        st_date: this.st_date,
        en_date: this.en_date,
        status: this.status,
        spontype:this.spontype,
        is_redirect: 1
      

      }
    }
    );
  }

  updateTime() {
    this.btnLoader = true;

    this.punchForm.get('createdBy').setValue(Number(sessionStorage.getItem('userId')));
    this.punchForm.get('updatedBy').setValue(Number(sessionStorage.getItem('userId')));
    this.punchForm.get('updated').setValue(new Date());
    this.punchForm.get('created').setValue(new Date());

    this.punchForm.value.ishalfday1 ? this.punchForm.controls['isHalfday'].setValue("Y") : this.punchForm.controls['isHalfday'].setValue("N");
    this.punchForm.controls['attn_dt'].setValue(this.commonService.dateFormat(this.punchForm.value.dateAttn));
    this.reportService.updateTime(this.punchForm.value).subscribe(data => {
      this.btnLoader = false;
      var success: any = data;
      this.toastService.showToast('success', success.message);
      this.back();
    }, error => { this.btnLoader = false; console.log('oops', error); });

  }
  enableupdate:any;
  getPunchList(empId, date) {
    this.reportService.getPunchList(empId, date).subscribe(data => {
      var success: any = data;
      this.punchDataList = success.data;
      if(this.punchDataList){
      this.enableupdate=success.enableupdate;
    }
    });
  }


}
