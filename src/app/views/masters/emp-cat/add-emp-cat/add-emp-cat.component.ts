import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { EmpCatService } from '../emp-cat.service';
import { ToastrService } from 'src/app/views/services/toastr.service';
import { Router, ActivatedRoute } from '@angular/router';
import { IDropdownSettings } from 'ng-multiselect-dropdown';

@Component({
  selector: 'app-add-emp-cat',
  templateUrl: './add-emp-cat.component.html',
  styleUrls: ['./add-emp-cat.component.scss']
})
export class AddEmpCatComponent implements OnInit {
  empCatForm:any;
  submitted = false;

  isView:boolean=false;
  holdingList:any=[];
  companyList:any =[];
  statusList: any = [{ valueCode: 'ACTIVE', valueName: 'Active' }, { valueCode: 'INACTIVE', valueName: 'Inactive' }]
  obj={ companyId:null }
  constructor(private toastService:ToastrService,private router:Router,private activatedRoute:ActivatedRoute,private empCatService:EmpCatService) {
    this.empCatForm = new FormGroup({
      empCatId: new FormControl(null),
      companyId:new FormControl(null,[Validators.required]),
      holdingId: new FormControl(null,[Validators.required]),
      isActive: new FormControl(null),
      status: new FormControl(null),
      created: new FormControl(null,[Validators.required]),
      createdBy: new FormControl(null,[Validators.required]),
      updated: new FormControl(null,[Validators.required]),
      updatedBy: new FormControl(null,[Validators.required]),
      description: new FormControl(null),
      code: new FormControl(null),
      company: new FormControl(null, [Validators.required]),
      name:new FormControl(null,[Validators.required])
    });

    activatedRoute.queryParams.subscribe(params=>{
      this.empCatForm.controls['empCatId'].setValue(params.id);
      this.isView = params.view;
    });

   }

   get f() { return this.empCatForm.controls; }

  ngOnInit() {

    this.getHoldingList();
    this.companySetting();
    if(this.empCatForm.value.empCatId){
      this.empCatService.getEmpCatById(this.empCatForm.value.empCatId).subscribe(success=>{
          var success1:any = success;
          this.empCatForm.patchValue(success1.data);
          this.obj.companyId = success1.data.companyId;
          this.selectHolding(success1.data.holdingId);
          success1.data.isActive=='Y' ? this.empCatForm.get('status').setValue("ACTIVE") : this.empCatForm.get('status').setValue("INACTIVE");   
          if(this.isView){ this.empCatForm.disable(); }
      });
      
    } else{
      this.empCatForm.get('status').setValue("ACTIVE");
    }
    
  }

  selectHolding(holdingId){
    this.empCatService.getComapnyList(holdingId).subscribe(success=>{
        this.companyList = success;
        if(this.empCatForm.value.empCatId){
          this.selectedCompanyList = this.companyList.filter(o1 => this.obj.companyId.some(o2 => o1.gCompanyId === o2));
        }
  
    });
  }

  getHoldingList(){
    this.empCatService.getHoldingList().subscribe(success=>{
        this.holdingList = success;
        this.empCatForm.get('holdingId').setValue(this.holdingList[0].gHoldingId);
        this.selectHolding(this.holdingList[0].gHoldingId) 
    
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

  addUpdateEmpCat(){ 
    this.empCatForm.get('createdBy').setValue(1);
    this.empCatForm.get('created').setValue(new Date());
    this.empCatForm.get('updatedBy').setValue(1);
    
    let compList: any = this.setCompanyList(this.selectedCompanyList);
    this.empCatForm.controls['companyId'].setValue(compList);
      
    this.empCatForm.get('updated').setValue(new Date());
    this.empCatForm.value.status="ACTIVE" ? this.empCatForm.get('isActive').setValue('Y'):this.empCatForm.get('isActive').setValue('N');
    

    this.submitted = true;
    if (this.empCatForm.invalid) {
      return;
    } else{
      this.empCatService.addUpdateEmpCat(this.empCatForm.value).subscribe(success=>{
        var success1:any = success;
        if(success1.code==0){
          this.toastService.showToast('danger',success1.message);
        } else{
        this.toastService.showToast('success',success1.message);
        this.back();}
      });
    }
  }

  back(){
    this.router.navigate(['views/masters/empcat/empcat-summary'])  
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
