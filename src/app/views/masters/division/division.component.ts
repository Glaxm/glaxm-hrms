import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ExcelService } from '../../services/excel.service';
import { DivisionService } from './division.service';

@Component({
  selector: 'app-division',
  templateUrl: './division.component.html',
  styleUrls: ['./division.component.scss']
})
export class DivisionComponent implements OnInit {

  divisionId:any;
  divisionList:any=[];
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
  constructor(private router:Router,private divisionService:DivisionService, private excelService:ExcelService) { }
  
  ngOnInit() {
    this.getAllDivision();
    this.moduleList = JSON.parse(sessionStorage.getItem("moduleList"));
    if (this.moduleList) {
      this.moduleList.map((e) => {
        if (e.moduleGroup == 'Company Master' && e.moduleCode == 'DIVISION') {
          this.flags = { 'createFlag': e.createFlag, 'editFlag': e.editFlag, 'readFlag': e.readFlag, 'deleteFlag': e.deleteFlag,'importFlag': e.importFlag,
          'exportFlag': e.exportFlag,
          'forSelf': e.forSelf
           };
        }
      });
    }
   }

  getAllDivision(){
    let list:any =JSON.parse(sessionStorage.getItem("company"));
    var l:any=[];
    for(var i=0;i<list.length;i++){
       l.push(Number(list[i]));
    }
      this.divisionService.getAllDivision(l).subscribe(s=>{
          this.divisionList = s;
      });
   //   this.divisionList = [{"name":"division1","desc":"desc","divisionId":1}];
    
  }

  
  divisionDatabase(){
    this.divisionService.divisionDatabase().subscribe(s=>{
      
    });        
  }



  getDataUsingRedioBtn(data){
    this.divisionId = data.xdivId;
  }

  add(){ 
    this.router.navigate(['views/masters/division/add-division']);
  }
  edit(){ 
    if(this.divisionId){
      this.router.navigate(['views/masters/division/add-division'],{queryParams:{id:this.divisionId}});
    }
  }
  view(){ 
    if(this.divisionId){
      this.router.navigate(['views/masters/division/add-division'],{queryParams:{id:this.divisionId,view:true}});
    }
  }
  delete(){ }

  search(data){}
  getRows(data){}

  exporttoexcel() {
    let title = "Division";
  
  
    let exportDataList = Array(this.divisionList.length).fill(0).map((x, i) => (
      {
        "Division Name": this.divisionList[i].name,
        "Description": this.divisionList[i].description
       
        
  
      }));
  
    this.excelService.exportAsExcelFile(exportDataList, title);
  //  this.excelService.exportAsExcelFile(this.reportSummaryList, "AttendanceSummary");
  
  }
  
}
