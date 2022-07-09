import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { IMPORT_FORMAT_EMPLOYEE_LEAVE } from 'src/app/views/services/common.service';
import { ExcelService } from 'src/app/views/services/excel.service';
import { ToastrService } from 'src/app/views/services/toastr.service';
import { environment } from 'src/environments/environment';
import { EmpLeaveService } from '../../emp-leave/emp-leave.service';
import { ExitFormService } from '../exit-form.service';

@Component({
  selector: 'app-exit-form-summary',
  templateUrl: './exit-form-summary.component.html',
  styleUrls: ['./exit-form-summary.component.scss']
})
export class ExitFormSummaryComponent implements OnInit {

  lEmpeosbId: any;
  enableFilter: boolean = false;
  exitEmpList: any = [];
  fileUploadForm: any;
  filterString = "";
  filtered;
  selectRadioBtn: boolean = false;
  
  moduleList: any = [];
  moduleid:any;
  flags = {
    createFlag: '',
    editFlag: '',
    readFlag: '',
    deleteFlag: '',
    exportFlag:'',
    importFlag:'',
    forSelf:''
  }

  constructor(private excelService: ExcelService, private toastService: ToastrService, private router: Router,
    private exitEmpService: ExitFormService) {
    this.fileUploadForm = new FormGroup({
      fileName: new FormControl("")
    });
  }

  ngOnInit() {
   
    this.moduleList = JSON.parse(sessionStorage.getItem("moduleList"));
    if (this.moduleList) {
      this.moduleList.map((e) => {
        if (e.moduleGroup == 'Transactions' && e.moduleName == 'EOSB') {
         this.moduleid=e.moduleId;
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
    this.getAllExitEmp();
  }

  selectTableRow(data) {
    if (!this.selectRadioBtn && data) {
      // this.router.navigate(['/views/transaction/emp-leave/add-empleave'], { queryParams: { id: data.lEmpleaveId } });
    }
  }
  getAllExitEmp() {
    // alert(sessionStorage.getItem("company"))sessionStorage.getItem("company")
    let list: any = JSON.parse(sessionStorage.getItem("company"));
    var l: any = [];
    // alert(list.length)
    for (var i = 0; i < list.length; i++) {

      // if(list[i]!=','){
      l.push(Number(list[i]));
      // }
    }
    this.exitEmpService.getAllExitEmp(this.moduleid,l).subscribe(success => {
      this.exitEmpList = success;
      this.onFilterChange();
      this.filtered = Array(this.exitEmpList.length).fill(0).map((x, i) => (
        {
          empname: this.exitEmpList[i].empname,
          documentno: this.exitEmpList[i].documentno,
          department: this.exitEmpList[i].department,
          designation: this.exitEmpList[i].designation,
          joiningDt: this.exitEmpList[i].joiningDt,
          lastworkDay: this.exitEmpList[i].lastworkDay,
          lEmpeosbId: this.exitEmpList[i].lEmpeosbId,
          oldEmpId: this.exitEmpList[i].oldEmpId,
          empcode: this.exitEmpList[i].empcode          
        }));
    });
  }
  getDataUsingRedioBtn(data) {
    this.lEmpeosbId = data.lEmpeosbId;
  }

  onFilterChange() {
    this.filtered = this.exitEmpList.filter((data) => this.isMatch(data));
  }

  isMatch(item) {
    if (item instanceof Object) {
      return Object.keys(item).some((k) => this.isMatch(item[k]));
    } else {
      return item ? item.toString().indexOf(this.filterString) > -1 : null;
    }
  }

  add() {
    this.router.navigate(['/views/transaction/exitemp/exit-form'], { queryParams: { moduleid:this.moduleid } });
  }
  edit() {
    if (this.lEmpeosbId) {
      this.router.navigate(['/views/transaction/exitemp/exit-form'], { queryParams: { id: this.lEmpeosbId,moduleid:this.moduleid } });
    }
  }
  view() {
    if (this.lEmpeosbId) {
      this.router.navigate(['/views/transaction/exitemp/exit-form'], { queryParams: { id: this.lEmpeosbId, view: true,moduleid:this.moduleid } });
    }
  }

  delete() { }

  fileUploadFun(event, tab) {
    console.log(event);
    //  this.formData.append('fileinfo', tab);
    if (this.file.name) {
      this.exitEmpService.uploadCsvFile(this.formData).subscribe(s => {
        var data: any = s;
        this.file = null;
        this.formData = null;
        this.toastService.showToast('success', data.message);
        this.getAllExitEmp();
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


    let exportDataList = Array(this.exitEmpList.length).fill(0).map((x, i) => (
      {
        "Emp.ID": this.exitEmpList[i].oldEmpId,
        "Emp.Code": this.exitEmpList[i].empcode,
        "Employee": this.exitEmpList[i].empname,
        "Leave": this.exitEmpList[i].leaveitemname,
        "Days": this.exitEmpList[i].leavedays,
        "Start Date": this.exitEmpList[i].startdate,
        "End date": this.exitEmpList[i].enddate
      }));

    this.excelService.exportAsExcelFile(exportDataList, title);
    //  this.excelService.exportAsExcelFile(this.reportSummaryList, "AttendanceSummary");

  }

  opeForm(data, type) {
    if (type == 'EOSB') {
      window.open(environment.EOSM_FORM + data.lEmpeosbId);
    } else {
      window.open(environment.RESIGN_FORM + data.lEmpeosbId);
    }

  }


}
