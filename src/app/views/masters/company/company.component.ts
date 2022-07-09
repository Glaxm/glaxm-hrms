import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ExcelService } from '../../services/excel.service';
import { CompanyService } from './company.service';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.scss']
})
export class CompanyComponent implements OnInit {
  companyId:any;
  enableFilter:boolean =false;
  companyList:any=[];
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
  constructor(private router:Router,private companyService:CompanyService, private excelService:ExcelService) { 
    
  }

  ngOnInit() {
    this.getAllComapny();
    this.moduleList = JSON.parse(sessionStorage.getItem("moduleList"));
    if (this.moduleList) {
      this.moduleList.map((e) => {
        if (e.moduleGroup == 'Company Master' && e.moduleName == 'Company') {
          this.flags = { 'createFlag': e.createFlag, 'editFlag': e.editFlag, 'readFlag': e.readFlag, 'deleteFlag': e.deleteFlag,'importFlag': e.importFlag,
          'exportFlag': e.exportFlag,
          'forSelf' : e.forSelf };
        }
      });
    }
  }
  

  getAllComapny(){
    this.companyService.getAllComapny().subscribe(success=>{
        this.companyList=success;
    });
  }

  getDataUsingRedioBtn(data){
      this.companyId = data.companyId;
  }

  add(){ 
    this.router.navigate(['views/masters/company/add-edit-company']);
  }
  edit(){ 
    if(this.companyId){
      this.router.navigate(['views/masters/company/add-edit-company'],{queryParams:{id:this.companyId}});
    }
  }
  view(){ 
    if(this.companyId){
      this.router.navigate(['views/masters/company/add-edit-company'],{queryParams:{id:this.companyId,view:true}});
    }
  }
  delete(){ }
  exporttoexcel() {
    let title = "Company";
  
  
    let exportDataList = Array(this.companyList.length).fill(0).map((x, i) => (
      {
        "Company Name": this.companyList[i].companyName,
        "Description": this.companyList[i].companyDisc
       
        
  
      }));
  
    this.excelService.exportAsExcelFile(exportDataList, title);
  //  this.excelService.exportAsExcelFile(this.reportSummaryList, "AttendanceSummary");
  
  }
}



