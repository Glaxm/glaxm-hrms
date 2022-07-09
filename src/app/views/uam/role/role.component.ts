import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RoleService } from './role.service';
import { stringify } from 'querystring';
import { ExcelService } from '../../services/excel.service';

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.scss']
})
export class RoleComponent implements OnInit {
  roleList:any=[];
  roleId:any;
  enableFilter:boolean=false;
  constructor(private router:Router,private roleService:RoleService,private excelService:ExcelService) { }

  ngOnInit() {
    this.roleDateTable();
  }

  // roleDateTable(){
  //   this.roleService.roleDateTable().subscribe(s=>{
  //     this.roleList = s;
  //   })
  // }
  add(){ 
    this.router.navigate(['views/role/add-edit-role']);
  }
  edit(){ 
    if(this.roleId){
      this.router.navigate(['views/role/add-edit-role'],{queryParams:{id:this.roleId}});
    }
  }
  view(){ 
    if(this.roleId){
      this.router.navigate(['views/role/add-edit-role'],{queryParams:{id:this.roleId,view:true}});
    }
  }
  delete(){ }

  // getDataUsingRedioBtn(data){
  //   this.roleId = data.roleId;
  // }

  exporttoexcel() {
    let title = "Role";
  
    this.roleService.roleExport(this.searchDataStr).subscribe(data=>{

      var roledatalist: any = data;
      if(roledatalist){
        let exportDataList = Array(roledatalist.length).fill(0).map((x, i) => (
        {
          "Role": roledatalist[i].roleName,
          "Start Date": roledatalist[i].startDate,
          "End Date": roledatalist[i].endDate,
          "Description": roledatalist[i].description,
          "Status ": roledatalist[i].status
        }));
         this.excelService.exportAsExcelFile(exportDataList, title);
      }
      })
  
    // let exportDataList = Array(this.roleList.length).fill(0).map((x, i) => (
    //   {
    //     "Role": this.roleList[i].roleName,
    //     "Start Date": this.roleList[i].startDate,
    //     "End Date": this.roleList[i].endDate,
    //     "Description": this.roleList[i].description,
    //     "Status ": this.roleList[i].status
      
    //   }));
  
    // this.excelService.exportAsExcelFile(exportDataList, title);
  //  this.excelService.exportAsExcelFile(this.reportSummaryList, "AttendanceSummary");
  
  }

   //============================================ Datatable

   data: any = [];
   roleDateTable() {
     this.roleService.roledatatable().subscribe(s => {
     this.data = s;
     });
    }
   
   searchDataStr: any; 
   search(data) {
      this.data = {};
      this.searchDataStr=data;
      this.roleService.roledatatable1(data).subscribe(s => {
      this.data = s;
     });
 
    }
 
 
    getRows(data){
     this.roleId = data.roleId;
     if(data.key==""){
     } else{
      this.edit();
    }
    }
   
  

}
