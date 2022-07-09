import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { EmpGradeService } from '../emp-grade.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'src/app/views/services/toastr.service';
import { IDropdownSettings } from 'ng-multiselect-dropdown';

@Component({
  selector: 'app-add-emp-grade',
  templateUrl: './add-emp-grade.component.html',
  styleUrls: ['./add-emp-grade.component.scss']
})
export class AddEmpGradeComponent implements OnInit {
  empGradeForm:any;
  submitted = false;
  holdingList:any=[];
  companyList:any =[];
  isView:boolean=false;
  statusList: any = [{ valueCode: 'ACTIVE', valueName: 'Active' }, { valueCode: 'INACTIVE', valueName: 'Inactive' }]
  obj={ companyId:null }
  constructor(private toastService:ToastrService,private router:Router,private activatedRoute:ActivatedRoute,private empGradeService:EmpGradeService) {
    this.empGradeForm = new FormGroup({
      empGradeId: new FormControl(null),
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

    // this.activeRoute.queryParams.subscribe(params => {
    //   this.empGradeForm.controls['empGradeId'].setValue(params.id);
    //   this.isView = params.view;
    // });
    
    activatedRoute.queryParams.subscribe(params=>{
      this.empGradeForm.controls['empGradeId'].setValue(params.id);
      this.isView = params.view;
    });
   }

   get f() { return this.empGradeForm.controls; }

  ngOnInit() {
   
    this.getHoldingList();
    this.companySetting();
    if(this.empGradeForm.value.empGradeId){
      this.empGradeService.getEmpGradeById(this.empGradeForm.value.empGradeId).subscribe(success=>{
          var success1:any = success;
          this.empGradeForm.patchValue(success1.data);
          this.obj.companyId = success1.data.companyId;
          this.selectHolding(success1.data.holdingId);
          success1.data.isActive=='Y' ? this.empGradeForm.get('status').setValue("ACTIVE") : this.empGradeForm.get('status').setValue("INACTIVE");   
          if(this.isView){ this.empGradeForm.disable(); }
      });
    
    } else{
      this.empGradeForm.get('status').setValue("ACTIVE");
    }
   }
  
   selectHolding(holdingId){
    this.empGradeService.getComapnyList(holdingId).subscribe(success=>{
        this.companyList = success;
        if(this.empGradeForm.value.empGradeId){
          this.selectedCompanyList = this.companyList.filter(o1 => this.obj.companyId.some(o2 => o1.gCompanyId === o2));
        }
    });
  }

  getHoldingList(){
    this.empGradeService.getHoldingList().subscribe(success=>{
        this.holdingList = success;
        this.empGradeForm.get('holdingId').setValue(this.holdingList[0].gHoldingId);
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

  addUpdateEmpGrade(){ 
    this.empGradeForm.get('createdBy').setValue(1);
    this.empGradeForm.get('created').setValue(new Date());
    this.empGradeForm.get('updatedBy').setValue(1);
    this.empGradeForm.get('updated').setValue(new Date());
    // this.empGradeForm.get('companyId').setValue(Number(this.empGradeForm.value.companyId));
   
    let compList: any = this.setCompanyList(this.selectedCompanyList);
    this.empGradeForm.controls['companyId'].setValue(compList);


    this.empGradeForm.value.status=="ACTIVE" ? this.empGradeForm.get('isActive').setValue('Y'):this.empGradeForm.get('isActive').setValue('N');
    
    this.submitted = true;
    if (this.empGradeForm.invalid) {
      return;
    } else{
     
      this.empGradeService.addUpdateEmpGrade(this.empGradeForm.value).subscribe(success=>{
        var success1:any = success;
        if(success1.code=0){
          this.toastService.showToast('danger',success1.message);
        } else{
        this.toastService.showToast('success',success1.message);
        this.back();}
      });
    }
  }

  back(){
    this.router.navigate(['views/masters/empgrade/empgrade-summary'])  
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
