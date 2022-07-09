import { Component, OnInit } from '@angular/core';
import { ReportService } from '../report.service';

import { FormGroup, Validators, FormControl } from '@angular/forms';
import { CommonService, GeneralListCode, IMPORT_FORMAT_EMPLOYEE_ATTENDANCE } from '../../services/common.service';
import { IMyDateModel } from 'angular-mydatepicker';
import { ActivatedRoute, Router } from '@angular/router';
import { ExcelService } from '../../services/excel.service';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import Swal from 'sweetalert2';
import { ToastrService } from '../../services/toastr.service';


@Component({
  selector: 'app-emp-attendance-report',
  templateUrl: './emp-attendance-report.component.html',
  styleUrls: ['./emp-attendance-report.component.scss']
})
export class EmpAttendanceReportComponent implements OnInit {
  attenList: any = [];
  filterForm: any;
  enableFilter: boolean = false;
  empList: any = [];
  tempList: any = [];
  companyList: any = [];
  codeList: any = [];
  exportList: any = [];
  btnLoader: boolean;
  departmentid: any;
  com_id: any;
  emp_id: any;
  emp_code: any;
  st_date: any;
  en_date: any;
  is_redirect: any;
  totalBreakTime: any;
  totalTime: any;
  totalOverTime: any;
  filterString = "";
  filtered;
  items = [];
  statusList: any = [];
  sponsorTypeList: any = [];
  status: any;
  spontype: any;
  ismanual: any;
  public myDatePickerOptions = this.commonService.datepickerFormat;
  filterObj = {
    employeeId: null,
    empCode: null,
    oldEmpId: null,
    companyId: null,
    startDate1: null,
    stdate: null,
    endDate1: null,
    endate: null,
    deptId: null,
    status: null,
    sponsortype: null,
    ismanual: null
  };

  moduleid:any;
  moduleList: any = [];
  flags = {
    createFlag: '',
    editFlag: '',
    readFlag: '',
    deleteFlag: '',
    exportFlag:'',
    importFlag:''
  }

  fileUploadForm: FormGroup;

  constructor(public excelService: ExcelService, public activatedRoute: ActivatedRoute, public router: Router, private reportService: ReportService, private toastService: ToastrService, private commonService: CommonService) {

    this.activatedRoute.queryParams.subscribe(data => {
     
      if (data.com_id) { this.changeCompany(data.com_id); }

      if (data.comp_list) {
        let list: any = [];
        for (var i = 0; i < data.comp_list.length; i++) {
          list[i] = Number(data.comp_list[i]);
        }

        // alert(JSON.stringify(list));

        if (list.length > 0) {
          let listCompany: any = JSON.parse(sessionStorage.getItem("company"));
        }

      }
        this.com_id = data.com_id,
        this.tempList = data.emp_list,
        this.emp_id = data.emp_id,
        this.emp_code = data.emp_code,
        this.st_date = data.st_date,
        this.en_date = data.en_date,
        this.is_redirect = data.is_redirect,
        this.departmentid = data.departmentid,
        this.status = data.status,
        this.spontype = data.spontype;

    });

    this.fileUploadForm = new FormGroup({
      fileName: new FormControl("")
    });

  }

  ngOnInit() {

    this.moduleList = JSON.parse(sessionStorage.getItem("moduleList"));
    if (this.moduleList) {
      this.moduleList.map((e) => {
        if (e.moduleGroup == 'Report' && e.moduleName == 'Employee Attendance Report') {
          this.moduleid = e.moduleId;
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
      // alert(JSON.stringify(this.flags))
    }

    // this.getEmpList();
    this.getAllComapny();
    // this.getDepartmentList();
    this.getStatusList();
    //  this.getSponsorTypeList();

    if (this.is_redirect == 1) {
      this.filterObj.employeeId = this.emp_id;
      this.filterObj.empCode = this.emp_code;
      this.filterObj.companyId = this.com_id;
      this.selectecdCompanyList = this.companyList;
      this.filterObj.deptId = this.departmentid;
      let startDate: Date = new Date(this.st_date);
      let fromModel: IMyDateModel = { isRange: false, singleDate: { jsDate: startDate }, dateRange: null };
      this.filterObj.startDate1 = fromModel;

      this.changeStartDate(fromModel);
      let endDate: Date = new Date(this.en_date);
      let endModel: IMyDateModel = { isRange: false, singleDate: { jsDate: endDate }, dateRange: null };
      this.filterObj.endDate1 = endModel;
      this.changeEndDate(endModel);

      this.filterObj.status = this.status;
      this.filterObj.sponsortype = this.spontype;
      this.filterTable1();

    } else {
      this.getAllEmpAttendance();

      let stdate: Date = new Date(new Date());
      let fromModel1: IMyDateModel = { isRange: false, singleDate: { jsDate: stdate }, dateRange: null };

      this.filterObj.startDate1 = fromModel1;
      this.changeStartDate(fromModel1);

      let endate: Date = new Date(new Date());
      let fromModel2: IMyDateModel = { isRange: false, singleDate: { jsDate: endate }, dateRange: null };

      this.filterObj.endDate1 = fromModel2;
      this.changeEndDate(fromModel2);
      let list: any = JSON.parse(sessionStorage.getItem("company"));
      var l: any = [];
      if(list){
      for (var i = 0; i < list.length; i++) {

        // if(list[i]!=','){
        l.push(Number(list[i]));
        // }
      }}

      this.filterObj.companyId = l[l.length - 1]
      //  this.changeCompany(l[l.length-1])
    }

  }

  getStatusList() {
    this.reportService.getStatusList().subscribe(success => {
      this.statusList = success;

    })
  }

  getSponsorTypeList(l) {
    this.reportService.getSponsorTypeList(l).subscribe(success => {
      this.sponsorTypeList = success;
    })

  }

  getAllEmpAttendance() {
    this.reportService.getAllEmpAttendance().subscribe(s => {
      this.attenList = s;
      //   alert(this.totalBreakTime +" -- "+this.totalTime+" -- "+this.totalOverTime)

    })
  }

  getEmpList(l) {

    this.reportService.getEmpList(this.moduleid,l).subscribe(data => {
      this.empList = data;
      if (this.flags.readFlag == 'Y' && this.empList.length == 1) {
        this.selectedEmpList = [{ 'employeeId': this.empList[0].employeeId, 'displayName': this.empList[0].displayName }]
      }
      this.codeList = data;
    });
  }

  getAllComapny() {
    this.reportService.getAllComapny().subscribe(success => {

      this.companyList = success;
      debugger;
      if(this.companyList.length==1){
        this.selectecdCompanyList = [{"companyId":this.companyList[0].companyId ,"companyName":this.companyList[0].companyName}];//this.selectecdCompanyList.filter(item => item.companyId !== this.companyList[0].companyId);
        this.changeComapny(this.selectecdCompanyList);
      }
      // if (this.companyList) {

      //   let list: any = JSON.parse(sessionStorage.getItem("company"));
      //   var l: any = [];
      //   if(list){
      //   for (var i = 0; i < list.length; i++) {
         
      //     l.push(Number(list[i]));
         
      //   }}
      //   this.companyList = this.companyList.filter(o1 => l.some(o2 => o1.companyId === o2));
      //   if (this.is_redirect != 1) { this.filterObj.companyId = this.companyList[0].companyId; }


     // }
    });
  }

  changeStartDate(event) {

    this.filterObj.stdate = this.commonService.dateFormat(event.singleDate.jsDate);
  }
  changeEndDate(event) {

    this.filterObj.endate = this.commonService.dateFormat(event.singleDate.jsDate);
  }

  setEmpList(list) {
    let elm: any = [];
    list.forEach(element => {
      elm.push(element.employeeId);
    });
    let unique = [...new Set(elm)];
    return unique;
  }

  setShiftList(list) {
    let elm: any = [];
    list.forEach(element => {
      elm.push(element.shiftRuleId);
    });
    let unique = [...new Set(elm)];
    return unique;
  }


  filterTable() {

    let empIdList: any;
    if (this.selectedEmpList.length > 0) {
      empIdList = this.setEmpList(this.selectedEmpList);
    } else {
      empIdList = [];
    }

    
    let shiftList: any;
    if (this.selectedShiftRuleList.length > 0) {
      shiftList = this.setShiftList(this.selectedShiftRuleList);
    } else {
      shiftList = [];
    }
    this.tempList = empIdList;
    let empId = empIdList;
    let shift = shiftList;
    let code = this.filterObj.deptId ? Number(this.filterObj.deptId) : 0;
    let comId = this.filterObj.companyId ? Number(this.filterObj.companyId) : 0;
    let stdate = this.filterObj.stdate ? this.filterObj.stdate : null;
    let endate = this.filterObj.endate ? this.filterObj.endate : null;
    let status = this.filterObj.status ? this.filterObj.status : null;
    let sponType = this.filterObj.sponsortype ? Number(this.filterObj.sponsortype) : 0;
    this.btnLoader = true;
    this.exportDataList(comId, code, empId, stdate, endate, status, sponType,shift);
    this.reportSummary(comId, code, empId, stdate, endate, sponType,shift);
    this.reportService.getAttendanceByFilter(comId, code, empId, stdate, endate, status, sponType,shift).subscribe(s => {
      this.attenList = null;
      this.attenList = s;
      this.btnLoader = false;

      if (this.attenList.length > 0) {
        this.totalBreakTime = s[0].totalBreakTime;
        this.totalTime = s[0].totalTime;
        this.totalOverTime = s[0].totalOverTime;
      }


      this.onFilterChange();
      this.filtered = Array(this.attenList.length).fill(0).map((x, i) => (
        {
          employeeId: this.attenList[i].employeeId,
          name: this.attenList[i].name,
          oTapplicable: this.attenList[i].oTapplicable,
          shiftName: this.attenList[i].shiftName,
          workingHrs: this.attenList[i].workingHrs,
          bioId: this.attenList[i].bioId,
          extrapayAmount: this.attenList[i].extrapayAmount,
          extrapayHrs: this.attenList[i].extrapayHrs,
          dateAttendance: this.attenList[i].dateAttendance,
          startTime: this.attenList[i].startTime,
          breakStart: this.attenList[i].breakStart,
          breakEnd: this.attenList[i].breakEnd,
          totbrkTime: this.attenList[i].totbrkTime,

          endTime: this.attenList[i].endTime,
          tottimewithoutBrk: this.attenList[i].tottimewithoutBrk,
          overTime: this.attenList[i].overTime,
          empAttendanceLineId: this.attenList[i].empAttendanceLineId,
          oldEmpId: this.attenList[i].oldEmpId,
          status: this.attenList[i].status,
          holdingId: this.attenList[i].holdingId,
          empAttnId: this.attenList[i].empAttnId,
          empcode: this.attenList[i].empcode,
          companyId: this.attenList[i].companyId,
          shiftruleId: this.attenList[i].shiftruleId,
          rowColor: this.attenList[i].rowColor
        }));

    }, error => { this.btnLoader = false; console.log('oops', error); });


  }

  recallFun() {

    let list = this.setEmpList(this.selectedEmpList);

    // if (list.length == 1) {
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'ReCalculated'
      }).then((result) => {
        if (result.isConfirmed) {
          // Swal.fire(
          //   'ReCalculated',
          //   '',
          //   'success'
          // );
          // this.recalculate();



          // ==========================================================

    let empIdList: any;
    if (this.selectedEmpList.length > 0) {
      empIdList = this.setEmpList(this.selectedEmpList);
    } else {
      empIdList = [];
    }

    let shiftList: any;
    if (this.selectedShiftRuleList.length > 0) {
      shiftList = this.setShiftList(this.selectedShiftRuleList);
    } else {
      shiftList = [];
    }

    this.tempList = empIdList;
    let empId = empIdList;
    let shift = shiftList;
    let deptId = this.filterObj.deptId ? Number(this.filterObj.deptId) : 0;
    let comId = this.filterObj.companyId ? Number(this.filterObj.companyId) : 0;
    let stdate = this.filterObj.stdate ? this.filterObj.stdate : null;
    let endate = this.filterObj.endate ? this.filterObj.endate : null;
    let status = this.filterObj.status ? this.filterObj.status : null;
    let sponType = this.filterObj.sponsortype ? Number(this.filterObj.sponsortype) : 0;
    let ismanual = this.ismanual ? this.filterObj.ismanual = "Y" : this.filterObj.ismanual = "N";
    this.btnLoader = true;

    this.reportService.reProcessManually(comId, deptId, empId, stdate, endate, status, sponType, ismanual,shift).subscribe(s => {
      this.attenList = null;
      this.attenList = s;
      this.btnLoader = false;

      var data:any = s;

      Swal.fire(
            data.message,
            '',
            'success'
          );

      if (this.attenList.length > 0) {
        this.totalBreakTime = s[0].totalBreakTime;
        this.totalTime = s[0].totalTime;
        this.totalOverTime = s[0].totalOverTime;
      }
    },error=>{
      this.btnLoader = false;
    });


          //===============================================================
        }

      })
    // } else {
    //   this.toastService.showToast('danger', "Single employee required.");
    // }
  }

  recalculate() {

    let empIdList: any;
    if (this.selectedEmpList.length > 0) {
      empIdList = this.setEmpList(this.selectedEmpList);
    } else {
      empIdList = [];
    }

    
    let shiftList: any;
    if (this.selectedShiftRuleList.length > 0) {
      shiftList = this.setShiftList(this.selectedShiftRuleList);
    } else {
      shiftList = [];
    }

    this.tempList = empIdList;
    let empId = empIdList;
    let shift = shiftList;
    let deptId = this.filterObj.deptId ? Number(this.filterObj.deptId) : 0;
    let comId = this.filterObj.companyId ? Number(this.filterObj.companyId) : 0;
    let stdate = this.filterObj.stdate ? this.filterObj.stdate : null;
    let endate = this.filterObj.endate ? this.filterObj.endate : null;
    let status = this.filterObj.status ? this.filterObj.status : null;
    let sponType = this.filterObj.sponsortype ? Number(this.filterObj.sponsortype) : 0;
    let ismanual = this.ismanual ? this.filterObj.ismanual = "Y" : this.filterObj.ismanual = "N";
    this.btnLoader = true;

    this.reportService.reProcessManually(comId, deptId, empId, stdate, endate, status, sponType, ismanual,shift).subscribe(s => {
      this.attenList = null;
      this.attenList = s;
      this.btnLoader = false;

      var data:any = s;

      this.toastService.showToast('success', data.message);

      if (this.attenList.length > 0) {
        this.totalBreakTime = s[0].totalBreakTime;
        this.totalTime = s[0].totalTime;
        this.totalOverTime = s[0].totalOverTime;
      }
    });

  }

  reportSummaryList: any = [];
  reportSummary(comId, code, empId, stdate, endate, sponType,shift) {
    this.reportService.reportSummary(comId, code, empId, stdate, endate, sponType,shift).subscribe(s => {
      this.reportSummaryList = s;
    });
  }

  dptList: any = [];
  getDepartmentList(list) {
    if (list) {
      this.reportService.getDepartmentList(list).subscribe(s => {
        this.dptList = s;
      });
    }

  }



  filterTable1() {

    let list: any = [];
    for (var i = 0; i < this.tempList.length; i++) {
      list[i] = Number(this.tempList[i]);
    }
    if (list.length > 0) {
      let listCompany: any = JSON.parse(sessionStorage.getItem("company"));
      var l: any = [];
      // alert(list.length)
      if(list){
      for (var i = 0; i < listCompany.length; i++) {

        // if(listCompany[i]!=','){
        l.push(Number(listCompany[i]));
        // }
      }}

      this.reportService.getEmpList(this.moduleid,l).subscribe(data => {
        let emplist: any = data;
        this.selectedEmpList = emplist.filter((word) => list.includes(word.employeeId));
      });
    }

    let empId = list;
    let shift=[];
    let code = this.emp_code ? Number(this.emp_code) : 0;
    let comId = this.com_id ? Number(this.com_id) : 0;
    let stdate = this.st_date ? this.st_date : null;
    let endate = this.en_date ? this.en_date : null;
    let departmentid = this.departmentid ? Number(this.departmentid) : 0;
    let status = this.status ? this.status : null;
    let spontype = this.spontype ? Number(this.spontype) : 0;
    this.btnLoader = true;
    this.exportDataList(comId, code, empId, stdate, endate, status, spontype,shift);
    this.reportService.getAttendanceByFilter(comId, departmentid, empId, stdate, endate, status, spontype,shift).subscribe(s => {
      this.attenList = null;
      this.attenList = s;
      this.btnLoader = false;

      if (this.attenList.length > 0) {
        this.totalBreakTime = s[0].totalBreakTime;
        this.totalTime = s[0].totalTime;
        this.totalOverTime = s[0].totalOverTime;
      }

      this.onFilterChange();
      this.filtered = Array(this.attenList.length).fill(0).map((x, i) => (
        {
          employeeId: this.attenList[i].employeeId,
          name: this.attenList[i].name,
          oTapplicable: this.attenList[i].oTapplicable,
          shiftName: this.attenList[i].shiftName,
          workingHrs: this.attenList[i].workingHrs,
          bioId: this.attenList[i].bioId,

          dateAttendance: this.attenList[i].dateAttendance,
          startTime: this.attenList[i].startTime,
          breakStart: this.attenList[i].breakStart,
          breakEnd: this.attenList[i].breakEnd,
          totbrkTime: this.attenList[i].totbrkTime,

          endTime: this.attenList[i].endTime,
          tottimewithoutBrk: this.attenList[i].tottimewithoutBrk,
          overTime: this.attenList[i].overTime,
          empAttendanceLineId: this.attenList[i].empAttendanceLineId,
          oldEmpId: this.attenList[i].oldEmpId,
          status: this.attenList[i].status,
          holdingId: this.attenList[i].holdingId,
          empAttnId: this.attenList[i].empAttnId,
          empcode: this.attenList[i].empcode,
          companyId: this.attenList[i].companyId,
          shiftruleId: this.attenList[i].shiftruleId,
          rowColor: this.attenList[i].rowColor
        }));



    }, error => { this.btnLoader = false; console.log('oops', error); })

  }


  edit(data) {

    this.router.navigate(['/views/report/emp-punch-atendance'], {
      queryParams: {
        empAttendanceLineId: data.empAttendanceLineId,
        dateAttendance: data.dateAttendance,
        employeeId: data.employeeId,
        oldEmpId: data.oldEmpId,
        shiftruleId: data.shiftruleId,
        com_id: data.companyId,
        emp_id: data.employeeId,
        emp_code: data.empcode,
        emp_list: this.tempList,
        comp_list: this.selectecdCompanyList,
        departmentid: this.filterObj.deptId,
        st_date: this.filterObj.stdate,
        en_date: this.filterObj.endate,
        isActive: 'Y',
        empAttnId: data.empAttnId,
        isPresent: 'Y',
        holdingId: data.holdingId,
        shiftname: data.shiftName,
        dateattendance: data.dateAttendance,
        status: this.filterObj.status,
        spontype: this.filterObj.sponsortype,
        bioId: data.bioId,
        is_redirect: 0
      }
    });
  }


  exportDataList(comId, code, empId, stdate, endate, status, sponType,shift) {
    this.reportService.exportDataList(comId, code, empId, stdate, endate, status, sponType,shift).subscribe(s => {
      this.exportList = s;
    });
  }

  exportReport() {
    let title = "Employee_Attendance_Report";


    let exportDataList = Array(this.exportList.length).fill(0).map((x, i) => (
      {
        "Employee ID": this.exportList[i].old_Employee_Id,
        "Old Employee Code": this.exportList[i].employee_Id,
        "Name": this.exportList[i].name,
        "OT Eligibility ": this.exportList[i].oT_Eligibility,
        "Shift Name": this.exportList[i].shift_Name,
        "Shift Hours": this.exportList[i].shift_Hours,
        "Date": this.exportList[i].date,
        "Day": this.exportList[i].day,
        "Time IN": this.exportList[i].time_In,
        "Break Out": this.exportList[i].break_Out,
        "Break In": this.exportList[i].break_In,
        "Time OUT": this.exportList[i].time_Out,
        "Break Time": this.exportList[i].break_Time,
        "Overtime": this.exportList[i].overtime,
        "Total Working Hrs": this.exportList[i].total_Hrs_WorOut_Break,
        "Status": this.exportList[i].status,
        "Overtime (Decimal)": this.exportList[i].decimalOvertime,
        "Extra Pay Hrs.": this.exportList[i].extrapayHrs,
        "Extra Pay Amount": this.exportList[i].extrapayAmount

      }));

    this.excelService.exportAsExcelFile(exportDataList, title);
    this.excelService.exportAsExcelFile(this.reportSummaryList, "AttendanceSummary");

  }

  changeCompany(id) {
    let list = [Number(id)];
    this.getEmpList(list);
    this.getDepartmentList(list);
    this.getSponsorTypeList(list);
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

// ==============================================================================
  selectedEmpList = [];
  dropdownSettings: IDropdownSettings = {
    singleSelection: false,
    idField: 'employeeId',
    textField: 'displayName',
    selectAllText: 'Select All',
    unSelectAllText: 'UnSelect All',
    itemsShowLimit: 5,
    allowSearchFilter: true
  };

  onEmployeeSelect(item: any) {
    this.selectedEmpList.push(item);
  }

  onEmployeeDeSelect(items: any) {
    this.selectedEmpList = this.selectedEmpList.filter(item => item.employeeId !== items.employeeId);
  }

  onSelectAllEmployee(items: any) {
    this.selectedEmpList = [];
    this.selectedEmpList.push(...[items]);
  }
// ==============================================================================


// ==============================================================================
shiftRuleList:any=[];
getshiftRuleListByCompId(list){
    this.reportService.getShiftRuleByCompId(list).subscribe(data=>{
        this.shiftRuleList = data;
    })
}

selectedShiftRuleList = [];
dropdownSettingsShiftRule: IDropdownSettings = {
  singleSelection: false,
  idField: 'shiftRuleId',
  textField: 'name',
  selectAllText: 'Select All',
  unSelectAllText: 'UnSelect All',
  itemsShowLimit: 5,
  allowSearchFilter: true
};

onSelectShiftRule(item: any) {
  this.selectedShiftRuleList.push(item);
}

onDeSelectShiftRule(items: any) {
  this.selectedShiftRuleList = this.selectedShiftRuleList.filter(item => item.shiftRuleId !== items.shiftRuleId);
}

onSelectAllShiftRule(items: any) {
  this.selectedShiftRuleList = [];
  this.selectedShiftRuleList.push(...[items]);
}
// ==============================================================================
  selectecdCompanyList = [];
  dropdownSettingscompany: IDropdownSettings = {
    singleSelection: false,
    idField: 'companyId',
    textField: 'companyName',
    selectAllText: 'Select All',
    unSelectAllText: 'UnSelect All',
    itemsShowLimit: 5,
    allowSearchFilter: true
  };

  onCompanySelect(item: any) {
    this.selectecdCompanyList.push(item);

    this.changeComapny(this.selectecdCompanyList);
  }

  changeComapny(list) {
 
    if (list) {
      let arry = list.map(function (a) { return a.companyId; });
      let a = arry.filter((item, i, ar) => ar.indexOf(item) === i);
      this.getEmpList(a);
      this.getDepartmentList(a);
      this.getSponsorTypeList(a);
      this.getshiftRuleListByCompId(a);
    }
  }

  onCompanyDeSelect(items: any) {
    this.selectecdCompanyList = this.selectecdCompanyList.filter(item => item.companyId !== items.companyId);
    this.changeComapny(this.selectecdCompanyList);
  }

  onSelectAllCompany(items: any) {
    this.selectecdCompanyList = [];
    this.selectecdCompanyList.push(...[items]);
    if (this.selectecdCompanyList) {
      this.changeComapny(items);
    }
  }

  onDeSelectAllCompany(items: any) {
    this.changeComapny(items);
  }

  getSelectedCompList(list){
     if (list) {
        let arry = list.map(function (a) { return a.companyId; });
        let a = arry.filter((item, i, ar) => ar.indexOf(item) === i);
        return a;
      }
      return [];
  }

  selecteSponsorType(sponsorid) {
    if (sponsorid) {
      let compList = this.getSelectedCompList(this.selectecdCompanyList);
      this.reportService.getEmpBySponsorType(this.moduleid,this.filterObj.deptId,sponsorid,compList).subscribe(data => {
        this.empList = data;
      });
    } else {
      if (this.selectecdCompanyList.length > 0) {
        let arry = this.selectecdCompanyList.map(function (a) { return a.companyId; });
        let a = arry.filter((item, i, ar) => ar.indexOf(item) === i);
        this.getEmpList(a);
      }
    }
  }

  selectDept(deptId) {
   
      let compList = this.getSelectedCompList(this.selectecdCompanyList);
      this.reportService.getEmpBySponsorType(this.moduleid,deptId,this.filterObj.sponsortype,compList).subscribe(data => {
        this.empList = data;
      });
   
  }

  // =============================================== UPLOAD FILE

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

  fileUploadFun(event) {
    if (this.file.name) {
      this.reportService.uploadFileAttendance(this.formData).subscribe(s => {
        var data: any = s;
        this.file = null;
        this.formData = null;
       
        this.toastService.showToast('success', data.message);
      });
    } else {

    }
  }

  sampleFileFormatAttendance() {
    this.excelService.exportAsExcelFile(IMPORT_FORMAT_EMPLOYEE_ATTENDANCE, 'Employee_Attendance_Import_Format')
  }

  downloadAttnReportFun(){
    this.reportService.downloadAttnReportFun().subscribe(data=>{
      var d:any = data;
      if (d) {

        var blob = new Blob([d], {type: "application/vnd.ms-excel"});
        var objectUrl = URL.createObjectURL(blob);
        window.open(objectUrl);

        // var byteArray = new Uint8Array(d);
        // console.log(byteArray, byteArray.length);
        // this.downloadFile(byteArray, 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'export.xlsx');
        // this.downloadFile(byteArray, 'application/vnd.ms-excel', 'export.xls');
     }
    })
  }

  downloadFile(blob: any, type: string, filename: string) {

    var binaryData = [];
    binaryData.push(blob);
  
    const url = window.URL.createObjectURL(new Blob(binaryData)); // <-- work with blob directly
 
     // create hidden dom element (so it works in all browsers)
     const a = document.createElement('a');
     a.setAttribute('style', 'display:none;');
     document.body.appendChild(a);
  
     // create file, attach to hidden element and open hidden element
     a.href = url;
     a.download = filename;
     a.click();
  }


  //****************************EMPLOYEE ABSENCE REPORT********************* */

  empAbsenceReport(obj){
    let empId = obj.employeeId;
    let absDt = this.commonService.dateFormat(obj.dateAttendance);
    this.reportService.getempabsencebyDt(empId,absDt).subscribe(success=>{
        var reqObj:any = success;
        if(reqObj.data){
          this.router.navigate(['/views/approval-flow/approvalrequest/add-request'], { queryParams: { id: reqObj.data.g_APPROVALREQ_ID,fromattenreport:"Y" } });
        } else{
              this.router.navigate(['/views/approval-flow/approvalrequest/add-request'], { queryParams: { 
                stdate:obj.dateAttendance,
                endate:obj.dateAttendance,
                employeeid:obj.employeeId,
                punchin:obj.startTime,
                punchout:obj.endTime,
                companyid:obj.companyId,
                requesttype:"EMPABSENCE",
                fromattenreport:"Y"
              } });

        }
    });

    // this.router.navigate(['/views/approval-flow/approvalrequest/add-request'], { queryParams: { 
    //   stdate:obj.dateAttendance,
    //   endate:obj.dateAttendance,
    //   employeeid:obj.employeeId,
    //   punchin:obj.startTime,
    //   punchout:obj.endTime,
    //   companyid:obj.companyId,
    //   requesttype:"EMPABSENCE",
    //   fromattenreport:"Y"
    // } });
  }

  calendarView(){
      this.router.navigate(['/views/report/calendar-view']);
  }

}
