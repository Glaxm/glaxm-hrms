import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService } from 'src/app/views/services/common.service';
import { ToastrService } from 'src/app/views/services/toastr.service';
import { AssetgroupService } from '../assetgroup.service';

@Component({
  selector: 'app-add-assetgroup',
  templateUrl: './add-assetgroup.component.html',
  styleUrls: ['./add-assetgroup.component.scss']
})
export class AddAssetgroupComponent implements OnInit {

  assetgroupForm: FormGroup;
  submitted = false;
  isView: boolean = false;
  holdingList: any = [];
  companyList: any = [];
  public myDatePickerOptions = this.commonService.datepickerFormat;
  statusList: any = [{ valueCode: 'ACTIVE', valueName: 'Active' }, { valueCode: 'INACTIVE', valueName: 'Inactive' }]
  constructor(private commonService:CommonService,private toastService: ToastrService, private activatedRoute: ActivatedRoute, private assetgroupService:AssetgroupService, private router: Router) {
    this.assetgroupForm = new FormGroup({
      assetgroupId: new FormControl(null),
      X_ASSET_GROUP_ID: new FormControl(null),
      companyId: new FormControl(null, [Validators.required]),
      holdingId: new FormControl(null, [Validators.required]),
      isActive: new FormControl(null),
      status: new FormControl(null),
      created: new FormControl(null),
      createdBy: new FormControl(null),
      updated: new FormControl(null),
      updatedBy: new FormControl(null),
      description: new FormControl(null),
      code: new FormControl(null),
      name: new FormControl(null, [Validators.required])
    });

    this.activatedRoute.queryParams.subscribe(params => {
      this.assetgroupForm.controls['assetgroupId'].setValue(params.id);
      this.isView = params.view;
     // this.parentUrl = params.parentUrl;
    });
  }

  ngOnInit() {
    this.getHoldingList();
   // this.getDeptList();
    if (this.assetgroupForm.value.assetgroupId) {
      this.assetgroupService.getAssetgroupById(this.assetgroupForm.value.assetgroupId).subscribe(success => {
        var s: any = success;
        this.assetgroupForm.patchValue(s.data);
        // this.getCompanyListByHoldingId(s.data.holdingId);
        s.data.isActive == 'Y' ? this.assetgroupForm.get('status').setValue("ACTIVE") : this.assetgroupForm.get('status').setValue("INACTIVE");
        if (this.isView) { this.assetgroupForm.disable(); }
      });
    } else{
      this.assetgroupForm.get('status').setValue("ACTIVE");
    }
  }

  changeloanDate(event){

  }

  get f() { return this.assetgroupForm.controls; }

 
  getCompanyListByHoldingId(holdinId) {

    this.assetgroupService.getCompanyListByHoldingId(holdinId).subscribe(s => {
      this.companyList = s;
    
    });
  }

  getHoldingList() {
    this.assetgroupService.getHoldingList().subscribe(s => {
      this.holdingList = s;
      this.assetgroupForm.get('holdingId').setValue(this.holdingList[0].gHoldingId);
      this.getCompanyListByHoldingId(this.holdingList[0].gHoldingId) 
    });
  }

  addUpdateAirSector() {
    this.assetgroupForm.get('createdBy').setValue(Number(sessionStorage.getItem('userId')));
    this.assetgroupForm.get('created').setValue(new Date());
    this.assetgroupForm.get('updated').setValue(new Date());
    this.assetgroupForm.get('updatedBy').setValue(Number(sessionStorage.getItem('userId')));
    this.assetgroupForm.get('updatedBy').setValue(Number(sessionStorage.getItem('userId')));
    this.assetgroupForm.get('companyId').setValue(Number(this.assetgroupForm.value.companyId));
    this.assetgroupForm.value.status == "ACTIVE" ? this.assetgroupForm.get('isActive').setValue('Y') : this.assetgroupForm.get('isActive').setValue('N');
    this.assetgroupForm.value.assetgroupId  ? this.assetgroupForm.get('X_ASSET_GROUP_ID').setValue(Number(this.assetgroupForm.value.assetgroupId)) : this.assetgroupForm.get('X_ASSET_GROUP_ID').setValue(undefined);
    
    this.submitted = true;
    if (this.assetgroupForm.invalid) {
      return;
    } else {
      this.assetgroupService.addUpdateAssetgroup(this.assetgroupForm.value).subscribe(success=>{
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
    this.router.navigate(["/views/masters/assetgroup/assetgroup-summary"]);
    // }
  }


}
