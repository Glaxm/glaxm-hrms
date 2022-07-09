import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularMyDatePickerDirective, IMyDateModel } from 'angular-mydatepicker';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { CommonService } from 'src/app/views/services/common.service';
import { ToastrService } from 'src/app/views/services/toastr.service';
import { PayrollSettingService } from '../payroll-setting.service';

@Component({
  selector: 'app-add-payroll-setting',
  templateUrl: './add-payroll-setting.component.html',
  styleUrls: ['./add-payroll-setting.component.scss']
})
export class AddPayrollSettingComponent implements OnInit {

  public myDatePickerOptions = this.commonService.datepickerFormat;
  @ViewChild('dp1', { static: false }) myDp1: AngularMyDatePickerDirective;
  @ViewChild('dp2', { static: false }) myDp2: AngularMyDatePickerDirective;

  payrollsettingForm: FormGroup;
  isView: boolean = false;
  holdingList: any = [];
  companyList: any = [];
  parentUrl: any;
  submitted: boolean = false;
  obj={ companyId:null }
  weekendholidayList: any = [{ valueCode: 'S', valueName: 'Sunday' }, { valueCode: 'M', valueName: 'Monday' },
  { valueCode: 'T', valueName: 'Tuesday' },
  { valueCode: 'W', valueName: 'Wednesday' }, { valueCode: 'H', valueName: 'Thursday' },
  { valueCode: 'F', valueName: 'Friday' }, { valueCode: 'R', valueName: 'Saturday' }];
  
  weekendholidayList1: any = [{ valueCode: 'S', valueName: 'Sunday' }, { valueCode: 'M', valueName: 'Monday' },
  { valueCode: 'T', valueName: 'Tuesday' },
  { valueCode: 'W', valueName: 'Wednesday' }, { valueCode: 'H', valueName: 'Thursday' },
  { valueCode: 'F', valueName: 'Friday' }, { valueCode: 'R', valueName: 'Saturday' }];
  
  statusList: any = [{ valueCode: 'ACTIVE', valueName: 'Active' }, { valueCode: 'INACTIVE', valueName: 'Inactive' }]
  
  constructor(private commonService:CommonService,private cdr: ChangeDetectorRef,private toastService: ToastrService, private payrollsettingService: PayrollSettingService,
    private router: Router, private activatedRoute: ActivatedRoute) {
    this.payrollsettingForm = new FormGroup({
      xPayrollsettingId: new FormControl(null),
      gHoldingId: new FormControl(null, [Validators.required]),
      isActive: new FormControl(null, [Validators.required]),
      status: new FormControl(null),
      gCompanyId: new FormControl(null),
      company: new FormControl(null, [Validators.required]),
      created: new FormControl(null),
      createdBy: new FormControl(null),
      updated: new FormControl(null),
      
      updatedBy: new FormControl(null),
      doubleOtRate: new FormControl(null),
      normalOtRate: new FormControl(null, [Validators.required]),
      roundOffAcct:new FormControl(null),
      code: new FormControl(null),
      weekendOtRate: new FormControl(null, [Validators.required]),
      holidayNormal: new FormControl('Y'),
      holidayOtRate: new FormControl(null, [Validators.required]),
      weekendHoliday: new FormControl(null),
      weekendHoliday1: new FormControl(null),
      weekendHolidayNumber: new FormControl(null),
      isHolidayexcluded: new FormControl('Y'),
      xPayitemjobId: new FormControl(null),
      xPayitembonusId: new FormControl(null),
      effdate: new FormControl(null),
      endDate: new FormControl(null),
      endDate1: new FormControl(null),
      effectiveDate: new FormControl(null),
      payItemEffectiveDate: new FormControl(null, [Validators.required]),
      normaldayothrsforEp: new FormControl(null),
      fridayothrsforEp: new FormControl(null),
      holidayothrsforEp: new FormControl(null),
      ep_normalOtRate: new FormControl(null),
      ep_weekendOtRate: new FormControl(null),
      ep_holidayOtRate: new FormControl(null),

  });
    this.activatedRoute.queryParams.subscribe(params => {
      this.payrollsettingForm.controls['xPayrollsettingId'].setValue(params.id);
      this.isView = params.view;
    });

  }
  get f() { return this.payrollsettingForm.controls; }

  
  changeEffectiveDate(event) {
    this.payrollsettingForm.get('effdate').setValue(this.commonService.dateFormat(event.singleDate.jsDate));
    this.payrollsettingForm.get('effectiveDate').setValue(event.singleDate.jsDate);
  }

  changeEndDate(event) {
    this.payrollsettingForm.get('endDate').setValue(event.singleDate.jsDate);
  }

  ngOnInit() {
    this.companySetting();
    this.getHoldingList();
    if (this.payrollsettingForm.value.xPayrollsettingId) {
      this.payrollsettingService.getPayrollsettingDetailsById(this.payrollsettingForm.value.xPayrollsettingId).subscribe(s => {
        var success: any = s;
       this.getCOmpanyById(success.data.gHoldingId);
        this.payrollsettingForm.patchValue(success.data);
       this.obj.companyId = success.data.gCompanyId;
        if(success.data.effectiveDate){
        let startDate: Date = new Date(success.data.effectiveDate);
        let fromModel: IMyDateModel = { isRange: false, singleDate: { jsDate: startDate }, dateRange: null };
        this.payrollsettingForm.controls['payItemEffectiveDate'].setValue(fromModel);
        }

        success.data.isActive == 'Y' ? this.payrollsettingForm.get('status').setValue("ACTIVE") : this.payrollsettingForm.get('status').setValue("INACTIVE");
        if (this.isView) { this.payrollsettingForm.disable(); }
      });
    } else {
      this.payrollsettingForm.controls['status'].setValue('ACTIVE');
    }
  }

  getCOmpanyById(id) {
    this.payrollsettingService.getCompanyById(id).subscribe(s => {
      this.companyList = s;
      if(this.payrollsettingForm.value.xPayrollsettingId){
        this.selectedCompanyList = this.companyList.filter(o1 => this.obj.companyId==o1.gCompanyId)};
    });
  }

  getHoldingList() {
    this.payrollsettingService.getAllHolding().subscribe(s => {
      this.holdingList = s;
      if (this.payrollsettingForm.value.payrollsettingId) { } else {
        this.payrollsettingForm.controls['gHoldingId'].setValue(this.holdingList[0].gHoldingId);
        this.getCOmpanyById(this.holdingList[0].gHoldingId);
      }
    })
  }

  setCompanyList(list) {
    let elm: any = [];
    list.forEach(element => {
      elm.push(element.gCompanyId);
    });
    let unique = [...new Set(elm)];
    return unique;
  }

  addUpdatePayrollSettings() {
    this.payrollsettingForm.get('createdBy').setValue(Number(sessionStorage.getItem('userId')));
    this.payrollsettingForm.get('created').setValue(new Date());
    this.payrollsettingForm.get('updatedBy').setValue(Number(sessionStorage.getItem('userId')));
    this.payrollsettingForm.get('updated').setValue(new Date());
    let compList: any = this.setCompanyList(this.selectedCompanyList)
    this.payrollsettingForm.get('gCompanyId').setValue(compList[0]);
    this.payrollsettingForm.value.status == "ACTIVE" ? this.payrollsettingForm.get('isActive').setValue('Y') : this.payrollsettingForm.get('isActive').setValue('N');
    
    this.submitted = true;

    console.log(JSON.stringify(this.payrollsettingForm.value));
    if (this.payrollsettingForm.invalid) {
      return;
    } else {
         
         this.payrollsettingService.saveUpdatePayrollsetting(this.payrollsettingForm.value).subscribe(success => {
        var s: any = success;
        if(s.code==0){
          this.toastService.showToast('danger', s.message);
        }else{
        this.toastService.showToast('success', s.message);
        this.back();
      }
      })
    }
  }

  back() {
    this.router.navigate(["/views/masters/payroll-setting/payroll-setting-summary"]);
  }
//================================================ Multiselect Company list

selectedCompanyList = [];
dropdownSettings: IDropdownSettings;

companySetting() {
  this.dropdownSettings = {
    singleSelection: true,
    idField: 'gCompanyId',
    textField: 'name',
    selectAllText: 'Select All',
    unSelectAllText: 'UnSelect All',
    itemsShowLimit: 3,
    allowSearchFilter: true
  };
}

onCompnaySelect(item: any) {
  this.selectedCompanyList.push(item);
}

onCompanyDeSelect(items: any) {
  this.selectedCompanyList = this.selectedCompanyList.filter(item => item.gCompanyId !== items.gCompanyId);
}

onSelectAllCompnay(items: any) {
  this.selectedCompanyList = [];
  this.selectedCompanyList.push(...[items]);
}

}
