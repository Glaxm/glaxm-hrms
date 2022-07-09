import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService } from 'src/app/views/services/common.service';
import { ToastrService } from 'src/app/views/services/toastr.service';
import { AssettypeService } from '../assettype.service';

@Component({
  selector: 'app-add-assettype',
  templateUrl: './add-assettype.component.html',
  styleUrls: ['./add-assettype.component.scss']
})
export class AddAssettypeComponent implements OnInit {

  assettypeForm: FormGroup;
  submitted = false;
  isView: boolean = false;
  holdingList: any = [];
  companyList: any = [];
  assetgroupList: any = [];
  public myDatePickerOptions = this.commonService.datepickerFormat;
  statusList: any = [{ valueCode: 'ACTIVE', valueName: 'Active' }, { valueCode: 'INACTIVE', valueName: 'Inactive' }]
  constructor(private commonService:CommonService,private toastService: ToastrService, private activatedRoute: ActivatedRoute, private assettypeService:AssettypeService, private router: Router) {
    this.assettypeForm = new FormGroup({
      assettypeId: new FormControl(null),
      x_asset_gruop_id: new FormControl(null),
      x_asset_type_id: new FormControl(null),
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
      this.assettypeForm.controls['assettypeId'].setValue(params.id);
      this.isView = params.view;
     // this.parentUrl = params.parentUrl;
    });
  }

  ngOnInit() {
    this.getHoldingList();
    this.getAllAssetGroup();
    if (this.assettypeForm.value.assettypeId) {
      this.assettypeService.getAssettypeById(this.assettypeForm.value.assettypeId).subscribe(success => {
        var s: any = success;
        this.assettypeForm.patchValue(s.data);
        this.getCompanyListByHoldingId(s.data.holdingId);
        s.data.isActive == 'Y' ? this.assettypeForm.get('status').setValue("ACTIVE") : this.assettypeForm.get('status').setValue("INACTIVE");
        if (this.isView) { this.assettypeForm.disable(); }
      });
    } else{
      this.assettypeForm.get('status').setValue("ACTIVE");
    }
  }

  changeloanDate(event){

  }

  get f() { return this.assettypeForm.controls; }

 
  getCompanyListByHoldingId(holdinId) {

    this.assettypeService.getCompanyListByHoldingId(holdinId).subscribe(s => {
      this.companyList = s;
    
    });
  }

  getAllAssetGroup(){
    this.assettypeService.getAllAssetGroup().subscribe(s => {
      this.assetgroupList = s;
    }); 
  }

  getHoldingList() {
    this.assettypeService.getHoldingList().subscribe(s => {
      this.holdingList = s;
      this.assettypeForm.get('holdingId').setValue(this.holdingList[0].gHoldingId);
      this.getCompanyListByHoldingId(this.holdingList[0].gHoldingId) 
    });
  }

  addUpdateAirSector() {
    this.assettypeForm.get('createdBy').setValue(Number(sessionStorage.getItem('userId')));
    this.assettypeForm.get('created').setValue(new Date());
    this.assettypeForm.get('updatedBy').setValue(Number(sessionStorage.getItem('userId')));
    this.assettypeForm.get('companyId').setValue(Number(this.assettypeForm.value.companyId));
    this.assettypeForm.get('updated').setValue(new Date());
    this.assettypeForm.value.status == "ACTIVE" ? this.assettypeForm.get('isActive').setValue('Y') : this.assettypeForm.get('isActive').setValue('N');
    this.assettypeForm.get('x_asset_gruop_id').setValue(Number(this.assettypeForm.value.x_asset_gruop_id));
    this.assettypeForm.value.x_asset_type_id ? this.assettypeForm.get('x_asset_type_id').setValue(Number(this.assettypeForm.value.x_asset_type_id)):this.assettypeForm.get('x_asset_type_id').setValue(undefined)
    this.submitted = true;
    if (this.assettypeForm.invalid) {
      return;
    } else {
      this.assettypeService.addUpdateAssettype(this.assettypeForm.value).subscribe(success=>{
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
    this.router.navigate(["/views/masters/assettype/assettype-summary"]);
    // }
  }

}
 