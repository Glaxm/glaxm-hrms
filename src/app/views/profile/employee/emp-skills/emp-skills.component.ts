import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService } from 'src/app/views/services/common.service';
import { ToastrService } from 'src/app/views/services/toastr.service';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-emp-skills',
  templateUrl: './emp-skills.component.html',
  styleUrls: ['./emp-skills.component.scss']
})
export class EmpSkillsComponent implements OnInit {
  public myDatePickerOptions = this.commonService.datepickerFormat;

  @Output('parentFun') parentFun: EventEmitter<any> = new EventEmitter();

  @Input() empId: string;
  @Input() companyId: string;
  @Input() holdingId: string;
  @Input() displayName: string;
  //commonService: any;

  skillsForm: FormGroup;
  skillsFormSubmitted: boolean = false;
  expertiselevelList: any = [{ valueCode: "A", valueName: "Average" }, { valueCode: "E", valueName: "Expert" }, { valueCode: "G", valueName: "Good" }, { valueCode: "N", valueName: "Normal" }, { valueCode: "P", valueName: "Poor" }];
  // payModeList: any = [{ valueCode: "C", valueName: "Cash" }, { valueCode: "H", valueName: "Cheque" }, { valueCode: "B", valueName: "Bank Transfer" }];
  statusList: any = [{ valueCode: 'ACTIVE', valueName: 'Active' }, { valueCode: 'INACTIVE', valueName: 'Inactive' }];
  skillsList: any;
  

  constructor(
    private cdr: ChangeDetectorRef, private activeRoute: ActivatedRoute, private commonService: CommonService,
    private router: Router, private toastService: ToastrService, private empService: EmployeeService
  ) {
    this.skillsForm = new FormGroup({
      empName: new FormControl(null),
      xEmpSkillId: new FormControl(null),
      gHoldingId: new FormControl(null, [Validators.required]),
      gCompanyId: new FormControl(null, [Validators.required]),
      isActive: new FormControl(null),
      status: new FormControl(null, [Validators.required]),
      skills: new FormControl(null, [Validators.required]),
      expertiselevel: new FormControl(null, [Validators.required]),
     
      description: new FormControl(null),
      xEmployeeId: new FormControl(null),
      xBankId: new FormControl(null),
     
      processed: new FormControl(null),
      created: new FormControl(null),
      createdBy: new FormControl(null),
      updated: new FormControl(null),
      updatedBy: new FormControl(null),

      
    });

    // this.getCurrency();
    // this.getPayItemList();
    // this.getBankList();
   }

  ngOnInit() {
    this.getAllSkillsList();
  
    this.skillsForm.get('empName').setValue(this.displayName);
    this.skillsForm.get('xEmployeeId').setValue(this.empId);
    this.skillsForm.get('gHoldingId').setValue(this.holdingId);
    this.skillsForm.get('gCompanyId').setValue(this.companyId);
    if (this.skillsForm.value.xEmployeeId) {
      this.empService.getEmpSkillsByEmpId(this.skillsForm.value.xEmployeeId).subscribe(s => {
        var success: any = s;
       
        if (success.data) {
          this.skillsForm.patchValue(success.data);
          success.data.isActive == "Y" ? this.skillsForm.get('status').setValue('ACTIVE') : this.skillsForm.get('status').setValue('INACTIVE');
         
        } else {
          this.skillsForm.get('status').setValue('ACTIVE');
         
        }
      });
    }
  }

  getAllSkillsList(){
    this.empService.getAllSkillsList().subscribe(d=>{
      this.skillsList = d;
    });
  }
 
  nextFun(event) {
    this.parentFun.emit(event);
  }

  get es() { return this.skillsForm.controls; }

  saveEmpSkillsDetails() {
    this.skillsFormSubmitted = true;

    this.skillsForm.get('createdBy').setValue(1);
    this.skillsForm.get('created').setValue(new Date());
    this.skillsForm.get('updatedBy').setValue(1);
    this.skillsForm.get('updated').setValue(new Date());
    this.skillsForm.get('processed').setValue("N");
    this.skillsForm.value.status == "ACTIVE" ? this.skillsForm.get('isActive').setValue('Y') : this.skillsForm.get('isActive').setValue('N');
    
    console.log(JSON.stringify(this.skillsForm.value));
    if (this.skillsForm.invalid) {
      return;
    } else {
      this.empService.saveUpdateEmpSkills(this.skillsForm.value).subscribe(s => {
        var success: any = s;

        this.toastService.showToast('success', success.message);
        this.skillsForm.patchValue(success.data);

        success.data.isActive == "Y" ? this.skillsForm.get('status').setValue('ACTIVE') : this.skillsForm.get('status').setValue('INACTIVE');

       

      });

    }
  }
}
