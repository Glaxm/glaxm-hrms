import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'src/app/views/services/toastr.service';
import { UomService } from '../uom.service';

@Component({
  selector: 'app-add-uom',
  templateUrl: './add-uom.component.html',
  styleUrls: ['./add-uom.component.scss']
})
export class AddUomComponent implements OnInit {

  uomForm: any;
  submitted = false;

  isView: boolean = false;
  holdingList: any = [];
  companyList:any=[];
  parentUrl: any;
  statusList: any = [{ valueCode: 'ACTIVE', valueName: 'Active' }, { valueCode: 'INACTIVE', valueName: 'Inactive' }]

  constructor(private toastService: ToastrService, private activatedRoute: ActivatedRoute, 
    private uomService: UomService, private router: Router) {
    this.uomForm = new FormGroup({
      xunitmeasureId: new FormControl(null),
      //xunitmeasureId: new FormControl(null),
      gCompanyId: new FormControl(null),
     // g_COMPANY: new FormControl(null),
      gHoldingId: new FormControl(null),
     // g_HOLDING: new FormControl(null),
      isActive: new FormControl(null),
      status: new FormControl(null),
     // companyId: new FormControl(null),
      created: new FormControl(null),
      createdBy: new FormControl(null),
      updated: new FormControl(null),
      updatedBy: new FormControl(null),
      description: new FormControl(null),
      code: new FormControl(null),
      uomName: new FormControl(null),
      uomSymbol:new FormControl(null)

    })
    ;

    this.activatedRoute.queryParams.subscribe(params => {
      this.uomForm.controls['xunitmeasureId'].setValue(params.id);
      this.isView = params.view;
      this.parentUrl = params.parentUrl;
    });

  }

  get f() { return this.uomForm.controls; }

  ngOnInit() {
    this.uomService.getAllHolding().subscribe(success => {
      this.holdingList = success;
      this.uomForm.controls['gHoldingId'].setValue(this.holdingList[0].gHoldingId);
      this.selectHolding(this.holdingList[0].gHoldingId)

    });

    if (this.uomForm.value.xunitmeasureId) {
      this.uomService.getUomById(this.uomForm.value.xunitmeasureId).subscribe(success => {
        var s: any = success;
        this.uomForm.patchValue(s.data);
        s.data.isActive == 'Y' ? this.uomForm.get('status').setValue("ACTIVE") : this.uomForm.get('status').setValue("INACTIVE");
        if (this.isView) { this.uomForm.disable(); }
      });
    } else{
      this.uomForm.controls['status'].setValue("ACTIVE");
    }
  }

  selectHolding(gHoldingId){
    this.uomService.getCompanyById(gHoldingId).subscribe(success=>{
        this.companyList = success;
        
    });
  }

  addUpdateUom() {

    this.uomForm.get('createdBy').setValue(Number(sessionStorage.getItem('userId')));
    this.uomForm.get('created').setValue(new Date());
    this.uomForm.get('updatedBy').setValue(Number(sessionStorage.getItem('userId')));
    this.uomForm.get('updated').setValue(new Date());
    this.uomForm.value.status=="ACTIVE" ? this.uomForm.get('isActive').setValue('Y') : this.uomForm.get('isActive').setValue('N');
    this.uomForm.controls['gCompanyId'].setValue(Number(this.uomForm.value.gCompanyId));
      

    this.submitted = true;
    if (this.uomForm.invalid) {
      return;
    } else {

      this.uomService.addUpdateUom(this.uomForm.value).subscribe(success => {
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
    if (this.parentUrl) {
      this.router.navigate([this.parentUrl]);
    } else {
      this.router.navigate(["/views/masters/uom/uom-summary"]);
    }

  }


}
