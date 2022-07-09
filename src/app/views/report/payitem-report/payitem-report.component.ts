import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { environment } from 'src/environments/environment';
import { CommonService } from '../../services/common.service';
import { ExcelService } from '../../services/excel.service';
import { ReportService } from '../report.service';

@Component({
  selector: 'app-payitem-report',
  templateUrl: './payitem-report.component.html',
  styleUrls: ['./payitem-report.component.scss']
})
export class PayitemReportComponent implements OnInit {

  filterForm: any;
  enableFilter: boolean = false;
  empList: any = [];
  exportList: any = [];
  payitemList: any = [];
  companyList: any = [];
  btnLoader: boolean;
  filterString = "";
  filtered;
  items = [];
  public myDatePickerOptions = this.commonService.datepickerFormat;
  submitted = false;

  moduleid:any;
  moduleList: any = [];
  flags = {
    createFlag: '',
    editFlag: '',
    readFlag: '',
    deleteFlag: ''
  }
  leaveReportSummaryList: any = [];
  leavehistoryform: any;
  constructor(public excelService: ExcelService, private reportService: ReportService,
    private commonService: CommonService) {

    this.leavehistoryform = new FormGroup({
      company: new FormControl(null),
      employee: new FormControl(null),
      ltype: new FormControl(null),
      startDate1: new FormControl(null),
      endDate1: new FormControl(null),
      empId: new FormControl(null),
      stdate: new FormControl(null),
      endate: new FormControl(null),
      payitem: new FormControl(null)
    });

  }

  ngOnInit() {

    this.moduleList = JSON.parse(sessionStorage.getItem("moduleList"));
    if (this.moduleList) {
      this.moduleList.map((e) => {
        if (e.moduleGroup == 'Report' && e.moduleName == 'Employee Attendance Report') {
          this.moduleid = e.moduleId;
          this.flags = { 'createFlag': e.createFlag, 'editFlag': e.editFlag, 'readFlag': e.readFlag, 'deleteFlag': e.deleteFlag };
        }
      });
    }
    this.getAllComapny();
    this.getAllPayitems();

  }

  getAllPayitems() {

    this.reportService.getAllPayitemsforPaytrans().subscribe(success => {
      var data: any = success;
      this.payitemList = data.data;
      // this.payitemList = success;
    })

  }



  getEmpList(l) {
    this.reportService.getEmpList(this.moduleid,l).subscribe(data => {
      this.empList = data;
      if (this.flags.readFlag == 'Y' && this.empList.length == 1) {
        this.selectedEmpList = [{ 'employeeId': this.empList[0].employeeId, 'displayName': this.empList[0].displayName }]
      }
    });
  }

  getAllComapny() {
    this.reportService.getAllComapny().subscribe(success => {

      this.companyList = success;
      if (this.companyList) {

        let list: any = JSON.parse(sessionStorage.getItem("company"));
        var l: any = [];
        if(list){
        for (var i = 0; i < list.length; i++) {
          l.push(Number(list[i]));
        }}
        this.companyList = this.companyList.filter(o1 => l.some(o2 => o1.companyId === o2));
      }
    });
  }

  changeStartDate(event) {
    this.leavehistoryform.get('stdate').setValue(this.commonService.dateFormat(event.singleDate.jsDate));

  }
  changeEndDate(event) {
    this.leavehistoryform.get('endate').setValue(this.commonService.dateFormat(event.singleDate.jsDate));

  }

  setEmpList(list) {
    let elm: any = [];
    list.forEach(element => {
      elm.push(element.employeeId);
    });
    let unique = [...new Set(elm)];
    return unique;
  }

  setLTypeList(list) {
    let elm: any = [];
    list.forEach(element => {
      elm.push(element.xLeaveitemId);
    });
    let unique = [...new Set(elm)];
    return unique;
  }


  filterTable() {

    let empIdList: any;
    let ltypeList: any;

    if (this.selectedEmpList.length > 0) {
      empIdList = this.setEmpList(this.selectedEmpList);
    } else {
      empIdList = [];
    }

    if (this.selectecdLeaveTypeList.length > 0) {
      ltypeList = this.setLTypeList(this.selectecdLeaveTypeList);
    } else {
      ltypeList = [];
    }

    this.submitted = true;
    if (this.leavehistoryform.invalid) {
      return;
    } else {
      let data = { 'empId': empIdList, 'transType': [Number(this.leavehistoryform.value.payitem)] }


      this.getPayitemReportSummary(data, this.leavehistoryform.value.stdate, this.leavehistoryform.value.endate);

      // this.exportData(data,this.leavehistoryform.value.stdate,this.leavehistoryform.value.endate);

    }


  }

  getPayitemReportSummary(data, stdate, endate) {
    // this.exportData(data,stdate,endate);
    this.reportService.getPayitemReportSummary(data, stdate, endate).subscribe(data => {
      this.leaveReportSummaryList = data;
      if (this.leaveReportSummaryList) {
        this.onFilterChange();
        this.filtered = Array(this.leaveReportSummaryList.length).fill(0).map((x, i) => (
          {
            companyName: this.leaveReportSummaryList[i].companyName,
            oldEmpId: this.leaveReportSummaryList[i].oldEmpId,
            empname: this.leaveReportSummaryList[i].empname,
            empcode:this.leaveReportSummaryList[i].empcode,
            payitemname: this.leaveReportSummaryList[i].payitemname,
            effectivedate: this.leaveReportSummaryList[i].effectivedate,
            amount: this.leaveReportSummaryList[i].amount,
            lPaytransactionId: this.leaveReportSummaryList[i].lPaytransactionId
          }));

      }

    });

  }

  exportData(data, stdate, endate) {
    this.reportService.getExportEmpLeaveReport(data, stdate, endate).subscribe(data => {
      this.exportList = data;
    })
  }

  exportReport() {
    let title = "Pay_Transaction_Report";
    let list = this.leaveReportSummaryList;
    if (list) {
      let exportList = Array(list.length).fill(0).map((x, i) => (
        {
          "Company": list[i].companyName,
          "Employee ID": list[i].oldEmpId,
          "Employee": list[i].empname,
          "Pay Items": list[i].payitemname,
          "Effective Date": list[i].effectivedate,
          "Amount": list[i].amount
        }));

      this.excelService.exportAsExcelFile(exportList, title);
    }
  }

  changeCompany(id) {
    let list = [Number(id)];
    this.getEmpList(list);

  }



  get f() { return this.leavehistoryform.controls; }

  onFilterChange() {
    this.filtered = this.selectecdLeaveTypeList.filter((data) => this.isMatch(data));
  }

  isMatch(item) {
    if (item instanceof Object) {
      return Object.keys(item).some((k) => this.isMatch(item[k]));
    } else {
      return item ? item.toString().indexOf(this.filterString) > -1 : null;
    }
  }


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


  //////////////////////
  selectecdLeaveTypeList = [];
  dropdownSettingsleavetype: IDropdownSettings = {
    singleSelection: false,
    idField: 'xLeaveitemId',
    textField: 'name',
    selectAllText: 'Select All',
    unSelectAllText: 'UnSelect All',
    itemsShowLimit: 3,
    allowSearchFilter: true
  };

  onLeaveTypeSelect(item: any) {
    this.selectecdLeaveTypeList.push(item);
  }

  onLeaveTypeDeSelect(items: any) {
    this.selectecdLeaveTypeList = this.selectecdLeaveTypeList.filter(item => item.xLeaveitemId !== items.xLeaveitemId);
  }

  onSelectAllLeaveType(items: any) {
    this.selectecdLeaveTypeList = [];
    this.selectecdLeaveTypeList.push(...[items]);
  }

  onDeSelectAllLeaveType(items: any) {
    this.changeComapny(items);
  }

  print(data) {
    window.open(environment.ADVANCE_PAY_TRANS_FORM + data.lPaytransactionId)
  }


}
