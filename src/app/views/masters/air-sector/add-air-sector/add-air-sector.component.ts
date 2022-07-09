import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'src/app/views/services/toastr.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AirSectorService } from '../air-sector.service';

@Component({
  selector: 'app-add-air-sector',
  templateUrl: './add-air-sector.component.html',
  styleUrls: ['./add-air-sector.component.scss']
})
export class AddAirSectorComponent implements OnInit {

 
  airSectorForm: FormGroup;
  submitted = false;
  isView: boolean = false;
  holdingList: any = [];
  countryList: any = [];
  cityList: any = [];
  companyList: any = [];
  // deptList:any=[];
  statusList: any = [{ valueCode: 'ACTIVE', valueName: 'Active' }, { valueCode: 'INACTIVE', valueName: 'Inactive' }]
  constructor(private toastService: ToastrService, private activatedRoute: ActivatedRoute, private airSectorService: AirSectorService, private router: Router) {
    this.airSectorForm = new FormGroup({
      airsectorId: new FormControl(null),
      companyId: new FormControl(null),
      ticketAmount: new FormControl(null),
      holdingId: new FormControl(null, [Validators.required]),
      isActive: new FormControl(null),
      status: new FormControl(null),
      created: new FormControl(null),
      createdBy: new FormControl(null),
      updated: new FormControl(null),
      updatedBy: new FormControl(null),
      description: new FormControl(null),
      code: new FormControl(null),
      country: new FormControl(null),
      city: new FormControl(null),
      name: new FormControl(null, [Validators.required])
    });

    this.activatedRoute.queryParams.subscribe(params => {
      this.airSectorForm.controls['airsectorId'].setValue(params.id);
      this.isView = params.view;
     // this.parentUrl = params.parentUrl;
    });
  }

  ngOnInit() {
    this.getHoldingList();
   // this.getDeptList();
    if (this.airSectorForm.value.airsectorId) {
      this.airSectorService.getAirSectorById(this.airSectorForm.value.airsectorId).subscribe(success => {
        var s: any = success;
        this.airSectorForm.patchValue(s.data);
        this.getCompanyListByHoldingId(s.data.holdingId);

        s.data.isActive == 'Y' ? this.airSectorForm.get('status').setValue("ACTIVE") : this.airSectorForm.get('status').setValue("INACTIVE");
        if (this.isView) { this.airSectorForm.disable(); }
      });
    } else{
      this.airSectorForm.get('status').setValue("ACTIVE");
    }
  }

  get f() { return this.airSectorForm.controls; }

 
  getCompanyListByHoldingId(holdinId) {

    this.airSectorService.getCompanyListByHoldingId(holdinId).subscribe(s => {
      this.companyList = s;
     
    });
  }

  // getDeptList(){
  //   this.airSectorService.getAllDept().subscribe(s=>{
  //     this.deptList=s;
  //   });
  // }

  getHoldingList() {
    this.airSectorService.getHoldingList().subscribe(s => {
      this.holdingList = s;
      this.airSectorForm.get('holdingId').setValue(this.holdingList[0].gHoldingId);
      this.getCompanyListByHoldingId(this.holdingList[0].gHoldingId) 
    });
  }

  addUpdateAirSector() {
    this.airSectorForm.get('createdBy').setValue(Number(sessionStorage.getItem('userId')));
    this.airSectorForm.get('created').setValue(new Date());
    this.airSectorForm.get('updatedBy').setValue(Number(sessionStorage.getItem('userId')));
    this.airSectorForm.get('updated').setValue(new Date());
    this.airSectorForm.controls['companyId'].setValue(null);
    this.airSectorForm.value.status == "ACTIVE" ? this.airSectorForm.get('isActive').setValue('Y') : this.airSectorForm.get('isActive').setValue('N');
    
    this.submitted = true;
    if (this.airSectorForm.invalid) {
      return;
    } else {
      this.airSectorService.addUpdateAirSector(this.airSectorForm.value).subscribe(success=>{
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
    this.router.navigate(["/views/masters/air-sector/airsector-summary"]);
    // }
  }

}
