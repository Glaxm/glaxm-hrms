import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'src/app/views/services/toastr.service';
import { LeaveRuleService } from '../leave-rule.service';

@Component({
  selector: 'app-entitlement-form',
  templateUrl: './entitlement-form.component.html',
  styleUrls: ['./entitlement-form.component.scss']
})
export class EntitlementFormComponent implements OnInit {
  statusList: any = [{ valueCode: 'ACTIVE', valueName: 'Active' }, { valueCode: 'INACTIVE', valueName: 'Inactive' }]
  Effectiveafteryears: any = [{ valueCode: 'Y', valueName: 'Year(s)' }, { valueCode: 'M', valueName: 'Month(s)' }]
  Dateofjoining: any = [{ valueCode: 'DOJ', valueName: 'Date of Joining' }, { valueCode: 'PROBC', valueName: 'Probation Period Completion' }];
  Accrualyear: any = [{ valueCode: 'O', valueName: 'One Time' }, { valueCode: 'Y', valueName: 'Yearly' }, { valueCode: 'M', valueName: 'Monthly' },{ valueCode: 'D', valueName: 'Per Instance' }]
  AccrualDays: any = [{ valueCode: '1st', valueName: '1st' }, { valueCode: 'Last Day', valueName: 'Last Day' }, { valueCode: 'Policy Date', valueName: 'Policy Date' }, { valueCode: 'Joining Date', valueName: 'Joining Date' }]
  AccrualMonth: any = [{ valueCode: 'Jan', valueName: 'Jan' }, { valueCode: 'Feb', valueName: 'Feb' }, { valueCode: 'Mar', valueName: 'Mar' }, { valueCode: 'Apr', valueName: 'Apr' }, { valueCode: 'May', valueName: 'May' }, { valueCode: 'Jun', valueName: 'Jun' }, { valueCode: 'Jul', valueName: 'Jul' }, { valueCode: 'Aug', valueName: 'Aug' }, { valueCode: 'Sep', valueName: 'Sep' }, { valueCode: 'Oct', valueName: 'Oct' }, { valueCode: 'Nov', valueName: 'Nov' }, { valueCode: 'Dec', valueName: 'Dec' }, { valueCode: 'Policy Date', valueName: 'Policy Date' }, { valueCode: 'Joining Date', valueName: 'Joining Date' }]
  Resetyear: any = [{ valueCode: 'O', valueName: 'One Time' }, { valueCode: 'Y', valueName: 'Yearly' }, { valueCode: 'M', valueName: 'Monthly' },{ valueCode: 'D', valueName: 'Per Instance' }]
  ResetDays: any = [{ valueCode: '1st', valueName: '1st' }, { valueCode: 'Last Day', valueName: 'Last Day' }, { valueCode: 'Policy Date', valueName: 'Policy Date' }, { valueCode: 'Joining Date', valueName: 'Joining Date' }]
  ResetMonth: any = [{ valueCode: 'Jan', valueName: 'Jan' }, { valueCode: 'Feb', valueName: 'Feb' }, { valueCode: 'Mar', valueName: 'Mar' }, { valueCode: 'Apr', valueName: 'Apr' }, { valueCode: 'May', valueName: 'May' }, { valueCode: 'Jun', valueName: 'Jun' }, { valueCode: 'Jul', valueName: 'Jul' }, { valueCode: 'Aug', valueName: 'Aug' }, { valueCode: 'Sep', valueName: 'Sep' }, { valueCode: 'Oct', valueName: 'Oct' }, { valueCode: 'Nov', valueName: 'Nov' }, { valueCode: 'Dec', valueName: 'Dec' }, { valueCode: 'Policy Date', valueName: 'Policy Date' }, { valueCode: 'Joining Date', valueName: 'Joining Date' }]
  CarryForword: any = [{ valueCode: 'Carry Forward', valueName: 'Carry Forward' }]
  CarryForwordpercentage: any = [{ valueCode: 'D', valueName: 'Day(s)' }]
  Encashmentpercentage: any = [{ valueCode: 'D', valueName: 'Day(s)' }];

  entitlementForm: FormGroup;

  @Input() companyId: string;
  @Input() holdingId: string;
  @Input() leaveRuleId: string;
  @Input() leaveitemId: string;
  @Output() entitlement = new EventEmitter;

  constructor(private leaveRuleService:LeaveRuleService,private toastService: ToastrService, private activatedRoute: ActivatedRoute, private router: Router) {
    this.entitlementForm = new FormGroup({
      accrual1: new FormControl(null),
      reset1: new FormControl(null),
      carryforward1: new FormControl(null),
      encashment1: new FormControl(null),

      isActive: new FormControl(null),
      gCompanyId: new FormControl(null),
      gHoldingId: new FormControl(null),
      xLeaveitemId: new FormControl(null),
      created: new FormControl(null),
      createdBy: new FormControl(null),
      updated: new FormControl(null),
      updatedBy: new FormControl(null),
      effectafterCount: new FormControl(null),
      effectafterCycle: new FormControl(null),
      effectafterFrom: new FormControl(null),
      accrualonCycle: new FormControl(null),
      accrualonDate: new FormControl(null),
      accrualonMonth: new FormControl(null),
      accrualDays: new FormControl(null),
      resetonCycle: new FormControl(null),
      resetonDate: new FormControl(null),
      resetonMonth: new FormControl(null),
      carryforword1: new FormControl(null),
      carryforwardCount: new FormControl(null),
      carryforwardUnit: new FormControl(null),
      carryforwardmaxDays: new FormControl(null),
      encashCount: new FormControl(null),
      encashUnit: new FormControl(null),
      encashmaxDays: new FormControl(null),
      xLeavepolicyId: new FormControl(null),

    });

  }

  ngOnInit() {
    this.entitlementForm.controls['effectafterFrom'].setValue(this.Dateofjoining[0].valueCode);
    this.entitlementForm.controls['carryforword1'].setValue(this.CarryForword[0].valueCode);

    this.entitlementForm.controls['gCompanyId'].setValue(this.companyId);
    this.entitlementForm.controls['gHoldingId'].setValue(this.holdingId);
    this.entitlementForm.controls['xLeaveitemId'].setValue(this.leaveitemId);
    this.getEntitlementById();
  }

  getEntitlementById(){
    if(this.leaveitemId){
      this.leaveRuleService.getEntitlementById(this.leaveitemId).subscribe(data=>{
         // alert(JSON.stringify(data));
          let obj:any = data[0];
          this.entitlementForm.patchValue(obj);
          obj.accrual=='Y' ? this.entitlementForm.get('accrual1').setValue(true): this.entitlementForm.get('accrual1').setValue(false);
          obj.reset =='Y'? this.entitlementForm.get('reset1').setValue(true): this.entitlementForm.get('reset1').setValue(false);
          obj.carryforward=='Y' ?  this.entitlementForm.get('carryforward1').setValue(true): this.entitlementForm.get('carryforward1').setValue(false);
          obj.encash=='Y' ?  this.entitlementForm.get('encashment1').setValue(true): this.entitlementForm.get('encashment1').setValue(false);

      });
    }
  }

  entitlementEvent() {
    // this.entitlementForm.value.accrual1 ? this.entitlementForm.get('accrual').setValue('Y'): this.entitlementForm.get('accrual1').setValue('N');
    // this.entitlementForm.value.reset1 ?  this.entitlementForm.get('reset').setValue('Y'): this.entitlementForm.get('reset').setValue('N');
    // this.entitlementForm.value.carryforward1 ?  this.entitlementForm.get('carryforward').setValue('Y'): this.entitlementForm.get('carryforward').setValue('N');
    // this.entitlementForm.value.encashment1 ?  this.entitlementForm.get('encash').setValue('Y'): this.entitlementForm.get('encash').setValue('N');
    // alert(JSON.stringify(this.entitlementForm.value))
    this.entitlement.emit(this.entitlementForm.value);
  }


}
