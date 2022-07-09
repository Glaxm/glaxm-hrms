import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ExcelService } from '../../services/excel.service';
import { GenerallistService } from './generallist.service';

@Component({
  selector: 'app-generallist',
  templateUrl: './generallist.component.html',
  styleUrls: ['./generallist.component.scss']
})
export class GenerallistComponent implements OnInit {
  lListcodeId: any;
  enableFilter: boolean = false;
  generallistList: any = [];
  filterString = "";
  filtered;
  items = [];
  pageOfItems: Array<any>;
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

  onChangePage(pageOfItems: Array<any>) {
    // update current page of items
    this.pageOfItems = pageOfItems;
  }
  constructor(private excelService:ExcelService,private router: Router, private generallistService: GenerallistService) { 
    this.items = Array(150).fill(0).map((x, i) => ({ id: (i + 1), name: `Item ${i + 1}` }));
  }

  ngOnInit() {
    this.getAllGeneralList();
    this.moduleList = JSON.parse(sessionStorage.getItem("moduleList"));
    if (this.moduleList) {
      this.moduleList.map((e) => {
        if (e.moduleGroup == 'Company Master' && e.moduleName == 'General List') {
         
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
  getAllGeneralList() {
    this.generallistService.getAllGeneralList().subscribe(success => {
      this.generallistList = success;

      this.filtered = Array(this.generallistList.length).fill(0).map((x, i) => (
        {
          created: this.generallistList[i].created,
          createdBy:  this.generallistList[i].createdBy,
          gCompanyId: this.generallistList[i].gCompanyId,
          gHoldingId: this.generallistList[i].gHoldingId,
          g_COMPANY:  this.generallistList[i].g_COMPANY,
          g_HOLDING:  this.generallistList[i].g_HOLDING,
          groupcode: this.generallistList[i].groupcode,
          isActive: this.generallistList[i].isActive,
          lListcodeId: this.generallistList[i].lListcodeId,
          name: this.generallistList[i].name,
          updated:  this.generallistList[i].updated,
          updatedBy:  this.generallistList[i].updatedBy,
          value:  this.generallistList[i].value
        }));

    });
  }

  getDataUsingRedioBtn(data) {
    this.lListcodeId = data.lListcodeId;
  }
 
  add() {
    this.router.navigate(['/views/masters/generallist/add-generallist']);
  }
  edit() {
    if (this.lListcodeId) {
      this.router.navigate(['/views/masters/generallist/add-generallist'], { queryParams: { id: this.lListcodeId } });
    }
  }
  view() {
    if (this.lListcodeId) {
      this.router.navigate(['/views/masters/generallist/add-generallist'], { queryParams: { id: this.lListcodeId, view: true } });
    }
  }
  delete() { }

  onFilterChange() {
    this.filtered = this.generallistList.filter((invoice) => this.isMatch(invoice));
  }

  isMatch(item) {
   
    if (item instanceof Object) {
      return Object.keys(item).some((k) => this.isMatch(item[k]));
    } else {
      return item.toString().indexOf(this.filterString) > -1
    }
  }

  exporttoexcel() {
    let title = "General_List";
  
  
    let exportDataList = Array(this.generallistList.length).fill(0).map((x, i) => (
      {
        "List Name": this.generallistList[i].name,
        "GL-CODE": this.generallistList[i].value
       
        
  
      }));
  
    this.excelService.exportAsExcelFile(exportDataList, title);
  //  this.excelService.exportAsExcelFile(this.reportSummaryList, "AttendanceSummary");
  
  }

}
