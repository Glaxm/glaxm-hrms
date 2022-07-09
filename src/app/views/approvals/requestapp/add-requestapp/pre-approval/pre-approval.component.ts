import { ChangeDetectorRef, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AngularMyDatePickerDirective, IMyDateModel } from 'angular-mydatepicker';
import { CommonService, GeneralListCode } from 'src/app/views/services/common.service';
import { PreApprovalService } from './pre-approval.service';

@Component({
  selector: 'app-pre-approval',
  templateUrl: './pre-approval.component.html',
  styleUrls: ['./pre-approval.component.scss']
})
export class PreApprovalComponent implements OnInit {

  @Output() preApprovalRequest = new EventEmitter;
  @Input() companyId: string;
  @Input() holdingId: string;
  @Input() requestId: string;
  @Input() statuscode: string;
  @Input() employeeId: string;
  @Input() stdate:string;
  @Input() punchin:string;
  @Input() punchout:string;

  public myDatePickerOptions = this.commonService.datepickerFormat;
  @ViewChild('dp1', { static: false }) myDp1: AngularMyDatePickerDirective;
  @ViewChild('dp2', { static: false }) myDp2: AngularMyDatePickerDirective;
  @ViewChild('dp3', { static: false }) myDp3: AngularMyDatePickerDirective;

  preApprovalForm: FormGroup;
  moduleList: any = [];
  moduleid: any;
  flags = {
    createFlag: '',
    editFlag: '',
    readFlag: '',
    deleteFlag: '',
    exportFlag: '',
    importFlag: ''
  }

  @ViewChild('labelImport', { static: false })
  labelImport: ElementRef;
  fileToUpload: File = null;
  submitted: boolean = false;
  typeOfAbsenceList: any = [];
  absenceReasonList: any = [];

  constructor(private commonService: CommonService, private cdr: ChangeDetectorRef, private preapprovalService: PreApprovalService) {

    this.preApprovalForm = new FormGroup({

      lEmpabcenceId: new FormControl(null),
      companyId: new FormControl(null),
      holdingId: new FormControl(null),
      isActive: new FormControl(null),
      createdBy: new FormControl(null),
      updatedBy: new FormControl(null),
      created: new FormControl(null),
      updated: new FormControl(null),
      xEmployeeId: new FormControl(null),
      file: new FormControl(null),
      datetrx: new FormControl(null),
      datetrx1: new FormControl(null),
      lsAbsencetypeId: new FormControl(null),
      lsAbsenceRsnId: new FormControl(null),
      startdate: new FormControl(null),
      enddate: new FormControl(null),
      startTime: new FormControl(null),
      endTime: new FormControl(null),
      totalTime: new FormControl(null),
      description: new FormControl(null),
      path: new FormControl(null),
      documentno: new FormControl(null),
      g_APPROVALREQ_ID: new FormControl(null),
      empname: new FormControl(null),
      approvalstatus: new FormControl(null),
      trxdt: new FormControl(null),
      endate: new FormControl(null),
      stdate: new FormControl(null),

      empName: new FormControl(null),
      employmentStatus: new FormControl(null),
      function: new FormControl(null),
      companyName: new FormControl(null),
      department: new FormControl(null),
      worklocation: new FormControl(null),
      designation: new FormControl(null),
      fileName: new FormControl(null),
      enddate1: new FormControl(null),
      startdate1: new FormControl(null),
      punchin: new FormControl(null),
      punchout: new FormControl(null),
      preapprovallatecome: new FormControl(null),
      isValidate: new FormControl(null)
    });

  }

  ngOnInit() {

    // this.moduleList = JSON.parse(sessionStorage.getItem("moduleList"));
    // if (this.moduleList) {
    //   this.moduleList.map((e) => {
    //     if (e.moduleGroup == 'Loan Management' && e.moduleName == 'Employee Loan') {
    //      this.moduleid=e.moduleId;
    //       this.flags = { 
    //             'createFlag': e.createFlag, 
    //             'editFlag': e.editFlag, 
    //             'readFlag': e.readFlag, 
    //             'deleteFlag': e.deleteFlag,
    //             'importFlag': e.importFlag,
    //             'exportFlag': e.exportFlag
    //             };
    //     }
    //   });
    // }
    if (this.employeeId) {
      this.getEmpById(this.employeeId);
    }
    if(this.requestId){
      this.getEmpAbsenceReqByRquestId(this.requestId);
    }

    this.getAbsenceTypeList();
    this.getAbsenceReasonList();

    if(this.stdate){
        let datetrx: Date = new Date();
        let datetrxmodel: IMyDateModel = { isRange: false, singleDate: { jsDate: datetrx }, dateRange: null };
        this.preApprovalForm.controls['datetrx1'].setValue(datetrxmodel);
       
        let startDate: Date = new Date(this.stdate);
        let fromModel: IMyDateModel = {isRange: false, singleDate: {jsDate: startDate}, dateRange: null};
        this.preApprovalForm.controls['startdate1'].setValue(fromModel);
        
        let endDate: Date = new Date(this.stdate);
        let toModel: IMyDateModel = {isRange: false, singleDate: {jsDate: endDate}, dateRange: null};
        this.preApprovalForm.controls['enddate1'].setValue(toModel);
        
    }

    if(this.employeeId && this.stdate){
      let stdt = this.commonService.dateFormat(this.stdate);
      this.getempAttnbyDt(this.employeeId,stdt);
    }
    
  }

  get f() { return this.preApprovalForm.controls; }

  getEmpAbsenceReqByRquestId(requestid){
    this.preapprovalService.getEmpAbsenceReqByRquestId(requestid).subscribe(success => {
        var data:any = success;

        if(data.data[0].datetrx){
          let datetrx: Date = new Date(data.data[0].datetrx);
          let datetrxmodel: IMyDateModel = { isRange: false, singleDate: { jsDate: datetrx }, dateRange: null };
          this.preApprovalForm.controls['datetrx1'].setValue(datetrxmodel);
          }
          if(data.data[0].startdate){
          let startDate: Date = new Date(data.data[0].startdate);
          let fromModel: IMyDateModel = {isRange: false, singleDate: {jsDate: startDate}, dateRange: null};
          this.preApprovalForm.controls['startdate1'].setValue(fromModel);
          }
    
          if(data.data[0].enddate){
          let endDate: Date = new Date(data.data[0].enddate);
          let toModel: IMyDateModel = {isRange: false, singleDate: {jsDate: endDate}, dateRange: null};
          this.preApprovalForm.controls['enddate1'].setValue(toModel);
          }

      this.preApprovalForm.patchValue(data.data[0]);
      if(this.employeeId && data.data[0].startdate){
        this.getempAttnbyDt(this.employeeId,data.data[0].startdate);
      }
      this.preApprovalForm.controls['startTime'].setValue(data.data[0].startTime);
      this.preApprovalForm.controls['endTime'].setValue(data.data[0].endTime);
  

      this.preApprovalForm.disable();
    })
  }

  getAbsenceTypeList() {
    this.commonService.getGeneralListByCode(GeneralListCode.TYPE_OF_ABSENCE).subscribe(data => {
      this.typeOfAbsenceList = data;
    })
  }

  getAbsenceReasonList() {
    this.commonService.getGeneralListByCode(GeneralListCode.ABSENCE_REASON).subscribe(data => {
      this.absenceReasonList = data;
    })
  }

  getEmpById(id) {
    this.preapprovalService.getEmpDetailsById(id).subscribe(s => {
      var empDetails: any = s;

      this.preApprovalForm.controls['empName'].setValue(empDetails.displayName);
      this.preApprovalForm.controls['companyName'].setValue(empDetails.compName);
      this.preApprovalForm.controls['department'].setValue(empDetails.deptName);
      this.preApprovalForm.controls['function'].setValue(empDetails.divName);
      this.preApprovalForm.controls['designation'].setValue(empDetails.desigName);
      this.preApprovalForm.controls['employmentStatus'].setValue(empDetails.empStatus);
      this.preApprovalForm.controls['worklocation'].setValue(empDetails.workLocation);

    });

  }

  toggleCalendar(): void {
    this.cdr.detectChanges();
    this.myDp3.toggleCalendar();
  }

  changeTransDate(event) {
    this.preApprovalForm.get('datetrx').setValue(this.commonService.dateFormat(event.singleDate.jsDate));
  }

  changeStartDate(event) {
    this.preApprovalForm.get('stdate').setValue(this.commonService.dateFormat(event.singleDate.jsDate));
  }
  changeEndDate(event) {
    this.preApprovalForm.get('endate').setValue(this.commonService.dateFormat(event.singleDate.jsDate));
  }

  calTime() {
     // alert(this.preApprovalForm.value.startTime +"  "+this.preApprovalForm.value.endTime);
     if(this.preApprovalForm.value.startTime && this.preApprovalForm.value.endTime){
      this.preApprovalForm.get('totalTime').setValue(this.diffTime(this.preApprovalForm.value.startTime,this.preApprovalForm.value.endTime));
      this.preApprovalRequest.emit(this.preApprovalForm.value);
    }}

  preApprovalRequestEvent() {

    // this.preApprovalForm.controls["isValidate"].setValue(false);    
    this.submitted = true;
    if (this.preApprovalForm.invalid) {
      return;
    } else {    
      // this.preApprovalForm.controls["isValidate"].setValue(true);
      this.preApprovalRequest.emit(this.preApprovalForm.value);
  }
}

  //Time calculation
  pad(num) {
    return ("0"+num).slice(-2);
  }
  
  diffTime(start,end) {
    var s = start.split(":"), sMin = +s[1] + s[0]*60,
        e =   end.split(":"), eMin = +e[1] + e[0]*60,
     diff = eMin-sMin;
    if (diff<0) { sMin-=12*60;  diff = eMin-sMin }
    var h = Math.floor(diff / 60),
        m = diff % 60;
        
    return "" + this.pad(h) + ":" + this.pad(m);
  }


  getempAttnbyDt(employeeId, attnDate){

      this.preapprovalService.getempAttnbyDt(employeeId,attnDate).subscribe(success=>{
            var attnObj:any = success;
          //  alert(attnObj.data.startTime +" "+attnObj.data.endTime);

            this.preApprovalForm.controls['punchin'].setValue(attnObj.data.startTime);
            this.preApprovalForm.controls['punchout'].setValue(attnObj.data.endTime);

          //  if(){
            if(attnObj.data.startTime){
              this.preApprovalForm.controls['startTime'].setValue(attnObj.data.startTime);
            }
            if(attnObj.data.endTime){
              this.preApprovalForm.controls['endTime'].setValue(attnObj.data.endTime);
            }
            
          
            //}
      });
  }

  // *********************************** FILE UPLOAD

  // api/empabsence/saveempabsencedoc


  onFileChange(files: FileList) {
    this.labelImport.nativeElement.innerText = Array.from(files)
      .map(f => f.name)
      .join(', ');
    this.preApprovalForm.get('file').setValue(files.item(0));
    this.preApprovalRequestEvent();
  }

  istwohrsonlyallowed:boolean=false;
  selectTypeOfAbsecnce(lsAbsencetypeId){
    let list = this.typeOfAbsenceList.filter(d=> d.lListitemId==lsAbsencetypeId);
    if(list){ this.preApprovalForm.get('preapprovallatecome').setValue(list[0].name); }
    // if(list[0].name=="Pre-approval request for late coming " || list[0].name=="Pre-approval request for early leaving"){
    //   this.istwohrsonlyallowed = true;
    // } else{
    //   this.istwohrsonlyallowed = false;
    // }
  }

  openAttachment(){}

}
