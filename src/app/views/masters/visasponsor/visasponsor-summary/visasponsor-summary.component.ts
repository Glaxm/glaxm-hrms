import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ExcelService } from 'src/app/views/services/excel.service';
import { VisasponsorService } from '../visasponsor.service';

@Component({
  selector: 'app-visasponsor-summary',
  templateUrl: './visasponsor-summary.component.html',
  styleUrls: ['./visasponsor-summary.component.scss']
})
export class VisasponsorSummaryComponent implements OnInit {
  visasponsorList: any = [];
  visasponsorId:any;
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
  constructor(private router: Router, private visasponsorService: VisasponsorService, private excelService:ExcelService) { }

  ngOnInit() {
    this.moduleList = JSON.parse(sessionStorage.getItem("moduleList"));
    if (this.moduleList) {
      this.moduleList.map((e) => {
        if (e.moduleGroup == 'Company Master' && e.moduleName == 'Visa Sponsor') {
          this.flags = { 'createFlag': e.createFlag, 'editFlag': e.editFlag, 'readFlag': e.readFlag, 'deleteFlag': e.deleteFlag,
          'importFlag': e.importFlag,
          'exportFlag': e.exportFlag,
          'forSelf': e.forSelf };
        }
      });
    }
   
    this.getVisasponsorList();
  }

  add() {
    this.router.navigate(['/views/masters/visasponsor/add-visasponsor'])
  }
  edit(){
    if(this.visasponsorId){
      this.router.navigate(['/views/masters/visasponsor/add-visasponsor'],{queryParams:{id:this.visasponsorId}});
    }
  }
  view(){
    if(this.visasponsorId){
      this.router.navigate(['/views/masters/visasponsor/add-visasponsor'],{queryParams:{id:this.visasponsorId,view:true}});
    }
  }
  delete(){

  }

   getDataUsingRedioBtn(data){
     this.visasponsorId = data.xvisasponsorId;
   }


  getVisasponsorList() {

    let list:any =JSON.parse(sessionStorage.getItem("company"));
    var l:any=[];
    // alert(list.length)
    for(var i=0;i<list.length;i++){
     
     // if(list[i]!=','){
        l.push(Number(list[i]));
     // }
    }
 
    this.visasponsorService.getVisasponsorList(l).subscribe(s => {
      this.data = s;
    })
  }

  exporttoexcel() {
    let title = "Visa_Sponsor";
  
  
    let exportDataList = Array(this.visasponsorList.length).fill(0).map((x, i) => (
      {
        "Company": this.visasponsorList[i].companyName,
        "Description": this.visasponsorList[i].description
     
        
  
      }));
  
    this.excelService.exportAsExcelFile(exportDataList, title);
  //  this.excelService.exportAsExcelFile(this.reportSummaryList, "AttendanceSummary");
  
  }

       // Datatable  
 
       data: any = [];

       search(data) {
         this.data = {};
         let list:any =JSON.parse(sessionStorage.getItem("company"));
         var l:any=[];
         for(var i=0;i<list.length;i++){
            l.push(Number(list[i]));
         }
         this.visasponsorService.searchVisaSponsor(data,l).subscribe(s => {
         this.data = s;
        });
       }
     
       getRows(data){
        this.visasponsorId = data.xvisasponsorId;
        if(data.key==""){ } else{ this.edit(); }
       }
    

       
}
