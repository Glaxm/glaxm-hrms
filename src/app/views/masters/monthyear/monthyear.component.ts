import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ExcelService } from '../../services/excel.service';
import { MonthyearService } from './monthyear.service';

@Component({
  selector: 'app-monthyear',
  templateUrl: './monthyear.component.html',
  styleUrls: ['./monthyear.component.scss']
})
export class MonthyearComponent implements OnInit {

  monthyearId:any;
  enableFilter:boolean =false;
  bankList:any=[];
  monthyearList: any;

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
  moduleId:any;

  constructor(private router:Router,private monthyearService:MonthyearService, private excelService:ExcelService) { }

  ngOnInit() {
    this.getAllMonthyear();
    this.moduleList = JSON.parse(sessionStorage.getItem("moduleList"));
    if (this.moduleList) {
      this.moduleList.map((e) => {
        if (e.moduleGroup == 'Company Master' && e.moduleName == 'Financial Year') {
          this.moduleId = e.moduleId;
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

  getAllMonthyear() {
     this.monthyearService.getAllMonthyear().subscribe(success=>{
      this.monthyearList=success;
    });
  }

  getDataUsingRedioBtn(data){
    this.monthyearId = data.monthId;
}

add(){ 
  this.router.navigate(['/views/masters/monthyear/add-monthyear'],{queryParams:{moduleId:this.moduleId}});
}
edit(){ 
  if(this.monthyearId){
    this.router.navigate(['/views/masters/monthyear/add-monthyear'],{queryParams:{id:this.monthyearId,moduleId:this.moduleId}});
  }
}
view(){ 
  if(this.monthyearId){
    this.router.navigate(['/views/masters/monthyear/add-monthyear'],{queryParams:{id:this.monthyearId,moduleId:this.moduleId,view:true}});
  }
}
delete(){ }

exporttoexcel() {
  let title = "Financial_Year";


  let exportDataList = Array(this.monthyearList.length).fill(0).map((x, i) => (
    {
      "No": this.monthyearList[i].monthNo,
      "Month Year": this.monthyearList[i].name,
      "Year": this.monthyearList[i].yearId
     
      

    }));

  this.excelService.exportAsExcelFile(exportDataList, title);
//  this.excelService.exportAsExcelFile(this.reportSummaryList, "AttendanceSummary");

}

}
