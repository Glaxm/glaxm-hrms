import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularMyDatePickerDirective, IMyDateModel } from 'angular-mydatepicker';
import { CommonService } from 'src/app/views/services/common.service';
import { ToastrService } from 'src/app/views/services/toastr.service';
import { AssetitemService } from '../assetitem.service';

@Component({
  selector: 'app-add-assetitem',
  templateUrl: './add-assetitem.component.html',
  styleUrls: ['./add-assetitem.component.scss']
})
export class AddAssetitemComponent implements OnInit {

  assetitemForm: FormGroup;
  submitted = false;
  isView: boolean = false;
  holdingList: any = [];
  companyList: any = [];
  assetgroupList: any = [];
  assettypeList: any = [];
  
  public myDatePickerOptions = this.commonService.datepickerFormat;
  @ViewChild('dp1', { static: false }) myDp1: AngularMyDatePickerDirective;
  @ViewChild('dp2', { static: false }) myDp2: AngularMyDatePickerDirective;


  statusList: any = [{ valueCode: 'ACTIVE', valueName: 'Active' }, { valueCode: 'INACTIVE', valueName: 'Inactive' }]
  constructor(private cdr: ChangeDetectorRef,private commonService:CommonService,private toastService: ToastrService, private activatedRoute: ActivatedRoute, private assetitemService:AssetitemService, private router: Router) {
    this.assetitemForm = new FormGroup({
      assetitemId: new FormControl(null),
      x_asset_item_id: new FormControl(null),
      amount: new FormControl(null),
      qty: new FormControl(null),
      x_asset_type_id: new FormControl(null),
      x_asset_group_id: new FormControl(null),
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
      name: new FormControl(null, [Validators.required]),
      expiryDt: new FormControl(null),
      expiryDt1: new FormControl(null),
      purchaseDt: new FormControl(null),
      purchaseDt1  : new FormControl(null),
      pur_dt  : new FormControl(null),
      exp_dt  : new FormControl(null)
    });

    this.activatedRoute.queryParams.subscribe(params => {
      this.assetitemForm.controls['assetitemId'].setValue(params.id);
      this.isView = params.view;
     // this.parentUrl = params.parentUrl;
    });
  }

  ngOnInit() {
    this.getHoldingList();
    this.getAllAssetGroup();
    if (this.assetitemForm.value.assetitemId) {
      this.assetitemService.getAssetitemById(this.assetitemForm.value.assetitemId).subscribe(success => {
        var s: any = success;
        this.assetitemForm.patchValue(s.data);
        this.getCompanyListByHoldingId(s.data.holdingId);
        this.getAllAssetTypeByGroup(s.data.x_asset_group_id);
        s.data.isActive == 'Y' ? this.assetitemForm.get('status').setValue("ACTIVE") : this.assetitemForm.get('status').setValue("INACTIVE");
        if(s.data.purchaseDt){
          let startDate: Date = new Date(s.data.purchaseDt);
          let fromModel1: IMyDateModel = { isRange: false, singleDate: { jsDate: startDate }, dateRange: null };
          this.assetitemForm.controls['purchaseDt1'].setValue(fromModel1);
          this.changeStartDate(fromModel1);
        }
        if(s.data.expiryDt){
          let endDate: Date = new Date(s.data.expiryDt);
          let fromModel2: IMyDateModel = { isRange: false, singleDate: { jsDate: endDate }, dateRange: null };
          this.assetitemForm.controls['expiryDt1'].setValue(fromModel2);
          this.changeEndDate(fromModel2);
        }
        

        if (this.isView) { this.assetitemForm.disable(); }
      });
    } else{
      this.assetitemForm.get('status').setValue("ACTIVE");
    }
  }

  changeloanDate(event){

  }


  getAllAssetGroup(){
    this.assetitemService.getAllAssetGroup().subscribe(s => {
      this.assetgroupList = s;
    }); 
  }

  getAllAssetTypeByGroup(id){
    this.assetitemService.getAllAssetType(id).subscribe(s => {
      this.assettypeList = s;
    }); 
    
  }

  get f() { return this.assetitemForm.controls; }

 
  getCompanyListByHoldingId(holdinId) {

    this.assetitemService.getCompanyListByHoldingId(holdinId).subscribe(s => {
      this.companyList = s;
    
    });
  }

  getHoldingList() {
    this.assetitemService.getHoldingList().subscribe(s => {
      this.holdingList = s;
      this.assetitemForm.get('holdingId').setValue(this.holdingList[0].gHoldingId);
      this.getCompanyListByHoldingId(this.holdingList[0].gHoldingId) 
    });
  }

  addUpdateAirSector() {
    this.assetitemForm.get('createdBy').setValue(Number(sessionStorage.getItem('userId')));
    this.assetitemForm.get('created').setValue(new Date());
    this.assetitemForm.get('updatedBy').setValue(Number(sessionStorage.getItem('userId')));
    this.assetitemForm.get('companyId').setValue(Number(this.assetitemForm.value.companyId));
    this.assetitemForm.get('updated').setValue(new Date());
    this.assetitemForm.get('qty').setValue(Number(this.assetitemForm.value.qty));
    this.assetitemForm.get('x_asset_group_id').setValue(Number(this.assetitemForm.value.x_asset_group_id));
    this.assetitemForm.get('x_asset_type_id').setValue(Number(this.assetitemForm.value.x_asset_type_id));
    this.assetitemForm.get('amount').setValue(parseFloat(this.assetitemForm.value.amount));
    this.assetitemForm.value.x_asset_item_id  ? this.assetitemForm.get('x_asset_item_id').setValue(Number(this.assetitemForm.value.x_asset_item_id)) : this.assetitemForm.get('x_asset_item_id').setValue(undefined);
    this.assetitemForm.value.status == "ACTIVE" ? this.assetitemForm.get('isActive').setValue('Y') : this.assetitemForm.get('isActive').setValue('N');
    
    this.submitted = true;
    if (this.assetitemForm.invalid) {
      return;
    } else {
      this.assetitemService.addUpdateAssetitem(this.assetitemForm.value).subscribe(success=>{
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
    this.router.navigate(["/views/masters/assetitem/assetitem-summary"]);
    // }
  }

  
  toggleCalendar(): void {
    this.cdr.detectChanges();
    this.myDp1.toggleCalendar();
  }
  changeStartDate(event) {
     this.assetitemForm.get('purchaseDt').setValue(event.singleDate.jsDate);
     this.assetitemForm.get('pur_dt').setValue(this.commonService.dateFormat(event.singleDate.jsDate));
  }
  changeEndDate(event) {
    this.assetitemForm.get('expiryDt').setValue(event.singleDate.jsDate);
    this.assetitemForm.get('exp_dt').setValue(this.commonService.dateFormat(event.singleDate.jsDate));
  }

  


}
