import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { IMPORT_FORMAT_EMPLOYEE_LEAVE, IMPORT_FORMAT_EMPLOYEE_LEAVE_NEW } from '../../services/common.service';
import { ExcelService } from '../../services/excel.service';
import { ToastrService } from '../../services/toastr.service';
import { EmpLeaveService } from './emp-leave.service';

@Component({
  selector: 'app-emp-leave',
  templateUrl: './emp-leave.component.html',
  styleUrls: ['./emp-leave.component.scss']
})
export class EmpLeaveComponent implements OnInit {

  LeaveId: any;
  enableFilter: boolean = false;
  empleaveList: any = [];
  fileUploadForm: any;
  fileUploadFormNew:any;
  filterString = "";
  filtered;
  selectRadioBtn: boolean = false;
  isVoid:any;
moduleList: any = [];
moduleid:any;
flags = {
  createFlag: '',
  editFlag: '',
  readFlag: '',
  deleteFlag: '',
  exportFlag:'',
  importFlag:''
}
  constructor(private excelService: ExcelService, private toastService: ToastrService, private router: Router, private empLeaveService: EmpLeaveService) {
    this.fileUploadForm = new FormGroup({
      fileName: new FormControl("")
    });

    this.fileUploadFormNew = new FormGroup({
      fileName: new FormControl("")
    });
  }

  ngOnInit() {
    // this.getAllEmpleave();
    this.empleavetransactionsummary();
    this.moduleList = JSON.parse(sessionStorage.getItem("moduleList"));
    if (this.moduleList) {
      this.moduleList.map((e) => {
        if (e.moduleGroup == 'Leave Management' && e.moduleName == 'Employee Leave') {
         this.moduleid=e.moduleId;
          this.flags = { 
                'createFlag': e.createFlag, 
                'editFlag': e.editFlag, 
                'readFlag': e.readFlag, 
                'deleteFlag': e.deleteFlag,
                'importFlag': e.importFlag,
                'exportFlag': e.exportFlag
                };
        }
      });
    }
  }

  selectTableRow(data) {
    if (!this.selectRadioBtn && data && this.flags.editFlag=="Y" && this.isVoid !="V") {
      this.router.navigate(['/views/transaction/emp-leave/add-empleave'], { queryParams: { id: data.lEmpleaveId,moduleid:this.moduleid } });
    }
  }

  
  getAllEmpleave() {
    // alert(sessionStorage.getItem("company"))
    let list: any = JSON.parse(sessionStorage.getItem("company"));
    var l: any = [];
    if (list) {
      for (var i = 0; i < list.length; i++) {
        l.push(Number(list[i]));
      }
    }
    this.empLeaveService.getAllEmpleave(l).subscribe(success => {
      this.empleaveList = success;
      this.onFilterChange();
      this.filtered = Array(this.empleaveList.length).fill(0).map((x, i) => (
        {
          empname: this.empleaveList[i].empname,
          enddate: this.empleaveList[i].enddate,
          leavedays: this.empleaveList[i].leavedays,
          leaveitemname: this.empleaveList[i].leaveitemname,
          startdate: this.empleaveList[i].startdate,
          lEmpleaveId: this.empleaveList[i].lEmpleaveId,
          oldEmpId: this.empleaveList[i].oldEmpId,
          empcode: this.empleaveList[i].empcode,
          status: this.empleaveList[i].status,
          lEmpeosbId: this.empleaveList[i].lEmpeosbId,
          documentno:this.empleaveList[i].documentno

        }));
    });
  }
  getDataUsingRedioBtn(data) {
    this.LeaveId = data.lEmpleaveId;
    this.isVoid = data.status;
  }

  onFilterChange() {
    this.filtered = this.empleaveList.filter((data) => this.isMatch(data));
  }

  isMatch(item) {
    if (item instanceof Object) {
      return Object.keys(item).some((k) => this.isMatch(item[k]));
    } else {
      return item ? item.toString().indexOf(this.filterString) > -1 : null;
    }
  }

  add() {
    this.router.navigate(['/views/transaction/emp-leave/add-empleave'],{queryParams:{moduleid:this.moduleid}});
  }
  edit() {
    if (this.LeaveId) {
      if(this.isVoid=="V"){
        this.toastService.showToast('danger', "Voided record.");
      } else{
      this.router.navigate(['/views/transaction/emp-leave/add-empleave'], { queryParams: { id: this.LeaveId,moduleid:this.moduleid,edit:1 } });
    }
  }
  }
  view() {
    if (this.LeaveId) {
      // if(this.isVoid=="V"){
      //   this.toastService.showToast('danger', "Voided record.");
      // } else{
      this.router.navigate(['/views/transaction/emp-leave/add-empleave'], { queryParams: { id: this.LeaveId, view: true, moduleid:this.moduleid} });
    }
  // }
  }

  delete() { } 

  fileUploadFun(event, tab) {
    console.log(event);
    //  this.formData.append('fileinfo', tab);
    if (this.file.name) {
      this.empLeaveService.uploadCsvFile(this.formData).subscribe(s => {
        var data: any = s;
        this.file = null;
        this.formData = null;
        this.toastService.showToast('success', data.message);
        this.getAllEmpleave();
      });
    } else {
    }
  }

  file: File;
  formData: FormData; // = new FormData();
  fileChange(event) {
    this.formData = new FormData();
    let fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      this.file = fileList[0];
      this.formData.append('file', this.file, this.file.name)
    }
    // alert(this.file.name)
  }

  exportLeaveFormat() {
    this.excelService.exportAsExcelFile(IMPORT_FORMAT_EMPLOYEE_LEAVE, 'Employee_Leave_Import_Format');
  }

  exporttoexcel() {
    let title = "Employee_Leave";
    let list: any = JSON.parse(sessionStorage.getItem("company"));
    var l: any = [];
    // alert(list.length)
    for (var i = 0; i < list.length; i++) {
      l.push(Number(list[i]));
    }
    this.empLeaveService.exportEmpLeave(l).subscribe(data => {
      let list: any = data;
      if (list) {
        let exportList = Array(list.length).fill(0).map((x, i) => (
          {

            "Prefix": list[i].prefix,
            "Suffix": list[i].suffix,
            "Staff No.": list[i].staffNo,
            "Staff Name": list[i].staffName,
            "Job title": list[i].jobTitle,
            "Co.": list[i].companyName,
            "Joining Date": list[i].dateofJoin,
            "Leave From": list[i].leaveFrom,
            "Leave To": list[i].leaveTo,
            "No. of Days Leave": list[i].days,
            "fridaysinLeave": list[i].fridaysinLeave,
            "Saturday during leave": list[i].saturdaysinLeave,
            "Compensatory/compassionate off": list[i].compoff,
            "Encashment": list[i].encashment,
            "Public Holidays": list[i].holidaysinLeave,
            "Rejoining date": list[i].rejoiningDt,
            "Annual leave days": list[i].annualleaveDays,
            "Last Leave settled upto": list[i].lastleavesettledupto,
            "Current Leave Settled up to": list[i].curleavesettledupto,
            "Air Ticket Entitlement": list[i].airtktEntitled,
            "Last Air ticket settled upto": list[i].airportName,
            "Current Airticket Settled up to": '',
            "Home Town ( For air ticket)": list[i].airportName,
            "Posting date (date of processing)": list[i].postingDt,
            "Unpaid": list[i].unpaid,
            "Sick": list[i].sick,
            "Business Trip": list[i].businessTrip,
            "Emergency": list[i].emergency,
            "Marriage leave": list[i].marriageLeave,
            "Maternity/Peternity": list[i].imatOrpaternity,
            "Accident at work": list[i].accidental,
            "Training": list[i].training,
            "vlook": '',
            "last Bonus setteled upto": list[i].lastbonusSettled,
            "Current Bonus setteled upto": list[i].curbonusSettled,
            "Last bonus amount payed": list[i].lastbonusAmount,
            "Current bonus amount payed": list[i].curbonusAmount,
            "Remarks": list[i].remarks,
            "Certificate provided": list[i].certificate,
            "Leave Ref. No." : list[i].documentno
          }));

        this.excelService.exportAsExcelFile(exportList, title);
      }
    })

    // let exportDataList = Array(this.empleaveList.length).fill(0).map((x, i) => (
    //   {
    //     "Emp.ID": this.empleaveList[i].oldEmpId,
    //     "Emp.Code": this.empleaveList[i].empcode,
    //     "Employee": this.empleaveList[i].empname,
    //     "Leave": this.empleaveList[i].leaveitemname,
    //     "Days": this.empleaveList[i].leavedays,
    //     "Start Date": this.empleaveList[i].startdate,
    //     "End date": this.empleaveList[i].enddate


    //   }));

    // this.excelService.exportAsExcelFile(exportDataList, title);
    //  this.excelService.exportAsExcelFile(this.reportSummaryList, "AttendanceSummary");

  }

  openLeaveForm(data, str) {
    if (str == 'FORM') {
      window.open(environment.LEAVE_FORM_LINK + data.lEmpleaveId);
    } else {
      window.open(environment.LEAVE_CAL_REPORT_LINK + data.lEmpeosbId);
    }

  }

  getColors(data) {
   // alert(JSON.stringify(data));
  }

  ///////////////////// UPLOAD FILE - NEW

  fileUploadFunNew(event, tab) {
    console.log(event);
    if (this.file.name) {
      this.empLeaveService.uploadCsvFileNew(this.formData).subscribe(s => {
        var data: any = s;
        this.file = null;
        this.formData = null;
        this.toastService.showToast('success', data.message);
        this.getAllEmpleave();
      });
    } else {
    }
  }

  fileChangeNew(event) {
    this.formData = new FormData();
    let fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      this.file = fileList[0];
      this.formData.append('file', this.file, this.file.name)
    }
  }

  exportLeaveFormatNew() {
    this.excelService.exportAsExcelFile(IMPORT_FORMAT_EMPLOYEE_LEAVE_NEW, 'Employee_Leave_Import_Format_New');
  }


   //============================================ Datatable

 data: any = [];
 empleavetransactionsummary() {
  let list: any = JSON.parse(sessionStorage.getItem("company"));
  var l: any = [];
  if (list) {
    for (var i = 0; i < list.length; i++) {
      l.push(Number(list[i]));
    }
  }
   this.empLeaveService.empleavetransactionsummary(l).subscribe(s => {
   this.data = s;
   });
}
 
  search(data) {
    this.data = {};

    let list: any = JSON.parse(sessionStorage.getItem("company"));
    var l: any = [];
    if (list) {
      for (var i = 0; i < list.length; i++) {
        l.push(Number(list[i]));
      }
    }

    this.empLeaveService.empleavetransactionsummary1(data, l).subscribe(s => {
    this.data = s;
   });

  }


  getRows(evnt){
    console.log(evnt.button);
    this.LeaveId = evnt.lEmpleaveId;
   
    if(evnt.key=="" || evnt.key=="Application Form" || evnt.key=="Settlement Form"){

    } else{
      this.edit();
    }
  }

  navigate(event){

  //  if(event.button=="Application"){
  //   
  //  } else{
  //   
  //  }
  if(event.navigatekey=="Application Form"){
    this.openLeaveForm(event,'FORM');
  } else{
    this.openLeaveForm(event,'CAL');
  }
  }

}


