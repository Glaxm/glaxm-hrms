import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService } from 'src/app/views/services/common.service';
import { ToastrService } from 'src/app/views/services/toastr.service';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-bonus',
  templateUrl: './bonus.component.html',
  styleUrls: ['./bonus.component.scss']
})
export class BonusComponent implements OnInit {
  public myDatePickerOptions = this.commonService.datepickerFormat;

  @Output('parentFun') parentFun: EventEmitter<any> = new EventEmitter();

  @Input() empId: string;
  @Input() companyId: string;
  @Input() holdingId: string;
  @Input() displayName: string;
  //commonService: any;

  empbonusForm: FormGroup;
  empbonusFormSubmitted: boolean = false;
 // srcDocexpertiselevelListTypeList: any = [{ valueCode: "Average", valueName: "Average" }, { valueCode: "Expert", valueName: "Expert" }, { valueCode: "Good", valueName: "Good" }, { valueCode: "Normal", valueName: "Normal" }, { valueCode: "Poor", valueName: "Poor" }];
 // payModeList: any = [{ valueCode: "M", valueName: "Month" }, { valueCode: "Y", valueName: "Year" }, { valueCode: "W", valueName: " Week" }];
  statusList: any = [{ valueCode: 'ACTIVE', valueName: 'Active' }, { valueCode: 'INACTIVE', valueName: 'Inactive' }];
  empbonusList: any;
  bonusitemList: any;
  unitList: any;
  payitemList: any;
 // commonService: any;
  constructor(
    private cdr: ChangeDetectorRef, private activeRoute: ActivatedRoute, private commonService: CommonService,
    private router: Router, private toastService: ToastrService, private empService: EmployeeService
  ) {
    this.empbonusForm = new FormGroup({
      empName: new FormControl(null),
      X_EMPSKILL_ID: new FormControl(null),
      gHoldingId: new FormControl(null, [Validators.required]),
      gCompanyId: new FormControl(null, [Validators.required]),
      isActive: new FormControl(null),
      status: new FormControl(null, [Validators.required]),
     
    
     
      description: new FormControl(null),
     
     
      processed: new FormControl(null),
      created: new FormControl(null),
      createdBy: new FormControl(null),
      updated: new FormControl(null),
      updatedBy: new FormControl(null),
      
      lPaytransactionId: new FormControl(null),
     
      documentno: new FormControl(null),
      daterx: new FormControl(null),
     
      xEmployeeId: new FormControl(null),
     
      xPayitemId: new FormControl(null),
      effectivedate: new FormControl(null),
      effectiveDate1: new FormControl(null),
      amount: new FormControl(null),
     
      remarks: new FormControl(null),
      lPayrollJournalId: new FormControl(null),
      lEmpLoanId: new FormControl(null),
      processing: new FormControl(null),


    });
   }

   ngOnInit() {
    this.empbonusForm.get('empName').setValue(this.displayName);
    this.empbonusForm.get('xEmployeeId').setValue(this.empId);
    this.empbonusForm.get('gHoldingId').setValue(this.holdingId);
    this.empbonusForm.get('gCompanyId').setValue(this.companyId);
    if (this.empbonusForm.value.xEmployeeId) {
      this.getEmpbonusByEmpId(this.empbonusForm.value.xEmployeeId);
    }
  }
  getEmpbonusByEmpId(empId) {
    // this.empService.getEmpbounsByEmpId(empId).subscribe(s => {
    //   var success: any = s;
    //   if (success.data) {
    //     this.empbonusForm.patchValue(success.data);
    //     success.data.isActive == "Y" ? this.empbonusForm.get('status').setValue('ACTIVE') : this.empbonusForm.get('status').setValue('INACTIVE');
       
    //   } else {
    //     this.empbonusForm.get('status').setValue('ACTIVE');
       
    //   }
    // });
  }
  nextFun(event) {
    this.parentFun.emit(event);
  }

  isOpen:boolean=false;
  add(){
    this.isOpen=true;
  }

  get es() { return this.empbonusForm.controls; }

  saveEmpbonusDetails() {
    this.empbonusFormSubmitted = true;

    this.empbonusForm.get('createdBy').setValue(1);
    this.empbonusForm.get('created').setValue(new Date());
    this.empbonusForm.get('updatedBy').setValue(1);
    this.empbonusForm.get('updated').setValue(new Date());
    this.empbonusForm.get('processed').setValue("N");
    this.empbonusForm.value.status == "ACTIVE" ? this.empbonusForm.get('isActive').setValue('Y') : this.empbonusForm.get('isActive').setValue('N');
    
    console.log(JSON.stringify(this.empbonusForm.value));
    if (this.empbonusForm.invalid) {
      return;
    } else {
      // this.empService.saveUpdateEmpBouns(this.empbonusForm.value).subscribe(s => {
      //   var success: any = s;

      //   this.toastService.showToast('success', success.message);
      //   this.empbonusForm.patchValue(success.data);

      //   success.data.isActive == "Y" ? this.empbonusForm.get('status').setValue('ACTIVE') : this.empbonusForm.get('status').setValue('INACTIVE');
      // });

    }
  }
}
