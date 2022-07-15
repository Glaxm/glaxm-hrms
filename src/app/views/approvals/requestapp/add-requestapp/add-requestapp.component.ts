import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IMyDateModel } from 'angular-mydatepicker';
import { CommonService, WorkflowRequestList } from 'src/app/views/services/common.service';
import { ToastrService } from 'src/app/views/services/toastr.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
import { RequestappService } from '../requestapp.service';
import { ExitRequest } from './exit-request/exit-request.model';
import { EmpLeave } from './leave-request/emp-leave.model';
import { EmpLoan } from './loan-request/emp-loan.model';
import { PreApproval } from './pre-approval/pre-approval.model';

@Component({
  selector: 'app-add-requestapp',
  templateUrl: './add-requestapp.component.html',
  styleUrls: ['./add-requestapp.component.scss']
})

export class AddRequestappComponent implements OnInit {

  requestForm: FormGroup;
  submitted = false;
  isView: boolean = false;
  isapprove: boolean = false;
  holdingList: any = [];
  workflowList: any = [];
  companyList: any = [];
  empObj: any;
  statuscode: string;
  iselegibility: string;
  msgEmpLoan: string;
  employeeList: any;
  employeeList1: any;
  public myDatePickerOptions = this.commonService.datepickerFormat;
  leaveRequest: any;
  statusList: any = [{ valueCode: 'ACTIVE', valueName: 'Active' }, { valueCode: 'INACTIVE', valueName: 'Inactive' }];
  moduleCode: any;
  approvalHistoryList: any = [];
  leavebalanceList: any = [];
  availableLeaveBal: any;
  PLDays:any;
  UPLDays:any;
  tktAmt:any;
  issubmit: boolean;
  ispopupdisplay: boolean = true;
  isview:boolean;

  
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

  fromattenreport:any;
  
  constructor(private preApproval:PreApproval, private empLeave: EmpLeave, private empLoan: EmpLoan, private exitrequest: ExitRequest, private commonService: CommonService, private toastService: ToastrService, private activatedRoute: ActivatedRoute, private requestService: RequestappService, private router: Router) {
    this.requestForm = new FormGroup({
      xLeaveitemId: new FormControl(null),
      trxdate: new FormControl(null),
      xEmployeeId: new FormControl(null),
      leavedays: new FormControl(null),
      replacebyempId: new FormControl(null),
      G_APPROVALREQ_ID: new FormControl(null),
      G_APPROVALWF_ID: new FormControl(null),
      G_COMPANY_ID: new FormControl(null, [Validators.required]),
      G_HOLDING_ID: new FormControl(null, [Validators.required]),
      ISACTIVE: new FormControl(null),
      status: new FormControl(null),
      CREATED: new FormControl(null),
      CREATEDBY: new FormControl(null),
      UPDATED: new FormControl(null),
      UPDATEDBY: new FormControl(null),
      DESCRIPTION: new FormControl(null),
      DOCUMENTNO_ID: new FormControl(null),
      DATEREQUEST: new FormControl(null),
      reqdate: new FormControl(null),
      DATEREQUEST1: new FormControl(null),
      USERID: new FormControl(null),
      remark: new FormControl(null),
      employee: new FormControl(null),
      employee1: new FormControl(null, [Validators.required]),
      NAME: new FormControl(sessionStorage.getItem("username"))
    });

    this.activatedRoute.queryParams.subscribe(params => {
      this.requestForm.controls['G_APPROVALREQ_ID'].setValue(params.id);
      this.isView = params.view;
      this.isapprove = Boolean(params.isapprove);
      this.statuscode = params.statuscode;
      


      // for employee absence report
      this.fromattenreport = params.fromattenreport;
      this.preApproval.startdate = params.stdate;
      this.preApproval.enddate = params.endate;
     
      this.moduleCode = params.requesttype;
      this.preApproval.companyId = params.companyid;
      this.requestForm.controls['G_COMPANY_ID'].setValue(params.companyid);
      this.preApproval.xEmployeeId = params.employeeid;
    
      this.preApproval.punchin = params.punchin;
      this.preApproval.punchout = params.punchout;
      // this.preApproval.startTime = params.punchin;
      // this.preApproval.endTime = params.punchout;
    });
    this.empObj = JSON.parse(sessionStorage.getItem("empinfo"));
    this.getApprovalWorkflow();

    this.moduleList = JSON.parse(sessionStorage.getItem("moduleList"));
    if (this.moduleList) {
      this.moduleList.map((e) => {
        if (e.moduleGroup == 'Request' && e.moduleName == 'Approval Request') {
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

  ngOnInit() {
    this.tepMethod();
   // this.empSetting();
    this.getHoldingList();
    this.getEmployeeList();
    // this.commonService.getModuleDetailsByCode(WorkflowRequestList.LEAVE_REQUEST).subscribe(s=>{

    // })



    if (this.requestForm.value.G_APPROVALREQ_ID) {
      this.getApprovalReqHistory(this.requestForm.value.G_APPROVALREQ_ID);
      this.getLeaveBaList(this.requestForm.value.G_APPROVALREQ_ID);
      this.requestService.getrequestById(this.requestForm.value.G_APPROVALREQ_ID).subscribe(success => {
        var s: any = success;
        if (success) {
          this.getReplacementData(this.requestForm.value.G_APPROVALREQ_ID);
          this.requestForm.patchValue(s);
          this.requestForm.get('G_APPROVALWF_ID').setValue(s.g_APPROVALWF_ID);

          this.selectWorkflowRequest(s.g_APPROVALWF_ID);
          this.requestForm.controls['G_HOLDING_ID'].setValue(s.holdingid);
          this.getCompanyListByHoldingId(s.holdingid);
          this.getEmployeeList1(s.companyid);
          let startDate: Date = new Date(s.daterequest);
          let fromModel: IMyDateModel = { isRange: false, singleDate: { jsDate: startDate }, dateRange: null };
          this.requestForm.controls['DATEREQUEST1'].setValue(fromModel);
         
          s.isActive == 'Y' ? this.requestForm.get('status').setValue("ACTIVE") : this.requestForm.get('status').setValue("INACTIVE");
          if (this.isView) { this.requestForm.disable(); }
          this.requestForm.controls['G_COMPANY_ID'].setValue(s.companyid);

        }
        this.requestForm.get('G_APPROVALWF_ID').disable();
        this.requestForm.get('G_COMPANY_ID').disable();
        this.requestForm.get('employee').disable();
        this.isview=true;
      });
    } else {
      this.requestForm.get('status').setValue("ACTIVE");
      let startDate: Date = new Date();
      let fromModel: IMyDateModel = { isRange: false, singleDate: { jsDate: startDate }, dateRange: null };
      this.requestForm.controls['DATEREQUEST1'].setValue(fromModel);
      this.requestForm.controls['DOCUMENTNO_ID'].setValue("WFDOCNO" + Math.floor(1000 + Math.random() * 9000));
      this.changeEffectiveDate(this.requestForm.value.DATEREQUEST1);
    
      if(this.fromattenreport=="Y"){
        this.requestForm.controls['G_COMPANY_ID'].setValue(this.preApproval.companyId);
        this.requestForm.controls['xEmployeeId'].setValue(this.preApproval.xEmployeeId);
        this.getEmployeeList1(this.preApproval.companyId);
        
        if(this.workflowList){
          // this.workflowList.find(x => x.gApprovalwfId == id);
        }
        
      //   this.fromattenreport = params.fromattenreport;
      // this.preApproval.startdate = params.stdate;
      // this.preApproval.enddate = params.endate;
      // this.moduleCode = params.requesttype;
      // this.preApproval.companyId = params.companyid;
      // this.preApproval.xEmployeeId = params.employeeid;

      }

    }
  }

  getReplacementData(id) {
    this.requestService.getReplacementData(id).subscribe(data => {
      let d: any = data;
      if (d) {
        this.requestForm.controls['replacebyempId'].setValue(d.data.replacebyempId);
        this.selectedItems = [{ 'employeeId': d.data.replacebyempId, 'displayName': d.data.empname }];//[{'employeeId':21,'displayName':"00105-4001-Pankaj  Bhagtani"}];
      }
    });
  }

  getEmployeeList1(companyid) {
    var l: any = [Number(companyid)];
    this.requestService.getEmployeeList(this.moduleid,l).subscribe(s => {
      this.employeeList1 = s;
      if (this.requestForm.value.G_APPROVALREQ_ID) {
        let list = this.employeeList1.filter(item => item.employeeId == this.requestForm.value.xEmployeeId);
        if (list.length > 0) {
          this.selectedItems1 = [{ 'employeeId': list[0].employeeId, 'displayName': list[0].displayName }];
        }
      } else{
        if(this.employeeList1.length==1){
          this.selectedItems1 = [{ 'employeeId': this.employeeList1[0].employeeId, 'displayName': this.employeeList1[0].displayName }];
          this.onItemSelect1({ 'employeeId': this.employeeList1[0].employeeId, 'displayName': this.employeeList1[0].displayName });
        }
      }

      if (this.fromattenreport=="Y") {
        let list = this.employeeList1.filter(item => item.employeeId == this.requestForm.value.xEmployeeId);
        if (list.length > 0) {
          this.selectedItems1 = [{ 'employeeId': list[0].employeeId, 'displayName': list[0].displayName }];
        }
      }

    });
  }

  getEmployeeList() {
    let list: any = JSON.parse(sessionStorage.getItem("company"));
    var l: any = [];
    if(list){
    for (var i = 0; i < list.length; i++) {
      l.push(Number(list[i]));
    }}

    this.requestService.getEmployeeList(this.moduleid,l).subscribe(s => {
      this.employeeList = s;
      if (this.requestForm.value.G_APPROVALREQ_ID && this.requestForm.value.replacebyempId) {
        let list = this.employeeList.filter(item => item.employeeId == this.requestForm.value.replacebyempId);
        if (list.length > 0) {
          this.selectedItems = [{ 'employeeId': list[0].employeeId, 'displayName': list[0].displayName }];
        }
      }
    });
  }

  getApprovalReqHistory(id) {
    this.requestService.getApprovalReqHistory(id).subscribe(success => {
      this.approvalHistoryList = success;
    });
  }
  getLeaveBaList(id) {
    this.requestService.getLeaveBaList(id).subscribe(success => {
      this.leavebalanceList = success;
    });
  }

  get pi() { return this.requestForm.controls; }

  changeEffectiveDate(event) {
    if (event.singleDate) {
      this.requestForm.controls['reqdate'].setValue(this.commonService.dateFormat(event.singleDate.jsDate));
    }

  }

  getCompanyListByHoldingId(holdinId) {

    this.requestService.getCompanyListByHoldingId(holdinId).subscribe(s => {
      if(this.requestForm.value.G_APPROVALREQ_ID){
        this.companyList = s;
      } else{
      this.companyList = s;
      
      if (this.companyList) {
        let list: any = JSON.parse(sessionStorage.getItem("company"));
        var l: any = [];
        if (list) {
          for (var i = 0; i < list.length; i++) {
            l.push(Number(list[i]));
          }
        }
        this.companyList = this.companyList.filter(o1 => l.some(o2 => o1.gCompanyId === o2));
        
        if(this.companyList){
          if(this.fromattenreport!="Y"){
          this.requestForm.get('G_COMPANY_ID').setValue(this.companyList[0].gCompanyId);
          this.selectCompany(this.companyList[0].gCompanyId);
         
        }
        }
      }}
    });
  }

  getHoldingList() {
    this.requestService.getHoldingList().subscribe(s => {
      this.holdingList = s;
      this.requestForm.get('G_HOLDING_ID').setValue(this.holdingList[0].gHoldingId);
      this.getCompanyListByHoldingId(this.holdingList[0].gHoldingId)
    });
  }

  getApprovalWorkflow() {
    this.requestService.getApprovalWorkflow(sessionStorage.getItem('userId')).subscribe(success => {
      var list:any = success;
     
      if(this.fromattenreport=="Y"){
        // this.workflowList = list;
        this.workflowList = list.filter(item => item.modulename.includes('Employee Absences'));
        let datalist =this.workflowList.find(x => x.modulename=="Employee Absences");
        this.requestForm.get('G_APPROVALWF_ID').setValue(datalist.gApprovalwfId);
      } else{
       
        this.requestForm.value.G_APPROVALREQ_ID ? (this.workflowList = list) : (this.workflowList = list.filter(item => !item.modulename.includes('Employee Absences')));
       
      }
    });
  }

  addUpdateWorkflowRequest() {
    if (this.moduleCode == 'EMPLOYEELEAVE') {
      this.requestForm.get('xLeaveitemId').setValue(this.empLeave.xLeaveitemId);
      this.requestForm.get('trxdate').setValue(this.empLeave.startdate);
      if(this.requestForm.value.xEmployeeId){
        this.requestForm.get('xEmployeeId').setValue(Number(this.requestForm.value.xEmployeeId));
        this.empLeave.xEmployeeId = this.requestForm.value.xEmployeeId ? Number(this.requestForm.value.xEmployeeId) : null;
      }
     
      this.requestForm.get('leavedays').setValue(this.empLeave.leavedays);
    }
    if (this.moduleCode == 'EXITFORM') {
      // this.requestForm.get('xEmployeeId').setValue(this.exitrequest.xEmployeeId);
      if(this.requestForm.value.xEmployeeId){
        this.requestForm.get('xEmployeeId').setValue(Number(this.requestForm.value.xEmployeeId));
       this.exitrequest.xEmployeeId = this.requestForm.value.xEmployeeId ? Number(this.requestForm.value.xEmployeeId) : null;
      }
      this.requestForm.get('xLeaveitemId').setValue(0);
      this.requestForm.get('trxdate').setValue(this.exitrequest.joiningDt);
      this.requestForm.get('leavedays').setValue(0);
    }
    if (this.moduleCode == 'EMPLOAN') {
      // this.requestForm.get('xEmployeeId').setValue(this.empLoan.xEmployeeId);
      if(this.requestForm.value.xEmployeeId){
        this.requestForm.get('xEmployeeId').setValue(Number(this.requestForm.value.xEmployeeId));
       this.empLoan.xEmployeeId = this.requestForm.value.xEmployeeId ? Number(this.requestForm.value.xEmployeeId) : null;
      }
      this.requestForm.get('trxdate').setValue(this.empLoan.trxdate);
    }

    if(this.requestForm.value.xEmployeeId){
      this.requestForm.get('xEmployeeId').setValue(Number(this.requestForm.value.xEmployeeId));
    }

    this.requestForm.get('CREATEDBY').setValue(Number(sessionStorage.getItem('userId')));
    this.requestForm.get('CREATED').setValue(new Date());
    this.requestForm.get('UPDATEDBY').setValue(Number(sessionStorage.getItem('userId')));
    this.requestForm.get('USERID').setValue(Number(sessionStorage.getItem('userId')));
    this.requestForm.get('UPDATED').setValue(new Date());
    this.requestForm.get('G_APPROVALWF_ID').setValue(Number(this.requestForm.value.G_APPROVALWF_ID));
    this.requestForm.get('G_COMPANY_ID').setValue(Number(this.requestForm.value.G_COMPANY_ID));
    this.requestForm.get('G_APPROVALREQ_ID').setValue(undefined);

    // this.requestForm.get('status').setValue(undefined);
    // this.requestForm.get('DATEREQUEST1').setValue(undefined);
    this.requestForm.get('replacebyempId').setValue(0);

    this.requestForm.get('ISACTIVE').setValue('Y');

    this.submitted = true;
    if (this.requestForm.invalid) {
      return;
    } else {

// alert(JSON.stringify(this.requestForm.value))
      if(this.fromattenreport=="Y"){
       
        // if(this.preApproval.preapprovallatecome=="Pre-approval request for late coming " || this.preApproval.preapprovallatecome=="Pre-approval request for early leaving"){
        //   const myArray = this.preApproval.totalTime ? this.preApproval.totalTime.split(":") : null;
        //   let val;
        //   if(myArray) { val = myArray[0]; }

        //   if(val > 2){
        //       this.toastService.showToast('danger', "Please add request to less than 2 hours");
        //     }


        // } else{  
        if(this.calDays() <= "4"){

            // 
        if(this.preApproval.preapprovallatecome=="Pre-approval request for late coming " || this.preApproval.preapprovallatecome=="Pre-approval request for early leaving"){
          const myArray = this.preApproval.totalTime ? this.preApproval.totalTime.split(":") : null;
          let val;
          if(myArray) { val = myArray[0]; }

          if(val > 2){
              this.toastService.showToast('danger', "Please add request to less than 2 hours");
            } else{
              this.saveHeaderData(this.requestForm.value);
            }


        } else{
          this.saveHeaderData(this.requestForm.value);
        }
            // 

           
          } else{
            this.toastService.showToast('danger', "Start date and end date should be only 3 days less than from todays date");
          }
        // }
        } else{
         if(this.preApproval.preapprovallatecome=="Pre-approval request for late coming " || this.preApproval.preapprovallatecome=="Pre-approval request for early leaving"){
          const myArray = this.preApproval.totalTime ? this.preApproval.totalTime.split(":") : null;
          let val;
          if(myArray) { val = myArray[0]; }

          if(val > 2){
              this.toastService.showToast('danger', "Please add request to less than 2 hours");
            } else{
              this.saveHeaderData(this.requestForm.value);    
            }

        }else{
          this.saveHeaderData(this.requestForm.value);
        }
       
      }
     
    }
  }

  saveHeaderData(data){
    this.requestService.addUpdaterequest(data).subscribe(success => {
      var s: any = success;
      if (s.code == 0) {
        this.toastService.showToast('danger', s.message);
      } else {
        if (this.moduleCode == 'EMPLOYEELEAVE') {

          this.empLeave.documentno = s.documentnO_ID;
          this.empLeave.g_APPROVALREQ_ID = s.g_APPROVALREQ_ID;
          this.addEmpLeaveRequest(this.empLeave);
        }

        if (this.moduleCode == 'EMPLOAN') {
          this.empLoan.documentno = s.documentnO_ID;
          this.empLoan.g_APPROVALREQ_ID = s.g_APPROVALREQ_ID;
          this.addEmpLoanRequest(this.empLoan);
        }

        if (this.moduleCode == 'EXITFORM') {
          this.exitrequest.documentno = s.documentnO_ID;
          this.exitrequest.g_APPROVALREQ_ID = s.g_APPROVALREQ_ID;
          this.addExitRequest(this.exitrequest);
        }

       //alert(this.moduleCode);
        if(this.moduleCode=='EMPABSENCE'){
            this.preApproval.documentno = s.documentnO_ID;
            this.preApproval.g_APPROVALREQ_ID = s.g_APPROVALREQ_ID;
            this.addPreApprovalAbsence(this.preApproval);
        }

      }
    });
  }

  calDays() {

    if (this.preApproval.startdate && this.preApproval.datetrx) {
      var date1: any = this.preApproval.startdate;
      var date2: any = this.preApproval.datetrx;
      var diffDays: any = Math.floor((date2 - date1) / (1000 * 60 * 60 * 24)) + 1;
      return diffDays;
    } else {
      return 0;
    }
  }


  back() {
    if (this.isapprove) {
      this.router.navigate(['/views/approval-flow/approvalstatus/approvestatus-summary'])
    } else {
      if(this.fromattenreport=="Y"){
        this.router.navigate(["/views/report/emp-attendance-report"]);
    } else{
      this.router.navigate(['/views/approval-flow/approvalrequest/request-summary']);
    }}
  }

  addEmpLeaveRequest(data) {
    this.requestService.addEmpLeaveRequest(data).subscribe(success => {
      var s: any = success;
      if (s.code == 0) {
        this.toastService.showToast('danger', s.message);
      } else {
        this.toastService.showToast('success', s.message);
        if(this.empLeave.file){
          this.uploadAttachment(s.data.lEmpleaveId);
        }
        this.back();
      }
    })
  }

  uploadAttachment(id) {

    const formData = new FormData();
    formData.append('file', this.empLeave.file);
    this.requestService.fileUpload(id, formData).subscribe(s => {
      var success: any = s;
      this.toastService.showToast('success', success.message);
    });

  }

  addEmpLoanRequest(data) {
   
    this.requestService.addEmpLoanRequest(data).subscribe(success => {
      var s: any = success;
      if (s.code == 0) {
        this.toastService.showToast('danger', s.message);
      } else {
        this.toastService.showToast('success', s.message);
        if(this.empLoan.file){
        this.uploadLoanAttachment(s.data.lEmploanId);
      }
        this.back();
      }
    });  
  }

  uploadLoanAttachment(id) {
    const formData = new FormData();
    formData.append('file', this.empLoan.file);
    this.requestService.uploadLoanAttachment(id, formData).subscribe(s => {
      var success: any = s;
      this.toastService.showToast('success', success.message);
    });

  }


  addExitRequest(data) {
    this.requestService.addExitRequest(data).subscribe(success => {
      var s: any = success;
      if (s.code == 0) {
        this.toastService.showToast('danger', s.message);
      } else {
        this.toastService.showToast('success', s.message);
        this.back();
      }
    })
  }



  // ----------------------------------------------------------------------------------------------------
  employeeid: any;
  leaveRequestFunction(result) {
    this.empLeave.isHalfday = result.isHalfday;
    this.empLeave.created = result.created;
    this.empLeave.airtktCb = result.ticket;
    this.empLeave.encashment = result.encashment;
    this.empLeave.islwp  = result.encashment =='Y' ? 'Y' : 'N';
    this.empLeave.createdBy = Number(result.createdBy);
    this.empLeave.description = result.description;
    this.empLeave.gCompanyId =  Number(result.gCompanyId);
    this.empLeave.gHoldingId = result.gHoldingId;
    this.empLeave.isActive = result.isActive;
    this.empLeave.leavedays = result.leavedays;
    this.empLeave.encashDays = result.encashDays ? result.encashDays : 0;
    this.empLeave.upLeavedays = result.upLeavedays;
    this.empLeave.xEmployeeId = this.requestForm.value.xEmployeeId;
    this.employeeid = this.requestForm.value.xEmployeeId ? Number(this.requestForm.value.xEmployeeId) : null;
    this.empLeave.processed = result.processed;
    this.empLeave.startdate = result.startdate;
    this.empLeave.enddate = result.enddate;
    this.empLeave.stdate = this.commonService.dateFormat(result.startdate);
    this.empLeave.endate = this.commonService.dateFormat(result.enddate);
    this.empLeave.updated = result.updated;
    this.empLeave.updatedBy = Number(result.updatedBy);
    this.empLeave.trxdate = this.commonService.dateFormat(result.datetrx);
    this.empLeave.documentno = result.documentno;
    this.empLeave.actualend = result.actualend;
    this.empLeave.xLeaveitemId = Number(result.xLeaveitemId);
    this.empLeave.leavePurpose = result.leavePurpose;
    this.empLeave.contactDetails = result.contactDetails;
    this.empLeave.fromAirsectorId = result.fromAirsectorId ? Number(result.fromAirsectorId) : result.fromAirsectorId;
    this.empLeave.toAirsectorId = result.toAirsectorId ? Number(result.toAirsectorId) : result.toAirsectorId;
    this.empLeave.airtktEntitled = result.airtktEntitled;
    this.empLeave.airtktClass = result.airtktClass;
    this.empLeave.file = result.file;
    this.empLeave.std = result.std;
    this.empLeave.end = result.end;
    this.empLeave.trxd = result.trxd;
    this.empLeave.ticketAmount = result.ticketAmount;
    this.empLeave.paidLeaveDays = result.paidLeaveDays ? result.paidLeaveDays : 0;
    this.empLeave.unpaidLeaveDays = result.unpaidLeaveDays ? result.unpaidLeaveDays : 0;

    this.empLeave.lastleavesettledupto = result.lastleavesettledupto;
    this.empLeave.lastlvstdt = result.lastleavesettledupto ? this.commonService.dateFormat(result.lastleavesettledupto) : null;
    this.empLeave.curleavesettledupto = result.curleavesettledupto;
    this.empLeave.curlvstdt = result.curleavesettledupto ? this.commonService.dateFormat(result.curleavesettledupto) : null;
    this.empLeave.lastticketsettledupto = result.lastticketsettledupto;
    this.empLeave.lastticketstdt = result.lastticketsettledupto ? this.commonService.dateFormat(result.lastticketsettledupto) :null;
    this.empLeave.curticketsettledupto = result.curticketsettledupto;
    this.empLeave.curticketstdt = result.curticketsettledupto ? this.commonService.dateFormat(result.curticketsettledupto) : null;
    this.empLeave.toResumedt = result.toresumedutyon;
    this.empLeave.resumedt=this.empLeave.toResumedt ? this.commonService.dateFormat(this.empLeave.toResumedt) : null;
    if(this.PLDays==null){
      this.PLDays = result.paidLeaveDays ? result.paidLeaveDays : 0;
    } 
    if(this.UPLDays==null){
      this.UPLDays = result.unpaidLeaveDays ? result.unpaidLeaveDays : 0;
    }

    if(this.tktAmt==null){
      this.tktAmt = result.ticketAmount ? result.ticketAmount : 0;
    }

    
    // if (this.empLeave.stdate && this.empLeave.endate && this.empLeave.leavedays && this.empLeave.xEmployeeId && this.empLeave.trxdate) {
    //   this.requestService.getLeaveBal({ "strdate": this.empLeave.stdate, "xEmployeeId": result.xEmployeeId, "leavedays": result.leavedays, "xLeaveitemId": Number(result.xLeaveitemId) }).subscribe(data => {
    //     this.availableLeaveBal = JSON.stringify(data);
    //   })
    // }

    if (result.leaveitemcode != 'AL') {
      this.issubmit = true;
    } else {
      if (this.requestForm.value.G_APPROVALREQ_ID) { 
        if(sessionStorage.getItem('end')!='null' && this.empLeave.endate!=sessionStorage.getItem('end')){
          this.ispopupdisplay = true;
        } else{
          this.ispopupdisplay = false;
        }
       
       
        this.empLeave.leavedays = Number(sessionStorage.getItem('leavedays'));
        result.leavedays = this.commonService.calDays(result.startdate,result.enddate);
        result.xEmployeeId = Number(this.requestForm.value.xEmployeeId);
        this.empLeave.xEmployeeId = this.requestForm.value.xEmployeeId;
        // this.empLeave.trxdate = sessionStorage.getItem('trxd');
        result.xLeaveitemId = sessionStorage.getItem('xLeaveitemId');

      } else {
        if (!this.ispopupdisplay) { this.issubmit = true; }
      }
      if (result.leavedays && this.ispopupdisplay && this.empLeave.stdate && this.empLeave.endate  && this.empLeave.xEmployeeId) {
        this.ispopupdisplay = false;
         this.issubmit = true;
      //   this.requestService.getLeaveBal({ "strdate": this.empLeave.stdate, "enddate": this.empLeave.endate,"xEmployeeId": result.xEmployeeId, "leavedays": result.leavedays, "xLeaveitemId": Number(result.xLeaveitemId) }).subscribe(success => {
      //     var data:any = success;
      //     this.availableLeaveBal = data.data.baldays;

      //     Swal.fire({
      //       title: 'Leave Applied : ' + result.leavedays + '\n ' + 'Leave Balance    : ' + this.availableLeaveBal,
      //       text: "By submitting this request, you are abide by our company Leave policy, procedure and its regulations.\
      //          Note : A maximum 60 days leave application is considerable for those employees,\
      //          who have once in a two year Air ticket eligibility, for other employees maximum 30 days leave application is considerable, subject to management review and approval.",
      //       icon: 'warning',
      //       showCancelButton: false,
      //       confirmButtonColor: '#3085d6',
      //       cancelButtonColor: '#d33',
      //       confirmButtonText: 'Ok'
      //     }).then((result) => {
      //       if (result.isConfirmed) {
      //         this.issubmit = true;
      //       }

      //     })

      //  })

      } else {
        if (this.empLeave.xEmployeeId) {

        } else {
          this.ispopupdisplay = true;
          this.issubmit = false
        }
      }
    }

  }

  loanRequestFunction(result) {
    
    this.empLoan.balance = 0;//result.balance;
    this.empLoan.companyId = Number(result.companyId);
    this.empLoan.created = result.created;
    this.empLoan.createdBy = Number(result.createdBy);
    this.empLoan.description = result.description;
    this.empLoan.documentno = null;//result.documentno;
    this.empLoan.holdingId = result.holdingId;
    this.empLoan.installmentamount = result.installmentamount ? Number(result.installmentamount) : 0.0;
    this.empLoan.installments = result.installments ? Number(result.installments) : 0;
    this.empLoan.interestrate = result.interestrate ? Number(result.interestrate) : 0;
    this.empLoan.isActive = result.isActive;
    this.empLoan.lastdate = null;
    this.empLoan.lndate = result.datetrx;
    this.empLoan.loanamount = result.loanamount ? Number(result.loanamount) : null;
    this.empLoan.loandate = null;
    this.empLoan.lstdate = null;
    this.empLoan.trxdate = result.datetrx;
    this.empLoan.paymentdate = null;//this.commonService.dateFormat(new Date());
    // this.empLoan.remarks = result.remarks;
    this.empLoan.startdate = null;
    this.empLoan.stdate = result.stdate;
    this.empLoan.endate = result.endate;
    this.empLoan.enddate = null;
    this.empLoan.xPayitemId = result.xPayitemId!=0 ? result.xPayitemId : null;
    this.empLoan.updated = result.updated;
    this.empLoan.updatedBy = Number(result.updatedBy);
    this.empLoan.xEmployeeId = this.requestForm.value.xEmployeeId ? Number(this.requestForm.value.xEmployeeId) : null;
    this.empLoan.pdate = null;
    this.empLoan.file = result.file;
    
    if(this.empLoan.stdate && this.empLoan.loanamount && this.empLoan.xPayitemId && this.empLoan.lndate){
        this.issubmit=true;
    }
  }

  exitRequestFunction(result) {
    console.log(JSON.stringify(result));
    this.exitrequest.lEmpeosbId = result.lEmpeosbId ? result.lEmpeosbId : 0;
    this.exitrequest.reason = result.reason;
    this.exitrequest.joiningDt = result.joiningDt;
    this.exitrequest.documentno = result.documentno;
    this.exitrequest.designation = result.designation;
    this.exitrequest.department = result.department;
    this.exitrequest.gCompanyId = Number(result.gCompanyId);
    this.exitrequest.gHoldingId = result.gHoldingId;
    this.exitrequest.isActive = result.isActive;
    this.exitrequest.createdBy = result.createdBy;
    this.exitrequest.updatedBy = result.updatedBy;
    this.exitrequest.created = result.created;
    this.exitrequest.updated = result.updated;
    this.exitrequest.xEmployeeId = this.requestForm.value.xEmployeeId ? Number(this.requestForm.value.xEmployeeId) : null;
    this.exitrequest.lastworkDay = result.lastworkDay;
    this.exitrequest.lastdate = result.lastdate;
    this.issubmit = true;
  }


  selectWorkflowRequest(id) {
    if(this.workflowList){
      
        var data: any = this.workflowList.find(x => x.gApprovalwfId == id);
        
        if(data){
          this.requestService.getModuleDetailsById(data.moduleid).subscribe(succes => {
            var s: any = succes;
            this.moduleCode = s.data.moduleCode;
            if (s.data.moduleCode == 'EMPLOAN') {
              this.requestService.chkEligibity(sessionStorage.getItem("employeeId")).subscribe(data => {
                var d: any = data;
                this.iselegibility = d.isEligible;
                if (d.isEligible != 'Y') {
                  this.toastService.showToastCenter('danger', d.message);
                }
              });
            }
          });
        }
    }

  }

  requestUpdate(status) {

    var obj = {
      g_APPROVALREQ_ID: Number(this.requestForm.value.G_APPROVALREQ_ID),
      holdingId: this.empObj.data.holdingId,
      companyId: this.empObj.data.companyId,
      approveR_ID: Number(sessionStorage.getItem("userId")),
      datestatus: new Date(),
      isactive: 'Y',
      updated: new Date(),
      updatedby: Number(sessionStorage.getItem("userId")),
      approvalstatus: status,
      processing: null,
      processed: 'Y',
      remarks: this.requestForm.value.remark
    };

    this.saveReplacement();

    if (this.moduleCode == 'EMPLOYEELEAVE') {
      let data = {
        "reqid": Number(this.requestForm.value.G_APPROVALREQ_ID),
        "leavestartDt": this.empLeave.stdate,
        "leaveendDt": this.empLeave.endate,
        "replacebyempId": this.requestForm.value.replacebyempId ? Number(this.requestForm.value.replacebyempId) : null,
        "paidLeaveDays":this.empLeave.paidLeaveDays,
        "unpaidLeaveDays":this.empLeave.unpaidLeaveDays,
        "ticketAmount":this.empLeave.ticketAmount,
        "leavedays":(this.empLeave.unpaidLeaveDays ? this.empLeave.unpaidLeaveDays : 0) + (this.empLeave.paidLeaveDays ? this.empLeave.paidLeaveDays : 0),
        "lastleavesettledupto":this.empLeave.lastleavesettledupto,
        "curleavesettledupto":this.empLeave.curleavesettledupto,
        "lastticketsettledupto":this.empLeave.lastticketsettledupto,
        "curticketsettledupto":this.empLeave.curticketsettledupto,
        "toResumedt":this.empLeave.toResumedt,
        "lastlvstdt":this.empLeave.lastlvstdt,
        "curlvstdt":this.empLeave.curlvstdt,
        "lastticketstdt":this.empLeave.lastticketstdt,
        "curticketstdt":this.empLeave.curticketstdt,
        "resumedt":this.empLeave.toResumedt ? this.commonService.dateFormat(this.empLeave.toResumedt) : null
      };
      let st = this.empLeave.stdate ? this.empLeave.stdate : sessionStorage.getItem('std');
      let en = this.empLeave.stdate ? this.empLeave.endate : sessionStorage.getItem('end');

    if (status == 'A' && (sessionStorage.getItem('std')!=st || sessionStorage.getItem('end')!=en || this.PLDays !=this.empLeave.paidLeaveDays || this.UPLDays!=this.empLeave.unpaidLeaveDays || this.tktAmt != this.empLeave.ticketAmount)) {
     
      this.requestService.updateempleavedata(data).subscribe(data => {
          var s: any = data;
          if (s.code == 0) {
            this.toastService.showToast('danger', s.message);
          } else {
            this.updateApprovalStatus(obj);
          }
        });
      
      } else {
       this.updateApprovalStatus(obj);
      }
    }

    if (this.moduleCode == 'EMPLOAN') {
      let data = {
        "reqid": Number(this.requestForm.value.G_APPROVALREQ_ID),
        "loanstartDt": this.empLoan.stdate,
        "loanendDt": this.empLoan.endate,
        "loanDt": this.empLoan.lndate,
        "loanamount": this.empLoan.loanamount,
        "installments": this.empLoan.installments,
        "installmentamount": this.empLoan.installmentamount
      };
      if (status == 'A') {
        this.requestService.updateLoanDates(data).subscribe(data => {
          var s: any = data;
          if (s.code == 0) {
            this.toastService.showToast('danger', s.message);
          } else {
            this.updateApprovalStatus(obj);
            this.toastService.showToast('success', s.message);
          }
        });
      } else {
        this.updateApprovalStatus(obj);
      }
    }

    if (this.moduleCode == 'EXITFORM') {
      this.updateApprovalStatus(obj);
    }

    if (this.moduleCode == 'EMPABSENCE') {
      this.updateApprovalStatus(obj);
    }

  }

  saveReplacement(){
    if(this.requestForm.value.G_APPROVALREQ_ID && this.requestForm.value.replacebyempId){
      let obj = {"reqid" : Number(this.requestForm.value.G_APPROVALREQ_ID),
                  "replacebyempId":this.requestForm.value.replacebyempId ? Number(this.requestForm.value.replacebyempId) : null
                };
      this.requestService.saveReplacementData(obj).subscribe(data=>{
         // alert(JSON.stringify(data));
      })
    }
  }

  updateApprovalStatus(obj) {
    this.requestService.updateApprovalStatus(obj).subscribe(data => {
      var s: any = data;
      if (s.code == 0) {
        this.toastService.showToast('danger', s.message);
      } else {
        this.toastService.showToast('success', s.message);
        this.router.navigate(['/views/approval-flow/approvalstatus/approvestatus-summary'])
      }
    });
  }


  getLeaveBal(obj) {
    this.requestService.getLeaveBal(obj).subscribe(data => {
      this.availableLeaveBal = JSON.stringify(data);
    })
  }

  selectCompany(companyId){
    this.getEmployeeList1(companyId);
  }


  //==============================================
  selectedItems: Array<any> = [];
  dropdownSettings: any = {};

  onEmployeeDeSelect(items: any) {
    this.selectedItems = this.selectedItems.filter(item => item.employeeId !== items.employeeId);
    this.requestForm.get('xEmployeeId').setValue(undefined);
  }

  tepMethod() {
    this.dropdownSettings = {
      singleSelection: true,
      idField: 'employeeId',
      textField: 'displayName',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 1,
      allowSearchFilter: true
    };
  }

  onItemSelect(item: any) {
   
    this.requestForm.controls['replacebyempId'].setValue(item.employeeId);

  }
  onSelectAll(items: any) {
    console.log('onSelectAll', items);
  }

//=====================================================

  //==============================================
  selectedItems1: Array<any> = [];
  dropdownSettings1: any = {};

  onEmployeeDeSelect1(items: any) {
    this.selectedItems = this.selectedItems.filter(item => item.employeeId !== items.employeeId);
    this.requestForm.get('xEmployeeId').setValue(undefined);
  }

  empSetting() {
    this.dropdownSettings1 = {
      singleSelection: true,
      idField: 'employeeId',
      textField: 'displayName',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 1,
      allowSearchFilter: true
    };
  }

  onItemSelect1(item: any) {   
    this.requestForm.controls['xEmployeeId'].setValue(item.employeeId);
  }

  onSelectAll1(items: any) {
    console.log('onSelectAll', items);
  }


  //*********************** PRE APPROVAL REQUEST ***********************8 */

  preApprovalFunction(data){
  // alert(JSON.stringify(data));
      this.preApproval.lsAbsenceRsnId = typeof data.lsAbsenceRsnId=='string' ? Number(data.lsAbsenceRsnId) : data.lsAbsenceRsnId;
      this.preApproval.lsAbsencetypeId = typeof data.lsAbsencetypeId=='string' ? Number(data.lsAbsencetypeId) : data.lsAbsencetypeId;
      this.preApproval.approvalstatus = data.approvalstatus;
      this.preApproval.companyId = typeof this.requestForm.value.G_COMPANY_ID=='string' ? Number(this.requestForm.value.G_COMPANY_ID) : this.requestForm.value.G_COMPANY_ID;
      this.preApproval.createdBy = Number(sessionStorage.getItem('userId'));
      this.preApproval.created = new Date();
      this.preApproval.updated=new Date();
      this.preApproval.updatedBy=Number(sessionStorage.getItem('userId'));
      this.preApproval.holdingId=this.requestForm.value.G_HOLDING_ID;
      this.preApproval.xEmployeeId = typeof this.requestForm.value.xEmployeeId=="string" ? Number(this.requestForm.value.xEmployeeId) : this.requestForm.value.xEmployeeId;
      this.preApproval.startdate = data.startdate1.singleDate.jsDate;
      this.preApproval.stdate = this.commonService.dateFormat(data.startdate1.singleDate.jsDate);
      this.preApproval.enddate  = data.enddate1.singleDate.jsDate;
      this.preApproval.endate = this.commonService.dateFormat(data.enddate1.singleDate.jsDate);
      this.preApproval.startTime = data.startTime;
      this.preApproval.endTime = data.endTime;
      this.preApproval.datetrx  = data.datetrx1.singleDate.jsDate;
      this.preApproval.trxdt = this.commonService.dateFormat(data.datetrx1.singleDate.jsDate);
      this.preApproval.description = data.description;
      this.preApproval.totalTime = data.totalTime;
      this.preApproval.file = data.file;
      this.preApproval.preapprovallatecome = data.preapprovallatecome;
      this.preApproval.isValidate = data.isValidate;       
      // data.isValidate ? this.issubmit=true : this.issubmit=false;
      this.issubmit=true;
  }

  addPreApprovalAbsence(data){
    this.requestService.addPreApprovalAbsence(data).subscribe(success => {
      var s: any = success;
      if (s.code == 0) {
        this.toastService.showToast('danger', s.message);
      } else {
        this.toastService.showToast('success', s.message);
        this.uploadAttachmentPreApproval(s.data.lEmpabcenceId);
        if(this.fromattenreport=="Y"){
            this.router.navigate(["/views/report/emp-attendance-report"]);
        } else{
        this.back();
      }}
    })

  }

  uploadAttachmentPreApproval(id) {

    const formData = new FormData();
    formData.append('file', this.preApproval.file);
    this.requestService.fileUploadPreApproval(id, formData).subscribe(s => {
      var success: any = s;
      this.toastService.showToast('success', success.message);
    });

  }


}
