import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ExcelService } from '../../services/excel.service';
import { AssetgroupService } from './assetgroup.service';

@Component({
  selector: 'app-assetgroup',
  templateUrl: './assetgroup.component.html',
  styleUrls: ['./assetgroup.component.scss']
})
export class AssetgroupComponent implements OnInit {

  assetgroupList: any = [];
  assetgroupId:any;
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

  constructor(private router: Router, private assetgroupService:AssetgroupService, private excelService:ExcelService ) { }
 
  ngOnInit() {
    this.getAssetgroupList();
    this.moduleList = JSON.parse(sessionStorage.getItem("moduleList"));
    if (this.moduleList) {
      this.moduleList.map((e) => {
        if (e.moduleGroup == 'Asset' && e.moduleName == 'Asset Group') {
         
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
    this.router.navigate(['/views/masters/assetgroup/add-assetgroup'])
  }
  edit(){
    if(this.assetgroupId){
      this.router.navigate(['/views/masters/assetgroup/add-assetgroup'],{queryParams:{id:this.assetgroupId}});
    }
  }
  view(){
    if(this.assetgroupId){
      this.router.navigate(['/views/masters/assetgroup/add-assetgroup'],{queryParams:{id:this.assetgroupId,view:true}});
    }
  }
  delete(){

  }
  getDataUsingRedioBtn(data){
    this.assetgroupId = data.x_ASSET_GROUP_ID;
  }

  getAssetgroupList() {
    this.assetgroupService.getAssetgroupList().subscribe(s => {
      this.assetgroupList = s;
    });
  }

  exporttoexcel() {
    let title = "Asset_Group";
  
  
    let exportDataList = Array(this.assetgroupList.length).fill(0).map((x, i) => (
      {
        "Group Name": this.assetgroupList[i].name,
        "Group Code": this.assetgroupList[i].code
        
        
  
      }));
  
    this.excelService.exportAsExcelFile(exportDataList, title);
  //  this.excelService.exportAsExcelFile(this.reportSummaryList, "AttendanceSummary");
  
  }

}
