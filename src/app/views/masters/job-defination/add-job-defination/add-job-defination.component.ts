import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'src/app/views/services/toastr.service';
import { JobDefinationService } from '../job-defination.service';

@Component({
  selector: 'app-add-job-defination',
  templateUrl: './add-job-defination.component.html',
  styleUrls: ['./add-job-defination.component.scss']
})
export class AddJobDefinationComponent implements OnInit {

  jobdefinationForm:any;
  submitted = false;

  isView:boolean=false;
  companyList:any=[];
  holdingList:any=[];
  jobfunList:any=[];
  uomList:any=[];
  statusList: any = [{ valueCode: 'ACTIVE', valueName: 'Active' }, { valueCode: 'INACTIVE', valueName: 'Inactive' }]


  constructor(private activatedRoute:ActivatedRoute,private toastService:ToastrService,private router:Router,private jobdefinationService:JobDefinationService) {
    this.jobdefinationForm = new FormGroup({
      jobdefinationId: new FormControl(null),
      //jobdefinationId: new FormControl(null),
      companyId: new FormControl(null),
      g_COMPANY:new FormControl(null),
      holdingId:new FormControl(null),
      g_HOLDING: new FormControl(null),
      isActive: new FormControl(null),
      status: new FormControl(null),
      created: new FormControl(null),
      createdBy: new FormControl(null),
      updated: new FormControl(null),
      updatedBy: new FormControl(null),
      description: new FormControl(null),
      code: new FormControl(null),
      jobfunctionId: new FormControl(null),
      x_JOBFUNCTION: new FormControl(null),
      xunitmeasureId: new FormControl(null),
      x_UNITMEASURE: new FormControl(null),
      stdQnty: new FormControl(null),
      gangTarget: new FormControl(null),
      fixedRate: new FormControl(null),
      dependRate: new FormControl(null),
      rate: new FormControl(null),
      rates:new FormControl(null),
      name:new FormControl(null,[Validators.required])
    });

    this.activatedRoute.queryParams.subscribe(params => {
      this.jobdefinationForm.controls['jobdefinationId'].setValue(params.id);
      this.isView = params.view;
    });

   }

   get f() { return this.jobdefinationForm.controls; }

  ngOnInit() {
    this.getJobfunList();
    this.getUomList();
    this.jobdefinationService.getAllHolding().subscribe(s=>{
     
        this.holdingList = s;
        this.jobdefinationForm.get('holdingId').setValue(this.holdingList[0].gHoldingId);
      this.selectHolding(this.holdingList[0].gHoldingId) 
    });    

    if(this.jobdefinationForm.value.jobdefinationId){
      this.jobdefinationService.getJobdefinationById(this.jobdefinationForm.value.jobdefinationId).subscribe(success=>{
        var s:any = success;
        this.jobdefinationForm.patchValue(s.data);
       this.selectHolding(s.data.holdingId);
        s.data.isActive=='Y' ? this.jobdefinationForm.get('status').setValue('ACTIVE') : this.jobdefinationForm.get('status').setValue('INACTIVE');   
        if(this.isView){ this.jobdefinationForm.disable(); }

        if(s.data.gangTarget=='Y'){
          this.jobdefinationForm.get('rates').setValue("GANGTARGET");
        }
        if(s.data.fixedRate=='Y'){
          this.jobdefinationForm.get('rates').setValue("FIXEDRATE");
        }
        if(s.data.dependRate=='Y'){
          this.jobdefinationForm.get('rates').setValue("BASICDEPENDSRATE");
        }

      });
    }
    else{
      this.jobdefinationForm.get('status').setValue("ACTIVE")
    }
  }

  selectHolding(holdingId){
    this.jobdefinationService.getAllCompaniesByHoldingId(holdingId).subscribe(s=>{
        this.companyList = s;
    });
  }

  getJobfunList() {
    this.jobdefinationService.getJobfunList().subscribe(data => {
      this.jobfunList = data;
    })
  }

  getUomList() {
    this.jobdefinationService.getUomList().subscribe(data => {
      this.uomList = data;
    })
  }

  addUpdateJobdefination(){

    this.jobdefinationForm.get('createdBy').setValue(1);
    this.jobdefinationForm.get('created').setValue(new Date());
    this.jobdefinationForm.get('updatedBy').setValue(1);
    this.jobdefinationForm.get('updated').setValue(new Date());
    this.jobdefinationForm.get('companyId').setValue(Number(this.jobdefinationForm.value.companyId));
    this.jobdefinationForm.value.status=="ACTIVE" ? this.jobdefinationForm.get('isActive').setValue('Y'):this.jobdefinationForm.get('isActive').setValue('N');
    if(this.jobdefinationForm.value.jobdefinationId){
      this.jobdefinationForm.get('jobdefinationId').setValue(Number(this.jobdefinationForm.value.jobdefinationId));
    }else{
      this.jobdefinationForm.get('jobdefinationId').setValue(undefined); 
    }

    this.jobdefinationForm.get('rate').setValue(Number(this.jobdefinationForm.value.rate));

    if(this.jobdefinationForm.value.jobfunctionId){this.jobdefinationForm.get('jobfunctionId').setValue(Number(this.jobdefinationForm.value.jobfunctionId));}
    if(this.jobdefinationForm.value.xunitmeasureId){this.jobdefinationForm.get('xunitmeasureId').setValue(Number(this.jobdefinationForm.value.xunitmeasureId));}

    if(this.jobdefinationForm.value.rates=='GANGTARGET'){
      this.jobdefinationForm.get('gangTarget').setValue("Y");
    } else{
      this.jobdefinationForm.get('gangTarget').setValue("N");
    }
    if(this.jobdefinationForm.value.rates=='FIXEDRATE'){
      this.jobdefinationForm.get('fixedRate').setValue("Y");
    } else{
      this.jobdefinationForm.get('fixedRate').setValue("N");
    }
    if(this.jobdefinationForm.value.rates=='BASICDEPENDSRATE'){
      this.jobdefinationForm.get('dependRate').setValue("Y");
    } else{
      this.jobdefinationForm.get('dependRate').setValue("N");
    }

    this.submitted = true;
    if (this.jobdefinationForm.invalid) {
      return;
    } else{
     
      
      this.jobdefinationService.addUpdateJobdefination(this.jobdefinationForm.value).subscribe(success=>{
        var success1:any = success;
        if(success1.code==0){
          this.toastService.showToast('danger', success1.message);
        } else{
        this.toastService.showToast('success',success1.message);
        this.back();}
      });
    }
  }

  back(){
    this.router.navigate(['/views/masters/job-defination/job-defination-summary']);
  }


}
