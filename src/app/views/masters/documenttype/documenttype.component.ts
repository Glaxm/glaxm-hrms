import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ExcelService } from '../../services/excel.service';
import { DocumenttypeService } from './documenttype.service';

@Component({
  selector: 'app-documenttype',
  templateUrl: './documenttype.component.html',
  styleUrls: ['./documenttype.component.scss']
})
export class DocumenttypeComponent implements OnInit {

  documenttypeId:any;
  documenttypeList:any=[];
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

  constructor(private router:Router,private documenttypeService:DocumenttypeService,private excelService:ExcelService) { }
  
  ngOnInit() {
    this.getAllDocumenttype();

    this.moduleList = JSON.parse(sessionStorage.getItem("moduleList"));
    if (this.moduleList) {
      this.moduleList.map((e) => {
        if (e.moduleGroup == 'Company Master' && e.moduleName == 'Document Type') {
         
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

   getAllDocumenttype(){
    
      this.documenttypeService.getAllDocumenttype().subscribe(s=>{
          this.documenttypeList = s;
      });
    }

  
  DocumenttypeDatabase(){
    this.documenttypeService.DocumenttypeDatabase().subscribe(s=>{
      
    });        
  }



  getDataUsingRedioBtn(data){
    this.documenttypeId = data.xdoctypeId;
  }

  add(){ 
    this.router.navigate(['views/masters/documenttype/add-documenttype']);
  }
  edit(){ 
    if(this.documenttypeId){
      this.router.navigate(['views/masters/documenttype/add-documenttype'],{queryParams:{id:this.documenttypeId}});
    }
  }
  view(){ 
    if(this.documenttypeId){
      this.router.navigate(['views/masters/documenttype/add-documenttype'],{queryParams:{id:this.documenttypeId,view:true}});
    }
  }
  delete(){ }

  search(data){}
  getRows(data){}

  exporttoexcel() {
    let title = "Document_Type";
  
  
    let exportDataList = Array(this.documenttypeList.length).fill(0).map((x, i) => (
      {
        "Document Type": this.documenttypeList[i].name,
        "Description": this.documenttypeList[i].desc
       
  
      }));
  
    this.excelService.exportAsExcelFile(exportDataList, title);
  //  this.excelService.exportAsExcelFile(this.reportSummaryList, "AttendanceSummary");
  
  }
  
  

}
