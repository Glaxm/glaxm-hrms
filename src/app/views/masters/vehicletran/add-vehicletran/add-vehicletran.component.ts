import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularMyDatePickerDirective } from 'angular-mydatepicker';
import { CommonService, GeneralListCode } from 'src/app/views/services/common.service';
import { ToastrService } from 'src/app/views/services/toastr.service';
import { VechicletranService } from '../vechicletran.service';

@Component({
  selector: 'app-add-vehicletran',
  templateUrl: './add-vehicletran.component.html',
  styleUrls: ['./add-vehicletran.component.scss']
})
export class AddVehicletranComponent implements OnInit {

  vehicletranForm: FormGroup;
  submitted = false;
  isView: boolean = false;
  holdingList: any = [];
  employeeList: any = [];
  insurancecompanyList: any = [];
  vehicleOwnershipList: any = [];
  companyList: any = [];
  // deptList:any=[];
  statusList: any = [{ valueCode: 'ACTIVE', valueName: 'Active' }, { valueCode: 'INACTIVE', valueName: 'Inactive' }]

  @ViewChild('dp1', { static: false }) myDp11: AngularMyDatePickerDirective;
  @ViewChild('dp2', { static: false }) myDp12: AngularMyDatePickerDirective;
  public myDatePickerOptions = this.commonService.datepickerFormat;
 
  selectedItems: Array<any> = [];
  dropdownSettings: any = {};
  moduleid:any;
  
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
    this.vehicletranForm.controls['xEmployeeId'].setValue(item.employeeId);
    
  }
  onSelectAll(items: any) {
    console.log('onSelectAll', items);
  }

  constructor(private toastService: ToastrService, private activatedRoute: ActivatedRoute, private vehicletranService:VechicletranService, 
    private router: Router , public commonService:CommonService) {
    this.vehicletranForm = new FormGroup({
      vehicletranId: new FormControl(null),
      xEmpvehicleId :new FormControl(null),
      xEmployeeId:new FormControl(null),
      employee:new FormControl(null),
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
      G_APPROVALREQ_ID:new FormControl(null),
      vehiinscdateexpiry:new FormControl(null),
      vehiinscdateexpiry1:new FormControl(null)
    });

    this.activatedRoute.queryParams.subscribe(params => {
      this.vehicletranForm.controls['vehicletranId'].setValue(params.id);
      this.isView = params.view;
      this.moduleid = params.moduleid;
    });
  }

  ngOnInit() {
    this.tepMethod();
    this.getHoldingList();
    this.getInsurancecompList();
    this.getVehicleOwnership();
   // this.getEmpList();
   // this.getDeptList();
    if (this.vehicletranForm.value.vehicletranId) {
      this.vehicletranService.getVehicletranById(this.vehicletranForm.value.vehicletranId).subscribe(success => {
        var s: any = success;
        this.vehicletranForm.patchValue(s.data);
        this.getCompanyListByHoldingId(s.data.holdingId);
  this.selectcompany(s.data.gCompanyId)

        s.data.isActive == 'Y' ? this.vehicletranForm.get('status').setValue("ACTIVE") : this.vehicletranForm.get('status').setValue("INACTIVE");
        if (this.isView) { this.vehicletranForm.disable(); }
      });
    } else{
      this.vehicletranForm.get('status').setValue("ACTIVE");
    }
  }

  //list

  getEmpList(cmpList)
{
  let l:any = [Number(cmpList)]//sessionStorage.getItem("company");
 
  this.vehicletranService.getEmpList(this.moduleid,l).subscribe(data=>{
    this.employeeList=data;
    if(this.vehicletranForm.value.xEmpvehicleId && this.vehicletranForm.value.xEmployeeId){
   
      let list = this.employeeList.filter(item => item.employeeId == this.vehicletranForm.value.xEmployeeId);
      if(list.length>0){
        this.selectedItems=[{'employeeId':list[0].employeeId,'displayName':list[0].displayName}];
      }
    }
    

  })
}

  changeVehiinscdateexpiry(event) {
    this.vehicletranForm.get('vehiinscdateexpiry').setValue(event.singleDate.jsDate);
  }

  changeVehidateexpiry(event){
    this.vehicletranForm.get('vehidateexpiry').setValue(event.singleDate.jsDate);
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
 

  get f() { return this.vehicletranForm.controls; }

 
  getCompanyListByHoldingId(holdinId) {

    this.vehicletranService.getCompanyListByHoldingId(holdinId).subscribe(s => {
      this.companyList = s;
    
    });
  }

  getHoldingList() {
    this.vehicletranService.getHoldingList().subscribe(s => {
      this.holdingList = s;
      this.vehicletranForm.get('gHoldingId').setValue(this.holdingList[0].gHoldingId);
      this.getCompanyListByHoldingId(this.holdingList[0].gHoldingId) 
    });
  }

  addUpdateVehicletran() {
    this.vehicletranForm.get('createdBy').setValue(Number(sessionStorage.getItem('userId')));
    this.vehicletranForm.get('created').setValue(new Date());
    this.vehicletranForm.get('updatedBy').setValue(Number(sessionStorage.getItem('userId')));
    this.vehicletranForm.get('updated').setValue(new Date());
    this.vehicletranForm.get('gCompanyId').setValue(Number(this.vehicletranForm.value.gCompanyId));
    
    this.vehicletranForm.get('lvehiowner').setValue(Number(this.vehicletranForm.value.lvehiowner));
    this.vehicletranForm.get('vehiinsucomp').setValue(Number(this.vehicletranForm.value.vehiinsucomp));
    this.vehicletranForm.get('xEmployeeId').setValue(Number(this.vehicletranForm.value.xEmployeeId));
    if (this.vehicletranForm.value.xEmpvehicleId){this.vehicletranForm.get('xEmpvehicleId').setValue(Number(this.vehicletranForm.value.xEmpvehicleId));}
    else {
    this.vehicletranForm.get('xEmpvehicleId').setValue(undefined);}
    
    this.vehicletranForm.get('G_APPROVALREQ_ID').setValue(Number(this.vehicletranForm.value.G_APPROVALREQ_ID));


    this.vehicletranForm.value.status == "ACTIVE" ? this.vehicletranForm.get('isActive').setValue('Y') : this.vehicletranForm.get('isActive').setValue('N');
    
    this.submitted = true;
    if (this.vehicletranForm.invalid) {
      return;
    } else {
      this.vehicletranService.addUpdateVehicletran(this.vehicletranForm.value).subscribe(success=>{
        var s: any = success;
        if(s.code==0){
          this.toastService.showToast('danger', s.message);
        } else{
        this.toastService.showToast('success', s.message);
        this.back();}
      });
    }
  }

  back() {
    // if (this.parentUrl) {
    //   this.router.navigate([this.parentUrl]);
    // } else {
    this.router.navigate(["/views/masters/vehicle/vehicletran-summary"]);
    // }
  }

  selectcompany(id)
  {
    this.getEmpList(id);
  }

}
