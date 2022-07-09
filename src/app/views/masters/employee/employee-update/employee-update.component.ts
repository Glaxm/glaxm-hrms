import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AngularMyDatePickerDirective } from 'angular-mydatepicker';
import { CommonService } from 'src/app/views/services/common.service';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-employee-update',
  templateUrl: './employee-update.component.html',
  styleUrls: ['./employee-update.component.scss']
})
export class EmployeeUpdateComponent  implements OnInit {

 
  yesNoList:any =[{id:'Y',name:'Yes'},{id:'N',name:'No'}];
  employeeupdateForm:FormGroup;
  leaveItemList:any=[{id:'AL',name:'Annual Leave'},{id:'UL',name:'Unpaid Leave'}];
  @ViewChild('dp3', { static: false }) myDp3: AngularMyDatePickerDirective;
  public myDatePickerOptions = this.commonService.datepickerFormat;

  constructor(private empService: EmployeeService,private router:Router,private commonService:CommonService) {
      this.employeeupdateForm = new FormGroup({
        
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
      });
     }

  ngOnInit() {
    this.getHolderList();
  }

  holdingList:any=[];
  getHolderList() {
    this.empService.getHolderList().subscribe(s => {
      this.holdingList = s;
      if (this.employeeupdateForm.value.employeeId) { } else {
        this.employeeupdateForm.get('holdingId').setValue(this.holdingList[0].gHoldingId);
        this.getCompanyListByHoldingId(this.holdingList[0].gHoldingId);
      }
    });
  }

  companyList:any=[];
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

  changeDateOfJoin(event){
    
  }

  cancel(){
    this.router.navigate(['/views/masters/employee/emp-info'], { queryParams: { id: 1109, view: 'N',moduleid:25 } });
  }

}
 
