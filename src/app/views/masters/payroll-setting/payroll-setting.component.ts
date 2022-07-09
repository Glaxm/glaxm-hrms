import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ExcelService } from '../../services/excel.service';
import { PayrollSettingService } from './payroll-setting.service';

@Component({
  selector: 'app-payroll-setting',
  templateUrl: './payroll-setting.component.html',
  styleUrls: ['./payroll-setting.component.scss']
})
export class PayrollSettingComponent implements OnInit {

  payrollsettingId:any;
  enableFilter:boolean =false;
  payrollsettingList:any=[];

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

  constructor(private router:Router,private payrollsettingService:PayrollSettingService, private excelService:ExcelService)
   { }

  ngOnInit() {
    this.getAllPayrollsetting();
    this.moduleList = JSON.parse(sessionStorage.getItem("moduleList"));
    if (this.moduleList) {
      this.moduleList.map((e) => {
        if (e.moduleGroup == 'Company Master' && e.moduleName == 'Overtime Setting') {
         
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
  getAllPayrollsetting() {
    let list: any = JSON.parse(sessionStorage.getItem("company"));
    var l: any = [];
    for (var i = 0; i < list.length; i++) {
      l.push(Number(list[i]));
    }

    this.payrollsettingService.getAllPayrollsetting(l).subscribe(success=>{
      this.payrollsettingList=success;
    });
  }
  getDataUsingRedioBtn(data){
    this.payrollsettingId = data.xPayrollsettingId;
}
 add(){ 
    this.router.navigate(['/views/masters/payroll-setting/add-payroll-setting']);
  }
  edit(){ 
    if(this.payrollsettingId){
      this.router.navigate(['/views/masters/payroll-setting/add-payroll-setting'],{queryParams:{id:this.payrollsettingId}});
    }
  }
  view(){ 
    if(this.payrollsettingId){
      this.router.navigate(['/views/masters/payroll-setting/add-payroll-setting'],{queryParams:{id:this.payrollsettingId,view:true}});
    }
  }
  delete(){ }

  exporttoexcel() {
    let title = "Payroll_Setting";
  
  
    let exportDataList = Array(this.payrollsettingList.length).fill(0).map((x, i) => (
      {
        "Holiday OT Rate": this.payrollsettingList[i].holidayOtRate,
        "Normal OT Rate": this.payrollsettingList[i].normalOtRate,
        "Round Off Acct": this.payrollsettingList[i].roundOffAcct,
        "Round Off Limit": this.payrollsettingList[i].roundofflimit
      }));
  
    this.excelService.exportAsExcelFile(exportDataList, title);
  //  this.excelService.exportAsExcelFile(this.reportSummaryList, "AttendanceSummary");
  
  }
}
