import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonService, GeneralListCode } from 'src/app/views/services/common.service';
import { ToastrService } from 'src/app/views/services/toastr.service';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-emp-bank',
  templateUrl: './emp-bank.component.html',
  styleUrls: ['./emp-bank.component.scss']
})
export class EmpBankComponent implements OnInit {
 // countryList: any = [{ valueCode: 1, valueName: "United Arab Emirates" }];
 countryList: any =[];
 cityList: any =[];
  enableFilter:boolean=false;
  bankForm:any;

  @Input() empId: string;
  @Input() companyId:string;
  @Input() holdingId:string;
  @Input() displayName:string;
  bankId:any;
  banksubmitted = false;
  
  regionList:any=[];
  //cityList:any=[];
  empbankList:any =[];
  statusList: any = [{ valueCode: 'ACTIVE', valueName: 'Active' }, { valueCode: 'INACTIVE', valueName: 'Inactive' }];
  isOpenBankAccount:boolean = false;
  bankList:any;
  employeeBankList:any=[];
  constructor(private cdr: ChangeDetectorRef, private toastService:ToastrService,private empService:EmployeeService,private router:Router, public commonService:CommonService) 
  { 
    this.bankForm = new FormGroup({
    empName: new FormControl(null),
    xEmpbankId: new FormControl(null),
		xEmployeeId: new FormControl(null),
	  gCompanyId: new FormControl(null),
		gHoldingId: new FormControl(null),
    isActive: new FormControl(null),
    status: new FormControl(null),
		created: new FormControl(null),
		createdBy: new FormControl(null),
		updated: new FormControl(null),
		updatedBy: new FormControl(null),
		xBankId: new FormControl(null),
		empibanno: new FormControl(null,[Validators.required]),
		routingno: new FormControl(null),
		swiftcode: new FormControl(null),
		empnameinbank: new FormControl(null),
		empbankbranch: new FormControl(null),
		empbankcity: new FormControl(null),
		empexchaneacno: new FormControl(null),
		xCountryId: new FormControl(null),
    xCurrencyId: new FormControl(null),
    empaccountno:new FormControl(null,[Validators.required])
    });
  }

  ngOnInit() {
      this.bankForm.get('empName').setValue(this.displayName);
      this.bankForm.get('xEmployeeId').setValue(this.empId);
      this.bankForm.get('gHoldingId').setValue(this.holdingId);
      this.bankForm.get('gCompanyId').setValue(this.companyId);
      this.getAllBank(this.companyId);
      this.getEmpBankByEmpId(this.bankForm.get('xEmployeeId').value);
      this.getAllCurrency();
      this.getCountryList();
      this.getCityList();
  }
  getCountryList(){
    this.commonService.getGeneralListByCode(GeneralListCode.COUNTRY_LIST).subscribe(data=>{
      this.countryList=data;
    })
    }

    getCityList(){
      this.commonService.getGeneralListByCode(GeneralListCode.CITY_LIST).subscribe(data=>{
        this.cityList=data;
      })
      }

  getEmpBankByEmpId(id) {
    if(id){
      this.empService.getEmpBankByEmpId(id).subscribe(success=>{
        this.employeeBankList = success; 
      });
    }
  }

  getAllBank(companyId){
    this.empService.getAllBank([typeof companyId == 'number' ? companyId : Number(companyId)]).subscribe(success=>{
      this.bankList=success;
    });
  }

  get pi() { return this.bankForm.controls; };
  addUpdateEmpBank() {
    this.bankForm.get('createdBy').setValue(Number(sessionStorage.getItem("userId")));
    this.bankForm.get('created').setValue(new Date());
    this.bankForm.get('updatedBy').setValue(Number(sessionStorage.getItem("userId")));
    this.bankForm.get('updated').setValue(new Date());
    this.bankForm.get('gCompanyId').setValue(this.companyId);
    this.bankForm.get('gHoldingId').setValue(this.holdingId);
    this.bankForm.get('xEmployeeId').setValue(Number(this.empId));

    this.bankForm.get('xCurrencyId').setValue(Number(this.bankForm.value.xCurrencyId));

    this.bankForm.get('xBankId').setValue(Number(this.bankForm.value.xBankId));
    this.bankForm.get('xCountryId').setValue(Number(this.bankForm.value.xCountryId));

    if(this.bankForm.value.xEmpbankId){
      this.bankForm.get('xEmpbankId').setValue(Number(this.bankForm.value.xEmpbankId));
    } else{
      this.bankForm.get('xEmpbankId').setValue(undefined);
    }
    
    this.bankForm.value.status=='ACTIVE' ? this.bankForm.get('isActive').setValue('Y') : this.bankForm.get('isActive').setValue('N');
    this.banksubmitted = true;
    if (this.bankForm.invalid) {
      return;
    } else{

    this.empService.saveEmpBank(this.bankForm.value).subscribe(s=>{
      var success:any = s;
      this.toastService.showToast('success', success.message);
      this.isOpenBankAccount=false;
      this.bankId=undefined;
      this.getEmpBankByEmpId(this.empId);
    });
  }
  }

  add(){
    this.bankForm.reset();
    this.isOpenBankAccount=true;
    this.bankForm.get('empName').setValue(this.displayName);
    this.bankForm.get('status').setValue('ACTIVE');
    this.getAllCurrency();
  }

  getDataUsingRedioBtn(data){
        this.bankId = data.xEmpbankId;
  }

  edit(){
    
    this.getAllBank(this.companyId);    
    if(this.bankId){
      this.empService.getEmpBankById(this.bankId).subscribe(s=>{
        var success:any = s;
        this.bankForm.patchValue(success.data);
        this.isOpenBankAccount=true;
        this.bankId = success.data.xEmpbankId;
        this.bankForm.controls['value'].setValue(this.displayName);
        success.data.isActive=='Y' ? this.bankForm.get('status').setValue("ACTIVE") : this.bankForm.get('status').setValue("INACTIVE"); 
      })
    }
  }
  currencyList:any=[];
  getAllCurrency(){
    this.empService.getAllCurrency().subscribe(s=>{
        this.currencyList = s;
    });
  }

 
}
