import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService } from 'src/app/views/services/common.service';
import { ToastrService } from 'src/app/views/services/toastr.service';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-emp-leave',
  templateUrl: './emp-leave.component.html',
  styleUrls: ['./emp-leave.component.scss']
})
export class EmpLeaveComponent implements OnInit {
  public myDatePickerOptions = this.commonService.datepickerFormat;

  @Output('parentFun') parentFun: EventEmitter<any> = new EventEmitter();

  @Input() empId: string;
  @Input() companyId: string;
  @Input() holdingId: string;
  @Input() displayName: string;
  //commonService: any;

  empleaveForm: FormGroup;
  empleaveFormSubmitted: boolean = false;
 // srcDocexpertiselevelListTypeList: any = [{ valueCode: "Average", valueName: "Average" }, { valueCode: "Expert", valueName: "Expert" }, { valueCode: "Good", valueName: "Good" }, { valueCode: "Normal", valueName: "Normal" }, { valueCode: "Poor", valueName: "Poor" }];
  payModeList: any = [{ valueCode: "M", valueName: "Month" }, { valueCode: "Y", valueName: "Year" }, { valueCode: "W", valueName: " Week" }];
  statusList: any = [{ valueCode: 'ACTIVE', valueName: 'Active' }, { valueCode: 'INACTIVE', valueName: 'Inactive' }];
  empleaveList: any;
  leaveitemList: any;
  unitList: any;
  payitemList: any;
  constructor(
    private cdr: ChangeDetectorRef, private activeRoute: ActivatedRoute, private commonService: CommonService,
    private router: Router, private toastService: ToastrService, private empService: EmployeeService
  ) {
    this.empleaveForm = new FormGroup({
      empName: new FormControl(null),
      X_EMPSKILL_ID: new FormControl(null),
      gHoldingId: new FormControl(null, [Validators.required]),
      gCompanyId: new FormControl(null, [Validators.required]),
      isActive: new FormControl(null),
      status: new FormControl(null, [Validators.required]),
      X_LEAVEITEM_ID: new FormControl(null, [Validators.required]),
      EFFECTIVEDATE: new FormControl(null, [Validators.required]),

      DAYS: new FormControl(null, [Validators.required]),
      UNITS: new FormControl(null, [Validators.required]),
      MAXIMUMDAYS: new FormControl(null),
      ISENCASH: new FormControl(null),
      MAKEPROVISION: new FormControl(null),
      X_PAYITEM_ID: new FormControl(null),
     
      description: new FormControl(null),
      xEmployeeId: new FormControl(null),
      DATELASTRUN: new FormControl(null),
     
      processed: new FormControl(null),
      created: new FormControl(null),
      createdBy: new FormControl(null),
      updated: new FormControl(null),
      updatedBy: new FormControl(null),
      
    });
   }

  ngOnInit() {
    this.empleaveForm.get('empName').setValue(this.displayName);
    this.empleaveForm.get('xEmployeeId').setValue(this.empId);
    this.empleaveForm.get('gHoldingId').setValue(this.holdingId);
    this.empleaveForm.get('gCompanyId').setValue(this.companyId);
    if (this.empleaveForm.value.xEmployeeId) {
      this.getEmpleaveByEmpId(this.empleaveForm.value.xEmployeeId);
    }
  }
  getEmpleaveByEmpId(empId) {
    this.empService.getEmpleaveByEmpId(empId).subscribe(s => {
      var success: any = s;
      if (success.data) {
        this.empleaveForm.patchValue(success.data);
        success.data.isActive == "Y" ? this.empleaveForm.get('status').setValue('ACTIVE') : this.empleaveForm.get('status').setValue('INACTIVE');
       
      } else {
        this.empleaveForm.get('status').setValue('ACTIVE');
       
      }
    });
  }
  nextFun(event) {
    this.parentFun.emit(event);
  }

  isOpen:boolean=false;
  add(){
    this.isOpen=true;
  }

  get es() { return this.empleaveForm.controls; }

  saveEmpLeaveDetails() {
    this.empleaveFormSubmitted = true;

    this.empleaveForm.get('createdBy').setValue(1);
    this.empleaveForm.get('created').setValue(new Date());
    this.empleaveForm.get('updatedBy').setValue(1);
    this.empleaveForm.get('updated').setValue(new Date());
    this.empleaveForm.get('processed').setValue("N");
    this.empleaveForm.value.status == "ACTIVE" ? this.empleaveForm.get('isActive').setValue('Y') : this.empleaveForm.get('isActive').setValue('N');
    
    console.log(JSON.stringify(this.empleaveForm.value));
    if (this.empleaveForm.invalid) {
      return;
    } else {
      this.empService.saveUpdateEmpLeave(this.empleaveForm.value).subscribe(s => {
        var success: any = s;

        this.toastService.showToast('success', success.message);
        this.empleaveForm.patchValue(success.data);

        success.data.isActive == "Y" ? this.empleaveForm.get('status').setValue('ACTIVE') : this.empleaveForm.get('status').setValue('INACTIVE');
      });

    }
  }
}
