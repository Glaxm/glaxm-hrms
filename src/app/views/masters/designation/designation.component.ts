import { Component, OnInit } from '@angular/core';
import { DesignationService } from './designation.service';
import { Router } from '@angular/router';
import { ExcelService } from '../../services/excel.service';

@Component({
  selector: 'app-designation',
  templateUrl: './designation.component.html',
  styleUrls: ['./designation.component.scss']
})
export class DesignationComponent implements OnInit {
  designList: any = [];
  designId:any;
  enableFilter:boolean=false;
  moduleid:any;
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
  
  constructor(private router: Router, private desigService: DesignationService,private excelService:ExcelService) { }

  ngOnInit() {
    this.getDesignationList();
    
    this.moduleList = JSON.parse(sessionStorage.getItem("moduleList"));
    if (this.moduleList) {
      this.moduleList.map((e) => {
        if (e.moduleGroup == 'Employee Master' && e.moduleName == 'Designation') {
          this.moduleid=e.moduleId;
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
    this.router.navigate(['/views/masters/designation/add-designation'])
  }
  edit(){
    if(this.designId){
      this.router.navigate(['/views/masters/designation/add-designation'],{queryParams:{id:this.designId}});
    }
  }
  view(){
    if(this.designId){
      this.router.navigate(['/views/masters/designation/add-designation'],{queryParams:{id:this.designId,view:true}});
    }
  }
  delete(){

  }
  getDataUsingRedioBtn(data){
    this.designId = data.empDesignationId;
  }

  getDesignationList() {
    this.desigService.getDesignationList().subscribe(s => {
      this.designList = s;
    })
  }
  exporttoexcel() {
    let title = "Designation";
  
  
    let exportDataList = Array(this.designList.length).fill(0).map((x, i) => (
      {
        "Designation": this.designList[i].name,
        
        "Description": this.designList[i].description
        
  
      }));
  
    this.excelService.exportAsExcelFile(exportDataList, title);
  //  this.excelService.exportAsExcelFile(this.reportSummaryList, "AttendanceSummary");
  
  }
  
}
