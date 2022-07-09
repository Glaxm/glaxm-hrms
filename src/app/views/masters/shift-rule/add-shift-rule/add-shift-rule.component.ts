import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AngularMyDatePickerDirective, IMyDateModel } from 'angular-mydatepicker';
import { CommonService, GeneralListCode } from 'src/app/views/services/common.service';
import { ToastrService } from 'src/app/views/services/toastr.service';
import { ShiftRuleService } from '../shift-rule.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-add-shift-rule',
  templateUrl: './add-shift-rule.component.html',
  styleUrls: ['./add-shift-rule.component.scss']
})
export class AddShiftRuleComponent implements OnInit {

  shiftRuleForm: FormGroup;
  submitted = false;
  isView: boolean = false;
  holdingList: any = [];
  companyList: any = [];
  shiftTypeList:any = [];

  @ViewChild('dp1', {static: false}) myDp1: AngularMyDatePickerDirective;
  @ViewChild('dp2', {static: false}) myDp2: AngularMyDatePickerDirective;
  @ViewChild('dp3', {static: false}) myDp3: AngularMyDatePickerDirective;
  @ViewChild('dp4', {static: false}) myDp4: AngularMyDatePickerDirective;
  public myDatePickerOptions = this.commonService.datepickerFormat;
  
  statusList: any = [{ valueCode: 'ACTIVE', valueName: 'Active' }, { valueCode: 'INACTIVE', valueName: 'Inactive' }]
  weeklyOffList: any = [{valueCode:'Staff', valueName:'Staff'},{valueCode:'Workers', valueName:'Workers'}]
  daysList:any =[{code:'Monday',value:'Monday'},{code:'Tuesday',value:'Tuesday'},{code:'Wednesday',value:'Wednesday'},
  {code:'Thursday',value:'Thursday'},{code:'Friday',value:'Friday'},{code:'Saturday',value:'Saturday'},{code:'Sunday',value:'Sunday'}];
  shiftRuleList:any=[];
 

  constructor(private commonService:CommonService,private cdr: ChangeDetectorRef,private toastService: ToastrService, private activatedRoute: ActivatedRoute, private shiftRUleService: ShiftRuleService, private router: Router) {
    this.shiftRuleForm = new FormGroup({
      shiftRuleId: new FormControl(null),
      rotateonDay: new FormControl(null),
      lshifttypeId: new FormControl(null),
      timeroundoffLimit: new FormControl(null),
      bufferTime : new FormControl(null),
      halfdayHrs : new FormControl(null),
      exittimeroundoffLimit : new FormControl(null),
      totalshifthrs: new FormControl(null),
      totalbreaktime: new FormControl(null),
      totalworkinghrs: new FormControl(null),
      totalworkinghrsperweek: new FormControl(null),
      totalworkinghrspermonth: new FormControl(null),
      companyId: new FormControl(null, [Validators.required]),
      holdingId: new FormControl(null, [Validators.required]),
      isActive: new FormControl(null),
      status: new FormControl(null),
      created: new FormControl(null),
      createdBy: new FormControl(null),
      updated: new FormControl(null),
      updatedBy: new FormControl(null),
      name: new FormControl(null, [Validators.required]),
      description: new FormControl(null),
      startTime:new FormControl(null, [Validators.required]),
      endTime:new FormControl(null, [Validators.required]),
      startTime1:new FormControl(null),
      endTime1:new FormControl(null),
      normalOT:new FormControl(null),
      normalOT_RoundTO:new FormControl(null),
      normalOT_RoundUP:new FormControl(null),
      doubleOT:new FormControl(null),
      doubleOT_RoundTO:new FormControl(null),
      doubleOT_RoundUP:new FormControl(null),
      isNormalOT_ProRate:new FormControl(null),
      isNormalOT_ProRate1:new FormControl(null),
      isDoubleOT_ProRate:new FormControl(null),
      isDoubleOT_ProRate1:new FormControl(null),
      isDefault:new FormControl(null),
      isDefault1:new FormControl(null),
      breakStart:new FormControl(null, [Validators.required]),
      breakEnd:new FormControl(null, [Validators.required]),
      breakStart1:new FormControl(null),
      breakEnd1:new FormControl(null),
      code: new FormControl(null),
      seqNo:new FormControl(null),
      breaknotifyAfter:new FormControl(null),
      shiftnotifyBefore:new FormControl(null),
      considerBreak:new FormControl(null),
      considerBreak1:new FormControl(null),
      autodeductBreak:new FormControl(null),
      autodeductBreak1:new FormControl(null),
      updatebrkPunch:new FormControl(null),
      updatebrkPunch1:new FormControl(null),
      normaldayothrsforEp:new FormControl(null),
      fridayothrsforEp:new FormControl(null),
      holidayothrsforEp:new FormControl(null),
      extrapayAmount:new FormControl(null),
      holidayExtrapay:new FormControl(null),
      woExtrapay:new FormControl(null),
      dailyExtrapay:new FormControl(null),
      rotateTo:new FormControl(null),
      isramdanShift1:new FormControl(null),
      isramdanShift:new FormControl(null)
    });

    this.activatedRoute.queryParams.subscribe(params => {
      this.shiftRuleForm.controls['shiftRuleId'].setValue(params.id);
      this.isView = params.view;
     // this.parentUrl = params.parentUrl;
    });
  }

  ngOnInit() {
    this.getHoldingList();
    this.getAllShiftRule();
    this.getShiftTypeByCode();
    if (this.shiftRuleForm.value.shiftRuleId) {
      this.shiftRUleService.getShiftRoleDataById(this.shiftRuleForm.value.shiftRuleId).subscribe(success => {
        var s: any = success;
        this.shiftRuleForm.patchValue(s.data);
        s.data.considerBreak =='Y'  ? this.shiftRuleForm.get('considerBreak1').setValue(true) : this.shiftRuleForm.get('considerBreak1').setValue(false);
        s.data.autodeductBreak =='Y'  ? this.shiftRuleForm.get('autodeductBreak1').setValue(true) : this.shiftRuleForm.get('autodeductBreak1').setValue(false);
        s.data.updatebrkPunch =='Y'  ? this.shiftRuleForm.get('updatebrkPunch1').setValue(true) : this.shiftRuleForm.get('updatebrkPunch1').setValue(false);

        let startTime: Date = new Date(s.data.startTime);
          let fromModel1: IMyDateModel = {isRange: false, singleDate: {jsDate: startTime}, dateRange: null};
          this.shiftRuleForm.controls['startTime1'].setValue(fromModel1);

          let endTime: Date = new Date(s.data.endTime);
          let fromModel2: IMyDateModel = {isRange: false, singleDate: {jsDate: endTime}, dateRange: null};
          this.shiftRuleForm.controls['endTime1'].setValue(fromModel2);

          let breakStart: Date = new Date(s.data.breakStart);
          let fromModel3: IMyDateModel = {isRange: false, singleDate: {jsDate: breakStart}, dateRange: null};
          this.shiftRuleForm.controls['breakStart1'].setValue(fromModel3);

          let breakEnd: Date = new Date(s.data.breakEnd);
          let fromModel4: IMyDateModel = {isRange: false, singleDate: {jsDate: breakEnd}, dateRange: null};
          this.shiftRuleForm.controls['breakEnd1'].setValue(fromModel4);

          
        this.getCompanyListByHoldingId(s.data.holdingId);
        s.data.isActive == 'Y' ? this.shiftRuleForm.get('status').setValue("ACTIVE") : this.shiftRuleForm.get('status').setValue("INACTIVE");
        s.data.isramdanShift=='Y'  ? this.shiftRuleForm.get('isramdanShift1').setValue(true) : this.shiftRuleForm.get('isramdanShift1').setValue(false);    
        this.shiftRuleForm.value.isNormalOT_ProRate == 'Y' ? this.shiftRuleForm.get('isNormalOT_ProRate1').setValue(true) : this.shiftRuleForm.get('isNormalOT_ProRate1').setValue(false);
        this.shiftRuleForm.value.isDoubleOT_ProRate == 'Y' ? this.shiftRuleForm.get('isDoubleOT_ProRate1').setValue(true) : this.shiftRuleForm.get('isDoubleOT_ProRate1').setValue(false);
        this.shiftRuleForm.value.isDefault == 'Y' ? this.shiftRuleForm.get('isDefault1').setValue(true) : this.shiftRuleForm.get('isDefault1').setValue(false);
        
        

        if (this.isView) { this.shiftRuleForm.disable(); }
      });
    } else{
      this.shiftRuleForm.get('status').setValue("ACTIVE");
    }
  }

  get f() { return this.shiftRuleForm.controls; }

  toggleCalendar(): void {
    this.cdr.detectChanges();
    this.myDp1.toggleCalendar();
  }
  changeStartTime(event){
    this.shiftRuleForm.get('startTime').setValue(event.singleDate.jsDate);
  }
  changeEndTime(event){
    this.shiftRuleForm.get('endTime').setValue(event.singleDate.jsDate);
  }
  changeBreakStart(event){
    this.shiftRuleForm.get('breakStart').setValue(event.singleDate.jsDate);
  }
  changeBreakEnd(event){
    this.shiftRuleForm.get('breakEnd').setValue(event.singleDate.jsDate);
  }

  getShiftTypeByCode(){
    this.commonService.getGeneralListByCode(GeneralListCode.SHIFT_TYPE_LIST).subscribe(data=>{
        this.shiftTypeList=data;
    })
  }
  getCompanyListByHoldingId(holdinId) {

    this.shiftRUleService.getCompanyListByHoldingId(holdinId).subscribe(s => {
      this.companyList = s;
      if(this.companyList){

        let list:any = JSON.parse(sessionStorage.getItem("company"));
        var l:any=[];
        if(list){
        for(var i=0;i<list.length;i++){
       //   if(list[i]!=','){
            l.push(Number(list[i]));
         // }
        }}
      
      this.companyList = this.companyList.filter(o1 => l.some(o2 => o1.gCompanyId === o2));
    }
    });
  }

  setFlag(){
    if(this.shiftRuleForm.value.autodeductBreak1){
       this.shiftRuleForm.get('autodeductBreak1').setValue(false) }
  }
  setFlag1(){
    
      if(this.shiftRuleForm.value.considerBreak1){ 
        this.shiftRuleForm.get('considerBreak1').setValue(false)}
      }

  getHoldingList() {
    this.shiftRUleService.getHoldingList().subscribe(s => {
      this.holdingList = s;
      this.shiftRuleForm.get('holdingId').setValue(this.holdingList[0].gHoldingId);
      this.getCompanyListByHoldingId(this.holdingList[0].gHoldingId) 
    });
  }

  addUpdateShiftRule() {

    // if(this.shiftRuleForm.value.startTime==null && this.shiftRuleForm.value.startTime1){
    //   this.shiftRuleForm.get('startTime').setValue(this.shiftRuleForm.value.startTime1.singleDate.jsDate);
    // }

    // if(this.shiftRuleForm.value.endTime==null && this.shiftRuleForm.value.endTime1){
    //   this.shiftRuleForm.get('endTime').setValue(this.shiftRuleForm.value.endTime1.singleDate.jsDate);
    // }

    // if(this.shiftRuleForm.value.breakStart==null && this.shiftRuleForm.value.breakStart1){
    //   this.shiftRuleForm.get('breakStart').setValue(this.shiftRuleForm.value.breakStart1.singleDate.jsDate);
    // }

    // if(this.shiftRuleForm.value.breakEnd==null && this.shiftRuleForm.value.breakEnd1){
    //   this.shiftRuleForm.get('breakEnd').setValue(this.shiftRuleForm.value.breakEnd1.singleDate.jsDate);
    // }

    this.shiftRuleForm.get('createdBy').setValue(Number(sessionStorage.getItem('userId')));
    this.shiftRuleForm.get('created').setValue(new Date());
    this.shiftRuleForm.get('updatedBy').setValue(Number(sessionStorage.getItem('userId')));
    this.shiftRuleForm.get('updated').setValue(new Date());
    this.shiftRuleForm.value.status == "ACTIVE" ? this.shiftRuleForm.get('isActive').setValue('Y') : this.shiftRuleForm.get('isActive').setValue('N');
  
    this.shiftRuleForm.value.isramdanShift1  ? this.shiftRuleForm.get('isramdanShift').setValue('Y') : this.shiftRuleForm.get('isramdanShift').setValue('N');
    this.shiftRuleForm.value.considerBreak1  ? this.shiftRuleForm.get('considerBreak').setValue('Y') : this.shiftRuleForm.get('considerBreak').setValue('N');
    this.shiftRuleForm.value.autodeductBreak1  ? this.shiftRuleForm.get('autodeductBreak').setValue('Y') : this.shiftRuleForm.get('autodeductBreak').setValue('N');
    this.shiftRuleForm.value.updatebrkPunch1  ? this.shiftRuleForm.get('updatebrkPunch').setValue('Y') : this.shiftRuleForm.get('updatebrkPunch').setValue('N');

    if(this.shiftRuleForm.value.normaldayothrsforEp){
    } else{
      this.shiftRuleForm.get('normaldayothrsforEp').setValue(null);
    }
    if(this.shiftRuleForm.value.fridayothrsforEp){
    } else{
      this.shiftRuleForm.get('fridayothrsforEp').setValue(null);
    }
    if(this.shiftRuleForm.value.holidayothrsforEp){
    } else{
      this.shiftRuleForm.get('holidayothrsforEp').setValue(null);
    }

    this.shiftRuleForm.get('exittimeroundoffLimit').setValue(Number(this.shiftRuleForm.value.exittimeroundoffLimit));
   

    this.shiftRuleForm.get('holidayExtrapay').setValue(Number(this.shiftRuleForm.value.holidayExtrapay));

    this.shiftRuleForm.get('woExtrapay').setValue(Number(this.shiftRuleForm.value.woExtrapay));

     this.shiftRuleForm.get('dailyExtrapay').setValue(Number(this.shiftRuleForm.value.dailyExtrapay));

    this.shiftRuleForm.get('timeroundoffLimit').setValue(Number(this.shiftRuleForm.value.timeroundoffLimit));
    this.shiftRuleForm.get('bufferTime').setValue(Number(this.shiftRuleForm.value.bufferTime));
    this.shiftRuleForm.get('halfdayHrs').setValue(parseFloat(this.shiftRuleForm.value.halfdayHrs));
    
    this.shiftRuleForm.value.rotateTo ? this.shiftRuleForm.get('rotateTo').setValue(Number(this.shiftRuleForm.value.rotateTo)) : this.shiftRuleForm.get('rotateTo').setValue(null);

    this.shiftRuleForm.get('lshifttypeId').setValue(Number(this.shiftRuleForm.value.lshifttypeId));
    this.shiftRuleForm.get('companyId').setValue(Number(this.shiftRuleForm.value.companyId));
    this.shiftRuleForm.value.isNormalOT_ProRate1 == true ? this.shiftRuleForm.get('isNormalOT_ProRate').setValue('Y') : this.shiftRuleForm.get('isNormalOT_ProRate').setValue('N');
    this.shiftRuleForm.value.isDoubleOT_ProRate1 == true ? this.shiftRuleForm.get('isDoubleOT_ProRate').setValue('Y') : this.shiftRuleForm.get('isDoubleOT_ProRate').setValue('N');
    this.shiftRuleForm.value.isDefault1 == true ? this.shiftRuleForm.get('isDefault').setValue('Y') : this.shiftRuleForm.get('isDefault').setValue('N');
     console.log(JSON.stringify(this.shiftRuleForm.value))
    this.submitted = true;
    if (this.shiftRuleForm.invalid) {
      return;
    } else {
      this.shiftRUleService.addUpdateShiftRule(this.shiftRuleForm.value).subscribe(success=>{
        var s: any = success;
        if(s.code==0){
          this.toastService.showToast('danger', s.message);
        } else{
        this.toastService.showToast('success', s.message);
        this.back();}
      });
    }
  }

  back() {
    // if (this.parentUrl) {
    //   this.router.navigate([this.parentUrl]);
    // } else {
    this.router.navigate(["/views/masters/shift-rule/shift-rule-summary"]);
    // }
  }

  getAllShiftRule() {
    // alert(sessionStorage.getItem("company"))
    let list: any = JSON.parse(sessionStorage.getItem("company"));
    var l: any = [];
    // alert(list.length)
    for (var i = 0; i < list.length; i++) {

      // if(list[i]!=','){
      l.push(Number(list[i]));
      //  }
    }

    //alert(l);
    this.shiftRUleService.getAllShiftRule(l).subscribe(s => {
      this.shiftRuleList = s;
    });
  }


}
