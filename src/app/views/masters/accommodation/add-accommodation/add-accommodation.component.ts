import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { data } from 'jquery';
import { CommonService, GeneralListCode } from 'src/app/views/services/common.service';
import { ToastrService } from 'src/app/views/services/toastr.service';
import { AccommodationService } from '../accommodation.service';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
@Component({
  selector: 'app-add-accommodation',
  templateUrl: './add-accommodation.component.html',
  styleUrls: ['./add-accommodation.component.scss']
})
export class AddAccommodationComponent implements OnInit {

  countryList:any =[];
  areaList:any =[];
  moduleid:any;
  emirateList:any =[];
  BuildingNameNo:any =[];
  typeofunitList:any =[];
  status1List:any =[];
  floorList:any =[];
  accommodationList:any =[];
  employeeList:any =[];
  buildingNoList:any =[];
  enableFilter:boolean=false;
  
  accommodationForm: FormGroup;
  submitted = false;
  isView: boolean = false;
  holdingList: any = [];
  companyList: any = [];
  // deptList:any=[];
  statusList: any = [{ valueCode: 'ACTIVE', valueName: 'Active' }, { valueCode: 'INACTIVE', valueName: 'Inactive' }]


  selectedItems: Array<any> = [];
  dropdownSettings: any = {};
  obj={ companyId:null }
  
  tepMethod(){
    this.dropdownSettings = {
        singleSelection: true,
        idField: 'employeeId',
        textField: 'displayName',
        selectAllText: 'Select All',
        unSelectAllText: 'UnSelect All',
        itemsShowLimit: 1,
        allowSearchFilter: true
    };
  }

  onItemSelect(item: any) {
    this.accommodationForm.controls['xEmployeeId'].setValue(item.employeeId);
    
  }
  onSelectAll(items: any) {
    console.log('onSelectAll', items);
  }

  constructor(private toastService: ToastrService, private activatedRoute: ActivatedRoute, 
    private accommodationService:AccommodationService, private router: Router, public commonService:CommonService) {
    this.accommodationForm = new FormGroup({
      accommodationId: new FormControl(null),
      lEmpaccoId: new FormControl(null),
      xEmployeeId: new FormControl(null),
      gCompanyId: new FormControl(null),
      company: new FormControl(null, [Validators.required]),
      isActive: new FormControl(null),
      status: new FormControl(null),
      created: new FormControl(null),
      createdBy: new FormControl(null),
      updated: new FormControl(null),
      updatedBy: new FormControl(null),
      gHoldingId: new FormControl(null),
      lsAccoareaId: new FormControl(null,[Validators.required]),
      lsAccoemirtId: new FormControl(null),
      lsBuildnmnoId: new FormControl(null),
      lsRoomtypeId: new FormControl(null),
      lsRoomstatusId: new FormControl(null),
      flatnumber: new FormControl(null,[Validators.required]),
      lsFloorId: new FormControl(null),
      G_APPROVALREQ_ID:new FormControl(null),
      value: new FormControl(null),
      employee: new FormControl(null),
      bedno: new FormControl(null),
      annualrentalvalue: new FormControl(null),
      monthlyrentalvalue: new FormControl(null),
      accommodation: new FormControl(null),
     
    });

    this.activatedRoute.queryParams.subscribe(params => {
      this.accommodationForm.controls['accommodationId'].setValue(params.id);
      this.isView = params.view;
     this.moduleid = params.moduleid;
    });
  }

  ngOnInit() {
    this.companySetting();
    this.tepMethod();
    this.getHoldingList();
    this.getAreaList();
    this.getEmirateList();
    this.getTyprUnits();
    this.getRoomstarus();
    this.getFloorList();
    this.getAccommodation()
    this.getBuildingNo();
    //this.getEmpList();
    if (this.accommodationForm.value.accommodationId) {
      this.accommodationService.getAccommodationById(this.accommodationForm.value.accommodationId).subscribe(success => {
        var s: any = success;
        this.accommodationForm.patchValue(s.data);
        this.getCompanyListByHoldingId(s.data.holdingId);
        s.data.isActive == 'Y' ? this.accommodationForm.get('status').setValue("ACTIVE") : this.accommodationForm.get('status').setValue("INACTIVE");
        this.selectcompany();
        if (this.isView) { this.accommodationForm.disable(); }
      });
    } else{
      this.accommodationForm.get('status').setValue("ACTIVE");
    }
  }

  setCompList(list) {
    let elm: any = [];
    list.forEach(element => {
      elm.push(element.gCompanyId);
    });
    let unique = [...new Set(elm)];
    return unique;
  }

getEmpList(l)
{
  
  let compList: any = this.selectedCompanyList.length==1 ? this.setCompanyList(this.selectedCompanyList[0]):this.setCompanyList(this.selectedCompanyList);

  this.accommodationService.getEmpList(this.moduleid,compList).subscribe(data=>{
    this.employeeList=data;

    if(this.accommodationForm.value.lEmpaccoId && this.accommodationForm.value.xEmployeeId){
   
      let list = this.employeeList.filter(item => item.employeeId == this.accommodationForm.value.xEmployeeId);
      if(list.length>0){
        this.selectedItems=[{'employeeId':list[0].employeeId,'displayName':list[0].displayName}];
      }
    }

  })
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

getAccommodation(){
  this.commonService.getGeneralListByCode(GeneralListCode.VEHICLE_OWNERSHIP).subscribe(data=>{
    this.accommodationList=data;
  })
  }

  get f() { return this.accommodationForm.controls; }

 
  getCompanyListByHoldingId(holdinId) {

    this.accommodationService.getCompanyListByHoldingId(holdinId).subscribe(s => {
      this.companyList = s;
      if(this.accommodationForm.value.accommodationId){
        this.selectedCompanyList = this.companyList.filter(o1 => this.obj.companyId.some(o2 => o1.gCompanyId === o2));
      }
    
    });
  }

  getHoldingList() {
    this.accommodationService.getHoldingList().subscribe(s => {
      this.holdingList = s;
      this.accommodationForm.get('gHoldingId').setValue(this.holdingList[0].gHoldingId);
      this.getCompanyListByHoldingId(this.holdingList[0].gHoldingId) 
    });
  }

  setCompanyList(list) {
    let elm: any = [];
    list.forEach(element => {
      elm.push(element.gCompanyId);
    });
    let unique = [...new Set(elm)];
    return unique;
  }


  addUpdateAccommodation() {
    this.accommodationForm.get('createdBy').setValue(Number(sessionStorage.getItem('userId')));
    this.accommodationForm.get('created').setValue(new Date());
    this.accommodationForm.get('updatedBy').setValue(Number(sessionStorage.getItem('userId')));
    this.accommodationForm.get('updated').setValue(new Date());
    let compList: any = this.setCompanyList(this.selectedCompanyList)
    this.accommodationForm.get('gCompanyId').setValue(compList);
    if (this.accommodationForm.value.lEmpaccoId){this.accommodationForm.get('lEmpaccoId').setValue(Number(this.accommodationForm.value.lEmpaccoId));}
     else {this.accommodationForm.get('lEmpaccoId').setValue(undefined)}
    
    if(this.accommodationForm.value.lsAccoareaId){
      this.accommodationForm.get('lsAccoareaId').setValue(Number(this.accommodationForm.value.lsAccoareaId));
    } else{
      this.accommodationForm.get('lsAccoareaId').setValue(null);
    }
    if(this.accommodationForm.value.bedno){
      this.accommodationForm.get('bedno').setValue(Number(this.accommodationForm.value.bedno));
    }else{
      this.accommodationForm.get('bedno').setValue(null);
    }
    if(this.accommodationForm.value.annualrentalvalue){
      this.accommodationForm.get('annualrentalvalue').setValue(Number(this.accommodationForm.value.annualrentalvalue));
    }else{
      this.accommodationForm.get('annualrentalvalue').setValue(null);
    }
    if(this.accommodationForm.value.accommodation){
      this.accommodationForm.get('accommodation').setValue(Number(this.accommodationForm.value.accommodation));
    }else{
      this.accommodationForm.get('accommodation').setValue(null);
    }
    if(this.accommodationForm.value.xEmployeeId){
      this.accommodationForm.get('xEmployeeId').setValue(Number(this.accommodationForm.value.xEmployeeId));
    }else{
      this.accommodationForm.get('xEmployeeId').setValue(null);      
    }
    if(this.accommodationForm.value.monthlyrentalvalue){
      this.accommodationForm.get('monthlyrentalvalue').setValue(Number(this.accommodationForm.value.monthlyrentalvalue));
    }else{
      this.accommodationForm.get('monthlyrentalvalue').setValue(null);  
    }
    if(this.accommodationForm.value.lsRoomtypeId){
      this.accommodationForm.get('lsRoomtypeId').setValue(Number(this.accommodationForm.value.lsRoomtypeId));
    }else{
      this.accommodationForm.get('lsRoomtypeId').setValue(null);
    }
    if(this.accommodationForm.value.lsRoomstatusId){
      this.accommodationForm.get('lsRoomstatusId').setValue(Number(this.accommodationForm.value.lsRoomstatusId));
    }else{
      this.accommodationForm.get('lsRoomstatusId').setValue(null);
    }
    if(this.accommodationForm.value.lsFloorId){
      this.accommodationForm.get('lsFloorId').setValue(Number(this.accommodationForm.value.lsFloorId));
    }else{
      this.accommodationForm.get('lsFloorId').setValue(null);
    }
    if(this.accommodationForm.value.lsBuildnmnoId){
      this.accommodationForm.get('lsBuildnmnoId').setValue(Number(this.accommodationForm.value.lsBuildnmnoId));
    }else{
      this.accommodationForm.get('lsBuildnmnoId').setValue(null);
    }
    if(this.accommodationForm.value.lsAccoemirtId){
      this.accommodationForm.get('lsAccoemirtId').setValue(Number(this.accommodationForm.value.lsAccoemirtId));
    }else{
      this.accommodationForm.get('lsAccoemirtId').setValue(null);
    }
     
     
    

    this.accommodationForm.value.status == "ACTIVE" ? this.accommodationForm.get('isActive').setValue('Y') : this.accommodationForm.get('isActive').setValue('N');
    this.submitted = true;
    if (this.accommodationForm.invalid) {
      return;
    } else {
      this.accommodationService.addUpdateAccommodation(this.accommodationForm.value).subscribe(success=>{
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
    // if (this.parentUrl) {
    //   this.router.navigate([this.parentUrl]);
    // } else {
    this.router.navigate(["/views/masters/accomodation/accommodation-summary"]);
    // }
  }
  selectcompany()
  {
    let compList: any = this.setCompanyList(this.selectedCompanyList)
    this.getEmpList(compList);
  }

  //================================================ Multiselect Company list

  selectedCompanyList = [];
  dropdownSettingsC: IDropdownSettings;

  companySetting() {
    this.dropdownSettingsC = {
      singleSelection: false,
      idField: 'gCompanyId',
      textField: 'name',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };
  }
 
  onCompnaySelect(item: any) {
    this.selectedCompanyList.push(item);
    this.selectcompany();
  }

  onCompanyDeSelect(items: any) {
    this.selectedCompanyList = this.selectedCompanyList.filter(item => item.gCompanyId !== items.gCompanyId);
    this.selectcompany();
  }

  onSelectAllCompnay(items: any) {
    this.selectedCompanyList = [];
    this.selectedCompanyList.push(...[items]);
    this.selectcompany();
  }



}
