import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonService, GeneralListCode } from 'src/app/views/services/common.service';
import { ToastrService } from 'src/app/views/services/toastr.service';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-accommodation',
  templateUrl: './accommodation.component.html',
  styleUrls: ['./accommodation.component.scss']
})
export class AccommodationComponent implements OnInit {

  countryList:any =[];
  areaList:any =[];
  emirateList:any =[];
  BuildingNameNo:any =[];
  typeofunitList:any =[];
  status1List:any =[];
  floorList:any =[];
  enableFilter:boolean=false;
  accommodationForm:any;

  @Input() empId: string;
  @Input() companyId:string;
  @Input() holdingId:string;
  @Input() displayName:string;
  accommodationId:any;
  accommodationsubmitted = false;
  
  regionList:any=[];
  accommodationList:any=[];
  buildingNoList:any=[];
  statusList: any = [{ valueCode: 'ACTIVE', valueName: 'Active' }, { valueCode: 'INACTIVE', valueName: 'Inactive' }];
  isOpenAccomod:boolean = false;

  constructor(
    private cdr: ChangeDetectorRef, private toastService:ToastrService,
    private empService:EmployeeService,private router:Router, public commonService:CommonService
  ) {
    this.accommodationForm = new FormGroup({
      lEmpaccoId: new FormControl(null),
      xEmployeeId: new FormControl(null),
      gCompanyId: new FormControl(null),
      isActive: new FormControl(null),
      status: new FormControl(null),
      created: new FormControl(null),
      createdBy: new FormControl(null),
      updated: new FormControl(null),
      updatedBy: new FormControl(null),
      gHoldingId: new FormControl(null),
      lsAccoareaId: new FormControl(null),
      lsAccoemirtId: new FormControl(null),
      lsBuildnmnoId: new FormControl(null),
      lsRoomtypeId: new FormControl(null),
      lsRoomstatusId: new FormControl(null),
      flatnumber: new FormControl(null),
      lsFloorId: new FormControl(null),
      value: new FormControl(null),
    });
   }

   add(){
     this.isOpenAccomod =true;
     this.accommodationForm.controls['value'].setValue(this.displayName);
     this.accommodationForm.controls['status'].setValue("ACTIVE");
   }

   ngOnInit() {
    this.getEmpaccommodationList();
    this.getAreaList();
    this.getEmirateList();
    this.getTyprUnits();
    this.getRoomstarus();
    this.getFloorList();
    this.getBuildingNo();
  }
  
  getAreaList(){
    this.commonService.getGeneralListByCode(GeneralListCode.AREA_LIST).subscribe(data=>{
      this.areaList=data;
    })
  }
  
  getBuildingNo(){
    this.commonService.getGeneralListByCode(GeneralListCode.BUILDING_NO).subscribe(data=>{
      this.buildingNoList=data;
    })
  }

  getTyprUnits(){
    this.commonService.getGeneralListByCode(GeneralListCode.ROOM_UNITS_LIST).subscribe(data=>{
      this.typeofunitList=data;
    })
  }
  getEmirateList(){
    this.commonService.getGeneralListByCode(GeneralListCode.EMIRATES_LIST).subscribe(data=>{
      this.emirateList=data;
    })
  }
  getRoomstarus(){
    this.commonService.getGeneralListByCode(GeneralListCode.ROOM_STATUS).subscribe(data=>{
      this.status1List=data;
    })
  }
  getFloorList(){
    this.commonService.getGeneralListByCode(GeneralListCode.FLOOR_LIST).subscribe(data=>{
      this.floorList=data;
    })
  }
  getEmpaccommodationList() {
    this.empService.getEmpaccommodationList(this.empId).subscribe(success=>{
      this.accommodationList = success;
    });
  }
  get pi() { return this.accommodationForm.controls; };
  
  addUpdateaccommodation() {
    this.accommodationForm.get('createdBy').setValue(Number(sessionStorage.getItem("userId")));
    this.accommodationForm.get('created').setValue(new Date());
    this.accommodationForm.get('updatedBy').setValue(Number(sessionStorage.getItem("userId")));
    this.accommodationForm.get('updated').setValue(new Date());
    this.accommodationForm.get('gCompanyId').setValue(Number(this.companyId));
    this.accommodationForm.get('gHoldingId').setValue(Number(this.holdingId));
    this.accommodationForm.get('xEmployeeId').setValue(Number(this.empId));

    this.accommodationForm.get('lsAccoareaId').setValue(Number(this.accommodationForm.value.lsAccoareaId));
    this.accommodationForm.get('lsAccoemirtId').setValue(Number(this.accommodationForm.value.lsAccoemirtId));
    this.accommodationForm.get('lsBuildnmnoId').setValue(Number(this.accommodationForm.value.lsBuildnmnoId));
    this.accommodationForm.get('lsRoomtypeId').setValue(Number(this.accommodationForm.value.lsRoomtypeId));
    this.accommodationForm.get('lsRoomstatusId').setValue(Number(this.accommodationForm.value.lsRoomstatusId));
    this.accommodationForm.get('lsFloorId').setValue(Number(this.accommodationForm.value.lsFloorId));
    
    this.accommodationForm.value.status=='ACTIVE' ? this.accommodationForm.get('isActive').setValue('Y') : this.accommodationForm.get('isActive').setValue('N');
  
    if(this.accommodationForm.value.lEmpaccoId){
      this.accommodationForm.get('lEmpaccoId').setValue(Number(this.accommodationForm.value.lEmpaccoId));

    }else {
      this.accommodationForm.get('lEmpaccoId').setValue(undefined);

    }

    this.accommodationsubmitted = true;
    // if (this.accommodationForm.invalid) {
    //   return;
    // } else{


    this.empService.addUpdateAccommodation(this.accommodationForm.value).subscribe(s=>{
      var success:any = s;
      this.toastService.showToast('success', success.message);
      this.isOpenAccomod=false;
      this.accommodationId=undefined;
      this.getEmpaccommodationList();
    });
  //}
  }

  edit(){
    this.getEmpaccommodationList();
       
    if(this.accommodationId){
      this.empService.getAccommodationById(this.accommodationId).subscribe(s=>{
        var success:any = s;
        this.accommodationForm.patchValue(success.data);
        this.isOpenAccomod=true;
        this.accommodationForm.controls['value'].setValue(this.displayName);
        success.data.isActive=='Y' ? this.accommodationForm.get('status').setValue("ACTIVE") : this.accommodationForm.get('status').setValue("INACTIVE"); 
      })
     }
  }

  getDataUsingRedioBtn(data){
    this.accommodationId = data.lEmpaccoId;
  }

}
