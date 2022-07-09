import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ExcelService } from '../../services/excel.service';
import { EduCatService } from './edu-cat.service';

@Component({
  selector: 'app-edu-cat',
  templateUrl: './edu-cat.component.html',
  styleUrls: ['./edu-cat.component.scss']
})
export class EduCatComponent implements OnInit {
  eduCatList: any = [];
  eduCatId:any;
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
  constructor(private router: Router, private eduCatService:EduCatService, private excelService:ExcelService ) { }

  ngOnInit() {
    this.getEduCatList();

    this.moduleList = JSON.parse(sessionStorage.getItem("moduleList"));
    if (this.moduleList) {
      this.moduleList.map((e) => {
        if (e.moduleGroup == 'Employee Master' && e.moduleName == 'Academic') {
         
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
    this.router.navigate(['/views/masters/edu-cat/add-edu-cat'])
  }
  edit(){
    if(this.eduCatId){
      this.router.navigate(['/views/masters/edu-cat/add-edu-cat'],{queryParams:{id:this.eduCatId}});
    }
  }
  view(){
    if(this.eduCatId){
      this.router.navigate(['/views/masters/edu-cat/add-edu-cat'],{queryParams:{id:this.eduCatId,view:true}});
    }
  }
  delete(){

  }
  getDataUsingRedioBtn(data){
    this.eduCatId = data.eduCategoryId;
  }

  getEduCatList() {
    this.eduCatService.getEduCatList().subscribe(s => {
      this.eduCatList = s;
    });
  }

  exporttoexcel() {
    let title = "Academic";
  
  
    let exportDataList = Array(this.eduCatList.length).fill(0).map((x, i) => (
      {
        "Degree & Qualification": this.eduCatList[i].name,
        "Description": this.eduCatList[i].description
      
  
      }));
  
    this.excelService.exportAsExcelFile(exportDataList, title);
  //  this.excelService.exportAsExcelFile(this.reportSummaryList, "AttendanceSummary");
  
  }
}
