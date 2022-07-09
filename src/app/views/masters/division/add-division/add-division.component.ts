import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { ToastrService } from 'src/app/views/services/toastr.service';
import { DivisionService } from '../division.service';

@Component({
  selector: 'app-add-division',
  templateUrl: './add-division.component.html',
  styleUrls: ['./add-division.component.scss']
})
export class AddDivisionComponent implements OnInit {

  divisionForm:any;
  submitted = false;
  btnLoader:boolean;
  isView:boolean=false;
  companyList:any=[];
  holdingList:any=[];
  statusList: any = [{ valueCode: 'ACTIVE', valueName: 'Active' }, { valueCode: 'INACTIVE', valueName: 'Inactive' }]
  obj={ companyId:null }

  constructor(private activatedRoute:ActivatedRoute,private toastService:ToastrService,private router:Router,private divisionService:DivisionService) {
    this.divisionForm = new FormGroup({
      xdivId: new FormControl(null),
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
      this.divisionForm.controls['xdivId'].setValue(params.id);
      this.isView = params.view;
    });

   }

   get f() { return this.divisionForm.controls; }

  ngOnInit() {
    this.companySetting();
    this.divisionService.getAllHolding().subscribe(s=>{
     
        this.holdingList = s;
        this.divisionForm.get('gHoldingId').setValue(this.holdingList[0].gHoldingId);
      this.selectHolding(this.holdingList[0].gHoldingId) 
    });    

    if(this.divisionForm.value.xdivId){
      this.divisionService.getDivisionById(this.divisionForm.value.xdivId).subscribe(success=>{
        var s:any = success;
        this.divisionForm.patchValue(s.data);
        this.selectHolding(s.data.gHoldingId);
        this.obj.companyId = s.data.gCompanyId;
        s.data.isActive=='Y' ? this.divisionForm.get('status').setValue('ACTIVE') : this.divisionForm.get('status').setValue('INACTIVE');   
        if(this.isView){ this.divisionForm.disable(); }
      });
    }
    else{
      this.divisionForm.get('status').setValue("ACTIVE")
    }
  }

  selectHolding(holdingId){
    this.divisionService.getAllCompaniesByHoldingId(holdingId).subscribe(s=>{
        this.companyList = s;
        if(this.divisionForm.value.xdivId){
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


  addUpdateDivision(){

    this.divisionForm.get('createdBy').setValue(1);
    this.divisionForm.get('created').setValue(new Date());
    this.divisionForm.get('updatedBy').setValue(1);
    this.divisionForm.get('updated').setValue(new Date());
    let compList: any = this.setCompanyList(this.selectedCompanyList)
    this.divisionForm.get('gCompanyId').setValue(compList);
    this.divisionForm.value.status=="ACTIVE" ? this.divisionForm.get('isActive').setValue('Y'):this.divisionForm.get('isActive').setValue('N');
    

    this.submitted = true;
    if (this.divisionForm.invalid) {
      return;
    } else{
     
      this.btnLoader=true;
      this.divisionService.addUpdateDivision(this.divisionForm.value).subscribe(success=>{
        this.btnLoader =false;
        var success1:any = success;
        if(success1.code==0){
          this.toastService.showToast('danger',success1.message);
        } else{
        this.toastService.showToast('success',success1.message);
        this.back();}
      }, error => { this.btnLoader = false; console.log('oops', error); });
    }
  }

  back(){
    this.router.navigate(['/views/masters/division/division-summary']);
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
