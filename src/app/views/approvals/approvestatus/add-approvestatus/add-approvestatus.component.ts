import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService } from 'src/app/views/services/common.service';
import { ToastrService } from 'src/app/views/services/toastr.service';
import { ApprovestatusService } from '../approvestatus.service';

@Component({
  selector: 'app-add-approvestatus',
  templateUrl: './add-approvestatus.component.html',
  styleUrls: ['./add-approvestatus.component.scss']
})
export class AddApprovestatusComponent implements OnInit {

  approvestatusForm: FormGroup;
  submitted = false;
  isView: boolean = false;
  holdingList: any = [];
  companyList: any = [];
  approvalList: any = [];
  public myDatePickerOptions = this.commonService.datepickerFormat;

  // deptList:any=[];
  statusList: any = [{ valueCode: 'ACTIVE', valueName: 'Active' }, { valueCode: 'INACTIVE', valueName: 'Inactive' }]
  constructor(private commonService:CommonService,private toastService: ToastrService, private activatedRoute: ActivatedRoute, private approvestatusService:ApprovestatusService, private router: Router) {
    this.approvestatusForm = new FormGroup({
      empapprovestatusId: new FormControl(null),
      companyId: new FormControl(0, [Validators.required]),
      holdingId: new FormControl(0, [Validators.required]),
      isActive: new FormControl(null),
      status: new FormControl(null),
      created: new FormControl(null),
      createdBy: new FormControl(0),
      updated: new FormControl(null),
      updatedBy: new FormControl(0),
      description: new FormControl(null),

     // G_APPROVALSTATUS_ID: new FormControl(null),
      G_APPROVALREQ_ID: new FormControl(0),
      G_APPROVALLEVEL_ID: new FormControl(0),
      APPROVER_ID: new FormControl(0),

      DATESTATUS: new FormControl(null),
      APPROVALSTATUS: new FormControl(null),
      REMARKS : new FormControl(null),

      code: new FormControl(null),
      name: new FormControl(null, [Validators.required])
    });

    this.activatedRoute.queryParams.subscribe(params => {
      this.approvestatusForm.controls['empapprovestatusId'].setValue(params.id);
      this.isView = params.view;
     // this.parentUrl = params.parentUrl;
    });
  }

  ngOnInit() {
    this.getHoldingList();
   // this.getDeptList();
    if (this.approvestatusForm.value.empapprovestatusId) {
      this.approvestatusService.getapprovestatusById(this.approvestatusForm.value.empapprovestatusId).subscribe(success => {
        var s: any = success;
        this.approvestatusForm.patchValue(s.data);
        this.getCompanyListByHoldingId(s.data.holdingId);
        s.data.isActive == 'Y' ? this.approvestatusForm.get('status').setValue("ACTIVE") : this.approvestatusForm.get('status').setValue("INACTIVE");
        if (this.isView) { this.approvestatusForm.disable(); }
      });
    } else{
      this.approvestatusForm.get('status').setValue("ACTIVE");
    }
  }

  get pi() { return this.approvestatusForm.controls; }

  changeEffectiveDate(event){}
  getCompanyListByHoldingId(holdinId) {

    this.approvestatusService.getCompanyListByHoldingId(holdinId).subscribe(s => {
      this.companyList = s;
    });
  }

  getHoldingList() {
    this.approvestatusService.getHoldingList().subscribe(s => {
      this.holdingList = s;
      this.approvestatusForm.get('holdingId').setValue(this.holdingList[0].gHoldingId);
      this.getCompanyListByHoldingId(this.holdingList[0].gHoldingId) 
    });
  }

  addUpdateAirSector() {
    this.approvestatusForm.get('createdBy').setValue(Number(sessionStorage.getItem('userId')));
    this.approvestatusForm.get('created').setValue(new Date());
    this.approvestatusForm.get('updatedBy').setValue(Number(sessionStorage.getItem('userId')));
    this.approvestatusForm.get('updated').setValue(new Date());
    this.approvestatusForm.get('gCompanyId').setValue(Number(this.approvestatusForm.value.gCompanyId));


    this.approvestatusForm.value.status == "ACTIVE" ? this.approvestatusForm.get('isActive').setValue('Y') : this.approvestatusForm.get('isActive').setValue('N');
    
    this.submitted = true;
    if (this.approvestatusForm.invalid) {
      return;
    } else {
      this.approvestatusService.addUpdateapprovestatus(this.approvestatusForm.value).subscribe(success=>{
        var s: any = success;
        this.toastService.showToast('success', s.message);
        this.back();
      });
    }
  }

  back() {
    // if (this.parentUrl) {
    //   this.router.navigate([this.parentUrl]);
    // } else {
    this.router.navigate(["/views/approval-flow/approvalstatus/approvestatus-summary"]);
    // }
  }


}
