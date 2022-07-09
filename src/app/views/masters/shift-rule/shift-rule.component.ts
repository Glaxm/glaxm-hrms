import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ExcelService } from '../../services/excel.service';
import { ShiftRuleService } from './shift-rule.service';

@Component({
  selector: 'app-shift-rule',
  templateUrl: './shift-rule.component.html',
  styleUrls: ['./shift-rule.component.scss']
})
export class ShiftRuleComponent implements OnInit {
  shiftRuleList: any = [];
  shiftRuleId:any;
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

  constructor(private router: Router, private shiftRuleService:ShiftRuleService,private excelService:ExcelService ) { }

  ngOnInit() {
    this.getShiftRuleList();
    this.moduleList = JSON.parse(sessionStorage.getItem("moduleList"));
    if (this.moduleList) {
      this.moduleList.map((e) => {
        if (e.moduleGroup == 'Shift Management' && e.moduleName == 'Shift Rule') {
         
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
    this.router.navigate(['/views/masters/shift-rule/add-shift-rule'])
  }
  edit(){
    if(this.shiftRuleId){
      this.router.navigate(['/views/masters/shift-rule/add-shift-rule'],{queryParams:{id:this.shiftRuleId}});
    }
  }
  view(){
    if(this.shiftRuleId){
      this.router.navigate(['/views/masters/shift-rule/add-shift-rule'],{queryParams:{id:this.shiftRuleId,view:true}});
    }
  }
  delete(){

  }
  getDataUsingRedioBtn(data){
    this.shiftRuleId = data.shiftRuleId;
  }

  getShiftRuleList() {
    let list:any = JSON.parse(sessionStorage.getItem("company"));
    var l:any=[];
    for(var i=0;i<list.length;i++){
     // if(list[i]!=','){
        l.push(Number(list[i]));
      // }
    }

    // alert(l);
    this.shiftRuleService.getShiftRuleList(l).subscribe(s => {
      this.shiftRuleList = s;
    })
  }

  exporttoexcel() {
    let title = "Shift_Rule";
  
  
    let exportDataList = Array(this.shiftRuleList.length).fill(0).map((x, i) => (
      {
        "Shift": this.shiftRuleList[i].name,
        "Start time": this.shiftRuleList[i].startTime,
        "Break Start": this.shiftRuleList[i].breakStart,
        "Break End": this.shiftRuleList[i].breakEnd,
        "End time": this.shiftRuleList[i].endTime,
        "Total Working Hrs": this.shiftRuleList[i].totalworkinghrs,
        "Total Working Hrs Per Week": this.shiftRuleList[i].totalworkinghrsperweek,
        "Total Working Hrs Per Month": this.shiftRuleList[i].totalworkinghrspermonth
        
  
      }));
  
    this.excelService.exportAsExcelFile(exportDataList, title);
  //  this.excelService.exportAsExcelFile(this.reportSummaryList, "AttendanceSummary");
  
  }
}
