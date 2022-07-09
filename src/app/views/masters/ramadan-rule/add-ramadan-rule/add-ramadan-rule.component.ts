import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AngularMyDatePickerDirective, IMyDateModel } from 'angular-mydatepicker';
import { CommonService } from 'src/app/views/services/common.service';
import { ToastrService } from 'src/app/views/services/toastr.service';
import { ActivatedRoute, Router } from '@angular/router';
import { RamdanRuleService } from '../ramdan-rule.service';

@Component({
  selector: 'app-add-ramadan-rule',
  templateUrl: './add-ramadan-rule.component.html',
  styleUrls: ['./add-ramadan-rule.component.scss']
})
export class AddRamadanRuleComponent implements OnInit {

  public myDatePickerOptions = this.commonService.datepickerFormat;
  @ViewChild('dp1', {static: false}) myDp1: AngularMyDatePickerDirective;
  @ViewChild('dp2', {static: false}) myDp2: AngularMyDatePickerDirective;
  ramadanRuleForm: FormGroup;
  submitted = false;
  isView: boolean = false;
  holdingList: any = [];
  companyList: any = [];
  empCatList:any=[];
  statusList: any = [{ valueCode: 'ACTIVE', valueName: 'Active' }, { valueCode: 'INACTIVE', valueName: 'Inactive' }]
  constructor(private commonService:CommonService,private toastService: ToastrService, private cdr: ChangeDetectorRef,
    private activatedRoute: ActivatedRoute, private ramadanRulesService: RamdanRuleService, private router: Router) {
    this.ramadanRuleForm = new FormGroup({
      ramadanRuleId: new FormControl(null),
      companyId: new FormControl(null, [Validators.required]),
      holdingId: new FormControl(null, [Validators.required]),
      isActive: new FormControl(null),
      status: new FormControl(null),
      created: new FormControl(null),
      createdBy: new FormControl(null),
      updated: new FormControl(null),
      updatedBy: new FormControl(null),
      code: new FormControl(null),
      empCategoryId:new FormControl(null),
      startDate:new FormControl(null),
      startDate1:new FormControl(null,[Validators.required]),
      endDate:new FormControl(null),
      endDate1:new FormControl(null,[Validators.required]),
      paidOffHrs:new FormControl(null,[Validators.required]),
      isPaidProRate:new FormControl(null),
      remarks:new FormControl(null),
      religionId:new FormControl(null),
      stdate:new FormControl(null),
      endate:new FormControl(null),

    });

    this.activatedRoute.queryParams.subscribe(params => {
      this.ramadanRuleForm.controls['ramadanRuleId'].setValue(params.id);
      this.isView = params.view;
    });
  }

  ngOnInit() {
    this.getHoldingList();
    this.getEmpCatList();
    if (this.ramadanRuleForm.value.ramadanRuleId) {
      this.ramadanRulesService.getRamadanRulesById(this.ramadanRuleForm.value.ramadanRuleId).subscribe(success => {
        var s: any = success;
        this.ramadanRuleForm.patchValue(s.data);

        let startDate: Date = new Date(s.data.startDate);
        let fromModel: IMyDateModel = {isRange: false, singleDate: {jsDate: startDate}, dateRange: null};
        this.ramadanRuleForm.controls['startDate1'].setValue(fromModel);
        
        let endDate: Date = new Date(s.data.endDate);
        let fromModel1: IMyDateModel = {isRange: false, singleDate: {jsDate: endDate}, dateRange: null};
        this.ramadanRuleForm.controls['endDate1'].setValue(fromModel1);
        s.data.isPaidProRate == 'Y' ? this.ramadanRuleForm.get('isPaidProRate').setValue(true) : this.ramadanRuleForm.get('isPaidProRate').setValue(false)

        this.getCompanyListByHoldingId(s.data.holdingId);
        s.data.isActive == 'Y' ? this.ramadanRuleForm.get('status').setValue("ACTIVE") : this.ramadanRuleForm.get('status').setValue("INACTIVE");
        if (this.isView) { this.ramadanRuleForm.disable(); }
      });
    } else {
      this.ramadanRuleForm.get('status').setValue("ACTIVE");
    }
  }

  get f() { return this.ramadanRuleForm.controls; }

  toggleCalendar(): void {
    this.cdr.detectChanges();
    this.myDp1.toggleCalendar();
  }
  changeStartDate(event){
    this.ramadanRuleForm.get('startDate').setValue(event.singleDate.jsDate);
    this.ramadanRuleForm.get('stdate').setValue(this.commonService.dateFormat(event.singleDate.jsDate));
  }
  changeEndDate(event){
    this.ramadanRuleForm.get('endDate').setValue(event.singleDate.jsDate);
    this.ramadanRuleForm.get('endate').setValue(this.commonService.dateFormat(event.singleDate.jsDate));
  }

  getCompanyListByHoldingId(holdinId) {
    this.ramadanRulesService.getCompanyListByHoldingId(holdinId).subscribe(s => {
      this.companyList = s;
    });
  }

  getEmpCatList(){
    this.ramadanRulesService.getEmpCatList().subscribe(s=>{
      this.empCatList = s;
    });
  }

  getHoldingList() {
    this.ramadanRulesService.getHoldingList().subscribe(s => {
      this.holdingList = s;
      this.ramadanRuleForm.get('holdingId').setValue(this.holdingList[0].gHoldingId);
      this.getCompanyListByHoldingId(this.holdingList[0].gHoldingId) 
    });
  }

  addUpdateRamdanRules() {
    this.ramadanRuleForm.get('createdBy').setValue(Number(sessionStorage.getItem('userId')));
    this.ramadanRuleForm.get('created').setValue(new Date());
    this.ramadanRuleForm.get('updatedBy').setValue(Number(sessionStorage.getItem('userId')));
    this.ramadanRuleForm.get('updated').setValue(new Date());

    this.ramadanRuleForm.get('companyId').setValue(Number(this.ramadanRuleForm.value.companyId));
    this.ramadanRuleForm.get('empCategoryId').setValue(Number(this.ramadanRuleForm.value.empCategoryId));
    // this.ramadanRuleForm.get('paidOffHrs').setValue(Number(this.ramadanRuleForm.value.paidOffHrs));

    this.ramadanRuleForm.value.status == "ACTIVE" ? this.ramadanRuleForm.get('isActive').setValue('Y') : this.ramadanRuleForm.get('isActive').setValue('N');
    
    this.ramadanRuleForm.value.isPaidProRate == true ? this.ramadanRuleForm.get('isPaidProRate').setValue('Y') : this.ramadanRuleForm.get('isPaidProRate').setValue('Y')
    this.submitted = true;
    if (this.ramadanRuleForm.invalid) {
      return;
    } else {
      this.ramadanRulesService.addUpdateRamadanRules(this.ramadanRuleForm.value).subscribe(success => {
        var s: any = success;
        if(s.code==0){
          this.toastService.showToast('danger', s.message);
        }else{
        this.toastService.showToast('success', s.message);
        this.back();}
      });
    }
  }

  back() {
    // if (this.parentUrl) {
    //   this.router.navigate([this.parentUrl]);
    // } else {
    this.router.navigate(["/views/masters/ramadan-rule/ramdan-rules-summary"]);
    // }
  }


}
