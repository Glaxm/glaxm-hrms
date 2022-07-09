import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ExcelService } from '../../services/excel.service';
import { AssetitemService } from './assetitem.service';

@Component({
  selector: 'app-assetitem',
  templateUrl: './assetitem.component.html',
  styleUrls: ['./assetitem.component.scss']
})
export class AssetitemComponent implements OnInit {

  assetitemList: any = [];
  assetitemId:any;
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

  constructor(private router: Router, private assetitemService:AssetitemService, private excelService:ExcelService ) { }

  ngOnInit() {
    this.getAssetitemList();
    this.moduleList = JSON.parse(sessionStorage.getItem("moduleList"));
    if (this.moduleList) {
      this.moduleList.map((e) => {
        if (e.moduleGroup == 'Asset' && e.moduleName == 'Asset Item') {
         
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
    this.router.navigate(['/views/masters/assetitem/add-assetitem'])
  }
  edit(){
    if(this.assetitemId){
      this.router.navigate(['/views/masters/assetitem/add-assetitem'],{queryParams:{id:this.assetitemId}});
    }
  }
  view(){
    if(this.assetitemId){
      this.router.navigate(['/views/masters/assetitem/add-assetitem'],{queryParams:{id:this.assetitemId,view:true}});
    }
  }
  delete(){

  }
  getDataUsingRedioBtn(data){
    this.assetitemId = data.x_asset_item_id;
  }

  getAssetitemList() {
    this.assetitemService.getAssetitemList().subscribe(s => {
      this.assetitemList = s;
    });
  }

  exporttoexcel() {
    let title = "Asset_Item";
  
  
    let exportDataList = Array(this.assetitemList.length).fill(0).map((x, i) => (
      {
        "Item Name": this.assetitemList[i].name,
        "Description": this.assetitemList[i].description,
        "Quantity": this.assetitemList[i].qty,
        "Amount": this.assetitemList[i].amount,
        "Item Code": this.assetitemList[i].code
      
        
  
      }));
  
    this.excelService.exportAsExcelFile(exportDataList, title);
  //  this.excelService.exportAsExcelFile(this.reportSummaryList, "AttendanceSummary");
  
  }

}
