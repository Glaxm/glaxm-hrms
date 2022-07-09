import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ExcelService } from '../../services/excel.service';
import { SkillsService } from './skills.service';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.scss']
})
export class SkillsComponent implements OnInit {
  skillsList: any = [];
  empskillId:any;
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
  constructor(private router: Router, private skillsService:SkillsService,private excelService:ExcelService ) { }

  ngOnInit() {
    this.getSkillsList();
    this.moduleList = JSON.parse(sessionStorage.getItem("moduleList"));
    if (this.moduleList) {
      this.moduleList.map((e) => {
        if (e.moduleGroup == 'Employee Master' && e.moduleName == 'Employee Skills') {
         
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
    this.router.navigate(['/views/masters/skills/add-skills'])
  }
  edit(){
    if(this.empskillId){
      this.router.navigate(['/views/masters/skills/add-skills'],{queryParams:{id:this.empskillId}});
    }
  }
  view(){
    if(this.empskillId){
      this.router.navigate(['/views/masters/skills/add-skills'],{queryParams:{id:this.empskillId,view:true}});
    }
  }
  delete(){

  }
  getDataUsingRedioBtn(data){
    this.empskillId = data.empskillId;
  }

  getSkillsList() {
    this.skillsService.getSkillsList().subscribe(s => {
      this.skillsList = s;
    });
  }

  exporttoexcel() {
    let title = "Employee_Skills";
  
  
    let exportDataList = Array(this.skillsList.length).fill(0).map((x, i) => (
      {
        "Name": this.skillsList[i].name,
       
        "Description": this.skillsList[i].description
        
  
      }));
  
    this.excelService.exportAsExcelFile(exportDataList, title);
  //  this.excelService.exportAsExcelFile(this.reportSummaryList, "AttendanceSummary");
  
  }
}
