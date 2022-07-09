
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CompanyService } from '../company.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DepatmentService } from '../../department/depatment.service';
import { ToastrService } from 'src/app/views/services/toastr.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-add-company',
  templateUrl: './add-company.component.html',
  styleUrls: ['./add-company.component.scss']
})
export class AddCompanyComponent implements OnInit {
  companyForm: any;
  submitted = false;

  isView: boolean = false;
  holdingList: any = [];
  parentUrl: any;
  statusList: any = [{ valueCode: 'ACTIVE', valueName: 'Active' }, { valueCode: 'INACTIVE', valueName: 'Inactive' }]

  constructor(private toastService: ToastrService, private activatedRoute: ActivatedRoute, private companyService: CompanyService, private router: Router) {
    this.companyForm = new FormGroup({
      companyId: new FormControl(null),
      holdingId: new FormControl(null, [Validators.required]),
      isActive: new FormControl(null, [Validators.required]),
      status: new FormControl(null),
      value: new FormControl(null, [Validators.required]),
      created: new FormControl(null, [Validators.required]),
      createdBy: new FormControl(null, [Validators.required]),
      updated: new FormControl(null, [Validators.required]),
      updatedBy: new FormControl(null, [Validators.required]),
      companyDisc: new FormControl(null),
      companyName: new FormControl(null, [Validators.required]),
      phoneNo: new FormControl(null),
      address: new FormControl(null),
      email: new FormControl(null),
      website: new FormControl(null),
      faxno: new FormControl(null),
      tradeLicAttach: new FormControl(null),
      poBoxNo: new FormControl(null),
      vatRegNo: new FormControl(null),
      logo: new FormControl(null),
      logopath: new FormControl(null),
      molCard: new FormControl(null),
      code: new FormControl(null),
      weeklyshiftRotation: new FormControl(null),
      weeklyshiftRotation1: new FormControl(null),
      punchmissTrigger: new FormControl(null),
      punchmissTrigger1: new FormControl(null),
      file:new FormControl(null)
    });

    this.activatedRoute.queryParams.subscribe(params => {
      this.companyForm.controls['companyId'].setValue(params.id);
      this.isView = params.view;
      this.parentUrl = params.parentUrl;
    });

  }

  get f() { return this.companyForm.controls; }

  ngOnInit() {
    this.companyService.getAllHolding().subscribe(success => {
      this.holdingList = success;
    });

    if (this.companyForm.value.companyId) {
      this.companyService.getCompanyById(this.companyForm.value.companyId).subscribe(success => {
        var s: any = success;
        this.companyForm.patchValue(s.data);
        this.filePath = s.data.logopath;

        s.data.isActive == 'Y' ? this.companyForm.get('status').setValue('ACTIVE') : this.companyForm.get('status').setValue('INACTIVE');
        s.data.weeklyshiftRotation=='Y' ?  this.companyForm.get('weeklyshiftRotation1').setValue(true) :this.companyForm.get('weeklyshiftRotation1').setValue(false);
        
        s.data.punchmissTrigger=='Y' ?  this.companyForm.get('punchmissTrigger1').setValue(true) :this.companyForm.get('punchmissTrigger1').setValue(false);
        if (s.data.logo) {
          this.onFileChange1(s.data.logo);
        }


        if (this.isView) { this.companyForm.disable(); }
      });
    } else{
      this.companyForm.get('status').setValue('ACTIVE');
    }
  }

  addUpdateCompany() {
    this.companyForm.value.weeklyshiftRotation1 ?  this.companyForm.get('weeklyshiftRotation').setValue('Y') :this.companyForm.get('weeklyshiftRotation').setValue('N');
    this.companyForm.value.punchmissTrigger1 ?  this.companyForm.get('punchmissTrigger').setValue('Y') :this.companyForm.get('punchmissTrigger').setValue('N');
    this.companyForm.get('createdBy').setValue(Number(sessionStorage.getItem('userId')));
    this.companyForm.get('created').setValue(new Date());
    this.companyForm.get('updatedBy').setValue(Number(sessionStorage.getItem('userId')));
    this.companyForm.get('updated').setValue(new Date());
    this.companyForm.get('holdingId').setValue(Number(this.companyForm.value.holdingId));
    this.companyForm.value.status=='ACTIVE' ? this.companyForm.get('isActive').setValue('Y') : this.companyForm.get('isActive').setValue('N');
    

    this.submitted = true;
   if (this.companyForm.invalid) {
     return;
   } else {

      this.companyService.addUpdateCompany(this.companyForm.value).subscribe(success => {
        var s: any = success;
        if(s.code==0){ 
          this.toastService.showToast('danger', s.message);
        } else{
        this.toastService.showToast('success', s.message);
        this.back();
        
        console.log(this.fileData)
        this.companyForm.value.file && this.filePath==null ? this.uploadAttachment(s.data.companyId) : this.back();
        }
      });
    }
  }

  uploadAttachment(companyId){
    const formData = new FormData();
    formData.append('file', this.companyForm.value.file);
    this.companyService.fileUpload(companyId, formData).subscribe(s => {
      var success: any = s;
      if(success.code==1){
        this.toastService.showToast('danger', success.message);
      }
      this.back();
      console.log('success', success.message);
    });

  }

  back() {
    if (this.parentUrl) {
      this.router.navigate([this.parentUrl]);
    } else {
      this.router.navigate(["/views/masters/company/company-summary"]);
    }

  }

  //=================================  Upload file
  @ViewChild('labelImport', { static: false })
  labelImport: ElementRef;
  fileToUpload: File = null;

  fileData: any;
  filePath: any;
  onFileChange(files: FileList) {
    this.filePath = null;
    console.log("====" + JSON.stringify(files))
    this.labelImport.nativeElement.innerText = Array.from(files)
      .map(f => f.name)
      .join(', ');
    this.fileData = files.item(0);
    this.companyForm.get('file').setValue(files.item(0));

  }

  onFileChange1(files: FileList) {
    console.log("====" + JSON.stringify(files))
    this.labelImport.nativeElement.innerText = files;
    this.companyForm.get('file').setValue(files);

  }

  openAttachment() {
    if (this.filePath) {
      window.open(environment.IMG_URL + this.filePath);
    }
  }
}
