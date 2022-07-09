import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'src/app/views/services/toastr.service';
import { SubsectionService } from '../subsection.service';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
@Component({
  selector: 'app-add-subsection',
  templateUrl: './add-subsection.component.html',
  styleUrls: ['./add-subsection.component.scss']
})
export class AddSubsectionComponent implements OnInit {

  subsectionForm:any;
  submitted = false;

  isView:boolean=false;
  companyList:any=[];
  holdingList:any=[];
  statusList: any = [{ valueCode: 'ACTIVE', valueName: 'Active' }, { valueCode: 'INACTIVE', valueName: 'Inactive' }]
  obj={ companyId:null }


  constructor(private activatedRoute:ActivatedRoute,private toastService:ToastrService,private router:Router,private subsectionService:SubsectionService) {
    this.subsectionForm = new FormGroup({
      xsubsectionId: new FormControl(null),
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
      this.subsectionForm.controls['xsubsectionId'].setValue(params.id);
      this.isView = params.view;
    });

   }

   get f() { return this.subsectionForm.controls; }

  ngOnInit() {
    this.companySetting();
    this.subsectionService.getAllHolding().subscribe(s=>{
     
        this.holdingList = s;
        this.subsectionForm.get('gHoldingId').setValue(this.holdingList[0].gHoldingId);
      this.selectHolding(this.holdingList[0].gHoldingId) 
    });    

    if(this.subsectionForm.value.xsubsectionId){
      this.subsectionService.getSubsectionById(this.subsectionForm.value.xsubsectionId).subscribe(success=>{
        var s:any = success;
        this.subsectionForm.patchValue(s.data);
        this.selectHolding(s.data.gHoldingId);
        this.obj.companyId = s.data.gCompanyId;
        s.data.isActive=='Y' ? this.subsectionForm.get('status').setValue('ACTIVE') : this.subsectionForm.get('status').setValue('INACTIVE');   
        if(this.isView){ this.subsectionForm.disable(); }
      });
    }
    else{
      this.subsectionForm.get('status').setValue("ACTIVE")
    }
  }

  selectHolding(holdingId){
    this.subsectionService.getAllCompaniesByHoldingId(holdingId).subscribe(s=>{
        this.companyList = s;
        if(this.subsectionForm.value.xsubsectionId){
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

  addUpdateSubsection(){

    this.subsectionForm.get('createdBy').setValue(1);
    this.subsectionForm.get('created').setValue(new Date());
    this.subsectionForm.get('updatedBy').setValue(1);
    this.subsectionForm.get('updated').setValue(new Date());
    let compList: any = this.setCompanyList(this.selectedCompanyList)
    this.subsectionForm.get('gCompanyId').setValue(compList);
    this.subsectionForm.value.status=="ACTIVE" ? this.subsectionForm.get('isActive').setValue('Y'):this.subsectionForm.get('isActive').setValue('N');
    
    if(this.subsectionForm.value.xsubsectionId){
      this.subsectionForm.get('xsubsectionId').setValue(Number(this.subsectionForm.value.xsubsectionId));
    }else{
      this.subsectionForm.get('xsubsectionId').setValue(undefined);
    }

    this.submitted = true;
    if (this.subsectionForm.invalid) {
      return;
    } else{
     
      
      this.subsectionService.addUpdateSubsection(this.subsectionForm.value).subscribe(success=>{
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
    this.router.navigate(['/views/masters/subsection/subsection-summary']);
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
