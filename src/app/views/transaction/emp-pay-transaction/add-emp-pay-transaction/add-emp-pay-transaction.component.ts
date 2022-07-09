import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularMyDatePickerDirective, IMyDateModel } from 'angular-mydatepicker';
import { CommonService } from 'src/app/views/services/common.service';
import { ToastrService } from 'src/app/views/services/toastr.service';
import { EmpPayTransactionService } from '../emp-pay-transaction.service';


@Component({
  selector: 'app-add-emp-pay-transaction',
  templateUrl: './add-emp-pay-transaction.component.html',
  styleUrls: ['./add-emp-pay-transaction.component.scss']
})
export class AddEmpPayTransactionComponent implements OnInit {

  emppaytransactionForm: FormGroup;
  submitted = false;
  isView: boolean = false;
  holdingList: any = [];
  companyList: any = [];
  employeeList:any=[];
  statusList: any = [{ valueCode: 'ACTIVE', valueName: 'Active' }, { valueCode: 'VOID', valueName: 'Void' }]
  payitemList:any =[];
  e: any;
  moduleid:any;
  public myDatePickerOptions = this.commonService.datepickerFormat;
  @ViewChild('dp1', {static: false}) myDp1: AngularMyDatePickerDirective;
  @ViewChild('dp2', {static: false}) myDp2: AngularMyDatePickerDirective;
  


  
selectedItems: Array<any> = [];
dropdownSettings: any = {};


tepMethod(){
  this.dropdownSettings = {
      singleSelection: true,
      idField: 'employeeId',
      textField: 'displayName',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true
  };
}

onItemSelect(item: any) {
  this.emppaytransactionForm.controls['xEmployeeId'].setValue(item.employeeId);
}
onSelectAll(items: any) {
  console.log('onSelectAll', items);
}

  constructor(private toastService: ToastrService, private cdr: ChangeDetectorRef,private commonService:CommonService,private activatedRoute: ActivatedRoute,
    private empPayTransService: EmpPayTransactionService, private router: Router) {
    this.emppaytransactionForm = new FormGroup({
      lPaytransactionId: new FormControl(null),
      gCompanyId: new FormControl(null),
      gHoldingId: new FormControl(null),
      status: new FormControl(null),
      isActive: new FormControl(null),
      created: new FormControl(null),
      createdBy: new FormControl(null),
      updated: new FormControl(null),
      updatedBy: new FormControl(null),
      documentno: new FormControl(null),
      daterx: new FormControl(null), 
      employee: new FormControl(null),
      transactionDate1: new FormControl(null),
      xEmployeeId: new FormControl(null),
      description: new FormControl(null),
      xPayitemId: new FormControl(null),
      effectivedate: new FormControl(null),
      effectiveDate1: new FormControl(null),
      amount: new FormControl(null),
      processed: new FormControl(null),
      remarks: new FormControl(null),
      lPayrollJournalId: new FormControl(null),
      lEmpLoanId: new FormControl(null),
      processing: new FormControl(null),
       paytype: new FormControl(null),
       trxdate: new FormControl(null),
      effdate: new FormControl(null),
      otHrs: new FormControl(null),
    }); 
    this.activatedRoute.queryParams.subscribe(params => {
      this.emppaytransactionForm.controls['lPaytransactionId'].setValue(params.id);
      this.isView = params.view;
      this.moduleid = params.moduleid;
    });
  }

  toggleCalendar(): void {
    this.cdr.detectChanges();
    this.myDp1.toggleCalendar();
  }
  changeStartDate(event){
    this.emppaytransactionForm.get('trxdate').setValue(this.commonService.dateFormat(event.singleDate.jsDate));
  }
  changeEndDate(event){
    this.emppaytransactionForm.get('effectivedate').setValue(event.singleDate.jsDate);
    this.emppaytransactionForm.get('effdate').setValue(this.commonService.dateFormat(event.singleDate.jsDate));
  }
  

  ngOnInit() {
    this.tepMethod();
    this.getHoldingList();
    this.getPayitemList();
  //  this.getEmployeeList();
    if (this.emppaytransactionForm.value.lPaytransactionId) {
      this.empPayTransService.getEmppaytransactionById(this.emppaytransactionForm.value.lPaytransactionId).subscribe(success => {
        var s: any = success;
        this.emppaytransactionForm.patchValue(s.data);
      //  this.getCompanyListByHoldingId(s.data.holdingId);
        this.selectcompany(s.data.gCompanyId)
        let startDate: Date = new Date(s.data.daterx);
        let fromModel: IMyDateModel = {isRange: false, singleDate: {jsDate: startDate}, dateRange: null};
        this.emppaytransactionForm.controls['transactionDate1'].setValue(fromModel);
        let endDate: Date = new Date(s.data.effectivedate);
        let toModel: IMyDateModel = {isRange: false, singleDate: {jsDate: endDate}, dateRange: null};
        this.emppaytransactionForm.controls['effectiveDate1'].setValue(toModel);
        
        s.data.status == 'Y' ? this.emppaytransactionForm.get('isActive').setValue("ACTIVE") : this.emppaytransactionForm.get('isActive').setValue("VOID");
        if (this.isView) { this.emppaytransactionForm.disable(); }
      });
    } else {
      this.emppaytransactionForm.get('isActive').setValue("ACTIVE");
      // this.emppaytransactionForm.get('documentno').setValue("EPT"+Math.floor(1000 + Math.random() * 9000));
    }

  }
  get f() { return this.emppaytransactionForm.controls; }

  getEmployeeList(cmpList){
    let l:any = [Number(cmpList)]//sessionStorage.getItem("company");
    
    this.empPayTransService.getAllEmployee(this.moduleid,l).subscribe(s=>{
      this.employeeList=s;
      if(this.emppaytransactionForm.value.lPaytransactionId && this.emppaytransactionForm.value.xEmployeeId){
        let list = this.employeeList.filter(item => item.employeeId == this.emppaytransactionForm.value.xEmployeeId);
        if(list.length>0){
          this.selectedItems=[{'employeeId':list[0].employeeId,'displayName':list[0].displayName}];
        }
      }
    });
  }

  getPayitemList(){
    this.empPayTransService.getAllPayitemList().subscribe(sucess=>{
        var s:any=sucess;
        this.payitemList = s.data;
    });
  }

  changePayitem(id){
    let payitemObj =  this.payitemList.find(t=>t.payItemId ==id);
    this.emppaytransactionForm.get('paytype').setValue(payitemObj.payType);
  }

  getCompanyListByHoldingId(holdingId: any) {
    this.empPayTransService.getCompanyListByHoldingId(holdingId).subscribe(s => {
      this.companyList = s;
      if(this.companyList){

        let list:any =JSON.parse(sessionStorage.getItem("company"));
        var l:any=[];
        for(var i=0;i<list.length;i++){
         // if(list[i]!=','){
            l.push(Number(list[i]));
          // }
        }
      
      this.companyList = this.companyList.filter(o1 => l.some(o2 => o1.gCompanyId === o2));
    }
    });
  }

  getHoldingList() {
    this.empPayTransService.getHoldingList().subscribe(s => {
      this.holdingList = s;
      this.emppaytransactionForm.get('gHoldingId').setValue(this.holdingList[0].gHoldingId);
      this.getCompanyListByHoldingId(this.holdingList[0].gHoldingId)
    });
  }

  addUpdateEmpPayTransaction() {

    // if(this.emppaytransactionForm.value.startDate==null){
    //   this.emppaytransactionForm.get('daterx').setValue(this.emppaytransactionForm.value.transactionDate1.singleDate.jsDate);
    // }
    // if(this.emppaytransactionForm.value.endDate==null){
    //   this.emppaytransactionForm.get('effectivedate').setValue(this.emppaytransactionForm.value.effectiveDate1.singleDate.jsDate);
    // }

    this.emppaytransactionForm.get('amount').setValue(Number(this.emppaytransactionForm.value.amount));
    this.emppaytransactionForm.get('createdBy').setValue(Number(sessionStorage.getItem('userId')));
    this.emppaytransactionForm.get('created').setValue(new Date());
    this.emppaytransactionForm.get('updatedBy').setValue(Number(sessionStorage.getItem('userId')));
    this.emppaytransactionForm.get('updated').setValue(new Date());
    
    this.emppaytransactionForm.get('gCompanyId').setValue(Number(this.emppaytransactionForm.value.gCompanyId));
    this.emppaytransactionForm.get('xEmployeeId').setValue(Number(this.emppaytransactionForm.value.xEmployeeId));
    this.emppaytransactionForm.get('xPayitemId').setValue(Number(this.emppaytransactionForm.value.xPayitemId));
   
    if(this.emppaytransactionForm.value.otHrs){
      this.emppaytransactionForm.get('otHrs').setValue(Number(this.emppaytransactionForm.value.otHrs));
    }
    

    // this.emppaytransactionForm.get('documentno').setValue('DOC');
    this.emppaytransactionForm.get('processed').setValue('Y');
    this.emppaytransactionForm.value.isActive == "ACTIVE" ? this.emppaytransactionForm.get('status').setValue('Y') : this.emppaytransactionForm.get('status').setValue('N');

    this.submitted = true;
    if (this.emppaytransactionForm.invalid) {
      return;
    } else {
      this.empPayTransService.addUpdateEmppaytransaction(this.emppaytransactionForm.value).subscribe(success => {
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
    this.router.navigate(["/views/transaction/emp-pay-transaction/emp-pay-transaction-summary"]);
  }
  selectcompany(id)
  {
    this.getEmployeeList(id);
  }

}
