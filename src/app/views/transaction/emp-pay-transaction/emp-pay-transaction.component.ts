import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { IMPORT_FORMAT_EMP_PAY_TRANSACTION } from '../../services/common.service';
import { ExcelService } from '../../services/excel.service';
import { ToastrService } from '../../services/toastr.service';
import { EmpPayTransactionService } from './emp-pay-transaction.service';

@Component({
  selector: 'app-emp-pay-transaction',
  templateUrl: './emp-pay-transaction.component.html',
  styleUrls: ['./emp-pay-transaction.component.scss']
})
export class EmpPayTransactionComponent implements OnInit {

ratingList: any = [];
empratingId:any;
enableFilter:boolean=false;
empPayList:any=[];
fileUploadForm: FormGroup;
selectRadioBtn:boolean=false;
filterString = "";
filtered;

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

dashboardHide:boolean;
isVoid:any;
  constructor(private excelService:ExcelService,private router:Router,private toastService: ToastrService,private empPayTransService:EmpPayTransactionService) {
    this.fileUploadForm = new FormGroup({
      fileName: new FormControl("")
    });
   }

  ngOnInit() {
   

    this.moduleList = JSON.parse(sessionStorage.getItem("moduleList"));
    if (this.moduleList) {
      this.moduleList.map((e) => {
        if (e.moduleGroup == 'Transactions' && e.moduleName == 'Employee Pay Transaction') {
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
    this.getEmpPayTransactionList();
  }

  getEmpPayTransactionList() {
      // alert(sessionStorage.getItem("company"))
      let list:any =JSON.parse(sessionStorage.getItem("company"));
      var l:any=[];
      // alert(list.length)
      for(var i=0;i<list.length;i++){
       
       // if(list[i]!=','){
          l.push(Number(list[i]));
        // }
      }
    this.empPayTransService.empPayTransactionDatatTable(sessionStorage.getItem("userId"),this.moduleid,l).subscribe(success=>{
      this.empPayList=success;

     

    });
  }

  

  add() {
    this.router.navigate(['/views/transaction/emp-pay-transaction/add-emp-pay-transaction'],{queryParams:{moduleid:this.moduleid}})
  }
  edit(){
    if(this.empratingId && this.isVoid!='V'){
      this.router.navigate(['/views/transaction/emp-pay-transaction/add-emp-pay-transaction'],{queryParams:{id:this.empratingId,moduleid:this.moduleid}});
    } else{
      this.toastService.showToast('danger', "Voided record.");
    }
  }
  view(){
    if(this.empratingId){
      this.router.navigate(['/views/transaction/emp-pay-transaction/add-emp-pay-transaction'],{queryParams:{id:this.empratingId,view:true,moduleid:this.moduleid}});
    }
  }
  delete(){

  }
  getRows(data){
    this.empratingId = data.lPaytransactionId;
    this.isVoid = data.isActive;
    if(data.key==""){

    } else{
      this.edit();
    }
  }

  searchDataStr: any; 
  search(data){
    let list:any =JSON.parse(sessionStorage.getItem("company"));
     var l:any=[];
     for(var i=0;i<list.length;i++){
        l.push(Number(list[i]));
     }
     this.empPayList=[];
     this.searchDataStr=data;
     this.empPayTransService.getEmpPayTransactionList(sessionStorage.getItem("userId"),l,data).subscribe(success=>{
      this.empPayList=success;})
  
  }

  fileUploadFun(event,tab) {
    if (this.file.name) {
      this.empPayTransService.uploadCsvFile(this.formData).subscribe(s => {
        var data: any = s;
        this.file = null;
        this.formData = null;
        this.toastService.showToast('success', data.message);
        this.getEmpPayTransactionList();
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
   // alert(this.file.name)
  }
  
  sampleFormatedFile(){
    this.excelService.exportAsExcelFile(IMPORT_FORMAT_EMP_PAY_TRANSACTION, 'Employee_Pay_Transaction_Import_Format');
  }


  selectTableRow(data){
    
    if(!this.selectRadioBtn && data){
      this.router.navigate(['/views/transaction/emp-pay-transaction/add-emp-pay-transaction'],{queryParams:{id:data.lPaytransactionId,moduleid:this.moduleid}});
    }
  }

  exporttoexcel() {
    let title = "Employee_Pay_Transaction";
  
    this.empPayTransService.empPayTransactionExport(this.searchDataStr).subscribe(data=>{

      var empPayTransdatalist: any = data;
      if(empPayTransdatalist){
        let exportDataList = Array(empPayTransdatalist.length).fill(0).map((x, i) => (
        {
          "Emp.ID": empPayTransdatalist[i].oldEmpId,
          "Emp.Code": empPayTransdatalist[i].empcode,
          "Employee": empPayTransdatalist[i].empname,
          "Date": empPayTransdatalist[i].effdate,
          "Pay Item": empPayTransdatalist[i].payitemname,
          "Amount": empPayTransdatalist[i].amount,
          "OT Hours": empPayTransdatalist[i].otHrs
        }));
         this.excelService.exportAsExcelFile(exportDataList, title);
      }
      })

  
    // let exportDataList = Array(this.empPayList.length).fill(0).map((x, i) => (
    //   {
    //     "Emp.ID": this.empPayList[i].oldEmpId,
    //     "Emp.Code": this.empPayList[i].empcode,
    //     "Employee": this.empPayList[i].employeename,
    //     "Date": this.empPayList[i].effectivedate,
    //     "Pay Item": this.empPayList[i].payitemname,
    //     "Amount": this.empPayList[i].amount,
    //     "OT Hours":this.empPayList[i].otHrs
        
  
    //   }));
  
    // this.excelService.exportAsExcelFile(exportDataList, title);
  //  this.excelService.exportAsExcelFile(this.reportSummaryList, "AttendanceSummary");
  
  }

}
