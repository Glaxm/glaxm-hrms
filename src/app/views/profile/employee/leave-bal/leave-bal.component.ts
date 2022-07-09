import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IMyDateModel } from 'angular-mydatepicker';
import { CommonService, GeneralListCode } from 'src/app/views/services/common.service';
import { ToastrService } from 'src/app/views/services/toastr.service';
import { EmpBenefitsService } from '../emp-benefits/emp-benefits.service';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-leave-bal',
  templateUrl: './leave-bal.component.html',
  styleUrls: ['./leave-bal.component.scss']
})
export class LeaveBalComponent implements OnInit {

  @Input() empId: string;
  @Input() companyId:string;
  @Input() holdingId:string;
  @Input() displayName:string;
  @Output('parentFun') parentFun: EventEmitter<any> = new EventEmitter();
  isview:string;
  leaveballist:any =[];
  aleaveentitelmenttypeList:any =[];
  aleaveentitelmentdaysList:any =[];
  benefitssubmitted = false;
  benefitsForm:FormGroup;
  benefitsId: any;
  
  moduleList: any = [];
  flags = {
    createFlag: '',
    editFlag: '',
    readFlag: '',
    deleteFlag: '',
    exportFlag:'',
  importFlag:'',
  forSelf: ''
  }

  constructor(private toastService: ToastrService,private empBenefitService: EmpBenefitsService,private activeRoute: ActivatedRoute,private empService:EmployeeService,private router:Router, public commonService:CommonService) { 
    
    this.moduleList = JSON.parse(sessionStorage.getItem("moduleList"));
    if (this.moduleList) {
      this.moduleList.map((e) => {
        if (e.moduleGroup == 'Leave Management' && e.moduleName == 'Leave Balance') {
          this.flags = { 'createFlag': e.createFlag, 'editFlag': e.editFlag, 'readFlag': e.readFlag, 'deleteFlag': e.deleteFlag,
          'importFlag': e.importFlag,
          'exportFlag': e.exportFlag,
          'forSelf': e.forSelf };
        }
      });
    }

    this.benefitsForm = new FormGroup({
      value: new FormControl(null),
      lEmpbenefitsId: new FormControl(null),
      xEmployeeId: new FormControl(null),
      gCompanyId: new FormControl(null),
      gHoldingId: new FormControl(null),
      isActive: new FormControl(null),
      created: new FormControl(null),
      createdBy: new FormControl(null),
      updated: new FormControl(null),
      updatedBy: new FormControl(null),

      lAirtktentlId: new FormControl(null),
      xEmpleaveId: new FormControl(null),
      lentldays: new FormControl(null),
      annualbaldays: new FormControl(null),
      hasvehicle: new FormControl(null),
      vehibrand: new FormControl(null),
      vehimodel: new FormControl(null),
      vehivalue: new FormControl(null),
      fuelcostlimit: new FormControl(null),
      fuelactualcost: new FormControl(null),

      mntsavgexps: new FormControl(null),
      saltkavgexps: new FormControl(null),
      parkavgexps: new FormControl(null),

      //new field

      famibeneentl: new FormControl(null),
      noofairtkts: new FormControl(null),
      mediinsufamily: new FormControl(null),
      airtktfamentl: new FormControl(null),
      ppspousename: new FormControl(null),
      child1name: new FormControl(null),
      child1dob: new FormControl(null),
      child2name: new FormControl(null),
      child2dob: new FormControl(null),
      fromAirsectorId: new FormControl(null),
      toAirsectorId: new FormControl(null),
      airtikentId: new FormControl(null),
      airtktclsId: new FormControl(null),
      airtktelgId: new FormControl(null),
      lastairtktDate: new FormControl(null),
      currairtktDate: new FormControl(null),
      status: new FormControl(null),
      child1dob1: new FormControl(null),
      child2dob1: new FormControl(null),
      lastairtktDate1: new FormControl(null),
      currairtktDate1: new FormControl(null),


      licbenename1: new FormControl(null),
      licbenetel1: new FormControl(null),
      licbenename2: new FormControl(null),
      licbenetel2: new FormControl(null),

      licbeneper1: new FormControl(null),
      licbeneper2: new FormControl(null),

    });

    this.activeRoute.queryParams.subscribe(params => {
      this.isview = params.view;
    });

  }

  ngOnInit() {
    this.getLeaveBalList();   
    this.getAleaveentitlmenttype();
    this.getAleaveentitlmentdays();
    this.edit();
  }

  nextFun(event) {
    this.parentFun.emit(event);
  }

  getLeaveBalList(){
      this.empService.getLeaveBalList(this.empId).subscribe(data=>{
            this.leaveballist = data;
      });
  } 


  getDataUsingRedioBtn(){

  }

  getAleaveentitlmenttype() {
    this.commonService.getGeneralListByCode(GeneralListCode.ANNUAL_LEAVE_ENTITLEMENT_TYPE_LIST).subscribe(data => {
      this.aleaveentitelmenttypeList = data;
    })
  }
  getAleaveentitlmentdays() {
    this.commonService.getGeneralListByCode(GeneralListCode.ANNUAL_LEAVE_ENTITLEMENT_DAYS_LIST).subscribe(data => {
      this.aleaveentitelmentdaysList = data;
    })
  }

  addUpdateBenifitsData() {



    this.benefitsForm.get('createdBy').setValue(Number(sessionStorage.getItem("userId")));
    this.benefitsForm.get('created').setValue(new Date());
    this.benefitsForm.get('updatedBy').setValue(Number(sessionStorage.getItem("userId")));
    this.benefitsForm.get('updated').setValue(new Date());
    this.benefitsForm.get('gCompanyId').setValue(Number(this.companyId));
    this.benefitsForm.get('gHoldingId').setValue(Number(this.holdingId));
    this.benefitsForm.get('xEmployeeId').setValue(Number(this.empId));

    this.benefitsForm.get('licbeneper1').setValue(Number(this.benefitsForm.value.licbeneper1));
    this.benefitsForm.get('licbeneper2').setValue(Number(this.benefitsForm.value.licbeneper2));


    if (this.benefitsForm.value.lEmpbenefitsId) {
      this.benefitsForm.get('lEmpbenefitsId').setValue(Number(this.benefitsForm.value.lEmpbenefitsId));

    } else {
      this.benefitsForm.get('lEmpbenefitsId').setValue(undefined);

    }

    // this.benefitsForm.value.status == 'ACTIVE' ? this.benefitsForm.get('isActive').setValue('Y') : this.benefitsForm.get('isActive').setValue('N');
    this.benefitsForm.get('isActive').setValue('Y');

    this.benefitssubmitted = true;
    if (this.benefitsForm.invalid) {
      return;
    } else {
      this.empBenefitService.addUpdateBenefits(this.benefitsForm.value).subscribe(s => {
        var success: any = s;
        this.toastService.showToast('success', success.message);
        // this.isOpenBenifits = false;
        // this.benefitsId = undefined;
        // this.getEmpbenefitsList();
        // this.getEmpbenefitsListByEmpId();
       
      });
    }
  }

  get pi() { return this.benefitsForm.controls; };

  edit() {

    this.benefitsForm.get('value').setValue(this.displayName);
    if (this.empId) {

   
      this.empBenefitService.getBenefitsById(this.empId).subscribe(s => {
        var success: any = s;
        this.benefitsForm.patchValue(success.data);
        this.benefitsId = success.data.lEmpbenefitsId;
        success.data.isActive == 'Y' ? this.benefitsForm.get('status').setValue("ACTIVE") : this.benefitsForm.get('status').setValue("INACTIVE");

        let child1dob: Date = new Date(success.data.child1dob);
        let fromModel: IMyDateModel = { isRange: false, singleDate: { jsDate: child1dob }, dateRange: null };
        this.benefitsForm.controls['child1dob1'].setValue(fromModel);

        let a: Date = new Date(success.data.child2dob);
        let fromModel1: IMyDateModel = { isRange: false, singleDate: { jsDate: a }, dateRange: null };
        this.benefitsForm.controls['child2dob1'].setValue(fromModel1);

        let currairtktDate: Date = new Date(success.data.currairtktDate);
        let currairtktDateModel: IMyDateModel = { isRange: false, singleDate: { jsDate: currairtktDate }, dateRange: null };
        this.benefitsForm.controls['currairtktDate1'].setValue(currairtktDateModel);

        let lastairtktDate: Date = new Date(success.data.lastairtktDate);
        let lastairtktDateModel: IMyDateModel = { isRange: false, singleDate: { jsDate: lastairtktDate }, dateRange: null };
        this.benefitsForm.controls['lastairtktDate1'].setValue(lastairtktDateModel);

        if(this.isview=='Y'){ this.benefitsForm.disable(); }
      },error=>{
         // this.add();
      })
    }
  }

}
