import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'src/app/views/services/toastr.service';
import { ActivatedRoute, Router } from '@angular/router';
import { PayItemService } from '../pay-item.service';
import { AngularMyDatePickerDirective, IMyDateModel } from 'angular-mydatepicker';
import { CommonService } from 'src/app/views/services/common.service';

@Component({
  selector: 'app-add-pay-item',
  templateUrl: './add-pay-item.component.html',
  styleUrls: ['./add-pay-item.component.scss']
})
export class AddPayItemComponent implements OnInit {

  payItemForm: FormGroup;
  submitted = false;
  isView: boolean = false;
  holdingList: any = [];
  companyList: any = [];
  @ViewChild('dp1', {static: false}) myDp1: AngularMyDatePickerDirective;
  public myDatePickerOptions = this.commonService.datepickerFormat;
  
  statusList: any = [{ valueCode: 'ACTIVE', valueName: 'Active' }, { valueCode: 'INACTIVE', valueName: 'Inactive' }]
  payTypeList: any = [{ valueCode: 'A', valueName: 'Advance' },{ valueCode: 'D', valueName: 'Deduction' },{ valueCode: 'E', valueName: 'Earning' },{ valueCode: 'L', valueName: 'Loan' },];
  dependencyList: any = [{ valueCode: 'A', valueName: 'Air Sector' },{ valueCode: 'C', valueName: 'Category' },
                         { valueCode: 'T', valueName: 'City' },{ valueCode: 'D', valueName: 'Department' },
                         { valueCode: 'G', valueName: 'Grade' },{ valueCode: 'O', valueName: 'Group' },
                         { valueCode: 'N', valueName: 'None' }];

  payUnitList:any =[{ valueCode: 'D', valueName: 'Day' },{ valueCode: 'J', valueName: 'Job' },{ valueCode: 'M', valueName: 'Month' },
                    { valueCode: 'W', valueName: 'Week' }, { valueCode: 'Y', valueName: 'Year' }];
                    
  payItemGroupList:any=[{ valueCode: Number(101), valueName: 'Pay Item Group 1' }];

  constructor(private commonService:CommonService,private cdr: ChangeDetectorRef,private toastService: ToastrService, private activatedRoute: ActivatedRoute, private payItemService: PayItemService, private router: Router) {
    this.payItemForm = new FormGroup({
      payItemId: new FormControl(null),
      companyId: new FormControl(null),
      holdingId: new FormControl(null, [Validators.required]),
      isActive: new FormControl(null),
      status: new FormControl(null),
      created: new FormControl(null),
      createdBy: new FormControl(null),
      updated: new FormControl(null),
      updatedBy: new FormControl(null),
      description: new FormControl(null),
      payType:new FormControl(null, [Validators.required]),
      dependency:new FormControl(null),
      isFixedAmount:new FormControl(null),
      isFixedAmount1:new FormControl(null),
      effectiveDate:new FormControl(null),
      effectiveDate1:new FormControl(null, [Validators.required]),
      amount:new FormControl(null),
      isProrated:new FormControl(null),
      payItemGroupId:new FormControl(null),
      percentage:new FormControl(null),
      value:new FormControl(null),
      code: new FormControl(null),
      units:new FormControl(null, [Validators.required]),
      isPayItem:new FormControl(null),
      isPayItem1:new FormControl(null),
      isBasicPay:new FormControl(null),
      isBasicPay1:new FormControl(null),
      tobeenteredbyUser:new FormControl(null),
      tobeenteredbyUser1:new FormControl(null),
      isProrated1:new FormControl(null),
      molPayCode:new FormControl(null),
      srno:new FormControl(null, [Validators.required]),
      name: new FormControl(null, [Validators.required])
    });

    this.activatedRoute.queryParams.subscribe(params => {
      this.payItemForm.controls['payItemId'].setValue(params.id);
      this.isView = params.view;
     // this.parentUrl = params.parentUrl;
    });
  }

  ngOnInit() {
    this.getHoldingList();
    if (this.payItemForm.value.payItemId) {
      this.payItemService.getPayItemDataById(this.payItemForm.value.payItemId).subscribe(success => {
        var s: any = success;
        this.payItemForm.patchValue(s.data);
        s.data.tobeenteredbyUser == "Y" ? this.payItemForm.get('tobeenteredbyUser1').setValue(true) : this.payItemForm.get('tobeenteredbyUser1').setValue(false);
        let startDate: Date = new Date(s.data.effectiveDate);
          let fromModel: IMyDateModel = {isRange: false, singleDate: {jsDate: startDate}, dateRange: null};
          this.payItemForm.controls['effectiveDate1'].setValue(fromModel);
          
        s.data.isActive == 'Y' ? this.payItemForm.get('status').setValue("ACTIVE") : this.payItemForm.get('status').setValue("INACTIVE");
        
        this.payItemForm.value.isPayItem == 'Y' ? this.payItemForm.get('isPayItem1').setValue(true) : this.payItemForm.get('isPayItem1').setValue(false);
        this.payItemForm.value.isFixedAmount == 'Y' ? this.payItemForm.get('isFixedAmount1').setValue(true) : this.payItemForm.get('isFixedAmount1').setValue(false);
        this.payItemForm.value.isBasicPay == 'Y' ? this.payItemForm.get('isBasicPay1').setValue(true) : this.payItemForm.get('isBasicPay1').setValue(false);
        this.payItemForm.value.isProrated == 'Y' ? this.payItemForm.get('isProrated1').setValue(true) : this.payItemForm.get('isProrated1').setValue(false);
        

        if (this.isView) { this.payItemForm.disable(); }
      });
    } else{
      this.payItemForm.get('status').setValue("ACTIVE");
      this.payItemForm.get('isPayItem1').setValue(true);
      this.payItemForm.get('dependency').setValue('N');
    }
  }

  get f() { return this.payItemForm.controls; }

  toggleCalendar(): void {
    this.cdr.detectChanges();
    this.myDp1.toggleCalendar();
  }
  changeStartDate(event){
    this.payItemForm.get('effectiveDate').setValue(event.singleDate.jsDate);
  }

  getCompanyListByHoldingId(holdinId) {

    this.payItemService.getCompanyListByHoldingId(holdinId).subscribe(s => {
      this.companyList = s;
    });
  }


  getHoldingList() {
    this.payItemService.getHoldingList().subscribe(s => {
      this.holdingList = s;
      this.payItemForm.get('holdingId').setValue(this.holdingList[0].gHoldingId);
      this.getCompanyListByHoldingId(this.holdingList[0].gHoldingId) 
    });
  }

  addUpdatePayItem() {
    this.payItemForm.get('createdBy').setValue(Number(sessionStorage.getItem('userId')));
    this.payItemForm.get('created').setValue(new Date());
    this.payItemForm.get('updatedBy').setValue(Number(sessionStorage.getItem('userId')));
    this.payItemForm.get('companyId').setValue(Number(this.payItemForm.value.companyId));
    this.payItemForm.get('updated').setValue(new Date());
    this.payItemForm.value.status == "ACTIVE" ? this.payItemForm.get('isActive').setValue('Y') : this.payItemForm.get('isActive').setValue('N');
    this.payItemForm.value.tobeenteredbyUser1 ? this.payItemForm.get('tobeenteredbyUser').setValue('Y') : this.payItemForm.get('tobeenteredbyUser').setValue('N');
    this.payItemForm.value.isPayItem1 == true ? this.payItemForm.get('isPayItem').setValue('Y') : this.payItemForm.get('isPayItem').setValue('N');
    this.payItemForm.value.isFixedAmount1 == true ? this.payItemForm.get('isFixedAmount').setValue('Y') : this.payItemForm.get('isFixedAmount').setValue('N');
    this.payItemForm.value.isBasicPay1 == true ? this.payItemForm.get('isBasicPay').setValue('Y') : this.payItemForm.get('isBasicPay').setValue('N');
    this.payItemForm.value.isProrated1 == true ? this.payItemForm.get('isProrated').setValue('Y') : this.payItemForm.get('isProrated').setValue('N');
    this.payItemForm.value.srno ? this.payItemForm.get('srno').setValue(Number(this.payItemForm.value.srno)) : null;
    this.submitted = true;
    if (this.payItemForm.invalid) {
      return;
    } else {
      this.payItemService.addUpdatePayItem(this.payItemForm.value).subscribe(success=>{
        var s: any = success;
        if(s.code==0){
          this.toastService.showToast('danger', s.message);
        } else{
          this.toastService.showToast('success', s.message);
          this.back();
        }
        
      });
    }
  }

  back() {
    this.router.navigate(["/views/masters/pay-item/pay-item-summary"]);
  }

  selectDependancyAsGroup(event){
    const  per= this.payItemForm.get('percentage');
    this.payItemForm.value.dependency=='O' ? per.setValidators([Validators.required]) :  per.setValidators(null);
    per.reset();
    per.updateValueAndValidity();
  }

}
