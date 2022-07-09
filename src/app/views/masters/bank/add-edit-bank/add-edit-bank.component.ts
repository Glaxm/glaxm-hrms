import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { BankService } from '../bank.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'src/app/views/services/toastr.service';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
@Component({
  selector: 'app-add-edit-bank',
  templateUrl: './add-edit-bank.component.html',
  styleUrls: ['./add-edit-bank.component.scss']
})
export class AddEditBankComponent implements OnInit {

 bankForm:FormGroup;
 isView:boolean=false;
 holdingList: any = [];
 companyList:any=[];
 parentUrl: any;
 submitted:boolean=false;
 statusList: any = [{ valueCode: 'ACTIVE', valueName: 'Active' }, { valueCode: 'INACTIVE', valueName: 'Inactive' }]
 obj={ companyId:null }
  constructor(private toastService:ToastrService,private bankService:BankService,private router:Router, private activatedRoute:ActivatedRoute) { 

    this.bankForm = new FormGroup({
      bankId: new FormControl(null),
      holdingId: new FormControl(null, [Validators.required]),
      isActive: new FormControl(null, [Validators.required]),
      status: new FormControl(null),
      companyId: new FormControl(null),
      company: new FormControl(null, [Validators.required]),
      created: new FormControl(null),
      createdBy: new FormControl(null),
      updated: new FormControl(null),
      updatedBy: new FormControl(null),
      desc: new FormControl(null),
      code: new FormControl(null),
      routingNo: new FormControl(null, [Validators.required]),
      swiftCode:new FormControl(null, [Validators.required]),
      name:new FormControl(null, [Validators.required])
    });

    this.activatedRoute.queryParams.subscribe(params => {
      this.bankForm.controls['bankId'].setValue(params.id);
      this.isView = params.view;
    });


  }

  get f() { return this.bankForm.controls; }

  ngOnInit() {
    this.getHoldingList();
    this.companySetting();
    if(this.bankForm.value.bankId){
      this.bankService.getBankDetailsById(this.bankForm.value.bankId).subscribe(s=>{
        var success:any = s;
        this.getCOmpanyById(success.data.holdingId);
        this.bankForm.patchValue(success.data);
        this.obj.companyId = success.data.companyId;
        success.data.isActive == 'Y' ? this.bankForm.get('status').setValue("ACTIVE") : this.bankForm.get('status').setValue("INACTIVE");
        if (this.isView) { this.bankForm.disable(); }
      });
    } else {
      this.bankForm.controls['status'].setValue('ACTIVE');
    }
  }

  getHoldingList(){
    this.bankService.getAllHolding().subscribe(s=>{
      this.holdingList = s;
      if(this.bankForm.value.bankId){} else{
        this.bankForm.controls['holdingId'].setValue(this.holdingList[0].gHoldingId);
        this.getCOmpanyById(this.holdingList[0].gHoldingId);
      }
    })
  }

  getCOmpanyById(id){
    this.bankService.getCompanyById(id).subscribe(s=>{
      this.companyList=s;
      if(this.bankForm.value.bankId){
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


  addUpdateBank(){
    this.bankForm.get('createdBy').setValue(Number(sessionStorage.getItem('userId')));
    this.bankForm.get('created').setValue(new Date());
    this.bankForm.get('updatedBy').setValue(Number(sessionStorage.getItem('userId')));
    this.bankForm.get('updated').setValue(new Date());
    this.bankForm.value.status=="ACTIVE" ? this.bankForm.get('isActive').setValue('Y') : this.bankForm.get('isActive').setValue('N');
    let compList: any = this.setCompanyList(this.selectedCompanyList)
    this.bankForm.controls['companyId'].setValue(compList);
      

    this.submitted = true;
    if (this.bankForm.invalid) {
      return;
    } else { 
      this.bankService.saveUpdateBank(this.bankForm.value).subscribe(success=>{
        var s: any = success;
        if(s.code==0){
          this.toastService.showToast('danger', s.message);
        } else{
        this.toastService.showToast('success', s.message);
        this.back();}
      })
    }
  }

  back() {
      this.router.navigate(["/views/masters/bank/bank-summary"]);
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
