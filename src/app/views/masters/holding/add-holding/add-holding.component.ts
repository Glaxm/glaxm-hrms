import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HoldingService } from '../holding.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'src/app/views/services/toastr.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-add-holding',
  templateUrl: './add-holding.component.html',
  styleUrls: ['./add-holding.component.scss']
})
export class AddHoldingComponent implements OnInit {
  
  holdingForm:any;
  submitted = false;
  companyList:any=[];
  isView:boolean=false;
  statusList: any = [{ valueCode: 'ACTIVE', valueName: 'Active' }, { valueCode: 'INACTIVE', valueName: 'Inactive' }]

  constructor(private holdingService:HoldingService, private toastService:ToastrService,private router:Router, private activeRoute:ActivatedRoute) {
    this.holdingForm = new FormGroup({
      gCompanyId: new FormControl(null),
      gHoldingId: new FormControl(null),
      isActive: new FormControl(null),
      status: new FormControl(null),
      value: new FormControl(null,[Validators.required]),
      created: new FormControl(null,[Validators.required]),
      createdBy: new FormControl(null,[Validators.required]),
      updated: new FormControl(null,[Validators.required]),
      updatedBy: new FormControl(null,[Validators.required]),
      description: new FormControl(null),
      code: new FormControl(null),
      name:new FormControl(null,[Validators.required]),
      file:new FormControl(null),
      logo: new FormControl(null),
      logopath: new FormControl(null)
    });

    this.activeRoute.queryParams.subscribe(params => {
      this.holdingForm.controls['gHoldingId'].setValue(params.id);
      this.isView = params.view;
    });
   }
  
   get f() { return this.holdingForm.controls; }
  
   ngOnInit() {
    if(this.holdingForm.value.gHoldingId==0 || this.holdingForm.value.gHoldingId){
        this.holdingService.getHoldingById(this.holdingForm.value.gHoldingId).subscribe(success=>{
          var data:any = success; 
          this.holdingForm.patchValue(data.data);
          data.data.isActive=='Y' ? this.holdingForm.get('status').setValue("ACTIVE") : this.holdingForm.get('status').setValue("INACTIVE");
         
          this.filePath = data.data.logopath;
          if (data.data.logo) {
            this.onFileChange1(data.data.logo);
          }
         
          if(this.isView){ this.holdingForm.disable(); }
        });
    } else{
      this.holdingForm.get('status').setValue("ACTIVE");
    }
    
  }

  addUpdateHolding(){
      this.holdingForm.get('createdBy').setValue(Number(sessionStorage.getItem('userId')));
      this.holdingForm.get('created').setValue(new Date());
      this.holdingForm.get('updatedBy').setValue(Number(sessionStorage.getItem('userId')));
      this.holdingForm.get('gCompanyId').setValue(null);
      this.holdingForm.get('updated').setValue(new Date());
      this.holdingForm.value.status=="ACTIVE" ? this.holdingForm.get('isActive').setValue('Y'):this.holdingForm.get('isActive').setValue('N');
      
      this.submitted = true;
      if (this.holdingForm.invalid) {
        return;
      } else{
        this.holdingService.addUpdateHolding(this.holdingForm.value).subscribe(success=>{
          var s:any = success;
          if(s.code==0){
            this.toastService.showToast('danger', s.message);
          } else{
        this.toastService.showToast('success',s.message);
        this.holdingForm.value.file && this.filePath==null ? this.uploadAttachment(s.data.gHoldingId) : this.back();  
      }
        });
      }

    }

  back(){
    this.router.navigate(["/views/masters/holding/holding-summary"]);
  }

  changeCompany(company){
    if(this.companyList.length==0){
      this.router.navigate(['views/masters/company/add-edit-company'],{ queryParams: {parentUrl:this.router.url}});
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
    this.holdingForm.get('file').setValue(files.item(0));

  }

  onFileChange1(files: FileList) {
    console.log("====" + JSON.stringify(files))
    this.labelImport.nativeElement.innerText = files;
    this.holdingForm.get('file').setValue(files);

  }

  openAttachment() {
    if (this.filePath) {
      window.open(environment.IMG_URL + this.filePath);
    }
  }

  uploadAttachment(gHoldingId){
    const formData = new FormData();
    formData.append('file', this.holdingForm.value.file);
    this.holdingService.fileUpload(gHoldingId, formData).subscribe(s => {
      var success: any = s;
      if(success.code==1){
        this.toastService.showToast('danger', success.message);
      }
      this.back();
      console.log('success', success.message);
    });

  }


}
