import { Component, OnInit } from '@angular/core';
import { EmpGradeService } from './emp-grade.service';
import { Router } from '@angular/router';
import { ExcelService } from '../../services/excel.service';

@Component({
  selector: 'app-emp-grade',
  templateUrl: './emp-grade.component.html',
  styleUrls: ['./emp-grade.component.scss']
})
export class EmpGradeComponent implements OnInit {

  empGradeList:any =[];
  empGradeId:any;
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
  constructor(private empGradeService:EmpGradeService,private router:Router,private excelService:ExcelService) { }

  ngOnInit() {
    this.getEmpGradeList();
    this.moduleList = JSON.parse(sessionStorage.getItem("moduleList"));
    if (this.moduleList) {
      this.moduleList.map((e) => {
        if (e.moduleGroup == 'Employee Master' && e.moduleName == 'Employee Grade') {
         
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

  getDataUsingRedioBtn(data){
    this.empGradeId = data.empGradeId;
  }

  getEmpGradeList(){
      this.empGradeService.getEmpGradeList().subscribe(success=>{
        this.empGradeList = success;
      });
  }

  add(){ 
    this.router.navigate(['views/masters/empgrade/add-empgrade']);
  }
  edit(){ 
    if(this.empGradeId){
     this.router.navigate(['views/masters/empgrade/add-empgrade'],{queryParams:{id:this.empGradeId}});
    }
  }
  view(){ 
    if(this.empGradeId){
      this.router.navigate(['views/masters/empgrade/add-empgrade'],{queryParams:{id:this.empGradeId,view:true}});
    }
  }
  delete(){ }

  exporttoexcel() {
    let title = "Employee_Grade";
  
  
    let exportDataList = Array(this.empGradeList.length).fill(0).map((x, i) => (
      {
        "Employee Grade Name": this.empGradeList[i].name,
        
        "Description": this.empGradeList[i].description
        
  
      }));
  
    this.excelService.exportAsExcelFile(exportDataList, title);
  //  this.excelService.exportAsExcelFile(this.reportSummaryList, "AttendanceSummary");
  
  }
  

}
