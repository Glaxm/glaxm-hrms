import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularMyDatePickerDirective, IMyDateModel } from 'angular-mydatepicker';
import { CommonService } from 'src/app/views/services/common.service';
import { ExitFormService } from 'src/app/views/transaction/exit-form/exit-form.service';

@Component({
  selector: 'app-exit-request',
  templateUrl: './exit-request.component.html',
  styleUrls: ['./exit-request.component.scss']
})
export class ExitRequestComponent implements OnInit {
  @Output() exitRequest = new EventEmitter;
  @Input() companyId: string;
  @Input() holdingId: string;
  @Input() requestId: string;
  @Input() employeeId: string;
  exitForm: FormGroup;
  isView: boolean = false;
  holdingList: any = [];
  companyList: any = [];
  statusList: any;
  parentUrl: any;
  employeeList: any;
  submitted: boolean = false;

  public myDatePickerOptions = this.commonService.datepickerFormat;
  @ViewChild('dp1', { static: false }) myDp1: AngularMyDatePickerDirective;
  @ViewChild('dp2', { static: false }) myDp2: AngularMyDatePickerDirective;

  
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
    this.employeeList.filter(d => {
      if (d.employeeId == item.employeeId) {
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

  constructor(private commonService: CommonService, private cdr: ChangeDetectorRef,
    private exitFormService: ExitFormService, private router: Router, private activatedRoute: ActivatedRoute) {
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

      lastworkDay: new FormControl(null),
      lastdate: new FormControl(null),
      startdate1: new FormControl(null),
      enddate1: new FormControl(null),
    });

    this.moduleList = JSON.parse(sessionStorage.getItem("moduleList"));
    if (this.moduleList) {
      this.moduleList.map((e) => {
        if (e.moduleGroup == 'Transactions' && e.moduleName == 'EOSB Form') {
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
    this.selectComapny(this.companyId);
    if (this.requestId) {
      this.exitFormService.getEmpeosbById(this.requestId).subscribe(success => {
        var s: any = success;
        // this.selectComapny(s.data.gCompanyId);
        this.selectedItems = [{ 'employeeId': s.data.xEmployeeId, 'displayName': s.data.empname }];
        let startDate: Date = new Date(s.data.joiningDt);
        let fromModel: IMyDateModel = { isRange: false, singleDate: { jsDate: startDate }, dateRange: null };
        this.exitForm.controls['startdate1'].setValue(fromModel);

        let endDate: Date = new Date(s.data.lastworkDay);
        let toModel: IMyDateModel = { isRange: false, singleDate: { jsDate: endDate }, dateRange: null };
        this.exitForm.controls['enddate1'].setValue(toModel);
        this.exitForm.patchValue(s.data);
        this.exitForm.disable();
      });
    } else {
    }

  }

  selectComapny(id) {
    this.selectedItems = [];
    this.getEmployeeList(id);
  }




  getEmployeeList(cmpList) {
    let l: any = [Number(cmpList)]
    this.exitFormService.getEmployeeList(this.moduleid,l).subscribe(s => {

      this.employeeList = s;
      this.exitForm.controls['xEmployeeId'].setValue(this.employeeId);
      if (this.exitForm.value.xEmployeeId) {

        this.employeeList.filter(d => {
          if (d.employeeId == this.employeeId) {
            this.exitForm.controls['designation'].setValue(d.designation);
            this.exitForm.controls['department'].setValue(d.department);
            let startDate: Date = new Date(d.doj);
            let fromModel: IMyDateModel = { isRange: false, singleDate: { jsDate: startDate }, dateRange: null };
            this.exitForm.controls['startdate1'].setValue(fromModel);
            this.changeStartDate(fromModel);
          }
        })


      }
    });
  }




  exitRequestEvent() {
    this.exitForm.get('createdBy').setValue(Number(sessionStorage.getItem('userId')));
    this.exitForm.get('created').setValue(new Date());
    this.exitForm.get('updatedBy').setValue(Number(sessionStorage.getItem('userId')));
    this.exitForm.get('updated').setValue(new Date());
    this.exitForm.get('xEmployeeId').setValue(Number(this.exitForm.value.xEmployeeId));
    this.exitForm.get('gHoldingId').setValue(Number(this.holdingId));
    this.exitForm.get('gCompanyId').setValue(Number(this.companyId));
    this.exitForm.get('isActive').setValue('Y');
    // this.submitted = true;
    // if (this.exitForm.invalid) {
    //   return;
    // } else {

    this.exitRequest.emit(this.exitForm.value);
    // }
  }


}
