import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularMyDatePickerDirective, IMyDateModel } from 'angular-mydatepicker';
import { CommonService } from 'src/app/views/services/common.service';
import { ToastrService } from 'src/app/views/services/toastr.service';
import { EmprejoiningService } from '../emprejoining.service';

@Component({
  selector: 'app-add-emprejoining',
  templateUrl: './add-emprejoining.component.html',
  styleUrls: ['./add-emprejoining.component.scss']
})
export class AddEmprejoiningComponent implements OnInit {

  emprejoiningForm: FormGroup;
  isView: boolean = false;
  holdingList: any = [];
  companyList: any = [];
  parentUrl: any;
  employeeList: any;
  empLeaveList:any;
  submitted: boolean = false;
  statusList: any = [{ valueCode: 'ACTIVE', valueName: 'Active' }, { valueCode: 'INACTIVE', valueName: 'Inactive' }];
  leaveList:any = [{ valueCode: 1, valueName: 'Leave 1' }, { valueCode:2, valueName: 'Leave 2' }];
  moduleid:any;
  public myDatePickerOptions = this.commonService.datepickerFormat;
  @ViewChild('dp1', {static: false}) myDp1: AngularMyDatePickerDirective;
  @ViewChild('dp2', {static: false}) myDp2: AngularMyDatePickerDirective;
  @ViewChild('dp3', {static: false}) myDp3: AngularMyDatePickerDirective;
  @ViewChild('dp4', {static: false}) myDp4: AngularMyDatePickerDirective;
  
  constructor(private cdr: ChangeDetectorRef,private commonService:CommonService,private toastService: ToastrService, private emprejoiningService: EmprejoiningService, private router: Router, private activatedRoute: ActivatedRoute) {
    this.emprejoiningForm = new FormGroup({
      lEmpleaverejoinId: new FormControl(null),
      lEmpleaveId: new FormControl(null),
      companyId: new FormControl(null),
      holdingId: new FormControl(null),
      isActive: new FormControl(null),
      status: new FormControl(null),
      created: new FormControl(null),
      createdBy: new FormControl(null),
      updated: new FormControl(null),
      updatedBy: new FormControl(null),
      documentno: new FormControl(null),
      datetrx: new FormControl(null),
      datetrx1: new FormControl(null),
      xEmployeeId: new FormControl(null),
      descriptioon: new FormControl(null),
      xLeaveitemId: new FormControl(null),
      startdate: new FormControl(null),
      enddate: new FormControl(null),
      startdate1: new FormControl(null),
      enddate1: new FormControl(null),
      leavedays: new FormControl(null),
      remarks: new FormControl(null),
      rejoindate: new FormControl(null),
      rejoindate1: new FormControl(null),

    });

    this.activatedRoute.queryParams.subscribe(params => {
      this.emprejoiningForm.controls['lEmpleaverejoinId'].setValue(params.id);
      this.isView = params.view;
      this.moduleid = params.moduleid;
    });
  }

  get f() { return this.emprejoiningForm.controls; }
  
  ngOnInit() {
    this.getHoldingList();
    this.getEmployeeList();
    this.getEmpLeaveList();
    if (this.emprejoiningForm.value.lEmpleaverejoinId) {
      this.emprejoiningService.getEmprejoiningDetailsById(this.emprejoiningForm.value.lEmpleaverejoinId).subscribe(s => {
        var success: any = s;

        let trxDate: Date = new Date(success.data.datetrx);
        let txDateModel: IMyDateModel = {isRange: false, singleDate: {jsDate: trxDate}, dateRange: null};
        this.emprejoiningForm.controls['datetrx1'].setValue(txDateModel);
        
        let rejoindate: Date = new Date(success.data.rejoindate);
        let rejoindateModel: IMyDateModel = {isRange: false, singleDate: {jsDate: rejoindate}, dateRange: null};
        this.emprejoiningForm.controls['rejoindate1'].setValue(rejoindateModel);
        
        let startDate: Date = new Date(success.data.startdate);
        let startdateModel: IMyDateModel = {isRange: false, singleDate: {jsDate: startDate}, dateRange: null};
        this.emprejoiningForm.controls['startdate1'].setValue(startdateModel);
        
        let endDate: Date = new Date(success.data.enddate);
        let toModel: IMyDateModel = {isRange: false, singleDate: {jsDate: endDate}, dateRange: null};
        this.emprejoiningForm.controls['enddate1'].setValue(toModel);
        
        this.getCOmpanyById(success.data.holdingId);
        this.emprejoiningForm.patchValue(success.data);
        success.data.isActive == 'Y' ? this.emprejoiningForm.get('status').setValue("ACTIVE") : this.emprejoiningForm.get('status').setValue("INACTIVE");
        if (this.isView) { this.emprejoiningForm.disable(); }
      });
    } else {
      this.emprejoiningForm.controls['status'].setValue('ACTIVE');
      this.emprejoiningForm.get('documentno').setValue("RJ"+Math.floor(1000 + Math.random() * 9000));
    }
  }

  toggleCalendar(): void {
    this.cdr.detectChanges();
    this.myDp1.toggleCalendar();
  }
  changeEffectiveDate(event){
    this.emprejoiningForm.get('rejoindate').setValue(event.singleDate.jsDate);
  }
  changeStartDate(event){
    this.emprejoiningForm.get('startdate').setValue(event.singleDate.jsDate);
  }
  changeEndDate(event){
    this.emprejoiningForm.get('enddate').setValue(event.singleDate.jsDate);
  }

  changeTrxDate(event){
    this.emprejoiningForm.get('datetrx').setValue(event.singleDate.jsDate);
  }


  getCOmpanyById(id) {
    this.emprejoiningService.getCompanyById(id).subscribe(s => {
      this.companyList = s;
    });
  }

  getEmployeeList(){
    let list:any = JSON.parse(sessionStorage.getItem("company"));
    var l:any=[];
    // alert(list.length)
    for(var i=0;i<list.length;i++){
     
    //  if(list[i]!=','){
        l.push(Number(list[i]));
      //}
    }
    this.emprejoiningService.getEmployeeList(this.moduleid,l).subscribe(s=>{
      this.employeeList = s;
    });
  }

  getEmpLeaveList(){
      // alert(sessionStorage.getItem("company"))
      let list:any = JSON.parse(sessionStorage.getItem("company"));
      var l:any=[];
      // alert(list.length)
      for(var i=0;i<list.length;i++){
       
      //  if(list[i]!=','){
          l.push(Number(list[i]));
        //}
      }
    this.emprejoiningService.getEmpLeaveList(l).subscribe(s => {
      this.empLeaveList = s;
    });
  }

  getHoldingList() {
    this.emprejoiningService.getAllHolding().subscribe(s => {
      this.holdingList = s;
      if (this.emprejoiningForm.value.bankId) { } else {
        this.emprejoiningForm.controls['holdingId'].setValue(this.holdingList[0].gHoldingId);
        this.getCOmpanyById(this.holdingList[0].gHoldingId);
      }
    })
  }

  addUpdateEmprejoining() {

    if(this.emprejoiningForm.value.rejoindate==null){
      this.emprejoiningForm.get('rejoindate').setValue(this.emprejoiningForm.value.rejoindate1.singleDate.jsDate);
    }
    if(this.emprejoiningForm.value.startdate==null){
      this.emprejoiningForm.get('startdate').setValue(this.emprejoiningForm.value.startdate1.singleDate.jsDate);
    }

    if(this.emprejoiningForm.value.enddate==null){
      this.emprejoiningForm.get('enddate').setValue(this.emprejoiningForm.value.enddate1.singleDate.jsDate);
    }
    if(this.emprejoiningForm.value.datetrx==null){
      this.emprejoiningForm.get('datetrx').setValue(this.emprejoiningForm.value.datetrx1.singleDate.jsDate);
    }

    this.emprejoiningForm.get('createdBy').setValue(sessionStorage.getItem('userId'));
    this.emprejoiningForm.get('created').setValue(new Date());
    this.emprejoiningForm.get('updatedBy').setValue(sessionStorage.getItem('userId'));
    this.emprejoiningForm.get('updated').setValue(new Date());
    // this.emprejoiningForm.get('documentno').setValue('DOC');
    this.emprejoiningForm.value.status == "ACTIVE" ? this.emprejoiningForm.get('isActive').setValue('Y') : this.emprejoiningForm.get('isActive').setValue('N');
 
    this.submitted = true;
    if (this.emprejoiningForm.invalid) {
      return;
    } else {
      this.emprejoiningService.saveUpdateEmprejoining(this.emprejoiningForm.value).subscribe(success => {
        var s: any = success;
        if(s.code==0){
          this.toastService.showToast('danger', s.message);
        } else{
        this.toastService.showToast('success', s.message);
        this.back();}
      })
    }
  }

  back() {
    this.router.navigate(["/views/transaction/emp-rejoin/emprejoining-summary"]);
  }
}