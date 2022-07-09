import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ExcelService } from '../../services/excel.service';
import { SectionService } from './section.service';

@Component({
  selector: 'app-section',
  templateUrl: './section.component.html',
  styleUrls: ['./section.component.scss']
})
export class SectionComponent implements OnInit {

  sectionId:any;
  sectionList:any=[];
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
  constructor(private router:Router,private sectionService:SectionService, private excelService:ExcelService) { }
  
  ngOnInit() {
    this.getAllSection();
    this.moduleList = JSON.parse(sessionStorage.getItem("moduleList"));
    if (this.moduleList) {
      this.moduleList.map((e) => {
        if (e.moduleGroup == 'Company Master' && e.moduleName == 'Section') {
          this.flags = { 'createFlag': e.createFlag, 'editFlag': e.editFlag, 'readFlag': e.readFlag, 'deleteFlag': e.deleteFlag,'importFlag': e.importFlag,
          'exportFlag': e.exportFlag,
          'forSelf': e.forSelf };
        }
      });
    }
   }

  getAllSection(){
    let list:any =JSON.parse(sessionStorage.getItem("company"));
    var l:any=[];
    for(var i=0;i<list.length;i++){
       l.push(Number(list[i]));
    }
      this.sectionService.sectionDatabase(l).subscribe(s=>{
          this.sectionList = s;
      });
     // this.sectionList = [{"name":"section1","desc":"description","sectionId":1}];
    
  }



  getDataUsingRedioBtn(data){
    this.sectionId = data.xsectionId;
  }

  add(){ 
    this.router.navigate(['views/masters/section/add-section']);
  }
  edit(){ 
    if(this.sectionId){
      this.router.navigate(['views/masters/section/add-section'],{queryParams:{id:this.sectionId}});
    }
  }
  view(){ 
    if(this.sectionId){
      this.router.navigate(['views/masters/section/add-section'],{queryParams:{id:this.sectionId,view:true}});
    }
  }
  delete(){ }

  search(data){}
  getRows(data){}

  exporttoexcel() {
    let title = "Section";
  
  
    let exportDataList = Array(this.sectionList.length).fill(0).map((x, i) => (
      {
        "Section Name": this.sectionList[i].name,
        "Description": this.sectionList[i].description
       
        
  
      }));
  
    this.excelService.exportAsExcelFile(exportDataList, title);
  //  this.excelService.exportAsExcelFile(this.reportSummaryList, "AttendanceSummary");
  
  }
  
}
