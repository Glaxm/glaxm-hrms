import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { IMPORT_FORMAT_EMPLOYEE_LOAN } from '../../services/common.service';
import { ExcelService } from '../../services/excel.service';
import { ToastrService } from '../../services/toastr.service';
import { EmployeeloanService } from './employeeloan.service';

@Component({
  selector: 'app-employeeloan',
  templateUrl: './employeeloan.component.html',
  styleUrls: ['./employeeloan.component.scss']
})
export class EmployeeloanComponent implements OnInit {
  loanId:any;
  enableFilter:boolean =false;
  loanList:any=[];

  moduleList: any = [];
  moduleid:any;
  flags = {
    createFlag: '',
    editFlag: '',
    readFlag: '',
    deleteFlag: '',
    exportFlag:'',
    importFlag:''
  }
  fileUploadForm: FormGroup;
  constructor(private toastService:ToastrService,private router:Router,private employeeloanService:EmployeeloanService,private excelService:ExcelService) { 
    this.fileUploadForm = new FormGroup({
      fileName: new FormControl("")
    });

  }

  ngOnInit() {
    this.getAllEmploan();
    this.moduleList = JSON.parse(sessionStorage.getItem("moduleList"));
    if (this.moduleList) {
      this.moduleList.map((e) => {
        if (e.moduleGroup == 'Loan Management' && e.moduleName == 'Employee Loan') {
         this.moduleid=e.moduleId;
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
  }
//   getAllEmploan() {
//     let list: any = JSON.parse(sessionStorage.getItem("company"));
//     var l: any = [];
//     for (var i = 0; i < list.length; i++) {
//       l.push(Number(list[i]));
//     }
//     this.employeeloanService.getAllEmploan(l).subscribe(success=>{
//       this.loanList=success;
//     });
//   }

//   getDataUsingRedioBtn(data){
//     this.loanId = data.lEmploanId;
// }

add(){ 
  this.router.navigate(['/views/transaction/emp-loan/add-employeeloan'], { queryParams: { moduleid:this.moduleid } });
}
edit(){ 
  if(this.loanId){
    this.router.navigate(['/views/transaction/emp-loan/add-employeeloan'],{queryParams:{id:this.loanId,moduleid:this.moduleid}});
  }
}
view(){ 
  if(this.loanId){
    this.router.navigate(['/views/transaction/emp-loan/add-employeeloan'],{queryParams:{id:this.loanId,view:true,moduleid:this.moduleid}});
  }
}
delete(){ }

sampleFormatedFile() {
  this.excelService.exportAsExcelFile(IMPORT_FORMAT_EMPLOYEE_LOAN, 'employee_loan_sample_format');
}

exporttoexcel() {
  let title = "Employee_Loan";

  this.employeeloanService.loanExport(this.searchDataStr).subscribe(data=>{

    var loandatalist: any = data;
    if(loandatalist){
      let exportDataList = Array(loandatalist.length).fill(0).map((x, i) => (
      {
        "Emp. ID": loandatalist[i].oldEmpId,
        "Emp. Code": loandatalist[i].empcode,
        "Employee": loandatalist[i].empname,
        "Document No.": loandatalist[i].documentno,
        "Loan Amount": loandatalist[i].loanamount,
        "Start Date": loandatalist[i].startdate,
        "End Date": loandatalist[i].enddate
      }));
       this.excelService.exportAsExcelFile(exportDataList, title);
    }
    })

  // let exportDataList = Array(this.loanList.length).fill(0).map((x, i) => (
  //   {
  //     "Emp. ID": this.loanList[i].oldEmpId,
  //     "Emp. Code": this.loanList[i].empcode,
  //     "Employee": this.loanList[i].empname,
  //     "Document No.": this.loanList[i].documentno,
  //     "Loan Amount": this.loanList[i].loanamount,
  //     "Start Date": this.loanList[i].startdate,
  //     "End Date": this.loanList[i].enddate
  //   }));

  // this.excelService.exportAsExcelFile(exportDataList, title);
//  this.excelService.exportAsExcelFile(this.reportSummaryList, "AttendanceSummary");

}

//============================================ Datatable

data: any = [];
getAllEmploan() {

    let list:any =JSON.parse(sessionStorage.getItem("company"));
    var l:any=[];
    for(var i=0;i<list.length;i++){
        l.push(Number(list[i]));
        }

  this.employeeloanService.loandatatable(sessionStorage.getItem("userId"),this.moduleid,l).subscribe(s => {
  this.data = s;

  });
}

searchDataStr: any; 
search(data) {
 let list:any =JSON.parse(sessionStorage.getItem("company"));
 var l:any=[];
 for(var i=0;i<list.length;i++){
    l.push(Number(list[i]));
 }
 this.loanList=[];
 this.searchDataStr=data;
   this.employeeloanService.loandatatable1(sessionStorage.getItem("userId"),l,data).subscribe(s => {
   this.data = s;
  });

 }

 getRows(data){
  this.loanId = data.lEmploanId;
 }

 //************************************************ */      // Excel file upload
 isuploadfile: boolean = false;

 fileUploadFun(event) {

   if (this.file.name) {
     this.isuploadfile = true;
     this.employeeloanService.uploadCsvFile(this.formData).subscribe(s => {
       var data: any = s;
       this.isuploadfile = false;
       this.file = null;
       this.formData = null;
       this.toastService.showToast('success', data.message);
       this.getAllEmploan();
     });
   } else {
   }
 }

 file: File;
 formData: FormData;
 fileChange(event) {
   this.formData = new FormData();
   let fileList: FileList = event.target.files;
   if (fileList.length > 0) {
     this.file = fileList[0];
     this.formData.append('file', this.file, this.file.name)
   }
 }
}
