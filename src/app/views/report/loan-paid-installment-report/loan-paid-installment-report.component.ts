import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { environment } from 'src/environments/environment';
import { CommonService } from '../../services/common.service';
import { ExcelService } from '../../services/excel.service';
import { ReportService } from '../report.service';

@Component({
  selector: 'app-loan-paid-installment-report',
  templateUrl: './loan-paid-installment-report.component.html',
  styleUrls: ['./loan-paid-installment-report.component.scss']
})
export class LoanPaidInstallmentReportComponent implements OnInit {

 
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
  loanReportSummaryList: any = [];
  loanhistoryform: any;
  loanLineList: any = [];

  monthList: any = [{ id: 'JAN', value: 'JAN' }, { id: 'FEB', value: 'FEB' }, { id: 'MAR', value: 'MAR' }, { id: 'APR', value: 'APR' }, { id: 'MAY', value: 'MAY' }, { id: 'JUN', value: 'JUN' },
  { id: 'JUL', value: 'JUL' }, { id: 'AUG', value: 'AUG' }, { id: 'SEP', value: 'SEP' }, { id: 'OCT', value: 'OCT' }, { id: 'NOV', value: 'NOV' }, { id: 'DEC', value: 'DEC' }];

  constructor(public excelService: ExcelService, private reportService: ReportService,
    private commonService: CommonService) {

    this.loanhistoryform = new FormGroup({
      company: new FormControl(null),
      employee: new FormControl(null),
      ltype: new FormControl(null),
      startDate1: new FormControl(null),
      endDate1: new FormControl(null),
      empId: new FormControl(null),
      stdate: new FormControl(null),
      endate: new FormControl(null),
      payitem: new FormControl(null),
      month:new FormControl(null)
    });

  }

  ngOnInit() {

    this.moduleList = JSON.parse(sessionStorage.getItem("moduleList"));
    if (this.moduleList) {
      this.moduleList.map((e) => {
        if (e.moduleGroup == 'Report' && e.moduleName == 'Loan/Advance Paid Installment Report') {
          this.moduleid = e.moduleId;
          this.flags = { 'createFlag': e.createFlag, 'editFlag': e.editFlag, 'readFlag': e.readFlag, 'deleteFlag': e.deleteFlag };
        }
      });
    }
    this.getAllComapny();
    this.getAllPayitems();

  }

  getAllPayitems() {

    this.reportService.getAllPayitems().subscribe(success => {
      var s: any = success;
      this.payitemList = s.data;
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
        if (list) {
          for (var i = 0; i < list.length; i++) {
            l.push(Number(list[i]));
          }
        }
        this.companyList = this.companyList.filter(o1 => l.some(o2 => o1.companyId === o2));
      }
    });
  }

  changeStartDate(event) {
    this.loanhistoryform.get('stdate').setValue(this.commonService.dateFormat(event.singleDate.jsDate));

  }
  changeEndDate(event) {
    this.loanhistoryform.get('endate').setValue(this.commonService.dateFormat(event.singleDate.jsDate));

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
    if (this.loanhistoryform.invalid) {
      return;
    } else {
      let data = { 'empId': empIdList, 'transType': [Number(this.loanhistoryform.value.payitem)] }


      this.getLoanInstallementReportSummary(data, this.loanhistoryform.value.stdate, this.loanhistoryform.value.endate);


    }


  }

  getLoanInstallementReportSummary(data, stdate, endate) {
    this.reportService.getLoanInstallementReportSummary(data, stdate, endate).subscribe(data => {
      this.loanReportSummaryList = data;
      if (this.loanReportSummaryList) {
        this.onFilterChange();
        this.filtered = Array(this.loanReportSummaryList.length).fill(0).map((x, i) => (
          {
            companyName: this.loanReportSummaryList[i].companyName,
            oldEmpId: this.loanReportSummaryList[i].oldEmpId,
            empname: this.loanReportSummaryList[i].empname,
            payitemname: this.loanReportSummaryList[i].payitemname,
            loandate: this.loanReportSummaryList[i].loandate,
            ipaymentdate: this.loanReportSummaryList[i].ipaymentdate,
            ipaidDate: this.loanReportSummaryList[i].ipaidDate,
            loanamount: this.loanReportSummaryList[i].loanamount,
            installmentamount: this.loanReportSummaryList[i].installmentamount,
            paidinstallmentamt: this.loanReportSummaryList[i].paidinstallmentamt,
            paymentdetails: this.loanReportSummaryList[i].paymentdetails,
            empcode:this.loanReportSummaryList[i].empcode
          }));
      }

    });



  }

  // exportData(data, stdate, endate) {
  //   this.reportService.getExportEmpLeaveReport(data, stdate, endate).subscribe(data => {
  //     this.exportList = data;
  //   })
  // }

  getLoanLinesById(id) {
    this.reportService.getLoanLinesById(id).subscribe(s => {
      this.loanLineList = s;
    })
  }


  exportReport() {
    let title = "Loan_Advance_Paid_Installment _Report";
    let list = this.loanReportSummaryList;
    if (list) {
      let exportList = Array(list.length).fill(0).map((x, i) => (
        {
           "Company Name": this.loanReportSummaryList[i].companyName,
            "Emp. ID": this.loanReportSummaryList[i].oldEmpId,
            "Employee Name": this.loanReportSummaryList[i].empname,
            "Payitem": this.loanReportSummaryList[i].payitemname,
            "Loan Date": this.loanReportSummaryList[i].loandate,
            "Installment Date": this.loanReportSummaryList[i].ipaymentdate,
            // "Paid Date": this.loanReportSummaryList[i].ipaidDate, // Processing Date
            "Loan Amount": this.loanReportSummaryList[i].loanamount,
            "Installment Amount": this.loanReportSummaryList[i].installmentamount,
            "Paid Amount": this.loanReportSummaryList[i].paidinstallmentamt,
            "Payment Details": this.loanReportSummaryList[i].paymentdetails
        }));

      this.excelService.exportAsExcelFile(exportList, title);
    }
  }

  changeCompany(id) {
    let list = [Number(id)];
    this.getEmpList(list);
  }

  get f() { return this.loanhistoryform.controls; }

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
  //  window.open(environment.ADVANCE_PAY_TRANS_FORM + data.lPaytransactionId)
  }

  getSummaryDetails(data) {
    this.getLoanLinesById(data.lEmploanId);
  }





}
