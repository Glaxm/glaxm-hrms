import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ExcelService } from '../../services/excel.service';
import { RamdanRuleService } from './ramdan-rule.service';

@Component({
  selector: 'app-ramadan-rule',
  templateUrl: './ramadan-rule.component.html',
  styleUrls: ['./ramadan-rule.component.scss']
})
export class RamadanRuleComponent implements OnInit {

  ramadanRuleList:any=[];
  ramadanRuleId:any;
  enableFilter:boolean=false;
  filterString = "";
  filtered;
  selectRadioBtn: boolean = false;

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

  constructor(private router:Router,private ramadanRulesService:RamdanRuleService,private excelService:ExcelService) { }

  ngOnInit() {
    this.getRamadanRulesList();
    this.moduleList = JSON.parse(sessionStorage.getItem("moduleList"));
    if (this.moduleList) {
      this.moduleList.map((e) => {
        if (e.moduleGroup == 'Leave Management' && e.moduleName == 'Ramadan Rules') {
         
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

  // getRamadanRulesList(){
  //   this.ramadanRulesService.getRamadanRulesList().subscribe(s=>{
  //     this.ramadanRuleList = s;
  //     this.onFilterChange();
  //     this.filtered = Array(this.ramadanRuleList.length).fill(0).map((x, i) => (
  //       {
  //         ramadanRuleId: this.ramadanRuleList[i].ramadanRuleId,
  //         paidOffHrs:this.ramadanRuleList[i].paidOffHrs,
  //         remarks:this.ramadanRuleList[i].remarks,
  //         startDate:this.ramadanRuleList[i].startDate,
  //         endDate: this.ramadanRuleList[i].endDate
  //       }));
  //   })
  // }

  selectTableRow(data) {
    if (!this.selectRadioBtn && data) {
     
      this.router.navigate(['/views/masters/ramadan-rule/add-ramdan-rules'],{queryParams:{id:data.ramadanRuleId}});
    }
  }

  // onFilterChange() {
  //   this.filtered = this.ramadanRuleList.filter((data) => this.isMatch(data));
  // }
  
  // isMatch(item) {
  //   if (item instanceof Object) {
  //     return Object.keys(item).some((k) => this.isMatch(item[k]));
  //   } else {
  //     return item ? item.toString().indexOf(this.filterString) > -1 : null;
  //   }
  // }
  add(){ 
    this.router.navigate(['/views/masters/ramadan-rule/add-ramdan-rules']);
  }
  edit(){ 
    if(this.ramadanRuleId){
      this.router.navigate(['/views/masters/ramadan-rule/add-ramdan-rules'],{queryParams:{id:this.ramadanRuleId}});
    }
  }
  view(){ 
    if(this.ramadanRuleId){
      this.router.navigate(['/views/masters/ramadan-rule/add-ramdan-rules'],{queryParams:{id:this.ramadanRuleId,view:true}});
    }
  }
  delete(){ }

  // getDataUsingRedioBtn(data){
  //   this.ramadanRuleId = data.ramadanRuleId;
  // }


  exporttoexcel() {
    let title = "Ramadan_Rules";
  
    this.ramadanRulesService.ramadanRulesExport(this.searchDataStr).subscribe(data=>{

      var ramadanRulesdatalist: any = data;
      if(ramadanRulesdatalist){
        let exportDataList = Array(ramadanRulesdatalist.length).fill(0).map((x, i) => (
        {
          "Company": ramadanRulesdatalist[i].companyname,
          "Start Date": ramadanRulesdatalist[i].stdate,
          "End Date": ramadanRulesdatalist[i].endate,
          "Paid off Hrs.": ramadanRulesdatalist[i].paidOffHrs,
           "Remark": ramadanRulesdatalist[i].remarks
        }));
         this.excelService.exportAsExcelFile(exportDataList, title);
      }
      })
  
    // let exportDataList = Array(this.ramadanRuleList.length).fill(0).map((x, i) => (
    //   {
    //     "Start Date": this.ramadanRuleList[i].startDate,
    //     "End Date": this.ramadanRuleList[i].endDate,
    //     "Paid off Hrs.": this.ramadanRuleList[i].paidOffHrs,
       
    //     "Remark": this.ramadanRuleList[i].remarks
        
  
    //   }));
  
    // this.excelService.exportAsExcelFile(exportDataList, title);
  //  this.excelService.exportAsExcelFile(this.reportSummaryList, "AttendanceSummary");
  
  }

   //============================================ Datatable

   data: any = [];
   getRamadanRulesList() {
     this.ramadanRulesService.ramadanRulesdatatable().subscribe(s => {
     this.data = s;
     });
    }
   
 
    searchDataStr: any; 
   search(data) {
      this.data = {};
      this.searchDataStr=data;
      this.ramadanRulesService.ramadanRulesdatatable1(data).subscribe(s => {
      this.data = s;
     });
    }
 
 
    getRows(data){
     this.ramadanRuleId = data.ramadanRuleId;
     if(data.key==""){
     } else{
      this.edit();
    }
    }
}
