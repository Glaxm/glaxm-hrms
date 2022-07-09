import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ExcelService } from '../../services/excel.service';
import { VechicletranService } from './vechicletran.service';

@Component({
  selector: 'app-vehicletran',
  templateUrl: './vehicletran.component.html',
  styleUrls: ['./vehicletran.component.scss']
})
export class VehicletranComponent implements OnInit {

  vehicletranList: any = [];
  vehicletranId:any;
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

  constructor(private router: Router, private vechicletranService:VechicletranService, private excelService:ExcelService ) { 
   
  }

  ngOnInit() {
    this.getVehicletranList();
    this.moduleList = JSON.parse(sessionStorage.getItem("moduleList"));
    if (this.moduleList) {
      this.moduleList.map((e) => {
        if (e.moduleGroup == 'Company Master' && e.moduleName == 'Vehicle') {
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
    this.router.navigate(['/views/masters/vehicle/add-vehicletran'],{queryParams:{moduleid:this.moduleid}})
  }
  edit(){
    if(this.vehicletranId){
      this.router.navigate(['/views/masters/vehicle/add-vehicletran'],{queryParams:{id:this.vehicletranId,moduleid:this.moduleid}});
    }
  }
  view(){
    if(this.vehicletranId){
      this.router.navigate(['/views/masters/vehicle/add-vehicletran'],{queryParams:{id:this.vehicletranId,view:true,moduleid:this.moduleid}});
    }
  }
  delete(){

  }
  getDataUsingRedioBtn(data){
    this.vehicletranId = data.xEmpvehicleId;
  }

  getVehicletranList() {
    this.vechicletranService.getVehicletranList().subscribe(s => {
      this.vehicletranList = s;
    });
  }

  exporttoexcel() {
    let title = "Vehicle";
  
  
    let exportDataList = Array(this.vehicletranList.length).fill(0).map((x, i) => (
      {
        "Vehicle Registration Number": this.vehicletranList[i].vehiregno,
        "Vehicle Plate Code": this.vehicletranList[i].vehiplatecode,
        "Vehicle Plate Color": this.vehicletranList[i].vehiplateclr,
        "Vehicle Expiry Date": this.vehicletranList[i].vehidateexpiry
   
        
  
      }));
  
    this.excelService.exportAsExcelFile(exportDataList, title);
  //  this.excelService.exportAsExcelFile(this.reportSummaryList, "AttendanceSummary");
  
  }
}
