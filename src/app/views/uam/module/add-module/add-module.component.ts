import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'src/app/views/services/toastr.service';
import { CommonService } from 'src/app/views/services/common.service';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { AngularMyDatePickerDirective, IMyDateModel } from 'angular-mydatepicker';
import { ModuleService } from '../module.service';

@Component({
  selector: 'app-add-module',
  templateUrl: './add-module.component.html',
  styleUrls: ['./add-module.component.scss']
})
export class AddModuleComponent implements OnInit {
  moduleForm:any;
  submitted = false;
  isView:boolean=false;
  statusList:any=[ {valueCode:'ACTIVE', valueName:'Active'}, {valueCode:'INACTIVE', valueName:'Inactive'} ];
  moduleGroupList=[
    {valueCode:'Admin Settings', valueName:'Admin Settings'},
    {valueCode:'Approvals', valueName:'Approvals'},
    {valueCode:'Asset', valueName:'Asset'}, 
    {valueCode:'Company Master', valueName:'Company Master'}, 
    {valueCode:'Profile', valueName:'Profile'},
    {valueCode:'Employee Master', valueName:'Employee Master'},
    {valueCode:'Job Management', valueName:'Job Management'}, 
    {valueCode:'Loan Management', valueName:'Loan Management'},
    {valueCode:'Leave Management', valueName:'Leave Management'},
    {valueCode:'Payroll', valueName:'Payroll'},
    {valueCode:'Report', valueName:'Report'},
    {valueCode:'Shift Management', valueName:'Shift Management'},
    {valueCode:'Transactions', valueName:'Transactions'},
    {valueCode:'Request', valueName:'Request'}
  ]

  public myDatePickerOptions = this.commonService.datepickerFormat;
  @ViewChild('dp1', {static: false}) myDp1: AngularMyDatePickerDirective;
  @ViewChild('dp2', {static: false}) myDp2: AngularMyDatePickerDirective;
  
  constructor(private router:Router,private toastService:ToastrService,private cdr: ChangeDetectorRef,private activatedRoute:ActivatedRoute,private commonService:CommonService,private moduleService:ModuleService,private formBuilder: FormBuilder,) {
    this.moduleForm = new FormGroup({
      moduleId: new FormControl(null),
      moduleCode: new FormControl(null,[Validators.required]),
      moduleName: new FormControl(null,[Validators.required]),
      moduleDesc: new FormControl(null),
      moduleUrl: new FormControl(null,[Validators.required]),
      moduleGroup: new FormControl(null,[Validators.required]),
      startDate: new FormControl(null,[Validators.required]),
      endDate: new FormControl(null),
      startDate1: new FormControl(null),
      endDate1: new FormControl(null),
      status: new FormControl(null,[Validators.required]),
      createdBy: new FormControl(null,[Validators.required]),
      creationDate: new FormControl(null,[Validators.required]),
      lastUpdatedBy: new FormControl(null,[Validators.required]),
      lastUpdateDate: new FormControl(null,[Validators.required]),
      lastUpdateLogin: new FormControl(null,[Validators.required])
    });

    this.activatedRoute.queryParams.subscribe(params => {
      this.moduleForm.controls['moduleId'].setValue(params.id);
      this.isView = params.view;
    });

   }

   get f() { return this.moduleForm.controls; }

  ngOnInit() {
    if(this.moduleForm.value.moduleId){
     
      this.moduleService.getModuleById(this.moduleForm.value.moduleId).subscribe(success=>{
        var s:any=success;
        this.moduleForm.patchValue(s.data);
        let startDate: Date = new Date(s.data.startDate);
        let fromModel: IMyDateModel = {isRange: false, singleDate: {jsDate: startDate}, dateRange: null};
        this.moduleForm.controls['startDate1'].setValue(fromModel);
        
        let endDate: Date = new Date(s.data.endDate);
        let toModel: IMyDateModel = {isRange: false, singleDate: {jsDate: endDate}, dateRange: null};
        this.moduleForm.controls['endDate1'].setValue(toModel);
        if(this.isView){ this.moduleForm.disable(); }
      });
    } else{
        let startDate: Date = new Date();
        let fromModel: IMyDateModel = {isRange: false, singleDate: {jsDate: startDate}, dateRange: null};
        this.moduleForm.controls['startDate1'].setValue(fromModel);
        
        let endDate: Date = new Date();
        let toModel: IMyDateModel = {isRange: false, singleDate: {jsDate: endDate}, dateRange: null};
        this.moduleForm.controls['endDate1'].setValue(toModel);
    }
  }

  toggleCalendar(): void {
    this.cdr.detectChanges();
    this.myDp1.toggleCalendar();
  }
  changeStartDate(event){
    this.moduleForm.get('startDate').setValue(event.singleDate.jsDate);
  }
  changeEndDate(event){
    this.moduleForm.get('endDate').setValue(event.singleDate.jsDate);
  }

  addModule(){
    if(this.moduleForm.value.startDate==null){
      this.moduleForm.get('startDate').setValue(this.moduleForm.value.startDate1.singleDate.jsDate);
    }
    if(this.moduleForm.value.endDate==null){
      this.moduleForm.get('endDate').setValue(this.moduleForm.value.endDate1.singleDate.jsDate);
    }
    this.moduleForm.value.moduleId ? this.moduleForm.controls['moduleId'].setValue(Number(this.moduleForm.value.moduleId)):this.moduleForm.controls['moduleId'].setValue(undefined);

    this.moduleForm.get('createdBy').setValue(1);
    this.moduleForm.get('creationDate').setValue(new Date());
    this.moduleForm.get('lastUpdatedBy').setValue(1);
    this.moduleForm.get('lastUpdateDate').setValue(new Date());
    this.moduleForm.get('lastUpdateLogin').setValue(1);
    this.submitted = true;
    if (this.moduleForm.invalid) {
      return;
    } else{
      this.moduleService.saveModule(this.moduleForm.value).subscribe(s=>{
        var success:any = s;
        if(success.code==0){
          this.toastService.showToast('danger', success.message);
        } else{
        this.submitted = true;
        this.toastService.showToast('success',success.message);
        this.back();}
     });
    }
  }

  back(){
    this.router.navigate(['views/module/module-summary']);
  }

}
