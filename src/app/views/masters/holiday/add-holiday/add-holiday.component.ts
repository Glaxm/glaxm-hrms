import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { AngularMyDatePickerDirective, IMyDateModel } from 'angular-mydatepicker';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'src/app/views/services/toastr.service';
import { CommonService } from 'src/app/views/services/common.service';
import { HolidayService } from '../holiday.service';
import { FormBuilder, FormControl, Validators, FormGroup } from '@angular/forms';
import { IDropdownSettings } from 'ng-multiselect-dropdown';

@Component({
  selector: 'app-add-holiday',
  templateUrl: './add-holiday.component.html',
  styleUrls: ['./add-holiday.component.scss']
})
export class AddHolidayComponent implements OnInit {

  public myDatePickerOptions = this.commonService.datepickerFormat;
  @ViewChild('dp1', {static: false}) myDp1: AngularMyDatePickerDirective;
  @ViewChild('dp2', {static: false}) myDp2: AngularMyDatePickerDirective;

  holidayForm: FormGroup;
  submitted = false;
  isView: boolean = false;
  holdingList: any = [];
  companyList: any = [];
  obj={ companyId:null }
  statusList: any = [{ valueCode: 'ACTIVE', valueName: 'Active' }, { valueCode: 'INACTIVE', valueName: 'Inactive' }]
  constructor(private commonService:CommonService,private toastService: ToastrService, private cdr: ChangeDetectorRef,private activatedRoute: ActivatedRoute, private holidayService: HolidayService, private router: Router) {
    this.holidayForm = new FormGroup({
      holidayId: new FormControl(null),
      companyId: new FormControl(null, [Validators.required]),
      holdingId: new FormControl(null, [Validators.required]),
      isActive: new FormControl(null),
      status: new FormControl(null),
      created: new FormControl(null),
      stdate: new FormControl(null),
      createdBy: new FormControl(null),
      updated: new FormControl(null),
      updatedBy: new FormControl(null),
      dateHoliday: new FormControl(null),
      company: new FormControl(null),
      startDate1: new FormControl(null),
      endDate1:new FormControl(null),
      endDate:new FormControl(null),
      startDate:new FormControl(null),
      endate:new FormControl(null),
      code: new FormControl(null),
      name: new FormControl(null, [Validators.required]),
      isnationaloff:new FormControl(null),
      isnationaloff1:new FormControl(null),
    });

    this.activatedRoute.queryParams.subscribe(params => {
      this.holidayForm.controls['holidayId'].setValue(params.id);
      this.isView = params.view;
    });
  }

  ngOnInit() {
    this.getHoldingList();
    this.companySetting();
    if (this.holidayForm.value.holidayId) {
      this.holidayService.getHolidayById(this.holidayForm.value.holidayId).subscribe(success => {
        var s: any = success;
        this.holidayForm.patchValue(s.data);
        this.obj.companyId = s.data.companyId;


        s.data.isnationaloff=='Y' ?  this.holidayForm.get('isnationaloff1').setValue(true) : this.holidayForm.get('isnationaloff1').setValue(false);

        let startDate: Date = new Date(s.data.startDate);
        let fromModel: IMyDateModel = {isRange: false, singleDate: {jsDate: startDate}, dateRange: null};
        this.holidayForm.controls['startDate1'].setValue(fromModel);
       

        let endDate: Date = new Date(s.data.endDate);
        let fromModel1: IMyDateModel = {isRange: false, singleDate: {jsDate: endDate}, dateRange: null};
        this.holidayForm.controls['endDate1'].setValue(fromModel1);
       
        this.getCompanyListByHoldingId(s.data.holdingId);
        s.data.isActive == 'Y' ? this.holidayForm.get('status').setValue("ACTIVE") : this.holidayForm.get('status').setValue("INACTIVE");
        if (this.isView) { this.holidayForm.disable(); }
      });
    } else {
      this.holidayForm.get('isnationaloff1').setValue(true);
      this.holidayForm.get('status').setValue("ACTIVE");
    }
  }

  get f() { return this.holidayForm.controls; }

  toggleCalendar(): void {
    this.cdr.detectChanges();
    this.myDp1.toggleCalendar();
  }
  changeStartDate(event){
    this.holidayForm.get('startDate').setValue(event.singleDate.jsDate);
  }

  changeEndDate(event){
    this.holidayForm.get('endDate').setValue(event.singleDate.jsDate);
  }

  getCompanyListByHoldingId(holdinId) {
    this.holidayService.getCompanyListByHoldingId(holdinId).subscribe(s => {
      this.companyList = s;
      if(this.companyList){
        let list:any = JSON.parse(sessionStorage.getItem("company"));
        var l:any=[];
        if(list){
        for(var i=0;i<list.length;i++){
            l.push(Number(list[i]));
        }}
      
      this.companyList = this.companyList.filter(o1 => l.some(o2 => o1.gCompanyId === o2));
    }
      if(this.holidayForm.value.holidayId){
        this.selectedCompanyList = this.companyList.filter(o1 => this.obj.companyId.some(o2 => o1.gCompanyId === o2));
      }
    });
  }

  getHoldingList() {
    this.holidayService.getHoldingList().subscribe(s => {
      this.holdingList = s;
      this.holidayForm.get('holdingId').setValue(this.holdingList[0].gHoldingId);
      this.getCompanyListByHoldingId(this.holdingList[0].gHoldingId) 

    });
  }

  setCompanyList(list) {
    let elm: any = [];
    list.forEach(element => {
      elm.push(element.gCompanyId);
    });
    let unique = [...new Set(elm)];
    return unique;
  }


  addUpdateHoliday() {

    if(this.holidayForm.value.startDate1){
      this.holidayForm.get('stdate').setValue(this.commonService.dateFormat(this.holidayForm.value.startDate1.singleDate.jsDate));
    }
    if(this.holidayForm.value.endDate1){
      this.holidayForm.get('endate').setValue(this.commonService.dateFormat(this.holidayForm.value.endDate1.singleDate.jsDate));
    }
  
    this.holidayForm.get('createdBy').setValue(Number(sessionStorage.getItem('userId')));
    this.holidayForm.get('created').setValue(new Date());
    this.holidayForm.get('updatedBy').setValue(Number(sessionStorage.getItem('userId')));
    this.holidayForm.get('updated').setValue(new Date());

    this.holidayForm.get('companyId').setValue(Number(this.holidayForm.value.companyId));
    this.holidayForm.value.isnationaloff1 ?  this.holidayForm.get('isnationaloff').setValue('Y') : this.holidayForm.get('isnationaloff').setValue('N');
    let compList: any = this.setCompanyList(this.selectedCompanyList)
    this.holidayForm.controls['companyId'].setValue(compList);

    this.holidayForm.value.status == "ACTIVE" ? this.holidayForm.get('isActive').setValue('Y') : this.holidayForm.get('isActive').setValue('N');

    this.submitted = true;
    if (this.holidayForm.invalid) {
      return;
    } else {
      this.holidayService.addUpdateHoliday(this.holidayForm.value).subscribe(success => {
        var s: any = success;
        if(s.code==0){
          this.toastService.showToast('danger', s.message);
        } else{
        this.toastService.showToast('success', s.message);
        this.back();}
      });
    }
  }

  back() {
    // if (this.parentUrl) {
    //   this.router.navigate([this.parentUrl]);
    // } else {
    this.router.navigate(["/views/masters/holiday/holiday-summary"]);
    // }
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
