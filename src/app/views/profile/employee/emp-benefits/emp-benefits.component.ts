import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularMyDatePickerDirective, IMyDateModel } from 'angular-mydatepicker';
import { data } from 'jquery';
import { CommonService, GeneralListCode } from 'src/app/views/services/common.service';

import { ToastrService } from 'src/app/views/services/toastr.service';
import { EmployeeService } from '../employee.service';
import { EmpBenefitsService } from './emp-benefits.service';

@Component({
  selector: 'app-emp-benefits',
  templateUrl: './emp-benefits.component.html',
  styleUrls: ['./emp-benefits.component.scss']
})
export class EmpBenefitsComponent implements OnInit {

  countryList: any = [];
  enableFilter: boolean = false;
  benefitsForm: any;

  @Output('parentFun') parentFun: EventEmitter<any> = new EventEmitter();
  
  @Input() empId: string;
  @Input() companyId: string;
  @Input() holdingId: string;
  @Input() displayName: string;
  benefitsId: any;
  benefitssubmitted = false;
  vehiclesList: any = [];
  regionList: any = [];
  cityList: any = [];
  airentitlmentfamilyList: any = [];
  medicalinsfamilyList: any = [];
  aleaveentitelmenttypeList: any = [];
  aleaveentitelmentdaysList: any = [];
  empbenefitsList: any = [];
  familybenefitentitList: any = [];
  statusList: any = [{ valueCode: 'ACTIVE', valueName: 'Active' }, { valueCode: 'INACTIVE', valueName: 'Inactive' }];
  isOpenBenifits: boolean = false;
  fuelactualcostList: any = [];
  vMMaitainanceAygExpList: any = [];
  vMAvgSalikExpensesList: any = [];
  vMAvgParkingExpList: any = [];
  noDepeEntitlementForAirTktList: any = [];
  pointofhireList: any = [];
  fromList: any = [];
  toList: any = [];
  empBenifitList: any = [];
  fromAirportList: any = [];
  relationform: any;
  insuranceform:any;
  isview:string;
  public myDatePickerOptions = this.commonService.datepickerFormat;
  @ViewChild('dp1', { static: false }) myDp1: AngularMyDatePickerDirective;
  @ViewChild('dp2', { static: false }) myDp2: AngularMyDatePickerDirective;
  @ViewChild('dp3', { static: false }) myDp3: AngularMyDatePickerDirective;
  @ViewChild('dp4', { static: false }) myDp4: AngularMyDatePickerDirective;
  
  constructor(private empBenefitService: EmpBenefitsService, private activeRoute: ActivatedRoute,private cdr: ChangeDetectorRef, private toastService: ToastrService, private router: Router, public commonService: CommonService) {
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

    this.insuranceform= new FormGroup({});

    this.relationform = new FormGroup({
      xEmployeeId: new FormControl(null),
      xEmprelationId: new FormControl(null),
      createdBy: new FormControl(null),
      gHoldingId: new FormControl(null),
      created: new FormControl(null),
      gCompanyId: new FormControl(null),
      isActive: new FormControl(null),
      status: new FormControl(null),
      updated: new FormControl(null),
      updatedBy: new FormControl(null),
      nameofFamily: new FormControl(null),
      lsEmprelationId: new FormControl(null),
      dob: new FormControl(null),
      dateofbirth: new FormControl(null),
      dob1: new FormControl(null),
      lselgbmedi: new FormControl(null),
      lselgbvisa: new FormControl(null),
      lselgbairtk: new FormControl(null),
    })

    this.activeRoute.queryParams.subscribe(params => {
      this.isview =params.view;
    });
  }

  ngOnInit() {
    this.getEmpbenefitsListByEmpId();
    this.getEmpbenefitsList();
    this.getVehicleList();
    this.getAleaveentitlmenttype();
    this.getAleaveentitlmentdays();
    this.getFamilybenefitentit();
    this.grtairentitlmentfamily();
    this.getMedicalinsufamilyList();
    this.getFuelActualCostList();
    this.getvMMaitainanceAygExpList();
    this.getvMAvgSalikExpensesList();
    this.getvMAvgParkingExpList();
    this.getNoDepeEntitlementForAirTktList();
    this.getAirsector();

    this.getFromAirportList();
    this.getAirTecketEntitlementList();
    this.getAirTicketClassList();
    this.getAirTecketElegibiltyList();
    this.edit();
  }

  getEmpbenefitsListByEmpId() {
    if (this.empId) {
      this.empBenefitService.getEmpbenefitsListByEmpId(this.empId).subscribe(d => {
        this.empBenifitList = d;
      });
    }
  }

  getFuelActualCostList() {
    this.commonService.getGeneralListByCode(GeneralListCode.VEHICLE_MONTHLY_ACTUAL_FUEL_EXPENSE).subscribe(data => {
      this.fuelactualcostList = data;
    })
  }


  getAirsector() {
    this.empBenefitService.getAirsectorDetails().subscribe(data => {
      // this.pointofhireList =data;
      // this.fromList =data;
      this.toList = data;
    });
  }

  nextFun(event) {
    this.parentFun.emit(event);
  }

  getFromAirportList() {
    this.commonService.getGeneralListByCode(GeneralListCode.FROM_AIRPORT_LIST).subscribe(data => {
      this.fromAirportList = data;
    })
  }

  getNoDepeEntitlementForAirTktList() {
    this.commonService.getGeneralListByCode(GeneralListCode.NO_DEPENDANCY_ENTITLEMENT_FOR_AIR_TICKET).subscribe(data => {
      this.noDepeEntitlementForAirTktList = data;
    })
  }

  getvMMaitainanceAygExpList() {
    this.commonService.getGeneralListByCode(GeneralListCode.VEHICLE_MONTHLY_MAINTANANCE_AVERAGE_EXPENSE).subscribe(data => {
      this.vMMaitainanceAygExpList = data;
    })
  }

  getvMAvgSalikExpensesList() {
    this.commonService.getGeneralListByCode(GeneralListCode.VEHICLE_MONTHLY_AVG_SALIK_EXP).subscribe(data => {
      //alert(JSON.stringify(data))
      this.vMAvgSalikExpensesList = data;
    })
  }

  getvMAvgParkingExpList() {
    this.commonService.getGeneralListByCode(GeneralListCode.VEHICLE_MONTHLY_AVG_PARKING_EXP).subscribe(data => {
      this.vMAvgParkingExpList = data;
    })
  }


  getVehicleList() {
    this.commonService.getGeneralListByCode(GeneralListCode.YES_NO_LIST).subscribe(data => {
      this.vehiclesList = data;
    })
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
  getFamilybenefitentit() {
    this.commonService.getGeneralListByCode(GeneralListCode.AIR_TICKET_ENTITLEMENT_LIST).subscribe(data => {
      this.familybenefitentitList = data;
    })
  }
  grtairentitlmentfamily() {
    this.commonService.getGeneralListByCode(GeneralListCode.YES_NO_LIST).subscribe(data => {
      this.airentitlmentfamilyList = data;
    })
  }
  getMedicalinsufamilyList() {
    this.commonService.getGeneralListByCode(GeneralListCode.YES_NO_LIST).subscribe(data => {
      this.medicalinsfamilyList = data;
    })
  }
  getEmpbenefitsList() {
    // this.empService.getEmpbenefitsList(this.empId).subscribe(success=>{
    //   this.empbenefitsList = success;
    // });
  }

  airTktEntitlementList: any = [];
  airTktClassList: any = [];
  airtktEligibiltyList: any = [];

  getAirTecketEntitlementList() {
    this.commonService.getGeneralListByCode(GeneralListCode.AIR_TICKET_ENTITLEMENT_LIST).subscribe(data => {
      this.airTktEntitlementList = data;
    })
  }
  getAirTicketClassList() {
    this.commonService.getGeneralListByCode(GeneralListCode.AIR_TICKET_LIST).subscribe(data => {
      this.airTktClassList = data;
    })
  }
  getAirTecketElegibiltyList() {
    this.commonService.getGeneralListByCode(GeneralListCode.AIR_TICKET_ELIGIBILITY_LIST).subscribe(data => {
      this.airtktEligibiltyList = data;
    })
  }

  get pi() { return this.benefitsForm.controls; };
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
        this.isOpenBenifits = false;
        this.benefitsId = undefined;
        // this.getEmpbenefitsList();
        this.getEmpbenefitsListByEmpId();
        this.edit();
      });
    }
  }

  edit() {

    this.benefitsForm.get('value').setValue(this.displayName);
    if (this.empId) {

      this.getAllFamilyDetailsByEmpId();

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
          this.add();
      })
    }
  }

  getDataUsingRedioBtn(data) {
    // alert(JSON.stringify(data))
    this.benefitsId = data.lEmpbenefitsId;
  }

  add() {
    // this.isOpenBenifits = true;
    this.benefitsForm.get('value').setValue(this.displayName);
    this.benefitsForm.controls['status'].setValue("ACTIVE");
  }


  changeChild1Date(event) {
    this.benefitsForm.get('child1dob').setValue(event.singleDate.jsDate);
  }

  changeChild2dob(event) {
    this.benefitsForm.get('child2dob').setValue(event.singleDate.jsDate);
  }
  changeLastairtktDate(event) {
    this.benefitsForm.get('lastairtktDate').setValue(event.singleDate.jsDate);
  }
  changeCurrairtktDate(event) {
    this.benefitsForm.get('currairtktDate').setValue(event.singleDate.jsDate);
  }




  // -----------------------------------------

  empFamilyList: any = [];
  relationList:any = [];
  yesNoList:any = [];
  isOpenRelation: boolean;
  relationId: any;
  addFamily() {
    this.isOpenRelation = true;
    this.relationform.reset();
    this.getRelation();
    this.getYesNoList();
  }

  editFamily() {
    if(this.relationId){
      this.isOpenRelation = true;
      this.relationform.reset();
      this.getRelation();
      this.getYesNoList();
      this.empBenefitService.getRelationById(this.relationId).subscribe(data=>{
        var success: any = data;
        this.relationform.patchValue(success.data);
       let child1dob: Date = new Date(success.data.child1dob);
        let fromModel: IMyDateModel = { isRange: false, singleDate: { jsDate: child1dob }, dateRange: null };
        this.relationform.controls['dob1'].setValue(fromModel);
      })
    }
   }

  getAllFamilyDetailsByEmpId() {
    this.empBenefitService.getAllFamilyDetailsByEmpId(this.empId).subscribe(data => {
      var d:any = data;
      this.empFamilyList = d.data;
    })
  }

  getRelation(){
    this.commonService.getGeneralListByCode(GeneralListCode.RELATION_LIST).subscribe(data=>{
      this.relationList = data;
    })
  }

  getYesNoList(){
    this.commonService.getGeneralListByCode(GeneralListCode.YES_NO_LIST).subscribe(data=>{
      this.yesNoList = data;
    })
  }

  changeDOB(event){
    this.relationform.get('dateofbirth').setValue(this.commonService.dateFormat(event.singleDate.jsDate));
  }

  addUpdateRelation(){
    this.relationform.get('xEmployeeId').setValue(Number(this.empId));
    this.relationform.get('gHoldingId').setValue(this.holdingId);
    this.relationform.get('gCompanyId').setValue(this.companyId);
    this.relationform.get('isActive').setValue("Y");
    this.relationform.get('created').setValue(new Date());
    this.relationform.get('createdBy').setValue(Number(sessionStorage.getItem("userId")));
    this.relationform.get('updatedBy').setValue(Number(sessionStorage.getItem("userId")));
    this.relationform.get('updated').setValue(new Date());
    this.relationform.get('lsEmprelationId').setValue(Number(this.relationform.value.lsEmprelationId));

    this.relationform.get('lselgbmedi').setValue(Number(this.relationform.value.lselgbmedi));
    this.relationform.get('lselgbvisa').setValue(Number(this.relationform.value.lselgbvisa));
    this.relationform.get('lselgbairtk').setValue(Number(this.relationform.value.lselgbairtk));
    if(this.relationform.value.xEmprelationId){
      this.relationform.get('xEmprelationId').setValue(Number(this.relationform.value.xEmprelationId));
    } else{
      this.relationform.get('xEmprelationId').setValue(undefined);
    }
    this.empBenefitService.saveRelation(this.relationform.value).subscribe(data=>{
      var success: any = data;
      this.toastService.showToast('success', success.message);
      this.isOpenRelation = false;
      this.relationId = undefined;
      this.getAllFamilyDetailsByEmpId();
    });
   

  }

  getDataUsingRedioBtn1(data){
      this.relationId = data.xEmprelationId;
  }

  // Life Insurance Information

  isLifeInsuranceInformation:boolean=false;
  lifeInsuranceInfoList:any=[];

  LifeInsuranceEnum={
    LIFE_INSURNACE:0
  };

  addLifeInsuranceInfo(){ 
    this.LifeInsuranceEnum.LIFE_INSURNACE=1;
  }

  editLifeInsuranceInfo(){ }



}
