import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularMyDatePickerDirective, IMyDateModel } from 'angular-mydatepicker';
import { CommonService } from 'src/app/views/services/common.service';
import { ToastrService } from 'src/app/views/services/toastr.service';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-personal-docs',
  templateUrl: './personal-docs.component.html',
  styleUrls: ['./personal-docs.component.scss']
})
export class PersonalDocsComponent implements OnInit {
// countryList:any =[];
enableFilter: boolean = false;
personaldocsForm: any;

@Output('parentFun') parentFun: EventEmitter<any> = new EventEmitter();
  
@Input() empId: string;
@Input() companyId: string;
@Input() holdingId: string;
@Input() displayName: string;

pdocid: any;
personalinfosubmitted = false;
maritalstatusList: any;
nationalityList: any;
regionList: any = [];
pDocList: any = [];
cityList: any = [];
emppersonalinfoList: any = [];

isOpenDocs: boolean = false;
@ViewChild('dp1', { static: false }) myDp11: AngularMyDatePickerDirective;
@ViewChild('dp2', { static: false }) myDp12: AngularMyDatePickerDirective;
@ViewChild('dp3', { static: false }) myDp13: AngularMyDatePickerDirective;
@ViewChild('dp4', { static: false }) myDp14: AngularMyDatePickerDirective;
@ViewChild('dp5', { static: false }) myDp15: AngularMyDatePickerDirective;
@ViewChild('dp6', { static: false }) myDp16: AngularMyDatePickerDirective;
@ViewChild('dp7', { static: false }) myDp17: AngularMyDatePickerDirective;
@ViewChild('dp8', { static: false }) myDp18: AngularMyDatePickerDirective;
@ViewChild('dp9', { static: false }) myDp19: AngularMyDatePickerDirective;

public myDatePickerOptions = this.commonService.datepickerFormat;

statusList: any = [{ valueCode: 'ACTIVE', valueName: 'Active' }, { valueCode: 'INACTIVE', valueName: 'Inactive' }];
greetingList: any = [{ valueCode: 1001, valueName: "Mr." }, { valueCode: 1002, valueName: "Mrs." }, { valueCode: 1003, valueName: "Miss" }];
genderList: any = [{ valueCode: "M", valueName: "Male" }, { valueCode: "F", valueName: "Female" }];
divisionList: any = [{ valueCode: 1, valueName: "IT" }, { valueCode: 2, valueName: "Electronic" }];
sectionList: any = [{ valueCode: 1, valueName: "S1" }, { valueCode: 2, valueName: "S2" }];
locationList: any = [{ valueCode: 1, valueName: "Mumbai" }, { valueCode: 2, valueName: "Pune" }];
userList: any = [{ valueCode: 1, valueName: "USR0001" }, { valueCode: 2, valueName: "USR0002" }];
maritalStatusList: any = [{ valueCode: "U", valueName: "Unmarried" }, { valueCode: "M", valueName: "Married" }];
countryList: any = [{ valueCode: 1, valueName: "United Arab Emirates" }];
currentStatusList: any = [{ valueCode: 1, valueName: "Permanent" }];
isview:string;

constructor(private activeRoute: ActivatedRoute,private cdr: ChangeDetectorRef, private toastService: ToastrService, private empService: EmployeeService, private router: Router, public commonService: CommonService) {
  this.personaldocsForm = new FormGroup({
    
    xEmppdocsId: new FormControl(null),
    xEmployeeId: new FormControl(null),
    gCompanyId: new FormControl(null),
    gHoldingId: new FormControl(null),
    empName: new FormControl(null),
    isActive: new FormControl(null),
    status: new FormControl(null),
    created: new FormControl(null),
    createdBy: new FormControl(null),
    updated: new FormControl(null),
    updatedBy: new FormControl(null),
    passportno: new FormControl(null),
    ppbirthplace: new FormControl(null),
    ppplaceissue: new FormControl(null),
    ppdateissue: new FormControl(null),
    ppdateissue1: new FormControl(null),
    ppdateexpiry: new FormControl(null),
    ppdateexpiry1: new FormControl(null,[Validators.required]),
    emiratesidno: new FormControl(null),
    eidcardno: new FormControl(null),
    eiddateexpiry: new FormControl(null),
    eiddateexpiry1: new FormControl(null),
    visano: new FormControl(null),
    visafileno: new FormControl(null),
    visadateissue: new FormControl(null),
    visadateissue1: new FormControl(null),
    visadateexpiry: new FormControl(null),
    visadateexpiry1: new FormControl(null),
    visajobtitle: new FormControl(null),
    labourcardno: new FormControl(null),
    lcdateexpiry: new FormControl(null),
    lcdateexpiry1: new FormControl(null),
    lcpersonalid: new FormControl(null),
    jzidcardno: new FormControl(null),
    jzidateexpiry: new FormControl(null),
    jzidateexpiry1: new FormControl(null),
    medinscardno: new FormControl(null),
    medinsprovname: new FormControl(null),
    medinsdateexpiry: new FormControl(null),
    medinsdateexpiry1: new FormControl(null),
    drivinglicno: new FormControl(null),
    dlntrafficno: new FormControl(null),
    dlnplaceissue: new FormControl(null),
    dlndateissue: new FormControl(null),
    dlndateissue1: new FormControl(null),
    
  });

  this.activeRoute.queryParams.subscribe(params => {
    this.isview =params.view;
  });
}

ngOnInit() {
  this.getEmppersonalinfoList();
  // this.getPDocSummary();
  this.edit();
}

changeppdateissue1(event) {
  this.personaldocsForm.get('ppdateissue').setValue(event.singleDate.jsDate);
}

changeppdateexpiry1(event) {
  this.personaldocsForm.get('ppdateexpiry').setValue(event.singleDate.jsDate);
}

changeeiddateexpiry1(event) {
  this.personaldocsForm.get('eiddateexpiry').setValue(event.singleDate.jsDate);
}

changevisadateissue1(event) {
  this.personaldocsForm.get('visadateissue').setValue(event.singleDate.jsDate);
}

changevisadateexpiry1(event) {
  this.personaldocsForm.get('visadateexpiry').setValue(event.singleDate.jsDate);
}

changelcdateexpiry1(event) {
  this.personaldocsForm.get('lcdateexpiry').setValue(event.singleDate.jsDate);
}

changejzidateexpiry1(event) {
  this.personaldocsForm.get('jzidateexpiry').setValue(event.singleDate.jsDate);
}

changemedinsdateexpiry1(event) {
  this.personaldocsForm.get('medinsdateexpiry').setValue(event.singleDate.jsDate);
}

changedlndateissue1(event) {
  this.personaldocsForm.get('dlndateissue').setValue(event.singleDate.jsDate);
}

getPDocSummary() {
  this.empService.getPDocSummaryByEmpId(this.empId).subscribe(s => {
    this.pDocList = s;
  });
}

nextFun(event) {
  this.parentFun.emit(event);
}

getEmppersonalinfoList() {
  // this.empService.getEmpPersonalinfoList(this.empId).subscribe(success=>{
  //   this.emppersonalinfoList = success;
  // });
}
get pi() { return this.personaldocsForm.controls; };
addUpdateDoc() {
  this.personaldocsForm.get('createdBy').setValue(Number(sessionStorage.getItem("userId")));
  this.personaldocsForm.get('created').setValue(new Date());
  this.personaldocsForm.get('updatedBy').setValue(Number(sessionStorage.getItem("userId")));
  this.personaldocsForm.get('updated').setValue(new Date());
  this.personaldocsForm.get('gCompanyId').setValue(this.companyId);
  this.personaldocsForm.get('gHoldingId').setValue(this.holdingId);
  this.personaldocsForm.get('xEmployeeId').setValue(Number(this.empId));
  if(this.personaldocsForm.value.xEmppdocsId){
    this.personaldocsForm.get('xEmppdocsId').setValue(Number(this.personaldocsForm.value.xEmppdocsId));
  } else{
    this.personaldocsForm.get('xEmppdocsId').setValue(undefined);
  }
  this.personaldocsForm.value.status == 'ACTIVE' ? this.personaldocsForm.get('isActive').setValue('Y') : this.personaldocsForm.get('isActive').setValue('N');
  this.personalinfosubmitted = true;
  if (this.personaldocsForm.invalid) {
    return;
  } else {
    this.empService.addUpdateDoc(this.personaldocsForm.value).subscribe(s=>{
      var success:any = s;
      this.toastService.showToast('success', success.message);
      this.edit();
    });
 }
}

add() {
  this.isOpenDocs = true;
  this.personaldocsForm.get('empName').setValue(this.displayName);
  
    let ppdateexpiry1: Date = new Date(new Date());
    let fromModel2: IMyDateModel = {isRange: false, singleDate: {jsDate: ppdateexpiry1}, dateRange: null};
    this.personaldocsForm.controls['ppdateexpiry1'].setValue(fromModel2);
    this.changeppdateexpiry1(fromModel2);
    
}

edit() {
  this.getEmppersonalinfoList();
 
  if (this.empId) {
     this.isOpenDocs = true;
    this.empService.getPDocById(this.empId).subscribe(s=>{
      var success:any = s;
      this.personaldocsForm.patchValue(success.data);
      this.pdocid=success.data.xEmppdocsId;
        if(success.data.ppdateissue){
        let ppdateissue1: Date = new Date(success.data.ppdateissue);
        let fromModel1: IMyDateModel = {isRange: false, singleDate: {jsDate: ppdateissue1}, dateRange: null};
        this.personaldocsForm.controls['ppdateissue1'].setValue(fromModel1);
        }
        if(success.data.ppdateexpiry){
        let ppdateexpiry1: Date = new Date(success.data.ppdateexpiry);
        let fromModel2: IMyDateModel = {isRange: false, singleDate: {jsDate: ppdateexpiry1}, dateRange: null};
        this.personaldocsForm.controls['ppdateexpiry1'].setValue(fromModel2);
        }
        if(success.data.eiddateexpiry){
        let eiddateexpiry1: Date = new Date(success.data.eiddateexpiry);
        let fromModel3: IMyDateModel = {isRange: false, singleDate: {jsDate: eiddateexpiry1}, dateRange: null};
        this.personaldocsForm.controls['eiddateexpiry1'].setValue(fromModel3);
        }
        if(success.data.visadateissue){
        let visadateissue1: Date = new Date(success.data.visadateissue);
        let fromModel4: IMyDateModel = {isRange: false, singleDate: {jsDate: visadateissue1}, dateRange: null};
        this.personaldocsForm.controls['visadateissue1'].setValue(fromModel4);
        }

        if(success.data.visadateexpiry){
        let visadateexpiry1: Date = new Date(success.data.visadateexpiry);
        let fromModel5: IMyDateModel = {isRange: false, singleDate: {jsDate: visadateexpiry1}, dateRange: null};
        this.personaldocsForm.controls['visadateexpiry1'].setValue(fromModel5);
        }
        if(success.data.lcdateexpiry){
        let lcdateexpiry1: Date = new Date(success.data.lcdateexpiry);
        let fromModel6: IMyDateModel = {isRange: false, singleDate: {jsDate: lcdateexpiry1}, dateRange: null};
        this.personaldocsForm.controls['lcdateexpiry1'].setValue(fromModel6);
        }
        if(success.data.jzidateexpiry){
        let jzidateexpiry1: Date = new Date(success.data.jzidateexpiry);
        let fromModel7: IMyDateModel = {isRange: false, singleDate: {jsDate: jzidateexpiry1}, dateRange: null};
        this.personaldocsForm.controls['jzidateexpiry1'].setValue(fromModel7);
        }
        if(success.data.medinsdateexpiry){
        let medinsdateexpiry1: Date = new Date(success.data.medinsdateexpiry);
        let fromModel8: IMyDateModel = {isRange: false, singleDate: {jsDate: medinsdateexpiry1}, dateRange: null};
        this.personaldocsForm.controls['medinsdateexpiry1'].setValue(fromModel8);
        }
        if(success.data.dlndateissue){
        let dlndateissue1: Date = new Date(success.data.dlndateissue);
        let fromModel9: IMyDateModel = {isRange: false, singleDate: {jsDate: dlndateissue1}, dateRange: null};
        this.personaldocsForm.controls['dlndateissue1'].setValue(fromModel9);
        }

       this.personaldocsForm.controls['empName'].setValue(this.displayName);

      success.data.isActive=='Y' ? this.personaldocsForm.get('status').setValue("ACTIVE") : this.personaldocsForm.get('status').setValue("INACTIVE"); 
      
      if(this.isview=='Y'){ this.personaldocsForm.disable(); }

    },error=>{
      this.add();
    })
  }
}

getDataUsingRedioBtn(data){
    this.pdocid = data.xEmppdocsId;
}




}
