import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'src/app/views/services/toastr.service';
import { CountryService } from '../country-service/country.service';

@Component({
  selector: 'app-add-update-country',
  templateUrl: './add-update-country.component.html',
  styleUrls: ['./add-update-country.component.scss']
})
export class AddUpdateCountryComponent implements OnInit {

  countryForm: FormGroup;
  submitted = false;
  isView: boolean = false;
  holdingList: any = [];
  companyList: any = [];

  statusList: any = [{ valueCode: 'ACTIVE', valueName: 'Active' }, { valueCode: 'INACTIVE', valueName: 'Inactive' }]
  
  constructor(private toastService: ToastrService, private activatedRoute: ActivatedRoute, private countryService: CountryService, private router: Router) {
    this.countryForm = new FormGroup({
        xflycountryId: new FormControl(null),
        gHoldingId:  new FormControl(null),
        gCompanyId: new FormControl(null,[Validators.required]),
        isActive: new FormControl(null),
        status: new FormControl(null),
        created: new FormControl(null),
        createdBy: new FormControl(null),
        updated: new FormControl(null),
        updatedBy: new FormControl(null),
        countryName: new FormControl(null,[Validators.required]),
        code: new FormControl(null),
        desc: new FormControl(null),
        ticketAmount: new FormControl(null)
     });

    this.activatedRoute.queryParams.subscribe(params => {
      this.countryForm.controls['xflycountryId'].setValue(params.id);
      this.isView = params.view;
    });
  }

  ngOnInit() {
    this.getHoldingList();
    if (this.countryForm.value.xflycountryId) {
      this.countryService.getCountryById(this.countryForm.value.xflycountryId).subscribe(success => {
        var s: any = success;
        this.countryForm.patchValue(s.data);
        this.getCompanyListByHoldingId(s.data.gHoldingId);
        s.data.isActive == 'Y' ? this.countryForm.get('status').setValue("ACTIVE") : this.countryForm.get('status').setValue("INACTIVE");
        if (this.isView) { this.countryForm.disable(); }
      });
    } else{
      this.countryForm.get('status').setValue("ACTIVE");
    }
  }

  get f() { return this.countryForm.controls; }

  getCompanyListByHoldingId(holdinId) {
    this.countryService.getCompanyListByHoldingId(holdinId).subscribe(s => {
      this.companyList = s;
    });
  }

  getHoldingList() {
    this.countryService.getHoldingList().subscribe(s => {
      this.holdingList = s;
      if(this.holdingList){
        this.countryForm.get('gHoldingId').setValue(this.holdingList[0].gHoldingId);
        this.getCompanyListByHoldingId(this.holdingList[0].gHoldingId);
      }
    });
  }

  addUpdateCountry() {
    this.countryForm.get('createdBy').setValue(Number(sessionStorage.getItem('userId')));
    this.countryForm.get('created').setValue(new Date());
    this.countryForm.get('updatedBy').setValue(Number(sessionStorage.getItem('userId')));
    this.countryForm.get('updated').setValue(new Date());
    this.countryForm.controls['gCompanyId'].setValue((typeof this.countryForm.value.gCompanyId=='string' ? Number(this.countryForm.value.gCompanyId) : this.countryForm.value.gCompanyId));
    if(this.countryForm.value.ticketAmount==null) {
      this.countryForm.get('ticketAmount').setValue(0);
     }
    this.countryForm.value.status == "ACTIVE" ? this.countryForm.get('isActive').setValue('Y') : this.countryForm.get('isActive').setValue('N');
    
    this.submitted = true;
    if (this.countryForm.invalid) {
      return;
    } else {
      this.countryService.addUpdateCountry(this.countryForm.value).subscribe(success=>{
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
    this.router.navigate(["/views/masters/country/country-summary"]);
  }


}
