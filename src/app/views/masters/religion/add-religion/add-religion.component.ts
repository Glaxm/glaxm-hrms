import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'src/app/views/services/toastr.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ReligionService } from '../religion.service';
import { IDropdownSettings } from 'ng-multiselect-dropdown';

@Component({
  selector: 'app-add-religion',
  templateUrl: './add-religion.component.html',
  styleUrls: ['./add-religion.component.scss']
})
export class AddReligionComponent implements OnInit {

 
  religionForm: FormGroup;
  submitted = false;
  isView: boolean = false;
  holdingList: any = [];
  companyList: any = [];
  // deptList:any=[];
  obj={ companyId:null }
  statusList: any = [{ valueCode: 'ACTIVE', valueName: 'Active' }, { valueCode: 'INACTIVE', valueName: 'Inactive' }]
  constructor(private toastService: ToastrService, private activatedRoute: ActivatedRoute, private religionService:ReligionService, private router: Router) {
    this.religionForm = new FormGroup({
      religionId: new FormControl(null),
      company: new FormControl(null, [Validators.required]),
      companyId: new FormControl(null),
      holdingId: new FormControl(null, [Validators.required]),
      isActive: new FormControl(null),
      status: new FormControl(null),
      created: new FormControl(null),
      createdBy: new FormControl(null),
      updated: new FormControl(null),
      updatedBy: new FormControl(null),
      description: new FormControl(null),
      code: new FormControl(null),
      name: new FormControl(null, [Validators.required])
    });

    this.activatedRoute.queryParams.subscribe(params => {
      this.religionForm.controls['religionId'].setValue(params.id);
      this.isView = params.view;
     // this.parentUrl = params.parentUrl;
    });
  }

  ngOnInit() {
    this.getHoldingList();
    this.companySetting();
   // this.getDeptList();
    if (this.religionForm.value.religionId) {
      this.religionService.getReligionById(this.religionForm.value.religionId).subscribe(success => {
        var s: any = success;
        this.religionForm.patchValue(s.data);
        this.obj.companyId = s.data.companyId;
        this.getCompanyListByHoldingId(s.data.holdingId);
        s.data.isActive == 'Y' ? this.religionForm.get('status').setValue("ACTIVE") : this.religionForm.get('status').setValue("INACTIVE");
        if (this.isView) { this.religionForm.disable(); }
      });
    } else{
      this.religionForm.get('status').setValue("ACTIVE");
    }
  }

  get f() { return this.religionForm.controls; }

 
  getCompanyListByHoldingId(holdinId) {

    this.religionService.getCompanyListByHoldingId(holdinId).subscribe(s => {
      this.companyList = s;
      if(this.religionForm.value.religionId){
        this.selectedCompanyList = this.companyList.filter(o1 => this.obj.companyId.some(o2 => o1.gCompanyId === o2));
      }
    
    });
  }

  getHoldingList() {
    this.religionService.getHoldingList().subscribe(s => {
      this.holdingList = s;
      this.religionForm.get('holdingId').setValue(this.holdingList[0].gHoldingId);
      this.getCompanyListByHoldingId(this.holdingList[0].gHoldingId) 
    });
  }

  addUpdateAirSector() {
    this.religionForm.get('createdBy').setValue(Number(sessionStorage.getItem('userId')));
    this.religionForm.get('created').setValue(new Date());
    this.religionForm.get('updatedBy').setValue(Number(sessionStorage.getItem('userId')));
    this.religionForm.get('updated').setValue(new Date());
    let compList: any = this.setCompanyList(this.selectedCompanyList)
    this.religionForm.controls['companyId'].setValue(compList);

    this.religionForm.value.status == "ACTIVE" ? this.religionForm.get('isActive').setValue('Y') : this.religionForm.get('isActive').setValue('N');
    
    this.submitted = true;
    if (this.religionForm.invalid) {
      return;
    } else {
      this.religionService.addUpdateReligion(this.religionForm.value).subscribe(success=>{
        var s: any = success;
        if(s.code==0){
          this.toastService.showToast('danger', s.message);
        }else{
        this.toastService.showToast('success', s.message);
        this.back();}
      });
    }
  }

  back() {
    // if (this.parentUrl) {
    //   this.router.navigate([this.parentUrl]);
    // } else {
    this.router.navigate(["/views/masters/religion/religion-summary"]);
    // }
  }

  setCompanyList(list) {
    let elm: any = [];
    list.forEach(element => {
      elm.push(element.gCompanyId);
    });
    let unique = [...new Set(elm)];
    return unique;
  }

   //////////////////// multi select ////////////////////

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
