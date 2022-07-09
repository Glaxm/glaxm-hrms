import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularMyDatePickerDirective, IMyDateModel } from 'angular-mydatepicker';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { CommonService } from 'src/app/views/services/common.service';
import { ToastrService } from 'src/app/views/services/toastr.service';
import { MonthyearService } from '../monthyear.service';

@Component({
  selector: 'app-add-monthyear',
  templateUrl: './add-monthyear.component.html',
  styleUrls: ['./add-monthyear.component.scss']
})
export class AddMonthyearComponent implements OnInit {
  monthyearForm: FormGroup;
  isView: boolean = false;
  holdingList: any = [];
  companyList: any = [];
  parentUrl: any;
  submitted: boolean = false;
  statusList: any = [{ valueCode: 'ACTIVE', valueName: 'Active' }, { valueCode: 'INACTIVE', valueName: 'Inactive' }]
  yesnoList: any = [{ valueCode: 'Y', valueName: 'Yes' }, { valueCode: 'N', valueName: 'No' }]
  moduleId:any;
  public myDatePickerOptions = this.commonService.datepickerFormat;
  @ViewChild('dp1', { static: false }) myDp1: AngularMyDatePickerDirective;
  @ViewChild('dp2', { static: false }) myDp2: AngularMyDatePickerDirective;

  obj = { companyId: null }
  constructor(private commonService: CommonService, private cdr: ChangeDetectorRef,
    private toastService: ToastrService, private monthyearService: MonthyearService, private router: Router, private activatedRoute: ActivatedRoute
  ) {
    this.monthyearForm = new FormGroup({
      monthId: new FormControl(null),
      holdingId: new FormControl(null, [Validators.required]),
      isActive: new FormControl(null, [Validators.required]),
      status: new FormControl(null),
      created: new FormControl(null),
      createdBy: new FormControl(null),
      updated: new FormControl(null),
      updatedBy: new FormControl(null),
      description: new FormControl(null),
      code: new FormControl(null),
      stdate: new FormControl(null),
      endate: new FormControl(null),
      monthNo: new FormControl(null, [Validators.required]),
      yearId: new FormControl(null, [Validators.required]),
      name: new FormControl(null, [Validators.required]),
      startDate: new FormControl(null),
      startdate1: new FormControl(null, [Validators.required]),
      enddate1: new FormControl(null, [Validators.required]),
      endDate: new FormControl(null),
      financialYear: new FormControl(null, [Validators.required]),
      company: new FormControl(null),
      closedforProc: new FormControl(null),
      closedforProcupdated: new FormControl(null)
    });
    this.activatedRoute.queryParams.subscribe(params => {
      this.monthyearForm.controls['monthId'].setValue(params.id);
      this.isView = params.view;
      this.moduleId=  params.moduleId;
    });
  }
  get f() { return this.monthyearForm.controls; }

  ngOnInit() {
    this.getHoldingList();
    this.companySetting();
    if (this.monthyearForm.value.monthId) {
      this.monthyearService.getMonthyearDetailsById(this.monthyearForm.value.monthId).subscribe(s => {
        var success: any = s;
        
        this.monthyearForm.patchValue(success.data);
       
        this.obj.companyId = success.data.closedforProc;
        this.getCOmpanyById(success.data.holdingId);
        this.monthyearForm.controls['closedforProc'].setValue(success.data.closedforProc);
        let startDate: Date = new Date(success.data.startDate);
        let fromModel: IMyDateModel = { isRange: false, singleDate: { jsDate: startDate }, dateRange: null };
        this.monthyearForm.controls['startdate1'].setValue(fromModel);

        let endDate: Date = new Date(success.data.endDate);
        let toModel: IMyDateModel = { isRange: false, singleDate: { jsDate: endDate }, dateRange: null };
        this.monthyearForm.controls['enddate1'].setValue(toModel);

        success.data.isActive == 'Y' ? this.monthyearForm.get('status').setValue("ACTIVE") : this.monthyearForm.get('status').setValue("INACTIVE");
        if (this.isView) { this.monthyearForm.disable(); }
      });
    } else {
      this.monthyearForm.controls['status'].setValue('ACTIVE');
    }
  }
  getCOmpanyById(id) {
    this.monthyearService.getCompanyById(id,this.moduleId).subscribe(s => {
      this.companyList = s;
      if(this.monthyearForm.value.monthId){
        this.selectedCompanyList = this.companyList.filter(o1 => this.obj.companyId.some(o2 => o1.gCompanyId === o2));
      }
    });
  }
  getHoldingList() {
    this.monthyearService.getAllHolding().subscribe(s => {
      this.holdingList = s;
      if (this.monthyearForm.value.bankId) { } else {
        this.monthyearForm.controls['holdingId'].setValue(this.holdingList[0].gHoldingId);
        this.getCOmpanyById(this.holdingList[0].gHoldingId);
      }
    })
  }

  toggleCalendar(): void {
    this.cdr.detectChanges();
    this.myDp1.toggleCalendar();
  }
  changeStartDate(event) {
    this.monthyearForm.get('startDate').setValue(event.singleDate.jsDate);
    this.monthyearForm.get('stdate').setValue(this.commonService.dateFormat(event.singleDate.jsDate));
  }
  changeEndDate(event) {
    this.monthyearForm.get('endDate').setValue(event.singleDate.jsDate);
    this.monthyearForm.get('endate').setValue(this.commonService.dateFormat(event.singleDate.jsDate));
  }

  setCompanyList(list) {
    let elm: any = [];
    list.forEach(element => {
      elm.push(element.gCompanyId);
    });
    let unique = [...new Set(elm)];
    return unique;
  }

  addUpdateMonthyear() {
    // if(this.monthyearForm.value.startDate==null && this.monthyearForm.value.startdate1){
    //   this.monthyearForm.get('startDate').setValue(this.monthyearForm.value.startdate1.singleDate.jsDate);
    //   this.monthyearForm.get('stdate').setValue(this.monthyearForm.value.startdate1.singleDate.formatted);
    // }
    // if(this.monthyearForm.value.endDate==null && this.monthyearForm.value.enddate1){
    //   this.monthyearForm.get('endDate').setValue(this.monthyearForm.value.enddate1.singleDate.jsDate);
    //   this.monthyearForm.get('endate').setValue(this.monthyearForm.value.enddate1.singleDate.formatted);
    // }
    this.monthyearForm.get('createdBy').setValue(Number(sessionStorage.getItem('userId')));
    this.monthyearForm.get('created').setValue(new Date());
    this.monthyearForm.get('updatedBy').setValue(Number(sessionStorage.getItem('userId')));
    this.monthyearForm.get('updated').setValue(new Date());
    this.monthyearForm.get('yearId').setValue(Number(this.monthyearForm.value.yearId));
    this.monthyearForm.get('monthNo').setValue(Number(this.monthyearForm.value.monthNo));

    let compList: any = this.setCompanyList(this.selectedCompanyList)
    this.monthyearForm.controls['closedforProcupdated'].setValue(compList);
    
    this.monthyearForm.controls['closedforProc'].setValue(compList);
    this.monthyearForm.value.status == "ACTIVE" ? this.monthyearForm.get('isActive').setValue('Y') : this.monthyearForm.get('isActive').setValue('N');
    this.submitted = true;
    if (this.monthyearForm.invalid) {
      return;
    } else {
      this.monthyearService.saveUpdateMonthyear(this.monthyearForm.value).subscribe(success => {
        var s: any = success;
        if (s.code == 0) {
          this.toastService.showToast('danger', s.message);
        } else {
          this.toastService.showToast('success', s.message);
          this.back();
        }
      })
    }
  }
  back() {
    this.router.navigate(["/views/masters/monthyear/monthyear-summary"]);
  }
  //================================================ Multiselect Company list

  selectedCompanyList = [];
  dropdownSettings: IDropdownSettings;

  companySetting() {
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'gCompanyId',
      textField: 'name',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };
  }

  onCompnaySelect(item: any) {
    this.selectedCompanyList.push(item);
  }

  onCompanyDeSelect(items: any) {
    this.selectedCompanyList = this.selectedCompanyList.filter(item => item.gCompanyId !== items.gCompanyId);
  }

  onSelectAllCompnay(items: any) {
    this.selectedCompanyList = [];
    this.selectedCompanyList.push(...[items]);
  }

}
