import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ExcelService } from '../../services/excel.service';
import { PayItemService } from './pay-item.service';

@Component({
  selector: 'app-pay-item',
  templateUrl: './pay-item.component.html',
  styleUrls: ['./pay-item.component.scss']
})
export class PayItemComponent implements OnInit {
  payItemList: any = [];
  payItemId:any;
  enableFilter:boolean=false;

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
  constructor(private router: Router, private payItemService:PayItemService, private excelService:ExcelService ) { }

  ngOnInit() {
    this.getPayItemList();

    this.moduleList = JSON.parse(sessionStorage.getItem("moduleList"));
    if (this.moduleList) {
      this.moduleList.map((e) => {
        if (e.moduleGroup == 'Company Master' && e.moduleName == 'Pay Elements') {
         
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

  add() {
    this.router.navigate(['/views/masters/pay-item/add-pay-item'])
  }
  edit(){
    if(this.payItemId){
      this.router.navigate(['/views/masters/pay-item/add-pay-item'],{queryParams:{id:this.payItemId}});
    }
  }
  view(){
    if(this.payItemId){
      this.router.navigate(['/views/masters/pay-item/add-pay-item'],{queryParams:{id:this.payItemId,view:true}});
    }
  }
  delete(){

  }
  getDataUsingRedioBtn(data){
    this.payItemId = data.payItemId;
  }

  getPayItemList() {
    this.payItemService.getPayItemList().subscribe(s => {
      this.payItemList = s;
    })
  }

  exporttoexcel() {
    let title = "Pay_Element";
  
  
    let exportDataList = Array(this.payItemList.length).fill(0).map((x, i) => (
      {
        "Payment Element": this.payItemList[i].name,
        "Pay Unit": this.payItemList[i].units,
        "Type": this.payItemList[i].payType
       
  
      }));
  
    this.excelService.exportAsExcelFile(exportDataList, title);
  //  this.excelService.exportAsExcelFile(this.reportSummaryList, "AttendanceSummary");
  
  }
  

}
