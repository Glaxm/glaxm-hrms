import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularMyDatePickerDirective, IMyDateModel } from 'angular-mydatepicker';
import { CommonService } from '../../services/common.service';
import { ToastrService } from '../../services/toastr.service';
import { EmpLeaveService } from '../emp-leave/emp-leave.service';
import { ExitFormService } from './exit-form.service';

@Component({
  selector: 'app-exit-form',
  templateUrl: './exit-form.component.html',
  styleUrls: ['./exit-form.component.scss']
})
export class ExitFormComponent implements OnInit {

  exitForm: FormGroup;
  isView: boolean = false;
  holdingList: any = [];
  companyList: any = [];
  statusList: any;
  parentUrl: any;
  employeeList: any;
  submitted: boolean = false;
  moduleid:any;
  public myDatePickerOptions = this.commonService.datepickerFormat;
  @ViewChild('dp1', { static: false }) myDp1: AngularMyDatePickerDirective;
  @ViewChild('dp2', { static: false }) myDp2: AngularMyDatePickerDirective;

  selectedItems: Array<any> = [];
  dropdownSettings: any = {};

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
   
    this.exitForm.controls['xEmployeeId'].setValue(item.employeeId);
    this.employeeList.filter(d=>{
        if(d.employeeId==item.employeeId){
          this.exitForm.controls['designation'].setValue(d.designation);
          this.exitForm.controls['department'].setValue(d.department);
          
          let startDate: Date = new Date(d.doj);
          let fromModel: IMyDateModel = { isRange: false, singleDate: { jsDate: startDate }, dateRange: null };
          this.exitForm.controls['startdate1'].setValue(fromModel);
          this.changeStartDate(fromModel);
        }
    })
    
  }
  onSelectAll(items: any) {
    console.log('onSelectAll', items);
  }

  reasonofExitList:any=[{id:1,name:'Transfer'},{id:2,name:'Voluntary'},{id:3,name:'Involuntary'}];

  constructor(private toastService: ToastrService, private commonService: CommonService, private cdr: ChangeDetectorRef, private exitFormService: ExitFormService, private router: Router, private activatedRoute: ActivatedRoute) {
    this.exitForm = new FormGroup({

      reason: new FormControl(null),
      lastworkingday: new FormControl(null),
      joiningDt: new FormControl(null),
      lEmpeosbId: new FormControl(null),
      documentno: new FormControl(null),
      designation: new FormControl(null),
      department: new FormControl(null),
      gCompanyId: new FormControl(null),
      gHoldingId: new FormControl(null),
      isActive: new FormControl(null),
      created: new FormControl(null),
      createdBy: new FormControl(null),
      updated: new FormControl(null),
      employee: new FormControl(null),
      updatedBy: new FormControl(null),
      xEmployeeId: new FormControl(null),
      lsexitRsnId: new FormControl(null),
      desc: new FormControl(null),
      lastworkDay: new FormControl(null),
      lastdate: new FormControl(null),
      startdate1: new FormControl(null),
      enddate1: new FormControl(null),
    });

    this.activatedRoute.queryParams.subscribe(params => {
      this.exitForm.controls['lEmpeosbId'].setValue(params.id);
      this.isView = params.view;
      this.moduleid = params.moduleid;
    });
  }

  toggleCalendar(): void {
    this.cdr.detectChanges();
    this.myDp1.toggleCalendar();
  }

  changeStartDate(event) {
    this.exitForm.get('joiningDt').setValue(event.singleDate.jsDate);
  }
  changeEndDate(event) {
    this.exitForm.get('lastworkDay').setValue(event.singleDate.jsDate);
    this.exitForm.get('lastdate').setValue(this.commonService.dateFormat(event.singleDate.jsDate));
  }

  get f() { return this.exitForm.controls; }

  ngOnInit() {
    this.tepMethod();
    this.getHoldingList();
  

    if (this.exitForm.value.lEmpeosbId) {
      this.exitFormService.getEOSbById(this.exitForm.value.lEmpeosbId).subscribe(success => {
        var s: any = success;
        this.selectComapny(s.data.gCompanyId);
        
          this.selectedItems = [{ 'employeeId': s.data.xEmployeeId, 'displayName': s.data.empname }];
       
        let startDate: Date = new Date(s.data.joiningDt);
        let fromModel: IMyDateModel = { isRange: false, singleDate: { jsDate: startDate }, dateRange: null };
        this.exitForm.controls['startdate1'].setValue(fromModel);

        let endDate: Date = new Date(s.data.lastworkDay);
        let toModel: IMyDateModel = { isRange: false, singleDate: { jsDate: endDate }, dateRange: null };
        this.exitForm.controls['enddate1'].setValue(toModel);
        this.getCOmpanyById(s.data.gHoldingId);
        this.exitForm.patchValue(s.data);
        if (this.isView) { this.exitForm.disable(); }
      });
    } else {
    }

  }

  getCOmpanyById(id) {
    this.exitFormService.getCompanyById(id).subscribe(s => {
      this.companyList = s;
      if (this.companyList) {
        let list: any = JSON.parse(sessionStorage.getItem("company"));
        var l: any = [];
        for (var i = 0; i < list.length; i++) {
         // if (list[i] != ',') {
            l.push(Number(list[i]));
          // }
        }
        this.companyList = this.companyList.filter(o1 => l.some(o2 => o1.gCompanyId === o2));
      }
    });
  }

  getHoldingList() {
    this.exitFormService.getAllHolding().subscribe(s => {
      this.holdingList = s;
      if (this.exitForm.value.bankId) { } else {
        this.exitForm.controls['gHoldingId'].setValue(this.holdingList[0].gHoldingId);
        this.getCOmpanyById(this.holdingList[0].gHoldingId);
      }
    })
  }

  selectComapny(id){
    this.selectedItems=[];
    this.getEmployeeList(id);
  }

  getEmployeeList(cmpList) {
    let l:any = [Number(cmpList)]
    this.exitFormService.getEmployeeList(this.moduleid,l).subscribe(s => {
      this.employeeList = s;
      if (this.exitForm.value.lEmpeosbId && this.exitForm.value.xEmployeeId) {
        let list = this.employeeList.filter(item => item.employeeId == this.exitForm.value.xEmployeeId);
       
      }
    });
  }

  addUpdateExitEmpployee() {
    this.exitForm.get('xEmployeeId').setValue(Number(this.exitForm.value.xEmployeeId));
    this.exitForm.get('createdBy').setValue(Number(sessionStorage.getItem('userId')));
    this.exitForm.get('created').setValue(new Date());
    this.exitForm.get('updatedBy').setValue(Number(sessionStorage.getItem('userId')));
    this.exitForm.get('updated').setValue(new Date());
    this.exitForm.get('gCompanyId').setValue(Number(this.exitForm.value.gCompanyId));
    this.exitForm.get('isActive').setValue('Y');
    this.exitForm.get('lsexitRsnId').setValue(this.exitForm.value.lsexitRsnId);
    if(this.exitForm.value.lEmpeosbId){
      this.exitForm.get('lEmpeosbId').setValue(Number(this.exitForm.value.lEmpeosbId));
    } else{
      this.exitForm.get('lEmpeosbId').setValue(undefined);
    }
    this.submitted = true;
    if (this.exitForm.invalid) {
      return;
    } else {
      this.exitFormService.addUpdateExitEmpployee(this.exitForm.value).subscribe(success => {
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
    this.router.navigate(["/views/transaction/exitemp/exit-form-summary"]);
  }

}
