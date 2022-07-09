import { Component, OnInit, Input, ViewChild, ChangeDetectorRef } from '@angular/core';
import { EmployeeService } from '../employee.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AngularMyDatePickerDirective, IMyDateModel } from 'angular-mydatepicker';
import { CommonService, GeneralListCode } from 'src/app/views/services/common.service';
import { ToastrService } from 'src/app/views/services/toastr.service';
import { IfStmt } from '@angular/compiler';

@Component({
  selector: 'app-pay-item',
  templateUrl: './pay-item.component.html',
  styleUrls: ['./pay-item.component.scss']
})
export class PayItemComponent implements OnInit {

  statusList: any = [{ valueCode: 'ACTIVE', valueName: 'Active' }, { valueCode: 'INACTIVE', valueName: 'Inactive' }];
  public myDatePickerOptions = this.commonService.datepickerFormat;
  @ViewChild('dp1', { static: false }) myDp1: AngularMyDatePickerDirective;
  @ViewChild('dp2', { static: false }) myDp2: AngularMyDatePickerDirective;
  @Input() empId: string;
  @Input() companyId: string;
  @Input() holdingId: string;
  @Input() displayName: string;
  empPayItemList: any = [];
  enableFilter: boolean = false;
  payItemForm: any;
  isview: string;
  itemId: any;
  payItemsubmitted = false;
  payItemList: any = [];
  unitList: any = [];
  isOpen: boolean = false;

  constructor(private cdr: ChangeDetectorRef, private activeRoute: ActivatedRoute, private toastService: ToastrService, private empService: EmployeeService, private router: Router, public commonService: CommonService) {
    this.payItemForm = new FormGroup({
      empPayItemId: new FormControl(null),
      companyId: new FormControl(null, [Validators.required]),
      holdingId: new FormControl(null, [Validators.required]),
      isActive: new FormControl(null),
      status: new FormControl(null),
      created: new FormControl(null),
      createdBy: new FormControl(null),
      updated: new FormControl(null),
      updatedBy: new FormControl(null),
      effectiveDate: new FormControl(null, [Validators.required]),
      payItemEffectiveDate: new FormControl(null, [Validators.required]),
      endDate: new FormControl(null),
      endDate1: new FormControl(null),
      amount: new FormControl(null, [Validators.required]),
      payItemId: new FormControl(null, [Validators.required]),
      empId: new FormControl(null),
      value: new FormControl(null),
      units: new FormControl(null, [Validators.required]),
      processed: new FormControl(null),
      isLinked: new FormControl(null),
      isLinked1: new FormControl(null),
      lastProcessed: new FormControl(null),
      effdate: new FormControl(null),
    });

    this.activeRoute.queryParams.subscribe(params => {
      this.isview = params.view;
    });

  }

  ngOnInit() {
    this.getEmpPayItemList();
    this.getUnitList();
  }

  getUnitList() {
    this.commonService.getGeneralListByCode(GeneralListCode.UNITS_LIST).subscribe(data => {
      this.unitList = data;
    })
  }

  add() {
    this.getPayItemList();
    this.payItemForm.reset();
    this.isOpen = true;
    this.payItemForm.get('empPayItemId').setValue(undefined);
    this.payItemForm.get('status').setValue('ACTIVE');
    this.payItemForm.controls['value'].setValue(this.displayName);
    this.payItemForm.controls['units'].setValue('M');
  }

  getDataUsingRedioBtn(data) { this.itemId = data.lemppayitemid; }
  getEmpPayItemList() {
    this.empService.getEmpPayItemList(this.empId).subscribe(success => {
      this.empPayItemList = success;
    });
  }

  getPayItemList() {
    this.empService.getPayItemList().subscribe(s => {
     var paylist:any  = s;
      this.payItemList = paylist.filter(data=>data.payType=="E");
    });
  }

  get pi() { return this.payItemForm.controls; };

  toggleCalendar(): void {
    this.cdr.detectChanges();
    this.myDp1.toggleCalendar();
  }

  changeEffectiveDate(event) {
    this.payItemForm.get('effdate').setValue(this.commonService.dateFormat(event.singleDate.jsDate));
  }

  changeEndDate(event) {
    this.payItemForm.get('endDate').setValue(event.singleDate.jsDate);
  }

  addUpdatePayItem() {
    if (this.payItemForm.value.effectiveDate == null && this.payItemForm.value.payItemEffectiveDate) {
      this.payItemForm.get('effectiveDate').setValue(this.payItemForm.value.payItemEffectiveDate.singleDate.jsDate);
    }
    if (this.payItemForm.value.endDate == null && this.payItemForm.value.endDate1) {
      this.payItemForm.get('endDate').setValue(this.payItemForm.value.endDate1.singleDate.jsDate);
    }
    if(this.payItemForm.value.amount){
      this.payItemForm.get('amount').setValue(Number(this.payItemForm.value.amount));
    } else { this.payItemForm.get('amount').setValue(null);  }

    if(this.payItemForm.value.amount){
      this.payItemForm.get('payItemId').setValue(Number(this.payItemForm.value.payItemId));
    } else { this.payItemForm.get('payItemId').setValue(null);  }
   
    this.payItemForm.get('createdBy').setValue(Number(sessionStorage.getItem("userId")));
    this.payItemForm.get('created').setValue(new Date());
    this.payItemForm.get('updatedBy').setValue(Number(sessionStorage.getItem("userId")));
    this.payItemForm.get('updated').setValue(new Date());
    this.payItemForm.get('companyId').setValue(this.companyId);
    this.payItemForm.get('holdingId').setValue(this.holdingId);
    this.payItemForm.get('empId').setValue(Number(this.empId));
    this.payItemForm.get('processed').setValue('N');
    
    this.payItemForm.value.status == 'ACTIVE' ? this.payItemForm.get('isActive').setValue('Y') : this.payItemForm.get('isActive').setValue('N');
    this.payItemForm.value.isLinked1 ? this.payItemForm.get('isLinked').setValue('Y') : this.payItemForm.get('isLinked').setValue('N');
    this.payItemsubmitted = true;
    if (this.payItemForm.invalid) {
      return;
    } else {
      this.empService.addUpdatePayItem(this.payItemForm.value).subscribe(s => {
        var success: any = s;
        this.toastService.showToast('success', success.message);
        this.isOpen = false;
        this.itemId = undefined;
        this.getEmpPayItemList();
      });
    }
  }

  edit() {
    this.payItemForm.reset();
    this.getPayItemList();
    if (this.itemId) {
      this.empService.getPayItemById(this.itemId).subscribe(s => {
        var success: any = s;
        this.payItemForm.patchValue(success.data);
        this.isOpen = true;
        this.payItemForm.controls['value'].setValue(this.displayName);
        this.payItemForm.controls['units'].setValue(success.data.units.trim());
        let dateOfBirth: Date = new Date(success.data.effectiveDate);
        let fromModel1: IMyDateModel = { isRange: false, singleDate: { jsDate: dateOfBirth }, dateRange: null };
        this.payItemForm.controls['payItemEffectiveDate'].setValue(fromModel1);
        if (success.data.endDate) {
          let effectiveDate: Date = new Date(success.data.endDate);
          let fromModel2: IMyDateModel = { isRange: false, singleDate: { jsDate: effectiveDate }, dateRange: null };
          this.payItemForm.controls['endDate1'].setValue(fromModel2);
        }
        success.data.isActive == 'Y' ? this.payItemForm.get('status').setValue("ACTIVE") : this.payItemForm.get('status').setValue("INACTIVE");
      })
    }
  }
}