import { ChangeDetectorRef, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularMyDatePickerDirective, IMyDateModel } from 'angular-mydatepicker';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { CommonService, GeneralListCode } from 'src/app/views/services/common.service';
import { PreApprovalService } from '../pre-approval.service';

@Component({
  selector: 'app-add-edit-preapproval',
  templateUrl: './add-edit-preapproval.component.html',
  styleUrls: ['./add-edit-preapproval.component.scss']
})
export class AddEditPreapprovalComponent implements OnInit {

  @Output() preApprovalRequest = new EventEmitter;
  @Input() companyId: string;
  @Input() holdingId: string;
  @Input() requestId: string;
  @Input() statuscode: string;
  @Input() employeeId: string;


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

  isView:any;
  submitted:boolean=false;
  employeeList:any=[];
  @ViewChild('labelImport', { static: false })
  labelImport: ElementRef;
  fileToUpload: File = null;

  typeOfAbsenceList: any = [];
  absenceReasonList: any = [];

  obj={ employeeId:null }
  lEmpabcenceId:any;
  constructor(private router:Router,private activatedRoute:ActivatedRoute,private commonService: CommonService, private cdr: ChangeDetectorRef, private preapprovalService:PreApprovalService) {

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
      employee:new FormControl(null),
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
      startdate1: new FormControl(null)
    });

    this.activatedRoute.queryParams.subscribe(params => {
      this.preApprovalForm.controls['lEmpabcenceId'].setValue(params.id);
      this.lEmpabcenceId = params.id;
      this.isView = params.view;
      this.moduleid = params.moduleid;
    });

  }

  ngOnInit() {

   

    this.companySetting();
    this.getEmployeeList();
    // if (this.lEmpabcenceId) {
    //   this.getEmpById(this.employeeId);
    // }
    if(this.lEmpabcenceId){
      this.getEmpAbsenceReqById(this.lEmpabcenceId);
    }

    this.getAbsenceTypeList();
    this.getAbsenceReasonList();
  }

  getEmpAbsenceReqById(id){
    this.preapprovalService.getEmpAbsenceReqById(id).subscribe(success => {
        var data:any = success;
        this.getEmpById(data.data.xEmployeeId);
        if(data.data.datetrx){
          let datetrx: Date = new Date(data.data.datetrx);
          let datetrxmodel: IMyDateModel = { isRange: false, singleDate: { jsDate: datetrx }, dateRange: null };
          this.preApprovalForm.controls['datetrx1'].setValue(datetrxmodel);
          }
          if(data.data.startdate){
          let startDate: Date = new Date(data.data.startdate);
          let fromModel: IMyDateModel = {isRange: false, singleDate: {jsDate: startDate}, dateRange: null};
          this.preApprovalForm.controls['startdate1'].setValue(fromModel);
          }
    
          if(data.data.enddate){
          let endDate: Date = new Date(data.data.enddate);
          let toModel: IMyDateModel = {isRange: false, singleDate: {jsDate: endDate}, dateRange: null};
          this.preApprovalForm.controls['enddate1'].setValue(toModel);
          }
          this.selectedEmpList = this.employeeList.filter(o1 => o1.employeeId == data.data.xEmployeeId);
      this.preApprovalForm.patchValue(data.data);
      
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

  // alert(JSON.stringify(this.preApprovalForm.value));
    this.preApprovalRequest.emit(this.preApprovalForm.value);
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

  get f() { return this.preApprovalForm.controls; }
  addPreapproval(){


    this.preApprovalForm.get('createdBy').setValue(Number(sessionStorage.getItem('userId')));
    this.preApprovalForm.get('created').setValue(new Date());
    this.preApprovalForm.get('updatedBy').setValue(Number(sessionStorage.getItem('userId')));
    this.preApprovalForm.get('updated').setValue(new Date());

    this.submitted = true;
    if (this.preApprovalForm.invalid) {
      return;
    } else { 
    this.preapprovalService.addPreapproval(this.preApprovalForm.value).subscribe(success=>{
        var data:any = success;

    })}

  }

  back(){
    this.router.navigate(['/views/transaction/pre-approval/pre-approval-summary']);
  }

      //================================================ Multiselect Company list

      selectedEmpList = [];
      dropdownSettings: IDropdownSettings;
    

      getEmployeeList(){
        
        let list: any = JSON.parse(sessionStorage.getItem("company"));
        var l: any = [];
        if (list) {
          for (var i = 0; i < list.length; i++) {
            l.push(Number(list[i]));
          }
        }

        this.preapprovalService.getEmployeeList(this.moduleid,l).subscribe(s=>{
          this.employeeList=s;
          if(this.preApprovalForm.value){
            this.selectedEmpList = this.employeeList.filter(o1 => this.obj.employeeId.some(o2 => o1.employeeId === o2));
          }
        });
      }

      companySetting() {
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
     
      onCompnaySelect(item: any) {
        this.selectedEmpList.push(item);
        this.getEmpById(item.employeeId);
      }
    
      onCompanyDeSelect(items: any) {
        this.selectedEmpList = this.selectedEmpList.filter(item => item.employeeId !== items.employeeId);
      }
    
      onSelectAllCompnay(items: any) {
        this.selectedEmpList = [];
        this.selectedEmpList.push(...[items]);
      }

      setEmpList(list) {
        let elm: any = [];
        list.forEach(element => {
          elm.push(element.employeeId);
        });
        let unique = [...new Set(elm)];
        return unique;
      }
  


}
