import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ExcelService } from '../../services/excel.service';
import { CurrencyService } from '../currency/currency.service';
import { BankService } from './bank.service';

@Component({
  selector: 'app-bank',
  templateUrl: './bank.component.html',
  styleUrls: ['./bank.component.scss']
})
export class BankComponent implements OnInit {

  bankId:any;
  enableFilter:boolean =false;
  bankList:any=[];

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
  constructor(private router:Router,private bankService:BankService,private excelService:ExcelService) { 
    
  }

  ngOnInit() {
    this.getAllBank();
    this.moduleList = JSON.parse(sessionStorage.getItem("moduleList"));
    if (this.moduleList) {
      this.moduleList.map((e) => {
        if (e.moduleGroup == 'Company Master' && e.moduleCode == 'BANK') {
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
  

  getAllBank(){
    let list:any =JSON.parse(sessionStorage.getItem("company"));
    var l:any=[];
    for(var i=0;i<list.length;i++){
       l.push(Number(list[i]));
    }
    this.bankService.getAllBank(l).subscribe(success=>{
      this.bankList=success;
    });
  }

  getDataUsingRedioBtn(data){
      this.bankId = data.bankId;
  }

  add(){ 
    this.router.navigate(['/views/masters/bank/add-edit-bank']);
  }
  edit(){ 
    if(this.bankId){
      this.router.navigate(['/views/masters/bank/add-edit-bank'],{queryParams:{id:this.bankId}});
    }
  }
  view(){ 
    if(this.bankId){
      this.router.navigate(['/views/masters/bank/add-edit-bank'],{queryParams:{id:this.bankId,view:true}});
    }
  }
  delete(){ }

  exporttoexcel() {
    let title = "Bank";
  
  
    let exportDataList = Array(this.bankList.length).fill(0).map((x, i) => (
      {
        "Bank": this.bankList[i].name,
        "Swift Code": this.bankList[i].swiftCode,
        "Routing Number": this.bankList[i].routingNo,
        "Description": this.bankList[i].desc,
       
        
  
      }));
  
    this.excelService.exportAsExcelFile(exportDataList, title);
  //  this.excelService.exportAsExcelFile(this.reportSummaryList, "AttendanceSummary");
  
  }
  
}
