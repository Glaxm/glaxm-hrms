import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, FormArray, AbstractControl } from '@angular/forms';
import { ToastrService } from 'src/app/views/services/toastr.service';
import { ActivatedRoute, Router } from '@angular/router';
import { LeaveRuleService } from '../leave-rule.service';
import { CommonService, GeneralListCode } from 'src/app/views/services/common.service';
import { AngularMyDatePickerDirective, IMyDateModel } from 'angular-mydatepicker';
import { IDropdownSettings } from 'ng-multiselect-dropdown';

@Component({
  selector: 'app-add-leave-rule',
  templateUrl: './add-leave-rule.component.html',
  styleUrls: ['./add-leave-rule.component.scss']
})
export class AddLeaveRuleComponent implements OnInit {

  leaveRuleForm: FormGroup;

  submitted = false;
  isView: boolean = false;
  holdingList: any = [];
  companyList: any = [];

  isleaveItem: boolean = false;
  leaveItemList: any = [];
  leaveItemForm: FormGroup;
  xLeaveitemId: any;
  userForm: FormGroup;

  statusList: any = [{ valueCode: 'ACTIVE', valueName: 'Active' }, { valueCode: 'INACTIVE', valueName: 'Inactive' }]
  fromList: any = [{ id: 'First', value: 'First' }, { id: 'Next', value: 'Next' }];
  toList: any = [{ id: 'Full Pay', value: 'Full Pay' }, { id: 'Half Pay', value: 'Half Pay' }];

  public myDatePickerOptions = this.commonService.datepickerFormat;
  @ViewChild('dp1', { static: false }) myDp1: AngularMyDatePickerDirective;
  @ViewChild('dp2', { static: false }) myDp2: AngularMyDatePickerDirective;

  constructor(private formBuilder: FormBuilder, private commonService: CommonService, private toastService: ToastrService, private activatedRoute: ActivatedRoute, private leaveRuleService: LeaveRuleService, private router: Router) {
    this.leaveRuleForm = new FormGroup({
      leaveRuleId: new FormControl(null),
      companyId: new FormControl(null, [Validators.required]),
      holdingId: new FormControl(null, [Validators.required]),
      isActive: new FormControl(null),
      status: new FormControl(null),
      created: new FormControl(null),
      createdBy: new FormControl(null),
      updated: new FormControl(null),
      updatedBy: new FormControl(null),
      description: new FormControl(null),
      isSystemCheck: new FormControl(null),
      isSystemCheck1: new FormControl(null),
      code: new FormControl(null),
      name: new FormControl(null, [Validators.required]),

    });

    this.leaveItemForm = new FormGroup({
      xLeaveitemId: new FormControl(null),
      name: new FormControl(null),
      description: new FormControl(null),
      isLWP: new FormControl(null),
      code: new FormControl(null),
      isActive: new FormControl(null),
      gCompanyId: new FormControl(null, [Validators.required]),
      gHoldingId: new FormControl(null, [Validators.required]),
      leaveRuleId: new FormControl(null, [Validators.required]),
      leaveRuleName: new FormControl(null),
      created: new FormControl(null),
      createdBy: new FormControl(null),
      updated: new FormControl(null),
      updatedBy: new FormControl(null),
      validityFrom1: new FormControl(null),
      validFrom: new FormControl(null),
      validityTo1: new FormControl(null),
      validTo: new FormControl(null),
      paidleave1: new FormControl(null),
      paidleave: new FormControl(null),
      type: new FormControl(null),
      payment: new FormControl(null),
      leavewithoutpay1: new FormControl(null),
      leavewithoutpay: new FormControl(null),
      fullpay1: new FormControl(null),
      fullpay: new FormControl(null),
      halfpay1: new FormControl(null),
      halfpay: new FormControl(null),
      both1: new FormControl(null),
      both: new FormControl(null),
      tickets: new FormArray([]),
      pitem: new FormControl(null),
      applicablegender: new FormControl(null),
      applicableGrade: new FormControl(null),
      maritalstatus: new FormControl(null),
      applicablecategory: new FormControl(null),
      weeklyoffType: new FormControl(null),
      applicableReligion: new FormControl(null),
      considerholidays: new FormControl(null),
      considerweekend: new FormControl(null),
      exceedleavebal: new FormControl(null),
      excddeductfrom: new FormControl(null),
      fulldayAllowed: new FormControl(null),
      halfdayAllowed: new FormControl(null),
      docreq: new FormControl(null),
      payitemId:new FormControl(null),
      applEntitledtype:new FormControl(null),
      days:new FormControl(null),
      leaveperReq: new FormControl(null)

    })

    this.activatedRoute.queryParams.subscribe(params => {
      this.leaveRuleForm.controls['leaveRuleId'].setValue(params.id);
      this.isView = params.view;
    });
  }

  ngOnInit() {
    this.companySetting();
    this.getHoldingList();
    this.getLeaveTypeList();
    this.getLeaveRuleList();
    this.getGenderList();
    this.getMaritialStatusList();
  
    this.getLeaveExcedDeductFromList();
    this.geTexcedLeaveBalList();
    this.getEmpGradeList();

    if (this.leaveRuleForm.value.leaveRuleId) {
      this.leaveRuleService.getLeaveRuleDataById(this.leaveRuleForm.value.leaveRuleId).subscribe(success => {
        var s: any = success;
        this.leaveRuleForm.patchValue(s.data);
        this.getCompanyListByHoldingId(s.data.holdingId);
        s.data.isActive == 'Y' ? this.leaveRuleForm.get('status').setValue("ACTIVE") : this.leaveRuleForm.get('status').setValue("INACTIVE");
        s.data.isSystemCheck == 'Y' ? this.leaveRuleForm.get('isSystemCheck1').setValue(true) : this.leaveRuleForm.get('isSystemCheck1').setValue(false);

        if (this.isView) { this.leaveRuleForm.disable(); }
      });
      this.getLeaveItemById(this.leaveRuleForm.value.leaveRuleId);
    } else {
      this.leaveRuleForm.get('status').setValue("ACTIVE");
    }
  }

  get f() { return this.leaveRuleForm.controls; }

  getCompanyListByHoldingId(holdinId) {

    this.leaveRuleService.getCompanyListByHoldingId(holdinId).subscribe(s => {
      this.companyList = s;
    });
  }

  periodList: any = [{ id: 'Days', value: 'Days' }, { id: 'Months', value: 'Months' }];
  daysList: any = [{ id: 'First Day', value: 'First Day' }, { id: 'Last Day', value: 'Last Day' }];
  monthList: any = [{ id: 'JAN', value: 'JAN' }, { id: 'FEB', value: 'FEB' }, { id: 'MAR', value: 'MAR' }, { id: 'APR', value: 'APR' }, { id: 'MAY', value: 'MAY' }, { id: 'JUN', value: 'JUN' },
  { id: 'JUL', value: 'JUL' }, { id: 'AUG', value: 'AUG' }, { id: 'SEP', value: 'SEP' }, { id: 'OCT', value: 'OCT' }, { id: 'NOV', value: 'NOV' }, { id: 'DEC', value: 'DEC' }];
  genederList: any = [];
  maritalStatusList: any = [];
  leaveBalList: any = [];
  partOfLeaveList: any = [];
  excedLeaveBalList: any = [];
  empCatList: any = [];
  yesNoList: any = [{ id: 'Y', value: 'YES' }, { id: 'N', value: 'NO' }];
  leaveExcedDeductFromList: any = [];
  empGradeList: any = [];
  payitemList: any = [];
  getLeaveTypeList() {
    this.commonService.getGeneralListByCode(GeneralListCode.LEAVE_TYPE_LIST).subscribe(data => {
      this.leaveTypeList = data;
    });
  }

  getLeaveExcedDeductFromList() {
    this.commonService.getGeneralListByCode(GeneralListCode.LEAVE_EXCED_DEDUCT_FROM_LIST).subscribe(data => {
      this.leaveExcedDeductFromList = data;
    });
  }

  geTexcedLeaveBalList() {
    this.commonService.getGeneralListByCode(GeneralListCode.EXCED_LEAVE_BALANCE).subscribe(data => {
      this.excedLeaveBalList = data;
    })
  }


  getGenderList() {
    this.commonService.getGeneralListByCode(GeneralListCode.GENDER_LIST).subscribe(data => {
      this.genederList = data;
    });
  }

  getMaritialStatusList() {
    this.commonService.getGeneralListByCode(GeneralListCode.MARITALL_STATUS_LIST).subscribe(data => {
      this.maritalStatusList = data;
    })
  }


  getEmpGradeList() {
    this.leaveRuleService.getEmpGradeList().subscribe(data => {
      this.empGradeList = data;
    });
  }
  obj={ payItemId:null }
  getPayitemList(){
      this.leaveRuleService.getPayitemList().subscribe(data=>{
        var list:any = data;
        this.payitemList = list.data;
       
        if(this.leaveItemForm.value.xLeaveitemId){
          this.selectedPayitemList = this.payitemList.filter(o1 => this.obj.payItemId.some(o2 => o1.payItemId === o2));
        }
      });
  }

  getYesNoList() {
    this.commonService.getGeneralListByCode(GeneralListCode.YES_NO_LIST).subscribe(data => {
      this.yesNoList = data;
    })
  }

  getLeaveRuleList() {
    this.leaveRuleService.getEmpCatList().subscribe(data => {
      this.empCatList = data;
    })
  }

  getHoldingList() {
    this.leaveRuleService.getHoldingList().subscribe(s => {
      this.holdingList = s;
      this.leaveRuleForm.get('holdingId').setValue(this.holdingList[0].gHoldingId);
      this.getCompanyListByHoldingId(this.holdingList[0].gHoldingId)
    });
  }

  setPayitemList(list) {
    let elm: any = [];
    list.forEach(element => {
      elm.push(element.payItemId);
    });
    let unique = [...new Set(elm)];
    return unique;
  }

  addUpdateLeaveRule() {
   
    this.leaveRuleForm.get('createdBy').setValue(Number(sessionStorage.getItem('userId')));
    this.leaveRuleForm.get('created').setValue(new Date());
    this.leaveRuleForm.get('updatedBy').setValue(Number(sessionStorage.getItem('userId')));
    this.leaveRuleForm.get('companyId').setValue(Number(this.leaveRuleForm.value.companyId));
    this.leaveRuleForm.value.leaveRuleId ? this.leaveRuleForm.get('leaveRuleId').setValue(Number(this.leaveRuleForm.value.leaveRuleId)) : this.leaveRuleForm.get('leaveRuleId').setValue(undefined);
    this.leaveRuleForm.get('updated').setValue(new Date());
    this.leaveRuleForm.value.status == "ACTIVE" ? this.leaveRuleForm.get('isActive').setValue('Y') : this.leaveRuleForm.get('isActive').setValue('N');
    this.leaveRuleForm.value.isSystemCheck1 == true ? this.leaveRuleForm.get('isSystemCheck').setValue('Y') : this.leaveRuleForm.get('isSystemCheck').setValue('N');

    

    this.submitted = true;
    if (this.leaveRuleForm.invalid) {
      return;
    } else {
      this.leaveRuleService.addUpdateLeaveRule(this.leaveRuleForm.value).subscribe(success => {
        var s: any = success;
        if(s.code==0){
          this.toastService.showToast('danger', s.message);
        } else{
        this.toastService.showToast('success', s.message);

        this.leaveRuleForm.patchValue(s.data);
        this.getCompanyListByHoldingId(s.data.holdingId);
        s.data.isActive == 'Y' ? this.leaveRuleForm.get('status').setValue("ACTIVE") : this.leaveRuleForm.get('status').setValue("INACTIVE");
        s.data.isSystemCheck == 'Y' ? this.leaveRuleForm.get('isSystemCheck1').setValue(true) : this.leaveRuleForm.get('isSystemCheck1').setValue(false);
        this.router.navigate(['/views/masters/leave-rule/add-leave-rule'], { queryParams: { id: s.data.leaveRuleId } });
      
      }
    });
    }
  }

  back() {
    this.router.navigate(["/views/masters/leave-rule/leave-rule-summary"]);
  }

  holdingItemList: any = [];
  companyLeaveList: any = [];
  payItemList: any = [];
  leaveTypeList: any = [];
  unitList: any = [{ valueCode: "Y", valueName: "Year" }, { valueCode: "M", valueName: "Month" }];
  get g() { return this.leaveItemForm.controls; }
  get t() { return this.g.tickets as FormArray; }
  addLeaveItem() {
    this.leaveItemForm.reset();
    this.getPayitemList();
    this.leaveItemForm.get('code').enable();
    this.leaveItemForm.get('leaveRuleName').setValue(this.leaveRuleForm.value.name);
    this.xLeaveitemId = null;
    this.leaveItemForm.get('xLeaveitemId').setValue(null);
  }


  getDataList(list, itemid) {
    let li = [];
    if (list) {

      list.filter(e => {
        if (e.effectafterCycle) {
          li.push({
            leaveRuleId: this.leaveRuleForm.value.leaveRuleId,
            isActive: 'Y',
            xLeaveitemId: Number(itemid),
            gCompanyId: this.leaveRuleForm.value.gCompanyId,
            gHoldingId: this.leaveRuleForm.value.gHoldingId,
            created: new Date(),
            createdBy: Number(sessionStorage.getItem('userId')),
            updated: new Date(),
            updatedBy: Number(sessionStorage.getItem('userId')),
            effectafterDays: e.effectafterDays,
            effectafterPeriod: e.effectafterPeriod,
            paymentType: e.paymentType,
            effectafterCycle: e.effectafterCycle,
            xLeavebrkupId:e.xLeavebrkupId
          })
        }
      });
    }
    return li;
  }

  getPolicyData(list, itemid) {

    let li = [];
    if (list) {

      list.filter(e => {
        if (e.effectafterCycle) {
          li.push({

            isActive: "N",
            gCompanyId: this.leaveRuleForm.value.gCompanyId,
            gHoldingId: this.leaveRuleForm.value.gHoldingId,
            xLeaveitemId: Number(itemid),
            created: new Date(),
            createdBy: Number(sessionStorage.getItem('userId')),
            updated: new Date(),
            updatedBy: Number(sessionStorage.getItem('userId')),
            effectafterCount: 1,
            effectafterCycle: "Y",
            effectafterFrom: "DOJ",
            accrualonCycle: "M",
            accrualonDate: "Policy Date",
            accrualonMonth: "Policy Month",
            accrualDays: 10,
            resetonCycle: "Y",
            resetonDate: "1st",
            resetonMonth: "Jan",
            carryforwardDays: 10,
            carryforwardmaxDays: 50,
            encashDays: 9,
            encashmaxDays: 50
          })
        }
      });
    }
  }


  saveLeaveItem() {

    let paitemList: any = this.setPayitemList(this.selectedPayitemList)
    this.leaveItemForm.controls['payitemId'].setValue(paitemList);
    
    this.leaveItemForm.get('createdBy').setValue(Number(sessionStorage.getItem('userId')));
    this.leaveItemForm.get('created').setValue(new Date());
    this.leaveItemForm.get('updatedBy').setValue(Number(sessionStorage.getItem('userId')));
    this.leaveItemForm.get('updated').setValue(new Date());
    this.leaveItemForm.get('leaveRuleId').setValue(Number(this.leaveRuleForm.value.leaveRuleId));
    this.leaveItemForm.get('gCompanyId').setValue(Number(this.leaveRuleForm.value.companyId));
    this.leaveItemForm.get('gHoldingId').setValue(Number(this.leaveRuleForm.value.holdingId));
    this.xLeaveitemId ? this.leaveItemForm.get('xLeaveitemId').setValue(Number(this.xLeaveitemId)) : this.leaveItemForm.get('xLeaveitemId').setValue(undefined);
    this.leaveItemForm.get('isActive').setValue('Y');// this.leaveItemForm.value.status == "ACTIVE" ? this.leaveItemForm.get('isActive').setValue('Y') : this.leaveItemForm.get('isActive').setValue('N');
    this.leaveItemForm.value.type == 'PAIDLEAVE' ? this.leaveItemForm.get('isLWP').setValue('N') : this.leaveItemForm.get('isLWP').setValue('Y');
    
    if(this.leaveItemForm.value.applEntitledtype=="") {
      this.leaveItemForm.get('applEntitledtype').setValue(null);
    } 
    

    if(this.leaveItemForm.value.applicableGrade==null){
      this.leaveItemForm.get('applicableGrade').setValue([]);
    } 


    if(this.leaveItemForm.value.exceedleavebal){

    } else{
      this.leaveItemForm.get('exceedleavebal').setValue('N');
    }
    // alert(JSON.stringify(this.leaveItemForm.value));
    // if (this.leaveItemForm.value.isLWP == 'Y') {
      // alert(this.leaveItemForm.value.payment);
      // if (this.leaveItemForm.value.paytype == 'BOTH') {
      //   this.leaveItemForm.get('halfdayAllowed').setValue('Y');
      //   this.leaveItemForm.get('fulldayAllowed').setValue('Y');
      // } else {
      //   if (this.leaveItemForm.value.paytype == 'FULLPAY') {
      //     this.leaveItemForm.get('halfdayAllowed').setValue('N');
      //     this.leaveItemForm.get('fulldayAllowed').setValue('Y');
      //     this.t.clear();
      //   }
      //   if (this.leaveItemForm.value.paytype == 'HALFPAY') {
      //     this.leaveItemForm.get('halfdayAllowed').setValue('Y');
      //     this.leaveItemForm.get('fulldayAllowed').setValue('N');
      //     this.t.clear();
      //   }
      // }
    // } else {
    //   this.t.clear();
    // }

    

    this.submitted = true;
    if (this.leaveItemForm.invalid) {
      return;
    } else {
      this.leaveRuleService.saveLeaveItem(this.leaveItemForm.value).subscribe(s => {
        var success: any = s;
        this.toastService.showToast('success', success.message);
        this.getLeaveItemById(this.leaveRuleForm.value.leaveRuleId);
        this.xLeaveitemId = success.data.xLeaveitemId;
        let leavePayBreakupList = this.getDataList(this.t.value, success.data.xLeaveitemId);
        this.saveLeavePayBreakup(leavePayBreakupList);
        this.entitlementList.map(e => { e.xLeaveitemId = this.xLeaveitemId; });
        this.saveEntitlement(this.entitlementList);
        this.isleaveItem = false;
      });
    }
  }

  entitlementList: any = [];

  getRestrictionData(event) {
  
    this.leaveItemForm.get('considerholidays').setValue(event.considerholidays);
    this.leaveItemForm.get('considerweekend').setValue(event.considerweekend);
    this.leaveItemForm.get('exceedleavebal').setValue(event.exceedleavebal);
    this.leaveItemForm.get('excddeductfrom').setValue(event.excddeductfrom);
    this.leaveItemForm.get('fulldayAllowed').setValue(event.fulldayAllowed);
    this.leaveItemForm.get('halfdayAllowed').setValue(event.halfdayAllowed);
    this.leaveItemForm.get('docreq').setValue(event.docreq);
    this.leaveItemForm.get('leaveperReq').setValue(event.leaveperReq);
  }

  getApplicableData(event) {
    this.leaveItemForm.get('applicablegender').setValue(event.applicablegender);
    this.leaveItemForm.get('maritalstatus').setValue(event.maritalstatus);
    this.leaveItemForm.get('applicablecategory').setValue(event.applicablecategory!=null ? Number(event.applicablecategory) : null);
    this.leaveItemForm.get('weeklyoffType').setValue(event.weeklyoffType);
    this.leaveItemForm.get('applicableReligion').setValue(event.applicableReligion!=null ? Number(event.applicableReligion) : null);
    this.leaveItemForm.get('applEntitledtype').setValue(event.applEntitledtype);
    this.leaveItemForm.get('applicableGrade').setValue(event.applicableGrade);
  }

  saveEntitlement(list) {
    this.leaveRuleService.saveEntitlement(list).subscribe(data => {
      var success: any = data;
    });
  }

  getEntitlementData(event) {
    console.log(JSON.stringify(event));
    this.entitlementList = [
      {
        isActive: "Y",
        gCompanyId: event.gCompanyId,
        gHoldingId: event.gHoldingId,
        xLeaveitemId: this.xLeaveitemId,
        created: this.leaveItemForm.value.created,
        createdBy: this.leaveItemForm.value.createdBy,
        updated: this.leaveItemForm.value.updated,
        updatedBy: this.leaveItemForm.value.updatedBy,
        effectafterCount: Number(event.effectafterCount),
        effectafterCycle: event.effectafterCycle,
        effectafterFrom: event.effectafterFrom,
        accrualonCycle: event.accrualonCycle,
        accrualonDate: event.accrualonDate,
        accrualonMonth: event.accrualonMonth,
        accrualDays: Number(event.accrualDays),
        resetonCycle: event.resetonCycle,
        resetonDate: event.resetonDate,
        resetonMonth: event.resetonMonth,
        carryforword1: event.carryforword1,
        carryforwardCount: Number(event.carryforwardCount),
        carryforwardUnit: event.carryforwardUnit,
        carryforwardmaxDays: Number(event.carryforwardmaxDays),
        encashCount: Number(event.encashCount),
        encashUnit: event.encashUnit,
        accrual: event.accrual1 ? 'Y':'N',
        reset: event.reset1 ? 'Y':'N',
        carryforward: event.carryforward1 ? 'Y':'N',
        encash: event.encashment1 ? 'Y':'N',
        xLeavepolicyId:event.xLeavepolicyId ? event.xLeavepolicyId : undefined,
        encashmaxDays: Number(event.encashmaxDays)
      }
    ];
  }

  saveLeavePayBreakup(data) {
    this.leaveRuleService.saveLeavePayBreakup(data).subscribe(s => {
      var success: any = s;
    });
  }

  getLeaveItemById(id) {
    this.leaveRuleService.getLeaveItemById(id).subscribe(s => {
      this.leaveItemList = s;
    });
  }

  getDataUsingRedioBtn(data) {
    this.leaveItemForm.get('xLeaveitemId').setValue(data.xLeaveitemId);
    this.xLeaveitemId = data.xLeaveitemId;
  }

  editLeaveItem() {
    this.leaveItemForm.reset();
   
    this.leaveItemForm.get('xLeaveitemId').setValue(this.xLeaveitemId);
    if (this.leaveItemForm.value.xLeaveitemId) {
      this.leaveRuleService.editLeaveItem(this.leaveItemForm.value.xLeaveitemId).subscribe(s => {
        var success: any = s;
        this.obj.payItemId = success.data.payitemId;
        this.getPayitemList();
        this.leaveItemForm.patchValue(success.data);
        // this.leaveItemForm.get('code').disable();
        if (success.data.validFrom) {
          let validFrom: Date = new Date(success.data.validFrom);
          let fromModel9: IMyDateModel = { isRange: false, singleDate: { jsDate: validFrom }, dateRange: null };
          this.leaveItemForm.controls['validityFrom1'].setValue(fromModel9);
        }
        if (success.data.validTo) {
          let validTo: Date = new Date(success.data.validTo);
          let fromModel: IMyDateModel = { isRange: false, singleDate: { jsDate: validTo }, dateRange: null };
          this.leaveItemForm.controls['validityTo1'].setValue(fromModel);
        }

        success.data.isLWP == 'Y' ?   this.leaveItemForm.controls['type'].setValue('LEAVEWITHOUTPAY'):this.leaveItemForm.controls['type'].setValue('PAIDLEAVE');
       
        if(success.data.isLWP=='N' && success.data.payment=="B"){
            this.setBreakpointList(this.leaveItemForm.value.xLeaveitemId);
          }
        // if (success.data.halfdayAllowed == 'Y' && success.data.fulldayAllowed == 'Y') {
        //   this.leaveItemForm.get('paytype').setValue('BOTH');
        //   this.setBreakpointList(this.leaveItemForm.value.xLeaveitemId);
        // } else {
        //   if (success.data.halfdayAllowed == 'Y') {
        //     this.leaveItemForm.get('paytype').setValue('HALFPAY');
        //   }
        //   if (success.data.fulldayAllowed == 'Y') {
        //     this.leaveItemForm.get('paytype').setValue('FULLPAY');
        //   }
        // }

        if (this.isView) { this.leaveItemForm.disable(); }
      });
    }
  }

  //breakpointObj={}
  setBreakpointList(id) {
    this.leaveRuleService.setBreakpointListById(id).subscribe(data => {
      let list: any = data;

      // this.t.setValue([list[0].effectafterCycle,list[0].effectafterDays,list[0].paymentType]);
      this.t.clear();

      for (let i = 0; i < list.length; i++) {
        this.setValue(list[i].xLeavebrkupId,list[i].effectafterCycle, list[i].effectafterDays, list[i].effectafterPeriod,list[i].paymentType);
      }

    });

  }

  setValue(i,c, d, p, t) {
    this.t.push(this.formBuilder.group({
      xLeavebrkupId:i,
      effectafterCycle: c,
      effectafterDays: d,
      effectafterPeriod: p,
      paymentType: t
    }));
    //this.t.patchValue({user: this.question.user, questioning: this.question.questioning})
  }

  changeToDate(event) {
    // this.leaveItemForm.get('validTo').setValue(this.commonService.dateFormat(event.singleDate.jsDate)); 
    this.leaveItemForm.get('validTo').setValue(event.singleDate.jsDate);
  }

  changeFromDate(event) {
    // this.leaveItemForm.get('validFrom').setValue(this.commonService.dateFormat(event.singleDate.jsDate)); 
    this.leaveItemForm.get('validFrom').setValue(event.singleDate.jsDate);
  }

  onChangeTickets(index) {

    if (index == this.t.length || index + 1 == this.t.length) {
      this.t.push(this.formBuilder.group({
        effectafterCycle: [null],
        effectafterDays: [null],
        effectafterPeriod: ['Days'],
        paymentType: [null]
      }));
    } else {
      this.t.removeAt(index);
    }

  }
  resetList() {
    this.t.clear();
  }

  getClass(index) {
    return index + 1 == this.t.length ? 'fa fa-plus' : 'fa fa-minus';
  }



   //================================================ Multiselect Payitem list

   selectedPayitemList = [];
   dropdownSettings: IDropdownSettings;
 
   companySetting() {
     this.dropdownSettings = {
       singleSelection: false,
       idField: 'payItemId',
       textField: 'name',
       selectAllText: 'Select All',
       unSelectAllText: 'UnSelect All',
       itemsShowLimit: 3,
       allowSearchFilter: true
     };
   }
  
   onPayitemSelect(item: any) {
     this.selectedPayitemList.push(item);
   }
 
   onPayitemDeSelect(items: any) {
     this.selectedPayitemList = this.selectedPayitemList.filter(item => item.payItemId !== items.payItemId);
   }
 
   onSelectAllPayitem(items: any) {
     this.selectedPayitemList = [];
     this.selectedPayitemList.push(...[items]);
   }


  //  ===================
  setImgUsingLeaveType(leavetype){
    if(leavetype=="Annual Leave"){  return "assets/images/user/leavetypeicon/annual_leave.jpg"; } 
    if(leavetype=="Sick Leave"){ return "assets/images/user/leavetypeicon/sick_leave.png"; }
    if(leavetype=="Employment Accident Leave"){ return "assets/images/user/leavetypeicon/employee_accident_leave.png";}
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
    if(leavetype=="Business Absence"){ return "assets/images/user/leavetypeicon/business_absence.PNG"; }
    
    return "assets/images/user/no_image.png";
  }


  



}
