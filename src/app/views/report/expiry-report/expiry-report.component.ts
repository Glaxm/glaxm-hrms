import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { CommonService } from '../../services/common.service';
import { ExcelService } from '../../services/excel.service';
import { ReportService } from '../report.service';

@Component({
  selector: 'app-expiry-report',
  templateUrl: './expiry-report.component.html',
  styleUrls: ['./expiry-report.component.scss']
})
export class ExpiryReportComponent implements OnInit {

  filterForm: any;
  enableFilter: boolean = false;
  empList: any = [];
  exportList:any =[];
  documentTypeList:any=[{ valueCode: '1', valueName: 'Passport' }, { valueCode: '2', valueName: 'Emirates ID' },{ valueCode: '3', valueName: 'Visa' },{ valueCode: '4', valueName: 'Labour Card' },{ valueCode: '5', valueName: 'Jafza Card' },{ valueCode: '6', valueName: 'Medical Insurance' },{ valueCode: '7', valueName: 'Driving Licence' }];
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
  docExpReportSummaryList:any =[];
  expiryreportform:any;
  constructor(public excelService: ExcelService,  private reportService: ReportService,
     private commonService: CommonService) {

      this.expiryreportform = new FormGroup({
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
       
        if(e.moduleGroup=='Report' && e.moduleName=='Document Expiry Report'){
          this.moduleid = e.moduleId;
          this.flags = {'createFlag': e.createFlag,'editFlag':e.editFlag, 'readFlag':e.readFlag, 'deleteFlag':e.deleteFlag};
        }
      });
    }
    this.getAllComapny();
    this.getAllLeaveType();
  }

  getAllLeaveType(){
    this.reportService.getAllDocType().subscribe(success=>{
      this.documentTypeList = success;
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
    this.expiryreportform.get('stdate').setValue(this.commonService.dateFormat(event.singleDate.jsDate));
  
  }
  changeEndDate(event) {
    this.expiryreportform.get('endate').setValue(this.commonService.dateFormat(event.singleDate.jsDate));
  
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
      elm.push(element.xdoctypeId);
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
    
    if (this.selectecdDocumentTypeList.length > 0) {
      ltypeList = this.setLTypeList(this.selectecdDocumentTypeList);
    } else {
      ltypeList = [];
    }

    this.submitted = true;
    if (this.expiryreportform.invalid) {
      return;
    } else{
      let data = {'empId':empIdList,'docType':ltypeList }
      this.getEmpDocHistoryReportSummary(data,this.expiryreportform.value.stdate,this.expiryreportform.value.endate);
    }
    

  }

  getEmpDocHistoryReportSummary(data,stdate,endate){
    this.reportService.getEmpDocHistoryReportSummary(data,stdate,endate).subscribe(data=>{
      this.docExpReportSummaryList = data;
      if(this.docExpReportSummaryList){
        this.onFilterChange();
        this.filtered = Array(this.docExpReportSummaryList.length).fill(0).map((x, i) => (
          {
            companyName: this.docExpReportSummaryList[i].companyName,
            oldEmpId:this.docExpReportSummaryList[i].oldEmpId,
            empname: this.docExpReportSummaryList[i].empname,
            doctypename: this.docExpReportSummaryList[i].doctypename,
            expirydate: this.docExpReportSummaryList[i].expirydate,
            issuedate: this.docExpReportSummaryList[i].issuedate,
            enddate: this.docExpReportSummaryList[i].enddate,
            empcode: this.docExpReportSummaryList[i].empcode
          }));     
      }
     
  });
    
  }

  exportReport() {
    let title = "Document_Expiry_Report";
    let list = this.docExpReportSummaryList
    if (list) {
      let exportList = Array(list.length).fill(0).map((x, i) => (
        {
          "Company": list[i].companyName,
          "Employee Id":list[i].oldEmpId,
          "Employee": list[i].empname,
          "Document Type": list[i].doctypename,
          "Expiry Date": list[i].expirydate,
          "Issue Date": list[i].issuedate,
          "End Date": list[i].enddate
        }));
    
      this.excelService.exportAsExcelFile(exportList, title);
    }
  }

  changeCompany(id){
    let list=[Number(id)];
    this.getEmpList(list);
   
  }


  
  get f() { return this.expiryreportform.controls; }
  
  onFilterChange() {
    this.filtered = this.selectecdDocumentTypeList.filter((data) => this.isMatch(data));
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
  selectecdDocumentTypeList = [];
  dropdownSettingsdocumenttype: IDropdownSettings = {
    singleSelection: false,
    idField: 'xdoctypeId',
    textField: 'docName',
    selectAllText: 'Select All',
    unSelectAllText: 'UnSelect All',
    itemsShowLimit: 3,
    allowSearchFilter: true
  };

  ondocumentTypeSelect(item: any) {
    this.selectecdDocumentTypeList.push(item);
  }

  ondocumentTypeDeSelect(items: any) {
    this.selectecdDocumentTypeList = this.selectecdDocumentTypeList.filter(item => item.xdoctypeId !== items.xdoctypeId);
  }

  onSelectAllDocumentType(items: any) {
    this.selectecdDocumentTypeList = [];
    this.selectecdDocumentTypeList.push(...[items]);
  }

  onDeSelectAlllDocumentType(items:any){
    this.changeComapny(items);
  }



}
