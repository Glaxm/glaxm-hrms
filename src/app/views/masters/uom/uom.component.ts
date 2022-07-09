import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ExcelService } from '../../services/excel.service';
import { UomService } from './uom.service';

@Component({
  selector: 'app-uom',
  templateUrl: './uom.component.html',
  styleUrls: ['./uom.component.scss']
})
export class UomComponent implements OnInit {

  uomId:any;
  enableFilter:boolean =false;
  uomList:any=[];

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


  constructor(private router:Router,private uomService:UomService, private excelService:ExcelService) { 
    
  }

  ngOnInit() {
    this.getAllUom();
    
 this.moduleList = JSON.parse(sessionStorage.getItem("moduleList"));
 if (this.moduleList) {
   this.moduleList.map((e) => {
     if (e.moduleGroup == 'Company Master' && e.moduleName == 'Unit of Measure') {
      
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
  

  getAllUom(){
    this.uomService.getAllUom().subscribe(success=>{
        this.uomList=success;
    });
  }

  getDataUsingRedioBtn(data){
      this.uomId = data.xunitmeasureId;
  }

  add(){ 
    this.router.navigate(['/views/masters/uom/add-uom']);
  }
  edit(){ 
    if(this.uomId){
      this.router.navigate(['/views/masters/uom/add-uom'],{queryParams:{id:this.uomId}});
    }
  }
  view(){ 
    if(this.uomId){
      this.router.navigate(['/views/masters/uom/add-uom'],{queryParams:{id:this.uomId,view:true}});
    }
  }
  delete(){ }

  exporttoexcel() {
    let title = "Uom";
  
  
    let exportDataList = Array(this.uomList.length).fill(0).map((x, i) => (
      {
        "uom ": this.uomList[i].isoCode,
        "uom Symbol": this.uomList[i].curSymbol,
        "Description": this.uomList[i].desc
       
        
  
      }));
  
    this.excelService.exportAsExcelFile(exportDataList, title);
  //  this.excelService.exportAsExcelFile(this.reportSummaryList, "AttendanceSummary");
  
  }


}
