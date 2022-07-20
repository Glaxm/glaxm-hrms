import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../employee.service';
import { Router } from '@angular/router';
import { ToastrService } from 'src/app/views/services/toastr.service';
import { FormGroup, FormControl } from '@angular/forms';
import { ExcelService } from 'src/app/views/services/excel.service';
import { CommonService, IMPORT_FORMAT_EMPLOYEE } from 'src/app/views/services/common.service';
declare var $: any;
@Component({
  selector: 'app-employee-summary',
  templateUrl: './employee-summary.component.html',
  styleUrls: ['./employee-summary.component.scss']
})
export class EmployeeSummaryComponent implements OnInit {

  empList: any = [];
  empId: any;
  fileUploadForm: FormGroup;
  fileUploadFormPayitem: FormGroup;
  fileUploadFormSalarymode: FormGroup;
  filterString = "";
  filtered;
  moduleid:any;
  items = [];
  pageInfo: any = {
    currentPage: null,
    showEntry: null,
  }
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
  pageOfItems: Array<any>;
  selectRadioBtn: boolean = false;
  onChangePage(pageOfItems: Array<any>) {
    // update current page of items
    this.pageOfItems = pageOfItems;
  }

  selectTableRow(data) {
    if (!this.selectRadioBtn && data) {
      this.router.navigate(['/views/profile/my-profile/my-profile-info'], { queryParams: { id: data.employeeId, view: this.flags.readFlag == 'Y' && this.flags.createFlag == 'N' && this.flags.editFlag == 'N' ? 'Y' : 'N' } });
    }
  }

  constructor(public excelService: ExcelService, private commonService: CommonService, private empService: EmployeeService, private toastService: ToastrService, private router: Router) {
    this.fileUploadForm = new FormGroup({
      fileName: new FormControl("")
    });
    this.fileUploadFormPayitem = new FormGroup({
      fileName: new FormControl("")
    });
    this.fileUploadFormSalarymode = new FormGroup({
      fileName: new FormControl("")
    });

  }

  ngOnInit() {
   
    this.moduleList = JSON.parse(sessionStorage.getItem("moduleList"));
    if (this.moduleList) {
      this.moduleList.map((e) => {
        if (e.moduleGroup == 'Profile' && e.moduleName == 'My Profile') {
          this.moduleid=e.moduleId;
          this.flags = { 'createFlag': e.createFlag, 'editFlag': e.editFlag, 'readFlag': e.readFlag, 'deleteFlag': e.deleteFlag,'importFlag': e.importFlag,
          'exportFlag': e.exportFlag,
          'forSelf': e.forSelf };
        }
      });
    }
    this.getEmpList();
  }

  getDataUsingRedioBtn(data) {
    this.empId = data.employeeId;
  }

  data: any = [];
  getEmpList() {
    let list: any = JSON.parse(sessionStorage.getItem("company"));
    var l: any = [];
    for (var i = 0; i < list.length; i++) {
      l.push(Number(list[i]));
    }

    this.empService.getEmpList(sessionStorage.getItem("userId"), l,this.moduleid).subscribe(success => {
      this.data = success;
    });

  }

  add() {
    this.router.navigate(['/views/profile/my-profile/my-profile-info'],{ queryParams:{moduleid:this.moduleid}});
  }
  edit() {
    if (this.empId) {
      this.router.navigate(['/views/profile/my-profile/my-profile-info'], { queryParams: { id: this.empId, view: 'N',moduleid:this.moduleid } });
    }
  }
  view() {
    if (this.empId) {
      this.router.navigate(['/views/profile/my-profile/my-profile-info'], { queryParams: { id: this.empId, view: 'Y',moduleid:this.moduleid } });
    }
  }
  delete() { }

  // Excel file upload
  isuploadfile: boolean = false;

  fileUploadFun(event, tab) {
    // this.formData.append('moduleId', this.moduleid);
    if (this.file.name) {
      this.isuploadfile = true;
      this.empService.uploadCsvFile(this.formData,this.moduleid).subscribe(s => {
        var data: any = s;
        
        this.isuploadfile = false;
        
        this.file = null;
        this.formData = null;
        if(data.code==1){
          this.toastService.showToastLongMsg('danger', data.message);      
        } else{
        this.toastService.showToast('success', data.message);
        this.getEmpList();
      }
      });
    } else {
    }
  }

  fileUploadFunSalarymode(event, tab) {
    console.log(event);
    this.formData.append('moduleId', this.moduleid);
    if (this.file.name) {
      this.empService.uploadCsvFileSaaryMode(this.formData).subscribe(s => {
        var data: any = s;
        this.file = null;
        this.formData = null;

        this.toastService.showToast('success', data.message);
        this.getEmpList();

      });
    } else {
    }
  }

  fileUploadFunPayitem(event, tab) {
    console.log(event);
    this.formData.append('moduleId', this.moduleid);
    if (this.file.name) {
      this.empService.uploadCsvFilePayitem(this.formData).subscribe(s => {
        var data: any = s;
        this.file = null;
        this.formData = null;
        this.toastService.showToast('success', data.message);
        this.getEmpList();
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

  sampleFormatedFile() {
    this.excelService.exportAsExcelFile(IMPORT_FORMAT_EMPLOYEE, 'employee_sample_format');
  }

  exportList: any = [];
  exportData() {
    let list: any = JSON.parse(sessionStorage.getItem("company"));
    var l: any = [];
    for (var i = 0; i < list.length; i++) {
      l.push(Number(list[i]));
    }

    this.empService.exportEmpData(this.searchUrl,l,this.moduleid).subscribe(data => {
      this.exportList = data;
      let exportDataList = Array(this.exportList.length).fill(0).map((x, i) => (
        {
          "Company": this.exportList[i].company,
          "Employee ID": this.exportList[i].employeeId,
          "Biometrics ID": this.exportList[i].bioId,
          "Employee Code": this.exportList[i].empcode,
          "Greeting": this.exportList[i].greeting,
          "First Name": this.exportList[i].firstName,
          "Middle Name": this.exportList[i].middleName,
          "Last Name": this.exportList[i].lastName,
          "Gender": this.exportList[i].gender,
          "Date of Birth": this.exportList[i].dob,
          "Education": this.exportList[i].education,
          "Function": this.exportList[i].division,
          "Department": this.exportList[i].department,
          "Section": this.exportList[i].section,
          "Sub-Section": this.exportList[i].subSection,
          "Work Location": this.exportList[i].workLocation,
          "Visa Sponsor Company": this.exportList[i].visasponsor,
          "Date of Joining": this.exportList[i].dateofJoin,
          "MOL ID": this.exportList[i].molId,
          "Employee Category": this.exportList[i].category,
          "Employee Grade": this.exportList[i].grade,
          "Employee Designation": this.exportList[i].designation,
          "User ID": this.exportList[i].userId,
          "Email ID": this.exportList[i].emailId,
          "Manager ID": this.exportList[i].mngrName,
          "Manager Email ID": this.exportList[i].mngrmailId,
          "Office Telephone Number": this.exportList[i].teleNo,
          "Office Extension Number": this.exportList[i].extNo,
          "Shift Rule": this.exportList[i].shiftRule,
          "Air Sector": this.exportList[i].airSector,
          "Probation period": this.exportList[i].probationPeriod,
          "Probation completion date": this.exportList[i].probcompPeriod,
          "Employment Status": this.exportList[i].empStatus,
          "Service period": this.exportList[i].servicePeriod,
          "Leaving Date": this.exportList[i].leavingDate,
          "Status": this.exportList[i].status,
          "Source Document": this.exportList[i].srcDoc,
          "Normal Hours": this.exportList[i].normalhrs,
          "Overtime Hours": this.exportList[i].othrs,
          "Payment Mode": this.exportList[i].paymode,
          "Exchange House Name": this.exportList[i].exchangeName,
          "Bank name": this.exportList[i].bankName,
          "Bank Branch": this.exportList[i].bankBranch,
          "Bank Account No": this.exportList[i].bankAccno,
          "Employee Name In Bank": this.exportList[i].empNameinBank,
          "IBAN Number": this.exportList[i].iban,
          "Routing No": this.exportList[i].routing,
          "Swift Code": this.exportList[i].swiftCode,
          "IFSC Code": this.exportList[i].ifsc,
          "Bank City": this.exportList[i].bankCity,
          "Exchange Account No": this.exportList[i].exchangeAccno,
          "Currency": this.exportList[i].currency,
          "Description": this.exportList[i].desc,
          "Holiday Paid": this.exportList[i].holidayOt,
          "Overtime Paid": this.exportList[i].normalOt,
          "Weekly Off Paid": this.exportList[i].fridayOt,
          "Overtime Reference": this.exportList[i].otRef,
          "Basic": this.exportList[i].basic,
          "Food Allowance": this.exportList[i].foodAllowance,
          "House Rent Allowance": this.exportList[i].hra,
          "Other Allowance": this.exportList[i].otherAllowance,
          "Fixed OT Allowance": this.exportList[i].fixedOt,
          "Telephone Allowance": this.exportList[i].teleAllowance,
          "Transportation Allowance": this.exportList[i].trans,
          "Fuel Allowance": this.exportList[i].fuel,
          "Effective Date": this.exportList[i].effectivedate,
          "Per Units": this.exportList[i].unit,
          "Marital Status": this.exportList[i].marritalStatus,
          "Nationality": this.exportList[i].nationality,
          "Religion": this.exportList[i].religion,
          "Father's Name": this.exportList[i].fathername,
          "Mother's Name": this.exportList[i].mothername,
          "Spouse Name": this.exportList[i].spousename,
          "Home Country Tel. No.": this.exportList[i].homeCtele,
          "Home Country Address": this.exportList[i].homeCaddr,
          "Local Home Tel. No.": this.exportList[i].localtele,
          "Local Address": this.exportList[i].localaddr,
          "Annual Leave Entitlement Type": this.exportList[i].entitletype,
          "Annual Leave Entitlement Days": this.exportList[i].entitledays,
          "Passport No.": this.exportList[i].passportno,
          "Place of Birth": this.exportList[i].birthPlace,
          "Place of Issue": this.exportList[i].issuePlace,
          "Date of Issue": this.exportList[i].issueDate,
          "Date of Expiry": this.exportList[i].expDate,
          "Emirates ID Number": this.exportList[i].eId,
          "Emirates ID Card No.": this.exportList[i].eIdardno,
          "Emirates ID Expiry Date": this.exportList[i].eIdexpdt,
          "Residence Visa Number": this.exportList[i].resVisano,
          "Residence Visa File No.": this.exportList[i].resVisafileno,
          "Residence Visa Issue Date": this.exportList[i].resvisaissuedt,
          "Residence Visa Expiry Date": this.exportList[i].resvisaexpirydt,
          "Job. Title in Res. Visa": this.exportList[i].resvisajobtitle,

          "Labour Card Number": this.exportList[i].lbcardNo,
          "Labour Card Expiry Date": this.exportList[i].lbcardexpDt,
          "Personnel ID in Labour Card": this.exportList[i].lbcardpId,

          "Regular off Day": this.exportList[i].regularOff,
          "Alternate off Day": this.exportList[i].altOff,
          "Alternate off Date": this.exportList[i].altoffDt

        }));

      this.excelService.exportAsExcelFile(exportDataList, "Employee");
    })

  }

  // ------------------------------

  enableFilter = false;
  getRows(data) {
    this.empId = data.employeeId;
  }

  searchUrl: any;

  search(data) {

    let list: any = JSON.parse(sessionStorage.getItem("company"));
    var l: any = [];
    for (var i = 0; i < list.length; i++) {
      l.push(Number(list[i]));
    }
    this.data = {};

    this.empService.empDatatable(sessionStorage.getItem("userId"), l, data,this.moduleid).subscribe(success => {
      this.data = success;
    });

    let str = data;
    const mapObj = {
      companyName: "compnamefilter",
      displayName: "dispnamefilter",
      department: "deptfilter",
      designation: "desigfilter",
      shiftName: "shiftNamefilter"
    };
    this.searchUrl = str.replace(/\b(?:companyName|displayName|department|designation|shiftName)\b/gi, matched => mapObj[matched]);
  }

}
