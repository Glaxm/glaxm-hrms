import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { IMPORT_FORMAT_OPENING_LEAVE_BAL } from '../../services/common.service';
import { ExcelService } from '../../services/excel.service';
import { ToastrService } from '../../services/toastr.service';
import { OpeningLeaveBalService } from './opening-leave-bal.service';

@Component({
  selector: 'app-opening-leave-bala',
  templateUrl: './opening-leave-bala.component.html',
  styleUrls: ['./opening-leave-bala.component.scss']
})
export class OpeningLeaveBalaComponent implements OnInit {

  OpeningLeaveId:any;
  enableFilter:boolean =false;
  openingleaveList:any=[];
  fileUploadForm:any;
  filterString = "";
  filtered;
  selectRadioBtn: boolean = false;

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

  constructor(private excelService:ExcelService,private toastService:ToastrService,private router:Router,private openingLeaveBalService:OpeningLeaveBalService) {
    
    this.moduleList = JSON.parse(sessionStorage.getItem("moduleList"));
    if (this.moduleList) {
      this.moduleList.map((e) => {
        if (e.moduleGroup == 'Leave Management' && e.moduleName == 'Leave Balance') {
          this.flags = { 'createFlag': e.createFlag, 'editFlag': e.editFlag, 'readFlag': e.readFlag, 'deleteFlag': e.deleteFlag,
          'importFlag': e.importFlag,
          'exportFlag': e.exportFlag,
          'forSelf': e.forSelf };
        }
      });
    }

    this.fileUploadForm = new FormGroup({
      fileName: new FormControl("")
    });
   }

  ngOnInit() {
    this.getAllEmpleaveBal();
  }

  selectTableRow(data) {
    if (!this.selectRadioBtn && data) {
     // this.router.navigate(['/views/transaction/emp-leave/add-empleave'], { queryParams: { id: data.lEmpleaveId } });
    }
  }
  getAllEmpleaveBal() {
    let list:any = JSON.parse(sessionStorage.getItem("company"));
    var l:any=[];
    if(list){
    for(var i=0;i<list.length;i++){
     // if(list[i]!=','){
        l.push(Number(list[i]));
      // }
    }}
    this.openingLeaveBalService.getAllEmpleaveBal(l).subscribe(success=>{
      this.openingleaveList=success;
      this.onFilterChange();
      this.filtered = Array(this.openingleaveList.length).fill(0).map((x, i) => (
        {
          oldEmpId: this.openingleaveList[i].oldEmpId,
          empcode:this.openingleaveList[i].empcode,
          empname:this.openingleaveList[i].empname,
          allocleaves: this.openingleaveList[i].allocleaves,
          leaveitemname: this.openingleaveList[i].leaveitemname,
          startDate: this.openingleaveList[i].startDate,
          lEmpleaveId: this.openingleaveList[i].lEmpleaveId,
          takenleaves: this.openingleaveList[i].takenleaves,
          balanceleaves:this.openingleaveList[i].balanceleaves,
          resumptiondate:this.openingleaveList[i].resumptiondate

        }));
    });
  }
  getDataUsingRedioBtn(data){
    this.OpeningLeaveId = data.lEmpleaveId;
}

onFilterChange() {
  this.filtered = this.openingleaveList.filter((data) => this.isMatch(data));
}

isMatch(item) {
  if (item instanceof Object) {
    return Object.keys(item).some((k) => this.isMatch(item[k]));
  } else {
    return item ? item.toString().indexOf(this.filterString) > -1 : null;
  }
}

// add(){ 
//   this.router.navigate(['/views/transaction/emp-leave/add-empleave']);
// }
// edit(){ 
//   if(this.LeaveId){
//     this.router.navigate(['/views/transaction/emp-leave/add-empleave'],{queryParams:{id:this.LeaveId}});
//   }
// }
// view(){ 
//   if(this.LeaveId){
//     this.router.navigate(['/views/transaction/emp-leave/add-empleave'],{queryParams:{id:this.LeaveId,view:true}});
//   }
// }

// delete(){ }

fileUploadFun(event,tab) {
  console.log(event);
//  this.formData.append('fileinfo', tab);
  if (this.file.name) {
    this.openingLeaveBalService.uploadCsvFile(this.formData).subscribe(s => {
      var data: any = s;
      this.file = null;
      this.formData = null;
      this.toastService.showToast('success', data.message);
      this.getAllEmpleaveBal();
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

exportLeaveFormat(){
   this.excelService.exportAsExcelFile(IMPORT_FORMAT_OPENING_LEAVE_BAL, 'Opening_Leave_Bala_Import_Format');
}


exporttoexcel() {
  let title = "Opening_Leave_Balance";


  // let exportDataList = Array(this.openingleaveList.length).fill(0).map((x, i) => (
  //   {
  //     "Emp.ID": this.openingleaveList[i].oldEmpId,
  //     "Employee": this.openingleaveList[i].empname,
  //     "Leave Type": this.openingleaveList[i].leaveitemname,
  //     "Last Leave Settlement Date": this.openingleaveList[i].startDate,
  //     "Leave Balance": this.openingleaveList[i].balanceleaves,
  //     "Resumption Date": this.openingleaveList[i].resumptiondate
      

  //   }));
  let exportDataList = Array(this.openingleaveList.length).fill(0).map((x, i) => (
    {
      "Emp.ID": this.openingleaveList[i].oldEmpId,
      "Employee": this.openingleaveList[i].empname,
      "Leave Type": this.openingleaveList[i].leaveitemname,
      "Last Leave Settlement Date": this.openingleaveList[i].startDate,
      "Current Leave Settlement Date": this.openingleaveList[i].curleavesettledupto,
      "Resumption Date": this.openingleaveList[i].resumptiondate,
      "Leave Balance": this.openingleaveList[i].balanceleaves,
      "Air ticket entitlement": this.openingleaveList[i].ticketEnt,
      "Last Air ticket Settlement Date": this.openingleaveList[i].lastticketsettledupto,
      "Current Air ticket Settlement Date": this.openingleaveList[i].curticketsettledupto,
      "Home town Air Port Name": this.openingleaveList[i].toairportName
     
    }));


  this.excelService.exportAsExcelFile(exportDataList, title);
//  this.excelService.exportAsExcelFile(this.reportSummaryList, "AttendanceSummary");

}


}
