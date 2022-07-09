import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ExcelService } from '../../services/excel.service';
import { SubsectionService } from './subsection.service';

@Component({
  selector: 'app-subsection',
  templateUrl: './subsection.component.html',
  styleUrls: ['./subsection.component.scss']
})
export class SubsectionComponent implements OnInit {

  subsectionId:any;
  subsectionList:any=[];
  enableFilter = false;
  moduleList: any = [];
  flags = {
    createFlag: '',
    editFlag: '',
    readFlag: '',
    deleteFlag: '',
    exportFlag:'',
    importFlag:'',
    forSelf:''
  }
  constructor(private router:Router,private subsectionService:SubsectionService, private excelService:ExcelService) { }
  
  ngOnInit() {
    this.getAllSubsection();
    this.moduleList = JSON.parse(sessionStorage.getItem("moduleList"));
    if (this.moduleList) {
      this.moduleList.map((e) => {
        if (e.moduleGroup == 'Company Master' && e.moduleCode == 'SUBSECTION') {
          this.flags = { 'createFlag': e.createFlag, 'editFlag': e.editFlag, 'readFlag': e.readFlag, 'deleteFlag': e.deleteFlag,'importFlag': e.importFlag,
          'exportFlag': e.exportFlag,
          'forSelf': e.forSelf  };
        }
      });
    }
   }

   getAllSubsection(){ 
     let list:any =JSON.parse(sessionStorage.getItem("company"));
   var l:any=[];
   for(var i=0;i<list.length;i++){
      l.push(Number(list[i]));
   }
      this.subsectionService.subsectionDatabase(l).subscribe(s=>{
          this.subsectionList = s;
      });
  }



  getDataUsingRedioBtn(data){
    this.subsectionId = data.xsubsectionId;
  }

  add(){ 
    this.router.navigate(['views/masters/subsection/add-subsection']);
  }
  edit(){ 
    if(this.subsectionId){
      this.router.navigate(['views/masters/subsection/add-subsection'],{queryParams:{id:this.subsectionId}});
    }
  }
  view(){ 
    if(this.subsectionId){
      this.router.navigate(['views/masters/subsection/add-subsection'],{queryParams:{id:this.subsectionId,view:true}});
    }
  }
  delete(){ }

  search(data){}
  getRows(data){}

  exporttoexcel() {
    let title = "Sub_Section";
  
  
    let exportDataList = Array(this.subsectionList.length).fill(0).map((x, i) => (
      {
        "Sub section Name": this.subsectionList[i].name,
        "Description": this.subsectionList[i].description
       
        
  
      }));
  
    this.excelService.exportAsExcelFile(exportDataList, title);
  //  this.excelService.exportAsExcelFile(this.reportSummaryList, "AttendanceSummary");
  
  }
  
}
