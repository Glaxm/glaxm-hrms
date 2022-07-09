import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { IMPORT_FORMAT_DOCUMENT_HISTORY } from '../../services/common.service';
import { ExcelService } from '../../services/excel.service';
import { ToastrService } from '../../services/toastr.service';
import { AssettranService } from '../assettran/assettran.service';
import { DocumentsService } from './documents.service';

@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.scss']
})
export class DocumentsComponent implements OnInit {

  documentsList: any = [];
  documentsId:any;
  enableFilter:boolean=false;

  filterString = "";
  filtered;
  items = [];
  pageOfItems: Array<any>;

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
    importFlag:''
  }
  fileUploadForm: FormGroup;
  constructor(private router: Router, private toastService: ToastrService, private documentsService:DocumentsService, private excelService:ExcelService ) {
    this.fileUploadForm = new FormGroup({
      fileName: new FormControl("")
    });
    this.moduleList = JSON.parse(sessionStorage.getItem("moduleList"));
    if (this.moduleList) {
      this.moduleList.map((e) => {
        if (e.moduleGroup == 'Transactions' && e.moduleName == 'Employee Document') {
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

  ngOnInit() {
    this.getdocumentsExpiryList();
  }

  add() {
    this.router.navigate(['/views/transaction/documents/add-documents'],{queryParams:{moduleid:this.moduleid}})
  }
  edit(){
    if(this.documentsId){
      this.router.navigate(['/views/transaction/documents/add-documents'],{queryParams:{id:this.documentsId,moduleid:this.moduleid}});
    }
  }
  view(){
    if(this.documentsId){
      this.router.navigate(['/views/transaction/documents/add-documents'],{queryParams:{id:this.documentsId,view:true,moduleid:this.moduleid}});
    }
  }
  delete(){

  }
  // getDataUsingRedioBtn(data){
  //   this.documentsId = data.lEmppdocId;
  // }

  // getdocumentsExpiryList() { 
  //    let list:any =JSON.parse(sessionStorage.getItem("company"));
  //    var l:any=[];
  //    for(var i=0;i<list.length;i++){
  //        l.push(Number(list[i]));
  //    }
  
  //   this.documentsService.getdocumentsExpiryList(l).subscribe(s => {
  //     this.documentsList = s;
  //   });
  // }

  exporttoexcel() {
    let title = "Documents";
  
    this.documentsService.documentExport(this.searchDataStr).subscribe(data=>{

      var documentdatalist: any = data;
      if(documentdatalist){
        let exportDataList = Array(documentdatalist.length).fill(0).map((x, i) => (
        {
          "Employee": documentdatalist[i].empname,
          "Doucment Type": documentdatalist[i].docname,
          "Doucment No": documentdatalist[i].docno,
        }));
         this.excelService.exportAsExcelFile(exportDataList, title);
      }
      })
  
    // let exportDataList = Array(this.documentsList.length).fill(0).map((x, i) => (
    //   {
    //     "Employee": this.documentsList[i].documentno,
    //     "Doucment Type": this.documentsList[i].datetrx,
    //     "Doucment No": this.documentsList[i].assetitem,
       
  
    //   }));
  
    // this.excelService.exportAsExcelFile(exportDataList, title);
  //  this.excelService.exportAsExcelFile(this.reportSummaryList, "AttendanceSummary");
  
  }

  isuploadfile: boolean = false;

  fileUploadFun(event, tab) {

    if (this.file.name) {
      this.isuploadfile = true;
      this.documentsService.uploadCsvFile(this.formData).subscribe(s => {
        var data: any = s;
        this.isuploadfile = false;
        this.file = null;
        this.formData = null;
        this.toastService.showToast('success', data.message);
        this.documentsList();
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
    this.excelService.exportAsExcelFile(IMPORT_FORMAT_DOCUMENT_HISTORY, 'doc_exp_format');
  }

   //============================================ Datatable

   data: any = [];
   getdocumentsExpiryList() {
 
       let list:any =JSON.parse(sessionStorage.getItem("company"));
       var l:any=[];
       for(var i=0;i<list.length;i++){
           l.push(Number(list[i]));
           }
 
     this.documentsService.documentsdatatable(sessionStorage.getItem("userId"),this.moduleid,l).subscribe(s => {
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
    this.documentsList=[];
    this.searchDataStr=data;
      this.documentsService.documentsdatatable1(sessionStorage.getItem("userId"),l,data).subscribe(s => {
      this.data = s;
     });
 
    }
 
    getRows(data){
     // this.airSectorId = data.airsectorId;
     // this.edit();
     // alert(JSON.stringify(data));
     this.documentsId = data.lEmppdocId;
    }

}
