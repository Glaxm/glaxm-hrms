import { ChangeDetectorRef, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularMyDatePickerDirective, IMyDateModel } from 'angular-mydatepicker';
import { CommonService } from 'src/app/views/services/common.service';
import { ToastrService } from 'src/app/views/services/toastr.service';
import { EmployeeloanService } from 'src/app/views/transaction/employeeloan/employeeloan.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-loan-request',
  templateUrl: './loan-request.component.html',
  styleUrls: ['./loan-request.component.scss']
})
export class LoanRequestComponent implements OnInit {

  @Output() loanRequest = new EventEmitter;
  @Input() companyId: string;
  @Input() holdingId: string;
  @Input() requestId: string;
  @Input() statuscode:string;
  @Input() employeeId:string;

  public myDatePickerOptions = this.commonService.datepickerFormat;
  @ViewChild('dp1', { static: false }) myDp1: AngularMyDatePickerDirective;
  @ViewChild('dp2', { static: false }) myDp2: AngularMyDatePickerDirective;
  @ViewChild('dp3', { static: false }) myDp3: AngularMyDatePickerDirective;
  filePath:any;
  viewform:boolean;
  emploanForm:FormGroup;
  loanHistoryList:any =[];
  payitemList: any=[];
  employeeList: any=[];
  // selectedItems: Array<any> = [];
  // dropdownSettings: any = {};
  // tepMethod() {
  //   this.dropdownSettings = {
  //     singleSelection: true,
  //     idField: 'employeeId',
  //     textField: 'displayName',
  //     selectAllText: 'Select All',
  //     unSelectAllText: 'UnSelect All',
  //     itemsShowLimit: 1,
  //     allowSearchFilter: true
  //   };
  // }
  

  // onItemSelect(item: any) {
  //   this.emploanForm.controls['xEmployeeId'].setValue(item.employeeId);

  // }
  // onSelectAll(items: any) {
  //   console.log('onSelectAll', items);
  // }

  // onEmployeeDeSelect(items: any) {
  //   this.selectedItems = this.selectedItems.filter(item => item.employeeId !== items.employeeId);
  //   this.emploanForm.get('xEmployeeId').setValue(undefined);

  // }

  toggleCalendar(): void {
    this.cdr.detectChanges();
    this.myDp3.toggleCalendar();
  }


  @ViewChild('labelImport',{static:false})
  labelImport: ElementRef;
  fileToUpload: File = null;

  onFileChange(files: FileList) {
    this.labelImport.nativeElement.innerText = Array.from(files)
      .map(f => f.name)
      .join(', ');
    this.emploanForm.get('file').setValue(files.item(0));
    this.loanRequestEvent();
  }

  
  moduleList: any = [];
  moduleid:any;
  flags = {
    createFlag: '',
    editFlag: '',
    readFlag: '',
    deleteFlag: '',
    exportFlag:'',
    importFlag:''
  }

  constructor(private cdr: ChangeDetectorRef,
    private commonService:CommonService,
    private toastService:ToastrService,
    private employeeloanService:EmployeeloanService,
    private router:Router, private activatedRoute:ActivatedRoute) { 
    
    this.emploanForm = new FormGroup({

      lEmploanId: new FormControl(null),
      companyId: new FormControl(null),
      employee: new FormControl(null), 
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
      loanamount: new FormControl(null),
      startdate: new FormControl(null),
      stdate: new FormControl(null),
      startdate1: new FormControl(null),
      enddate: new FormControl(null),
      endate: new FormControl(null),
      enddate1: new FormControl(null),
      interestrate: new FormControl(null),
      installmentamount: new FormControl(null),
      installments: new FormControl(null),
      lastdate: new FormControl(null),
      lstdate: new FormControl(null),
      lastdate1: new FormControl(null),
      xPayitemId: new FormControl(null),
      balance: new FormControl(null),
      requestId:new FormControl(null),
      datetrx: new FormControl(null),
      datetrx1: new FormControl(null),
      fileName: new FormControl(null),
      file: new FormControl(null),
      });
  
    
      this.loanRequest.emit(this.emploanForm.value);
  
   }

  ngOnInit() {
    // this.tepMethod();
    // this.getEmployeeList();
    this.getPayitemListByType();
    this.emploanForm.get('interestrate').setValue(0);
    this.emploanForm.get('xEmployeeId').setValue(this.employeeId);
    
    if(this.requestId){
      this.getLoanDetailsByRequestID(this.requestId);
    }

    this.moduleList = JSON.parse(sessionStorage.getItem("moduleList"));
    if (this.moduleList) {
      this.moduleList.map((e) => {
        if (e.moduleGroup == 'Loan Management' && e.moduleName == 'Employee Loan') {
         this.moduleid=e.moduleId;
          this.flags = { 
                'createFlag': e.createFlag, 
                'editFlag': e.editFlag, 
                'readFlag': e.readFlag, 
                'deleteFlag': e.deleteFlag,
                'importFlag': e.importFlag,
                'exportFlag': e.exportFlag
                };
        }
      });
    }


  }

  changeStartDate(event){
      this.emploanForm.get('stdate').setValue(this.commonService.dateFormat(event.singleDate.jsDate));
  }
  changeEndDate(event){
    this.emploanForm.get('endate').setValue(this.commonService.dateFormat(event.singleDate.jsDate));  
}

getPayitemListByType(){
  this.employeeloanService.getPayitemListByType().subscribe(s=>{
    var success:any = s;
    this.payitemList = success.data;
  })
}

  getLoanDetailsByRequestID(id){
    this.employeeloanService.getLoanDetailsByRequestID(id).subscribe(data=>{
      var s:any = data;
      this.emploanForm.patchValue(s.data[0]);

      if(s.data[0].loandate){
      let datetrx: Date = new Date(s.data[0].loandate);
      let datetrxmodel: IMyDateModel = { isRange: false, singleDate: { jsDate: datetrx }, dateRange: null };
      this.emploanForm.controls['datetrx1'].setValue(datetrxmodel);
      }
      if(s.data[0].startdate){
      let startDate: Date = new Date(s.data[0].startdate);
      let fromModel: IMyDateModel = {isRange: false, singleDate: {jsDate: startDate}, dateRange: null};
      this.emploanForm.controls['startdate1'].setValue(fromModel);
      }

      if(s.data[0].enddate){
      let endDate: Date = new Date(s.data[0].enddate);
      let toModel: IMyDateModel = {isRange: false, singleDate: {jsDate: endDate}, dateRange: null};
      this.emploanForm.controls['enddate1'].setValue(toModel);
      }
      this.filePath = s.data[0].path;
      this.emploanForm.controls['fileName'].setValue(s.data[0].path);

      // if (this.emploanForm.value.xEmployeeId) {
      //   this.selectedItems = [{ 'employeeId': s.data[0].xEmployeeId, 'displayName': s.data[0].empname }];
      // }

      this.emploanForm.disable();
      if(this.emploanForm.value.xEmployeeId){
      this.getLoanHistoryListByEmpId(this.emploanForm.value.xEmployeeId);
    }
    if(this.statuscode=='P'){
        this.emploanForm.controls.startdate1.enable();
        this.emploanForm.controls.enddate1.enable();
        this.emploanForm.controls.startdate.enable();
        this.emploanForm.controls.enddate.enable();
        this.emploanForm.controls.stdate.enable();
        this.emploanForm.controls.endate.enable();
        this.emploanForm.controls.datetrx1.enable();
        this.emploanForm.controls.datetrx.enable();
        this.emploanForm.controls.loanamount.enable();
        this.emploanForm.controls.installments.enable();
        this.emploanForm.controls.installmentamount.enable();
      }
        this.viewform=true;
    })
  }


  getLoanHistoryListByEmpId(id){
      this.employeeloanService.getLoanHistoryListByEmpId(id).subscribe(data=>{
          this.loanHistoryList = data;
      })
  }

  changeTransDate(event) {
    this.emploanForm.get('datetrx').setValue(this.commonService.dateFormat(event.singleDate.jsDate));
  }

  loanRequestEvent(){
    this.emploanForm.get('createdBy').setValue(sessionStorage.getItem('userId'));
    this.emploanForm.get('created').setValue(new Date());
    this.emploanForm.get('updatedBy').setValue(sessionStorage.getItem('userId'));
    this.emploanForm.get('updated').setValue(new Date());
    this.emploanForm.get('holdingId').setValue(this.holdingId);
    this.emploanForm.get('companyId').setValue(this.companyId);
    this.emploanForm.get('isActive').setValue('N');
    this.emploanForm.get('requestId').setValue(this.requestId);
    this.emploanForm.get('xPayitemId').setValue(Number(this.emploanForm.value.xPayitemId));
    this.loanRequest.emit(this.emploanForm.value);
    
  }


  calInstallAmt(){
    if(this.emploanForm.value.loanamount && this.emploanForm.value.installments){
      let instllmentAmt = this.emploanForm.value.loanamount / this.emploanForm.value.installments;
      this.emploanForm.get('installmentamount').setValue(instllmentAmt.toFixed(2));
    } else{
      this.emploanForm.get('installmentamount').setValue(0);
    }
    this.loanRequestEvent();
  }

  // getEmployeeList() {
  //   let list: any = JSON.parse(sessionStorage.getItem("company"));
  //   var l: any = [];
  //   if(list){
  //   for (var i = 0; i < list.length; i++) {

     
  //     l.push(Number(list[i]));
   
  //   }}
  //   this.employeeloanService.getEmployeeList(l).subscribe(s => {
  //     this.employeeList = s;
  //     if (this.employeeList.length == 1) {
  //       this.emploanForm.get('xEmployeeId').setValue(this.employeeList[0].employeeId);
  //       this.selectedItems = [{ 'employeeId': this.employeeList[0].employeeId, 'displayName': this.employeeList[0].displayName }];
  //     }

  //   });
  // }
  openAttachment(){
    if(this.filePath){
      window.open(environment.IMG_URL+this.filePath);
    }
}


}
