import { Component, OnInit, Output, EventEmitter, ChangeDetectorRef, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { IMyDateModel } from 'angular-mydatepicker';
import { CommonService, GeneralListCode } from 'src/app/views/services/common.service';
import { ToastrService } from 'src/app/views/services/toastr.service';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-emp-salary',
  templateUrl: './emp-salary.component.html',
  styleUrls: ['./emp-salary.component.scss']
})
export class EmpSalaryComponent implements OnInit {

  public myDatePickerOptions = this.commonService.datepickerFormat;

  @Input() empId: string;
  @Input() companyId: string;
  @Input() holdingId: string;
  @Input() displayName: string;
  @Output('parentFun') parentFun: EventEmitter<any> = new EventEmitter();

  statusList: any = [{ valueCode: 'ACTIVE', valueName: 'Active' }, { valueCode: 'INACTIVE', valueName: 'Inactive' }];
  daysList: any = [{ valueCode: 'Sunday', valueName: 'Sun' }, { valueCode: 'Monday', valueName: 'Mon' }, { valueCode: 'Tuesday', valueName: 'Tue' }, { valueCode: 'Wednesday', valueName: 'Wed' }, { valueCode: 'Thursday', valueName: 'Thur' }, { valueCode: 'Friday', valueName: 'Fri' }, { valueCode: 'Saturday', valueName: 'Sat' }];

  salaryForm: FormGroup;
  salaryFormSubmitted: boolean = false;
  srcDocTypeList: any = [];
  payModeList: any = [];
  currencyList: any;
  payItemList: any;
  bankList: any;
  cityList: any = [];
  countryList: any = [];
  exchangeNameList: any = [];
  isview: string;
  selectedItems: Array<any> = [];
  dropdownSettings: any = {};
  selectedItemsOC: Array<any> = [];
  dropdownSettingsOC: any = {};
  monthList:any=[];
  selectedPausePayroll: Array<any> = [];
  dropdownSettingPayroll: any = {};

  tepMethod() {
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'valueCode',
      textField: 'valueName',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 7,
      allowSearchFilter: true,
      maxHeight: 250
    };
  }

  ocSettings() {
    this.dropdownSettingsOC = {
      singleSelection: false,
      idField: 'lListitemId',
      textField: 'name',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 7,
      allowSearchFilter: true,
      maxHeight: 250
    };
  }


  payrollMethod() {
    this.dropdownSettingPayroll = {
      singleSelection: false,
      idField: 'monthId',
      textField: 'name',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 7,
      allowSearchFilter: true,
      maxHeight: 250
    };
  }

  
  onItemSelectPayroll(items: any) {
    this.selectedPausePayroll.push(items);
  }

  onSelectAllPayroll(items: any) {
    this.selectedPausePayroll = [];
    this.selectedPausePayroll.push(...[items]);
  }

  onItemDeSelectPayroll(items: any) {
    this.selectedPausePayroll = this.selectedPausePayroll.filter(item => item.monthId !== items.monthId);
  }

  // 

  onItemSelect(items: any) {
    this.salaryForm.controls['reglrOff'].setValue(items.valueCode);
    this.selectedItems = this.selectedItems.filter(item => item.valueCode !== items.valueCode);
  }

  onSelectAll(items: any) {
    this.selectedItems = [];
    this.selectedItems.push(...[items]);
  }

  onItemSelectOC(items: any) {
    this.selectedItemsOC.push(items);
  }

  onSelectAllOC(items: any) {
    this.selectedItemsOC = [];
    this.selectedItemsOC.push(...[items]);
  }

  onItemDeSelectOC(items: any) {
    this.selectedItemsOC = this.selectedItemsOC.filter(item => item.lListitemId !== items.lListitemId);
  }

  constructor(private cdr: ChangeDetectorRef, private activeRoute: ActivatedRoute,
    private commonService: CommonService, private router: Router, private toastService: ToastrService,
    private empService: EmployeeService) {
    this.salaryForm = new FormGroup({
      empName: new FormControl(null),
      notapplicable: new FormControl(null),
      l_empsalary_id: new FormControl(null),
      gHoldingId: new FormControl(null, [Validators.required]),
      gCompanyId: new FormControl(null, [Validators.required]),
      isActive: new FormControl(null),
      status: new FormControl(null, [Validators.required]),
      srcDoctype: new FormControl(null, [Validators.required]),
      holidayPaid: new FormControl(null),
      overtimePaid: new FormControl(null),
      holidayPaid1: new FormControl(null),
      overTimePaid1: new FormControl(null),
      payMode: new FormControl(null, [Validators.required]),
      xCurrencyId: new FormControl(null, [Validators.required]),
      description: new FormControl(null),
      xEmployeeId: new FormControl(null),
      pausePayroll: new FormControl(null),
      pausePayroll1: new FormControl(null),
      pauseRemark: new FormControl(null),
      xBankId: new FormControl(null),
      overtime_Hours: new FormControl(null),
      normalHours: new FormControl(null),
      transferBranch: new FormControl(null),
      processed: new FormControl(null),
      created: new FormControl(null),
      createdBy: new FormControl(null),
      updated: new FormControl(null),
      updatedBy: new FormControl(null),
      lsdoctypeId: new FormControl(null),
      ovrtimerefPayitemId: new FormControl(null),
      ovrtimerefPayitemId1: new FormControl(null),
      lastDate: new FormControl(null),
      lastDate1: new FormControl(null),
      transferAccount: new FormControl(null),
      empnameinbank: new FormControl(null),
      routingNo: new FormControl(null),
      swiftCode: new FormControl(null),
      ifsccode: new FormControl(null),
      exchangeId: new FormControl(null),
      empaccountno: new FormControl(null),
      empibanno: new FormControl(null),
      empbankcity: new FormControl(null),
      empexchaneacno: new FormControl(null),
      xCountryId: new FormControl(null),
      lspaymodeId: new FormControl(null),
      weeklyoffpaid1: new FormControl(null),
      weeklyoffpaid: new FormControl(null),
      regularOff1: new FormControl(null),
      regularOff: new FormControl(null),
      reglrOff: new FormControl(null),
      alternateoff1: new FormControl(null),
      alternateoff: new FormControl(null),
      startingDate1: new FormControl(null),
      startingDate: new FormControl(null),
      altoffDate: new FormControl(null),
      attn_autoUpdate :new FormControl(null),
      attn_autoUpdate1 :new FormControl(null)
    });

    
    this.getPayItemList();
    
    this.getCityList();
    this.getCountryList();
    this.getExchangeHouseName();

    this.activeRoute.queryParams.subscribe(params => {
      this.isview = params.view;
    });
  }

  ngOnInit() {
    this.tepMethod();
    this.ocSettings();
    this.payrollMethod();
    this.salaryForm.get('empName').setValue(this.displayName);
    this.salaryForm.get('xEmployeeId').setValue(Number(this.empId));
    this.salaryForm.get('gHoldingId').setValue(this.holdingId);
    this.salaryForm.get('gCompanyId').setValue(this.companyId);

    this.getCurrency(this.companyId);
    this.getBankList(this.companyId);
    
    this.getMonthList(this.companyId);

    if (this.salaryForm.value.xEmployeeId) {
      this.getEmpSalaryByEmpId(this.salaryForm.value.xEmployeeId);
    } else {
      this.salaryForm.get('status').setValue('ACTIVE');
    }
    this.getSrcDocList();
    this.getPaymentmodeList();
  }

  getExchangeHouseName() {
    this.commonService.getGeneralListByCode(GeneralListCode.EXCHANGE_HOUSE_NAME).subscribe(data => {
      this.exchangeNameList = data;
    })
  }

  getSrcDocList() {
    this.commonService.getGeneralListByCode(GeneralListCode.SOURCE_DOCUMENT_LIST).subscribe(data => {
      this.srcDocTypeList = data;
    })
  }

  getCityList() {
    this.commonService.getGeneralListByCode(GeneralListCode.CITY_LIST).subscribe(data => {
      this.cityList = data;
    })
  }

  getMonthList(id){
    this.empService.getAllActiveMonthList(id).subscribe(data=>{
      this.monthList = data;
    });
}

  getCountryList() {
    this.commonService.getGeneralListByCode(GeneralListCode.COUNTRY_LIST).subscribe(data => {
      this.countryList = data;
    })
  }

  getPaymentmodeList() {
    this.commonService.getGeneralListByCode(GeneralListCode.PAYMENT_MODE_LIST).subscribe(data => {
      this.payModeList = data;
    })
  }

  selectPaymode(id) {
    this.payModeList.filter(data => {
      if (data.lListitemId == id) {
        this.salaryForm.get('payMode').setValue(data.value);
      }
    })
  }

  nextFun(event) {
    this.parentFun.emit(event);
  }

  getCurrency(companyId) {
    this.empService.getCurrency([typeof companyId == 'number' ? companyId : Number(companyId)]).subscribe(s => {
      this.currencyList = s;
    });
  }

  getBankList(companyId) {
    this.empService.getBankDetails([typeof companyId == 'number' ? companyId : Number(companyId)]).subscribe(s => {
      this.bankList = s;
    });
  }

  getPayItemList() {
    this.commonService.getGeneralListByCode(GeneralListCode.OVERTIME_REFERENCE_LIST).subscribe(data => {
      this.payItemList = data;
    });
  }

  getOvertimeReferByCode() {
  }

  getEmpSalaryByEmpId(empId) {

    this.empService.getEmpSalaryByEmpId(empId).subscribe(s => {
      var success: any = s;
      if (success.data) {
        success.data.regularOff1 ? this.selectedItems = this.daysList.filter(o1 => success.data.regularOff1.some(o2 => o1.valueCode == o2)) : undefined;
        success.data.ovrtimerefPayitemId ? this.selectedItemsOC = this.payItemList.filter(o1 => success.data.ovrtimerefPayitemId.some(o2 => o1.lListitemId == o2)) : undefined;
        success.data.pausePayroll ? this.selectedPausePayroll = this.monthList.filter(o1 => success.data.pausePayroll.some(o2 => o1.monthId == o2)) : undefined;
        this.salaryForm.patchValue(success.data);
        this.selectPaymode(success.data.lspaymodeId);
        success.data.srcDoctype=="N" ? this.isSelectSrc = true : this.isSelectSrc = false;
        success.data.attn_autoUpdate=="Y" ? this.salaryForm.get('attn_autoUpdate1').setValue(true) : this.salaryForm.get('attn_autoUpdate1').setValue(false);
        success.data.isActive == "Y" ? this.salaryForm.get('status').setValue('ACTIVE') : this.salaryForm.get('status').setValue('INACTIVE');
        success.data.holidayPaid == "Y" ? this.salaryForm.get('holidayPaid1').setValue(true) : this.salaryForm.get('holidayPaid1').setValue(false);
        success.data.overtimePaid == "Y" ? this.salaryForm.get('overTimePaid1').setValue(true) : this.salaryForm.get('overTimePaid1').setValue(false);
        success.data.weeklyoffpaid == "Y" ? this.salaryForm.get('weeklyoffpaid1').setValue(true) : this.salaryForm.get('weeklyoffpaid1').setValue(false);
        success.data.holidayPaid !="Y" && success.data.overtimePaid !="Y"  && success.data.weeklyoffpaid !="Y" ? this.salaryForm.get('notapplicable').setValue(true) :this.salaryForm.get('notapplicable').setValue(false) ;
        if (success.data.startingDate) {
          let dateOfJoin: Date = new Date(success.data.startingDate);
          let fromModel: IMyDateModel = { isRange: false, singleDate: { jsDate: dateOfJoin }, dateRange: null };
          this.salaryForm.controls['startingDate1'].setValue(fromModel);
          this.changeStartingDate(fromModel);
        }
        if (this.isview == 'Y') { this.salaryForm.disable(); }
      } else {
        this.salaryForm.get('status').setValue('ACTIVE');
        this.salaryForm.get('srcDoctype').setValue('A');
        this.salaryForm.get('payMode').setValue('C');
        this.salaryForm.get('xCurrencyId').setValue(1);
        this.salaryForm.get('holidayPaid1').setValue(true);
      }
    }, error => {
      this.salaryForm.get('status').setValue('ACTIVE');
      this.salaryForm.get('srcDoctype').setValue('A');
      this.salaryForm.get('payMode').setValue('C');
      this.salaryForm.get('xCurrencyId').setValue(1);
      this.salaryForm.get('holidayPaid1').setValue(true);
    });
  }

  changeLastDate(event) {
    this.salaryForm.get('lastDate').setValue(event.singleDate.jsDate);
  }

  changeStartingDate(event) {
    this.salaryForm.get('startingDate').setValue(event.singleDate.jsDate);
    this.salaryForm.get('altoffDate').setValue(this.commonService.dateFormat(event.singleDate.jsDate));
  }

  get es() { return this.salaryForm.controls; }

  setEmpList(list) {
    let elm: any = [];
    list.forEach(element => {
      elm.push(element.valueCode);
    });
    let unique = [...new Set(elm)];
    return unique;
  }

  setOCList(list) {
    let elm: any = [];
    list.forEach(element => {
      elm.push(element.lListitemId);
    });
    let unique = [...new Set(elm)];
    return unique;
  }

  setPayrollList(list) {
    let elm: any = [];
    list.forEach(element => {
      elm.push(element.monthId);
    });
    let unique = [...new Set(elm)];
    return unique;
  }

  saveEmpSalaryDetails() {
    
    let list: any;
    if (this.selectedItems) {
      list = this.setEmpList(this.selectedItems);
    } else {
      list = [];
    }

    let list1: any;
    if (this.selectedItemsOC) {
      list1 = this.setOCList(this.selectedItemsOC);
    } else {
      list1 = [];
    }

    let list2: any;
    if (this.selectedPausePayroll) {
      list2 = this.setPayrollList(this.selectedPausePayroll);
    } else {
      list2 = [];
    }


    this.salaryForm.get('pausePayroll').setValue(list2);
    this.salaryForm.get('ovrtimerefPayitemId').setValue(list1);
    this.salaryForm.get('regularOff1').setValue(list);
    this.salaryFormSubmitted = true;
    this.salaryForm.get('createdBy').setValue(1);
    this.salaryForm.get('created').setValue(new Date());
    this.salaryForm.get('updatedBy').setValue(1);
    this.salaryForm.get('updated').setValue(new Date());
    this.salaryForm.get('processed').setValue("N");
    this.salaryForm.value.status == "ACTIVE" ? this.salaryForm.get('isActive').setValue('Y') : this.salaryForm.get('isActive').setValue('N');
    this.salaryForm.value.holidayPaid1 ? this.salaryForm.get('holidayPaid').setValue('Y') : this.salaryForm.get('holidayPaid').setValue('N');
    this.salaryForm.value.overTimePaid1 ? this.salaryForm.get('overtimePaid').setValue('Y') : this.salaryForm.get('overtimePaid').setValue('N');
    this.salaryForm.value.weeklyoffpaid1 ? this.salaryForm.get('weeklyoffpaid').setValue("Y") : this.salaryForm.get('weeklyoffpaid').setValue("N");

    this.salaryForm.value.attn_autoUpdate1 ? this.salaryForm.get('attn_autoUpdate').setValue("Y") : this.salaryForm.get('attn_autoUpdate').setValue("N");


    if (this.salaryForm.value.xBankId) {
      this.salaryForm.get('xBankId').setValue(Number(this.salaryForm.value.xBankId));
    } else { this.salaryForm.get('xBankId').setValue(null); }

    if (this.salaryForm.value.xCurrencyId) {
      this.salaryForm.get('xCurrencyId').setValue(Number(this.salaryForm.value.xCurrencyId));
    } else { this.salaryForm.get('xCurrencyId').setValue(null); }

    if (this.salaryForm.value.exchangeId) {
      this.salaryForm.get('exchangeId').setValue(Number(this.salaryForm.value.exchangeId))
    } else { this.salaryForm.get('exchangeId').setValue(null); }

    if (this.salaryForm.value.lspaymodeId) {
      this.salaryForm.get('lspaymodeId').setValue(Number(this.salaryForm.value.lspaymodeId));
    } else { this.salaryForm.get('lspaymodeId').setValue(null); }

    if (this.salaryForm.value.lspaymodeId) {
      this.salaryForm.get('xCountryId').setValue(Number(this.salaryForm.value.xCountryId));
    } else { this.salaryForm.get('xCountryId').setValue(null); }

    if (this.salaryForm.value.l_empsalary_id) {
      this.salaryForm.get('l_empsalary_id').setValue(Number(this.salaryForm.value.l_empsalary_id));
    } else { this.salaryForm.get('l_empsalary_id').setValue(undefined); }

    if (this.salaryForm.invalid) {
      return;
    } else {
      this.empService.saveUpdateEmpSalary(this.salaryForm.value).subscribe(s => {
        var success: any = s;
        this.toastService.showToast('success', success.message);
        this.salaryForm.patchValue(success.data);
        success.data.isActive == "Y" ? this.salaryForm.get('status').setValue('ACTIVE') : this.salaryForm.get('status').setValue('INACTIVE');
        success.data.holidayPaid == "Y" ? this.salaryForm.get('holidayPaid1').setValue(true) : this.salaryForm.get('holidayPaid1').setValue(false);
        success.data.overtimePaid == "Y" ? this.salaryForm.get('overTimePaid1').setValue(true) : this.salaryForm.get('overTimePaid1').setValue(false);
      });
    }
  }

  isSelectSrc:boolean=false;
  selectSrcDoTypeFun($event) {
    const overtime = this.salaryForm.get('overtime_Hours');
    const normal = this.salaryForm.get('normalHours');
    if (this.salaryForm.value.srcDoctype == 'T') {
      overtime.setValidators([Validators.required]);
      normal.setValidators([Validators.required]);
    } else {
      overtime.setValidators(null);
      normal.setValidators(null);
    }

    overtime.reset();
    normal.reset();
    overtime.updateValueAndValidity();
    normal.updateValueAndValidity();
    if(this.salaryForm.value.srcDoctype=="N"){
        this.isSelectSrc = true;      
    } else{
      this.isSelectSrc=false;
    }

    let list = this.srcDocTypeList.filter(data=>data.value==this.salaryForm.value.srcDoctype);
    this.salaryForm.controls['lsdoctypeId'].setValue(list[0].lListitemId);
  }

  selectPayModeFun($event) {
    const bank = this.salaryForm.get('xBankId');
    const branch = this.salaryForm.get('transferBranch');
    const acc = this.salaryForm.get('transferAccount');

    if (this.salaryForm.value.payMode == 'B') {
      bank.setValidators([Validators.required]);
      branch.setValidators([Validators.required]);
      acc.setValidators([Validators.required]);
    } else {
      bank.setValidators(null);
      branch.setValidators(null);
      acc.setValidators(null);
    }

    bank.reset();
    branch.reset();
    acc.reset();
    bank.updateValueAndValidity();
    branch.updateValueAndValidity();
    acc.updateValueAndValidity();
  }

  changeOverTimePaidFun(event) {
    const jobid = this.salaryForm.get('ovrtimerefPayitemId1');
    if(this.salaryForm.value.overTimePaid1 || this.salaryForm.value.weeklyoffpaid1 || this.salaryForm.value.holidayPaid1){
       jobid.setValidators([Validators.required]);
       this.salaryForm.get('notapplicable').setValue(false); }
       else{ 
        this.salaryForm.get('notapplicable').setValue(true);
         jobid.setValidators(null);}
    jobid.reset();
    jobid.updateValueAndValidity();
  }
}
