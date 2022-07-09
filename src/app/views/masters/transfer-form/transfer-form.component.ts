import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TransferFormService } from './transfer-form.service';

@Component({
  selector: 'app-transfer-form',
  templateUrl: './transfer-form.component.html',
  styleUrls: ['./transfer-form.component.scss']
})
export class TransferFormComponent implements OnInit {

  xupdatetrackrId:any;
  dateTrackingList:any=[];
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
  moduleid:any;
  constructor(private router:Router,private transferFormService: TransferFormService) { }
  
  ngOnInit() {
    this.dataTable();
    this.moduleList = JSON.parse(sessionStorage.getItem("moduleList"));
    if (this.moduleList) {
      this.moduleList.map((e) => {
        if (e.moduleGroup == 'Transactions' && e.moduleCode == 'TRANSFERFORM') {
          this.moduleid = e.moduleId;
          this.flags = { 'createFlag': e.createFlag, 'editFlag': e.editFlag, 'readFlag': e.readFlag, 'deleteFlag': e.deleteFlag,'importFlag': e.importFlag,
          'exportFlag': e.exportFlag,
          'forSelf': e.forSelf };
        }
      });
    }
   }


  getDataUsingRedioBtn(data){
    this.xupdatetrackrId = data.xupdatetrackrId;
  }

  add(){ 
    this.router.navigate(['views/masters/transfer-form/add-edit-transfer-form'],{ queryParams: { moduleid:this.moduleid } });
  }
  edit(){ 
    if(this.xupdatetrackrId){
      this.router.navigate(['views/masters/transfer-form/add-edit-transfer-form'],{queryParams:{id:this.xupdatetrackrId,moduleid:this.moduleid}});
    }
  }
  view(){ 
    if(this.xupdatetrackrId){
      this.router.navigate(['views/masters/transfer-form/add-edit-transfer-form'],{queryParams:{id:this.xupdatetrackrId,view:true,moduleid:this.moduleid}});
    }
  }
  delete(){ }


  exporttoexcel() {
    let title = "Sub_Section";
  
  
    let exportDataList = Array(this.dateTrackingList.length).fill(0).map((x, i) => (
      {
        "Sub section Name": this.dateTrackingList[i].name,
        "Description": this.dateTrackingList[i].description
       
        
  
      }));
  
    // this.excelService.exportAsExcelFile(exportDataList, title);
  //  this.excelService.exportAsExcelFile(this.reportSummaryList, "AttendanceSummary");
  
  }

  //============================================ Datatable

  data: any = [];
  dataTable() {
    this.transferFormService.userdatatable().subscribe(s => {
    this.data = s;
    });
   }
  
  searchDataStr: any; 
  search(data) {
     this.data = {};
     this.searchDataStr=data;
     this.transferFormService.userdatatable1(data).subscribe(s => {
     this.data = s;
    });
   }


   getRows(data){
   this.xupdatetrackrId = data.xupdatetrackrId;
    if(data.key==""){
    } else{
     this.edit();
   }
   }



}
