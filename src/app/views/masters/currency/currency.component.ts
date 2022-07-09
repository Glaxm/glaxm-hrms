import { Component, OnInit } from '@angular/core';
import { CompanyService } from '../company/company.service';
import { Router } from '@angular/router';
import { CurrencyService } from './currency.service';
import { ExcelService } from '../../services/excel.service';

@Component({
  selector: 'app-currency',
  templateUrl: './currency.component.html',
  styleUrls: ['./currency.component.scss']
})
export class CurrencyComponent implements OnInit {
  currencyId:any;
  enableFilter:boolean =false;
  currencyList:any=[];

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

  constructor(private router:Router,private currService:CurrencyService, private excelService:ExcelService) { 
    
  }

  ngOnInit() {
    this.getAllCurrency();

    this.moduleList = JSON.parse(sessionStorage.getItem("moduleList"));
    if (this.moduleList) {
      this.moduleList.map((e) => {
        if (e.moduleGroup == 'Company Master' && e.moduleName == 'Currency') {
         
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
  

  getAllCurrency(){
    this.currService.getAllCurrency().subscribe(success=>{
        this.currencyList=success;
    });
  }

  getDataUsingRedioBtn(data){
      this.currencyId = data.currencyId;
  }

  add(){ 
    this.router.navigate(['/views/masters/currency/add-edit-currency']);
  }
  edit(){ 
    if(this.currencyId){
      this.router.navigate(['/views/masters/currency/add-edit-currency'],{queryParams:{id:this.currencyId}});
    }
  }
  view(){ 
    if(this.currencyId){
      this.router.navigate(['/views/masters/currency/add-edit-currency'],{queryParams:{id:this.currencyId,view:true}});
    }
  }
  delete(){ }

  exporttoexcel() {
    let title = "Curreny";
    let exportDataList = Array(this.currencyList.length).fill(0).map((x, i) => (
      {
        "Currency Code": this.currencyList[i].isoCode,
        "Currency Symbol": this.currencyList[i].curSymbol,
        "Description": this.currencyList[i].desc
      }));
  
    this.excelService.exportAsExcelFile(exportDataList, title);
  //  this.excelService.exportAsExcelFile(this.reportSummaryList, "AttendanceSummary");
  }

  
}
