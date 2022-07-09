import { ChangeDetectorRef, ElementRef, Component, EventEmitter, Input, OnInit, Output, ViewChild, OnChanges, SimpleChanges, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularMyDatePickerDirective, IMyDateModel } from 'angular-mydatepicker';
import { Subscription } from 'rxjs';
import { CommonService, GeneralListCode } from 'src/app/views/services/common.service';
import { ToastrService } from 'src/app/views/services/toastr.service';
import { EmpLeaveService } from 'src/app/views/transaction/emp-leave/emp-leave.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
import { RequestappService } from '../../requestapp.service';

@Component({
  selector: 'app-leave-request',
  templateUrl: './leave-request.component.html',
  styleUrls: ['./leave-request.component.scss']
})
export class LeaveRequestComponent implements OnInit, OnDestroy {

  empleaveForm: FormGroup;
  isView: boolean = false;
  isdays:boolean;
  isTicketFlag:boolean;
  isTicketAmt:boolean;
  cmpnyId: any;
  holdingList: any = [];
  companyList: any = [];
  fromAirportList: any = [];
  toList: any = [];
  airTktEntitlementList: any = [];
  airTktClassList: any = [];
  viewform: boolean;
  parentUrl: any;
  employeeList: any;
  leaveList: any = [];
  submitted: boolean = false;
  leaveHistoryList: any = [];
  xLeaveitemId:any;
  lEmpleaveId:any;
  leavedays:any;
  @Input() companyId: string;
  @Input() holdingId: string;
  @Input() requestId: string;
  @Input() statuscode: string;
  @Input() employeeId: string;

  filePath: any;
  public myDatePickerOptions = this.commonService.datepickerFormat;
  @ViewChild('dp1', { static: false }) myDp1: AngularMyDatePickerDirective;
  @ViewChild('dp2', { static: false }) myDp2: AngularMyDatePickerDirective;
  @ViewChild('dp3', { static: false }) myDp3: AngularMyDatePickerDirective;
  @ViewChild('dp4', { static: false }) myDp4: AngularMyDatePickerDirective;
  @ViewChild('dp5', { static: false }) myDp5: AngularMyDatePickerDirective;
  @ViewChild('dp6', { static: false }) myDp6: AngularMyDatePickerDirective;
  @ViewChild('dp7', { static: false }) myDp7: AngularMyDatePickerDirective;
  @ViewChild('dp8', { static: false }) myDp8: AngularMyDatePickerDirective;


  fromAirsectorId: any;
  toAirsectorId: any;
  airtktEntitled: any;
  airtktClass: any;
  isTicketIncashment:any;

  moduleList: any = [];
  moduleid:any;
  flags = {
    createFlag: '',
    editFlag: '',
    readFlag: '',
    deleteFlag: '',
    exportFlag:'',
    importFlag:'',
    forSelfFlag:''
  }

  @ViewChild('labelImport', { static: false })
  labelImport: ElementRef;
  fileToUpload: File = null;


  onFileChange(files: FileList) {
    this.labelImport.nativeElement.innerText = Array.from(files)
      .map(f => f.name)
      .join(', ');
    this.empleaveForm.get('file').setValue(files.item(0));
    this.leaveRequestEvent();
  }

  import(): void {
    console.log('import ' + this.fileToUpload.name);
  }

  statusList: any = [{ valueCode: 'ACTIVE', valueName: 'Active' }, { valueCode: 'INACTIVE', valueName: 'Inactive' }];
  statusList1: any = [{ valueCode: 'INACTIVE', valueName: 'Inactive' }, { valueCode: 'VOID', valueName: 'Void' }]

  constructor(private toastService: ToastrService, private commonService: CommonService, private cdr: ChangeDetectorRef,
    private empLeaveService: EmpLeaveService, public requestService: RequestappService, private router: Router, private activatedRoute: ActivatedRoute) {
    this.empleaveForm = new FormGroup({
      replacedBy: new FormControl(null),
      lEmpleaveId: new FormControl(null),
      gCompanyId: new FormControl(0),
      gHoldingId: new FormControl(0),
      isActive: new FormControl(null),
      status: new FormControl(null),
      checkstatus: new FormControl(null),
      created: new FormControl(null),
      paidLeaveDays: new FormControl(null),
      unpaidLeaveDays: new FormControl(null),
      createdBy: new FormControl(0),
      updated: new FormControl(null),
      updatedBy: new FormControl(0),
      documentno: new FormControl(null),
      datetrx: new FormControl(null),
      datetrx1: new FormControl(null),
      xEmployeeId: new FormControl(null),
      description: new FormControl(null),
      xLeaveitemId: new FormControl(null, [Validators.required]),
      leaveitemcode: new FormControl(null),
      startdate: new FormControl(null),
      enddate: new FormControl(null),
      startdate1: new FormControl(null, [Validators.required]),
      enddate1: new FormControl(null, [Validators.required]),
      leavedays: new FormControl(null),
      upLeavedays: new FormControl(null),
      processed: new FormControl(null),
      employee: new FormControl(null),
      remarks: new FormControl(null),
      leavePurpose: new FormControl(null),
      contactDetails: new FormControl(null),
      fromAirsectorId: new FormControl(null),
      toAirsectorId: new FormControl(null),
      airtktEntitled: new FormControl(null),
      airtktClass: new FormControl(null),
      ticket: new FormControl(null),
      fileName: new FormControl(null),
      file: new FormControl(null),
      std: new FormControl(null),
      end: new FormControl(null),
      trxd: new FormControl(null),
      ticketAmount: new FormControl(null),
      isHalfday: new FormControl(null),
      isHalfday1: new FormControl(null),
      lastleavesettledupto: new FormControl(null),
      lastleavesettledupto1: new FormControl(null),
      curleavesettledupto: new FormControl(null),
      curleavesettledupto1: new FormControl(null),
      lastticketsettledupto: new FormControl(null),
      lastticketsettledupto1: new FormControl(null),
      curticketsettledupto: new FormControl(null),
      curticketsettledupto1: new FormControl(null),
      toresumedutyon: new FormControl(null),
      toresumedutyon1: new FormControl(null),
      lastlvstdt: new FormControl(null),
      curlvstdt: new FormControl(null),
      lastticketstdt: new FormControl(null),
      curticketstdt: new FormControl(null),
      encashment: new FormControl(null),
      baldays: new FormControl(null),
      encashDays: new FormControl(null),
      isagree: new FormControl(null)
    });
    this.leaveRequest.emit(this.empleaveForm.value);
    this.subscription = this.requestService.getCompanyId().subscribe(message => { this.cmpnyId = message; });
  
    this.moduleList = JSON.parse(sessionStorage.getItem("moduleList"));
    if (this.moduleList) {
      this.moduleList.map((e) => {
       //s alert(JSON.stringify(e));
        if (e.moduleGroup == 'Leave Management' && e.moduleName == 'Employee Leave') {
        
         this.moduleid=e.moduleId;
          this.flags = { 
                'createFlag': e.createFlag, 
                'editFlag': e.editFlag, 
                'readFlag': e.readFlag, 
                'deleteFlag': e.deleteFlag,
                'importFlag': e.importFlag,
                'exportFlag': e.exportFlag,
                'forSelfFlag':e.forSelf
                };
        }
      });
    }

  }

  toggleCalendar(): void {
    this.cdr.detectChanges();
    this.myDp1.toggleCalendar();
  }


  isShowPopup:boolean=false;
  changeStartDate(event) {
    if(this.ngOnInitFlag){
      this.isShowPopup=false;
    } else{
    this.isShowPopup=true;}
    this.empleaveForm.get('startdate').setValue(event.singleDate.jsDate);
    if(this.requestId){ 
     // this.empleaveForm.controls['leavedays'].setValue(this.calDays());
    } else{
      this.empleaveForm.controls['paidLeaveDays'].setValue(this.calDays());
    }
  
    
  }

  changeEndDate(event) {
   if(this.ngOnInitFlag){
      this.isShowPopup=false;
      this.ngOnInitFlag=false;
    } else{
    this.isShowPopup=true;}
    this.empleaveForm.get('enddate').setValue(event.singleDate.jsDate);
    if(this.requestId){ 
    //  this.empleaveForm.controls['leavedays'].setValue(this.calDays());
    //  this.setDates();
    } else{
      this.empleaveForm.controls['paidLeaveDays'].setValue(this.calDays());
    //  this.setDates();
    }
    //this.setDates();
  }

  changeTransDate(event) {
    this.empleaveForm.get('datetrx').setValue(event.singleDate.jsDate);
  }


  changeLastLeaveSettledUpTo(event){
    this.empleaveForm.get('lastleavesettledupto').setValue(event.singleDate.jsDate);
    this.calSettlementDt( {
      "lastsettledLeave":this.commonService.dateFormat(event.singleDate.jsDate),
      "xEmployeeId":this.empleaveForm.value.xEmployeeId,
      "leavedays":this.empleaveForm.value.leavedays,
      "xLeaveitemId":this.empleaveForm.value.xLeaveitemId ? Number(this.empleaveForm.value.xLeaveitemId) : 0
    });
  }

  calSettlementDt(data){
    this.empLeaveService.calSettlementDt(data 
     ).subscribe(success=>{
        var data:any = success;
        if(data.data.curleavesettledupto){
          let curleavesettledupto: Date = new Date(data.data.curleavesettledupto);
          let fromModel1: IMyDateModel = { isRange: false, singleDate: { jsDate: curleavesettledupto }, dateRange: null };
          this.empleaveForm.controls['curleavesettledupto1'].setValue(fromModel1);
          this.changeCurrentAirTicketSettledUpTo(this.empleaveForm.value.curleavesettledupto1);
          this.leaveRequest.emit(this.empleaveForm.value);        
          }
    })
  }

  changeCurrentLeaveSettledUpTo(event){
    this.empleaveForm.get('curleavesettledupto').setValue(event.singleDate.jsDate);
  }

  changeLastAirTicketUpTo(event){
    this.empleaveForm.get('lastticketsettledupto').setValue(event.singleDate.jsDate);
  }

  changeCurrentAirTicketSettledUpTo(event){
    this.empleaveForm.get('curticketsettledupto').setValue(event.singleDate.jsDate);
  }

  changeToResumeDutyOn(event){
    this.empleaveForm.get('toresumedutyon').setValue(event.singleDate.jsDate);
  }



  get f() { return this.empleaveForm.controls; }
  ngOnInitFlag:boolean=false;
  ngOnInit() {
    this.getHoldingList();
    this.employeeId ? this.getLeaveItemList() : '';
    this.getFromAirportList();
    this.getAirTecketEntitlementList();
    this.getAirTicketClassList();
    this.getAirsector();
    sessionStorage.setItem('end', null);
    this.empleaveForm.controls['xEmployeeId'].setValue(this.employeeId);
    if (this.requestId) {
       this.ngOnInitFlag=true;
       this.isdays=true;
      this.empLeaveService.getEmpleaveByRequestId(this.requestId).subscribe(success => {
        var s: any = success;
        this.empleaveForm.patchValue(s.data[0]);
         this.lEmpleaveId = s.data[0].lEmpleaveId;
        if (this.empleaveForm.value.xEmployeeId) {
          this.getLeaveHistoryListByEmpId(this.empleaveForm.value.xEmployeeId);
        }
        this.fromAirsectorId = s.data[0].fromAirsectorId;
        this.toAirsectorId = s.data[0].toAirsectorId;
        this.airtktEntitled = s.data[0].airtktEntitled;
        this.airtktClass = s.data[0].airtktClass;
        this.xLeaveitemId = s.data[0].xLeaveitemId;
        this.leavedays = s.data[0].leavedays;

        
        this.isTicketFlag = s.data[0].airtktCb ? true : false;
        if(s.data[0].airtktCb == "With Ticket Encashment Claim - Both Side" || s.data[0].airtktCb == "With Ticket Encashment Claim - One Side"){
            this.isTicketAmt = true;
        } else {
          this.isTicketAmt=false;
        }
        let startDate: Date = new Date(s.data[0].startdate);
        let fromModel: IMyDateModel = { isRange: false, singleDate: { jsDate: startDate }, dateRange: null };
        this.empleaveForm.controls['startdate1'].setValue(fromModel);

        let endDate: Date = new Date(s.data[0].enddate);
        let toModel: IMyDateModel = { isRange: false, singleDate: { jsDate: endDate }, dateRange: null };
        this.empleaveForm.controls['enddate1'].setValue(toModel);

        let datetrx: Date = new Date(s.data[0].datetrx);
        let datetrxmodel: IMyDateModel = { isRange: false, singleDate: { jsDate: datetrx }, dateRange: null };
        this.empleaveForm.controls['datetrx1'].setValue(datetrxmodel);

        s.data[0].isHalfday=="Y" ?  this.empleaveForm.get('isHalfday1').setValue(true) : this.empleaveForm.get('isHalfday1').setValue(false);

        // ----
        if(s.data[0].toResumedt){
          let toResumedt: Date = new Date(s.data[0].toResumedt);
          let fromModel4: IMyDateModel = { isRange: false, singleDate: { jsDate: toResumedt }, dateRange: null };
          this.empleaveForm.controls['toresumedutyon1'].setValue(fromModel4);
          }


        if(s.data[0].lastleavesettledupto){
          let lastleavesettledupto: Date = new Date(s.data[0].lastleavesettledupto);
          let fromModel: IMyDateModel = { isRange: false, singleDate: { jsDate: lastleavesettledupto }, dateRange: null };
          this.empleaveForm.controls['lastleavesettledupto1'].setValue(fromModel);
         }
          if(s.data[0].curleavesettledupto){
          let curleavesettledupto: Date = new Date(s.data[0].curleavesettledupto);
          let fromModel1: IMyDateModel = { isRange: false, singleDate: { jsDate: curleavesettledupto }, dateRange: null };
          this.empleaveForm.controls['curleavesettledupto1'].setValue(fromModel1);
          }
          if(s.data[0].lastticketsettledupto && this.isTicketFlag){
          let lastticketsettledupto: Date = new Date(s.data[0].lastticketsettledupto);
          let fromModel2: IMyDateModel = { isRange: false, singleDate: { jsDate: lastticketsettledupto }, dateRange: null };
          this.empleaveForm.controls['lastticketsettledupto1'].setValue(fromModel2);
          }
          if(s.data[0].curticketsettledupto && this.isTicketFlag){
          let curticketsettledupto: Date = new Date(s.data[0].curticketsettledupto);
          let fromModel3: IMyDateModel = { isRange: false, singleDate: { jsDate: curticketsettledupto }, dateRange: null };
          this.empleaveForm.controls['curticketsettledupto1'].setValue(fromModel3);
          }
          
                 // -----

        sessionStorage.setItem('xLeaveitemId', s.data[0].xLeaveitemId);
        sessionStorage.setItem('leavedays', s.data[0].leavedays);
        this.selectLeave(s.data[0].xLeaveitemId);
        this.empleaveForm.get('leavedays').setValue(s.data[0].leavedays);
        this.empleaveForm.get('paidLeaveDays').setValue(s.data[0].paidLeaveDays);
        this.empleaveForm.get('unpaidLeaveDays').setValue(s.data[0].unpaidLeaveDays);

       

        if (s.data[0].startdate) {
          sessionStorage.setItem('std', this.commonService.dateFormat(s.data[0].startdate));
        }
        if (s.data[0].enddate) {
          sessionStorage.setItem('end', this.commonService.dateFormat(s.data[0].enddate));
        }
        if (s.data[0].datetrx) {
          sessionStorage.setItem('trxd', this.commonService.dateFormat(s.data[0].datetrx));
        }

        this.filePath = s.data[0].path;
        this.empleaveForm.controls['fileName'].setValue(s.data[0].path);

        this.empleaveForm.controls['ticket'].setValue(s.data[0].airtktCb);
        
        let list = this.leaveList.filter(item => item.xLeaveitemId == s.data[0].xLeaveitemId);

        if (list.length > 0) {
          this.empleaveForm.get('leaveitemcode').setValue(list[0].code);
        }


        this.empleaveForm.disable();
        if(list[0].firstLevelStatus = 'P'){
          this.empleaveForm.controls.checkstatus.enable(); 
          this.empleaveForm.get('checkstatus').setValue("INACTIVE");  
        }
       
        if (this.statuscode == 'P') {
          this.empleaveForm.controls.leaveitemcode.enable();
          this.empleaveForm.controls.startdate1.enable();
          this.empleaveForm.controls.enddate1.enable();
          this.empleaveForm.controls.startdate.enable();
          this.empleaveForm.controls.enddate.enable();
          this.empleaveForm.controls.paidLeaveDays.enable();
          this.empleaveForm.controls.unpaidLeaveDays.enable();
          this.empleaveForm.controls.ticketAmount.enable();
        
          this.empleaveForm.controls.lastleavesettledupto1.enable();
          this.empleaveForm.controls.curleavesettledupto1.enable();
          this.empleaveForm.controls.lastticketsettledupto1.enable();
          this.empleaveForm.controls.curticketsettledupto1.enable();
          this.empleaveForm.controls.toresumedutyon1.enable();
          this.empleaveForm.controls.toresumedutyon.enable();
          this.empleaveForm.controls.lastleavesettledupto.enable();
          this.empleaveForm.controls.curleavesettledupto.enable();
          this.empleaveForm.controls.lastticketsettledupto.enable();
          this.empleaveForm.controls.curticketsettledupto.enable();
        }
        this.viewform = true;
      });
    } else {

      
      let datetrx: Date = new Date();
      let datetrxmodel: IMyDateModel = { isRange: false, singleDate: { jsDate: datetrx }, dateRange: null };
      this.empleaveForm.controls['datetrx1'].setValue(datetrxmodel);
      this.changeTransDate(datetrxmodel);

      // this.empleaveForm.controls.paidLeaveDays.disable();
      // this.empleaveForm.controls.unpaidLeaveDays.disable();
      this.empleaveForm.controls['status'].setValue('ACTIVE');
      this.empleaveForm.get('documentno').setValue("ELT" + Math.floor(1000 + Math.random() * 9000));
    }

    this.empleaveForm.get('gHoldingId').setValue(this.holdingId);
    this.empleaveForm.get('gCompanyId').setValue(this.companyId);
  
  }

  getAirTecketEntitlementList() {
    this.commonService.getGeneralListByCode(GeneralListCode.AIR_TICKET_ENTITLEMENT_LIST).subscribe(data => {
      this.airTktEntitlementList = data;
    })
  }
  getAirTicketClassList() {
    this.commonService.getGeneralListByCode(GeneralListCode.AIR_TICKET_LIST).subscribe(data => {
      this.airTktClassList = data;
    })
  }

  getFromAirportList() {
    this.commonService.getGeneralListByCode(GeneralListCode.FROM_AIRPORT_LIST).subscribe(data => {
      this.fromAirportList = data;
    })
  }

  getAirsector() {
    this.empLeaveService.getAirsectorDetails().subscribe(data => {
      this.toList = data;
    });
  }

  getLeaveHistoryListByEmpId(id) {
    this.empLeaveService.getLeaveHistoryListByEmpId(id).subscribe(data => {
      this.leaveHistoryList = data;
    })
  }

  getAllEmployee() {
    let list: any = JSON.parse(sessionStorage.getItem("company"));
    var l: any = [];
    if (list) {
      for (var i = 0; i < list.length; i++) {
        l.push(Number(list[i]));
      }
    }
    this.empLeaveService.getAllEmployee(this.moduleid,l).subscribe(s => {
      this.employeeList = s;
    });
  }

  getCOmpanyById(id) {
    this.empLeaveService.getCompanyById(id).subscribe(s => {
      this.companyList = s;
    });
  }

  calDays() {

    if (this.empleaveForm.value.startdate && this.empleaveForm.value.enddate) {
      var date1: any = this.empleaveForm.value.startdate;
      var date2: any = this.empleaveForm.value.enddate;
      var diffDays: any = Math.floor((date2 - date1) / (1000 * 60 * 60 * 24)) + 1;
      return diffDays;
    } else {
      return 0;
    }
  }

  getHoldingList() {
    this.empLeaveService.getAllHolding().subscribe(s => {
      this.holdingList = s;
      if (this.empleaveForm.value.bankId) { } else {
        this.empleaveForm.controls['gHoldingId'].setValue(this.holdingList[0].gHoldingId);
        this.getCOmpanyById(this.holdingList[0].gHoldingId);
      }
    })
  }

  getLeaveItemList() {
    this.empLeaveService.getLeaveItemList_V1(this.employeeId).subscribe(s => {
      this.leaveList = s;
    });
  }


  // --------------------------------------------------------------------------------------------------------

  isHalfdayAllowed:boolean=false;
  leaveCode:any;
  selectLeave(leaveid){
      let list = this.leaveList.filter(data=>data.xLeaveitemId ==leaveid);
      if(list){this.leaveCode = list[0].code; }
       list && list[0].halfdayAllowed=="Y" ? this.isHalfdayAllowed=true: this.isHalfdayAllowed = false;
       if(this.ldays && (list[0].code != 'AL' || list[0].code !='ALWD')){
        this.empleaveForm.controls['paidLeaveDays'].setValue(this.ldays);
       }
       if(list[0].code ==='ALWD'){
        this.empleaveForm.controls['encashment'].setValue("Y");
       } else{
        this.empleaveForm.controls['encashment'].setValue(null);
       }

       if(list[0].code =='ENCASH' && this.requestId==null){
        let startDate: Date = new Date();
        let fromModel: IMyDateModel = { isRange: false, singleDate: { jsDate: startDate }, dateRange: null };
        this.empleaveForm.controls['startdate1'].setValue(fromModel);

        let endDate: Date = new Date();
        let toModel: IMyDateModel = { isRange: false, singleDate: { jsDate: endDate }, dateRange: null };
        this.empleaveForm.controls['enddate1'].setValue(toModel);
        
        this.empleaveForm.controls['paidLeaveDays'].disable();
        this.empleaveForm.controls['unpaidLeaveDays'].disable();
        this.empleaveForm.controls['startdate1'].disable();
        this.empleaveForm.controls['enddate1'].disable();
      } else{
        
        this.empleaveForm.controls['paidLeaveDays'].enable();
        this.empleaveForm.controls['unpaidLeaveDays'].enable();
        this.empleaveForm.controls['startdate1'].enable();
        this.empleaveForm.controls['enddate1'].enable();
      }
  
       this.getLeaveBal(leaveid);
  }


  // getLeaveBal(leaveid){
    
  //   this.requestService.getLeaveBal({ 
  //     "strdate": this.empleaveForm.value.startdate ? this.commonService.dateFormat(this.empleaveForm.value.startdate):null, 
  //     "enddate": this.empleaveForm.value.enddate ? this.commonService.dateFormat(this.empleaveForm.value.enddate):null,
  //     "xEmployeeId": this.employeeId, 
  //     "encashDays":this.empleaveForm.value.encashDays ? this.empleaveForm.value.encashDays : 0,
  //     "leavedays": this.empleaveForm.value.leavedays ? this.empleaveForm.value.leavedays : 0, 
  //     "xLeaveitemId": Number(leaveid) }).subscribe(success => {
  //     var data:any = success;
  //       if(data.code==0){
  //         this.empleaveForm.controls['baldays'].setValue(data.data.baldays);
  //       } else{
  //         this.empleaveForm.controls['baldays'].setValue(null);
  //       }
  //   });
  // }



  getLeaveBal(leaveid){
    
    this.empLeaveService.getLeaveBal({
      "strdate": this.empleaveForm.value.stdate ? this.empleaveForm.value.stdate : null,
      "enddate": this.empleaveForm.value.endate ? this.empleaveForm.value.endate : null,
      "xEmployeeId": this.empleaveForm.value.xEmployeeId,
      "leavedays": this.empleaveForm.value.leavedays ? this.empleaveForm.value.leavedays : 0,
      "encashDays":this.empleaveForm.value.encashDays ? this.empleaveForm.value.encashDays : 0,
      "xLeaveitemId": Number(leaveid)
    }).subscribe(success => {
     var data:any = success;
        if(data.code==0){
          if(this.leaveCode=='SL'){
            this.empleaveForm.controls['baldays'].setValue(null);
          } else{
            this.empleaveForm.controls['baldays'].setValue(data.data.baldays);
          }

          if (data.data.lastleavesettledupto) {
            let lastleavesettledupto: Date = new Date(data.data.lastleavesettledupto);
            let fromModel: IMyDateModel = { isRange: false, singleDate: { jsDate: lastleavesettledupto }, dateRange: null };
            this.empleaveForm.controls['lastleavesettledupto1'].setValue(fromModel);
          }
          if (data.data.curleavesettledupto) {
            let curleavesettledupto: Date = new Date(data.data.curleavesettledupto);
            let fromModel1: IMyDateModel = { isRange: false, singleDate: { jsDate: curleavesettledupto }, dateRange: null };
            this.empleaveForm.controls['curleavesettledupto1'].setValue(fromModel1);
          }
          if (data.data.lastticketsettledupto && this.empleaveForm.value.ticket) {
            let lastticketsettledupto: Date = new Date(data.data.lastticketsettledupto);
            let fromModel2: IMyDateModel = { isRange: false, singleDate: { jsDate: lastticketsettledupto }, dateRange: null };
            this.empleaveForm.controls['lastticketsettledupto1'].setValue(fromModel2);
          } else {
            this.lastticketsettledupto = data.data.lastticketsettledupto;
          }
          if (data.data.curticketsettledupto && this.empleaveForm.value.ticket) {
            let curticketsettledupto: Date = new Date(data.data.curticketsettledupto);
            let fromModel3: IMyDateModel = { isRange: false, singleDate: { jsDate: curticketsettledupto }, dateRange: null };
            this.empleaveForm.controls['curticketsettledupto1'].setValue(fromModel3);
          } else {
            this.curticketsettledupto = data.data.curticketsettledupto;
          }
          if (data.data.toResumedt) {
            let toResumedt: Date = new Date(data.data.toResumedt);
            let fromModel4: IMyDateModel = { isRange: false, singleDate: { jsDate: toResumedt }, dateRange: null };
            this.empleaveForm.controls['toresumedutyon1'].setValue(fromModel4);
          }
  
        } else{
         this.empleaveForm.controls['baldays'].setValue(null);
        }
      });
  }



  @Output() leaveRequest = new EventEmitter;

  leaveRequestEvent() {
    
    if(this.requestId){ 
      
      if (this.empleaveForm.value.toresumedutyon1 && this.empleaveForm.value.toresumedutyon == undefined) {
        this.empleaveForm.get('toresumedutyon').setValue(this.empleaveForm.value.toresumedutyon1.singleDate.jsDate);
      }
       if (this.empleaveForm.value.startdate == undefined) {
        this.empleaveForm.get('startdate').setValue(this.empleaveForm.value.startdate1.singleDate.jsDate);
      }
      if (this.empleaveForm.value.enddate == undefined) {
        this.empleaveForm.get('enddate').setValue(this.empleaveForm.value.enddate1.singleDate.jsDate);
      }
    } else{
       this.isTicketFlag = this.empleaveForm.value.ticket ? true : false;
        if(this.empleaveForm.value.ticket == "With Ticket Encashment Claim - Both Side" || this.empleaveForm.value.ticket == "With Ticket Encashment Claim - One Side"){
            this.isTicketAmt = true;
        } else{
          this.isTicketAmt = false;
        }
      }

      
      if (this.empleaveForm.value.paidLeaveDays && this.empleaveForm.value.unpaidLeaveDays) {
        this.empleaveForm.get('leavedays').setValue(this.empleaveForm.value.paidLeaveDays + this.empleaveForm.value.unpaidLeaveDays);
      } else {
          this.empleaveForm.get('paidLeaveDays').setValue(this.empleaveForm.value.paidLeaveDays ? this.empleaveForm.value.paidLeaveDays : 0);
          this.empleaveForm.get('unpaidLeaveDays').setValue(this.empleaveForm.value.unpaidLeaveDays ? this.empleaveForm.value.unpaidLeaveDays : 0);
          this.empleaveForm.get('leavedays').setValue(this.empleaveForm.value.paidLeaveDays + this.empleaveForm.value.unpaidLeaveDays);
        }

    if (this.leaveList) {
    
      this.xLeaveitemId = this.empleaveForm.value.xLeaveitemId ? this.empleaveForm.value.xLeaveitemId : this.xLeaveitemId;
      this.leavedays = this.empleaveForm.value.leavedays ? this.empleaveForm.value.leavedays : this.leavedays;
     
      this.leaveList.filter(item => {
        if (item.xLeaveitemId == Number(this.xLeaveitemId)) {
          this.empleaveForm.get('leaveitemcode').setValue(item.code);
         // alert(this.empleaveForm.value.leaveitemcode);
          if((item.code=='AL' ||item.code=='ALWD' || item.code=='SL' || item.code=='ACCL' || item.code=='MRL' || item.code=='COMPL') && this.isShowPopup){
            this.isShowPopup=false;
               this.setDates();
          }
        }
      })
    }


        if(this.isTicketFlag && this.lastticketsettledupto){
          let lastticketsettledupto: Date = new Date(this.lastticketsettledupto);
          let fromModel2: IMyDateModel = { isRange: false, singleDate: { jsDate: lastticketsettledupto }, dateRange: null };
          this.empleaveForm.controls['lastticketsettledupto1'].setValue(fromModel2);
        }

        if(this.curticketsettledupto && this.isTicketFlag){
          let curticketsettledupto: Date = new Date(this.curticketsettledupto);
          let fromModel3: IMyDateModel = { isRange: false, singleDate: { jsDate: curticketsettledupto }, dateRange: null };
          this.empleaveForm.controls['curticketsettledupto1'].setValue(fromModel3);
        }

    if(this.empleaveForm.value.isHalfday1  && this.isHalfdayAllowed){  
      this.empleaveForm.get('isHalfday').setValue("Y");
      } else{
        this.empleaveForm.get('isHalfday').setValue("N");
      }

    this.empleaveForm.get('createdBy').setValue(sessionStorage.getItem('userId'));
    this.empleaveForm.get('created').setValue(new Date());
    this.empleaveForm.get('updatedBy').setValue(sessionStorage.getItem('userId'));
    this.empleaveForm.get('updated').setValue(new Date());
    this.empleaveForm.get('processed').setValue('Y');
    this.empleaveForm.get('xEmployeeId').setValue(Number(this.empleaveForm.value.xEmployeeId));
    this.empleaveForm.get('ticketAmount').setValue(Number(this.empleaveForm.value.ticketAmount));
    this.empleaveForm.get('fromAirsectorId').setValue(this.empleaveForm.value.fromAirsectorId);
    this.empleaveForm.get('toAirsectorId').setValue(this.empleaveForm.value.toAirsectorId);
    this.empleaveForm.get('airtktEntitled').setValue(this.empleaveForm.value.airtktEntitled);
    this.empleaveForm.get('airtktClass').setValue(this.empleaveForm.value.airtktClass);

    if (this.requestId) {
      this.empleaveForm.get('fromAirsectorId').setValue(this.fromAirsectorId);
      this.empleaveForm.get('toAirsectorId').setValue(this.toAirsectorId);
      this.empleaveForm.get('airtktEntitled').setValue(this.airtktEntitled);
      this.empleaveForm.get('airtktClass').setValue(this.airtktClass);
    }

    this.empleaveForm.value.status == "ACTIVE" ? this.empleaveForm.get('isActive').setValue('Y') : this.empleaveForm.get('isActive').setValue('N');

    this.submitted = true;
    if (this.empleaveForm.invalid) {
      return;
    } else {
     
      this.leaveRequest.emit(this.empleaveForm.value);
    }
  }

  openAttachment() {
    if (this.filePath) {
      window.open(environment.IMG_URL + this.filePath);
    }
  }

  
  availableLeaveBal:any;
  appliedLeaves:any;
  lastticketsettledupto:any;
  curticketsettledupto:any;
  ldays:any;
  balAfter:any;
  setDates(){
    
    if(this.empleaveForm.value.startdate && this.empleaveForm.value.enddate && this.employeeId && this.xLeaveitemId){
      this.ldays=this.empleaveForm.value.leavedays;
      this.requestService.getLeaveBal({ 
        "strdate": this.commonService.dateFormat(this.empleaveForm.value.startdate), 
        "enddate": this.commonService.dateFormat(this.empleaveForm.value.enddate), 
        "xEmployeeId": this.employeeId, 
        "leavedays": this.leavedays, 
        "xLeaveitemId": Number(this.xLeaveitemId) }).subscribe(success => {
        var data:any = success;
        
        if(data){
        
        this.availableLeaveBal = data.data.baldays;
          this.appliedLeaves = data.data.appliedLeaves;
          var aLleaveDays = data.data.aLleaveDays;
          this.balAfter  = data.data.balAfter;
          if(data.data.lastleavesettledupto){
        let lastleavesettledupto: Date = new Date(data.data.lastleavesettledupto);
        let fromModel: IMyDateModel = { isRange: false, singleDate: { jsDate: lastleavesettledupto }, dateRange: null };
        this.empleaveForm.controls['lastleavesettledupto1'].setValue(fromModel);
       }
        if(data.data.curleavesettledupto){
        let curleavesettledupto: Date = new Date(data.data.curleavesettledupto);
        let fromModel1: IMyDateModel = { isRange: false, singleDate: { jsDate: curleavesettledupto }, dateRange: null };
        this.empleaveForm.controls['curleavesettledupto1'].setValue(fromModel1);
        }
        if(data.data.lastticketsettledupto && this.isTicketFlag){
        let lastticketsettledupto: Date = new Date(data.data.lastticketsettledupto);
        let fromModel2: IMyDateModel = { isRange: false, singleDate: { jsDate: lastticketsettledupto }, dateRange: null };
        this.empleaveForm.controls['lastticketsettledupto1'].setValue(fromModel2);
        } else{
          this.lastticketsettledupto = data.data.lastticketsettledupto;
        }

        if(data.data.curticketsettledupto && this.isTicketFlag){
        let curticketsettledupto: Date = new Date(data.data.curticketsettledupto);
        let fromModel3: IMyDateModel = { isRange: false, singleDate: { jsDate: curticketsettledupto }, dateRange: null };
        this.empleaveForm.controls['curticketsettledupto1'].setValue(fromModel3);
        } else {
          this.curticketsettledupto = data.data.curticketsettledupto;
        }

        if(data.data.toResumedt){
        let toResumedt: Date = new Date(data.data.toResumedt);
        let fromModel4: IMyDateModel = { isRange: false, singleDate: { jsDate: toResumedt }, dateRange: null };
        this.empleaveForm.controls['toresumedutyon1'].setValue(fromModel4);
        }
     
          // this.empleaveForm.get('leaveitemcode').setValue(item.code);
          
      if(this.empleaveForm.value.leaveitemcode=='ALWD' && this.appliedLeaves){    
          Swal.fire({
            title: 'Current Leave Balance: ' +this.availableLeaveBal+' Working Days'+ '\n ' + 'Leave applied: ' +this.appliedLeaves+' Working Days' + '\n ' + 'Leave Balance  after Adjustment:' + this.balAfter  +'  Working Days'+'\n',//'Leave Applied : ' + this.appliedLeaves + '\n ' + 'Leave Balance    : ' + this.availableLeaveBal+ '\n ' + 'Annual Leave Days    : ' + aLleaveDays,
            text: 'By submitting this request,  you confirm to abide by the Company leave Policy and agree to resume duty as per approved leave.\
            Note:'+'\n'+' This leave application will be considered as "approved" upon completion of approval cycle',
            icon: 'warning',
            showCancelButton: false,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Ok'
          }).then((result) => {
            if (result.isConfirmed) {
              this.empleaveForm.controls['paidLeaveDays'].setValue(aLleaveDays);
              this.empleaveForm.controls['leavedays'].setValue(aLleaveDays);
              this.leaveRequest.emit(this.empleaveForm.value);
            }
          })
        }

        if(this.empleaveForm.value.leaveitemcode=='AL' && this.appliedLeaves){    
          Swal.fire({
            title: 'Last Leave Settlement Date: ' +this.empleaveForm.value.lastticketsettledupto1+ '\n ' + 'Current Accrued Leave Balance : ' +this.availableLeaveBal+' Calendar Days ' + '\n ' + 'Leave applied:    : ' + this.appliedLeaves+' Cal. Days'+'\n'+'Leave Balance  after Adjustment: '+this.balAfter+' Cal . Days'+'\n'+'Current Leave Settlement Date: '+this.empleaveForm.value.curleavesettledupto1+'\n',//'Leave Applied : ' + this.appliedLeaves + '\n ' + 'Leave Balance    : ' + this.availableLeaveBal+ '\n ' + 'Annual Leave Days    : ' + aLleaveDays,
            text: 'By submitting this request,  you confirm to abide by the Company leave Policy and agree to resume duty as per approved leave.\
            Note:'+'\n'+' This leave application will be considered as "approved" upon completion of approval cycle',
            icon: 'warning',
            showCancelButton: false,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Ok'
          }).then((result) => {
            if (result.isConfirmed) {
              this.empleaveForm.controls['paidLeaveDays'].setValue(aLleaveDays);
              this.empleaveForm.controls['leavedays'].setValue(aLleaveDays);
              this.leaveRequest.emit(this.empleaveForm.value);
            }
          })
        }

        if(this.empleaveForm.value.leaveitemcode=='SL' && this.appliedLeaves && this.availableLeaveBal){    
          Swal.fire({
            title: "Total Sick Leave Applied: "+this.appliedLeaves+" Cal. Day (s)",//'Total Sick Leave Applied : '+this.appliedLeaves + ' Cal. Day (s)',
            text: "By submitting this request,  you confirm to abide by the Company leave Policy and agree to resume duty as per approved leave.\
            Note: "+"\n"+"\
            1. This leave application will be considered as 'approved' upon completion of approval cycle. \
            \n2. Sick Leave Rules During a Calendar Year\
              \nFirst 15 days -     Fully paid\
              \nNext 30 days -   Half paid \
              \nNext 45 days -   Unpaid leave",
            icon: 'warning',
            showCancelButton: false,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Ok'
          }).then((result) => {
            if (result.isConfirmed) {
              // this.empleaveForm.controls['paidLeaveDays'].setValue(aLleaveDays);
              // this.empleaveForm.controls['leavedays'].setValue(aLleaveDays);
              // this.leaveRequest.emit(this.empleaveForm.value);
            }
          })
        } else{
if(this.empleaveForm.value.leaveitemcode=='SL' && this.appliedLeaves){
          Swal.fire({
            title: "Total Sick Leave Applied: "+this.appliedLeaves+" Cal. Day (s)",//'Total Sick Leave Applied : '+this.appliedLeaves + ' Cal. Day (s)',
            text: "You have exceeded your annual sick leave limits. HR Team will contact you for further process / clarification\
            It is mandatory to submit sick leave certificate  before proceeding with this leave application submission.\
            Kindly attach Sick Leave Certificate to avoid rejection\
            By submitting this request,  you confirm to abide by the Company leave Policy and agree to resume duty as per approved leave.\
            Note: 1. This leave application will be considered as 'approved' upon completion of approval cycle.\ 2. Sick Leave Rules During a Calendar Year\
            First 15 days -     Fully paid\
            Next 30 days -   Half paid \
            Next 45 days -   Unpaid leave ",
            icon: 'warning',
            showCancelButton: false,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Ok'
          }).then((result) => {
            if (result.isConfirmed) {
              // this.empleaveForm.controls['paidLeaveDays'].setValue(aLleaveDays);
              // this.empleaveForm.controls['leavedays'].setValue(aLleaveDays);
              // this.leaveRequest.emit(this.empleaveForm.value);
            }
          })
        }
        }


        if(this.empleaveForm.value.leaveitemcode=='ACCL'  && this.appliedLeaves){    
          Swal.fire({
            title: "Total Employment Accident Leave Applied: "+this.appliedLeaves+" Cal. Day (s)",//'Total Sick Leave Applied : '+this.appliedLeaves + ' Cal. Day (s)',
            text: "It is mandatory to submit 'Sick Leave Certificate' & 'Incident report' issued by HSE Officer \
             before proceeding with this leave application submission. \
             Please note that as per labour laws additional leaves after availing 6 months fully paid employment accident leave will be half paid\
             \n By submitting this request, you confirm to abide by the Company leave Policy and agree to resume duty as per approved leave.\
             Note: \
            1. This leave application will be considered as 'approved' upon completion of approval cycle.\
            2.Employment Accident Leave Rules:\
                First 6 months -    Fully paid  \
                Next 6 months -  Half pay leave ",
            icon: 'warning',
            showCancelButton: false,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Ok'
          }).then((result) => {
            if (result.isConfirmed) {
              // this.empleaveForm.controls['paidLeaveDays'].setValue(aLleaveDays);
              // this.empleaveForm.controls['leavedays'].setValue(aLleaveDays);
              // this.leaveRequest.emit(this.empleaveForm.value);
            }
          })
        }


        
        if(this.empleaveForm.value.leaveitemcode=='MRL' && this.appliedLeaves){    
          Swal.fire({
            title: "Total Marriage Leave Applied: "+this.appliedLeaves+" Calendar Day (s)",//'Total Sick Leave Applied : '+this.appliedLeaves + ' Cal. Day (s)',
            text: "It is mandatory to submit 'Marriage Certificate' or authenticated document supporting the same before\
             proceeding with this leave application submission. By submitting this request,  \
            you confirm to abide by the Company leave Policy and agree to resume duty as per approved leave.\
            Note: \
            1. This leave application will be considered as 'approved' upon completion of approval cycle.\
            2.Marriage  Leave Rules:\
                 a) 3  Calendar days -fully paid \n b)  eligibility upon completion of probation period",
            icon: 'warning',
            showCancelButton: false,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Ok'
          }).then((result) => {
            if (result.isConfirmed) {
              // this.empleaveForm.controls['paidLeaveDays'].setValue(aLleaveDays);
              // this.empleaveForm.controls['leavedays'].setValue(aLleaveDays);
              // this.leaveRequest.emit(this.empleaveForm.value);
            }
          })
        }

        

        if(this.empleaveForm.value.leaveitemcode=='COMPL' && this.appliedLeaves){    
          Swal.fire({
            title: "Total Compassionate Leave Applied: "+this.appliedLeaves+" Calendar Day (s)",//'Total Sick Leave Applied : '+this.appliedLeaves + ' Cal. Day (s)',
            text: "It is mandatory to submit ' Death Certificate'  to complete this leave application process.\
            By submitting this request,  you confirm to abide by the Company leave Policy and agree to resume duty as per approved leave.\
            Note: \
            1. This leave application will be considered as 'approved' upon completion of approval cycle. \
            2.Compassionate  Leave Rules:\
                a) 5  Calendar days -fully paid - in case of spouse \n b)  3 Calendar days - fully paid - in case of mother, father, son, daughter, brother, sister, grandfather, grandmother",
            icon: 'warning',
            showCancelButton: false,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Ok'
          }).then((result) => {
            if (result.isConfirmed) {
              // this.empleaveForm.controls['paidLeaveDays'].setValue(aLleaveDays);
              // this.empleaveForm.controls['leavedays'].setValue(aLleaveDays);
              // this.leaveRequest.emit(this.empleaveForm.value);
            }
          })
        }

        // ==========
      }
      })
  }
  }

  changeStatusFun(data){
      let status = data=='VOID' ? 'V' : 'I';
      if(this.lEmpleaveId){


        
        Swal.fire({
         // title: 'Leave Applied : ' + this.appliedLeaves + '\n ' + 'Leave Balance    : ' + this.availableLeaveBal+ '\n ' + 'Annual Leave Days    : ' + aLleaveDays,
          text: data=='VOID' ? "Void this request ?" : "Inactive this request ?",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Ok'
        }).then((result) => {
          if (result.isConfirmed) {
            this.requestService.updataeEmpLeaveStatus(this.lEmpleaveId,status).subscribe(data=>{
              var success:any = data;
              this.toastService.showToast('success', success.message);
              this.router.navigate(['/views/approval-flow/approvalrequest/request-summary']);
            });
          }

        })


    }
  }

  subscription: Subscription;
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
