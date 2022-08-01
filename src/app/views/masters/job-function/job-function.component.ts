import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ExcelService } from '../../services/excel.service';
import { JobFunctionService } from './job-function.service';

@Component({
  selector: 'app-job-function',
  templateUrl: './job-function.component.html',
  styleUrls: ['./job-function.component.scss']
})
export class JobFunctionComponent implements OnInit {
  jobFunList: any = [];
  jobFunId:any;
  enableFilter:boolean=false;

  moduleList: any = [];
  moduleid:any;
  flags = {
    createFlag: '',
    editFlag: '',
    readFlag: '',
    deleteFlag: '',
    exportFlag:'',
    importFlag:'',
    forSelf: ''
  }

  constructor(private router: Router, private jobFunService:JobFunctionService,private excelService:ExcelService ) { 
    this.moduleList = JSON.parse(sessionStorage.getItem("moduleList"));
    if (this.moduleList) {
      this.moduleList.map((e) => {
        if (e.moduleGroup == 'Employee Master' && e.moduleName == 'Job Role') {
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

  ngOnInit() {
    this.getJobFunList();
  }

  add() {
    this.router.navigate(['/views/masters/jobfunction/add-jobfunction'])
  }
  edit(){
    if(this.jobFunId){
      this.router.navigate(['/views/masters/jobfunction/add-jobfunction'],{queryParams:{id:this.jobFunId}});
    }
  }
  view(){
    if(this.jobFunId){
      this.router.navigate(['/views/masters/jobfunction/add-jobfunction'],{queryParams:{id:this.jobFunId,view:true}});
    }
  }
  delete(){

  }
  getDataUsingRedioBtn(data){
    this.jobFunId = data.jobfunctionId;
  }

  getJobFunList() {
    // let list:any = JSON.parse(sessionStorage.getItem("company"));
    // var l:any=[];
    // for(var i=0;i<list.length;i++){
    //     l.push(Number(list[i]));
    // }
    this.jobFunService.getJobFunList().subscribe(s => {
      this.jobFunList = s;
    })
  }

  exporttoexcel() {
    let title = "Job_Role";
  
  
    let exportDataList = Array(this.jobFunList.length).fill(0).map((x, i) => (
      {
        "Job Role": this.jobFunList[i].name,
       
        "Description": this.jobFunList[i].description
        
  
      }));
  
    this.excelService.exportAsExcelFile(exportDataList, title);
  //  this.excelService.exportAsExcelFile(this.reportSummaryList, "AttendanceSummary");
  
  }
  
  
}
