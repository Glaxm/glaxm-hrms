import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ExcelService } from '../../services/excel.service';
import { ModuleService } from '../module/module.service';
import { DashboardSettingService } from './dashboard-setting.service';

@Component({
  selector: 'app-dashboard-setting',
  templateUrl: './dashboard-setting.component.html',
  styleUrls: ['./dashboard-setting.component.scss']
})
export class DashboardSettingComponent implements OnInit {

  dashboardSettingList:any=[];
  dashboardId:any;
  enableFilter:boolean=false;
  constructor(private router:Router,private dashboardSettingService:DashboardSettingService,private excelService:ExcelService) { }

  ngOnInit() {
    this.dashboardSettingsDateTable();
  }

  dashboardSettingsDateTable(){
    this.dashboardSettingService.dashboardSettingsDateTable().subscribe(s=>{
      this.dashboardSettingList = s;
    })
  }
  add(){ 
    this.router.navigate(['views/dashboard-setting/add-edit-dashboard-setting']);
  }
  edit(){ 
    if(this.dashboardId){
      this.router.navigate(['views/dashboard-setting/add-edit-dashboard-setting'],{queryParams:{id:this.dashboardId}});
    }
  }
  view(){ 
    if(this.dashboardId){
      this.router.navigate(['views/dashboard-setting/add-edit-dashboard-setting'],{queryParams:{id:this.dashboardId,view:true}});
    }
  }
  delete(){ }

  getDataUsingRedioBtn(data){
    this.dashboardId = data.dashboardId;
  }

  exporttoexcel() {
    let title = "Dashboard Settings";
  
    let exportDataList = Array(this.dashboardSettingList.length).fill(0).map((x, i) => (
      {
        "Name": this.dashboardSettingList[i].name,
        "Description": this.dashboardSettingList[i].desc
      }));
  
    this.excelService.exportAsExcelFile(exportDataList, title);
  //  this.excelService.exportAsExcelFile(this.reportSummaryList, "AttendanceSummary");
  
  }


}
