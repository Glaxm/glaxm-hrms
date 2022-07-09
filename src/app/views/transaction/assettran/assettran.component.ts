import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ExcelService } from '../../services/excel.service';
import { AssettranService } from './assettran.service';

@Component({
  selector: 'app-assettran',
  templateUrl: './assettran.component.html',
  styleUrls: ['./assettran.component.scss']
})
export class AssettranComponent implements OnInit {

  assettranList: any = [];
  assettranId:any;
  enableFilter:boolean=false;
  
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
  constructor(private router: Router, private assettranService:AssettranService, private excelService:ExcelService ) {
    this.moduleList = JSON.parse(sessionStorage.getItem("moduleList"));
    if (this.moduleList) {
      this.moduleList.map((e) => {
        if (e.moduleGroup == 'Asset' && e.moduleName == 'Asset Transaction') {
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

   }

  ngOnInit() {
    this.getAssettranList();
  }

  add() {
    this.router.navigate(['/views/transaction/assettran/add-asseettran'],{queryParams:{ moduleid: this.moduleid}})
  }
  edit(){
    if(this.assettranId){
      this.router.navigate(['/views/transaction/assettran/add-asseettran'],{queryParams:{id:this.assettranId,moduleid: this.moduleid}});
    }
  }
  view(){
    if(this.assettranId){
      this.router.navigate(['/views/transaction/assettran/add-asseettran'],{queryParams:{id:this.assettranId,view:true,moduleid: this.moduleid}});
    }
  }
  delete(){

  }
  getDataUsingRedioBtn(data){
    this.assettranId = data.assettranId;
  }

  getAssettranList() {
    this.assettranService.getAssettranList().subscribe(s => {
      this.assettranList = s;
    });
  }

  exporttoexcel() {
    let title = "Asset_Transaction";
  
  
    let exportDataList = Array(this.assettranList.length).fill(0).map((x, i) => (
      {
        "Document No.": this.assettranList[i].documentno,
        "Transaction Date": this.assettranList[i].datetrx,
        "Asset Item": this.assettranList[i].assetitem,
        "Quantity": this.assettranList[i].qty,
        "Amount": this.assettranList[i].amount
       
        
  
      }));
  
    this.excelService.exportAsExcelFile(exportDataList, title);
  //  this.excelService.exportAsExcelFile(this.reportSummaryList, "AttendanceSummary");
  
  }
  

}
