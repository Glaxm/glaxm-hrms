import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularMyDatePickerDirective, IMyDateModel } from 'angular-mydatepicker';
import Swal from 'sweetalert2';
import { CommonService, GeneralListCode } from 'src/app/views/services/common.service';
import { ToastrService } from 'src/app/views/services/toastr.service';
import { environment } from 'src/environments/environment';
import { EmpLeaveService } from '../emp-leave.service';

@Component({
  selector: 'app-add-empleave',
  templateUrl: './add-empleave.component.html',
  styleUrls: ['./add-empleave.component.scss']
})
export class AddEmpleaveComponent implements OnInit {

  empleaveForm: FormGroup;
  isView: boolean = false;
  isEncash:boolean=false;
  holdingList: any = [];
  companyList: any = [];
  parentUrl: any;
  employeeList: any;
  leaveList: any = [];
  submitted: boolean = false;
  airTktEntitlementList: any = [];
  airTktClassList: any = [];
  fromAirportList: any = [];
  toList: any = [];


  lastticketsettledupto: any;
  curticketsettledupto: any;

  public myDatePickerOptions = this.commonService.datepickerFormat;
  @ViewChild('dp1', { static: false }) myDp1: AngularMyDatePickerDirective;
  @ViewChild('dp2', { static: false }) myDp2: AngularMyDatePickerDirective;
  @ViewChild('dp3', { static: false }) myDp3: AngularMyDatePickerDirective;
  @ViewChild('dp4', { static: false }) myDp4: AngularMyDatePickerDirective;
  @ViewChild('dp5', { static: false }) myDp5: AngularMyDatePickerDirective;
  @ViewChild('dp6', { static: false }) myDp6: AngularMyDatePickerDirective;
  @ViewChild('dp7', { static: false }) myDp7: AngularMyDatePickerDirective;
  @ViewChild('dp8', { static: false }) myDp8: AngularMyDatePickerDirective;


  statusList: any = [{ valueCode: 'ACTIVE', valueName: 'Active' }, { valueCode: 'VOID', valueName: 'Void' }]

  edit:any;

  @ViewChild('labelImport', { static: false })
  labelImport: ElementRef;
  fileToUpload: File = null;


  //  ------------------------\\

  selectedItems: Array<any> = [];
  dropdownSettings: any = {};
  moduleid: any;

  tepMethod() {
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
   
    this.empleaveForm.controls['xEmployeeId'].setValue(item.employeeId);
    this.getLeaveItemList(item.employeeId);
  }
  onSelectAll(items: any) {
    console.log('onSelectAll', items);
  }

  //---------------------------


  constructor(private toastService: ToastrService, private commonService: CommonService, private cdr: ChangeDetectorRef, private empLeaveService: EmpLeaveService, private router: Router, private activatedRoute: ActivatedRoute) {
    this.empleaveForm = new FormGroup({
      lEmpleaveId: new FormControl(null),
      gCompanyId: new FormControl(null),
      gHoldingId: new FormControl(null),
      isActive: new FormControl(null),
      status: new FormControl(null),
      created: new FormControl(null),
      createdBy: new FormControl(null),
      updated: new FormControl(null),
      employee: new FormControl(null),
      updatedBy: new FormControl(null),
      islwp: new FormControl(null),
      documentno: new FormControl(null),
      datetrx: new FormControl(null),
      datetrx1: new FormControl(null),
      g_APPROVALREQ_ID: new FormControl(null),
      approvalstatus: new FormControl(null),
      xEmployeeId: new FormControl(null),
      description: new FormControl(null),
      xLeaveitemId: new FormControl(null),
      startdate: new FormControl(null),
      enddate: new FormControl(null),
      stdate: new FormControl(null),
      trxdate: new FormControl(null),
      endate: new FormControl(null),
      startdate1: new FormControl(null),
      enddate1: new FormControl(null),
      leavedays: new FormControl(null),
      processed: new FormControl(null),
      remarks: new FormControl(null),
      fileName: new FormControl(null),
      airtktCb: new FormControl(null),
      leavePurpose: new FormControl(null),
      contactDetails: new FormControl(null),
      fromAirsectorId: new FormControl(null),
      toAirsectorId: new FormControl(null),
      airtktEntitled: new FormControl(null),
      airtktClass: new FormControl(null),
      ticket: new FormControl(null),
      file: new FormControl(null),
      paidLeaveDays: new FormControl(null),
      unpaidLeaveDays: new FormControl(null),
      ticketAmount: new FormControl(null),
      lastleavesettledupto: new FormControl(null),
      lastleavesettledupto1: new FormControl(null),
      curleavesettledupto: new FormControl(null),
      curleavesettledupto1: new FormControl(null),
      lastticketsettledupto: new FormControl(null),
      lastticketsettledupto1: new FormControl(null),
      curticketsettledupto: new FormControl(null),
      curticketsettledupto1: new FormControl(null),
      resumedt: new FormControl(null),
      toresumedutyon1: new FormControl(null),
      lastlvstdt: new FormControl(null),
      curlvstdt: new FormControl(null),
      lastticketstdt: new FormControl(null),
      curticketstdt: new FormControl(null),
      toResumedt: new FormControl(null),
      encashment: new FormControl(null),
      isHalfday: new FormControl(null),
      isHalfday1: new FormControl(null),
      deselectbtn1: new FormControl(null),
      deselectbtn2: new FormControl(null), 
      baldays: new FormControl(null),
      encashDays: new FormControl(null),
      xMonthId: new FormControl(null),
      calendarDays:new FormControl(null)
    });

    this.activatedRoute.queryParams.subscribe(params => {
      this.empleaveForm.controls['lEmpleaveId'].setValue(params.id);
      this.isView = params.view;
      this.moduleid = params.moduleid;
      this.edit = params.edit;
    });
  }

  toggleCalendar(): void {
    this.cdr.detectChanges();
    this.myDp1.toggleCalendar();
  }


  changeStartDate(event) {
    this.empleaveForm.get('stdate').setValue(this.commonService.dateFormat(event.singleDate.jsDate));
    this.empleaveForm.get('startdate').setValue(event.singleDate.jsDate);
    // this.empleaveForm.controls['paidLeaveDays'].setValue(this.calDays());

    // if(this.requestId){ 
    //   this.empleaveForm.controls['leavedays'].setValue(this.calDays());
    // } else{
    
      // if(this.empleaveForm.value.isHalfday1){
          
      //   let fromModel: IMyDateModel = event;//{ isRange: false, singleDate: { jsDate: startDate }, dateRange: null };
      //   this.empleaveForm.controls['enddate1'].setValue(fromModel);

      //   this.empleaveForm.get('endate').setValue(this.commonService.dateFormat(event.singleDate.jsDate));
      //   this.empleaveForm.get('enddate').setValue(event.singleDate.jsDate);

      // } else{
    
    this.empleaveForm.controls['paidLeaveDays'].setValue(this.calDays());

    if (this.empleaveForm.value.paidLeaveDays && this.empleaveForm.value.unpaidLeaveDays) {
      this.empleaveForm.controls['paidLeaveDays'].setValue(this.calDays());
      this.empleaveForm.get('leavedays').setValue(this.empleaveForm.value.paidLeaveDays + this.empleaveForm.value.unpaidLeaveDays);
    } else {
      this.empleaveForm.get('paidLeaveDays').setValue(this.empleaveForm.value.paidLeaveDays ? this.empleaveForm.value.paidLeaveDays : 0);
      this.empleaveForm.get('unpaidLeaveDays').setValue(this.empleaveForm.value.unpaidLeaveDays ? this.empleaveForm.value.unpaidLeaveDays : 0);
      this.empleaveForm.get('leavedays').setValue(this.empleaveForm.value.paidLeaveDays + this.empleaveForm.value.unpaidLeaveDays);
    }


    // }
    this.setDates();
  // }

  
  if(this.leaveCode=='WFH' && this.calDays() >= "4"){
    this.WFHFlag=true;
    this.toastService.showToast('danger', "Only 3 days leave allowed for Work From Home.");
  } else{
    this.WFHFlag=false;
  }

  }
  changeEndDate(event) {
    if (event) {
      this.empleaveForm.get('endate').setValue(this.commonService.dateFormat(event.singleDate.jsDate));
      this.empleaveForm.get('enddate').setValue(event.singleDate.jsDate);
      // this.empleaveForm.controls['paidLeaveDays'].setValue(this.calDays());
      // this.setDates();
      // if(this.requestId){ 
      //   this.empleaveForm.controls['leavedays'].setValue(this.calDays());
      // } else{
        // if(this.empleaveForm.value.isHalfday1){
          
        //   // let startDate: Date = new Date(this.empleaveForm.value.enddate);
        //   let fromModel: IMyDateModel =event;// { isRange: false, singleDate: { jsDate: startDate }, dateRange: null };
        //   this.empleaveForm.controls['startdate1'].setValue(fromModel);

        //   this.empleaveForm.get('stdate').setValue(this.commonService.dateFormat(event.singleDate.jsDate));
        //   this.empleaveForm.get('startdate').setValue(event.singleDate.jsDate);

        //  } else{
        this.empleaveForm.controls['paidLeaveDays'].setValue(this.calDays());
        if (this.empleaveForm.value.paidLeaveDays && this.empleaveForm.value.unpaidLeaveDays) {
          this.empleaveForm.get('leavedays').setValue(this.empleaveForm.value.paidLeaveDays + this.empleaveForm.value.unpaidLeaveDays);
        } else {
          this.empleaveForm.get('paidLeaveDays').setValue(this.empleaveForm.value.paidLeaveDays ? this.empleaveForm.value.paidLeaveDays : 0);
          this.empleaveForm.get('unpaidLeaveDays').setValue(this.empleaveForm.value.unpaidLeaveDays ? this.empleaveForm.value.unpaidLeaveDays : 0);
          this.empleaveForm.get('leavedays').setValue(this.empleaveForm.value.paidLeaveDays + this.empleaveForm.value.unpaidLeaveDays);
        }
        this.setDates();
      //  }
    }

    if(this.leaveCode=='WFH' && this.calDays() >= "4"){
      this.WFHFlag=true;
      this.toastService.showToast('danger', "Only 3 days leave allowed for Work From Home.");
    } else{
      this.WFHFlag=false;
    }
  }

  calPaidDays() {
    if (this.empleaveForm.value.paidLeaveDays && this.empleaveForm.value.unpaidLeaveDays) {
      this.empleaveForm.get('leavedays').setValue(this.empleaveForm.value.paidLeaveDays + this.empleaveForm.value.unpaidLeaveDays);
    } else {
      this.empleaveForm.get('paidLeaveDays').setValue(this.empleaveForm.value.paidLeaveDays ? this.empleaveForm.value.paidLeaveDays : 0);
      this.empleaveForm.get('unpaidLeaveDays').setValue(this.empleaveForm.value.unpaidLeaveDays ? this.empleaveForm.value.unpaidLeaveDays : 0);
      this.empleaveForm.get('leavedays').setValue(this.empleaveForm.value.paidLeaveDays + this.empleaveForm.value.unpaidLeaveDays);
    }
  }

  changeTransDate(event) {
    this.empleaveForm.get('trxdate').setValue(this.commonService.dateFormat(event.singleDate.jsDate));
  }

  changeLastLeaveSettledUpTo(event) {
    this.empleaveForm.get('lastleavesettledupto').setValue(event.singleDate.jsDate);
    this.calSettlementDt( {
      "lastsettledLeave":this.commonService.dateFormat(event.singleDate.jsDate),
      "xEmployeeId":this.empleaveForm.value.xEmployeeId,
      "leavedays":this.empleaveForm.value.leavedays,
      "encashDays" :this.empleaveForm.value.encashDays ? this.empleaveForm.value.encashDays : 0,
      "xLeaveitemId":this.empleaveForm.value.xLeaveitemId ? Number(this.empleaveForm.value.xLeaveitemId) : 0
    });
  }

  changeCurrentLeaveSettledUpTo(event) {
    this.empleaveForm.get('curleavesettledupto').setValue(event.singleDate.jsDate);

  }

  changeLastAirTicketUpTo(event) {
    this.empleaveForm.get('lastticketsettledupto').setValue(event.singleDate.jsDate);

  }

  changeCurrentAirTicketSettledUpTo(event) {
    this.empleaveForm.get('curticketsettledupto').setValue(event.singleDate.jsDate);

  }


  changeToResumeDutyOn(event) {
    this.empleaveForm.get('toResumedt').setValue(event.singleDate.jsDate);
  }

  availableLeaveBal: any;
  aLleaveDays:any;
  ldays:any;
  setDates() {

    if ((this.leaveCode == "AL" || this.leaveCode == "ALWD") && this.empleaveForm.value.stdate && this.empleaveForm.value.endate && this.empleaveForm.value.xEmployeeId && this.empleaveForm.value.leavedays) {
      this.ldays=this.empleaveForm.value.leavedays;
     if(this.edit==0){
      this.empLeaveService.getLeaveBal({
        "strdate": this.empleaveForm.value.stdate,
        "enddate": this.empleaveForm.value.endate,
        "xEmployeeId": this.empleaveForm.value.xEmployeeId,
        "leavedays": this.empleaveForm.value.leavedays,
        "xLeaveitemId": Number(this.empleaveForm.value.xLeaveitemId)
      }).subscribe(success => {
        var data: any = success;
        this.availableLeaveBal = data.data.baldays;
        this.aLleaveDays = data.data.aLleaveDays;

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


        Swal.fire({
          title: 'Leave Applied : ' + this.empleaveForm.value.leavedays + '\n ' + 'Leave Balance    : ' + this.availableLeaveBal + '\n ' + 'Annual Leave Days    : ' + this.aLleaveDays,
          text: "By submitting this request, you are abide by our company Leave policy, procedure and its regulations.\
             Note : A maximum 60 days leave application is considerable for those employees,\
             who have once in a two year Air ticket eligibility, for other employees maximum 30 days leave application is considerable, subject to management review and approval.",
          icon: 'warning',
          showCancelButton: false,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Ok'
        }).then((result) => {
          if (result.isConfirmed) {
            this.empleaveForm.controls['paidLeaveDays'].setValue(this.aLleaveDays);
            this.empleaveForm.controls['leavedays'].setValue(this.aLleaveDays);
          }

        })
       
      });
    } else{
      this.edit =0;
    }
    }
  }




  get f() { return this.empleaveForm.controls; }
  ngOnInit() {
    this.tepMethod();
    this.getFromAirportList();
    this.getAirTecketEntitlementList();
    this.getAirTicketClassList();
    this.getAirsector();
    this.getHoldingList();
    // this.getEmployeeList();
    // this.getLeaveItemList();
    if (this.empleaveForm.value.lEmpleaveId) {
      this.empLeaveService.getEmpleaveDetailsById(this.empleaveForm.value.lEmpleaveId).subscribe(success => {
        var s: any = success;
       
        this.empleaveForm.controls['xEmployeeId'].setValue(s.data.xEmployeeId);
        this.empleaveForm.controls['encashDays'].setValue(s.data.encashDays);
      
        this.filePath = s.data.path;

        if (s.data.path) {
          let fullPath = s.data.path;
          let filename: any = fullPath.replace(/^.*[\\\/]/, '');
          this.onFileChange1(filename);
        }

        this.empLeaveService.getLeaveItemList_V1(s.data.xEmployeeId).subscribe(success => {
          this.leaveList = success;
          this.isEncash=true;
          this.changeLeave(s.data.xLeaveitemId);
          this.empleaveForm.controls['encashment'].setValue(s.data.encashment);
        });

        
        this.empleaveForm.controls['fileName'].setValue({
          name: 'masters.PNG',
          lastModified: 1620877043852,
          lastModifiedDate: ' Thu May 13 2021 09: 07: 23 GMT + 0530(India Standard Time)',
          webkitRelativePath: '',
          size: 9146
        });
        let startDate: Date = new Date(s.data.startdate);
        let fromModel: IMyDateModel = { isRange: false, singleDate: { jsDate: startDate }, dateRange: null };
        this.empleaveForm.controls['startdate1'].setValue(fromModel);

        s.data.isHalfday == "Y" ? this.empleaveForm.get('isHalfday1').setValue(true) : this.empleaveForm.get('isHalfday1').setValue(false);


        let endDate: Date = new Date(s.data.enddate);
        let toModel: IMyDateModel = { isRange: false, singleDate: { jsDate: endDate }, dateRange: null };
        this.empleaveForm.controls['enddate1'].setValue(toModel);


        let trxDate: Date = new Date(s.data.datetrx);
        let trModel: IMyDateModel = { isRange: false, singleDate: { jsDate: trxDate }, dateRange: null };
        this.empleaveForm.controls['datetrx1'].setValue(trModel);

        // -------
       
        if (s.data.lastleavesettledupto) {
          let lastleavesettledupto: Date = new Date(s.data.lastleavesettledupto);
          let fromModel: IMyDateModel = { isRange: false, singleDate: { jsDate: lastleavesettledupto }, dateRange: null };
          this.empleaveForm.controls['lastleavesettledupto1'].setValue(fromModel);
        }
        if (s.data.curleavesettledupto) {
          let curleavesettledupto: Date = new Date(s.data.curleavesettledupto);
          let fromModel1: IMyDateModel = { isRange: false, singleDate: { jsDate: curleavesettledupto }, dateRange: null };
          this.empleaveForm.controls['curleavesettledupto1'].setValue(fromModel1);
        }
        if (s.data.lastticketsettledupto) {
          let lastticketsettledupto: Date = new Date(s.data.lastticketsettledupto);
          let fromModel2: IMyDateModel = { isRange: false, singleDate: { jsDate: lastticketsettledupto }, dateRange: null };
          this.empleaveForm.controls['lastticketsettledupto1'].setValue(fromModel2);
        }
        if (s.data.curticketsettledupto) {
          let curticketsettledupto: Date = new Date(s.data.curticketsettledupto);
          let fromModel3: IMyDateModel = { isRange: false, singleDate: { jsDate: curticketsettledupto }, dateRange: null };
          this.empleaveForm.controls['curticketsettledupto1'].setValue(fromModel3);
        }
        if (s.data.toResumedt) {
          let toResumedt: Date = new Date(s.data.toResumedt);
          let fromModel4: IMyDateModel = { isRange: false, singleDate: { jsDate: toResumedt }, dateRange: null };
          this.empleaveForm.controls['toresumedutyon1'].setValue(fromModel4);
        }

        if (s.data.islwp == "Y") {
          // this.empleaveForm.get('encashment').setValue("Y");
          //   this.setEncashValue();
        }

        this.getCOmpanyById(s.data.gHoldingId);
        this.empleaveForm.patchValue(s.data);
      
       
        // this.empleaveForm.controls['encashment'].setValue('H');
        this.empleaveForm.controls['baldays'].setValue(s.data.balanceleaves);
        this.empleaveForm.controls['ticket'].setValue(s.data.airtktCb);
        s.data.isActive == 'Y' ? this.empleaveForm.get('status').setValue("ACTIVE") : this.empleaveForm.get('status').setValue("VOID");
        this.getEmployeeList(s.data.gCompanyId);
        if (this.isView) { this.empleaveForm.disable(); }
      });
    } else {
        this.edit =0;
        let trxDate: Date = new Date();
        let trModel: IMyDateModel = { isRange: false, singleDate: { jsDate: trxDate }, dateRange: null };
        this.empleaveForm.controls['datetrx1'].setValue(trModel);
        this.changeTransDate(trModel);

      this.empleaveForm.controls['status'].setValue('ACTIVE');
      this.empleaveForm.get('documentno').setValue("ELT" + Math.floor(1000 + Math.random() * 9000));
    }
    
   

  }

  setEncashValue() {
   this.empleaveForm.controls['encashment'].setValue('Y');
  }

  getCOmpanyById(id) {
    this.empLeaveService.getCompanyById(id).subscribe(s => {
      this.companyList = s;
      if (this.companyList) {

        let list: any = JSON.parse(sessionStorage.getItem("company"));
        var l: any = [];
        for (var i = 0; i < list.length; i++) {
          // if(list[i]!=','){
          l.push(Number(list[i]));
          // }
        }

        this.companyList = this.companyList.filter(o1 => l.some(o2 => o1.gCompanyId === o2));
      }
    });
  }

  leaveCode: any;
  isHalfdayAllowed: boolean = false;
  WFHFlag:boolean=false;
  eligibleforTicket:any;
  lastticketsettledupto1:any;
  changeLeave(data) {
   
    let list = this.leaveList.filter(el => {
      if (el.xLeaveitemId == data) {
        this.leaveCode = el.code;
      
        (el.code == 'AL' || el.code=="ALWD") && this.empleaveForm.value.encashment != 'Y' ? this.isleavesttlmnt = false : this.isleavesttlmnt = true;
        el.halfdayAllowed == "Y" ? this.isHalfdayAllowed = true : this.isHalfdayAllowed = false;

        if(this.ldays && (el.code != 'AL' || el.code != 'ALWD')){
            this.empleaveForm.controls['paidLeaveDays'].setValue(this.ldays);
        }

        if(el.code == 'AL' || el.code=="ALWD"){
         this.empleaveForm.controls['encashment'].setValue("Y");
        }

        if(el.code =='ENCASH'){
          
          if(!this.isEncash){

            let startDate: Date = new Date();
            let fromModel: IMyDateModel = { isRange: false, singleDate: { jsDate: startDate }, dateRange: null };
            this.empleaveForm.controls['startdate1'].setValue(fromModel);
    
            let endDate: Date = new Date();
            let toModel: IMyDateModel = { isRange: false, singleDate: { jsDate: endDate }, dateRange: null };
            this.empleaveForm.controls['enddate1'].setValue(toModel);
          }
          this.isEncash=false;
          
          this.empleaveForm.controls['paidLeaveDays'].setValue(0);
          this.empleaveForm.controls['unpaidLeaveDays'].setValue(0);
          this.empleaveForm.controls['leavedays'].setValue(0);
          
          this.empleaveForm.controls['startdate1'].disable();
          this.empleaveForm.controls['enddate1'].disable();
          this.empleaveForm.controls['paidLeaveDays'].disable();
          this.empleaveForm.controls['unpaidLeaveDays'].disable();

          this.empleaveForm.controls['encashment'].setValue("Y");
          this.empleaveForm.get('deselectbtn1').setValue(true);
          var obj = {
              empid:this.empleaveForm.value.xEmployeeId,
              encashDays:this.empleaveForm.value.encashDays,
              stdate:this.commonService.dateFormat(this.empleaveForm.value.startdate1),
              endate:this.commonService.dateFormat(this.empleaveForm.value.enddate1)
          }
          this.empLeaveService.convertToCaldays(obj).subscribe(success=>{
             // alert(JSON.stringify(success));
              // calendarDays
          });

        } else{
          
          this.empleaveForm.controls['paidLeaveDays'].enable();
          this.empleaveForm.controls['unpaidLeaveDays'].enable();
          this.empleaveForm.controls['startdate1'].enable();
          this.empleaveForm.controls['enddate1'].enable();
        }

        if(this.edit!=1){
         
          this.getLeaveBal(data);
        }

       
      }
    });
  }
  

  
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
          this.empleaveForm.controls['baldays'].setValue(data.data.baldays);

          this.eligibleforTicket = data.data.eligibleforTicket;
          this.lastticketsettledupto1=data.data.lastticketsettledupto;
          

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

  calDays() {

    if (this.empleaveForm.value.startdate1 && this.empleaveForm.value.enddate1) {
      // if(this.empleaveForm.value.startdate && this.empleaveForm.value.enddate){
      //var date1:any = this.empleaveForm.value.startdate;//new Date(sentDate);
      //var date2:any = this.empleaveForm.value.enddate;//new Date();
      if (this.empleaveForm.value.lEmpleaveId) {
        if (!this.empleaveForm.value.stdate) { this.changeStartDate(this.empleaveForm.value.startdate1) }
        if (!this.empleaveForm.value.endate) { this.changeEndDate(this.empleaveForm.value.enddate1) }
      }
      var date1: any = new Date(this.empleaveForm.value.stdate);
      var date2: any = new Date(this.empleaveForm.value.endate);

      var diffDays: any = Math.floor((date2 - date1) / (1000 * 60 * 60 * 24)) + 1;
      return diffDays;
    } else {
      return 0;
    }
  }

  calTotalDays() {
    if (this.empleaveForm.value.paidLeaveDays && this.empleaveForm.value.unpaidLeaveDays) {
      this.empleaveForm.get('leavedays').setValue(this.empleaveForm.value.paidLeaveDays + this.empleaveForm.value.unpaidLeaveDays);
    } else {
      this.empleaveForm.get('paidLeaveDays').setValue(this.empleaveForm.value.paidLeaveDays ? this.empleaveForm.value.paidLeaveDays : 0);
      this.empleaveForm.get('unpaidLeaveDays').setValue(this.empleaveForm.value.unpaidLeaveDays ? this.empleaveForm.value.unpaidLeaveDays : 0);
      this.empleaveForm.get('leavedays').setValue(this.empleaveForm.value.paidLeaveDays + this.empleaveForm.value.unpaidLeaveDays);
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

  getLeaveItemList(empid) {
    this.empLeaveService.getLeaveItemList_V1(empid).subscribe(s => {
      this.leaveList = s;
    });
  }

  getEmployeeList(id) {
    this.getMonthsByCompanyId(id);
    this.empLeaveService.getEmployeeList(this.moduleid, [Number(id)]).subscribe(s => {
      this.employeeList = s;
      if (this.empleaveForm.value.lEmpleaveId && this.empleaveForm.value.xEmployeeId) {
        let list = this.employeeList.filter(item => item.employeeId == this.empleaveForm.value.xEmployeeId);
        if (list.length > 0) {
          this.selectedItems = [{ 'employeeId': list[0].employeeId, 'displayName': list[0].displayName }];
        }
      }
    });

  }

  monthList:any=[];
  getMonthsByCompanyId(companyId){
    this.empLeaveService.getMonthsByCompanyId(companyId).subscribe(data=>{
        this.monthList =data; 
    });
  }

  addUpdateEmpleave(flag) {

    if (this.empleaveForm.value.startdate1 && this.empleaveForm.value.stdate == null) {
      this.empleaveForm.get('stdate').setValue(this.commonService.dateFormat(this.empleaveForm.value.startdate1.singleDate.jsDate));
    }

    if (this.empleaveForm.value.enddate1 && this.empleaveForm.value.endate == null) {
      this.empleaveForm.get('endate').setValue(this.commonService.dateFormat(this.empleaveForm.value.enddate1.singleDate.jsDate));
    }

    if (this.empleaveForm.value.datetrx1 && this.empleaveForm.value.trxdate == null) {
      this.empleaveForm.get('trxdate').setValue(this.commonService.dateFormat(this.empleaveForm.value.datetrx1.singleDate.jsDate))
    }

    if (this.empleaveForm.value.toresumedutyon1 && this.empleaveForm.value.resumedt == null) {
      this.empleaveForm.get('resumedt').setValue(this.commonService.dateFormat(this.empleaveForm.value.toresumedutyon1.singleDate.jsDate));
    }
    if (this.empleaveForm.value.curticketsettledupto1 && this.empleaveForm.value.curticketstdt == null) {
      this.empleaveForm.get('curticketstdt').setValue(this.commonService.dateFormat(this.empleaveForm.value.curticketsettledupto1.singleDate.jsDate));
    }
    if (this.empleaveForm.value.curleavesettledupto1 && this.empleaveForm.value.curlvstdt == null) {
      this.empleaveForm.get('curlvstdt').setValue(this.commonService.dateFormat(this.empleaveForm.value.curleavesettledupto1.singleDate.jsDate));
    }
    if (this.empleaveForm.value.lastleavesettledupto1 && this.empleaveForm.value.lastlvstdt == null) {
      this.empleaveForm.get('lastlvstdt').setValue(this.commonService.dateFormat(this.empleaveForm.value.lastleavesettledupto1.singleDate.jsDate));
    }
    if (this.empleaveForm.value.lastticketsettledupto1 && this.empleaveForm.value.lastticketstdt == null) {
      this.empleaveForm.get('lastticketstdt').setValue(this.commonService.dateFormat(this.empleaveForm.value.lastticketsettledupto1.singleDate.jsDate));
    }

    if (typeof this.empleaveForm.value.lEmpleaveId == 'string') {
      this.empleaveForm.get('lEmpleaveId').setValue(Number(this.empleaveForm.value.lEmpleaveId));
    }
    this.empleaveForm.get('xEmployeeId').setValue(Number(this.empleaveForm.value.xEmployeeId));
    if (this.empleaveForm.value.encashment == "Y") {
      this.empleaveForm.get('islwp').setValue("Y");
    } else {
      this.empleaveForm.get('islwp').setValue("N");
    }

    if (this.empleaveForm.value.isHalfday1 && this.isHalfdayAllowed) {
      this.empleaveForm.get('isHalfday').setValue("Y");
    } else {
      this.empleaveForm.get('isHalfday').setValue("N");
    }

    if(this.empleaveForm.value.encashDays){
    } else{
      this.empleaveForm.get('encashDays').setValue(0);
    }

    this.empleaveForm.get('createdBy').setValue(Number(sessionStorage.getItem('userId')));
    this.empleaveForm.get('created').setValue(new Date());
    this.empleaveForm.get('updatedBy').setValue(Number(sessionStorage.getItem('userId')));
    this.empleaveForm.get('updated').setValue(new Date());
    this.empleaveForm.get('processed').setValue('Y');
    this.empleaveForm.get('airtktCb').setValue(this.empleaveForm.value.ticket);

    if (this.empleaveForm.value.gCompanyId) {
      this.empleaveForm.get('gCompanyId').setValue(Number(this.empleaveForm.value.gCompanyId));
    } else { this.empleaveForm.get('gCompanyId').setValue(null); }

    if (this.empleaveForm.value.xLeaveitemId) {
      this.empleaveForm.get('xLeaveitemId').setValue(Number(this.empleaveForm.value.xLeaveitemId));
    } else { this.empleaveForm.get('xLeaveitemId').setValue(null); }

    if (this.empleaveForm.value.fromAirsectorId) {
      this.empleaveForm.get('fromAirsectorId').setValue(Number(this.empleaveForm.value.fromAirsectorId));
    } else { this.empleaveForm.get('fromAirsectorId').setValue(null); }

    if (this.empleaveForm.value.xMonthId) {
      this.empleaveForm.get('xMonthId').setValue(Number(this.empleaveForm.value.xMonthId));
    } else { this.empleaveForm.get('xMonthId').setValue(null); }

    if (this.empleaveForm.value.toAirsectorId) {
      this.empleaveForm.get('toAirsectorId').setValue(Number(this.empleaveForm.value.toAirsectorId));
    } else { this.empleaveForm.get('toAirsectorId').setValue(null); }

    this.empleaveForm.get('ticketAmount').setValue(Number(this.empleaveForm.value.ticketAmount));

    this.empleaveForm.value.status == "ACTIVE" ? this.empleaveForm.get('isActive').setValue('Y') : this.empleaveForm.get('isActive').setValue('V');
    this.submitted = true;

    if (this.empleaveForm.invalid) {
      return;
    } else {

      this.empLeaveService.saveUpdateEmpleave(this.empleaveForm.value, flag).subscribe(success => {
        var s: any = success;
        if (s.code == 0) {
          this.toastService.showToast('danger', s.message);
        } else {
          this.toastService.showToast('success', s.message);
          console.log(this.fileData)
          this.empleaveForm.value.file ? this.uploadAttachment(s.data.lEmpleaveId) : this.back();
        }
      })
    }
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


  back() {
    this.router.navigate(["/views/transaction/emp-leave/emp-leave-summary"]);
  }


  //=================================  Upload file
  fileData: any;
  filePath: any;
  onFileChange(files: FileList) {
    this.filePath = null;
    console.log("====" + JSON.stringify(files))
    this.labelImport.nativeElement.innerText = Array.from(files)
      .map(f => f.name)
      .join(', ');
    // debugger
    // console.log(files.item(0));
    this.fileData = files.item(0);
    this.empleaveForm.get('file').setValue(files.item(0));

  }

  onFileChange1(files: FileList) {
    console.log("====" + JSON.stringify(files))
    this.labelImport.nativeElement.innerText = files;
    this.empleaveForm.get('file').setValue(files);

  }

  uploadAttachment(id) {
    const formData = new FormData();
    formData.append('file', this.empleaveForm.value.file);
    this.empLeaveService.fileUpload(id, formData).subscribe(s => {
      var success: any = s;
      this.back();
      console.log('success', success.message);
    });

  }

  openAttachment() {
    if (this.filePath) {
      window.open(environment.IMG_URL + this.filePath);
    }
  }

  selectTktInfo() {
   
    if (this.empleaveForm.value.ticket && this.eligibleforTicket!='N') {
      this.empleaveForm.get('deselectbtn2').setValue(true);
      if (this.lastticketsettledupto) {
        let lastticketsettledupto: Date = new Date(this.lastticketsettledupto);
        let fromModel2: IMyDateModel = { isRange: false, singleDate: { jsDate: lastticketsettledupto }, dateRange: null };
        this.empleaveForm.controls['lastticketsettledupto1'].setValue(fromModel2);
      }
      if (this.curticketsettledupto) {
        let curticketsettledupto: Date = new Date(this.curticketsettledupto);
        let fromModel3: IMyDateModel = { isRange: false, singleDate: { jsDate: curticketsettledupto }, dateRange: null };
        this.empleaveForm.controls['curticketsettledupto1'].setValue(fromModel3);
      }
    } else{
      this.empleaveForm.controls['ticket'].setValue(false);
      this.toastService.showToastLongMsg('danger',"You are not eligible for the air ticket till the date "+this.commonService.dateFormat(this.lastticketsettledupto1));
    }
  }

  paidLeaveDays: any;
  unpaidLeaveDays: any;
  leavedays: any;
  isleavesttlmnt: boolean;
  selectEncash(flag) {
    flag ? this.empleaveForm.get('deselectbtn1').setValue(true) : '';
    if (flag == 'Y') {
     
      if (this.paidLeaveDays) { this.empleaveForm.get('paidLeaveDays').setValue(this.paidLeaveDays); }
      if (this.unpaidLeaveDays) { this.empleaveForm.get('unpaidLeaveDays').setValue(this.unpaidLeaveDays); }
      if (this.leavedays) { this.empleaveForm.get('leavedays').setValue(this.leavedays); }

      (this.leaveCode == 'AL' ||this.leaveCode ==  'ALWD' || this.leaveCode=='ENCASH')? this.isleavesttlmnt = true : this.isleavesttlmnt = true;

    } else {
      this.paidLeaveDays = this.empleaveForm.value.paidLeaveDays;
      this.unpaidLeaveDays = this.empleaveForm.value.unpaidLeaveDays;
      this.leavedays = this.empleaveForm.value.leavedays;

      (this.leaveCode == 'AL' ||this.leaveCode ==  'ALWD'  || this.leaveCode=='ENCASH') ? this.isleavesttlmnt = false : this.isleavesttlmnt = true;

      // this.empleaveForm.get('paidLeaveDays').setValue(0);
      // this.empleaveForm.get('unpaidLeaveDays').setValue(0);
      // this.empleaveForm.get('leavedays').setValue(this.empleaveForm.value.paidLeaveDays + this.empleaveForm.value.unpaidLeaveDays);
    }
  }


  //*****************************************SET MESSAGE WHILE CHANGE STATUS

  changeStatus() {
    if (this.empleaveForm.value.status == "VOID") {
      Swal.fire({
        title: 'Status',
        text: "Are you sure ? \
         Voided Record can't be Reversed",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Ok'
      }).then((result) => {
        
        if (result.isConfirmed) {
          // paidLeaveDays
          console.log("=============================="+this.paidLeaveDays);
        } else {
          this.empleaveForm.controls['status'].setValue('ACTIVE');
        }
      })
    }
  }

  //*****************************************IS HALFDAY

  calSettlementDt(data){
    this.empLeaveService.calSettlementDt(data 
     ).subscribe(success=>{
        var data:any = success;
        if(data.data.curleavesettledupto){
          let curleavesettledupto: Date = new Date(data.data.curleavesettledupto);
          let fromModel1: IMyDateModel = { isRange: false, singleDate: { jsDate: curleavesettledupto }, dateRange: null };
          this.empleaveForm.controls['curleavesettledupto1'].setValue(fromModel1);
          this.changeCurrentAirTicketSettledUpTo(this.empleaveForm.value.curleavesettledupto1);
          }
    })
  }



  //=========== Deselect Option

  deselectbtn1Fun(){
      if(this.empleaveForm.value.deselectbtn1){
        this.empleaveForm.controls['encashment'].setValue(null);
        this.selectEncash(null);
      }
  }

  deselectbtn2Fun(){
    if(this.empleaveForm.value.deselectbtn2){
      this.empleaveForm.controls['ticket'].setValue(null);
      this.selectTktInfo();

      }
  }

  selectHalfday(){
    
    if(!this.empleaveForm.value.isHalfday1){
      this.empleaveForm.get('paidLeaveDays').setValue(0.5);
      this.empleaveForm.get('unpaidLeaveDays').setValue(0);
      this.empleaveForm.get('leavedays').setValue(this.empleaveForm.value.paidLeaveDays + this.empleaveForm.value.unpaidLeaveDays);       
    }
  }

  leaveRequestEvent(){}

  trackByxLeaveitemId(index: number, leaveObj:any){
    console.log(index);
    console.log(JSON.stringify(leaveObj))
  }


}