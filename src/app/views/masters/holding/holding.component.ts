import { Component, OnInit } from '@angular/core';
import { HoldingService } from './holding.service';
import { Router } from '@angular/router';
import { ExcelService } from '../../services/excel.service';

@Component({
  selector: 'app-holding',
  templateUrl: './holding.component.html',
  styleUrls: ['./holding.component.scss']
})
export class HoldingComponent implements OnInit {
  holdingList:any = [];
  holdingId:any;
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

  constructor(private holdingService:HoldingService, private router:Router, private excelService:ExcelService) { }
  
  ngOnInit() { 
    this.getAllHolding();
    this.moduleList = JSON.parse(sessionStorage.getItem("moduleList"));
    if (this.moduleList) {
      this.moduleList.map((e) => {
        if (e.moduleGroup == 'Company Master' && e.moduleName == 'Holding') {
         
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
  getAllHolding(){
    this.holdingService.getAllHolding().subscribe(success=>{
       this.holdingList = success; 
    });
  }

  add(){ 
    this.router.navigate(['views/masters/holding/add-edit-holding']);
  }
  edit(){ 
   
    if(this.holdingId==0 || this.holdingId){
    
      this.router.navigate(['views/masters/holding/add-edit-holding'],{queryParams:{id:this.holdingId}});
    }
  }
  view(){ 
    if(this.holdingId){
      this.router.navigate(['views/masters/holding/add-edit-holding'],{queryParams:{id:this.holdingId,view:true}});
    }
  }
  delete(){ }

  getDataUsingRedioBtn(data){
    this.holdingId = data.gHoldingId;
  }
  
  exporttoexcel() {
    let title = "Holding";
  
  
    let exportDataList = Array(this.holdingList.length).fill(0).map((x, i) => (
      {
        "Holding Name": this.holdingList[i].name,
        "Description": this.holdingList[i].description
       
  
      }));
  
    this.excelService.exportAsExcelFile(exportDataList, title);
  //  this.excelService.exportAsExcelFile(this.reportSummaryList, "AttendanceSummary");
  
  }
}
