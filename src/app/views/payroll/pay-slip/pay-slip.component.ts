import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularMyDatePickerDirective, IMyDateModel } from 'angular-mydatepicker';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
import { CommonService, GeneralListCode } from '../../services/common.service';
import { ExcelService } from '../../services/excel.service';
import { ToastrService } from '../../services/toastr.service';
import { PayrollProcessingService } from '../payroll-processing/payroll-processing.service';

@Component({
  selector: 'app-pay-slip',
  templateUrl: './pay-slip.component.html',
  styleUrls: ['./pay-slip.component.scss']
})
export class PaySlipComponent implements OnInit {

  payrollSlipForm:any;
  submitted = false;
  isView:boolean=false;
  insanceId:any;
  filterString = "";
  filtered;
  items = [];
  tempList: any = [];

 public myDatePickerOptions = this.commonService.datepickerFormat;
  @ViewChild('dp1', {static: false}) myDp1: AngularMyDatePickerDirective;
  @ViewChild('dp2', {static: false}) myDp2: AngularMyDatePickerDirective;
  
  companyList:any;
  categoryList:any;
  deptList:any;
  empList:any;
  codeList:any;
  monthList:any;
  gradeList:any;
  desigList:any;
  holdingList:any;
  detailsList:any =[];
  btnLoader:boolean;
  sponsorTypeList:any =[];
  wpsList:any=[];
  
  
  moduleid:any;
  moduleList: any = [];
  flags = {
    createFlag: '',
    editFlag: '',
    readFlag: '',
    deleteFlag: '',
    exportFlag:'',
    importFlag:'',
    forSelf:''
  }
  
  constructor(private excelService:ExcelService,private activatedRoute:ActivatedRoute,private router:Router,private toastService:ToastrService,private cdr: ChangeDetectorRef,
    private payrollProcessingService:PayrollProcessingService,private commonService:CommonService,private formBuilder: FormBuilder) {
    this.payrollSlipForm = new FormGroup({
      companyId: new FormControl(null,[Validators.required]),
      categoryId: new FormControl(null),
      deptId: new FormControl(null),
      gradeId: new FormControl(null),
      designationId: new FormControl(null),
      employeeId: new FormControl(null),
      monthId:new FormControl(null,[Validators.required]),
      fromDate: new FormControl(null),
      toDate: new FormControl(null),
      startDate1: new FormControl(null,[Validators.required]),
      endDate1: new FormControl(null,[Validators.required]),
      holdingId:new FormControl(null),
      created:new FormControl(),
      createdBy:new FormControl(),
      updated: new FormControl(),
      updatedBy:new FormControl(),
      isActive:new FormControl(null),
      stdate:new FormControl(),
      endate:new FormControl(),
      employeeCode:new FormControl(),
      oldEmpId:new FormControl(),
      departmentid: new FormControl(null),
      sponsortypeid: new FormControl(null),
      wps: new FormControl(null),
    });

    this.activatedRoute.queryParams.subscribe(params => {
      if(params.instanceid){
        this.getAllPayrollProcessing(params.instanceid);
      }
     
    });

    this.moduleList = JSON.parse(sessionStorage.getItem("moduleList"));
    if (this.moduleList) {
      this.moduleList.map((e) => {
        if (e.moduleGroup == 'Payroll' && e.moduleName == 'Salary Register') {
          this.moduleid=e.moduleId;
          this.flags = { 
                'createFlag': e.createFlag, 
                'editFlag': e.editFlag, 
                'readFlag': e.readFlag, 
                'deleteFlag': e.deleteFlag,
                'importFlag': e.importFlag,
                'exportFlag': e.exportFlag,
                'forSelf': e.forSelf
                };
        }
      });
    }
}


  getCatList(){
    this.payrollProcessingService.getEmpCat().subscribe(data=>{
      this.categoryList = data;
    });
  }
  getDeptList(cmpList){
    let l:any = [Number(cmpList)]
    this.payrollProcessingService.getAllDept(l).subscribe(data=>{
      this.deptList = data;
    });
  }

  getSponsorTypeList(cmpList){
    let l:any = [Number(cmpList)]
    this.payrollProcessingService.getSponsorTypeList(l).subscribe(success=>{
      this.sponsorTypeList = success;
   })
  }

  getEmpGradeList(){
    this.payrollProcessingService.getEmpGradeList().subscribe(data=>{
      this.gradeList=data;
    });
  }

  getEmpDesignationList(){
    this.payrollProcessingService.getDesignationList().subscribe(data=>{
      
      this.desigList=data;
    });
  }
  getEmpList(cmpList){
    let l:any = [Number(cmpList)]//sessionStorage.getItem("company");
   
      this.payrollProcessingService.getEmpList(this.moduleid,l).subscribe(data=>{
        this.codeList = data;
        this.empList = data;
      });
  }

  getMonthList(){
      this.payrollProcessingService.getMonthList().subscribe(data=>{
        this.monthList = data;
      });
  }

  getMonthById(monthId){
      this.payrollProcessingService.getMonthById(monthId).subscribe(s=>{
      var success:any = s;
      let startDate: Date = new Date(success.data.startDate);
      let fromModel: IMyDateModel = {isRange: false, singleDate: {jsDate: startDate}, dateRange: null};
      this.payrollSlipForm.controls['startDate1'].setValue(fromModel);
      
      let endDate: Date = new Date(success.data.endDate);
      let toModel: IMyDateModel = {isRange: false, singleDate: {jsDate: endDate}, dateRange: null};
      this.payrollSlipForm.controls['endDate1'].setValue(toModel);
    });

  }
   get f() { return this.payrollSlipForm.controls; }

  ngOnInit() { 
   
    this.getCatList();
    this.getEmpGradeList();
    this.getEmpDesignationList();
    this.getMonthList();
    this.getHoldingList();
    this.getWPSList();
  }
  
  toggleCalendar(): void {
    this.cdr.detectChanges();
    this.myDp1.toggleCalendar();
  }
  changeStartDate(event){
    this.payrollSlipForm.get('stdate').setValue(this.commonService.dateFormat(event.singleDate.jsDate));
  }
  changeEndDate(event){
    this.payrollSlipForm.get('endate').setValue(this.commonService.dateFormat(event.singleDate.jsDate));
  }

 
  getHoldingList(){
    this.payrollProcessingService.getHoldingList().subscribe(data=>{
      this.holdingList = data;
      this.payrollSlipForm.get('holdingId').setValue(this.holdingList[0].gHoldingId);
       this.getCompanyList(this.holdingList[0].gHoldingId);
    });
  }



   getCompanyList(holdingId){
    this.payrollProcessingService.getCompanyList(holdingId).subscribe(data=>{
     this.companyList=data;
     if(this.companyList){
    
      let list:any = JSON.parse(sessionStorage.getItem("company"));
      var l:any=[];
      if(list){
      for(var i=0;i<list.length;i++){
       // if(list[i]!=','){
          l.push(Number(list[i]));
        // }
      }}
    
    this.companyList = this.companyList.filter(o1 => l.some(o2 => o1.gCompanyId === o2));
   
    }
    });
  }

  setEmpList(list) {
    let elm: any = [];
    list.forEach(element => {
      elm.push(element.employeeId);
    });
    let unique = [...new Set(elm)];
    return unique;
  }

  payrollProcessing(){

    let empIdList: any;
    if (this.selectedEmpList.length > 0) {
      empIdList = this.setEmpList(this.selectedEmpList);
    } else {
      empIdList = [];
    }
    this.tempList = empIdList;
    let xEmployeeId = empIdList;

    let gCompanyId = this.payrollSlipForm.value.companyId ? Number(this.payrollSlipForm.value.companyId):undefined;
   
    let xMonthId = this.payrollSlipForm.value.monthId ? Number(this.payrollSlipForm.value.monthId):0;
    let deptId = this.payrollSlipForm.value.departmentid ? Number(this.payrollSlipForm.value.departmentid):0;
    let sponsorId = this.payrollSlipForm.value.sponsortypeid ? Number(this.payrollSlipForm.value.sponsortypeid):0;
    let wps = this.payrollSlipForm.value.wps==null ?  null : Number(this.payrollSlipForm.value.wps)==1 ? "Y": "N";
    this.submitted = true;
    if (this.payrollSlipForm.invalid) {
      return;
    } else{
    this.btnLoader = true;
   this.payrollProcessingService.payrollJournalSummary(gCompanyId,xEmployeeId,xMonthId,deptId,sponsorId,wps).subscribe(data=>{
    this.payrollSummaryList = data;
    
    this.btnLoader = false;    
    let summaryList = this.payrollSummaryList.summary;
    this.onFilterChange();
    this.filtered = Array(summaryList.length).fill(0).map((x, i) => (
      {
        wps: summaryList[i].wps,
        employeeCode: summaryList[i].employeeCode,
        tPayrolljournalId: summaryList[i].tPayrolljournalId,
        employeeoldId: summaryList[i].employeeoldId,
        employeeName:summaryList[i].employeeName,
        category:summaryList[i].category,
        department:summaryList[i].department,
        designation:summaryList[i].designation,
        monthlyBasic:summaryList[i].monthlyBasic,
        monthlyHra:summaryList[i].monthlyHra,
        monthlyTrva:summaryList[i].monthlyTrva,
        monthlyFua:summaryList[i].monthlyFua,
        paidFua:summaryList[i].paidFua,
        monthlyOthera:summaryList[i].monthlyOthera,
        monthlyFooda:summaryList[i].monthlyFooda,
        monthlyFixota:summaryList[i].monthlyFixota,
        monthlyTelea:summaryList[i].monthlyTelea,
        monthlyTotsal:summaryList[i].monthlyTotsal,
        paidBasic:summaryList[i].paidBasic,
        paidHra:summaryList[i].paidHra,
        paidTrva:summaryList[i].paidTrva,
        paidOthera:summaryList[i].paidOthera,
        paidFooda:summaryList[i].paidFooda,
        paidFixota:summaryList[i].paidFixota,
        paidTelea:summaryList[i].paidTelea,
        paidMisca:summaryList[i].paidMisca,
        paidtotsalarynoOT:summaryList[i].paidtotsalarynoOT,
        totalNormalOverTimeAmount:summaryList[i].totalNormalOverTimeAmount,
        totalFridayOverTimeAmount:summaryList[i].totalFridayOverTimeAmount,
        totalHolidayOverTimeAmount:summaryList[i].totalHolidayOverTimeAmount,
        totalotAmount:summaryList[i].totalotAmount,
        paidtotalsalarywithOT:summaryList[i].paidtotalsalarywithOT,
        lessdeductionadvanceloan:summaryList[i].lessdeductionadvanceloan,
        addMiscExtraPay:summaryList[i].addMiscExtraPay,
        netSalaryRoundedOff:summaryList[i].netSalaryRoundedOff,
        cash:summaryList[i].cash,
        payDays:summaryList[i].payDays,
        paidLeave:summaryList[i].paidLeave,
        lwp_UnpaidDays:summaryList[i].lwp_UnpaidDays,
        monthDays:summaryList[i].monthDays,
        totalNormalOverTimeHours:summaryList[i].totalNormalOverTimeHours,
        totalFridayOverTimeHours:summaryList[i].totalFridayOverTimeHours,
        totalHolidayOverTimeHours:summaryList[i].totalHolidayOverTimeHours,
        isActive:summaryList[i].isActive,
        doj:summaryList[i].doj,
        curStatus:summaryList[i].curStatus,
        period:summaryList[i].period,
        bankName:summaryList[i].bankName,
        paY_MODE:summaryList[i].paY_MODE,
        transfeR_BRANCH:summaryList[i].transfeR_BRANCH,
        leavesettlmentAmt:summaryList[i].leavesettlmentAmt


       
      }));
 

    }, error => { this.btnLoader = false; console.log('oops', error); })
  }  
    
  }

  getPayrollSummary(){
    this.payrollProcessingService.getPayrollSummary().subscribe(s=>{
      this.payrollSummaryList = s;
    })

  }

  getWPSList(){
    this.commonService.getGeneralListByCode(GeneralListCode.YES_NO_LIST).subscribe(data=>{
      this.wpsList = data;
    });
  }

  downloadFile(file){
    this.payrollProcessingService.downloadFile(file);
    
  }

  exportList: any=[];

  downloadRegister(){
    this.exportList=this.payrollSummaryList.summary;
    let exportDataList = Array(this.exportList.length).fill(0).map((x, i) => (
      {
        "WPS ": this.exportList[i].wps,
        "Employee ID": this.exportList[i].employeeoldId,
        "Employee Code": this.exportList[i].employeeCode,
        "Name": this.exportList[i].employeeName,
        "Category": this.exportList[i].category,
         "Department ": this.exportList[i].department,
         "Job Title ": this.exportList[i].designation,
         "Monthly Basic": this.exportList[i].monthlyBasic,
         "HRA": this.exportList[i].monthlyHra,
        "Transportation Allowance": this.exportList[i].monthlyTrva,
        "Fuel Allowance": this.exportList[i].monthlyFua,
        "Other Allowance": this.exportList[i].monthlyOthera,
        "Food Allowance": this.exportList[i].monthlyFooda,
        "Fixed OT Allowance": this.exportList[i].monthlyFixota,
        "Telephone Allowance": this.exportList[i].monthlyTelea,
         "Total Salary": this.exportList[i].monthlyTotsal,
         "Actual Basic": this.exportList[i].paidBasic,
         "Actual HRA": this.exportList[i].paidHra,
         "Actual Transportation Allowance": this.exportList[i].paidTrva,
         "Actual Fuel Allowance": this.exportList[i].paidFua,
         "Actual Other Allowance": this.exportList[i].paidOthera,
         "Actual Food Allowance": this.exportList[i].paidFooda,
         "Actual Fixed OT Allowance": this.exportList[i].paidFixota,
         "Actual Telephone Allowance": this.exportList[i].paidTelea,
         "Salary Without OverTime": this.exportList[i].totalSalaryWithoutOverTime,
         "Total Normal OverTime Amount": this.exportList[i].totalNormalOverTimeAmount,
         "Total Friday OverTime Amount": this.exportList[i].totalFridayOverTimeAmount,
         "Total National Holiday OverTime Amount": this.exportList[i].totalHolidayOverTimeAmount,
         "Total Overtime Amount": this.exportList[i].totalotAmount,
         "Gross Salary with Overtime": this.exportList[i].paidtotalsalarywithOT,
         "Less Deduction & Advances": this.exportList[i].lessdeductionadvanceloan,
         "ADD Misc. (Extra Pay)": this.exportList[i].addMiscExtraPay,
         "Leave Settlement": this.exportList[i].leavesettlmentAmt,
         "Net Salary (Rounded)": this.exportList[i].netSalaryRoundedOff,
         "Payment Mode": this.exportList[i].paymentMode,
         "Payment In Cash / WPS ": this.exportList[i].netSalaryRoundedOff,
         "Pay Days": this.exportList[i].payDays,
         "Paid Leave (Sick Leave)": this.exportList[i].paidLeave,
         "LWP Days (Unpaid) ": this.exportList[i].lwp_UnpaidDays,
         "Month Days": this.exportList[i].monthDays,
         "Total Normal OT Hours": this.exportList[i].totalNormalOverTimeHours,
         "Total Friday OT Hours": this.exportList[i].totalFridayOverTimeHours,
         "Total National Holiday OT Hours": this.exportList[i].totalHolidayOverTimeHours,
         "Active / InActive": this.exportList[i].isActive,
         "Date of Joining": this.exportList[i].doj,
         "Status": this.exportList[i].curStatus,
         "Period": this.exportList[i].period,
         "Cash / Bank Details": this.exportList[i].bankName,
         "Cash Amount": this.exportList[i].null,
         "Bank Amount": this.exportList[i].null,
         "Exchange House": this.exportList[i].null,
        //  "Count Bank": this.exportList[i].null,
        //  "Count Cash": this.exportList[i].null,
        //  "Count Exchange": this.exportList[i].null,
          "Sponsor": this.exportList[i].null,
         "Days of OT calulation": this.exportList[i].null,
          "Normal OT(Decimal)": this.exportList[i].decimalnormalOT,
         "Friday OT(Decimal)": this.exportList[i].decimalfridayOT,
         "Holiday OT(Decimal)": this.exportList[i].decimalholidayOT
  
      }));
  
    this.excelService.exportAsExcelFile(exportDataList,"SalaryRegister")
  }

  downloadRegisterDSS(){
    this.exportList=this.payrollSummaryList.summary;
    let exportDataList = Array(this.exportList.length).fill(0).map((x, i) => (
      {
        "S.no ": this.exportList[i].srNo,
        "Staff No.": this.exportList[i].employeeoldId,
        "Mode of Payment": this.exportList[i].paymentMode,
        "Bank Name": this.exportList[i].bankName,
        "Labour card number/ jafza card ": this.exportList[i].labourcardno +'/'+this.exportList[i].jzidcardno,
         "Routing Codes ": this.exportList[i].routingNo,
         "Bank A/C / Exchange NO. ": this.exportList[i].transfeR_ACCT,
         "Employee Name": this.exportList[i].employeeName,
         "Sponsoring company": this.exportList[i].visacompany,
        "Accountant": '',
        "Expense to be incurred by": this.exportList[i].companyName,
        "Basic": this.exportList[i].monthlyBasic,
        "HRA": this.exportList[i].monthlyHra,
        "Allow.": this.exportList[i].monthlyOthera,
        "Transp": this.exportList[i].monthlyTrva,
         "Food Allowance": this.exportList[i].monthlyFooda,
         "Fixed OT": this.exportList[i].monthlyFixota,
         "Telephone": this.exportList[i].monthlyTelea,
         "Fuel Allowance": this.exportList[i].monthlyFua,
         "Total Salary.": this.exportList[i].monthlyTotsal,
         "Paid Leave": this.exportList[i].paidLeave,
         "Friday & Saturday & Public Holiday- OT": this.exportList[i].woHolidayTOT,
         "OT Hrs": this.exportList[i].totalNormalOverTimeAmount,
         "No. of days to pay": this.exportList[i].payDays,
         "Basic To Pay": this.exportList[i].paidBasic,
         "HRA To Pay": this.exportList[i].paidHra,
         "Allow. To Pay": this.exportList[i].paidOthera,
         "Trans To Pay": this.exportList[i].paidTrva,
         "Food allow. To Pay": this.exportList[i].paidFooda,
         "Fixed OT To Pay": this.exportList[i].paidFixota,
         "Telephone Expense": this.exportList[i].paidTelea,
         "Fuel Allowance.": this.exportList[i].paidFua,
         "Monthly OT To Pay": this.exportList[i].totalotAmount,
         "Trip Allowances To pay": this.exportList[i].paidtripAllow,
         "Loading charges": '',
         "Fri/Sat/Public Holiday staff OT": '',
         "Attendance bonus": this.exportList[i].paidattnBonus,
         "Leave Salary ": '',
         "Miscellaneous": this.exportList[i].addMiscExtraPay,
         "Salary Arrears": '',
         "Air ticket": '',
         "Car parking/car wash": '',
         "Loan Given": this.exportList[i].loanGiven,
         "Bonus": '',
         "Loan Deduction": this.exportList[i].loandedu,
         "Deduction": this.exportList[i].lessdeductionadvanceloan,
         "Total Salary": this.exportList[i].netSalaryRoundedOff
      }));
  
    this.excelService.exportAsExcelFile(exportDataList,"SalaryRegister")
  }
  


  deletePayslip(data){
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Delete'
    }).then((result) => {
      if (result.isConfirmed) {

        this.payrollProcessingService.deleteRecord(data.tPayrolljournalId).subscribe(s=>{
          Swal.fire(
            'Delete',
            '',
            'success'
          );
          this. payrollProcessing();
        },error=>{
          Swal.fire(
            'Record not delete.',
            '',
            'error'
          );
        })

      
      }
     
    })
  }

 


  payrollSummaryList:any=[];
  getAllPayrollProcessing(instanceId){
    if(instanceId){
      this.payrollProcessingService.getAllPayrollProcessing(instanceId).subscribe(s=>{
        this.detailsList = s;
      })
    }
  }

  paySlipView(data){
    this.insanceId = data.pinstanceId;
   this.router.navigate(['/views/payroll/payslip-preview'],{queryParams:{id:data.tPayrolljournalId,instanceid:this.insanceId}});    
  }

  selectEmpCode(code){
    let list = code ? this.empList.filter(data=> data.value===code) : [];
    if(list.length>0){
    this.payrollSlipForm.get('employeeId').setValue(list[0].employeeId);
    this.payrollSlipForm.get('oldEmpId').setValue(list[0].oldEmpId);
    } else{
      this.payrollSlipForm.get('employeeId').setValue(undefined);
      this.payrollSlipForm.get('oldEmpId').setValue(undefined);
    }

  }

  selectEmpId(id){
    let list = id ? this.empList.filter(data=> data.employeeId==id) : [];
    if(list.length>0){
    this.payrollSlipForm.get('employeeCode').setValue(list[0].value);
    this.payrollSlipForm.get('oldEmpId').setValue(list[0].oldEmpId);
    } else{
      this.payrollSlipForm.get('employeeCode').setValue(undefined);
      this.payrollSlipForm.get('oldEmpId').setValue(undefined);
    }
  }

  selectOldEmpId(id){
    let list = id ? this.empList.filter(data=> data.oldEmpId==id) : [];
    if(list.length>0){
    this.payrollSlipForm.get('employeeCode').setValue(list[0].value);
    this.payrollSlipForm.get('employeeId').setValue(list[0].employeeId);
    } else{
      this.payrollSlipForm.get('employeeCode').setValue(undefined);
      this.payrollSlipForm.get('employeeId').setValue(undefined);
    }
  }

  onFilterChange(){
    let summaryList = this.payrollSummaryList.summary;
    this.filtered = summaryList.filter((data) => this.isMatch(data));
  }

  isMatch(item) {
    if (item instanceof Object) {
      return Object.keys(item).some((k) => this.isMatch(item[k]));
    } else {
      return item ? item.toString().indexOf(this.filterString) > -1 : null;
    }
  }

  selectedEmpList = [];
  dropdownSettings: IDropdownSettings = {
    singleSelection: false,
    idField: 'employeeId',
    textField: 'displayName',
    selectAllText: 'Select All',
    unSelectAllText: 'UnSelect All',
    itemsShowLimit: 2,
    allowSearchFilter: true
  };

  onEmployeeSelect(item: any) {
    this.selectedEmpList.push(item);
  }

  onEmployeeDeSelect(items: any) {
    this.selectedEmpList = this.selectedEmpList.filter(item => item.employeeId !== items.employeeId);
  }

  onSelectAllEmployee(items: any) {
    this.selectedEmpList = [];
    this.selectedEmpList.push(...[items]);
  }

  selectcompany(id)
  {
    this.getEmpList(id);
    this.getDeptList(id);
    this.getSponsorTypeList(id);
  }

  selecteSponsorType(id){
    if(id){
    this.payrollProcessingService.getEmpBySponsorType(id).subscribe(data=>{
      this.empList = data;
    });
  } else{
    this.getEmpList(this.payrollSlipForm.value.companyId);
  }
  }

  publishFun(str){
    

    let empIdList: any;
    if (this.selectedEmpList.length > 0) {
      empIdList = this.setEmpList(this.selectedEmpList);
    } else {
      empIdList = [];
    }
    this.tempList = empIdList;
    let xEmployeeId = empIdList;

    let tempObj ={
      cid: this.payrollSlipForm.value.companyId ? Number(this.payrollSlipForm.value.companyId):0,
      from_dt:  '',
      to_dt:  '',
      dept_id: this.payrollSlipForm.value.departmentid ? Number(this.payrollSlipForm.value.departmentid):'',
      sponsor:  this.payrollSlipForm.value.sponsortypeid ? Number(this.payrollSlipForm.value.sponsortypeid): '',
      wps:this.payrollSlipForm.value.wps==null ?  null : Number(this.payrollSlipForm.value.wps)==1 ? "Y": "N"
    }


    if(str=='P'){

      this.payrollProcessingService.publishPayslips(tempObj,empIdList).subscribe(data=>{
        var s:any = data;
        
        if(s.code==1){
          this.toastService.showToast('success',s.message);
          // this.ispublish = 'U';
        } else{
          this.toastService.showToast('danger',s.message);
        }
    }, error => { this.btnLoader = false; console.log('oops', error); })
      
    } else{
      this.payrollProcessingService.unpublishPayslips(tempObj,empIdList).subscribe(data=>{
        var s:any = data;
        if(s.code==1){
          this.toastService.showToast('success',s.message);
          // this.ispublish = 'P';
        } else{
          this.toastService.showToast('danger',s.message);
        }
    }, error => { this.btnLoader = false; console.log('oops', error); })
      
    }

     
    }

}
