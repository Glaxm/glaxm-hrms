import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularMyDatePickerDirective, IMyDateModel } from 'angular-mydatepicker';
import { CommonService, GeneralListCode } from 'src/app/views/services/common.service';
import { ToastrService } from 'src/app/views/services/toastr.service';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-personalinfo',
  templateUrl: './personalinfo.component.html',
  styleUrls: ['./personalinfo.component.scss']
})
export class PersonalinfoComponent implements OnInit {

  // countryList:any =[];
  enableFilter: boolean = false;
  personalinfoForm: any;
  emppinfoid: any;

  @Output('parentFun') parentFun: EventEmitter<any> = new EventEmitter();

  @Input() empId: string;
  @Input() companyId: string;
  @Input() holdingId: string;
  @Input() displayName: string;
  @Input() dob: string;

  personalinfoId: any;
  personalinfosubmitted = false;
  maritalstatusList: any;
  nationalityList: any;
  regionList: any = [];
  religionList: any = [];
  cityList: any = [];
  emppersonalinfoList: any = [];

  isOpen: boolean = false;
  @ViewChild('dp1', { static: false }) myDp11: AngularMyDatePickerDirective;
  public myDatePickerOptions = this.commonService.datepickerFormat;

  statusList: any = [{ valueCode: 'ACTIVE', valueName: 'Active' }, { valueCode: 'INACTIVE', valueName: 'Inactive' }];
  greetingList: any = [{ valueCode: 1001, valueName: "Mr." }, { valueCode: 1002, valueName: "Mrs." }, { valueCode: 1003, valueName: "Miss" }];
  genderList: any = [{ valueCode: "M", valueName: "Male" }, { valueCode: "F", valueName: "Female" }];
  divisionList: any = [{ valueCode: 1, valueName: "IT" }, { valueCode: 2, valueName: "Electronic" }];
  sectionList: any = [{ valueCode: 1, valueName: "S1" }, { valueCode: 2, valueName: "S2" }];
  locationList: any = [{ valueCode: 1, valueName: "Mumbai" }, { valueCode: 2, valueName: "Pune" }];
  userList: any = [{ valueCode: 1, valueName: "USR0001" }, { valueCode: 2, valueName: "USR0002" }];
  // maritalStatusList: any = [{ valueCode: 1, valueName: "Unmarried" }, { valueCode: 2, valueName: "Married" }];
  maritalStatusList: any = [];
  // countryList: any = [{ valueCode: 1, valueName: "United Arab Emirates" }];
  countryList: any = [];
  currentStatusList: any = [{ valueCode: 1, valueName: "Permanent" }];

  chatform: any;
  isview: string;

  constructor(private cdr: ChangeDetectorRef, private activeRoute: ActivatedRoute, private toastService: ToastrService, private empService: EmployeeService, private router: Router, public commonService: CommonService) {
    this.personalinfoForm = new FormGroup({
      xEmppinfoId: new FormControl(null),
      xEmployeeId: new FormControl(null),
      gCompanyId: new FormControl(null),
      gHoldingId: new FormControl(null),
      status: new FormControl(null),
      isActive: new FormControl(null),
      created: new FormControl(null),
      createdBy: new FormControl(null),
      updated: new FormControl(null),
      updatedBy: new FormControl(null),
      dateofbirth: new FormControl(null),
      dateofbirth1: new FormControl(null),
      empName: new FormControl(null),
      empage: new FormControl(null),
      lmaritalstatus: new FormControl(null),
      lnationality: new FormControl(null),
      xReligionId: new FormControl(null),
      fathername: new FormControl(null),
      mothername: new FormControl(null),
      spousename: new FormControl(null),
      homecontele: new FormControl(null),
      homeconaddr: new FormControl(null),
      localtele: new FormControl(null),
      localaddr: new FormControl(null),
      relativename: new FormControl(null),
      relativetele: new FormControl(null),
      relativeaddr: new FormControl(null),
      friendname: new FormControl(null),
      friendtele: new FormControl(null),
      friendaddr: new FormControl(null),
      emrglocaltele: new FormControl(null),

      emrgconthometele: new FormControl(null),

      whatsappNo: new FormControl(null),
      linkedIn: new FormControl(null),
      wechatNo: new FormControl(null),
      viberNo: new FormControl(null),
      emrgcontactName: new FormControl(null),
    });

    this.chatform = new FormGroup({
      xEmployeeId: new FormControl(null),
      createdBy: new FormControl(null),
      gHoldingId: new FormControl(null),
      created: new FormControl(null),
      gCompanyId: new FormControl(null),
      isActive: new FormControl(null),
      updated: new FormControl(null),
      updatedBy: new FormControl(null),
      lsempchatnameId: new FormControl(null),
      empchatID: new FormControl(null),
      lEmpchatId: new FormControl(null),
    });

    this.activeRoute.queryParams.subscribe(params => {
      this.isview = params.view;
    });
  }

  ngOnInit() {
    this.getEmppersonalinfoList();
    this.getReligionList(this.companyId);
    this.getMaritalstatusList();
    this.getCountryList();
    this.edit();

  }
  getMaritalstatusList() {
    this.commonService.getGeneralListByCode(GeneralListCode.MARITALL_STATUS_LIST).subscribe(data => {
      this.maritalstatusList = data;
    })
  }

  getCountryList() {
    this.commonService.getGeneralListByCode(GeneralListCode.NATIONALITY_LIST).subscribe(data => {
      this.countryList = data;
    })
  }
  getReligionList(companyId) {
    this.empService.getReligionList([typeof companyId == 'number' ? companyId : Number(companyId)]).subscribe(s => {
      this.religionList = s;
    });
  }

  changeDateofbirth(event) {
    this.personalinfoForm.get('dateofbirth').setValue(event.singleDate.jsDate);
    this.setAge(this.personalinfoForm.value.dateofbirth);
  }

  getEmppersonalinfoList() {
    this.empService.getEmpPersonalinfoList(this.empId).subscribe(success => {
      this.emppersonalinfoList = success;
    });
  }
  get pi() { return this.personalinfoForm.controls; };
  addUpdatePInfo() {

    if (this.personalinfoForm.value.dateofbirth == null && this.personalinfoForm.value.dateofbirth1) {
      this.personalinfoForm.get('dateofbirth').setValue(this.personalinfoForm.value.dateofbirth1.singleDate.jsDate);
    }

    if (this.personalinfoForm.value.xEmppinfoId) {
      this.personalinfoForm.get('xEmppinfoId').setValue(Number(this.personalinfoForm.value.xEmppinfoId));
    } else { this.personalinfoForm.get('xEmppinfoId').setValue(undefined); }

    if (this.personalinfoForm.value.empage) {
      this.personalinfoForm.get('empage').setValue(Number(this.personalinfoForm.value.empage));
    } else { this.personalinfoForm.get('empage').setValue(null); }

    if (this.personalinfoForm.value.lmaritalstatus) {
      this.personalinfoForm.get('lmaritalstatus').setValue(Number(this.personalinfoForm.value.lmaritalstatus));
    } else { this.personalinfoForm.get('lmaritalstatus').setValue(null); }

    if (this.personalinfoForm.value.lnationality) {
      this.personalinfoForm.get('lnationality').setValue(Number(this.personalinfoForm.value.lnationality));
    } else { this.personalinfoForm.get('lnationality').setValue(null); }

    if (this.personalinfoForm.value.xReligionId) {
      this.personalinfoForm.get('xReligionId').setValue(Number(this.personalinfoForm.value.xReligionId));
    } else { this.personalinfoForm.get('xReligionId').setValue(null); }

    this.personalinfoForm.get('createdBy').setValue(Number(sessionStorage.getItem("userId")));
    this.personalinfoForm.get('created').setValue(new Date());
    this.personalinfoForm.get('updatedBy').setValue(Number(sessionStorage.getItem("userId")));
    this.personalinfoForm.get('updated').setValue(new Date());
    this.personalinfoForm.get('gCompanyId').setValue(Number(this.companyId));
    this.personalinfoForm.get('gHoldingId').setValue(Number(this.holdingId));
    this.personalinfoForm.get('xEmployeeId').setValue(Number(this.empId));
    this.personalinfoForm.value.status == 'ACTIVE' ? this.personalinfoForm.get('isActive').setValue('Y') : this.personalinfoForm.get('isActive').setValue('N');

    this.personalinfosubmitted = true;
    if (this.personalinfoForm.invalid) {
      return;
    } else {
      this.empService.addUpdatePInfo(this.personalinfoForm.value).subscribe(s => {
        var success: any = s;
        this.toastService.showToast('success', success.message);
        this.edit();
      });
    }
  }

  nextFun(event) {
    this.parentFun.emit(event);
  }

  add() {
    this.personalinfoForm.reset();
    this.isOpen = true;
    this.personalinfoForm.get('empName').setValue(this.displayName);

    let dateOfBirth: Date = new Date(this.dob);
    let fromModel1: IMyDateModel = { isRange: false, singleDate: { jsDate: dateOfBirth }, dateRange: null };
    this.personalinfoForm.controls['dateofbirth1'].setValue(fromModel1);
    this.setAge(fromModel1.singleDate.jsDate);
  }

  setAge(dob) {
    // const millis = Date.now() - Date.parse(dob);
    // let count = new Date(millis).getFullYear() - 1970;
    // count = count != 0 && count < 0 ? 0 : count;

    var diff = Date.now() - Date.parse(dob);
    var age = new Date(new Date("0000-01-01").getTime() + diff);
    var years = age.getFullYear();
    var months = age.getMonth();
    var days = age.getDate();
    console.log(years, "years", months, "months", days - 1, "days")
    let str = years + " " + 'Years' + ", " + months + " " + 'Months' + ", " + (days - 1) + " " + 'days';
    this.personalinfoForm.get('empage').setValue(str);
  }


  edit() {
    if (this.empId) {
      this.getAllFamilyDetailsByEmpId();
      this.empService.getPersonalinfoById(this.empId).subscribe(s => {
        var success: any = s;
        this.personalinfoForm.patchValue(success.data);
        this.isOpen = true;
        this.personalinfoId = success.data.xEmppinfoId;
        this.personalinfoForm.controls['empName'].setValue(this.displayName);
        let dateOfBirth: Date = new Date(this.dob);
        let fromModel1: IMyDateModel = { isRange: false, singleDate: { jsDate: dateOfBirth }, dateRange: null };
        this.personalinfoForm.controls['dateofbirth1'].setValue(fromModel1);
        this.changeDateofbirth(fromModel1);
        success.data.isActive == 'Y' ? this.personalinfoForm.get('status').setValue("ACTIVE") : this.personalinfoForm.get('status').setValue("INACTIVE");
        if (this.isview == 'Y') { this.personalinfoForm.disable(); }
      }, error => {
        this.add();
      })
    }
  }


  getDataUsingRedioBtn(data) {
    this.personalinfoId = data.xEmppinfoId;
  }




  // -----------------------------------------------------


  empchatlist: any = [];
  netwokingList: any = [];
  isOpenChat: boolean;
  relationId: any;
  addChat() {
    this.isOpenChat = true;
    this.chatform.reset();
    this.getNetwoking();
  }

  editChat() {
    if (this.relationId) {
      this.isOpenChat = true;
      this.chatform.reset();
      this.getNetwoking();
      this.empService.getChatById(this.relationId).subscribe(data => {
        var success: any = data;
        this.chatform.patchValue(success.data);

      })
    }
  }

  getAllFamilyDetailsByEmpId() {
    this.empService.getAllChatDetailsByEmpId(this.empId).subscribe(data => {
      var d: any = data;
      this.empchatlist = d.data;
    })
  }



  addUpdateChat() {
    this.chatform.get('xEmployeeId').setValue(Number(this.empId));
    this.chatform.get('gHoldingId').setValue(this.holdingId);
    this.chatform.get('gCompanyId').setValue(this.companyId);
    this.chatform.get('isActive').setValue("Y");
    this.chatform.get('created').setValue(new Date());
    this.chatform.get('createdBy').setValue(Number(sessionStorage.getItem("userId")));
    this.chatform.get('updatedBy').setValue(Number(sessionStorage.getItem("userId")));
    this.chatform.get('updated').setValue(new Date());
 
    if (this.chatform.value.lsempchatnameId) {
      this.chatform.get('lsempchatnameId').setValue(Number(this.chatform.value.lsempchatnameId));
    } else { this.chatform.get('lsempchatnameId').setValue(null); }

    if (this.chatform.value.lEmpchatId) {
      this.chatform.get('lEmpchatId').setValue(Number(this.chatform.value.lEmpchatId));
    } else { this.chatform.get('lEmpchatId').setValue(undefined); }

    this.empService.saveChat(this.chatform.value).subscribe(data => {
      var success: any = data;
      this.toastService.showToast('success', success.message);
      this.isOpenChat = false;
      this.relationId = undefined;
      this.getAllFamilyDetailsByEmpId();
    });
  }

  getDataUsingRedioBtn1(data) {
    this.relationId = data.lEmpchatId;
  }

  getNetwoking() {
    this.commonService.getGeneralListByCode(GeneralListCode.SOCIAL_NETWORKING_SITE).subscribe(data => {
      this.netwokingList = data;
    })
  }

  // Relationship with Employee

  
  isrelationshipwithemployee:boolean=true;
  relationshipWithEmployee:any=[];
  
  addRelationshipwithemployee(){
      this.isrelationshipwithemployee=false;
  }

  editRelationshipwithemployee(){

  }


}
