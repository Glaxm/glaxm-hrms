import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { DepatmentService } from '../depatment.service';
import { ToastrService } from 'src/app/views/services/toastr.service';
import { IDropdownSettings } from 'ng-multiselect-dropdown';

@Component({
  selector: 'app-add-department',
  templateUrl: './add-department.component.html',
  styleUrls: ['./add-department.component.scss']
})
export class AddDepartmentComponent implements OnInit {
  deptForm:any;
  submitted = false;

  isView:boolean=false;
  companyList:any=[];
  holdingList:any=[];
  statusList: any = [{ valueCode: 'ACTIVE', valueName: 'Active' }, { valueCode: 'INACTIVE', valueName: 'Inactive' }]


  constructor(private activatedRoute:ActivatedRoute,private toastService:ToastrService,private router:Router,private deptService:DepatmentService) {
    this.deptForm = new FormGroup({
      deptId: new FormControl(null),
      companyId:new FormControl(null,[Validators.required]),
      holdingId: new FormControl(null,[Validators.required]),
      isActive: new FormControl(null,[Validators.required]),
      status: new FormControl(null),
      created: new FormControl(null,[Validators.required]),
      createdBy: new FormControl(null,[Validators.required]),
      updated: new FormControl(null,[Validators.required]),
      updatedBy: new FormControl(null,[Validators.required]),
      desc: new FormControl(null),
      code: new FormControl(null),
      company: new FormControl(null),
      name:new FormControl(null,[Validators.required])
    });

    this.activatedRoute.queryParams.subscribe(params => {
      this.deptForm.controls['deptId'].setValue(params.id);
      this.isView = params.view;
    });

   }

   get f() { return this.deptForm.controls; }

   obj={
    companyId:null
  }

  ngOnInit() {
    this.tepMethodemp();
    this.deptService.getAllHolding().subscribe(s=>{
     
        this.holdingList = s;
        this.deptForm.get('holdingId').setValue(this.holdingList[0].gHoldingId);
      this.selectHolding(this.holdingList[0].gHoldingId) 
    });    

    if(this.deptForm.value.deptId){
      this.deptService.getDeptById(this.deptForm.value.deptId).subscribe(success=>{
        var s:any = success;
        this.deptForm.patchValue(s.data);
        this.selectHolding(s.data.holdingId);
        this.obj.companyId = s.data.companyId;
        s.data.isActive=='Y' ? this.deptForm.get('status').setValue('ACTIVE') : this.deptForm.get('status').setValue('INACTIVE');   
        if(this.isView){ this.deptForm.disable(); }
      });
    }
    else{
      this.deptForm.get('status').setValue("ACTIVE")
    }
  }

  selectHolding(holdingId){
    this.deptService.getAllCompaniesByHoldingId(holdingId).subscribe(s=>{
        this.companyList = s;
        if(this.deptForm.value.deptId){
          this.selectedEmpList = this.companyList.filter(o1 => this.obj.companyId.some(o2 => o1.gCompanyId === o2));
        }
        
    });
  }

  addUpdateDept(){

    let compList: any = this.setCompanyList(this.selectedEmpList)
    this.deptForm.get('createdBy').setValue(1);
    this.deptForm.get('created').setValue(new Date());
    this.deptForm.get('updatedBy').setValue(1);
    this.deptForm.get('updated').setValue(new Date());
    this.deptForm.get('companyId').setValue(compList);
    this.deptForm.value.status=="ACTIVE" ? this.deptForm.get('isActive').setValue('Y'):this.deptForm.get('isActive').setValue('N');
    
// console.log(JSON.stringify(this.deptForm.value))
    this.submitted = true;
    if (this.deptForm.invalid) {
      return;
    } else{
     
      
      this.deptService.addUpdateDept(this.deptForm.value).subscribe(success=>{
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
    this.router.navigate(['/views/masters/dept/dept-summary']);
  }

  selectedEmpList = [];
  dropdownSettings: IDropdownSettings;// = {

  tepMethodemp(){
  this.dropdownSettings = {
    singleSelection: false,
    idField: 'gCompanyId',
    textField: 'name',
    selectAllText: 'Select All',
    unSelectAllText: 'UnSelect All',
    itemsShowLimit: 5,
    allowSearchFilter: true
  };
}

  onEmployeeSelect(item: any) {
    
    this.selectedEmpList.push(item);
    
  }

  onEmployeeDeSelect(items: any) {
    this.selectedEmpList = this.selectedEmpList.filter(item => item.gCompanyId !== items.gCompanyId);
  }

  onSelectAllEmployee(items: any) {
    this.selectedEmpList = [];
    this.selectedEmpList.push(...[items]);
  }

  setCompanyList(list) {
    let elm: any = [];
    list.forEach(element => {
      elm.push(element.gCompanyId);
    });
    let unique = [...new Set(elm)];
    return unique;
  }


}
