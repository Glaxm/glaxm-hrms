import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { CommonService, GeneralListCode } from 'src/app/views/services/common.service';
import { ToastrService } from 'src/app/views/services/toastr.service';
import { LeaveRuleService } from '../leave-rule.service';

@Component({
  selector: 'app-applicble-form',
  templateUrl: './applicble-form.component.html',
  styleUrls: ['./applicble-form.component.scss']
})
export class ApplicbleFormComponent implements OnInit {
  applicbleForm: FormGroup;

  genderList: any = [{id:'M',value:'Male'},{id:'F',value:'Female'}];
  maritalstatusList: any = [{id:'M',value:'Married'},{id:'U',value:'Unmarried'},{id:'S',value:'Single'}];
  weeklyOffList:any =[{id:'Friday',value:'Friday'},{id:'Friday & Saturday',value:'Friday & Saturday'},{id:'Friday & Alternate Saturday',value:'Friday & Alternate Saturday'}];
  
  empCatList:any =[];

  religionList:any=[];
  aleaveentitelmenttypeList:any=[];
  @Input() applicablegender: string;
  @Input() maritalstatus: string;
  @Input() leaveRuleId: string;
  @Input() applicablecategory: string;
  @Input() weeklyoffType: string;
  @Input() applicableReligion: string;
  @Input() applEntitledtype: string;
  @Input() companyid:string;
  @Input() applicableGrade:any;
  @Output() applicable = new EventEmitter;
  
  constructor(private commonService:CommonService,private toastService: ToastrService, 
    private activatedRoute: ActivatedRoute, private router: Router,private leaveRuleService: LeaveRuleService) {
      this.gradeSetting();
      this.applicbleForm = new FormGroup({
      applicablegender: new FormControl(null),
      maritalstatus: new FormControl(null),
      applicablecategory: new FormControl(null),
      weeklyoffType: new FormControl(null),
      applicableReligion:new FormControl(null),
      applEntitledtype:new FormControl(null),
      empgrade:new FormControl(null),
      applicableGrade:new FormControl(null)
    });
  }

  ngOnInit() {
    this.getEmpCatList();
    this.getReligionList();
    this.getAleaveentitlmenttype();
    this.getGradeByCompanyId();
   

    if(this.applicablegender){
      this.applicbleForm.get('applicablegender').setValue(this.applicablegender);} else{
        this.applicbleForm.get('applicablegender').setValue(null);
      }
    if(this.maritalstatus){
      this.applicbleForm.get('maritalstatus').setValue(this.maritalstatus);
    } else{
      this.applicbleForm.get('maritalstatus').setValue(null);
    }
    if(this.applicablecategory){
      this.applicbleForm.get('applicablecategory').setValue(this.applicablecategory);
    } else{
      this.applicbleForm.get('applicablecategory').setValue(null);
    }
    if(this.weeklyoffType){
      this.applicbleForm.get('weeklyoffType').setValue(this.weeklyoffType);
    }else{ 
      this.applicbleForm.get('weeklyoffType').setValue(null);
    }
    if(this.applicableReligion){
      this.applicbleForm.get('applicableReligion').setValue(this.applicableReligion);
    }else{ 
      this.applicbleForm.get('applicableReligion').setValue(null);
    }
    if(this.applEntitledtype){
      this.applicbleForm.get('applEntitledtype').setValue(this.applEntitledtype);
    }else{ 
      this.applicbleForm.get('applEntitledtype').setValue(null);
    }

    if(this.applicableGrade){
      this.applicbleForm.get('applicableGrade').setValue(this.applicableGrade);
    }else{ 
      this.applicbleForm.get('applicableGrade').setValue([]);
    }

  }

  getEmpCatList(){
    this.leaveRuleService.getEmpCat().subscribe(success=>{
      this.empCatList = success;
    });
  }

  getReligionList(){
      this.leaveRuleService.getReligionList().subscribe(success=>{
            this.religionList = success;
      });
  }

  setEmpGradeList(list) {
    let elm: any = [];
    list.forEach(element => {
      elm.push(element.empGradeId);
    });
    let unique = [...new Set(elm)];
    return unique;
  }

  applicableEvent() {
    this.applicbleForm.get('applicableGrade').setValue(this.setEmpGradeList(this.selectedEmpgrade));
    this.applicbleForm.value.applicablegender !="" && this.applicbleForm.value.applicablegender ? this.applicbleForm.get('applicablegender').setValue(this.applicbleForm.value.applicablegender) : this.applicbleForm.get('applicablegender').setValue(null); 
    this.applicbleForm.value.maritalstatus !="" && this.applicbleForm.value.maritalstatus ? this.applicbleForm.get('maritalstatus').setValue(this.applicbleForm.value.maritalstatus) : this.applicbleForm.get('maritalstatus').setValue(null);
    this.applicbleForm.value.weeklyoffType !="" && this.applicbleForm.value.weeklyoffType ? this.applicbleForm.get('weeklyoffType').setValue(this.applicbleForm.value.weeklyoffType) : this.applicbleForm.get('weeklyoffType').setValue(null);
    this.applicbleForm.value.applicablecategory !="" && this.applicbleForm.value.applicablecategory ? this.applicbleForm.get('applicablecategory').setValue(this.applicbleForm.value.applicablecategory) : this.applicbleForm.get('applicablecategory').setValue(null);
    this.applicbleForm.value.applicableReligion !="" && this.applicbleForm.value.applicableReligion ? this.applicbleForm.get('applicableReligion').setValue(this.applicbleForm.value.applicableReligion) : this.applicbleForm.get('applicableReligion').setValue(null);

    
    
    this.applicable.emit(this.applicbleForm.value);
  }

  getAleaveentitlmenttype() {
    this.commonService.getGeneralListByCode(GeneralListCode.ANNUAL_LEAVE_ENTITLEMENT_TYPE_LIST).subscribe(data => {
      this.aleaveentitelmenttypeList = data;
    })
  }


  //=================================== Employee Grade using multiselect

  empGradeList:any=[];
  
  getGradeByCompanyId(){
    this.leaveRuleService.getGradeByCompanyId([this.companyid]).subscribe(success=>{
      this.empGradeList = success;
    });
  }

  selectedEmpgrade = [];
  dropdownSettings: IDropdownSettings;

  gradeSetting() {
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'empGradeId',
      textField: 'name',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };
  }
 
  onEmpGradeSelect(item: any) {
    this.selectedEmpgrade.push(item);
   
  }

  onEmpGradeDeSelect(items: any) {
    this.selectedEmpgrade = this.selectedEmpgrade.filter(item => item.empGradeId !== items.empGradeId);
  }

  onSelectAllEmpGrade(items: any) {
    this.selectedEmpgrade = [];
    this.selectedEmpgrade.push(...[items]);

   
  }

}
