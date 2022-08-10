import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ExcelService } from '../../services/excel.service';
import { EmpCatService } from './emp-cat.service';

@Component({
  selector: 'app-emp-cat',
  templateUrl: './emp-cat.component.html',
  styleUrls: ['./emp-cat.component.scss']
})
export class EmpCatComponent implements OnInit {
  
  empCatId:any;
  empCatList:any =[];
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
  data: any = [];
  constructor(private router:Router,private empCatService:EmpCatService,private excelService:ExcelService) { }

  ngOnInit() { 
    this.getEmpCat();
    
    this.moduleList = JSON.parse(sessionStorage.getItem("moduleList"));
    if (this.moduleList) {
      this.moduleList.map((e) => {
        if (e.moduleGroup == 'Employee Master' && e.moduleName == 'Category') {
         
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
  
  getEmpCat(){

    let list:any =JSON.parse(sessionStorage.getItem("company"));
    var l:any=[];
    for(var i=0;i<list.length;i++){
       l.push(Number(list[i]));
    }
    this.empCatService.getEmpCat(l).subscribe(success=>{
        this.data = success;
    });
  }

  add(){ 
    this.router.navigate(['views/masters/empcat/add-empcat']);
  }

  edit(){ 
    if(this.empCatId){
     this.router.navigate(['views/masters/empcat/add-empcat'],{queryParams:{id:this.empCatId}});
    }
  }

  view(){ 
    if(this.empCatId){
      this.router.navigate(['views/masters/empcat/add-empcat'],{queryParams:{id:this.empCatId,view:true}});
    }
  }

  delete(){ }
  getDataUsingRedioBtn(data){
      this.empCatId = data.empCatId;
  }

  exporttoexcel() {
    let title = "Category";
  
  
    let exportDataList = Array(this.empCatList.length).fill(0).map((x, i) => (
      {
        "Employee Category Name": this.empCatList[i].name,
       
        "Description": this.empCatList[i].description
        
  
      }));
  
    this.excelService.exportAsExcelFile(exportDataList, title);
  //  this.excelService.exportAsExcelFile(this.reportSummaryList, "AttendanceSummary");
  
  }

      // Database

      search(data) {
        this.data = {};
        let list:any =JSON.parse(sessionStorage.getItem("company"));
        var l:any=[];
        for(var i=0;i<list.length;i++){
           l.push(Number(list[i]));
        }
        this.empCatService.empCatSearch(data,l).subscribe(s => {
        this.data = s;
       });
      }
    
      getRows(data){
       this.empCatId = data.empCatId;
       if(data.key==""){ } else{ this.edit(); }
      }

      
}
