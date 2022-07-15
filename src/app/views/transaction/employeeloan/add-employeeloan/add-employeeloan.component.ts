import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularMyDatePickerDirective, IMyDateModel } from 'angular-mydatepicker';
import { CommonService, GeneralListCode } from 'src/app/views/services/common.service';
import { ToastrService } from 'src/app/views/services/toastr.service';
import { EmployeeloanService } from '../employeeloan.service';

@Component({
  selector: 'app-add-employeeloan',
  templateUrl: './add-employeeloan.component.html',
  styleUrls: ['./add-employeeloan.component.scss']
})
export class AddEmployeeloanComponent implements OnInit {
  emploanForm:FormGroup;
  isView:boolean=false;
  holdingList: any = [];
  companyList:any=[];
  parentUrl: any;
  submitted:boolean=false;
  employeeList: any;
  payitemList: any;
  loanLineList:any=[];
  statusList: any = [{ valueCode: 'ACTIVE', valueName: 'Active' }, { valueCode: 'INACTIVE', valueName: 'Inactive' }]
  pauseform:any;
  advPaymentform:any;
  payModeList:any=[];
  public myDatePickerOptions = this.commonService.datepickerFormat;
  @ViewChild('dp1', {static: false}) myDp1: AngularMyDatePickerDirective;
  @ViewChild('dp2', {static: false}) myDp2: AngularMyDatePickerDirective;
  @ViewChild('dp3', {static: false}) myDp3: AngularMyDatePickerDirective;
  @ViewChild('dp4', {static: false}) myDp4: AngularMyDatePickerDirective;
  @ViewChild('dp5', {static: false}) myDp5: AngularMyDatePickerDirective;
  @ViewChild('dp6', {static: false}) myDp6: AngularMyDatePickerDirective;

  selectedItems: Array<any> = [];
dropdownSettings: any = {};
moduleid:any;
redirectfromdashboard:any;

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
  this.emploanForm.controls['xEmployeeId'].setValue(item.employeeId);
}
onSelectAll(items: any) {
  console.log('onSelectAll', items);
}

  constructor(private cdr: ChangeDetectorRef,private commonService:CommonService,private toastService:ToastrService,private employeeloanService:EmployeeloanService,private router:Router, private activatedRoute:ActivatedRoute) { 
    
    this.emploanForm = new FormGroup({

    lEmploanId: new FormControl(null),
    employee: new FormControl(null),
		companyId: new FormControl(null),
		holdingId: new FormControl(null),
    isActive: new FormControl(null),
    status: new FormControl(null),
		created: new FormControl(null),
		createdBy: new FormControl(null),
		updated: new FormControl(null),
		updatedBy: new FormControl(null),
		documentno: new FormControl(null),
		xEmployeeId: new FormControl(null),
		description: new FormControl(null),
    loandate: new FormControl(null),
    lndate: new FormControl(null),
    loandate1: new FormControl(null),
    paymentdate: new FormControl(null),
    pdate: new FormControl(null),
    paymentdate1: new FormControl(null),
		loanamount: new FormControl(null,[Validators.required,Validators.minLength(4)]),
    startdate: new FormControl(null),
    stdate: new FormControl(null),
    startdate1: new FormControl(null),
    enddate: new FormControl(null),
    endate: new FormControl(null),
    enddate1: new FormControl(null),
		interestrate: new FormControl(0),
		installmentamount: new FormControl(null),
		installments: new FormControl(null),
    lastdate: new FormControl(null),
    lstdate: new FormControl(null),
    lastdate1: new FormControl(null),
		xPayitemId: new FormControl(null),
		remarks: new FormControl(null),
		balance: new FormControl(0),
    approvalstatus: new FormControl(null),
    g_APPROVALREQ_ID: new FormControl(null),
    addAsEarning : new FormControl(null),
    addAsEarning1 : new FormControl(null),
    });

    this.pauseform = new FormGroup({
      lEmploanlineId: new FormControl(null),
      updatedBy:new FormControl(null),
      lEmploanId: new FormControl(null),
      isActive: new FormControl(null),
      remarks: new FormControl(null),
      month: new FormControl(null)
    });

    this.advPaymentform = new FormGroup({
      lEmploanlineId: new FormControl(null),
      lEmploanId: new FormControl(null),
      isActive: new FormControl("Y"),
      remarks: new FormControl(null),
      lspaymentModeId:new FormControl(null),
      IpaidDate:new FormControl(null),
      ipaymentdate1:new FormControl(null),
      paidinstallmentamt:new FormControl(null),
      paymentrefNo:new FormControl(null),
    });

    this.activatedRoute.queryParams.subscribe(params => {
      this.emploanForm.controls['lEmploanId'].setValue(params.id);
      this.isView = params.view;
      this.moduleid = params.moduleid;
      this.redirectfromdashboard = params.redirectfromdashboard;
    });

  }


  toggleCalendar(): void {
    this.cdr.detectChanges();
    this.myDp1.toggleCalendar();
  }
  changeloanDate(event){
    this.emploanForm.get('lndate').setValue(this.commonService.dateFormat(event.singleDate.jsDate));
  }
  changePaymenyDate(event){
    this.emploanForm.get('pdate').setValue(this.commonService.dateFormat(event.singleDate.jsDate));
  }
  changeEndDate(event){
    this.emploanForm.get('endate').setValue(this.commonService.dateFormat(event.singleDate.jsDate));
  }

  changeStartDate(event){
    this.emploanForm.get('stdate').setValue(this.commonService.dateFormat(event.singleDate.jsDate));
  }
  
  changeLastDate(event){
    this.emploanForm.get('lstdate').setValue(this.commonService.dateFormat(event.singleDate.jsDate));
  }

  ngOnInit() {
    this.tepMethod();
    this.getHoldingList();
  //  this.getEmployeeList();
    this.getPayitemListByType();
    this.getPaymentmodeList();
    if(this.emploanForm.value.lEmploanId){
      this.getLoanLinesById(this.emploanForm.value.lEmploanId);
      this.employeeloanService.getEmploanDetailsById(this.emploanForm.value.lEmploanId).subscribe(s=>{
        var success:any = s;
        this.selectcompany(success.data.companyId)
        let loandate: Date = new Date(success.data.loandate);
        let txDateModel: IMyDateModel = {isRange: false, singleDate: {jsDate: loandate}, dateRange: null};
        this.emploanForm.controls['loandate1'].setValue(txDateModel);
       

        let paymentdate: Date = new Date(success.data.paymentdate);
        let rejoindateModel: IMyDateModel = {isRange: false, singleDate: {jsDate: paymentdate}, dateRange: null};
        this.emploanForm.controls['paymentdate1'].setValue(rejoindateModel);
        
        let startDate: Date = new Date(success.data.startdate);
        let startdateModel: IMyDateModel = {isRange: false, singleDate: {jsDate: startDate}, dateRange: null};
        this.emploanForm.controls['startdate1'].setValue(startdateModel);
        
        let endDate: Date = new Date(success.data.enddate);
        let toModel: IMyDateModel = {isRange: false, singleDate: {jsDate: endDate}, dateRange: null};
        this.emploanForm.controls['enddate1'].setValue(toModel);
        
        let lastdate: Date = new Date(success.data.lastdate);
        let lastdateModel: IMyDateModel = {isRange: false, singleDate: {jsDate: lastdate}, dateRange: null};
        this.emploanForm.controls['lastdate1'].setValue(lastdateModel);

        success.data.addAsEarning =='Y' ?  this.emploanForm.get('addAsEarning1').setValue(true) :this.emploanForm.get('addAsEarning1').setValue(false);

        this.getCOmpanyById(success.data.holdingId);
        this.emploanForm.patchValue(success.data);
        this.emploanForm.get('lndate').setValue(success.data.loandate);
        this.emploanForm.get('stdate').setValue(success.data.startdate);
        success.data.isActive == 'Y' ? this.emploanForm.get('status').setValue("ACTIVE") : this.emploanForm.get('status').setValue("INACTIVE");
        if (this.isView) { this.emploanForm.disable(); }
        if(success.data.isActive=='Y'){
          this.emploanForm.disable();
        }

        

      });
    } else {
      this.emploanForm.controls['status'].setValue('ACTIVE');
     // this.emploanForm.get('documentno').setValue("LN"+Math.floor(1000 + Math.random() * 9000));
    }
  }

  getEmployeeList(cmpList){
    let l:any = [Number(cmpList)]//sessionStorage.getItem("company");
    
    this.employeeloanService.getEmployeeList(this.moduleid,l).subscribe(s=>{
      this.employeeList = s;
      if(this.emploanForm.value.lEmploanId && this.emploanForm.value.xEmployeeId){
        let list = this.employeeList.filter(item => item.employeeId == this.emploanForm.value.xEmployeeId);
        if(list.length>0){
          this.selectedItems=[{'employeeId':list[0].employeeId,'displayName':list[0].displayName}];
        }
      }
    })
  }

  getLoanLinesById(id){
    this.employeeloanService.getLoanLinesById(id).subscribe(s=>{
      this.loanLineList = s;
    })
  }

  get f() { return this.emploanForm.controls; }
 

  getPayitemListByType(){
    this.employeeloanService.getPayitemListByType().subscribe(s=>{
      var success:any = s;
      this.payitemList = success.data;
    })
  }

  getCOmpanyById(id) {
    this.employeeloanService.getCompanyById(id).subscribe(s=>{
      this.companyList=s;
      if(this.companyList){
        let list:any = JSON.parse(sessionStorage.getItem("company"));
        var l:any=[];
        if(list){
        for(var i=0;i<list.length;i++){
            l.push(Number(list[i]));
        }}
      
      this.companyList = this.companyList.filter(o1 => l.some(o2 => o1.gCompanyId === o2));
    }
    });
  }
  getHoldingList() {
    this.employeeloanService.getAllHolding().subscribe(s=>{
      this.holdingList = s;
      if(this.emploanForm.value.bankId){} else{
        this.emploanForm.controls['holdingId'].setValue(this.holdingList[0].gHoldingId);
        this.getCOmpanyById(this.holdingList[0].gHoldingId);
      }
    })
  } 
  addUpdateEmploan(){
    
    this.emploanForm.get('createdBy').setValue(Number(sessionStorage.getItem('userId')));
    this.emploanForm.get('created').setValue(new Date());
    this.emploanForm.get('updatedBy').setValue(Number(sessionStorage.getItem('userId')));
    this.emploanForm.get('updated').setValue(new Date());
    this.emploanForm.value.status=="ACTIVE" ? this.emploanForm.get('isActive').setValue('Y') : this.emploanForm.get('isActive').setValue('N');
    
    this.emploanForm.value.addAsEarning1  ?  this.emploanForm.get('addAsEarning').setValue('Y') :this.emploanForm.get('addAsEarning').setValue('N');

    this.emploanForm.get('companyId').setValue(Number(this.emploanForm.value.companyId));
    this.emploanForm.get('xEmployeeId').setValue(Number(this.emploanForm.value.xEmployeeId));
    this.emploanForm.get('xPayitemId').setValue(Number(this.emploanForm.value.xPayitemId));
   
    this.emploanForm.get('installmentamount').setValue(parseFloat(this.emploanForm.value.installmentamount));
    this.emploanForm.get('interestrate').setValue(parseFloat(this.emploanForm.value.interestrate));
    this.emploanForm.get('loanamount').setValue(parseFloat(this.emploanForm.value.loanamount));
    this.emploanForm.get('balance').setValue(Number(this.emploanForm.value.balance));
    this.emploanForm.get('installments').setValue(Number(this.emploanForm.value.installments));
   


    this.submitted = true;
    if (this.emploanForm.invalid) {
      return;
    } else { 
      this.employeeloanService.saveUpdateEmploan(this.emploanForm.value).subscribe(success=>{
        var s: any = success;
        if(s.code==0){
          this.toastService.showToast('danger', s.message);
        }else{
        this.toastService.showToast('success', s.message);
        this.back();}
      })
    }
  }

  back() {
    if(this.redirectfromdashboard=="Y"){
      this.router.navigate(["/dashboard/analytics"]);
    }else{
      this.router.navigate(["/views/transaction/emp-loan/employeeloan-summary"]);
    }
      
  }

  calInstallAmt(){
    if(this.emploanForm.value.loanamount && this.emploanForm.value.installments){
      let instllmentAmt = this.emploanForm.value.loanamount / this.emploanForm.value.installments;

      this.emploanForm.get('installmentamount').setValue(instllmentAmt.toFixed(2));
    } else{
      this.emploanForm.get('installmentamount').setValue(0);
    }
  }

  pauseInstallment(){
    this.pauseform.get('month').setValue(undefined);
    this.employeeloanService.pauseInstallment(this.pauseform.value).subscribe(data=>{
      var s: any = data;
      this.toastService.showToast('success', s.message);
      this.getLoanLinesById(this.emploanForm.value.lEmploanId);

    });
  }

  repaymentAmt(){

    this.advPaymentform.get('lspaymentModeId').setValue(Number(this.advPaymentform.value.lspaymentModeId));
    this.advPaymentform.get('paidinstallmentamt').setValue(Number(this.advPaymentform.value.paidinstallmentamt));
    this.pauseform.get('isActive').setValue("N");

    this.employeeloanService.repayment(this.advPaymentform.value).subscribe(data=>{
      var s: any = data;
      this.toastService.showToast('success', s.message);
      this.getLoanLinesById(this.emploanForm.value.lEmploanId);
    });
  }

  getPaymentmodeList(){
    this.commonService.getGeneralListByCode(GeneralListCode.PAYMENT_MODE_LIST).subscribe(data=>{
      this.payModeList=data;
    })
    }

    pausetext:string;
  openPauseForm(data){
    this.pausetext = data.isActive=="Y" ? "Pause" : "Unpause";
    this.pauseform.reset();
    this.pauseform.get('lEmploanlineId').setValue(Number(data.lEmploanlineId));
    this.pauseform.get('lEmploanId').setValue(Number(data.lEmploanId));
    this.pauseform.get('isActive').setValue(data.isActive=="N" ? "Y" : "N");
    this.pauseform.get('month').setValue(this.commonService.dateFormat(new Date()));
    this.pauseform.get('updatedBy').setValue(Number(sessionStorage.getItem('userId')));
  }

  changeRepaymentDate(event){
    this.advPaymentform.get('IpaidDate').setValue(this.commonService.dateFormat(event.singleDate.jsDate));
  }

  openAdvPayForm(data,repaymentpopup){
    if(data.lspaymentModeId!=null){
        this.employeeloanService.getemploanlnbyloanlineid(data.lEmploanlineId).subscribe(data1=>{
            var response:any = data1;
            if(response.code ==0){
              this.toastService.showToast('danger', "Payment already done in "+new Date(data.loandate).toString().split(' ')[1]);
            } else{
                repaymentpopup.show();
                this.advPaymentform.get('lEmploanlineId').setValue(response.data.lEmploanlineId);
                this.advPaymentform.get('lEmploanId').setValue(response.data.lEmploanId);
                this.advPaymentform.get('isActive').setValue("Y");
                this.advPaymentform.get('remarks').setValue(response.data.remarks);
                this.advPaymentform.get('paymentrefNo').setValue(response.data.paymentrefNo);
                this.advPaymentform.get('lspaymentModeId').setValue(response.data.lspaymentModeId);
                this.advPaymentform.get('paidinstallmentamt').setValue(response.data.paidinstallmentamt);

                let endDate: Date = new Date(response.data.ipaidDate);
                let toModel: IMyDateModel = {isRange: false, singleDate: {jsDate: endDate}, dateRange: null};
                this.advPaymentform.controls['ipaymentdate1'].setValue(toModel);
                this.changeRepaymentDate(toModel);
            }
        });

    } else{
    repaymentpopup.show();
    this.advPaymentform.reset();
    this.advPaymentform.get('lEmploanlineId').setValue(Number(data.lEmploanlineId));
    this.advPaymentform.get('lEmploanId').setValue(Number(data.lEmploanId));
    this.advPaymentform.get('isActive').setValue("Y");

    let endDate: Date = new Date();
    let toModel: IMyDateModel = {isRange: false, singleDate: {jsDate: endDate}, dateRange: null};
    this.advPaymentform.controls['ipaymentdate1'].setValue(toModel);
    this.changeRepaymentDate(toModel);
  }
  }
  
  selectcompany(id)
  {
    this.getEmployeeList(id);
  }


}
