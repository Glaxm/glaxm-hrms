import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ExcelService } from '../../services/excel.service';
import { ModuleService } from './module.service';

@Component({
  selector: 'app-module',
  templateUrl: './module.component.html',
  styleUrls: ['./module.component.scss']
})
export class ModuleComponent implements OnInit {

  moduleList:any=[];
  moduleId:any;
  enableFilter:boolean=false;
  constructor(private router:Router,private moduleService:ModuleService,private excelService:ExcelService) { }

  ngOnInit() {
    this.moduleDateTable();
  }

  // roleDateTable(){
  //   this.moduleService.moduleDateTable().subscribe(s=>{
  //     this.moduleList = s;
  //   })
  // }
  add(){ 
    this.router.navigate(['views/module/add-edit-module']);
  }
  edit(){ 
    if(this.moduleId){
      this.router.navigate(['views/module/add-edit-module'],{queryParams:{id:this.moduleId}});
    }
  }
  view(){ 
    if(this.moduleId){
      this.router.navigate(['views/module/add-edit-module'],{queryParams:{id:this.moduleId,view:true}});
    }
  }
  delete(){ }

  // getDataUsingRedioBtn(data){
  //   this.moduleId = data.moduleId;
  // }

  exporttoexcel() {
    let title = "Module";
  
    
 
    this.moduleService.moduleExport(this.searchDataStr).subscribe(data=>{

    var modeldatalist: any = data;
    if(modeldatalist){
      let exportDataList = Array(modeldatalist.length).fill(0).map((x, i) => (
      {
        "Module Code": modeldatalist[i].moduleCode,
        "Module Name": modeldatalist[i].moduleName,
        "Module Url": modeldatalist[i].moduleUrl,
        "Module Group": modeldatalist[i].moduleGroup,
        "Status": modeldatalist[i].status
      }));
       this.excelService.exportAsExcelFile(exportDataList, title);
    }
    })
  
    // let exportDataList = Array(this.moduleList.length).fill(0).map((x, i) => (
    //   {
    //     "Module Code": this.moduleList[i].moduleCode,
    //     "Module Name": this.moduleList[i].moduleName,
    //     "Module Url": this.moduleList[i].moduleUrl,
    //     "Module Group": this.moduleList[i].moduleGroup,
    //     "Status": this.moduleList[i].status
      
        
  
    //   }));
  
    // this.excelService.exportAsExcelFile(exportDataList, title);
  //  this.excelService.exportAsExcelFile(this.reportSummaryList, "AttendanceSummary");
  
  }

   //============================================ Datatable

   data: any = [];
   moduleDateTable() {
     this.moduleService.moduleDatatable().subscribe(s => {
     this.data = s;
     });
    }
   
   searchDataStr: any; 
   search(data) {
      this.data = {};
      this.searchDataStr=data;
      this.moduleService.moduleDatatable1(data).subscribe(s => {
      this.data = s;
     });
 
    }
 
 
    getRows(data){
     this.moduleId = data.moduleId;
     if(data.key==""){
     } else{
      this.edit();
    }
    }
  
}
