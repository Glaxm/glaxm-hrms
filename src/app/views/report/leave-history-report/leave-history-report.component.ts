import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { IMyDateModel } from 'angular-mydatepicker';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { CommonService } from '../../services/common.service';
import { ExcelService } from '../../services/excel.service';
import { ReportService } from '../report.service';

@Component({
  selector: 'app-leave-history-report',
  templateUrl: './leave-history-report.component.html',
  styleUrls: ['./leave-history-report.component.scss']
})
export class LeaveHistoryReportComponent implements OnInit {

  filterForm: any;
  enableFilter: boolean = false;
  empList: any = [];
  exportList:any =[];
  leaveTypeList:any=[];
  companyList: any = [];
  btnLoader: boolean;
  filterString = "";
  filtered;
  items = [];
  public myDatePickerOptions = this.commonService.datepickerFormat;
  submitted = false;

  moduleid:any;
  moduleList:any=[];
  flags={
    createFlag: '',
    editFlag: '',
    readFlag: '',
    deleteFlag: '',
    exportFlag:'',
    importFlag:''
  }
  leaveReportSummaryList:any =[];
  leavehistoryform:any;
  redirectfromdashboard:any;
  constructor(private activatedRoute:ActivatedRoute,public excelService: ExcelService,  private reportService: ReportService,
     private commonService: CommonService) {

      this.leavehistoryform = new FormGroup({
        company:new FormControl(null),
        employee:new FormControl(null),
        ltype:new FormControl(null),
        startDate1:new FormControl(null),
        endDate1:new FormControl(null),
        empId:new FormControl(null),
        stdate:new FormControl(null),
        endate:new FormControl(null),
        leaveType:new FormControl(null)
      });


      this.activatedRoute.queryParams.subscribe(params => {
       this.redirectfromdashboard = params.redirectfromdashboard;
      });
 
  }

  ngOnInit() {

    this.moduleList = JSON.parse(sessionStorage.getItem("moduleList"));
    if(this.moduleList){
      this.moduleList.map((e)=>{
        if(e.moduleGroup=='Report' && e.moduleName=='Leave History Report'){
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
    }
    // this.getAllComapny();
    this.getAllLeaveType();

    if(this.redirectfromdashboard=="Y"){

      this.reportService.getAllComapny().subscribe(success => {
      
        this.companyList = success;
        if(this.companyList){
  
          let list:any = JSON.parse(sessionStorage.getItem("company"));
          var l:any=[];
          if(list){
          for(var i=0;i<list.length;i++){
              l.push(Number(list[i]));
          }}
        this.companyList = this.companyList.filter(o1 => l.some(o2 => o1.companyId === o2));
        this.selectecdCompanyList = [{'companyId':this.companyList[0].companyId,'companyName':this.companyList[0].companyName}];
        this.changeComapny(this.selectecdCompanyList);
       
      }
      });

    } else{
      this.getAllComapny();
    }

  }

  getAllLeaveType(){
    
    this.reportService.getAllLeaveType().subscribe(success=>{
      this.leaveTypeList = success;
      if(this.redirectfromdashboard=="Y"){
        this.selectecdLeaveTypeList = [{'xLeaveitemId':this.leaveTypeList[0].xLeaveitemId,'name':this.leaveTypeList[0].name}];
        this.selectecdLeaveTypeList.push(...this.leaveTypeList);
       
        this.filterTable();
      }
   })
  
  }

 

  getEmpList(l) {
    this.reportService.getEmpList(this.moduleid,l).subscribe(data => {
      this.empList = data;
      if(this.flags.readFlag=='Y' && this.empList.length==1){
          this.selectedEmpList = [{'employeeId':this.empList[0].employeeId,'displayName':this.empList[0].displayName}]
      }
    });
  }

  getAllComapny() {
    this.reportService.getAllComapny().subscribe(success => {
      
      this.companyList = success;
      if(this.companyList){

        let list:any = JSON.parse(sessionStorage.getItem("company"));
        var l:any=[];
        if(list){
        for(var i=0;i<list.length;i++){
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
    } else{
      let data = {'empId':empIdList,'leaveType':ltypeList }
     

      this.getEmpLeaveReportSummary(data,this.leavehistoryform.value.stdate,this.leavehistoryform.value.endate);

      this.exportData(data,this.leavehistoryform.value.stdate,this.leavehistoryform.value.endate);
      
    }
    

  }

  getEmpLeaveReportSummary(data,stdate,endate){
    this.reportService.getEmpLeaveReportSummary(data,stdate,endate).subscribe(data=>{
      this.leaveReportSummaryList = data;
      if(this.leaveReportSummaryList){
        this.onFilterChange();
        this.filtered = Array(this.leaveReportSummaryList.length).fill(0).map((x, i) => (
          {
            companyName: this.leaveReportSummaryList[i].companyName,
            oldEmpId:this.leaveReportSummaryList[i].oldEmpId,
            empname: this.leaveReportSummaryList[i].empname,
            leaveitemname: this.leaveReportSummaryList[i].leaveitemname,
            leavedays: this.leaveReportSummaryList[i].leavedays,
            startdate: this.leaveReportSummaryList[i].startdate,
            enddate: this.leaveReportSummaryList[i].enddate,
            description: this.leaveReportSummaryList[i].description,
            empcode: this.leaveReportSummaryList[i].empcode,

            balanceleaves: this.leaveReportSummaryList[i].balanceleaves,
            paidLeaveDays: this.leaveReportSummaryList[i].paidLeaveDays,
            encashment: this.leaveReportSummaryList[i].encashment,
            unpaidLeaveDays: this.leaveReportSummaryList[i].unpaidLeaveDays,
            sundaysinLeave: this.leaveReportSummaryList[i].sundaysinLeave,
            saturdaysinLeave: this.leaveReportSummaryList[i].saturdaysinLeave,
            holidaysinLeave: this.leaveReportSummaryList[i].holidaysinLeave,
            lastleavesettledupto: this.leaveReportSummaryList[i].lastleavesettledupto,
            curleavesettledupto: this.leaveReportSummaryList[i].curleavesettledupto,
            opening_leave_balance_for_current_year: this.leaveReportSummaryList[i].opening_leave_balance_for_current_year,
            curLeaveBal: this.leaveReportSummaryList[i].curLeaveBal,
            resumptionDt: this.leaveReportSummaryList[i].resumptionDt,
            lateDays: this.leaveReportSummaryList[i].lateDays

          }));
     
      }
     
  });
    
  }

  exportData(data,stdate,endate){
    this.reportService.getExportEmpLeaveReport(data,stdate,endate).subscribe(data=>{
      this.exportList = data;
  })
  }

  


 

  



  exportReport() {
    let title = "Leave_History_Report";
    let list = this.exportList;
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
          "Certificate provided": list[i].certificate
        }));
    
      this.excelService.exportAsExcelFile(exportList, title);
    }
  }

  changeCompany(id){
    let list=[Number(id)];
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

  changeComapny(list){

      if(list){
       let arry = list.map(function(a) {return a.companyId;});
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
    if(this.selectecdCompanyList){
      this.changeComapny(items);
    }
  }

  onDeSelectAllCompany(items:any){
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
    this.selectecdLeaveTypeList.push(...items);
  }

  onDeSelectAllLeaveType(items:any){
    this.changeComapny(items);
  }




}
