import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ExcelService } from '../../services/excel.service';
import { LeaveRuleService } from './leave-rule.service';

@Component({
  selector: 'app-leave-rule',
  templateUrl: './leave-rule.component.html',
  styleUrls: ['./leave-rule.component.scss']
})
export class LeaveRuleComponent implements OnInit {
  leaveRuleList: any = [];
  leaveRuleId:any;
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

  constructor(private router: Router, private leaveRuleService:LeaveRuleService,private excelService:ExcelService ) { }

  ngOnInit() {
    this.getLeaveRuleList();
    this.moduleList = JSON.parse(sessionStorage.getItem("moduleList"));
    if (this.moduleList) {
      this.moduleList.map((e) => {
        if (e.moduleGroup == 'Leave Management' && e.moduleName == 'Leave Type') {
         
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
    this.router.navigate(['/views/masters/leave-rule/add-leave-rule'])
  }
  edit(){
    if(this.leaveRuleId){
      this.router.navigate(['/views/masters/leave-rule/add-leave-rule'],{queryParams:{id:this.leaveRuleId}});
    }
  }
  view(){
    if(this.leaveRuleId){
      this.router.navigate(['/views/masters/leave-rule/add-leave-rule'],{queryParams:{id:this.leaveRuleId,view:true}});
    }
  }
  delete(){

  }

  selectTableRow(data) {
    if (!this.selectRadioBtn && data) {
      this.router.navigate(['/views/masters/leave-rule/add-leave-rule'],{queryParams:{id:data.leaveRuleId}});
    }
  }

  getDataUsingRedioBtn(data){
    this.leaveRuleId = data.leaveRuleId;
  }

  getLeaveRuleList() {
    this.leaveRuleService.getLeaveRuleList().subscribe(s => {
      this.leaveRuleList = s;

      this.onFilterChange();
      this.filtered = Array(this.leaveRuleList.length).fill(0).map((x, i) => (
        {
          leaveRuleId: this.leaveRuleList[i].leaveRuleId,
          name:this.leaveRuleList[i].name,
          description: this.leaveRuleList[i].description
        }));

    })
  }

  
onFilterChange() {
  this.filtered = this.leaveRuleList.filter((data) => this.isMatch(data));
}

isMatch(item) {
  if (item instanceof Object) {
    return Object.keys(item).some((k) => this.isMatch(item[k]));
  } else {
    return item ? item.toString().indexOf(this.filterString) > -1 : null;
  }
}

exporttoexcel() {
  let title = "Leave_Type";

  let exportDataList = Array(this.leaveRuleList.length).fill(0).map((x, i) => (
    {
      "Name": this.leaveRuleList[i].name,     
      "Description": this.leaveRuleList[i].description
    }));

  this.excelService.exportAsExcelFile(exportDataList, title);
//  this.excelService.exportAsExcelFile(this.reportSummaryList, "AttendanceSummary");

}

 //  ===================
 setImgUsingLeaveType(leavetype){
  if(leavetype=="Annual Leave"){  return "assets/images/user/leavetypeicon/annual_leave.jpg"; } 
  if(leavetype=="Sick Leave"){ return "assets/images/user/leavetypeicon/sick_leave.png"; }
  if(leavetype=="Accident Leave"){ return "assets/images/user/leavetypeicon/employee_accident_leave.png";}
  if(leavetype=="Compassionate Leave"){ return "assets/images/user/leavetypeicon/compassionate_leave.PNG";}
  if(leavetype=="Work From Home"){ return "assets/images/user/leavetypeicon/work_from_home.png"; }
  if(leavetype=="Unpaid Leave"){ return "assets/images/user/leavetypeicon/unpaid_leave.png"; }
  if(leavetype=="Saturday Off"){ return "assets/images/user/leavetypeicon/saturday_off.png"; }
  if(leavetype=="Relocation Leave"){ return "assets/images/user/leavetypeicon/relocation_leave.png"; }
  if(leavetype=="Paternity Leave"){ return "assets/images/user/leavetypeicon/paternity_leave.jpg";}
  if(leavetype=="Pandemic Leave"){ return "assets/images/user/leavetypeicon/pandemic_leave.png";}
  if(leavetype=="Maternity Leave"){ return "assets/images/user/leavetypeicon/maternity_leave.png"; }
  if(leavetype=="Marriage Leave"){ return "assets/images/user/leavetypeicon/marriage_leave.PNG"; }
  if(leavetype=="Hajj Leave"){ return "assets/images/user/leavetypeicon/hajj_leave.jpg"; }
  if(leavetype=="Fully Paid Absence"){ return "assets/images/user/leavetypeicon/fully_paid_absence.png"; }
  if(leavetype=="Examination Leave"){ return "assets/images/user/leavetypeicon/examination_leave.png"; }
  if(leavetype=="Compensatory Leave"){ return "assets/images/user/leavetypeicon/compensatory_leave.png";}
  if(leavetype=="Business absence"){ return "assets/images/user/leavetypeicon/business_absence.PNG"; }
  
  return "assets/images/user/no_image.png";
}

}
