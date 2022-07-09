import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'src/app/views/services/toastr.service';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CompanyService } from '../../company/company.service';
import { CurrencyService } from '../currency.service';
import { IDropdownSettings } from 'ng-multiselect-dropdown';

@Component({
  selector: 'app-add-currency',
  templateUrl: './add-currency.component.html',
  styleUrls: ['./add-currency.component.scss']
})
export class AddCurrencyComponent implements OnInit {

  currencyForm: any;
  submitted = false;

  isView: boolean = false;
  holdingList: any = [];
  companyList:any=[];
  parentUrl: any;
  obj={ companyId:null }
  statusList: any = [{ valueCode: 'ACTIVE', valueName: 'Active' }, { valueCode: 'INACTIVE', valueName: 'Inactive' }]

  constructor(private toastService: ToastrService, private activatedRoute: ActivatedRoute, 
    private currencyService: CurrencyService, private router: Router) {
    this.currencyForm = new FormGroup({
      currencyId: new FormControl(null),
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
      isoCode: new FormControl(null, [Validators.required]),
      curSymbol:new FormControl(null, [Validators.required])
    });

    this.activatedRoute.queryParams.subscribe(params => {
      this.currencyForm.controls['currencyId'].setValue(params.id);
      this.isView = params.view;
      this.parentUrl = params.parentUrl;
    });

  }

  get f() { return this.currencyForm.controls; }

  ngOnInit() {
    this.companySetting();
    this.currencyService.getAllHolding().subscribe(success => {
      this.holdingList = success;
      this.currencyForm.controls['holdingId'].setValue(this.holdingList[0].gHoldingId);
      this.selectHolding(this.holdingList[0].gHoldingId)

    });

    if (this.currencyForm.value.currencyId) {
      this.currencyService.getCurrencyById(this.currencyForm.value.currencyId).subscribe(success => {
        var s: any = success;
        this.currencyForm.patchValue(s.data);
        this.obj.companyId = s.data.companyId;
        this.selectHolding(s.data.holdingId);
        s.data.isActive == 'Y' ? this.currencyForm.get('status').setValue("ACTIVE") : this.currencyForm.get('status').setValue("INACTIVE");
        if (this.isView) { this.currencyForm.disable(); }
      });
    } else{
      this.currencyForm.controls['status'].setValue("ACTIVE");
    }
  }

  selectHolding(holdingId){
    this.currencyService.getCompanyById(holdingId).subscribe(success=>{
        this.companyList = success;
        if(this.currencyForm.value.currencyId){
          this.selectedCompanyList = this.companyList.filter(o1 => this.obj.companyId.some(o2 => o1.gCompanyId === o2));
        }
        
    });
  }

  addUpdateCurrency() {

    this.currencyForm.get('createdBy').setValue(Number(sessionStorage.getItem('userId')));
    this.currencyForm.get('created').setValue(new Date());
    this.currencyForm.get('updatedBy').setValue(Number(sessionStorage.getItem('userId')));
    this.currencyForm.get('updated').setValue(new Date());
    this.currencyForm.value.status=="ACTIVE" ? this.currencyForm.get('isActive').setValue('Y') : this.currencyForm.get('isActive').setValue('N');
    let compList: any = this.setCompanyList(this.selectedCompanyList)
    this.currencyForm.controls['companyId'].setValue(compList);
      

    this.submitted = true;
    if (this.currencyForm.invalid) {
      return;
    } else {

      this.currencyService.addUpdateCurrency(this.currencyForm.value).subscribe(success => {
        var s: any = success;
        if(s.code==0){
          this.toastService.showToast('danger', s.message);  
        } else{
          this.toastService.showToast('success', s.message);
          this.back();
        }

      });
    }
  }

  back() {
    if (this.parentUrl) {
      this.router.navigate([this.parentUrl]);
    } else {
      this.router.navigate(["/views/masters/currency/currency-summary"]);
    }

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
