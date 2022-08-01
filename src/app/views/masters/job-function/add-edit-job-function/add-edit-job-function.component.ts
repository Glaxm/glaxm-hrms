import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { ToastrService } from 'src/app/views/services/toastr.service';
import { JobFunctionService } from '../job-function.service';

@Component({
  selector: 'app-add-edit-job-function',
  templateUrl: './add-edit-job-function.component.html',
  styleUrls: ['./add-edit-job-function.component.scss']
})
export class AddEditJobFunctionComponent implements OnInit {

  jobFunForm: FormGroup;
  submitted = false;
  isView: boolean = false;
  holdingList: any = [];
  companyList: any = [];
  deptList:any=[];
  divisionList:any=[];
  obj={ companyId:null }
  statusList: any = [{ valueCode: 'ACTIVE', valueName: 'Active' }, { valueCode: 'INACTIVE', valueName: 'Inactive' }]
  constructor(private toastService: ToastrService, private activatedRoute: ActivatedRoute, private jobFunService: JobFunctionService, private router: Router) {
    this.jobFunForm = new FormGroup({
      jobfunctionId: new FormControl(null),
      companyId: new FormControl(null, [Validators.required]),
      holdingId: new FormControl(null, [Validators.required]),
      isActive: new FormControl(null),
      company:new FormControl(null, [Validators.required]),
      status: new FormControl(null),
      created: new FormControl(null),
      createdBy: new FormControl(null),
      updated: new FormControl(null),
      updatedBy: new FormControl(null),
      description: new FormControl(null),
      departmentId:new FormControl(null),
      code: new FormControl(null),
      divisionId: new FormControl(null),
      name: new FormControl(null, [Validators.required])
    });

    this.activatedRoute.queryParams.subscribe(params => {
      this.jobFunForm.controls['jobfunctionId'].setValue(params.id);
      this.isView = params.view;
     // this.parentUrl = params.parentUrl;
    });
  }

  ngOnInit() {
    this.getHoldingList();
    this.companySetting();
   
    if (this.jobFunForm.value.jobfunctionId) {
      this.jobFunService.getJobFunDataById(this.jobFunForm.value.jobfunctionId).subscribe(success => {
        var s: any = success;
        this.jobFunForm.patchValue(s.data);
        this.getAllDept(s.data.companyId);
        this.obj.companyId = s.data.companyId;
        this.getCompanyListByHoldingId(s.data.holdingId);
        s.data.isActive == 'Y' ? this.jobFunForm.get('status').setValue("ACTIVE") : this.jobFunForm.get('status').setValue("INACTIVE");
        if (this.isView) { this.jobFunForm.disable(); }
      });
    } else{
      this.jobFunForm.get('status').setValue("ACTIVE");
    }
  }

  get f() { return this.jobFunForm.controls; }

  getAllDept(companyId){
    this.jobFunService.getAllDept(companyId).subscribe(s=>{
      this.deptList=s;
    });
  }

  selectCompany(id){
      let companyList = id!=null && id.length>0 ? this.setCompanyList(id):[];
      this.getAllDept(companyList);
      this.getAllDiv(companyList);
  }

  getAllDiv(companyId){
    this.jobFunService.getAllDiv(companyId).subscribe(s=>{
      this.divisionList=s;
    });
  }


  getCompanyListByHoldingId(holdinId) {

    this.jobFunService.getCompanyListByHoldingId(holdinId).subscribe(s => {
      this.companyList = s;
      this.jobFunForm.get('holdingId').setValue(this.holdingList[0].gHoldingId);
      if(this.jobFunForm.value.jobfunctionId){
        this.selectedCompanyList = this.companyList.filter(o1 => this.obj.companyId.some(o2 => o1.gCompanyId === o2));
      }
     // this.getCompanyListByHoldingId(this.holdingList[0].gHoldingId) 
    });
  }

  getHoldingList() {
    this.jobFunService.getHoldingList().subscribe(s => {
      this.holdingList = s;
      this.jobFunForm.get('holdingId').setValue(this.holdingList[0].gHoldingId);
      this.getCompanyListByHoldingId(this.holdingList[0].gHoldingId) 
    });
  }

  setCompanyList(list) {
    let elm: any = [];
    list.forEach(element => {
      elm.push(element.gCompanyId);
    });
    let unique = [...new Set(elm)];
    return unique;
  }

  addUpdateJobFun() {
    this.jobFunForm.get('createdBy').setValue(Number(sessionStorage.getItem('userId')));
    this.jobFunForm.get('created').setValue(new Date());
    this.jobFunForm.get('updatedBy').setValue(Number(sessionStorage.getItem('userId')));
   
    this.jobFunForm.get('departmentId').setValue(Number(this.jobFunForm.value.departmentId));
    this.jobFunForm.get('divisionId').setValue(Number(this.jobFunForm.value.divisionId));
    this.jobFunForm.get('updated').setValue(new Date());
    this.jobFunForm.value.status == "ACTIVE" ? this.jobFunForm.get('isActive').setValue('Y') : this.jobFunForm.get('isActive').setValue('N');
    
    let compList: any = this.setCompanyList(this.selectedCompanyList)
    this.jobFunForm.controls['companyId'].setValue(compList);


    this.submitted = true;
    if (this.jobFunForm.invalid) {
      return;
    } else {
      this.jobFunService.addUpdateJobFun(this.jobFunForm.value).subscribe(success=>{
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
    this.router.navigate(["/views/masters/jobfunction/jobfunction-summary"]);
    // }
  }

    //================================================ Multiselect Company list

    selectedCompanyList = [];
    dropdownSettings: IDropdownSettings;
  
    companySetting() {
      this.dropdownSettings = {
        singleSelection: false,
        idField: 'gCompanyId',
        textField: 'name',
        selectAllText: 'Select All',
        unSelectAllText: 'UnSelect All',
        itemsShowLimit: 3,
        allowSearchFilter: true
      };
    }
   
    onCompnaySelect(item: any) {
      this.selectedCompanyList.push(item);
      this.selectCompany(this.selectedCompanyList);
    }
  
    onCompanyDeSelect(items: any) {
      this.selectedCompanyList = this.selectedCompanyList.filter(item => item.gCompanyId !== items.gCompanyId);
      this.selectCompany(this.selectedCompanyList);
    }
  
    onSelectAllCompnay(items: any) {
      this.selectedCompanyList = [];
      this.selectedCompanyList.push(...items);
      this.selectCompany(this.selectedCompanyList);
    }
  

}
