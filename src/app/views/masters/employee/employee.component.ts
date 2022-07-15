import { Component, OnInit, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import { THEME, StepChangedArgs, NgWizardService, NgWizardConfig, TOOLBAR_POSITION } from 'ng-wizard';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { EmployeeService } from './employee.service';
import { ToastrService } from '../../services/toastr.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AngularMyDatePickerDirective, IMyDateModel } from 'angular-mydatepicker';
import { CommonService, GeneralListCode } from '../../services/common.service';
import { environment } from 'src/environments/environment';
import { IDropdownSettings } from 'ng-multiselect-dropdown';


@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent implements OnInit {
  [x: string]: any;

  config: NgWizardConfig = {
    selected: 0,
    theme: THEME.arrows,
    toolbarSettings: {
      showNextButton: false,
      showPreviousButton: false,
    },
    cycleSteps: false,
    anchorSettings: {
      enableAllAnchors: false
    }
  };
  salaryForm: any;
  currencyList: Object;
  payItemList: Object;

  showPreviousStep(event?: Event) {
    this.ngWizardService.previous();
  }

  showNextStep(event?: Event) {

    this.ngWizardService.next();
  }

  resetWizard(event?: Event) {
    this.ngWizardService.reset();
  }

  parentFun(event) {
    console.log(event);
    //alert("parent component function.");
  }

  setTheme(theme: THEME) {
    this.ngWizardService.theme(theme);
  }

  next: number;
  previous: number;
  stepChanged(args: StepChangedArgs) {
    this.next = args.step.index;
    this.previous = args.previousStep.index;
  }

  finishFunction() { }
  educationCategoryList: any = [];
  isview: string;
  statusList: any = [{ valueCode: 'ACTIVE', valueName: 'Active' }, { valueCode: 'INACTIVE', valueName: 'Inactive' }];
  greetingList: any = [];
  genderList: any = [];
  divisionList: any = [];
  sectionList: any = [];
  sub_sectionList: any = [];
  locationList: any = [];
  visacompanyList: any = [];
  manageruseridList: any = [];
  supervisorList: any = [];
  maritalStatusList: any = [{ valueCode: "U", valueName: "Unmarried" }, { valueCode: "M", valueName: "Married" }];
  countryList: any = [{ valueCode: 1, valueName: "United Arab Emirates" }];
  employeeStatusList: any = [];
  shiftRuleList: any = [];

  empdetailsForm: FormGroup;
  holdingList: any = [];
  companyList: any = [];
  categoryList: any = [];
  deptList: any = [];
  empGradeList: any = [];
  empDesignationList: any = [];
  jobFunList: any = [];
  religionList: any = [];
  subsectionList: any = [];
  probationPeriodList: any = [];
  doj: any;
  dofb: any;
  empdetailesubmitted: boolean = false;
  moduleid:any;
  obj={ employeeId:null }
  constructor(private cdr: ChangeDetectorRef, private activeRoute: ActivatedRoute, private commonService: CommonService, private router: Router, private toastService: ToastrService, private empService: EmployeeService, private ngWizardService: NgWizardService, private cd: ChangeDetectorRef) {
    this.empdetailsForm = new FormGroup({

      xEmployeeId: new FormControl(null),
      employeeId: new FormControl(null),
      superior: new FormControl(null),
      superiorId: new FormControl(null),
      holdingId: new FormControl(null),
      companyId: new FormControl(null, [Validators.required]),
      isActive: new FormControl(null),
      status: new FormControl(null, [Validators.required]),
      created: new FormControl(null),
      createdBy: new FormControl(0),
      updated: new FormControl(null),
      updatedBy: new FormControl(0),
      processing: new FormControl(null),
      processed: new FormControl(null),
      displayName: new FormControl(null, [Validators.required]),
      value: new FormControl(null, [Validators.required]),
      greetingId: new FormControl(null),
      firstName: new FormControl(null, [Validators.required]),
      middleName: new FormControl(null),
      lastName: new FormControl(null, [Validators.required]),
      departmentId: new FormControl(null, [Validators.required]),
      empGradeId: new FormControl(null, [Validators.required]),
      empDesignationId: new FormControl(null, [Validators.required]),
      religionId: new FormControl(null),
      dateOfJoin: new FormControl(null),
      doj: new FormControl(null),
      dob: new FormControl(null),
      isNational: new FormControl(null),
      effectiveDate: new FormControl(null),
      effdate: new FormControl(null),
      effectiveDate1: new FormControl(null),
      cityId: new FormControl(null),
      xShiftruleId: new FormControl(null, [Validators.required]),
      empGender: new FormControl(null, [Validators.required]),
      empCategoryId: new FormControl(null, [Validators.required]),
      xAirsectorId: new FormControl(null),
      mngrmailId: new FormControl(null),
      mngrName: new FormControl(null),
      jobFunctionId: new FormControl(null),
      molEmployeeId: new FormControl(null),
      isApproved: new FormControl(null),
      dateOfBirth: new FormControl(null),
      dateOfBirth1: new FormControl(null, [Validators.required]),
      emiratesId: new FormControl(null),
      age: new FormControl(null),
      education: new FormControl(null),
      userId: new FormControl(null, [Validators.required]),
      userDomain: new FormControl(null),
      visaCompanyId: new FormControl(null),
      divisionId: new FormControl(null),
      sectionId: new FormControl(null),
      locationId: new FormControl(null),
      managerId: new FormControl(null),
      maritalStatus: new FormControl(null),
      countryId: new FormControl(null),
      dateOfJoining: new FormControl(null),
      dateOfJoin1: new FormControl(null, [Validators.required]),
     
      oldEmpId: new FormControl(null, [Validators.required]),
      bioId: new FormControl(null, [Validators.required]),
      fullName: new FormControl(null),
      emailId: new FormControl(null),
      oTelephone: new FormControl(null),
      oExtensionNum: new FormControl(null),
      jobTitle: new FormControl(null),
      jobGrade: new FormControl(null),
      jobFamily: new FormControl(null),
      subSectionId: new FormControl(null),
      probationPeriod: new FormControl(null),
      probationCompletionDate: new FormControl(null),
      probdate: new FormControl(null),
      probationCompletionDate1: new FormControl(null),
      servicePeriod: new FormControl(null),
      lscurstatusId: new FormControl(null),
      supervisorId: new FormControl(null),
      lastDayonNotice1: new FormControl(null),
      lastDayonNotice: new FormControl(null)

    });

    this.activeRoute.queryParams.subscribe(params => {
      this.moduleid=params.moduleid
      this.empdetailsForm.controls['xEmployeeId'].setValue(params.id);
      this.isview = params.view == 'Y' ? 'Y' : 'N';

    });

    this.getHolderList();
    this.getJobFunctionList();
    this.getAllShiftRule();
    this.getProbationPeriodList();
   
    this.getEmployeestatusList();
  }

  ngOnInit() {
    this.superiorSetting();
    if (this.empdetailsForm.value.xEmployeeId) {
      this.empService.getEmpDetailsById(this.empdetailsForm.value.xEmployeeId).subscribe(success => {
        var s: any = success;
        this.selectCompany(s.data.companyId);
        this.empdetailsForm.patchValue(s.data);
        this.getCompanyListByHoldingId(s.data.holdingId);
      
        this.getDeptList(s.data.companyId);
        let dateOfJoin: Date = new Date(s.data.dateOfJoin);
        this.doj = s.data.dateOfJoin;
        this.obj.employeeId = s.data.superiorId;
        let fromModel: IMyDateModel = { isRange: false, singleDate: { jsDate: dateOfJoin }, dateRange: null };
        this.empdetailsForm.controls['dateOfJoin1'].setValue(fromModel);

        if (s.data.probationCompletionDate) {
          let probationCompletionDate: Date = new Date(s.data.probationCompletionDate);
          let fromModel9: IMyDateModel = { isRange: false, singleDate: { jsDate: probationCompletionDate }, dateRange: null };
          this.empdetailsForm.controls['probationCompletionDate1'].setValue(fromModel9);
        }

        if (s.data.dateOfBirth) {
          this.dofb = s.data.dateOfBirth;
          let dateOfBirth: Date = new Date(s.data.dateOfBirth);

          let fromModel1: IMyDateModel = { isRange: false, singleDate: { jsDate: dateOfBirth }, dateRange: null };
          this.empdetailsForm.controls['dateOfBirth1'].setValue(fromModel1);
          this.changeDateOfBirth(this.empdetailsForm.value.dateOfBirth1);
        }

        if (s.data.lastDayonNotice) {
          let lastDayonNotice : Date = new Date(s.data.lastDayonNotice);
          let fromModellastDayonNotice : IMyDateModel = { isRange: false, singleDate: { jsDate: lastDayonNotice  }, dateRange: null };
          this.empdetailsForm.controls['lastDayonNotice1'].setValue(fromModellastDayonNotice);
        }
        
        this.empdetailsForm.controls['empGradeId'].setValue(s.data.empGradeId);
        // xAirSectorId
        this.empdetailsForm.controls['xAirsectorId'].setValue(s.data.xAirSectorId);
        if (s.data.effectiveDate) {
          let effectiveDate: Date = new Date(s.data.effectiveDate);
          let fromModel2: IMyDateModel = { isRange: false, singleDate: { jsDate: effectiveDate }, dateRange: null };
          this.empdetailsForm.controls['effectiveDate1'].setValue(fromModel2);
        }
        
        s.data.isActive == 'Y' ? this.empdetailsForm.get('status').setValue('ACTIVE') : this.empdetailsForm.get('status').setValue('INACTIVE');
        this.url = null;
        console.log("file path" + this.url);
        this.url = environment.IMG_URL + s.data.path;
        if(s.data.lscurstatusId){this.changeEmpStatus(s.data.lscurstatusId)};
        if (this.isview == 'Y') { this.empdetailsForm.disable(); }
      });



    } else {
      this.empdetailsForm.get('status').setValue('ACTIVE');

    }
    this.getGreetingList();
    this.getGenderList();
  
    this.getAllEmployee();
    this.getWorklocationList();
  
    this.getmanageruseridList();
    this.getAirsectorList();
  }

  getAllEmployee(){
    let list: any = JSON.parse(sessionStorage.getItem("company"));
    var l: any = [];
    if (list) {
      for (var i = 0; i < list.length; i++) {
        l.push(Number(list[i]));
      }
    }
      this.empService.getAllEmployee(this.moduleid,l).subscribe(success=>{
        var data:any = success;
        this.superiorList = data;
        if(this.empdetailsForm.value.employeeId){ 
          this.selectedSuperiorList = this.superiorList.filter(o1 => o1.employeeId === this.obj.employeeId);//this.superiorList.filter(o1 => this.obj.employeeId.some(o2 => o1.employeeId === o2));
        }
      })
  }

  selectCompany(selectedcompId) {
    this.getSupervisorList(selectedcompId);
    this.getDeptList(selectedcompId);
    this.getVisacompamyList(selectedcompId);
    this.getDivisionList(selectedcompId);
    this.grtSectionList(selectedcompId);
    this.getSubsectionList(selectedcompId);
    this.getAllEducationCategory(selectedcompId);
    this.getDesignationList(selectedcompId);
    this.getEmpGrade(selectedcompId);
    this.getEmpCatList(selectedcompId);
    this.getReligionList(selectedcompId);

    
  }

  getDesignationList(companyId) {
    this.empService.getDesignationList([typeof companyId == 'number' ? companyId : Number(companyId)]).subscribe(s => {
      this.empDesignationList = s;
    });
  }

  getAllEducationCategory(companyId) {
    this.empService.getAllEducationCategory([typeof companyId == 'number' ? companyId : Number(companyId)]).subscribe(s => {
      
      this.educationCategoryList = s;
    });
  }
  getSupervisorList(selectedcompId) {
    this.commonService.getSupervisorListByCompanyId(selectedcompId).subscribe(data => {
      var success:any = data;
      this.supervisorList = success;
      this.superiorList = success;
    })
  }
  getGreetingList() {
    this.commonService.getGeneralListByCode(GeneralListCode.GREETING).subscribe(data => {
      this.greetingList = data;
    })
  }
  airsectorlist: any = [];
  getAirsectorList() {
    this.empService.getAirSectorList().subscribe(data => {
      this.airsectorlist = data;
    })
  }

  getGenderList() {
    this.commonService.getGeneralListByCode(GeneralListCode.GENDER_LIST).subscribe(data => {
      this.genderList = data;
    })
  }

  getProbationPeriodList() {
    this.commonService.getGeneralListByCode(GeneralListCode.PROBATION_PERIOD_LIST).subscribe(data => {
      this.probationPeriodList = data;
    })
  }


  getDivisionList(companyId) {
    this.divisionList=[];
    this.empService.getDivisionList([typeof companyId == 'number' ? companyId : Number(companyId)]).subscribe(data => {
      this.divisionList = data;
    })
  }
  grtSectionList(companyId) {
    this.empService.grtSectionList([typeof companyId == 'number' ? companyId : Number(companyId)]).subscribe(data => {
      this.sectionList = data;
    })
  }

  getSubsectionList(companyId) {
    this.empService.getSubsectionList([typeof companyId == 'number' ? companyId : Number(companyId)]).subscribe(data => {
      this.subsectionList = data;
    })
  }

  getWorklocationList() {
    this.commonService.getGeneralListByCode(GeneralListCode.AREA_LIST).subscribe(data => {
      this.locationList = data;
    })
  }

  getVisacompamyList(companyId) {
    this.visacompanyList=[];
    this.empService.getSponsorTypeList([typeof companyId == 'number' ? companyId : Number(companyId)]).subscribe(data => {
      this.visacompanyList = data;
    })
  }

  getEmployeestatusList() {
    this.commonService.getGeneralListByCode(GeneralListCode.EMPLOYMENT_STATUS_LIST).subscribe(data => {
      this.employeeStatusList = data;
    })
  }

  getmanageruseridList() {
    this.commonService.getGeneralListByCode(GeneralListCode.MANAGER_USER_ID_LIST).subscribe(data => {
      this.manageruseridList = data;
    })
  }

  get ed() { return this.empdetailsForm.controls; }

  back() {
    this.router.navigate(['/views/masters/employee/employee-summary']);
  }


  getAllShiftRule() {
    // alert(sessionStorage.getItem("company"))
    let list: any = JSON.parse(sessionStorage.getItem("company"));
    var l: any = [];
    // alert(list.length)
    if(list){
    for (var i = 0; i < list.length; i++) {

      // if(list[i]!=','){
      l.push(Number(list[i]));
      //  }
    }}

    //alert(l);
    this.empService.getAllShiftRule(l).subscribe(s => {
      this.shiftRuleList = s;
    });
  }

  getHolderList() {
    this.empService.getHolderList().subscribe(s => {
      this.holdingList = s;
      if (this.empdetailsForm.value.employeeId) { } else {
        this.empdetailsForm.get('holdingId').setValue(this.holdingList[0].gHoldingId);
        this.getCompanyListByHoldingId(this.holdingList[0].gHoldingId);
      }
    });
  }

  getCompanyListByHoldingId(id) {

    this.empService.getCompanyListByHoldingId(id).subscribe(s => {
      this.companyList = s;
      if (this.companyList) {

        let list: any = JSON.parse(sessionStorage.getItem("company"));
        var l: any = [];
        if(list){
        for (var i = 0; i < list.length; i++) {
          // if(list[i]!=','){
          l.push(Number(list[i]));
          // }
        }}

        this.companyList = this.companyList.filter(o1 => l.some(o2 => o1.gCompanyId === o2));
      }
    })
  }

  getEmpCatList(companyId) {
    this.empService.getEmpCatList([typeof companyId == 'number' ? companyId : Number(companyId)]).subscribe(s => {
      this.categoryList = s;
    });
  }

  getDeptList(companyId) {
    this.deptList=[];
    this.empService.getDeptList([typeof companyId == 'number' ? companyId : Number(companyId)]).subscribe(s => {
      this.deptList = s;
    });
  }

  getEmpGrade(companyId) {
    this.empService.getEmpGrade([typeof companyId == 'number' ? companyId : Number(companyId)]).subscribe(s => {
      this.empGradeList = s;
    });
  }

 

  getJobFunctionList() {
    this.empService.getJobFunctionList().subscribe(s => {
      this.jobFunList = s;
    });
  }

  getReligionList(companyId) {
    this.empService.getReligionList([typeof companyId == 'number' ? companyId : Number(companyId)]).subscribe(s => {
      this.religionList = s;
    });
  }


  
  setSuperiorList(list) {
    let elm: any = [];
    list.forEach(element => {
      elm.push(element.employeeId);
    });
    let unique = [...new Set(elm)];
    return unique;
  }



  saveEmpDetails() {

    this.empdetailsForm.get('createdBy').setValue(1);
    this.empdetailsForm.get('processing').setValue('N');
    this.empdetailsForm.get('processed').setValue('N');
    this.empdetailsForm.get('isNational').setValue('N');
    this.empdetailsForm.get('isApproved').setValue('N');

    let superiorList: any = this.setSuperiorList(this.selectedSuperiorList)
    this.empdetailsForm.controls['superiorId'].setValue(superiorList[0]);
    
    

    this.empdetailsForm.get('companyId').setValue(Number(this.empdetailsForm.value.companyId));
    this.empdetailsForm.get('holdingId').setValue(Number(this.empdetailsForm.value.holdingId));
    if (this.empdetailsForm.value.lscurstatusId) {
      this.empdetailsForm.get('lscurstatusId').setValue(Number(this.empdetailsForm.value.lscurstatusId));
    } else {
      this.empdetailsForm.get('lscurstatusId').setValue(null);
    }

    if (this.empdetailsForm.value.supervisorId) {
      this.empdetailsForm.get('supervisorId').setValue(Number(this.empdetailsForm.value.supervisorId));
    } else {
      this.empdetailsForm.get('supervisorId').setValue(null);
    }


    this.empdetailsForm.get('greetingId').setValue(Number(this.empdetailsForm.value.greetingId));
    if (this.empdetailsForm.value.departmentId) {
      this.empdetailsForm.get('departmentId').setValue(Number(this.empdetailsForm.value.departmentId));
    } else {
      this.empdetailsForm.get('departmentId').setValue(null);
    }
    if (this.empdetailsForm.value.empGradeId) {
      this.empdetailsForm.get('empGradeId').setValue(Number(this.empdetailsForm.value.empGradeId));
    } else {
      this.empdetailsForm.get('empGradeId').setValue(null);
    }
    if (this.empdetailsForm.value.empDesignationId) {
      this.empdetailsForm.get('empDesignationId').setValue(Number(this.empdetailsForm.value.empDesignationId));
    } else {
      this.empdetailsForm.get('empDesignationId').setValue(null);
    }
    if (this.empdetailsForm.value.religionId) {
      this.empdetailsForm.get('religionId').setValue(Number(this.empdetailsForm.value.religionId));
     } else {
      this.empdetailsForm.get('religionId').setValue(null);
     }

     if (this.empdetailsForm.value.cityId) {
      this.empdetailsForm.get('cityId').setValue(Number(this.empdetailsForm.value.cityId));
     } else {
      this.empdetailsForm.get('cityId').setValue(null);
     }
   
   
    if (this.empdetailsForm.value.xShiftruleId) {
      this.empdetailsForm.get('xShiftruleId').setValue(Number(this.empdetailsForm.value.xShiftruleId));
    } else {
      this.empdetailsForm.get('xShiftruleId').setValue(null);
    }

    if (this.empdetailsForm.value.empCategoryId) {
      this.empdetailsForm.get('empCategoryId').setValue(Number(this.empdetailsForm.value.empCategoryId));
    } else {
      this.empdetailsForm.get('empCategoryId').setValue(null);
    }

    if(this.empdetailsForm.value.xAirsectorId){
        this.empdetailsForm.get('xAirsectorId').setValue(Number(this.empdetailsForm.value.xAirsectorId))
      } else{
        this.empdetailsForm.get('xAirsectorId').setValue(null);
      }

    if (this.empdetailsForm.value.education) {
      this.empdetailsForm.get('education').setValue(Number(this.empdetailsForm.value.education));
    } else {
      this.empdetailsForm.get('education').setValue(null);
    }

    if (this.empdetailsForm.value.jobFunctionId) {
      this.empdetailsForm.get('jobFunctionId').setValue(Number(this.empdetailsForm.value.jobFunctionId));
    } else {
      this.empdetailsForm.get('jobFunctionId').setValue(null);
    }

    
    if (this.empdetailsForm.value.divisionId) {
      this.empdetailsForm.get('divisionId').setValue(Number(this.empdetailsForm.value.divisionId));
    } else {
      this.empdetailsForm.get('divisionId').setValue(null);
    }
    if (this.empdetailsForm.value.sectionId) {
      this.empdetailsForm.get('sectionId').setValue(Number(this.empdetailsForm.value.sectionId));
    } else {
      this.empdetailsForm.get('sectionId').setValue(null);
    }

    if (this.empdetailsForm.value.subSectionId) {
      this.empdetailsForm.get('subSectionId').setValue(Number(this.empdetailsForm.value.subSectionId));
    } else {
      this.empdetailsForm.get('subSectionId').setValue(null);
    }

    if (this.empdetailsForm.value.visaCompanyId) {
      this.empdetailsForm.get('visaCompanyId').setValue(Number(this.empdetailsForm.value.visaCompanyId));
    } else {
      this.empdetailsForm.get('visaCompanyId').setValue(null);
    }
    if (this.empdetailsForm.value.managerId) {
      this.empdetailsForm.get('managerId').setValue(Number(this.empdetailsForm.value.managerId))
    } else {
      this.empdetailsForm.get('managerId').setValue(null);
    }

    if (this.empdetailsForm.value.locationId) {

      this.empdetailsForm.get('locationId').setValue(Number(this.empdetailsForm.value.locationId));
    } else {
      this.empdetailsForm.get('locationId').setValue(null);
    }
    this.empdetailsForm.get('jobGrade').setValue(null);

    if (this.empdetailsForm.value.countryId) {
      this.empdetailsForm.get('countryId').setValue(Number(this.empdetailsForm.value.countryId));
     } else {
      this.empdetailsForm.get('countryId').setValue(null);
     }

   
    if (this.empdetailsForm.value.employeeId) {
      this.empdetailsForm.get('employeeId').setValue(Number(this.empdetailsForm.value.employeeId));

    } else { this.empdetailsForm.get('employeeId').setValue(undefined) }

    if (this.probPeriod == 'Not Applicable') {
      this.empdetailsForm.get('probdate').setValue(null);
    }


    this.empdetailsForm.get('created').setValue(new Date());
    this.empdetailsForm.get('updatedBy').setValue(1);
    this.empdetailsForm.get('updated').setValue(new Date());
    this.empdetailsForm.value.status == "ACTIVE" ? this.empdetailsForm.get('isActive').setValue('Y') : this.empdetailsForm.get('isActive').setValue('N');

    this.empdetailesubmitted = true;

    console.log(JSON.stringify(this.empdetailsForm.value));
    if (this.empdetailsForm.invalid) {
      return;
    } else {
     
      this.empService.saveEmpDetails(this.empdetailsForm.value).subscribe(s => {
        var success: any = s;
        if (success.code == 0) {
          this.toastService.showToast('danger', success.message);
        } else {
          this.toastService.showToast('success', success.message);
          this.fileUpload(success.data.employeeId);
          this.router.navigate(['/views/masters/employee/emp-info'], { queryParams: { id: success.data.employeeId, view: this.isview, moduleid:this.moduleid } })
        }
      });
    }
  }

  redirectTo(uri: string, employeeId) {
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
      this.router.navigate([uri], { queryParams: { id: employeeId } }))
  }

  fileUpload(empId) {
    const formData = new FormData();
    formData.append('file', this.imagepath);

    this.empService.fileUpload(empId, formData).subscribe(s => {
      var success: any = s;
      //this.toastService.showToast('success', success.message);
    });
  }

  // empDetails:any =[];
  // saveDataWithFile(file: File){
  //   this.empDetails = [];
  //   const formData: FormData = new FormData();
  //   formData.append('file',file);
  //   formData.append('X_EMPLOYEE',this.empDetails.push(this.empdetailsForm.value));

  //   this.empService.saveEmpDetails(formData).subscribe(s => {
  //     var success: any = s;
  //     this.toastService.showToast('success', success.message);
  //     this.router.navigate(['/views/masters/employee/emp-info'], { queryParams: { id: success.data.employeeId } })
  //   });

  // }

  url: any = '';
  imagepath: File;

  onSelectFile(event) {
    if (event.target.files && event.target.files[0]) {
      // var reader = new FileReader();
      const reader: FileReader = new FileReader();
      reader.readAsDataURL(event.target.files[0]); // read file as data url
      this.imagepath = event.target.files[0]

      reader.onload = (event: Event) => { // called once readAsDataURL is completed
        this.url = reader.result;
        console.log(this.url)
      }
    }
  }

  //--------------------------------------------------------------- Employee Education



 

  @ViewChild('dp9', { static: false }) myDp9: AngularMyDatePickerDirective;
  @ViewChild('dp3', { static: false }) myDp3: AngularMyDatePickerDirective;
  @ViewChild('dp4', { static: false }) myDp4: AngularMyDatePickerDirective;
  @ViewChild('dp5', { static: false }) myDp5: AngularMyDatePickerDirective;
  @ViewChild('dp11', { static: false }) myDp11: AngularMyDatePickerDirective;
  changeDateOfJoin(event) {
    
    this.empdetailsForm.get('dateOfJoin').setValue(event.singleDate.jsDate);
    this.empdetailsForm.get('doj').setValue(this.commonService.dateFormat(event.singleDate.jsDate));
    this.calServicePeriod(event.singleDate.jsDate);
    this.doj = this.commonService.dateFormat(event.singleDate.jsDate);
  }

  changeProbCompDate(event) {
    this.empdetailsForm.get('probdate').setValue(this.commonService.dateFormat(event.singleDate.jsDate));
  }

  changeDateOfBirth(event) {
    this.empdetailsForm.get('dob').setValue(this.commonService.dateFormat(event.singleDate.jsDate));
    this.empdetailsForm.get('dateOfBirth').setValue(event.singleDate.jsDate);
    this.setAge(event.singleDate.jsDate);
  }

  setAge(dob) {

    var diff = Date.now() - Date.parse(dob);
    var age = new Date(new Date("0000-01-01").getTime() + diff);
    var years = age.getFullYear();
    var months = age.getMonth();
    var days = age.getDate();
    console.log(years, "years", months, "months", days - 1, "days")
    let str = years + " " + 'Years' + ", " + months + " " + 'Months' + ", " + (days - 1) + " " + 'days';
    this.empdetailsForm.get('age').setValue(str);
  }

  calServicePeriod(dob) {

    var diff = Date.now() - Date.parse(dob);
    var age = new Date(new Date("0000-01-01").getTime() + diff);
    var years = age.getFullYear();
    var months = age.getMonth();
    var days = age.getDate();
    console.log(years, "years", months, "months", days - 1, "days")
    let str = years + " " + 'Years' + ", " + months + " " + 'Months' + ", " + (days - 1) + " " + 'days';
    this.empdetailsForm.get('servicePeriod').setValue(str);
  }

  probPeriod: any;
  setProbationDateByPeriod(probPeriod) {
    let obj = this.probationPeriodList.filter(e => e.lListitemId == probPeriod);
    let count;
    if (obj) {
      this.probPeriod = obj[0].name;
      if (obj[0].name == '3 Months') {
        count = 3;
      } else if (obj[0].name == '6 Months') {
        count = 6;
      } else {

      }

    }
    if (probPeriod != 'N') {

      var d = new Date(this.commonService.dateFormat(this.doj));
      d.setMonth(d.getMonth() + Number(count));
      if (obj[0].name == "Not Applicable") {
        this.empdetailsForm.controls['probationCompletionDate1'].setValue(null);
      } else {
        let probationCompletionDate: Date = new Date(d)
        let fromModel9: IMyDateModel = { isRange: false, singleDate: { jsDate: probationCompletionDate }, dateRange: null };
        this.empdetailsForm.controls['probationCompletionDate1'].setValue(fromModel9);
      }
    }
  }

  changeEffectiveDate1(event) {
    this.empdetailsForm.get('effdate').setValue(this.commonService.dateFormat(event.singleDate.jsDate));
  }

  //-------------------------------------------------------------- Pay Item
  public myDatePickerOptions = this.commonService.datepickerFormat;

  payItemTab(event) {
    this.showNextStep(event);
    this.getPayItemList();
  }

  getPayItemList() {
    this.empService.getPayItemList().subscribe(s => {
      this.payItemList = s;
    });
  }

  name = 'Angular';
  fileToUpload: any;
  imageUrl: any;
  handleFileInput(file: FileList) {
    this.fileToUpload = file.item(0);

    //Show image preview
    let reader = new FileReader();
    reader.onload = (event: any) => {
      this.imageUrl = event.target.result;
    }
    reader.readAsDataURL(this.fileToUpload);
  }

  selectedIndex: any = -1;
  openTab(index) {
    this.selectedIndex = index;
  }
  fullNameFun() {
    let fname = this.empdetailsForm.value.firstName ? this.empdetailsForm.value.firstName : ''
    let mname = this.empdetailsForm.value.middleName ? this.empdetailsForm.value.middleName : ''
    let lname = this.empdetailsForm.value.lastName ? this.empdetailsForm.value.lastName : '';
    this.empdetailsForm.get('fullName').setValue(fname + " " + mname + " " + lname);
    this.setDisplayName();
  }

  setDisplayName() {
    this.empdetailsForm.get('displayName').setValue(this.empdetailsForm.value.fullName);
  }
//================================================changeEmpStatus() method
employementStatus:any;
  changeEmpStatus(id){
    if(this.employeeStatusList){
      let list = this.employeeStatusList.filter(data=> data.lListitemId == id);
      if(list){this.employementStatus = list[0].name};
    }
  }

      //================================================ Multiselect Superior list

      superiorList:any=[];
      selectedSuperiorList = [];
      dropdownSettings: IDropdownSettings;
    
      superiorSetting() {
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
     
      onSuperiorSelect(item: any) {
        this.selectedSuperiorList.push(item);
      }
    
      onSuperiorDeSelect(items: any) {
        this.selectedSuperiorList = this.selectedSuperiorList.filter(item => item.employeeId !== items.employeeId);
      }
    
      onSelectAllSuperior(items: any) {
        this.selectedSuperiorList = [];
        this.selectedSuperiorList.push(...[items]);
      }
  
      
      //=====================================================================

      openUpdatedForm(){
        this.router.navigate(['/views/masters/employee/employee-update']);
      }

      changeLastDayonNotice(event){

      }
  

}
