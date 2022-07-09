import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ExcelService } from 'src/app/views/services/excel.service';
import { EmpleaveresumptionService } from './empleaveresumption.service';

@Component({
  selector: 'app-empleaveresumption',
  templateUrl: './empleaveresumption.component.html',
  styleUrls: ['./empleaveresumption.component.scss']
})
export class EmpleaveresumptionComponent implements OnInit {

  empleaveresumptionId:any;
  empleaveresumList:any=[];
  enableFilter = false;
  filterString = "";
  filtered;
  selectRadioBtn: boolean = false;

  moduleList: any = [];
  moduleid:any;
  flags = {
    createFlag: '',
    editFlag: '',
    readFlag: '',
    deleteFlag: '',
    exportFlag:'',
    importFlag:''
  }

  constructor(private router:Router,private empleaveresumptionService:EmpleaveresumptionService,private excelService:ExcelService) {
  

   }
  
  ngOnInit() {
    this.getAllEmpleaveresumption();

    this.moduleList = JSON.parse(sessionStorage.getItem("moduleList"));
    if (this.moduleList) {
      this.moduleList.map((e) => {
        if (e.moduleGroup == 'Leave Management' && e.moduleName == 'Employee Leave Resumption') {
         this.moduleid=e.moduleId;
          this.flags = { 
                'createFlag': e.createFlag, 
                'editFlag': e.editFlag, 
                'readFlag': e.readFlag, 
                'deleteFlag': e.deleteFlag,
                'importFlag': e.importFlag,
                'exportFlag': e.exportFlag
                };
        }
      });
    }
   }

  // getAllEmpleaveresumption(){

  //     let list:any = JSON.parse(sessionStorage.getItem("company"));
  //     var l:any=[];
     
  //     for(var i=0;i<list.length;i++){
       
  
  //         l.push(Number(list[i]));
    
  //     }
  //     this.empleaveresumptionService.getAllEmpleaveresumption(l).subscribe(s=>{
  //         this.empleaveresumList = s;
  //         this.onFilterChange();
  //         this.filtered = Array(this.empleaveresumList.length).fill(0).map((x, i) => (
  //           {
  //             lEmpleaveresumeId: this.empleaveresumList[i].lEmpleaveresumeId,
  //             startdate:this.empleaveresumList[i].startdate,
  //             enddate:this.empleaveresumList[i].enddate,
  //             leavedays: this.empleaveresumList[i].leavedays,
  //             resumptiondate: this.empleaveresumList[i].resumptiondate,
  //             leavename: this.empleaveresumList[i].leavename,
  //             empname: this.empleaveresumList[i].empname,
  //             oldEmpId: this.empleaveresumList[i].oldEmpId,
  //             empcode:this.empleaveresumList[i].empcode
  //           }));
  //     });
  // }

  selectTableRow(data){
    if (!this.selectRadioBtn && data && this.flags.editFlag=="Y") {
      this.router.navigate(['views/transaction/empleaveresumption/add-empleaveresumption'],{queryParams:{id:this.empleaveresumptionId, moduleid:this.moduleid}});
    }
   
  }

  // onFilterChange() {
  //   this.filtered = this.empleaveresumList.filter((data) => this.isMatch(data));
  // }
  
  // isMatch(item) {
  //   if (item instanceof Object) {
  //     return Object.keys(item).some((k) => this.isMatch(item[k]));
  //   } else {
  //     return item ? item.toString().indexOf(this.filterString) > -1 : null;
  //   }
  // }
  

  
  // empleaveresumptionDatabase(){
  //   this.empleaveresumptionService.empleaveresumptionDatabase().subscribe(s=>{
      
  //   });        
  // }



  getDataUsingRedioBtn(data){
    this.empleaveresumptionId = data.lEmpleaveresumeId;
  }

  add(){ 
    this.router.navigate(['views/transaction/empleaveresumption/add-empleaveresumption'],{queryParams:{moduleid:this.moduleid}});
  }
  edit(){ 
    if(this.empleaveresumptionId){
      this.router.navigate(['views/transaction/empleaveresumption/add-empleaveresumption'],{queryParams:{id:this.empleaveresumptionId,moduleid:this.moduleid}});
    }
  }
  view(){ 
    if(this.empleaveresumptionId){
      this.router.navigate(['views/transaction/empleaveresumption/add-empleaveresumption'],{queryParams:{id:this.empleaveresumptionId,view:true,moduleid:this.moduleid}});
    }
  }
  delete(){ }



  exporttoexcel() {
    let title = "Employee_Leave_Resumption";
  

    this.empleaveresumptionService.empLeaveResumptionExport(this.searchDataStr).subscribe(data=>{

      var empleaveresumptiondatalist: any = data;
      if(empleaveresumptiondatalist){
        let exportDataList = Array(empleaveresumptiondatalist.length).fill(0).map((x, i) => (
        {
          "Emp.ID": empleaveresumptiondatalist[i].oldEmpId,
          "Emp.Code": empleaveresumptiondatalist[i].empcode,
          "Name": empleaveresumptiondatalist[i].empname,
          "Leave": empleaveresumptiondatalist[i].leaveitemname,
          "Leave Days": empleaveresumptiondatalist[i].leavedays,
          "Resumption Date": empleaveresumptiondatalist[i].resumptiondate,
          "Start Date": empleaveresumptiondatalist[i].startdate,
          "End date": empleaveresumptiondatalist[i].enddate,
          "Leave Ref. No." : empleaveresumptiondatalist[i].documentno
        }));
         this.excelService.exportAsExcelFile(exportDataList, title);
      }
      })
  
    // let exportDataList = Array(this.empleaveresumList.length).fill(0).map((x, i) => (
    //   {
    //     "Emp.ID": this.empleaveresumList[i].oldEmpId,
    //     "Emp.Code": this.empleaveresumList[i].empcode,
    //     "Name": this.empleaveresumList[i].empname,
    //     "Leave": this.empleaveresumList[i].leaveitemname,
    //     "Leave Days": this.empleaveresumList[i].leavedays,
    //     "Resumption Date": this.empleaveresumList[i].resumptiondate,
    //     "Start Date": this.empleaveresumList[i].startdate,
    //     "End date": this.empleaveresumList[i].enddate
        
  
    //   }));
  
    // this.excelService.exportAsExcelFile(exportDataList, title);
  //  this.excelService.exportAsExcelFile(this.reportSummaryList, "AttendanceSummary");
  
  }

  //============================================ Datatable

  data: any = [];
  getAllEmpleaveresumption() {
    let list:any =JSON.parse(sessionStorage.getItem("company"));
      var l:any=[];
      for(var i=0;i<list.length;i++){
          l.push(Number(list[i]));
          }
    this.empleaveresumptionService.empleaveresumptiondatatable(sessionStorage.getItem("userId"),this.moduleid,l).subscribe(s => {
    this.data = s;
    });
  }
  
  searchDataStr: any; 
  search(data) {
      //  this.data = {};
   let list:any =JSON.parse(sessionStorage.getItem("company"));
   var l:any=[];
   for(var i=0;i<list.length;i++){
      l.push(Number(list[i]));
   }
   this.empleaveresumList=[];
   this.searchDataStr=data;
     this.empleaveresumptionService.empleaveresumptiondatatable1(sessionStorage.getItem("userId"),l,data).subscribe(s => {
     this.data = s;
    });
   }


   getRows(data){
    this.empleaveresumptionId = data.lEmpleaveresumeId;
   }
  
}
