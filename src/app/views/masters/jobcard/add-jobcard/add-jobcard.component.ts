import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularMyDatePickerDirective, IMyDateModel } from 'angular-mydatepicker';
import { CommonService } from 'src/app/views/services/common.service';
import { ToastrService } from 'src/app/views/services/toastr.service';
import { JobcardService } from '../jobcard.service';

@Component({
  selector: 'app-add-jobcard',
  templateUrl: './add-jobcard.component.html',
  styleUrls: ['./add-jobcard.component.scss']
})
export class AddJobcardComponent implements OnInit {

  jobcardForm: any;
  empjobcardForm:any;
  submitted = false;
  jobcardid:any;
  employeeList: any = [];

  isView: boolean = false;
  companyList: any = [];
  holdingList: any = [];
  jobcardList: any = [];

  selectedItems: Array<any> = [];
  dropdownSettings: any = {};
  moduleid:any;

  public myDatePickerOptions = this.commonService.datepickerFormat;
  @ViewChild('dp2', { static: false }) myDp2: AngularMyDatePickerDirective;

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
    this.jobcardForm.controls['employeeId'].setValue(item.employeeId);
  }
  onSelectAll(items: any) {
    console.log('onSelectAll', items);
  }

  statusList: any = [{ valueCode: 'ACTIVE', valueName: 'Active' }, { valueCode: 'INACTIVE', valueName: 'Inactive' }]

  jobDefinitionList: any = [];
  jobFuntionList: any = [];
  uomList: any = [];

  constructor(private activatedRoute: ActivatedRoute, private toastService: ToastrService,
    private router: Router, private commonService:CommonService,private jobcardService: JobcardService) {
    this.jobcardForm = new FormGroup({
      ljobcardId: new FormControl(null),
      gCompanyId: new FormControl(null, [Validators.required]),
      gHoldingId: new FormControl(null, [Validators.required]),
      isActive: new FormControl(null, [Validators.required]),
      status: new FormControl(null),
      created: new FormControl(null, [Validators.required]),
      createdBy: new FormControl(null, [Validators.required]),
      updated: new FormControl(null, [Validators.required]),
      updatedBy: new FormControl(null, [Validators.required]),
      jobcardNo: new FormControl(null),
      jobdefinationId: new FormControl(null),
      jobfunctionId: new FormControl(null),
      xunitmeasureId: new FormControl(null),
      trxDate: new FormControl(null),
      trxDate1: new FormControl(null),
      tDate: new FormControl(null)
    });

    this.empjobcardForm = new FormGroup({
      ljobcardlineId: new FormControl(null),
      ljobcardId: new FormControl(null),
      gCompanyId: new FormControl(null, [Validators.required]),
      gHoldingId: new FormControl(null, [Validators.required]),
      isActive: new FormControl(null, [Validators.required]),
      status: new FormControl(null),
      created: new FormControl(null, [Validators.required]),
      createdBy: new FormControl(null, [Validators.required]),
      updated: new FormControl(null, [Validators.required]),
      updatedBy: new FormControl(null, [Validators.required]),
      amount: new FormControl(null),
      rate: new FormControl(null),
      achievedQnty: new FormControl(null),
      actQnty: new FormControl(null),
      plannedQnty: new FormControl(null),
      xshiftruleId: new FormControl(null),
      employeeId: new FormControl(null),
      bonusAmount: new FormControl(null),
      empname: new FormControl(null),
      oldEmpId: new FormControl(null),
      empcode: new FormControl(null),
      employee:new FormControl(null)
    });



    this.activatedRoute.queryParams.subscribe(params => {
      this.jobcardid=params.id;
      this.jobcardForm.get('ljobcardId').setValue(params.id);
      this.isView = params.view;
      this.moduleid = params.moduleid;
    });

  }

  get f() { return this.jobcardForm.controls; }

  

  ngOnInit() {
    this.tepMethodemp();
    this.jobcardService.getAllHolding().subscribe(s => {
      this.holdingList = s;
      this.jobcardForm.get('gHoldingId').setValue(this.holdingList[0].gHoldingId);
      this.selectHolding(this.holdingList[0].gHoldingId)
    });

    this.getJobDefinition();
    this.getJobFunction();
    this.getUOM();

    if(this.jobcardid){
      this.getAllCardLineSummaryByCardId(this.jobcardid);
        this.jobcardService.getJobCardDetailsById(this.jobcardid).subscribe(data=>{

          var s:any = data;
          this.jobcardForm.patchValue(s.data);

          let startDate: Date = new Date(s.data.trxDate);
          let fromModel: IMyDateModel = {isRange: false, singleDate: {jsDate: startDate}, dateRange: null};
          this.jobcardForm.controls['trxDate1'].setValue(fromModel);
          

        });
    }

    this.jobcardForm.get('status').setValue('ACTIVE');

  }


  changeTrxDate(event){
    this.jobcardForm.get('trxDate').setValue(event.singleDate.jsDate);
    this.jobcardForm.get('tDate').setValue(this.commonService.dateFormat(event.singleDate.jsDate));
  }

  getJobDefinition() {
    this.jobcardService.jobdefinationDatabase().subscribe(data => {
      this.jobDefinitionList = data;
    })
  }

  getJobFunction() {
    this.jobcardService.getJobFunList().subscribe(data => {
      this.jobFuntionList = data;
    })
  }

  getUOM() {
    this.jobcardService.getUomList().subscribe(data => {
      this.uomList = data;
    })
  }
//*********************************************************************************** Single Select*/
  selectHolding(holdingId) {
    this.jobcardService.getAllCompaniesByHoldingId(holdingId).subscribe(s => {
      this.companyList = this.setCompanyList(s);
    });
  }

  setCompanyList(list) {
    let elm: any = [];
    // alert(JSON.stringify(list))
    list.forEach(element => {
      elm.push({'label': element.name , 'value' : element.gCompanyId});
    });
  
    let unique = [...new Set(elm)];
    return unique;
  }
//*********************************************************************************** */
  plannedQnty:any;
  rate:any;
  
  selectJObDef(id){
    let list = this.jobDefinitionList.filter(el=> el.jobdefinationId==id);
    this.jobcardForm.get('jobfunctionId').setValue(list[0].jobfunctionId);
    this.jobcardForm.get('xunitmeasureId').setValue(list[0].xunitmeasureId);
    this.plannedQnty = list[0].plannedQnty;
    this.rate = list[0].rate;
  }

  addUpdatejobcard() {
    this.jobcardForm.get('createdBy').setValue(Number(sessionStorage.getItem('userId')));
    this.jobcardForm.get('created').setValue(new Date());
    this.jobcardForm.get('updatedBy').setValue(Number(sessionStorage.getItem('userId')));
    // this.jobcardForm.get('gCompanyId').setValue(this.jobcardForm.value.gCompanyId);
    this.jobcardForm.get('jobdefinationId').setValue(Number(this.jobcardForm.value.jobdefinationId));
    this.jobcardForm.get('jobfunctionId').setValue(Number(this.jobcardForm.value.jobfunctionId));
    this.jobcardForm.get('xunitmeasureId').setValue(Number(this.jobcardForm.value.xunitmeasureId));
    if(this.jobcardid){
      this.jobcardForm.get('ljobcardId').setValue(Number(this.jobcardid));
    } else{
      this.jobcardForm.get('ljobcardId').setValue(undefined);
    }
    this.jobcardForm.get('updated').setValue(new Date());
    this.jobcardForm.value.status == "ACTIVE" ? this.jobcardForm.get('isActive').setValue('Y') : this.jobcardForm.get('isActive').setValue('N');
   
    this.submitted = true;
    if (this.jobcardForm.invalid) {
      return;
    } else {
      this.jobcardService.addUpdatejobcard(this.jobcardForm.value).subscribe(success=>{
        var s: any = success;
        if(s.code==0){
          this.toastService.showToast('danger', s.message);
        } else{
        this.jobcardid = s.data.ljobcardId;
        this.jobcardForm.get('jobcardNo').setValue(s.data.jobcardNo)
        this.toastService.showToast('success', s.message);
        this.router.navigate(['/views/masters/jobcard/add-jobcard'],{queryParams:{id:s.data.ljobcardId}});
      }
    });
    }

  }


  back() {
    this.router.navigate(['/views/masters/jobcard/jobcard-summary']);
  }


  // -------------------------------------------------------------------------------

  isempjobcard:boolean=false;
  selectedItemsemp: Array<any> = [];
  dropdownSettingsemp: any = {};
  shiftRuleList:any =[];
  jobcardlinelist:any=[];
  jobcardlineid:any;

  tepMethodemp(){
    this.dropdownSettingsemp = {
        singleSelection: true,
        idField: 'employeeId',
        textField: 'displayName',
        selectAllText: 'Select All',
        unSelectAllText: 'UnSelect All',
        itemsShowLimit: 3,
        allowSearchFilter: true
    };
  }
  
  onItemSelectemp(item: any) {
    this.empjobcardForm.controls['employeeId'].setValue(item.employeeId);
    let list = this.employeeList.filter(e=> e.employeeId==item.employeeId);
    this.empjobcardForm.controls['xshiftruleId'].setValue(list[0].shiftruleId);
  }
  onSelectAllemp(items: any) {
    console.log('onSelectAll', items);
  }
  
  addEmpJobCard(){
      this.empjobcardForm.reset();
      this.selectedItemsemp=[];
      this.getEmpList();
      this.getAllShift();
      this.jobcardlineid = null;

      let list = this.jobDefinitionList.filter(el=> el.jobdefinationId==this.jobcardForm.value.jobdefinationId);
      this.empjobcardForm.get('plannedQnty').setValue(list[0].stdQnty);
      this.empjobcardForm.get('rate').setValue(list[0].rate);

    }

  editEmpJobCard(){
    
    this.getEmpList();
      this.getAllShift();
      if(this.jobcardlineid){
        this.isempjobcard=true;
        this.jobcardService.getjobcardlinebyid(this.jobcardlineid).subscribe(data=>{
              var s:any = data;
              this.empjobcardForm.patchValue(s.data);
        });
      } 
  }

  calAmt(){
    let rate = (typeof this.empjobcardForm.value.rate =='string') ? Number(this.empjobcardForm.value.rate) : this.empjobcardForm.value.rate;
    let actQnty = (typeof this.empjobcardForm.value.actQnty =='string') ? Number(this.empjobcardForm.value.actQnty) : this.empjobcardForm.value.actQnty;
    let bonusBal = (typeof this.empjobcardForm.value.bonusAmount =='string') ?  Number(this.empjobcardForm.value.bonusAmount) : this.empjobcardForm.value.bonusAmount;
    let result = rate * actQnty + bonusBal;
    this.empjobcardForm.get('amount').setValue(result);
  }

  getAllShift(){
    this.jobcardService.getAllShiftRule([this.jobcardForm.value.gCompanyId]).subscribe(data=>{
      this.shiftRuleList=data;
    });
  }

  getEmpList(){
    this.jobcardService.getAllEmployee(this.moduleid,[this.jobcardForm.value.gCompanyId]).subscribe(s=>{
      this.employeeList=s;
      if(this.empjobcardForm.value.ljobcardlineId){
        let list = this.employeeList.filter(item => item.employeeId == this.empjobcardForm.value.employeeId);
       
        this.selectedItemsemp=[{'employeeId':list[0].employeeId,'displayName':list[0].displayName}];
      
      }
    });

  }

  getAllCardLineSummaryByCardId(id){
      this.jobcardService.getAllCardLineSummaryByCardId(id).subscribe(data=>{
          this.jobcardlinelist = data;
      })
  }

  getDataUsingRedioBtn(data){
   this.jobcardlineid = data.ljobcardlineId;
  }

  saveEmployeeJob(){

    this.empjobcardForm.get('createdBy').setValue(Number(sessionStorage.getItem('userId')));
    this.empjobcardForm.get('created').setValue(new Date());
    this.empjobcardForm.get('updatedBy').setValue(Number(sessionStorage.getItem('userId')));
    this.empjobcardForm.get('gCompanyId').setValue(Number(this.jobcardForm.value.gCompanyId));
    this.empjobcardForm.get('gHoldingId').setValue(Number(this.jobcardForm.value.gHoldingId));
    this.empjobcardForm.get('isActive').setValue('Y');
    this.empjobcardForm.get('xshiftruleId').setValue(Number(this.empjobcardForm.value.xshiftruleId));
    this.empjobcardForm.get('rate').setValue(Number(this.empjobcardForm.value.rate));
    this.empjobcardForm.get('xshiftruleId').setValue(Number(this.empjobcardForm.value.xshiftruleId));
    this.empjobcardForm.get('amount').setValue(Number(this.empjobcardForm.value.amount));
    this.empjobcardForm.get('bonusAmount').setValue(Number(this.empjobcardForm.value.bonusAmount));
    this.empjobcardForm.get('ljobcardId').setValue(Number(this.jobcardForm.value.ljobcardId));
    if(this.empjobcardForm.value.ljobcardlineId){
      if(typeof this.empjobcardForm.value.ljobcardlineId ==='string'){
        this.empjobcardForm.get('ljobcardlineId').setValue(Number(this.jobcardForm.value.ljobcardlineId));
      }
     
    } else{
      this.empjobcardForm.get('ljobcardlineId').setValue(undefined);
    }
    this.jobcardService.saveupdateEmpJob(this.empjobcardForm.value).subscribe(data=>{
        var s:any = data;
        this.toastService.showToast('success',s.message);
        this.getAllCardLineSummaryByCardId(this.jobcardid);
        this.isempjobcard = false;

    })

  }


}
