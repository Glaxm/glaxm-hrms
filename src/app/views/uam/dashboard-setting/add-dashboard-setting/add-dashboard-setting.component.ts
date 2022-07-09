import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService } from 'src/app/views/services/common.service';
import { ToastrService } from 'src/app/views/services/toastr.service';
import { DashboardSettingService } from '../dashboard-setting.service';

@Component({
  selector: 'app-add-dashboard-setting',
  templateUrl: './add-dashboard-setting.component.html',
  styleUrls: ['./add-dashboard-setting.component.scss']
})
export class AddDashboardSettingComponent implements OnInit {

  dashboardSettingForm:any;
  isView:boolean=false;
  submitted = false;
  statusList:any=[ {valueCode:'ACTIVE', valueName:'Active'}, {valueCode:'INACTIVE', valueName:'Inactive'} ];
  constructor(private router:Router,private toastService:ToastrService,private cdr: ChangeDetectorRef,private activatedRoute:ActivatedRoute,private commonService:CommonService,private dashService:DashboardSettingService) {
    this.dashboardSettingForm = new FormGroup({
      dashboardId: new FormControl(null),
      code: new FormControl(null,[Validators.required]),
      name: new FormControl(null,[Validators.required]),
      desc: new FormControl(null),
      isActive: new FormControl(null),
      status: new FormControl(null),
      createdBy: new FormControl(null,[Validators.required]),
      updateDBy: new FormControl(null,[Validators.required]),
      creationDate: new FormControl(null,[Validators.required]),
      updateDate: new FormControl(null,[Validators.required])
    });

    this.activatedRoute.queryParams.subscribe(params => {
      this.dashboardSettingForm.controls['dashboardId'].setValue(params.id);
      this.isView = params.view;
    });

   }


  ngOnInit() {

    if(this.dashboardSettingForm.value.dashboardId){
      this.dashService.getDashDetailsById(this.dashboardSettingForm.value.dashboardId).subscribe(success=>{
          var data:any = success;
          this.dashboardSettingForm.patchValue(data.data);
          data.data.isActive=="Y" ? this.dashboardSettingForm.controls["status"].setValue('ACTIVE') :this.dashboardSettingForm.controls["status"].setValue('INACTIVE');      
          if(this.isView){ this.dashboardSettingForm.disable(); }
        })
    } else{
      this.dashboardSettingForm.controls['status'].setValue("ACTIVE");
    }

  }

  get f() { return this.dashboardSettingForm.controls; }

  addDashboardSetting(){
    
    this.dashboardSettingForm.value.dashboardId ? this.dashboardSettingForm.controls['dashboardId'].setValue(Number(this.dashboardSettingForm.value.dashboardId)):this.dashboardSettingForm.controls['dashboardId'].setValue(undefined);

    this.dashboardSettingForm.get('createdBy').setValue(1);
    this.dashboardSettingForm.get('creationDate').setValue(new Date());
    this.dashboardSettingForm.get('updateDBy').setValue(1);
    this.dashboardSettingForm.get('updateDate').setValue(new Date());
    this.dashboardSettingForm.value.status=="ACTIVE" ? this.dashboardSettingForm.controls["isActive"].setValue('Y') :this.dashboardSettingForm.controls["isActive"].setValue('N');
    this.submitted = true;
    if (this.dashboardSettingForm.invalid) {
      return;
    } else{
      this.dashService.saveDashSetting(this.dashboardSettingForm.value).subscribe(s=>{
        var success:any = s;
        this.submitted = true;
        if(success.code==0){
          this.toastService.showToast('danger', success.message);
        } else{
      
        this.toastService.showToast('success',success.message);
        this.back();}
     });
    }
  }

  back(){
    this.router.navigate(['views/dashboard-setting/dashboard-setting-summary']);
  }

}
