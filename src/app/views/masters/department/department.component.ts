import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ExcelService } from '../../services/excel.service';
import { DepatmentService } from './depatment.service';

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.scss']
})
export class DepartmentComponent implements OnInit {

  deptId:any;
  deptList:any=[];
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
  data: any = [];

  constructor(private router:Router,private deptService:DepatmentService,private excelService:ExcelService) {
    this.moduleList = JSON.parse(sessionStorage.getItem("moduleList"));
    if (this.moduleList) {
      this.moduleList.map((e) => {
        if (e.moduleGroup == 'Company Master' && e.moduleCode == 'DEPARTMENT') {
          this.flags = { 'createFlag': e.createFlag, 'editFlag': e.editFlag, 'readFlag': e.readFlag, 'deleteFlag': e.deleteFlag,'importFlag': e.importFlag,
          'exportFlag': e.exportFlag,
          'forSelf': e.forSelf };
        }
      });
    }
    
   }
  
  

  ngOnInit() {
    this.getAllDept();
   }

  getAllDept(){
    let list:any =JSON.parse(sessionStorage.getItem("company"));
    var l:any=[];
    for(var i=0;i<list.length;i++){
        l.push(Number(list[i]));
    }
 
      this.deptService.getAllDept(l).subscribe(s=>{
          this.deptList = s;
      });
  }

  



  getDataUsingRedioBtn(data){
    this.deptId = data.deptId;
  }

  add(){ 
    this.router.navigate(['views/masters/dept/add-edit-dept']);
  }
  edit(){ 
    if(this.deptId){
      this.router.navigate(['views/masters/dept/add-edit-dept'],{queryParams:{id:this.deptId}});
    }
  }
  view(){ 
    if(this.deptId){
      this.router.navigate(['views/masters/dept/add-edit-dept'],{queryParams:{id:this.deptId,view:true}});
    }
  }
  delete(){ }

  exporttoexcel() {
    let title = "Depatment";
  
  
    let exportDataList = Array(this.deptList.length).fill(0).map((x, i) => (
      {
        "Department Name": this.deptList[i].name,
        "Description": this.deptList[i].desc
       
  
      }));
  
    this.excelService.exportAsExcelFile(exportDataList, title);
  //  this.excelService.exportAsExcelFile(this.reportSummaryList, "AttendanceSummary");
  
  }

  search(data) {
    this.data = {};
    let list:any =JSON.parse(sessionStorage.getItem("company"));
    var l:any=[];
    for(var i=0;i<list.length;i++){
       l.push(Number(list[i]));
    }
    this.deptService.searchDept(data,l).subscribe(s => {
    this.data = s;
   });
  }

  getRows(data){
   this.deptId = data.deptId;
   if(data.key==""){ } else{ this.edit(); }
  }

}
