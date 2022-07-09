import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ExcelService } from '../../services/excel.service';
import { JobcardService } from './jobcard.service';

@Component({
  selector: 'app-jobcard',
  templateUrl: './jobcard.component.html',
  styleUrls: ['./jobcard.component.scss']
})
export class JobcardComponent implements OnInit {

  jobcardList: any = [];
  jobcardId:any;
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
  forSelf:''
}

  constructor(private router: Router, private activatedRoute:ActivatedRoute,private jobcardService:JobcardService,
    private excelService:ExcelService ) {
     
      this.moduleList = JSON.parse(sessionStorage.getItem("moduleList"));
      if (this.moduleList) {
        this.moduleList.map((e) => {
          if (e.moduleGroup == 'Job Management' && e.moduleName == 'Job Card') {
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
   this.getJobCardList();
  }

  getJobCardList(){
    this.jobcardService.getJobCardList().subscribe(data=>{
        this.jobcardList = data;
    })
  }

  add() {
    this.router.navigate(['/views/masters/jobcard/add-jobcard'],{queryParams:{moduleid:this.moduleid}})
  }
  edit(){
    // if(this.jobcardId){
      // this.router.navigate(['/views/masters/jobcard/add-jobcard'],{queryParams:{id:this.jobcardId}});
      if(this.jobcardId){
        this.router.navigate(['/views/masters/jobcard/add-jobcard'],{queryParams:{id:this.jobcardId,moduleid:this.moduleid}});
      }
    // }
  }
  view(){
    if(this.jobcardId){
      this.router.navigate(['/views/masters/jobcard/add-jobcard'],{queryParams:{id:this.jobcardId,view:true,moduleid:this.moduleid}});
    }
  }
  delete(){

  }
  getDataUsingRedioBtn(data){
    this.jobcardId = data.ljobcardId;
  }



  exporttoexcel() {
    let title = "Job_Card";
  
  
    let exportDataList = Array(this.jobcardList.length).fill(0).map((x, i) => (
      {
        "Job card": this.jobcardList[i].name,
       
        "Description": this.jobcardList[i].description
        
  
      }));
  
    this.excelService.exportAsExcelFile(exportDataList, title);
  //  this.excelService.exportAsExcelFile(this.reportSummaryList, "AttendanceSummary");
  
  }
  
  

}
