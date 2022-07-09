import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ExcelService } from '../../services/excel.service';
import { JobDefinationService } from './job-defination.service';

@Component({
  selector: 'app-job-defination',
  templateUrl: './job-defination.component.html',
  styleUrls: ['./job-defination.component.scss']
})
export class JobDefinationComponent implements OnInit {

  jobdefinationId:any;
  jobdefinationList:any=[];
  enableFilter = false;

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

  constructor(private router:Router,private jobdefinationService:JobDefinationService, private excelService:ExcelService) { }
  
  ngOnInit() {
    this.getAllJobdefination();
    this.moduleList = JSON.parse(sessionStorage.getItem("moduleList"));
    if (this.moduleList) {
      this.moduleList.map((e) => {
        if (e.moduleGroup == 'Job Management' && e.moduleName == 'Job Definition') {
         
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

  getAllJobdefination(){
      this.jobdefinationService.jobdefinationDatabase().subscribe(s=>{
          this.jobdefinationList = s;
      });
     // this.jobdefinationList = [{"name":"jobdefination1","desc":"description","jobdefinationId":1}];
    
  }



  getDataUsingRedioBtn(data){
    this.jobdefinationId = data.jobdefinationId;
  }

  add(){ 
    this.router.navigate(['views/masters/job-defination/add-job-defination']);
  }
  edit(){ 
    if(this.jobdefinationId){
      this.router.navigate(['views/masters/job-defination/add-job-defination'],{queryParams:{id:this.jobdefinationId}});
    }
  }
  view(){ 
    if(this.jobdefinationId){
      this.router.navigate(['views/masters/job-defination/add-job-defination'],{queryParams:{id:this.jobdefinationId,view:true}});
    }
  }
  delete(){ }

  search(data){}
  getRows(data){}

  exporttoexcel() {
    let title = "job_defination";
  
  
    let exportDataList = Array(this.jobdefinationList.length).fill(0).map((x, i) => (
      {
        "Job Defination ": this.jobdefinationList[i].name,
        "Description": this.jobdefinationList[i].description
       
        
  
      }));
  
    this.excelService.exportAsExcelFile(exportDataList, title);
  //  this.excelService.exportAsExcelFile(this.reportSummaryList, "AttendanceSummary");
  
  }
  

}
