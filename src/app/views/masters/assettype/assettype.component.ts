import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ExcelService } from '../../services/excel.service';
import { AssettypeService } from './assettype.service';

@Component({
  selector: 'app-assettype',
  templateUrl: './assettype.component.html',
  styleUrls: ['./assettype.component.scss']
})
export class AssettypeComponent implements OnInit {

  assettypeList: any = [];
  assettypeId:any;
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

  constructor(private router: Router, private assettypeService:AssettypeService, private excelService:ExcelService ) { }

  ngOnInit() {
    this.getAssettypeList();
    this.moduleList = JSON.parse(sessionStorage.getItem("moduleList"));
    if (this.moduleList) {
      this.moduleList.map((e) => {
        if (e.moduleGroup == 'Asset' && e.moduleName == 'Asset Type') {
         
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
    this.router.navigate(['/views/masters/assettype/add-assettype'])
  }
  edit(){
    if(this.assettypeId){
      this.router.navigate(['/views/masters/assettype/add-assettype'],{queryParams:{id:this.assettypeId}});
    }
  }
  view(){
    if(this.assettypeId){
      this.router.navigate(['/views/masters/assettype/add-assettype'],{queryParams:{id:this.assettypeId,view:true}});
    }
  }
  delete(){

  }
  getDataUsingRedioBtn(data){
    this.assettypeId = data.x_asset_type_id;
  }

  getAssettypeList() {
    this.assettypeService.getAssettypeList().subscribe(s => {
      this.assettypeList = s;
    });
  }
  exporttoexcel() {
    let title = "Asset_Type";
  
  
    let exportDataList = Array(this.assettypeList.length).fill(0).map((x, i) => (
      {
        "Group Name": this.assettypeList[i].groupname,
        "Type Name": this.assettypeList[i].name,
        "Type Code": this.assettypeList[i].code
       
        
  
      }));
  
    this.excelService.exportAsExcelFile(exportDataList, title);
  //  this.excelService.exportAsExcelFile(this.reportSummaryList, "AttendanceSummary");
  
  }

}
