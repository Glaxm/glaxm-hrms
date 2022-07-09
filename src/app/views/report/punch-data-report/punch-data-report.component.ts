import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { CommonService } from '../../services/common.service';
import { ExcelService } from '../../services/excel.service';
import { ReportService } from '../report.service';
@Component({
  selector: 'app-punch-data-report',
  templateUrl: './punch-data-report.component.html',
  styleUrls: ['./punch-data-report.component.scss']
})
export class PunchDataReportComponent implements OnInit {

  filterForm: any;
  enableFilter: boolean = false;
  empList: any = [];
  exportList:any =[];
  companyList: any = [];
  btnLoader: boolean;
  filterString = "";
  filtered;
  items = [];
  public myDatePickerOptions = this.commonService.datepickerFormat;
  submitted = false;
  moduleList:any=[];
  moduleid:any;
  flags={
    createFlag:'',
    editFlag:'',
    readFlag:'',
    deleteFlag:''
  }
  PunchDataReportSummaryList:any =[];
  punchdatareportform:any;
  constructor(public excelService: ExcelService,  private reportService: ReportService,
     private commonService: CommonService) {

      this.punchdatareportform = new FormGroup({
        company:new FormControl(null),
        employee:new FormControl(null),
        dtype:new FormControl(null),
        startDate1:new FormControl(null),
        endDate1:new FormControl(null),
        empId:new FormControl(null),
        stdate:new FormControl(null),
        endate:new FormControl(null),
        documenttype:new FormControl(null)
      });
 
  }

  ngOnInit() {
    this.moduleList = JSON.parse(sessionStorage.getItem("moduleList"));
    if(this.moduleList){
      this.moduleList.map((e)=>{
       
        if(e.moduleGroup=='Report' && e.moduleName=='Punching Details Report'){
          this.moduleid = e.moduleId;
          this.flags = {'createFlag': e.createFlag,'editFlag':e.editFlag, 'readFlag':e.readFlag, 'deleteFlag':e.deleteFlag};
        }
      });
    }
    this.getAllComapny();
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
    this.punchdatareportform.get('stdate').setValue(this.commonService.dateFormat(event.singleDate.jsDate));  
  }

  changeEndDate(event) {
    this.punchdatareportform.get('endate').setValue(this.commonService.dateFormat(event.singleDate.jsDate));
  }

  setEmpList(list) {
    let elm: any = [];
    list.forEach(element => {
      elm.push(element.employeeId);
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
    

    this.submitted = true;
    if (this.punchdatareportform.invalid) {
      return;
    } else{
      this.getPunchingDetailsReportSummary(empIdList,this.punchdatareportform.value.stdate,this.punchdatareportform.value.endate);
    }
  }

  getPunchingDetailsReportSummary(data,stdate,endate){
    this.reportService.getPunchingDetailsReportSummary(data,stdate,endate).subscribe(data=>{
      this.PunchDataReportSummaryList = data;
      if(this.PunchDataReportSummaryList){
        this.filtered = Array(this.PunchDataReportSummaryList.length).fill(0).map((x, i) => (
          {
            emp_id: this.PunchDataReportSummaryList[i].emp_id,
            even_id:this.PunchDataReportSummaryList[i].even_id,
            emp_name: this.PunchDataReportSummaryList[i].emp_name,
            device_srno: this.PunchDataReportSummaryList[i].device_srno,
            device_name: this.PunchDataReportSummaryList[i].device_name,
            eve_date: this.PunchDataReportSummaryList[i].eve_date,
            eve_time: this.PunchDataReportSummaryList[i].eve_time,
            checktype: this.PunchDataReportSummaryList[i].checktype
          }));     
      }
     
  });
    
  }

  exportReport() {
    let title = "Punching_Details_Report";
    let list = this.PunchDataReportSummaryList
    if (list) {
      let exportList = Array(list.length).fill(0).map((x, i) => (
        {
          
          "Employee Id":list[i].emp_id,
          "Employee": list[i].emp_name,
          "Device Sr. No.": list[i].device_srno,
          "Punch Date": list[i].eve_date,
          "Punch Time": list[i].eve_time,
          "Check Type": list[i].checktype
        }));
    
      this.excelService.exportAsExcelFile(exportList, title);
    }
  }

  changeCompany(id){
    let list=[Number(id)];
    this.getEmpList(list);
   
  }


  
  get f() { return this.punchdatareportform.controls; }
  
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





}
