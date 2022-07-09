import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EmpAttendanceService } from '../emp-attendance.service';
import { FormGroup, FormControl } from '@angular/forms';
import { ToastrService } from 'src/app/views/services/toastr.service';
import { CommonService, IMPORT_FORMAT_EMPLOYEE_ATTENDANCE, IMPORT_FORMAT_EMPLOYEE_SHIFT_ALLOCATION, IMPORT_FORMAT_SHIFT_ROSTER } from 'src/app/views/services/common.service';
import { ExcelService } from 'src/app/views/services/excel.service';
import * as moment from 'moment';

@Component({
  selector: 'app-emp-attendance-summary',
  templateUrl: './emp-attendance-summary.component.html',
  styleUrls: ['./emp-attendance-summary.component.scss']
})
export class EmpAttendanceSummaryComponent implements OnInit {
  fileUploadForm: FormGroup;
  fileUploadFormAssignShift: any;
  empId: any;
  fromDate:any;
  enableFilter: boolean = false;
  attenList: any = [];
  selectRadioBtn: boolean = false;

  filterString = "";
  filtered;
  items = [];

  moduleList: any = [];
  moduleid: any;
  flags = {
    createFlag: '',
    editFlag: '',
    readFlag: '',
    deleteFlag: '',
    exportFlag: '',
    importFlag: '',
    forSelf:''
  }
  data: any = [];

  constructor(private commService: CommonService, private excelService: ExcelService, private toastService: ToastrService, private router: Router, private empAttnService: EmpAttendanceService) {
    this.fileUploadForm = new FormGroup({
      fileName: new FormControl("")
    });

    this.fileUploadFormAssignShift = new FormGroup({
      fileName: new FormControl(null)
    });

    this.moduleList = JSON.parse(sessionStorage.getItem("moduleList"));
    if (this.moduleList) {
      this.moduleList.map((e) => {
        if (e.moduleGroup == 'Shift Management' && e.moduleName == 'Shift Roster') {
          this.moduleid = e.moduleId;
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



  }

  weekList: any = [];
  ngOnInit() {
    this.getAllAttenList();
    this.weekList = this.startAndEndOfWeek(new Date());
    //  alert(JSON.stringify(this.weekList))
    this.getAttenDataByDate(this.commService.dateFormat(this.weekList[0].date), this.commService.dateFormat(this.weekList[6].date))
  }

  nextWeek(list: any) {
    this.weekList = this.startAndEndOfWeek(list[6].date);
    this.getAttenDataByDate(this.commService.dateFormat(this.weekList[0].date), this.commService.dateFormat(this.weekList[6].date))
  }

  previousWeek(list: any) {
    let dte = new Date(list[0].date);
    dte.setDate(dte.getDate() - 2);
    this.weekList = this.startAndEndOfWeek(dte);
    this.getAttenDataByDate(this.commService.dateFormat(this.weekList[0].date), this.commService.dateFormat(this.weekList[6].date))
  }

  currentWeek() {
    this.weekList = this.startAndEndOfWeek(new Date());
    this.getAttenDataByDate(this.commService.dateFormat(this.weekList[0].date), this.commService.dateFormat(this.weekList[6].date))
  }

  startAndEndOfWeek(date) {
    var now = date ? new Date(date) : new Date();
    now.setHours(0, 0, 0, 0);
    return Array(7).fill('').map((_, i) => {
      var monday = new Date(now);
      monday.setDate(monday.getDate() - monday.getDay() + (i + 1));
      const day = monday.toDateString().split(' ')[0];
      const month = monday.getMonth() + 1;
      const date = monday.getDate();
      const year = monday.getFullYear();
      return { day: day, date: monday };
      // return {day + ' ' + month + '-' + date};
    });
  }


  getAllAttenList() {
    // alert(sessionStorage.getItem("company"))
    let list: any = JSON.parse(sessionStorage.getItem("company"));
    var l: any = [];
    // alert(list.length)
    for (var i = 0; i < list.length; i++) {

      //  if(list[i]!=','){
      l.push(Number(list[i]));
      //}
    }

    this.empAttnService.getAllAttenList(l).subscribe(success => {
      this.attenList = success;

      this.onFilterChange();
      this.filtered = Array(this.attenList.length).fill(0).map((x, i) => (
        {
          oldempid: this.attenList[i].oldempid,
          empcode: this.attenList[i].empcode,
          companyname: this.attenList[i].companyname,
          empId: this.attenList[i].empId,
          empname: this.attenList[i].empname,
          dateFrom: this.attenList[i].dateFrom,
          dateTo: this.attenList[i].dateTo,
          shiftname: this.attenList[i].shiftname

        }));


    });
  }

  onFilterChange() {
    this.filtered = this.attenList.filter((data) => this.isMatch(data));
  }

  isMatch(item) {
    if (item instanceof Object) {
      return Object.keys(item).some((k) => this.isMatch(item[k]));
    } else {
      return item ? item.toString().indexOf(this.filterString) > -1 : null;
    }
  }

  getDataUsingRedioBtn(data) {
    this.empId = data.empId;
  }

  add() {
    this.router.navigate(['/views/transaction/emp-attendance/emp-attendance'], { queryParams: { moduleid: this.moduleid } });
  }
  edit() {
    if (this.empId) {
      this.router.navigate(['/views/transaction/emp-attendance/emp-attendance'], { queryParams: { id: this.empId, fromdate:this.fromDate, moduleid: this.moduleid } });
    }
  }
  view() {
    if (this.empId) {
      this.router.navigate(['/views/transaction/emp-attendance/emp-attendance'], { queryParams: { id: this.empId, fromdate:this.fromDate, view: true, moduleid: this.moduleid } });
    }
  }
  delete() { }


  fileUploadFun(event) {

    if (this.file.name) {
      this.empAttnService.uploadFileAttendance(this.formData).subscribe(s => {
        var data: any = s;
        this.file = null;
        this.formData = null;
        this.getAllAttenList();
        this.toastService.showToast('success', data.message);
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

  }

  selectTableRow(data) {

    if (!this.selectRadioBtn && data) {
      this.router.navigate(['/views/transaction/emp-attendance/emp-attendance'], { queryParams: { id: data.empId } });
    }
  }


  fileUpload1(event, tab) {
    console.log(event);
    // this.formData.append('fileinfo', tab);
    if (this.file.name) {
      this.empAttnService.uploadCsvFileAssignShift(this.formData).subscribe(s => {
        var data: any = s;
        this.file = null;
        this.formData = null;
        this.toastService.showToast('success', data.message);
        this.getAllAttenList();
      });
    } else {
    }
  }

  sampleFileFormat() {
    this.excelService.exportAsExcelFile(IMPORT_FORMAT_SHIFT_ROSTER, "Excel_Format_Shift");
  }

  exportList: any = [];
  exportData() {

    let list: any = JSON.parse(sessionStorage.getItem("company"));
    var l: any = [];
    for (var i = 0; i < list.length; i++) {
      l.push(Number(list[i]));
    }

    let fromdate = this.commService.dateFormat(this.weekList[0].date);

    this.empAttnService.exportShiftRoasterFormat(fromdate, l).subscribe(data => {
      this.exportList = data;
      let exportDataList = Array(this.exportList.length).fill(0).map((x, i) => (
        {
          "From Date": this.exportList[i].dateFrom,
          "To Date": this.exportList[i].dateTo,
          "Employee ID": this.exportList[i].oldempid,
          "Biometrics ID": this.exportList[i].bioId,
          "Shift Code": this.exportList[i].shiftcode,
        }));

      this.excelService.exportAsExcelFile(exportDataList, "Excel_Format_Shift");

    })

  }



  sampleFileFormatAttendance() {
    this.excelService.exportAsExcelFile(IMPORT_FORMAT_EMPLOYEE_ATTENDANCE, 'Employee_Attendance_Import_Format')
  }

  getAttenDataByDate(stdate, endate) {
    let list: any = JSON.parse(sessionStorage.getItem("company"));
    var l: any = [];
    for (var i = 0; i < list.length; i++) {
      l.push(Number(list[i]));
    }
    this.data = {};
    this.empAttnService.getByDateDatatable(stdate, endate, l).subscribe(data => {
        this.data = data;
      });
  }


  //============================================ Datatable


  // getAttenDataByDate(stdate, endate) {
  //   let list: any = JSON.parse(sessionStorage.getItem("company"));
  //   var l: any = [];
  //   for (var i = 0; i < list.length; i++) {
  //     l.push(Number(list[i]));
  //   }
  //    this.empAttnService.datatable().subscribe(s => {
  //    this.data = s;

  //    });
  //   this.data = {
  //     "recordsFiltered": false,
  //     "recordsTotal": 105,
  //     "data": [{
  //       "empname": "11-11-Gaurav R. Taneja",
  //       "empId": 121,
  //       "shiftruleId":39,
  //       "attnDate_1": "2021-12-20T00:00:00",
  //       "shiftname_1": "Glaxm - Infotech 07:00-19:00",
  //       "attnDate_2": "2021-12-21T00:00:00",
  //       "shiftname_2": "Glaxm - Infotech 07:00-19:00",
  //       "attnDate_3": "2021-12-22T00:00:00",
  //       "shiftname_3": "Glaxm - Infotech 07:00-19:00",
  //       "attnDate_4": "2021-12-20T00:00:00",
  //       "shiftname_4": "Glaxm - Infotech 07:00-19:00",
  //       "attnDate_5": "2021-12-21T00:00:00",
  //       "shiftname_5": "Glaxm - Infotech 07:00-19:00",
  //       "attnDate_6": "2021-12-22T00:00:00",
  //       "shiftname_6": "Glaxm - Infotech 07:00-19:00",
  //       "attnDate_7": "2021-12-22T00:00:00",
  //       "shiftname_7": "Glaxm - Infotech 07:00-19:00"
  //     }]
  //   };


  // }


  search(data) {
  //  alert(data);
   let list: any = JSON.parse(sessionStorage.getItem("company"));
    var l: any = [];
    for (var i = 0; i < list.length; i++) {
      l.push(Number(list[i]));
    }

    this.data = {};
    this.empAttnService.getByDateSearch(this.commService.dateFormat(this.weekList[0].date), this.commService.dateFormat(this.weekList[6].date), l,data).subscribe(data => {
      this.data = data;
    });

  }

  getRows(data) {
    this.empId=data.employeeId;
    this.fromDate = data.attnDate_1;
    if (data.key == "") {

    } else {
      this.edit();
    }
  }


}