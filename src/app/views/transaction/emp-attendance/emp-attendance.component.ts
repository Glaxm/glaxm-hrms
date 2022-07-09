import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { EmpAttendanceService } from './emp-attendance.service';
import { ToastrService } from '../../services/toastr.service';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { AngularMyDatePickerDirective, IMyDateModel } from 'angular-mydatepicker';
import { CommonService } from '../../services/common.service';
import { ArrayType } from '@angular/compiler';

@Component({
  selector: 'app-emp-attendance',
  templateUrl: './emp-attendance.component.html',
  styleUrls: ['./emp-attendance.component.scss']
})
export class EmpAttendanceComponent implements OnInit {

  empAttenForm: FormGroup;
  submitted = false;
  isView: boolean = false;
  holdingList: any = [];
  companyList: any = [];
  empList: any=[];
  fromdate:any;
  statusList: any = [{ valueCode: 'ACTIVE', valueName: 'Active' }, { valueCode: 'INACTIVE', valueName: 'Inactive' }]
  public myDatePickerOptions = this.commonService.datepickerFormat;
  @ViewChild('dp1', { static: false }) myDp1: AngularMyDatePickerDirective;
  @ViewChild('dp2', { static: false }) myDp2: AngularMyDatePickerDirective;

  form: FormGroup;
  shiftRuleList:any=[];
  obj:any = {
      empAttnId: null,
      companyId: null,
      holdingId: null,
      isActive: null,
      status:null,
      created:null,
      createdBy:null,
      updated: null,
      updatedBy: null,
      docId: null,
      docNo:null,
      dateFrom: null,
      dateTo: null,
      desc: null,
      isBatch: null,
      empBatchId: null,
      employeeId: null,
      periodId: null,
      remark: null,
      processed: null,
      createEmpLines: null,
      createBatchLines: null,
      processing: null,
      xShiftruleId:null
    }



//  ------------------------\\

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
  this.empAttenForm.controls['employeeId'].setValue(item.employeeId);
}
onSelectAll(items: any) {
  console.log('onSelectAll', items);
}

//---------------------------
 
moduleid:any;
  constructor(private formBuilder: FormBuilder,private commonService:CommonService,private cdr: ChangeDetectorRef,private empattenService: EmpAttendanceService, private toastService: ToastrService, private activatedRoute: ActivatedRoute, private router: Router) {
    
    this.form = this.formBuilder.group({
      present: [],
      halfDay:[]
    });
    
    this.empAttenForm = new FormGroup({

      empAttnId: new FormControl(null),
      companyId: new FormControl(null, [Validators.required]),
      holdingId: new FormControl(null, [Validators.required]),
      isActive: new FormControl(null),
      status:new FormControl(null),
      created: new FormControl(null),
      createdBy: new FormControl(null),
      updated: new FormControl(null),
      updatedBy: new FormControl(null),
      docId: new FormControl(null),
      docNo: new FormControl(null),
      stDate: new FormControl(null),
      enDate: new FormControl(null),
      dateFrom: new FormControl(null, [Validators.required]),
      dateTo: new FormControl(null, [Validators.required]),
      dateFrom1: new FormControl(null, [Validators.required]),
      dateTo1: new FormControl(null, [Validators.required]),
      desc: new FormControl(null),

 stdate: new FormControl(null),
  endate: new FormControl(null),
  employee: new FormControl(null),
      isBatch: new FormControl(null, [Validators.required]),
      empBatchId: new FormControl(null),
      employeeId: new FormControl(null),
      periodId: new FormControl(null),
      remark: new FormControl(null),
      processed: new FormControl(null),
      createEmpLines: new FormControl(null),
      createBatchLines: new FormControl(null),
      processing: new FormControl(null),
      xShiftruleId : new FormControl(null),
      startTime: new FormControl(null, [Validators.required]),
      endTime: new FormControl(null, [Validators.required]),
      breakStart: new FormControl(null),
      breakEnd: new FormControl(null)
  });

    this.activatedRoute.queryParams.subscribe(params => {
      this.empAttenForm.controls['employeeId'].setValue(params.id);
      this.isView = params.view;
      this.moduleid = params.moduleid;
      this.fromdate = params.fromdate;
    });
  }

  ngOnInit() {
    this.tepMethod();
    this.getHoldingList();
    
    this.getAllShiftRule();
    if(this.empAttenForm.value.employeeId && this.fromdate){
      this.getAttenHeaderById();
    } else{
      this.empAttenForm.get('status').setValue("ACTIVE") 
    }
  //  this.getEmployeeList();
  
  }

  getAllShiftRule(){
    let list:any =JSON.parse(sessionStorage.getItem("company"));
    var l:any=[];
    // alert(list.length)
    for(var i=0;i<list.length;i++){
     
     // if(list[i]!=','){
        l.push(Number(list[i]));
      // }
    }
    this.empattenService.getAllShiftRule(l).subscribe(s=>{
        this.shiftRuleList=s;
    });
  }

  selectShiftRule(id){
  
    const data = this.getDataById(id);

    this.empAttenForm.get('startTime').setValue(data.startTime)
    this.empAttenForm.get('endTime').setValue(data.endTime)
    this.empAttenForm.get('breakStart').setValue(data.breakStart)
    this.empAttenForm.get('breakEnd').setValue(data.breakEnd)
  }

  getDataById(id) {
    return this.shiftRuleList.find(x => x.shiftRuleId == id);
  }
  
  // getDataText(id) {
  //   const data = this.getDataById(id);
  //   return data ? data.text : `Cannot find data with id ${id}`;
  // }

  getAttenHeaderById(){
   
      this.empattenService.getAttenHeaderById(this.empAttenForm.value.employeeId,this.fromdate).subscribe(s=>{
          var success:any = s;
          this.getCompanyListByHoldingId(success.data.holdingId)
          this.getLinesDataByAttnId(success.data.empAttnId);
          this.empAttenForm.patchValue(success.data);
          this.obj.employeeId = success.data.employeeId;
          this.obj.empAttnId = success.data.empAttnId;
          this.obj.companyId = success.data.companyId;
          this.obj.holdingId = success.data.holdingId;
          this.obj.isActive = success.data.isActive;
          this.obj.status = success.data.status;
          this.obj.created = success.data.created;
          this.obj.createdBy = success.data.createdBy;
          this.obj.updated = success.data.updated;
          this.obj.updatedBy = success.data.updatedBy;
          this.obj.docId = success.data.docId;
          this.obj.docNo = success.data.docNo;
          this.obj.dateFrom = success.data.dateFrom;
          this.obj.dateTo = success.data.dateTo;
          this.obj.desc=success.data.desc;
          this.obj.isBatch = success.data.isBatch;
          this.obj.empBatchId= success.data.empBatchId;
          // this.obj.employeeId = success.data.employeeId; 
          this.obj.periodId=success.data.periodId;
          this.obj.remark = success.data.remark;
          this.obj.processed = success.data.processed;
          this.obj.createEmpLines = success.data.createEmpLines;
          this.obj.createBatchLines = success.data.createBatchLines;
          this.obj.processing=success.data.processing;

          let startDate: Date = new Date(success.data.dateFrom);
          let fromModel: IMyDateModel = {isRange: false, singleDate: {jsDate: startDate}, dateRange: null};
          this.empAttenForm.controls['dateFrom1'].setValue(fromModel);
          this.changeFromDate(this.empAttenForm.value.dateFrom1);

          let endDate: Date = new Date(success.data.dateTo);
          let fromModel1: IMyDateModel = {isRange: false, singleDate: {jsDate: endDate}, dateRange: null};
          this.empAttenForm.controls['dateTo1'].setValue(fromModel1);
          this.changeToDate(this.empAttenForm.value.dateTo1);
          success.data.isActive == 'Y' ? this.empAttenForm.get('status').setValue("ACTIVE") : this.empAttenForm.get('status').setValue("INACTIVE");
          
        this.empAttenForm.controls.companyId.disable();
        //  this.empAttenForm.controls.dateFrom1.disable();
        // this.empAttenForm.controls.dateTo1.disable();
        this.empAttenForm.controls['employeeId'].setValue(success.data.employeeId);
        this.empAttenForm.controls.employeeId.disable();
        // this.empAttenForm.controls['employeeId'].setValue(success.data.employeeId);
      
      });
  }


  toggleCalendar(): void {
    this.cdr.detectChanges();
    this.myDp1.toggleCalendar();
  }
  changeFromDate(event) {
    console.log(event.singleDate);
    // this.empAttenForm.get('dateFrom').setValue(event.singleDate.jsDate);
     this.empAttenForm.get('stdate').setValue(this.commonService.dateFormat(event.singleDate.jsDate));
  }

  changeToDate(event) {
    // this.empAttenForm.get('dateTo').setValue(event.singleDate.jsDate);
     this.empAttenForm.get('endate').setValue(this.commonService.dateFormat(event.singleDate.jsDate));
  }

  get f() { return this.empAttenForm.controls; }

  getEmployeeList(cmpList){
    let l:any = [Number(cmpList)]//sessionStorage.getItem("company");
   
    this.empattenService.getEmployeeList(this.moduleid,l).subscribe(s=>{
      // alert(JSON.stringify(s));
      this.empList = s;
      if(this.empAttenForm.value.empAttnId && this.obj.employeeId){
        let list = this.empList.filter(item => item.employeeId == this.obj.employeeId);
        if(list.length>0){
          this.selectedItems=[{'employeeId':list[0].employeeId,'displayName':list[0].displayName}];
        }
      }
    });
  }

  getCompanyListByHoldingId(holdinId) {

    this.empattenService.getCompanyListByHoldingId(holdinId).subscribe(s => {
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
    this.empattenService.getHoldingList().subscribe(s => {
      this.holdingList = s;
      if(this.empAttenForm.value.empAttnId){} else{
      this.empAttenForm.get('holdingId').setValue(this.holdingList[0].gHoldingId);
      this.getCompanyListByHoldingId(this.holdingList[0].gHoldingId);}
    });
  }

  getDay(day){ 
    console.log(day);
    return day;}

  addEmpAttendance() {

    if(this.empAttenForm.value.dateFrom==null && this.empAttenForm.value.dateFrom1){
      this.empAttenForm.get('dateFrom').setValue(this.empAttenForm.value.dateFrom1.singleDate.jsDate);
    }
    if(this.empAttenForm.value.dateTo==null && this.empAttenForm.value.dateTo1){
      this.empAttenForm.get('dateTo').setValue(this.empAttenForm.value.dateTo1.singleDate.jsDate);
    }


  
    this.empAttenForm.get('created').setValue(new Date());
 
    this.empAttenForm.get('updated').setValue(new Date());
    this.empAttenForm.get('processed').setValue('N');
    this.empAttenForm.get('isBatch').setValue('N');     

    this.empAttenForm.get('createdBy').setValue(Number(sessionStorage.getItem('userId')));
    this.empAttenForm.get('updatedBy').setValue(Number(sessionStorage.getItem('userId')));

    this.empAttenForm.controls['employeeId'].setValue(Number(this.empAttenForm.value.employeeId));
    this.empAttenForm.controls['companyId'].setValue(Number(this.empAttenForm.value.companyId));
    this.empAttenForm.controls['xShiftruleId'].setValue(Number(this.empAttenForm.value.xShiftruleId));


    this.empAttenForm.get('createEmpLines').setValue('N');

    this.empAttenForm.value.status=='ACTIVE' ? this.empAttenForm.get('isActive').setValue('Y') : this.empAttenForm.get('isActive').setValue('N');
 
    // if(this.empAttenForm.value.empAttnId){

    // } else{
      this.empAttenForm.controls['empAttnId'].setValue(undefined);
    // }
    
    this.submitted = true;
    if (this.empAttenForm.invalid) {
      return;
    } else{

    
    this.empattenService.addUpdateEmpAttendance(this.empAttenForm.value).subscribe(s=>{
      var success:any = s;
      this.submitted = false;
      this.empAttenForm.get('empAttnId').setValue(success.data.empAttnId);
      this.getAttenHeaderById();
      this.toastService.showToast('success', success.message);
  //    this.router.navigate(['/views/transaction/emp-attendance/emp-attendance'],{queryParams:{id:success.data.empAttnId}});
       this.back() 
    });
  }
  
  }

  updateEmpAttendance(){
    
    
    if(this.empAttenForm.value.dateFrom==null && this.empAttenForm.value.dateFrom1){
      this.empAttenForm.get('dateFrom').setValue(this.empAttenForm.value.dateFrom1.singleDate.jsDate);
    }
    if(this.empAttenForm.value.dateTo==null && this.empAttenForm.value.dateTo1){
      this.empAttenForm.get('dateTo').setValue(this.empAttenForm.value.dateTo1.singleDate.jsDate);
    }

    this.empAttenForm.value.status=='ACTIVE' ? this.empAttenForm.get('isActive').setValue('Y') : this.empAttenForm.get('isActive').setValue('N');
    this.obj.isActive = this.empAttenForm.value.isActive;
    this.obj.remark = this.empAttenForm.value.remark;
    this.submitted = true;

    this.empAttenForm.get('createdBy').setValue(Number(sessionStorage.getItem('userId')));
    this.empAttenForm.get('updatedBy').setValue(Number(sessionStorage.getItem('userId')));

    this.empAttenForm.controls['employeeId'].setValue(Number(this.empAttenForm.value.employeeId));
    this.empAttenForm.controls['companyId'].setValue(Number(this.empAttenForm.value.companyId));
    this.empAttenForm.controls['xShiftruleId'].setValue(Number(this.empAttenForm.value.xShiftruleId));
    
    this.obj.stdate=this.empAttenForm.value.stdate;
    this.obj.endate=this.empAttenForm.value.endate;
    this.obj.xShiftruleId = Number(this.empAttenForm.value.xShiftruleId);
    this.empattenService.addUpdateEmpAttendance(this.obj).subscribe(s=>{
      var success:any = s;
      this.submitted = false;
      this.empAttenForm.get('empAttnId').setValue(success.data.empAttnId);
      this.getAttenHeaderById();
      this.toastService.showToast('success', success.message);
     // this.router.navigate(['/views/transaction/emp-attendance/emp-attendance'],{queryParams:{id:success.data.empAttnId}});
     this.back() 
    });

    
  }

  empAttnLinesList:any =[];

  getLinesDataByAttnId(id){
      this.empattenService.getLinesDataByAttnId(id).subscribe(s=>{
        this.empAttnLinesList = s;
      });
  }

  back() {
      this.router.navigate(["/views/transaction/emp-attendance/emp-attendance-summary"]);
  }

  changeAtten(obj,flag){
    
    if(flag=="P"){
      obj.isPresent=="Y" ? obj.isPresent="N" :obj.isPresent="Y"; 
      obj.isPresent=="N" ? obj.processed="N" : (obj.processed=="Y" ? obj.processed="Y" : obj.processed="N");
    } else{
      obj.processed=="Y" ? obj.processed="N" : obj.processed="Y"; //(obj.isPresent=="Y" ? obj.processed="Y" :obj.processed="N");
     
    }

    this.updateDaywiseAtten(obj);
    
  }

  updateDaywiseAtten(obj){
    this.empattenService.updateDaywiseAtten(obj).subscribe(success=>{
        var s:any = success;
        this.toastService.showToast('success', s.message);
       // this.getLinesDataByAttnId(this.empAttenForm.value.empAttnId);
    });
  }



  selectcompany(id)
  {
    this.getEmployeeList(id);
  }


  


}
