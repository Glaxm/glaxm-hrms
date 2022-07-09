import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ExcelService } from '../../services/excel.service';
import { ToastrService } from '../../services/toastr.service';
import { PreApprovalService } from './pre-approval.service';

@Component({
  selector: 'app-pre-approval',
  templateUrl: './pre-approval.component.html',
  styleUrls: ['./pre-approval.component.scss']
})
export class PreApprovalComponent implements OnInit {

  ratingList: any = [];
lEmpabcenceId:any;
enableFilter:boolean=false;
preApproveList:any=[];
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
  importFlag:'',
  forSelf: ''
}

dashboardHide:boolean;
isVoid:any;
  constructor(private excelService:ExcelService,private router:Router,private toastService: ToastrService,private preApprovalService:PreApprovalService) {
    this.fileUploadForm = new FormGroup({
      fileName: new FormControl("")
    });
   }

  ngOnInit() {
   

    this.moduleList = JSON.parse(sessionStorage.getItem("moduleList"));
    if (this.moduleList) {
      this.moduleList.map((e) => {
        if (e.moduleGroup == 'Transactions' && e.moduleName == 'Employee Absences') {
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
    this.preApprovalService.preApprovalDatatTable(sessionStorage.getItem("userId"),this.moduleid,l).subscribe(success=>{
      this.preApproveList=success;

     

    });
  }

  

  add() {
    this.router.navigate(['/views/transaction/pre-approval/add-update-preapproval'],{queryParams:{moduleid:this.moduleid}})
  }
  edit(){
    //if(this.lEmpabcenceId && this.isVoid!='V'){
      this.router.navigate(['/views/transaction/pre-approval/add-update-preapproval'],{queryParams:{id:this.lEmpabcenceId,moduleid:this.moduleid}});
    //} else{
      //this.toastService.showToast('danger', "Voided record.");
    // }
  }
  view(){
    if(this.lEmpabcenceId){
      this.router.navigate(['/views/transaction/pre-approval/add-update-preapproval'],{queryParams:{id:this.lEmpabcenceId,view:true,moduleid:this.moduleid}});
    }
  }
  delete(){

  }
  getRows(data){
    this.lEmpabcenceId = data.lEmpabcenceId;
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
     this.preApproveList=[];
     this.searchDataStr=data;
     this.preApprovalService.preApprovalDatatTableSearch(sessionStorage.getItem("userId"),l,data).subscribe(success=>{
      this.preApproveList=success;})
  
  }

   fileUploadFun(event,tab) {
  //   if (this.file.name) {
  //     this.empPayTransService.uploadCsvFile(this.formData).subscribe(s => {
  //       var data: any = s;
  //       this.file = null;
  //       this.formData = null;
  //       this.toastService.showToast('success', data.message);
  //       this.getEmpPayTransactionList();
  //     });
  //   } else {
  //   }
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
  //   this.excelService.exportAsExcelFile(IMPORT_FORMAT_EMP_PAY_TRANSACTION, 'Employee_Pay_Transaction_Import_Format');
   }


  selectTableRow(data){
    
    if(!this.selectRadioBtn && data){
      this.router.navigate(['/views/transaction/pre-approval/add-update-preapproval'],{queryParams:{id:data.lPaytransactionId,moduleid:this.moduleid}});
    }
  }

   exporttoexcel() {
  //   let title = "Employee_Pay_Transaction";
  
  //   this.empPayTransService.empPayTransactionExport(this.searchDataStr).subscribe(data=>{

  //     var empPayTransdatalist: any = data;
  //     if(empPayTransdatalist){
  //       let exportDataList = Array(empPayTransdatalist.length).fill(0).map((x, i) => (
  //       {
  //         "Emp.ID": empPayTransdatalist[i].oldEmpId,
  //         "Emp.Code": empPayTransdatalist[i].empcode,
  //         "Employee": empPayTransdatalist[i].empname,
  //         "Date": empPayTransdatalist[i].effdate,
  //         "Pay Item": empPayTransdatalist[i].payitemname,
  //         "Amount": empPayTransdatalist[i].amount,
  //         "OT Hours": empPayTransdatalist[i].otHrs
  //       }));
  //        this.excelService.exportAsExcelFile(exportDataList, title);
  //     }
  //     })

   }


}
