import { Component, OnInit, ViewChild, Renderer2, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { CommonService } from 'src/app/views/services/common.service';
import { RoleService } from '../role.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AngularMyDatePickerDirective, IMyDateModel } from 'angular-mydatepicker';
import { ToastrService } from 'src/app/views/services/toastr.service';
//import { IMyOptions } from 'mydatepicker';
@Component({
  selector: 'app-add-role',
  templateUrl: './add-role.component.html',
  styleUrls: ['./add-role.component.scss']
})
export class AddRoleComponent implements OnInit {
  
  isrolemodule:boolean=false;
  submitted = false;
  submitted1 = false;
  isView:boolean=false;
  enableFilter:boolean=false;
  statusList:any=[ {valueCode:'ACTIVE', valueName:'Active'}, {valueCode:'INACTIVE', valueName:'Inactive'} ];
  public myDatePickerOptions = this.commonService.datepickerFormat;
  @ViewChild('dp1', {static: false}) myDp1: AngularMyDatePickerDirective;
  @ViewChild('dp2', {static: false}) myDp2: AngularMyDatePickerDirective;
  @ViewChild('dp3', {static: false}) myDp3: AngularMyDatePickerDirective;
  @ViewChild('dp4', {static: false}) myDp4: AngularMyDatePickerDirective;
  roleForm:any;
  roleModuleForm:any;
  
  constructor(private toastService:ToastrService,private activatedRoute:ActivatedRoute,private commonService:CommonService,private formBuilder: FormBuilder,private roleService:RoleService,private cdr: ChangeDetectorRef,private router:Router) { 
    this.roleForm = new FormGroup({
      roleId: new FormControl(null),
      roleName: new FormControl(null,[Validators.required]),
      roleDesc: new FormControl(null),
      startDate: new FormControl(null),
      endDate: new FormControl(null),
      stdate: new FormControl(null),
      endate: new FormControl(null),
      startDate1: new FormControl(null),
      endDate1: new FormControl(null),
      status: new FormControl(null,[Validators.required]),
      createdBy: new FormControl(null),
      creationDate: new FormControl(null),
      lastUpdatedBy: new FormControl(null),
      lastUpdateDate: new FormControl(null),
      lastUpdateLogin: new FormControl(null),
      
      viewallRecords1 : new FormControl(null),
      viewallRecords : new FormControl(null),
    });

    this.roleModuleForm = new FormGroup({
      userRoleModuleId:new FormControl(null),
      roleId: new FormControl(null),
      moduleId: new FormControl(null,[Validators.required]),
      createFlag: new FormControl(null),
      editFlag: new FormControl(null),
      readFlag: new FormControl(null),
      deleteFlag: new FormControl(null),
      createFlag1: new FormControl(null),
      editFlag1: new FormControl(null),
      readFlag1: new FormControl(null),
      deleteFlag1: new FormControl(null),

      importFlag1: new FormControl(null),
      importFlag: new FormControl(null),
      exportFlag1: new FormControl(null),
      exportFlag: new FormControl(null),
      forSelf: new FormControl(null),
      forSelf1: new FormControl(null),
      startDate: new FormControl(null),
      endDate: new FormControl(null),
      startDate11: new FormControl(null),
      endDate11: new FormControl(null),
      createdBy: new FormControl(null),
      creationDate: new FormControl(null),
      lastUpdatedBy: new FormControl(null),
      lastUpdateDate: new FormControl(null),
      lastUpdateLogin: new FormControl(null),
      status: new FormControl(null,[Validators.required]),
      isActive: new FormControl(null),
    });

    this.activatedRoute.queryParams.subscribe(params => {
      this.roleForm.controls['roleId'].setValue(params.id);
      this.isView = params.view;
    });
  }
  get f() { return this.roleForm.controls; }
  get f1() { return this.roleModuleForm.controls; }
  ngOnInit() {
    
      if(this.roleForm.value.roleId){
        
        this.roleService.getRoleDataById(this.roleForm.value.roleId).subscribe(success=>{
          var s:any=success;
          this.roleForm.patchValue(s.data);
          let startDate: Date = new Date(s.data.startDate);
          let fromModel: IMyDateModel = {isRange: false, singleDate: {jsDate: startDate}, dateRange: null};
          this.roleForm.controls['startDate1'].setValue(fromModel);
          
          let endDate: Date = new Date(s.data.endDate);
          let toModel: IMyDateModel = {isRange: false, singleDate: {jsDate: endDate}, dateRange: null};
          this.roleForm.controls['endDate1'].setValue(toModel);

          s.data.viewallRecords=='Y' ? this.roleForm.get('viewallRecords1').setValue(true):this.roleForm.get('viewallRecords1').setValue(false);
     

          if(this.isView){ this.roleForm.disable() }
        });

        this.roleModuleDataTable();
       
      } else{
          let startDate: Date = new Date();
          let fromModel: IMyDateModel = {isRange: false, singleDate: {jsDate: startDate}, dateRange: null};
          this.roleForm.controls['startDate1'].setValue(fromModel);
          
          let endDate: Date = new Date();
          let toModel: IMyDateModel = {isRange: false, singleDate: {jsDate: endDate}, dateRange: null};
          this.roleForm.controls['endDate1'].setValue(toModel);

          this.roleForm.get('status').setValue('ACTIVE');
      }

      this.roleService.getAllActiveModule().subscribe(s=>{
        this.moduleList=s;
      });
  }


  toggleCalendar(): void {
    this.cdr.detectChanges();
    this.myDp1.toggleCalendar();
  }
  changeStartDate(event){
    let date = this.commonService.dateFormat(event.singleDate.jsDate);

    this.roleForm.get('stdate').setValue(this.commonService.dateFormat(event.singleDate.jsDate));
  }
  changeEndDate(event){
    this.roleForm.get('endate').setValue(this.commonService.dateFormat(event.singleDate.jsDate));
  }

  addRole(){
    console.log(JSON.stringify(this.roleForm.value));
    // if(this.roleForm.value.startDate==null){
    //   this.roleForm.get('startDate').setValue(this.roleForm.value.startDate1.singleDate.jsDate);
    // }
    // if(this.roleForm.value.endDate==null){
    //   this.roleForm.get('endDate').setValue(this.roleForm.value.endDate1.singleDate.jsDate);
    // }
    
    this.roleForm.get('createdBy').setValue(1);
    this.roleForm.get('creationDate').setValue(new Date());
    this.roleForm.get('lastUpdatedBy').setValue(1);
    this.roleForm.get('lastUpdateDate').setValue(new Date());
    this.roleForm.get('lastUpdateLogin').setValue(1);
    this.roleForm.value.viewallRecords1 ? this.roleForm.get('viewallRecords').setValue("Y"):this.roleForm.get('viewallRecords').setValue("N");

    this.submitted = true;
    if (this.roleForm.invalid) {
      return;
    } else{
      this.roleService.saveRole(this.roleForm.value).subscribe(s=>{
         var success:any = s;
         this.roleForm.patchValue(success.data);
         this.toastService.showToast('success',success.message);
         this.router.navigate(['views/role/add-edit-role'],{queryParams:{id:success.data.roleId}});
      });
    }
  }

  back(){
    this.router.navigate(['views/role/role-summary']);
  }


  // ************************************** ROLE MODULE **************************************//
  roleModuleList:any=[];
  moduleList:any=[];
  roleModuleDataTable(){
      this.roleService.roleModuleDataTable(this.roleForm.value.roleId).subscribe(s => {
          this.roleModuleList = s;
      })
  }
  changeStartDate1(event){
    this.roleModuleForm.get('startDate').setValue(event.singleDate.jsDate);
  }
  changeEndDate1(event){
    this.roleModuleForm.get('endDate').setValue(event.singleDate.jsDate);
  }
  
  addRoleModule(){
    let startDate: Date = new Date();
    this.roleModuleForm.value.userRoleModuleId ? this.roleModuleForm.controls['userRoleModuleId'].setValue(Number(this.roleModuleForm.value.userRoleModuleId)):this.roleModuleForm.controls['userRoleModuleId'].setValue(undefined);
    let fromModel: IMyDateModel = {isRange: false, singleDate: {jsDate: startDate}, dateRange: null};
    this.roleModuleForm.controls['startDate11'].setValue(fromModel);
    
    let endDate: Date = new Date();
    let toModel: IMyDateModel = {isRange: false, singleDate: {jsDate: endDate}, dateRange: null};
    this.roleModuleForm.controls['endDate11'].setValue(toModel);
    
    this.roleModuleForm.controls['status'].setValue("ACTIVE");
  }

  
  saveRoleModule(){
    this.roleModuleForm.controls['roleId'].setValue(this.roleForm.value.roleId);
    if(this.roleModuleForm.value.startDate==null){
      this.roleModuleForm.get('startDate').setValue(this.roleModuleForm.value.startDate11.singleDate.jsDate);
    }
    if(this.roleModuleForm.value.endDate==null){
      this.roleModuleForm.get('endDate').setValue(this.roleModuleForm.value.endDate11.singleDate.jsDate);
    }

    this.roleModuleForm.get('createdBy').setValue(1);
    this.roleModuleForm.get('creationDate').setValue(new Date());
    this.roleModuleForm.get('lastUpdatedBy').setValue(1);
    this.roleModuleForm.get('lastUpdateDate').setValue(new Date());
    this.roleModuleForm.get('lastUpdateLogin').setValue(1);
    this.roleModuleForm.get('roleId').setValue(Number(this.roleForm.value.roleId));
    this.roleModuleForm.get('moduleId').setValue(Number(this.roleModuleForm.value.moduleId));

    this.roleModuleForm.value.status=='ACTIVE' ? this.roleModuleForm.controls['isActive'].setValue("Y") : this.roleModuleForm.controls['isActive'].setValue("N");


    this.roleModuleForm.value.createFlag1 ? this.roleModuleForm.controls['createFlag'].setValue('Y') : this.roleModuleForm.controls['createFlag'].setValue('N');
    this.roleModuleForm.value.editFlag1 ? this.roleModuleForm.controls['editFlag'].setValue('Y') : this.roleModuleForm.controls['editFlag'].setValue('N');
    this.roleModuleForm.value.readFlag1 ? this.roleModuleForm.controls['readFlag'].setValue('Y') : this.roleModuleForm.controls['readFlag'].setValue('N');
    this.roleModuleForm.value.deleteFlag1 ? this.roleModuleForm.controls['deleteFlag'].setValue('Y') : this.roleModuleForm.controls['deleteFlag'].setValue('N');
    this.roleModuleForm.value.importFlag1 ? this.roleModuleForm.controls['importFlag'].setValue('Y') : this.roleModuleForm.controls['importFlag'].setValue('N');
    this.roleModuleForm.value.exportFlag1 ? this.roleModuleForm.controls['exportFlag'].setValue('Y') : this.roleModuleForm.controls['exportFlag'].setValue('N');
    this.roleModuleForm.value.forSelf1 ? this.roleModuleForm.controls['forSelf'].setValue('Y') : this.roleModuleForm.controls['forSelf'].setValue('N');

    if (this.roleModuleForm.invalid) {
      return;
    } else{
      this.roleService.addRoleModule(this.roleModuleForm.value).subscribe(s=>{
        var success:any=s;
        if(success.code==0){
          this.toastService.showToast('danger', success.message);
        } else{
        this.isrolemodule=false;
        this.roleModuleForm.reset();
        this.toastService.showToast('success',success.message);
        this.roleModuleDataTable();}
      });
    }
  }


  editRoleModule(){
    if(this.roleModuleForm.value.userRoleModuleId){
      
      this.roleService.getRoleModuleByRoleModuleId(this.roleModuleForm.value.userRoleModuleId).subscribe(success=>{
      var s:any=success; 
      this.roleModuleForm.patchValue(s);

      
      let startDate: Date = new Date(s.data.startDate);
      let fromModel: IMyDateModel = {isRange: false, singleDate: {jsDate: startDate}, dateRange: null};
      this.roleModuleForm.controls['startDate11'].setValue(fromModel);
      
      let endDate: Date = new Date(s.data.endDate);
      let toModel: IMyDateModel = {isRange: false, singleDate: {jsDate: endDate}, dateRange: null};
      this.roleModuleForm.controls['endDate11'].setValue(toModel);
      this.roleModuleForm.controls['moduleId'].setValue(s.data.moduleId);
      s.data.isActive=='Y' ? this.roleModuleForm.controls['status'].setValue("ACTIVE") : this.roleModuleForm.controls['status'].setValue("INACTIVE");
      s.data.createFlag=='Y' ? this.roleModuleForm.controls['createFlag1'].setValue(true) : this.roleModuleForm.controls['createFlag1'].setValue(false);
      s.data.editFlag=='Y' ? this.roleModuleForm.controls['editFlag1'].setValue(true) : this.roleModuleForm.controls['editFlag1'].setValue(false);
      s.data.readFlag=='Y' ? this.roleModuleForm.controls['readFlag1'].setValue(true) : this.roleModuleForm.controls['readFlag1'].setValue(false);
      s.data.deleteFlag=='Y' ? this.roleModuleForm.controls['deleteFlag1'].setValue(true) : this.roleModuleForm.controls['deleteFlag1'].setValue(false);
      
      s.data.exportFlag=='Y' ? this.roleModuleForm.controls['exportFlag1'].setValue(true) : this.roleModuleForm.controls['exportFlag1'].setValue(false);
      s.data.importFlag=='Y' ? this.roleModuleForm.controls['importFlag1'].setValue(true) : this.roleModuleForm.controls['importFlag1'].setValue(false);
      s.data.forSelf=='Y' ? this.roleModuleForm.controls['forSelf1'].setValue(true) : this.roleModuleForm.controls['forSelf1'].setValue(false);
      
      if(this.isView){ this.roleModuleForm.disable(); }

      });
    }
  }
  getDataUsingRedioBtn(data){
    this.roleModuleForm.controls['userRoleModuleId'].setValue(data.userRoleModuleId);
  }
  
  deleteRoleModule(){

  }

  backrolemodule(){
    this.isrolemodule=false;
    this.roleModuleDataTable();    
  }
  

}
