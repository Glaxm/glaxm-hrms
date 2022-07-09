import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'src/app/views/services/toastr.service';
import { ActivatedRoute, Router } from '@angular/router';
import { EduCatService } from '../edu-cat.service';
import { IDropdownSettings } from 'ng-multiselect-dropdown';

@Component({
  selector: 'app-add-edu-cat',
  templateUrl: './add-edu-cat.component.html',
  styleUrls: ['./add-edu-cat.component.scss']
})
export class AddEduCatComponent implements OnInit {

  
  eduCatForm: FormGroup;
  submitted = false;
  isView: boolean = false;
  holdingList: any = [];
  companyList: any = [];
  obj={ companyId:null }
  statusList: any = [{ valueCode: 'ACTIVE', valueName: 'Active' }, { valueCode: 'INACTIVE', valueName: 'Inactive' }]
  constructor(private toastService: ToastrService, private activatedRoute: ActivatedRoute, private eduCatService:EduCatService, private router: Router) {
    this.eduCatForm = new FormGroup({
      eduCategoryId: new FormControl(null),
      companyId: new FormControl(null, [Validators.required]),
      holdingId: new FormControl(null, [Validators.required]),
      isActive: new FormControl(null),
      status: new FormControl(null),
      created: new FormControl(null),
      createdBy: new FormControl(null),
      updated: new FormControl(null),
      updatedBy: new FormControl(null),
      description: new FormControl(null),
      code: new FormControl(null),
      company:new FormControl(null, [Validators.required]),
      name: new FormControl(null, [Validators.required])
    });

    this.activatedRoute.queryParams.subscribe(params => {
      this.eduCatForm.controls['eduCategoryId'].setValue(params.id);
      this.isView = params.view;
     // this.parentUrl = params.parentUrl;
    });
  }

  ngOnInit() {
    this.getHoldingList();
    this.companySetting();
    if (this.eduCatForm.value.eduCategoryId) {
      this.eduCatService.getEduCatById(this.eduCatForm.value.eduCategoryId).subscribe(success => {
        var s: any = success;
        this.eduCatForm.patchValue(s.data);
        this.obj.companyId = s.data.companyId;
        this.getCompanyListByHoldingId(s.data.holdingId);
        s.data.isActive == 'Y' ? this.eduCatForm.get('status').setValue("ACTIVE") : this.eduCatForm.get('status').setValue("INACTIVE");
        if (this.isView) { this.eduCatForm.disable(); }
      });
    } else{
      this.eduCatForm.get('status').setValue("ACTIVE");
    }
  }

  get f() { return this.eduCatForm.controls; }

 
  getCompanyListByHoldingId(holdinId) {

    this.eduCatService.getCompanyListByHoldingId(holdinId).subscribe(s => {
      this.companyList = s;
      if(this.eduCatForm.value.eduCategoryId){
        this.selectedCompanyList = this.companyList.filter(o1 => this.obj.companyId.some(o2 => o1.gCompanyId === o2));
      }
    });
  }

  getHoldingList() {
    this.eduCatService.getHoldingList().subscribe(s => {
      this.holdingList = s;
      this.eduCatForm.get('holdingId').setValue(this.holdingList[0].gHoldingId);
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


  addUpdateAirSector() {
    this.eduCatForm.get('createdBy').setValue(Number(sessionStorage.getItem('userId')));
    this.eduCatForm.get('created').setValue(new Date());
    this.eduCatForm.get('updatedBy').setValue(Number(sessionStorage.getItem('userId')));
    this.eduCatForm.get('updated').setValue(new Date());
    this.eduCatForm.value.status == "ACTIVE" ? this.eduCatForm.get('isActive').setValue('Y') : this.eduCatForm.get('isActive').setValue('N');
    
    let compList: any = this.setCompanyList(this.selectedCompanyList)
    this.eduCatForm.controls['companyId'].setValue(compList);

    this.submitted = true;
    if (this.eduCatForm.invalid) {
      return;
    } else {
      this.eduCatService.addUpdateEduCat(this.eduCatForm.value).subscribe(success=>{
        var s: any = success;
        if(s.code==0){
          this.toastService.showToast('danger',s.message);
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
    this.router.navigate(["/views/masters/edu-cat/edu-cat-summary"]);
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
