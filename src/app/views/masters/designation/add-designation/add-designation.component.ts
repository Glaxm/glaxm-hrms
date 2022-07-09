import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'src/app/views/services/toastr.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DesignationService } from '../designation.service';
import { IDropdownSettings } from 'ng-multiselect-dropdown';

@Component({
  selector: 'app-add-designation',
  templateUrl: './add-designation.component.html',
  styleUrls: ['./add-designation.component.scss']
})
export class AddDesignationComponent implements OnInit {
  desigForm: FormGroup;
  submitted = false;
  isView: boolean = false;
  holdingList: any = [];
  companyList: any = [];
  statusList: any = [{ valueCode: 'ACTIVE', valueName: 'Active' }, { valueCode: 'INACTIVE', valueName: 'Inactive' }]
  obj={ companyId:null }
  constructor(private toastService: ToastrService, private activatedRoute: ActivatedRoute, private desigService: DesignationService, private router: Router) {
    this.desigForm = new FormGroup({
      empDesignationId: new FormControl(null),
      companyId: new FormControl(null, [Validators.required]),
      holdingId: new FormControl(null, [Validators.required]),
      isActive: new FormControl(null),
      status: new FormControl(null),
      levelNo: new FormControl(null),
      created: new FormControl(null),
      createdBy: new FormControl(null),
      updated: new FormControl(null),
      updatedBy: new FormControl(null),
      description: new FormControl(null),
      CODE: new FormControl(null),
      company: new FormControl(null),
      name: new FormControl(null, [Validators.required])
    });

    this.activatedRoute.queryParams.subscribe(params => {
      this.desigForm.controls['empDesignationId'].setValue(params.id);
      this.isView = params.view;
     // this.parentUrl = params.parentUrl;
    });
  }

  ngOnInit() {
    this.getHoldingList();
    this.companySetting();
    if (this.desigForm.value.empDesignationId) {
      this.desigService.getDesigDataById(this.desigForm.value.empDesignationId).subscribe(success => {
        var s: any = success;
        this.desigForm.patchValue(s.data);
        this.getCompanyListByHoldingId(s.data.holdingId);
        this.obj.companyId = s.data.companyId;
        s.data.isActive == 'Y' ? this.desigForm.get('status').setValue("ACTIVE") : this.desigForm.get('status').setValue("INACTIVE");
        if (this.isView) { this.desigForm.disable(); }
      });
    }
    else{
      this.desigForm.controls['status'].setValue("ACTIVE");

    }
  }

  get f() { return this.desigForm.controls; }

  getCompanyListByHoldingId(holdinId) {

    this.desigService.getCompanyListByHoldingId(holdinId).subscribe(s => {
      this.companyList = s;
      this.desigForm.get('holdingId').setValue(this.holdingList[0].gHoldingId);
      if(this.desigForm.value.empDesignationId){
        this.selectedCompanyList = this.companyList.filter(o1 => this.obj.companyId.some(o2 => o1.gCompanyId === o2));
      }
    });
  }

  getHoldingList() {
    this.desigService.getHoldingList().subscribe(s => {
      this.holdingList = s;
      this.desigForm.get('holdingId').setValue(this.holdingList[0].gHoldingId);
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

  addUpdateDesignation() {
    this.desigForm.get('createdBy').setValue(Number(sessionStorage.getItem('userId')));
    this.desigForm.get('created').setValue(new Date());
    this.desigForm.get('updatedBy').setValue(Number(sessionStorage.getItem('userId')));
    this.desigForm.get('updated').setValue(new Date());

    this.desigForm.get('companyId').setValue(Number(this.desigForm.value.companyId));

    this.desigForm.value.status == "ACTIVE" ? this.desigForm.get('isActive').setValue('Y') : this.desigForm.get('isActive').setValue('N');
    this.desigForm.get('levelNo').setValue(Number(this.desigForm.value.levelNo));
    this.submitted = true;
    
    let compList: any = this.setCompanyList(this.selectedCompanyList)
    this.desigForm.controls['companyId'].setValue(compList);

    if (this.desigForm.invalid) {
      return;
    } else {
      this.desigService.addUpdateDesignation(this.desigForm.value).subscribe(success=>{
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
    this.router.navigate(["/views/masters/designation/designation-summary"]);
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
      }
    
      onCompanyDeSelect(items: any) {
        this.selectedCompanyList = this.selectedCompanyList.filter(item => item.gCompanyId !== items.gCompanyId);
      }
    
      onSelectAllCompnay(items: any) {
        this.selectedCompanyList = [];
        this.selectedCompanyList.push(...[items]);
      }
    
  
}
