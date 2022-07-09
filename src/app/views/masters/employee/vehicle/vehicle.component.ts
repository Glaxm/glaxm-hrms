import { ChangeDetectorRef, Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonService, GeneralListCode } from 'src/app/views/services/common.service';
import { ToastrService } from 'src/app/views/services/toastr.service';
import { EmployeeService } from '../employee.service';
import { AngularMyDatePickerDirective, IMyDateModel } from 'angular-mydatepicker';
@Component({
  selector: 'app-vehicle',
  templateUrl: './vehicle.component.html',
  styleUrls: ['./vehicle.component.scss']
})
export class VehicleComponent implements OnInit {

  insurancecompanyList:any = [];
  countryList:any =[];
  enableFilter:boolean=false;
  vehicleForm:any;

  @Input() empId: string;
  @Input() companyId:string;
  @Input() holdingId:string;
  @Input() displayName:string;
  vehicleId:any;
  submitted = false;
  
  regionList:any=[];
  vehicleList:any=[];
  vehicleOwnershipList:any=[];
  statusList: any = [{ valueCode: 'ACTIVE', valueName: 'Active' }, { valueCode: 'INACTIVE', valueName: 'Inactive' }];
  isOpenVehicleInfo:boolean = false;

  @ViewChild('dp1', { static: false }) myDp11: AngularMyDatePickerDirective;
  @ViewChild('dp2', { static: false }) myDp12: AngularMyDatePickerDirective;
  public myDatePickerOptions = this.commonService.datepickerFormat;

  constructor(
    private cdr: ChangeDetectorRef, private toastService:ToastrService,
    private empService:EmployeeService,private router:Router, public commonService:CommonService
  ) {
    this.vehicleForm = new FormGroup({
      empName: new FormControl(null),

      xEmpvehicleId :new FormControl(null),
      xEmployeeId:new FormControl(null),
      gCompanyId:new FormControl(null),
      gHoldingId:new FormControl(null),
      isActive:new FormControl(null),
      status:new FormControl(null),
      created:new FormControl(null),
      createdBy:new FormControl(null),
      updated:new FormControl(null),
      updatedBy:new FormControl(null),
      vehiregno:new FormControl(null),
      lvehiowner:new FormControl(null),
      vehiplateclr:new FormControl(null),
      vehiplatecode:new FormControl(null),
      vehidateexpiry:new FormControl(null),
      vehidateexpiry1:new FormControl(null),
      vehiinsucomp:new FormControl(null),
      vehiinscdateexpiry:new FormControl(null),
      vehiinscdateexpiry1:new FormControl(null)

     
    });
   }

   ngOnInit() {
    this.getEmpvehicleList();
    this.getInsurancecompList();
    this.getVehicleOwnership();
  }

  changeVehiinscdateexpiry(event) {
    this.vehicleForm.get('vehiinscdateexpiry').setValue(event.singleDate.jsDate);
  }

  changeVehidateexpiry(event){
    this.vehicleForm.get('vehidateexpiry').setValue(event.singleDate.jsDate);
  }

  
  getInsurancecompList(){
    this.commonService.getGeneralListByCode(GeneralListCode.INSURANCE_COMP_LIST).subscribe(data=>{
      this.insurancecompanyList=data;
    })
    }

    getVehicleOwnership(){
      this.commonService.getGeneralListByCode(GeneralListCode.VEHICLE_OWNERSHIP).subscribe(data=>{
        this.vehicleOwnershipList=data;
      })
      }
  getEmpvehicleList() {
    this.empService.getEmpvehicleList(this.empId).subscribe(success=>{
      this.vehicleList = success;
    });
  }
  get pi() { return this.vehicleForm.controls; };
  
  addUpdatevehicle() {
    this.vehicleForm.get('createdBy').setValue(Number(sessionStorage.getItem("userId")));
    this.vehicleForm.get('created').setValue(new Date());
    this.vehicleForm.get('updatedBy').setValue(Number(sessionStorage.getItem("userId")));
    this.vehicleForm.get('updated').setValue(new Date());
    this.vehicleForm.get('gCompanyId').setValue(this.companyId);
    this.vehicleForm.get('gHoldingId').setValue(this.holdingId);
    this.vehicleForm.get('xEmployeeId').setValue(Number(this.empId));
    this.vehicleForm.get('lvehiowner').setValue(Number(this.vehicleForm.value.lvehiowner));
    this.vehicleForm.value.status=='ACTIVE' ? this.vehicleForm.get('isActive').setValue('Y') : this.vehicleForm.get('isActive').setValue('N');
  
    if(this.vehicleForm.value.xEmpvehicleId){
      this.vehicleForm.get('xEmpvehicleId').setValue(Number(this.vehicleForm.value.xEmpvehicleId));

    }else {
      this.vehicleForm.get('xEmpvehicleId').setValue(undefined);

    }

    this.submitted = true;
    // if (this.vehicleForm.invalid) {
    //   return;
    // } else{


    this.empService.addUpdateVehicleInfo(this.vehicleForm.value).subscribe(s=>{
      var success:any = s;
      this.toastService.showToast('success', success.message);
      this.isOpenVehicleInfo=false;
      this.vehicleId=undefined;
      this.getEmpvehicleList();
    });
 // }
  }

  getDataUsingRedioBtn(data){
    this.vehicleId = data.xEmpvehicleId;
  }

  edit(){
    this.getEmpvehicleList();
    this.isOpenVehicleInfo=true;
    if(this.vehicleId){
      this.empService.getVehicleById(this.vehicleId).subscribe(s=>{
        var success:any = s;
        this.vehicleForm.patchValue(success.data);
        this.isOpenVehicleInfo=true;

        let st: Date = new Date(success.data.vehidateexpiry);
        let fromModel1: IMyDateModel = {isRange: false, singleDate: {jsDate: st}, dateRange: null};
        this.vehicleForm.controls['vehidateexpiry1'].setValue(fromModel1);

        let ed: Date = new Date(success.data.vehiinscdateexpiry);
        let fromModel: IMyDateModel = {isRange: false, singleDate: {jsDate: ed}, dateRange: null};
        this.vehicleForm.controls['vehiinscdateexpiry1'].setValue(fromModel);

        success.data.isActive=='Y' ? this.vehicleForm.get('status').setValue("ACTIVE") : this.vehicleForm.get('status').setValue("INACTIVE"); 
      }    
      )}
  }

  add(){
    this.isOpenVehicleInfo=true;
    this.vehicleForm.controls['empName'].setValue(this.displayName);
     this.vehicleForm.controls['status'].setValue("ACTIVE");
  }

}
