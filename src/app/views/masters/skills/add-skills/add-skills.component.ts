import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'src/app/views/services/toastr.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SkillsService } from '../skills.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { IDropdownSettings } from 'ng-multiselect-dropdown';

@Component({
  selector: 'app-add-skills',
  templateUrl: './add-skills.component.html',
  styleUrls: ['./add-skills.component.scss']
})
export class AddSkillsComponent implements OnInit {

 
  skillsForm: FormGroup;
  submitted = false;
  isView: boolean = false;
  holdingList: any = [];
  companyList: any = [];
  obj={ companyId:null }
  statusList: any = [{ valueCode: 'ACTIVE', valueName: 'Active' }, { valueCode: 'INACTIVE', valueName: 'Inactive' }]
  constructor(private toastService: ToastrService, private activatedRoute: ActivatedRoute, private skillsService:SkillsService, private router: Router) {
    this.skillsForm = new FormGroup({
      empskillId: new FormControl(null),
      companyId: new FormControl(null, [Validators.required]),
      holdingId: new FormControl(null, [Validators.required]),
      isActive: new FormControl(null),
      status: new FormControl(null),
      created: new FormControl(null),
      company:new FormControl(null, [Validators.required]),
      createdBy: new FormControl(null),
      updated: new FormControl(null),
      updatedBy: new FormControl(null),
      description: new FormControl(null),
      code: new FormControl(null),
      name: new FormControl(null, [Validators.required])
    });

    this.activatedRoute.queryParams.subscribe(params => {
      this.skillsForm.controls['empskillId'].setValue(params.id);
      this.isView = params.view;
     // this.parentUrl = params.parentUrl;
    });
  }

  ngOnInit() {
    this.getHoldingList();
   this.companySetting();
    if (this.skillsForm.value.empskillId) {
      this.skillsService.getSKillsById(this.skillsForm.value.empskillId).subscribe(success => {
        var s: any = success;
        this.skillsForm.patchValue(s.data);
        this.obj.companyId = s.data.companyId;
        this.getCompanyListByHoldingId(s.data.holdingId);
        s.data.isActive == 'Y' ? this.skillsForm.get('status').setValue("ACTIVE") : this.skillsForm.get('status').setValue("INACTIVE");
        if (this.isView) { this.skillsForm.disable(); }
      });
    } else{
      this.skillsForm.get('status').setValue("ACTIVE");
    }
  }

  get f() { return this.skillsForm.controls; }

 
  getCompanyListByHoldingId(holdinId) {

    this.skillsService.getCompanyListByHoldingId(holdinId).subscribe(s => {
      this.companyList = s;
      if(this.skillsForm.value.empskillId){
        this.selectedCompanyList = this.companyList.filter(o1 => this.obj.companyId.some(o2 => o1.gCompanyId === o2));
      }
    });
  }

  getHoldingList() {
    this.skillsService.getHoldingList().subscribe(s => {
      this.holdingList = s;
      this.skillsForm.get('holdingId').setValue(this.holdingList[0].gHoldingId);
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
    this.skillsForm.get('createdBy').setValue(Number(sessionStorage.getItem('userId')));
    this.skillsForm.get('created').setValue(new Date());
    this.skillsForm.get('updatedBy').setValue(Number(sessionStorage.getItem('userId')));
    this.skillsForm.get('updated').setValue(new Date());
    
    this.skillsForm.value.status == "ACTIVE" ? this.skillsForm.get('isActive').setValue('Y') : this.skillsForm.get('isActive').setValue('N');
  
    let compList: any = this.setCompanyList(this.selectedCompanyList)
    this.skillsForm.controls['companyId'].setValue(compList);

    
    this.submitted = true;
    if (this.skillsForm.invalid) {
      return;
    } else {
      this.skillsService.addUpdateSkills(this.skillsForm.value).subscribe(success=>{
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
    this.router.navigate(["/views/masters/skills/skills-summary"]);
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
