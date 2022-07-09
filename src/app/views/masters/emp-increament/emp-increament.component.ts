import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { IMPORT_FORMAT_SALARY_REVISION } from '../../services/common.service';
import { ExcelService } from '../../services/excel.service';
import { ToastrService } from '../../services/toastr.service';
import { EmpIncrementService } from './emp-increment.service';

@Component({
  selector: 'app-emp-increament',
  templateUrl: './emp-increament.component.html',
  styleUrls: ['./emp-increament.component.scss']
})
export class EmpIncreamentComponent implements OnInit {
 
  empIncrementList:any =[];
  empIncrementId:any;
  enableFilter:boolean=false;

  filterString = "";
  filtered;
  items = [];
  pageOfItems: Array<any>;
  fileUploadForm: FormGroup;

  onChangePage(pageOfItems: Array<any>) {
    // update current page of items
    this.pageOfItems = pageOfItems;
  }

  moduleList: any = [];
  moduleid:any;
  flags = {
    createFlag: '',
    editFlag: '',
    readFlag: '',
    deleteFlag: '',
    exportFlag:'',
    importFlag:'',
    forSelf: ''
  }
  

  constructor(private toastService:ToastrService, private empIncrementService:EmpIncrementService,private router:Router,private excelService:ExcelService) {
    this.moduleList = JSON.parse(sessionStorage.getItem("moduleList"));
    if (this.moduleList) {
      this.moduleList.map((e) => {
        if (e.moduleGroup == 'Transactions' && e.moduleName == 'Salary Revision') {
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

    this.fileUploadForm = new FormGroup({
      fileName: new FormControl("")
    });


   }

  ngOnInit() {
    this.getEmpIncrementList();
  }

  // getDataUsingRedioBtn(data){
  //   this.empIncrementId = data.lempincremId;
  // }

  // getEmpIncrementList(){
  //     let list:any = JSON.parse(sessionStorage.getItem("company"));
  //     var l:any=[];
  //     for(var i=0;i<list.length;i++){
       
  //      // if(list[i]!=','){
  //         l.push(Number(list[i]));
  //      // }
  //     }
  //     this.empIncrementService.getEmpIncrementList(l).subscribe(success=>{
  //       this.empIncrementList = success;
  //     });
  // }

  add(){ 
    this.router.navigate(['views/masters/emp-increment/add-increment-summary'],{queryParams:{moduleid:this.moduleid}});
  }
  edit(){ 
    if(this.empIncrementId){
     this.router.navigate(['views/masters/emp-increment/add-increment-summary'],{queryParams:{id:this.empIncrementId,moduleid:this.moduleid}});
    }
  }
  view(){ 
    if(this.empIncrementId){
      this.router.navigate(['views/masters/emp-increment/add-increment-summary'],{queryParams:{id:this.empIncrementId,view:true,moduleid:this.moduleid}});
    }
  }
  delete(){ }

  exporttoexcel() {
    let title = "Salary_Revision";
  

    this.empIncrementService.empIncrementExport(this.searchDataStr).subscribe(data=>{

      var empIncrementdatalist: any = data;
      if(empIncrementdatalist){
        let exportDataList = Array(empIncrementdatalist.length).fill(0).map((x, i) => (
        {
          "Transaction Date": empIncrementdatalist[i].transDate,
          "Effective Date": empIncrementdatalist[i].effectiveDate,
          "Employee": empIncrementdatalist[i].empname,
          "Current Grade": empIncrementdatalist[i].empgrade,
          "Current Designation": empIncrementdatalist[i].empdesignation,
          "New Designation": empIncrementdatalist[i].newempdesignation
        }));
         this.excelService.exportAsExcelFile(exportDataList, title);
      }
      })
  
    // let exportDataList = Array(this.empIncrementList.length).fill(0).map((x, i) => (
    //   {
    //     "Transaction Date": this.empIncrementList[i].transDate,
    //     "Effective Date": this.empIncrementList[i].effectiveDate,
    //     "Employee": this.empIncrementList[i].empname,
    //     "Current Grade": this.empIncrementList[i].empgrade,
    //     "Current Designation": this.empIncrementList[i].empdesignation,
    //     "New Designation": this.empIncrementList[i].newempdesignation
        
  
    //   }));
  
    // this.excelService.exportAsExcelFile(exportDataList, title);
  //  this.excelService.exportAsExcelFile(this.reportSummaryList, "AttendanceSummary");
  
  }

  //============================================ Datatable

  data: any = [];
  getEmpIncrementList() {
   let list:any =JSON.parse(sessionStorage.getItem("company"));
   var l:any=[];
   for(var i=0;i<list.length;i++){
       l.push(Number(list[i]));
       }

    this.empIncrementService.EmpIncrementdatatable(sessionStorage.getItem("userId"),this.moduleid,l).subscribe(s => {
    this.data = s;

    });
  }
  
  searchDataStr: any; 
  search(data) {
      //  this.data = {};
      let list:any =JSON.parse(sessionStorage.getItem("company"));
      var l:any=[];
      for(var i=0;i<list.length;i++){
      l.push(Number(list[i]));
  }
      this.empIncrementList=[];
      this.searchDataStr=data;
      this.empIncrementService.EmpIncrementdatatable1(sessionStorage.getItem("userId"),l,data).subscribe(s => {
      this.data = s;
    });

   }

   getRows(data){
     this.empIncrementId = data.lempincremId;
   }

         // Excel file upload
  isuploadfile: boolean = false;

  fileUploadFun(event) {

    if (this.file.name) {
      this.isuploadfile = true;
      this.empIncrementService.uploadCsvFile(this.formData).subscribe(s => {
        var data: any = s;
        this.isuploadfile = false;
        this.file = null;
        this.formData = null;
        this.toastService.showToast('success', data.message);
        this.getEmpIncrementList();
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

  sampleFormatedFile() {
    this.excelService.exportAsExcelFile(IMPORT_FORMAT_SALARY_REVISION, 'salary_revision_sample_format');
  }


}
