import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ExcelService } from '../../services/excel.service';
import { AccommodationService } from './accommodation.service';

@Component({
  selector: 'app-accommodationmaster',
  templateUrl: './accommodation.master.component.html',
  styleUrls: ['./accommodation.master.component.scss']
})
export class AccommodationMasterComponent implements OnInit {

  accommodationList: any = [];
  accommodationId:any;
  employeeList:any =[];
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


  constructor(private router: Router, private accommodationService:AccommodationService ,private excelService:ExcelService) {
    
    this.moduleList = JSON.parse(sessionStorage.getItem("moduleList"));
    if (this.moduleList) {
      this.moduleList.map((e) => {
        if (e.moduleGroup == 'Company Master' && e.moduleName == 'Accomodation') {
         this.moduleid=e.moduleId;
          this.flags = { 
                'createFlag': e.createFlag, 
                'editFlag': e.editFlag, 
                'readFlag': e.readFlag, 
                'deleteFlag': e.deleteFlag,
                'importFlag': e.importFlag,
                'exportFlag': e.exportFlag,
                'forSelf' : e.forSelf
                };
        }
      });
    }
   }

  ngOnInit() {
    this.getAccommodationList();
  }

  add() {
    this.router.navigate(['/views/masters/accomodation/add-accommodation'],{queryParams:{moduleid:this.moduleid}})
  }
  edit(){
    if(this.accommodationId){
      this.router.navigate(['/views/masters/accomodation/add-accommodation'],{queryParams:{id:this.accommodationId,moduleid:this.moduleid}});
    }
  }
  view(){
    if(this.accommodationId){
      this.router.navigate(['/views/masters/accomodation/add-accommodation'],{queryParams:{id:this.accommodationId,view:true,moduleid:this.moduleid}});
    }
  }
  delete(){

  }
  getDataUsingRedioBtn(data){
    this.accommodationId = data.lEmpaccoId;
  }

  getAccommodationList() {
    let list:any =JSON.parse(sessionStorage.getItem("company"));
    var l:any=[];
    for(var i=0;i<list.length;i++){
       l.push(Number(list[i]));
    }
    this.accommodationService.getAccommodationList(l).subscribe(s => {
      this.accommodationList = s;
    });
  }

  exporttoexcel() {
    let title = "Accomodation";
  
  
    let exportDataList = Array(this.accommodationList.length).fill(0).map((x, i) => (
      {
        "Flat No./ Room Number": this.accommodationList[i].flatnumber
     
        
  
      }));
  
    this.excelService.exportAsExcelFile(exportDataList, title);
  //  this.excelService.exportAsExcelFile(this.reportSummaryList, "AttendanceSummary");

    }
}
