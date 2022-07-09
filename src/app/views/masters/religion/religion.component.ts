import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ExcelService } from '../../services/excel.service';
import { ReligionService } from './religion.service';

@Component({
  selector: 'app-religion',
  templateUrl: './religion.component.html',
  styleUrls: ['./religion.component.scss']
})
export class ReligionComponent implements OnInit {
  religionList: any = [];
  religionId:any;
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

  constructor(private router: Router, private religionService:ReligionService, private excelService:ExcelService ) { }

  ngOnInit() {
    this.getReligionList();
    
 this.moduleList = JSON.parse(sessionStorage.getItem("moduleList"));
 if (this.moduleList) {
   this.moduleList.map((e) => {
     if (e.moduleGroup == 'Company Master' && e.moduleName == 'Religion') {
      
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
    this.router.navigate(['/views/masters/religion/add-religion'])
  }
  edit(){
    if(this.religionId){
      this.router.navigate(['/views/masters/religion/add-religion'],{queryParams:{id:this.religionId}});
    }
  }
  view(){
    if(this.religionId){
      this.router.navigate(['/views/masters/religion/add-religion'],{queryParams:{id:this.religionId,view:true}});
    }
  }
  delete(){

  }
  getDataUsingRedioBtn(data){
    this.religionId = data.religionId;
  }

  getReligionList() {
    this.religionService.getReligionList().subscribe(s => {
      this.religionList = s;
    });
  }

  exporttoexcel() {
    let title = "Religion";
  
  
    let exportDataList = Array(this.religionList.length).fill(0).map((x, i) => (
      {
        "Name": this.religionList[i].name,
        "Description": this.religionList[i].description
       
        
  
      }));
  
    this.excelService.exportAsExcelFile(exportDataList, title);
  //  this.excelService.exportAsExcelFile(this.reportSummaryList, "AttendanceSummary");
  
  }

}
