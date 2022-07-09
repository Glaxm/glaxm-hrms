import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularMyDatePickerDirective, IMyDateModel } from 'angular-mydatepicker';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { environment } from 'src/environments/environment';
import { CommonService, GeneralListCode } from '../../services/common.service';
import { ToastrService } from '../../services/toastr.service';
import { PayrollProcessingService } from './payroll-processing.service';

@Component({
  selector: 'app-payroll-processing',
  templateUrl: './payroll-processing.component.html',
  styleUrls: ['./payroll-processing.component.scss']
})
export class PayrollProcessingComponent implements OnInit {

  payrollProcessingForm:any;
  submitted = false;
  isView:boolean=false;
  insanceId:any;
  ispublish:any = 'U';
 public myDatePickerOptions = this.commonService.datepickerFormat;
  @ViewChild('dp1', {static: false}) myDp1: AngularMyDatePickerDirective;
  @ViewChild('dp2', {static: false}) myDp2: AngularMyDatePickerDirective;
  
  companyList:any;
  categoryList:any;
  deptList:any;
  empList:any;
  monthList:any;
  gradeList:any;
  desigList:any;
  holdingList:any;
  detailsList:any =[];
  codeList:any =[];
  btnLoader:boolean;
  tempList:any=[];
  sponsorTypeList:any=[];
  wpsList:any =[];
  EOSBList:any = [{id:'Y',name:'Yes'},{id:'N',name:'No'}];
  
  moduleid:any;
  moduleList: any = [];
  flags = {
    createFlag: '',
    editFlag: '',
    readFlag: '',
    deleteFlag: '',
    exportFlag:'',
    importFlag:''
  }
  

  constructor(private activatedRoute:ActivatedRoute,private router:Router,private toastService:ToastrService,private cdr: ChangeDetectorRef,
    private payrollProcessingService:PayrollProcessingService,private commonService:CommonService,private formBuilder: FormBuilder) {
    this.payrollProcessingForm = new FormGroup({
      companyId: new FormControl(null,[Validators.required]),
      categoryId: new FormControl(null),
      deptId: new FormControl(null),
      gradeId: new FormControl(null),
      designationId: new FormControl(null),
      employeeId: new FormControl(null),
      employeeId1: new FormControl(null),
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
      stdate:new FormControl(null),
      endate:new FormControl(null),
      employeeCode:new FormControl(null),
      oldEmpId:new FormControl(null),
      departmentid: new FormControl(null),
      sponsortypeid: new FormControl(null),
      wps: new FormControl(null),
      wps1: new FormControl(null,[Validators.required]),
      isEosb: new FormControl(null),
      isEosb1: new FormControl(null),
      forLeave: new FormControl(null),
      forLeave1: new FormControl(null),
      
    });
    this.payrollProcessingForm.controls['isEosb'].setValue('N');
     
    this.activatedRoute.queryParams.subscribe(params => {
      if(params.instanceid){
        this.getpayslipsbyFilter(this.payrollProcessingForm.value);
      }
     
    });

    this.moduleList = JSON.parse(sessionStorage.getItem("moduleList"));
    if (this.moduleList) {
      this.moduleList.map((e) => {
        if (e.moduleGroup == 'Payroll' && e.moduleName == 'Payroll Processing') {
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

  getCatList(){
    this.payrollProcessingService.getEmpCat().subscribe(data=>{
      this.categoryList = data;
    });
  }

  getSponsorTypeList(cmpList){
    let l:any = [Number(cmpList)]
    this.payrollProcessingService.getSponsorTypeList(l).subscribe(success=>{
      this.sponsorTypeList = success;
   })
  }

  getDeptList(cmpList){
    let l:any = [Number(cmpList)]
    this.payrollProcessingService.getAllDept(l).subscribe(data=>{
      this.deptList = data;
    });
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
        this.empList = data;
        this.codeList = data;
      });
  }

  getMonthList(id){
      this.payrollProcessingService.getAllActiveMonthList(id).subscribe(data=>{
        this.monthList = data;
      });
  }

  getMonthById(monthId){
      this.payrollProcessingService.getMonthById(monthId).subscribe(s=>{
      var success:any = s;
      let startDate: Date = new Date(success.data.startDate);
      let fromModel: IMyDateModel = {isRange: false, singleDate: {jsDate: startDate}, dateRange: null};
      this.payrollProcessingForm.controls['startDate1'].setValue(fromModel);
      
      let endDate: Date = new Date(success.data.endDate);
      let toModel: IMyDateModel = {isRange: false, singleDate: {jsDate: endDate}, dateRange: null};
      this.payrollProcessingForm.controls['endDate1'].setValue(toModel);
    });

  }
   get f() { return this.payrollProcessingForm.controls; }

  ngOnInit() { 
    this.getCatList();
    this.getEmpGradeList();
    this.getEmpDesignationList();
    this.getHoldingList();
    this.getWPSList();
  }
  
  toggleCalendar(): void {
    this.cdr.detectChanges();
    this.myDp1.toggleCalendar();
  }
  changeStartDate(event){
    this.payrollProcessingForm.get('stdate').setValue(this.commonService.dateFormat(event.singleDate.jsDate));
  }
  changeEndDate(event){
    this.payrollProcessingForm.get('endate').setValue(this.commonService.dateFormat(event.singleDate.jsDate));
  }

 
  getHoldingList(){
    this.payrollProcessingService.getHoldingList().subscribe(data=>{
      this.holdingList = data;
      this.payrollProcessingForm.get('holdingId').setValue(this.holdingList[0].gHoldingId);
       this.getCompanyList(this.holdingList[0].gHoldingId);
    });
  }

  getWPSList(){
    this.commonService.getGeneralListByCode(GeneralListCode.YES_NO_LIST).subscribe(data=>{
      this.wpsList = data;
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
      //  if(list[i]!=','){
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


    this.payrollProcessingForm.value.isEosb1 ?  this.payrollProcessingForm.get('isEosb').setValue('Y') :this.payrollProcessingForm.get('isEosb').setValue('N');
    this.payrollProcessingForm.value.forLeave1 ?  this.payrollProcessingForm.get('forLeave').setValue('Y') :this.payrollProcessingForm.get('forLeave').setValue('N');
    this.payrollProcessingForm.get('createdBy').setValue(1);
    this.payrollProcessingForm.get('created').setValue(new Date());
    this.payrollProcessingForm.get('updatedBy').setValue(1);
    this.payrollProcessingForm.get('updated').setValue(new Date());
    this.payrollProcessingForm.get('isActive').setValue('Y');
    this.payrollProcessingForm.get('companyId').setValue(this.payrollProcessingForm.value.companyId ? Number(this.payrollProcessingForm.value.companyId):undefined);
    this.payrollProcessingForm.get('employeeId').setValue(xEmployeeId);
    this.payrollProcessingForm.get('monthId').setValue(Number(this.payrollProcessingForm.value.monthId));
    let wps = this.payrollProcessingForm.value.wps1==null ?  null : Number(this.payrollProcessingForm.value.wps1)==1 ? "Y": "N";
    
    this.payrollProcessingForm.get('wps').setValue(wps);
    this.payrollProcessingForm.value.sponsortypeid ? this.payrollProcessingForm.get('sponsortypeid').setValue(Number(this.payrollProcessingForm.value.sponsortypeid)):this.payrollProcessingForm.get('sponsortypeid').setValue(null);
    this.payrollProcessingForm.value.departmentid ? this.payrollProcessingForm.get('departmentid').setValue(Number(this.payrollProcessingForm.value.departmentid)):this.payrollProcessingForm.get('departmentid').setValue(null);

    this.submitted = true;
 
    console.log(JSON.stringify(this.payrollProcessingForm.value));
    if (this.payrollProcessingForm.invalid) {
      return;
    } else{
      this.btnLoader = true;
      this.payrollProcessingService.payrollProcessing(this.payrollProcessingForm.value).subscribe(data=>{
        var s:any = data;
         this.submitted = false;
         this.btnLoader = false;
        if(s.code==1){
          this.toastService.showToast('success',s.message);
          this.insanceId = s.data;
          this.getpayslipsbyFilter(this.payrollProcessingForm.value);
        } else{
          this.toastService.showToast('danger',s.message);
        }
    }, error => { this.btnLoader = false; console.log('oops', error); })
      
    }
  }




  downloadFile(file){
    this.payrollProcessingService.downloadFile(file);
  }

  getpayslipsbyFilter(data){
  //  if(instanceId){
      this.payrollProcessingService.getpayslipsbyFilter(data).subscribe(s=>{
        this.detailsList = s;
      })
  //  }
  }

  paySlipView(data,option){
    if(option=="PRINT"){
      window.open(environment.PRINT_LINK+data.tPayrolljournalId);
    } else{
      this.insanceId = data.pinstanceId;
      this.router.navigate(['/views/payroll/payslip-preview'],{queryParams:{id:data.tPayrolljournalId,instanceid:this.insanceId}});       
    }
   }

  selectBioId(boiId){
    let list = boiId ? this.empList.filter(data=> data.value===boiId) : [];
    if(list.length>0){
      this.payrollProcessingForm.get('oldEmpId').setValue(list[0].oldEmpId);
      this.payrollProcessingForm.get('employeeId').setValue(list[0].employeeId);
      } else{
        this.payrollProcessingForm.get('employeeId').setValue(undefined);
        this.payrollProcessingForm.get('oldEmpId').setValue(undefined);
      }
   }

  selectEmpCode(code) {
    let list = code ? this.empList.filter(data=> data.oldEmpId===code) : [];
    if(list.length>0){
      this.payrollProcessingForm.get('employeeCode').setValue(list[0].value);
      this.payrollProcessingForm.get('employeeId').setValue(list[0].employeeId);
      } else{
        this.payrollProcessingForm.get('employeeCode').setValue(undefined);
        this.payrollProcessingForm.get('employeeId').setValue(undefined);
      }
   }

   selectEmp(id) { 
    let list = id ? this.empList.filter(data=> data.employeeId===Number(id)) : [];
    if(list.length>0){
      this.payrollProcessingForm.get('employeeCode').setValue(list[0].value);
      this.payrollProcessingForm.get('oldEmpId').setValue(list[0].oldEmpId);
      } else{
        this.payrollProcessingForm.get('employeeCode').setValue(undefined);
        this.payrollProcessingForm.get('oldEmpId').setValue(undefined);
      }
  }

  selectedEmpList = [];
  dropdownSettings: IDropdownSettings = {
    singleSelection: false,
    idField: 'employeeId',
    textField: 'displayName',
    selectAllText: 'Select All',
    unSelectAllText: 'UnSelect All',
    itemsShowLimit: 5,
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
    this.getMonthList(id);
  }

  selecteSponsorType(id){
    if(id){
    this.payrollProcessingService.getEmpBySponsorType(id).subscribe(data=>{
      this.empList = data;
    });
  } else{
    this.getEmpList(this.payrollProcessingForm.value.companyId);
  }
  }

  publishFun(str){
    
    let empIdList: any;
    if (this.selectedEmpList.length > 0) {
      empIdList = this.setEmpList(this.selectedEmpList);
    } else {
      empIdList = [];
    }
    
    let wps = this.payrollProcessingForm.value.wps1==null ?  null : Number(this.payrollProcessingForm.value.wps1)==1 ? "Y": "N";
    this.payrollProcessingForm.get('companyId').setValue(this.payrollProcessingForm.value.companyId ? Number(this.payrollProcessingForm.value.companyId):undefined);
    this.payrollProcessingForm.value.departmentid ? this.payrollProcessingForm.get('departmentid').setValue(Number(this.payrollProcessingForm.value.departmentid)):this.payrollProcessingForm.get('departmentid').setValue(null)
    this.payrollProcessingForm.value.sponsortypeid ? this.payrollProcessingForm.get('sponsortypeid').setValue(Number(this.payrollProcessingForm.value.sponsortypeid)):this.payrollProcessingForm.get('sponsortypeid').setValue(null)

    let tempObj ={
      cid: this.payrollProcessingForm.value.companyId ? this.payrollProcessingForm.value.companyId : '',
      from_dt: this.payrollProcessingForm.value.stdate ? this.payrollProcessingForm.value.stdate : '',
      to_dt: this.payrollProcessingForm.value.endate ? this.payrollProcessingForm.value.endate : '',
      dept_id: this.payrollProcessingForm.value.departmentid ? this.payrollProcessingForm.value.departmentid : '',
      sponsor: this.payrollProcessingForm.value.sponsortypeid ? this.payrollProcessingForm.value.sponsortypeid : '',
      wps:wps ? wps: ''
    }

    if(str=='P'){

      this.payrollProcessingService.publishPayslips(tempObj,empIdList).subscribe(data=>{
        var s:any = data;
        
        if(s.code==1){
          this.toastService.showToast('success',s.message);
          this.ispublish = 'U';
        } else{
          this.toastService.showToast('danger',s.message);
        }
    }, error => { this.btnLoader = false; console.log('oops', error); })
      
    } else{
      this.payrollProcessingService.unpublishPayslips(tempObj,empIdList).subscribe(data=>{
        var s:any = data;
        if(s.code==1){
          this.toastService.showToast('success',s.message);
          this.ispublish = 'P';
        } else{
          this.toastService.showToast('danger',s.message);
        }
    }, error => { this.btnLoader = false; console.log('oops', error); })
      
    }

     
    }



}
