import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'src/app/views/services/toastr.service';
import { SectionService } from '../section.service';
import { IDropdownSettings } from 'ng-multiselect-dropdown';

@Component({
  selector: 'app-add-section',
  templateUrl: './add-section.component.html',
  styleUrls: ['./add-section.component.scss']
})
export class AddSectionComponent implements OnInit {

  sectionForm:any;
  submitted = false;

  isView:boolean=false;
  companyList:any=[];
  holdingList:any=[];
  statusList: any = [{ valueCode: 'ACTIVE', valueName: 'Active' }, { valueCode: 'INACTIVE', valueName: 'Inactive' }]
  obj={ companyId:null }

  constructor(private activatedRoute:ActivatedRoute,private toastService:ToastrService,private router:Router,private sectionService:SectionService) {
    this.sectionForm = new FormGroup({
      xsectionId: new FormControl(null),
      gCompanyId:new FormControl(null),
      company: new FormControl(null, [Validators.required]),
      gHoldingId: new FormControl(null,[Validators.required]),
      isActive: new FormControl(null,[Validators.required]),
      status: new FormControl(null),
      created: new FormControl(null,[Validators.required]),
      createdBy: new FormControl(null,[Validators.required]),
      updated: new FormControl(null,[Validators.required]),
      updatedBy: new FormControl(null,[Validators.required]),
      description: new FormControl(null),
      code: new FormControl(null),
      name:new FormControl(null,[Validators.required])
    });

    this.activatedRoute.queryParams.subscribe(params => {
      this.sectionForm.controls['xsectionId'].setValue(params.id);
      this.isView = params.view;
    });

   }

   get f() { return this.sectionForm.controls; }

  ngOnInit() {
    this.companySetting();
    this.sectionService.getAllHolding().subscribe(s=>{
     
        this.holdingList = s;
        this.sectionForm.get('gHoldingId').setValue(this.holdingList[0].gHoldingId);
      this.selectHolding(this.holdingList[0].gHoldingId) 
    });    

    if(this.sectionForm.value.xsectionId){
      this.sectionService.getSectionById(this.sectionForm.value.xsectionId).subscribe(success=>{
        var s:any = success;
        this.sectionForm.patchValue(s.data);
       this.selectHolding(s.data.gHoldingId);
       this.obj.companyId = s.data.gCompanyId;
        s.data.isActive=='Y' ? this.sectionForm.get('status').setValue('ACTIVE') : this.sectionForm.get('status').setValue('INACTIVE');   
        if(this.isView){ this.sectionForm.disable(); }
      });
    }
    else{
      this.sectionForm.get('status').setValue("ACTIVE")
    }
  }

  selectHolding(holdingId){
    this.sectionService.getAllCompaniesByHoldingId(holdingId).subscribe(s=>{
        this.companyList = s;
        if(this.sectionForm.value.xsectionId){
          this.selectedCompanyList = this.companyList.filter(o1 => this.obj.companyId.some(o2 => o1.gCompanyId === o2));
        }   
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


  addUpdateSection(){

    this.sectionForm.get('createdBy').setValue(1);
    this.sectionForm.get('created').setValue(new Date());
    this.sectionForm.get('updatedBy').setValue(1);
    this.sectionForm.get('updated').setValue(new Date());
    let compList: any = this.setCompanyList(this.selectedCompanyList)
    this.sectionForm.get('gCompanyId').setValue(compList);
    this.sectionForm.value.status=="ACTIVE" ? this.sectionForm.get('isActive').setValue('Y'):this.sectionForm.get('isActive').setValue('N');
    if(this.sectionForm.value.xsectionId){
      this.sectionForm.get('xsectionId').setValue(Number(this.sectionForm.value.xsectionId));
    }else{
      this.sectionForm.get('xsectionId').setValue(undefined);
    }
// console.log(JSON.stringify(this.sectionForm.value))
    this.submitted = true;
    if (this.sectionForm.invalid) {
      return;
    } else{
     
      
      this.sectionService.addUpdateSection(this.sectionForm.value).subscribe(success=>{
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
    this.router.navigate(['/views/masters/section/section-summary']);
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
