import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularMyDatePickerDirective, IMyDateModel } from 'angular-mydatepicker';
import { transform } from 'html2canvas/dist/types/css/property-descriptors/transform';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { CommonService, GeneralListCode } from 'src/app/views/services/common.service';
import { ToastrService } from 'src/app/views/services/toastr.service';
import { TransferFormService } from '../transfer-form.service';

@Component({
  selector: 'app-add-transfer-form',
  templateUrl: './add-transfer-form.component.html',
  styleUrls: ['./add-transfer-form.component.scss']
})
export class AddTransferFormComponent implements OnInit {

  public myDatePickerOptions = this.commonService.datepickerFormat;
  @ViewChild('dp1', {static: false}) myDp1: AngularMyDatePickerDirective;
  @ViewChild('dp2', {static: false}) myDp2: AngularMyDatePickerDirective;
  

  transferForm:any;
  isView:boolean=false;

  holdingList: any = [];
  companyList:any=[];
  employeeList:any=[];
  submitted:boolean=false;
  obj={ companyId:null }
  empObj={xEmployeeId:null}
  moduleid:any;
  currentPositionList:any=[];
  dataList:any=[];
  statusList: any = [{ valueCode: 'ACTIVE', valueName: 'Active' }, { valueCode: 'INACTIVE', valueName: 'Inactive' }];


  constructor(private commonService:CommonService,private transferService:TransferFormService,
    private toastService:ToastrService,private router:Router, private activatedRoute:ActivatedRoute) {
  this.transferForm  = new FormGroup({
    xupdatetrackrId:new FormControl(null),
    xEmployeeId: new FormControl(null),
    employee: new FormControl(null, [Validators.required]),
    gCompanyId: new FormControl(null),
    company: new FormControl(null, [Validators.required]),
    gHoldingId: new FormControl(null),
    isActive: new FormControl(null),
    status: new FormControl(null),
    createdBy: new FormControl(null),
    updatedBy: new FormControl(null),
    created: new FormControl(null),
    updated: new FormControl(null),
    lsupdatetypeId: new FormControl(null),
    prevId: new FormControl(null),
    previousId: new FormControl(null),
    newId:new FormControl(null),
    documentno:new FormControl(null),
    transDt :new FormControl(null),
    transactDt:new FormControl(null),
    transactiondate1:new FormControl(null, [Validators.required]),
    currentPosition:new FormControl(null, [Validators.required]),
    newPosition:new FormControl(null),
    selectedPosition:new FormControl(null),
    effectiveDate:new FormControl(null),
    remark:new FormControl(null),
    effectivedate1:new FormControl(null, [Validators.required]),
    effDt  :new FormControl(null),
    effectiveDt:new FormControl(null),
    newIdName:new FormControl(null, [Validators.required]),
    eosbSettlement1:new FormControl(null),
    procSettlement:new FormControl(null)
   });

   this.activatedRoute.queryParams.subscribe(params => {
    this.transferForm.controls['xupdatetrackrId'].setValue(params.id);
    this.isView = params.view;
    this.moduleid = params.moduleid;
  });

  }

  
  get f() { return this.transferForm.controls; }


  ngOnInit() {
    this.getHoldingList();
    this.companySetting();
    this.tepMethodemp();
    this.getCurrentPositionList();
    if(this.transferForm.value.xupdatetrackrId){
      this.transferService.getTransferdetailsById(this.transferForm.value.xupdatetrackrId).subscribe(success=>{
          var data:any = success;
          this.obj.companyId = [data.data.gCompanyId];
          this.empObj.xEmployeeId = [data.data.xEmployeeId];
          this.transferForm.controls['xEmployeeId'].setValue(data.data.xEmployeeId);
          this.transferForm.get('employee').setValue(data.data.empIdwithname);
          this.getCompanyById(data.data.gHoldingId);
          data.data.procSettlement=='Y' ?  this.transferForm.get('eosbSettlement1').setValue(true) :this.transferForm.get('eosbSettlement1').setValue(false);
          this.transferForm.controls['gHoldingId'].setValue(data.data.gHoldingId);
          this.transferForm.get('currentPosition').setValue(data.data.lsupdatetypeId);
          data.data.isActive == 'Y' ? this.transferForm.get('status').setValue("ACTIVE") : this.transferForm.get('status').setValue("INACTIVE");
          this.getHistoryByEmpId(data.data.xEmployeeId);

       
          if(data.data.transactDt){
            let transdate: Date = new Date(data.data.transactDt);
            let fromModel: IMyDateModel = { isRange: false, singleDate: { jsDate: transdate }, dateRange: null };
            this.transferForm.controls['transactiondate1'].setValue(fromModel);
          }

          if(data.data.effectiveDt){
            let effedate: Date = new Date(data.data.effectiveDt);
            let effedateModel: IMyDateModel = { isRange: false, singleDate: { jsDate: effedate }, dateRange: null };
            this.transferForm.controls['effectivedate1'].setValue(effedateModel);
          }
          this.compList[0] = data.data.gCompanyId;
          //  this.selCurPosition(data.data.lsupdatetypeId);
          if(data.data.moduleName){
            this.getListByPosition((data.data.moduleName).toUpperCase());
          }
          // moduleName

            this.transferForm.controls['newIdName'].setValue(data.data.newName);
            this.transferForm.controls['previousId'].setValue(data.data.prevName);
            

          
          this.transferForm.patchValue(data.data);
         
      });
    } else{
      let startDate: Date = new Date();
      let fromModel: IMyDateModel = { isRange: false, singleDate: { jsDate: startDate }, dateRange: null };
      this.transferForm.controls['transactiondate1'].setValue(fromModel);
      this.changetransactionDate(fromModel);
      this.transferForm.get('status').setValue("ACTIVE");
    }
  }

  getCurrentPositionList(){
    this.commonService.getGeneralListByCode(GeneralListCode.CURRENT_POSITION_LIST).subscribe(data=>{
      this.currentPositionList=data;
  })
  }

  selCurPosition(curPositionId){
      let list = this.currentPositionList.filter(l=> l.lListitemId==curPositionId);
      let empId = this.transferForm.value.xEmployeeId;

      if(list && empId){
        this.getListByPosition((list[0].name).toUpperCase());
      this.transferService.getCurrPosDetails(empId,(list[0].name).toUpperCase()).subscribe(data=>{
          var successData:any = data;
          if(successData){
            
            this.transferForm.get('previousId').setValue(successData.name);
           // this.transferForm.get('newIdName').setValue(successData.name);
            //this.transferForm.get('newId').setValue(successData.currentId);
            this.transferForm.get('prevId').setValue(successData.currentId);
            
          } 
      })
    }
  }

 
  empGradeList:any =[];


  getListByPosition(position){
    this.dataList = [];
   // alert(JSON.stringify(this.compList));
   //alert(position);
    if(position=="DEPARTMENT"){ 
        this.transferService.getDeptList(this.compList).subscribe(success=>{
            this.dataList = success;
        })
    }
    if(position=="FUNCTION"){
      this.transferService.getAllFunction(this.compList).subscribe(success=>{
        this.dataList = success;
      })
    }
    if(position=="SECTION"){
      this.transferService.getAllSection(this.compList).subscribe(success=>{
        this.dataList = success;
      })
    }
    if(position=="SUBSECTION"){
      this.transferService.getAllSubsection(this.compList).subscribe(success=>{
        this.dataList = success;
      })
    }

    if(position=="GRADE"){
      this.transferService.getEmpGrade(this.compList).subscribe(s => {
        this.dataList = s;
      });
    }

    if(position=="VISASPONSOR"){
      this.transferService.getSponsorTypeList(this.compList).subscribe(s => {
        this.dataList = s;
      })
    }

    if(position=="DESIGNATION"){
      this.transferService.getDesignationList(this.compList).subscribe(s => {
        this.dataList = s;
      });
    }

    if(position=="COMPANY"){
      this.transferService.getCompanyList(this.transferForm.value.gHoldingId).subscribe(s => {
        this.dataList = s;
      });
    }

    

    // if(position=="GRADE"){
    //   this.transferService.getAllSubsection(this.compList).subscribe(success=>{
    //     this.dataList = success;
    //   })
    // }

  }

  selectNewPosition(selected){

    let list = this.dataList.filter(d=> d.name==selected);


    let currpositionlist = this.currentPositionList.filter(d=>d.lListitemId ==this.transferForm.value.currentPosition);

if(currpositionlist){
  
    if(list && currpositionlist[0].name=="Department"){
      this.transferForm.get('newId').setValue(list[0].deptId);
    }
    if(list && currpositionlist[0].name=="Function"){
      this.transferForm.get('newId').setValue(list[0].xdivId);
    }
    if(list && currpositionlist[0].name=="Section"){
      this.transferForm.get('newId').setValue(list[0].xsectionId);
    }
    if(list && currpositionlist[0].name=="Subsection"){
      this.transferForm.get('newId').setValue(list[0].xsubsectionId);
    }
    if(list && currpositionlist[0].name=="Company"){
      this.transferForm.get('newId').setValue(list[0].gCompanyId);
    }
    if(list && currpositionlist[0].name=="Visasponsor"){
      this.transferForm.get('newId').setValue(list[0].xvisasponsorId);
    }
  }
  }


  changetransactionDate(event){
    this.transferForm.get('transactDt').setValue(event.singleDate.jsDate);
  }

  changeeffectivedate(event){
    this.transferForm.get('effectiveDt').setValue(event.singleDate.jsDate);
  }
  
  getHoldingList(){
    this.transferService.getAllHolding().subscribe(s=>{
      this.holdingList = s;
      if(this.transferForm.value.xupdatetrackrId){

      } else{
        this.transferForm.controls['gHoldingId'].setValue(this.holdingList[0].gHoldingId);
        this.getCompanyById(this.holdingList[0].gHoldingId);
      }
    })
  }

  getCompanyById(id){
    this.transferService.getCompanyById(id).subscribe(s=>{
      this.companyList=s;
      // debugger;
      // if(this.transferForm.value.xupdatetrackrId && this.companyList.length > 0){
      //   this.selectedCompanyList = this.companyList.filter(o1 => this.obj.companyId.some(o2 => o1.gCompanyId === o2));
      // }
      if(this.transferForm.value.xupdatetrackrId){
        this.selectedCompanyList = this.companyList.filter(o1 => this.obj.companyId.some(o2 => o1.gCompanyId === o2));
        this.getEmpByCompanyId(this.selectedCompanyList);
      }
     

    });
  }

  dateTrackingList:any=[];
  getDateTrackingList(){
      // this.transferService.dateTrackingList().subscribe(success=>{
        // api/updateTracker/getUpdatedHistorybyempid?empId=21
      // });
  }


  setCompanyList(list) {
    let elm: any = [];
    list.forEach(element => {
      elm.push(element.gCompanyId);
    });
    let unique = [...new Set(elm)];
    return unique;
  }


  addUpdateTransferForm(){
    let compList = this.setCompanyList(this.selectedCompanyList);
    compList ? this.transferForm.get('gCompanyId').setValue(compList[0]) : this.transferForm.get('gCompanyId').setValue(0);
    
    if(this.transferForm.value.transactiondate1){
      this.transferForm.get("transDt").setValue(this.commonService.dateFormat(this.transferForm.value.transactiondate1));
    }

    if(this.transferForm.value.effectivedate1){
      this.transferForm.get("effDt").setValue(this.commonService.dateFormat(this.transferForm.value.effectiveDt));
    }

    if(this.transferForm.value.currentPosition){
      this.transferForm.get('lsupdatetypeId').setValue(Number(this.transferForm.value.currentPosition));
    }

    this.transferForm.value.eosbSettlement1 ?  this.transferForm.get('procSettlement').setValue('Y') :this.transferForm.get('procSettlement').setValue('N');

    this.transferForm.get('createdBy').setValue(Number(sessionStorage.getItem('userId')));
    this.transferForm.get('created').setValue(new Date());
    this.transferForm.get('updatedBy').setValue(Number(sessionStorage.getItem('userId')));
    this.transferForm.get('updated').setValue(new Date());
    this.transferForm.get('isActive').setValue('Y');
    
   // this.transferForm.get('lsupdatetypeId').setValue(undefined);

    this.submitted = true;
    if (this.transferForm.invalid) {
      return;
    } else { 

      this.transferService.saveupdatetrack(this.transferForm.value).subscribe(success=>{
        var s: any = success;
        if(s.code==0){
          this.toastService.showToast('danger', s.message);
        } else{
        this.toastService.showToast('success', s.message);

        // 
        this.transferForm.controls['currentPosition'].reset();
        this.transferForm.controls['effectivedate1'].reset();
        this.transferForm.controls['previousId'].reset();
        this.transferForm.controls['remark'].reset();
        this.transferForm.controls['newIdName'].reset();

        // this.transferForm.get('currentPosition').setValue(undefined);
        // this.transferForm.get("effectivedate1").setValue(undefined);
        // this.transferForm.get("previousId").setValue(undefined);
        // this.transferForm.get("remark").setValue(undefined);
        // this.transferForm.get("newIdName").setValue(undefined);
        // 

       // this.back();
      }
      });
      
    
    }
  }

  back(){
      this.router.navigate(['views/masters/transfer-form/transfer-form-summary']);
  }

      //================================================ Multiselect Company list

      selectedCompanyList = [];
      dropdownSettings: IDropdownSettings;
    
      companySetting() {
        this.dropdownSettings = {
          singleSelection: true,
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
        this.getEmpByCompanyId(this.selectedCompanyList);
      }
    
      onCompanyDeSelect(items: any) {
        this.selectedCompanyList = this.selectedCompanyList.filter(item => item.gCompanyId !== items.gCompanyId);
        this.getEmpByCompanyId(this.selectedCompanyList);
      }
    
      onSelectAllCompnay(items: any) {
        this.selectedCompanyList = [];
        this.selectedCompanyList.push(...[items]);
        this.getEmpByCompanyId(this.selectedCompanyList);
      }
    
    //================================================ Multiselect Employee list

      
  setSelectedCompList(list) {
    let elm: any = [];
    list.forEach(element => {
      elm.push(element.gCompanyId);
    });
    let unique = [...new Set(elm)];
    return unique;
  }

  compList:any=[];
    getEmpByCompanyId(selCompnyList){
     
      this.compList = this.selectedItemsemp.length==1 ? this.setSelectedCompList(selCompnyList[0]) : this.setSelectedCompList(selCompnyList);
      this.getAllEmployeeById(this.compList);
    }

    getAllEmployeeById(l){
      this.transferService.getAllEmployee(this.moduleid,l).subscribe(s => {
        this.employeeList = s;
       
        if (this.transferForm.value.xupdatetrackrId) {

          this.selectedItemsemp = this.employeeList.filter(o1 => this.empObj.xEmployeeId.some(o2 => o1.employeeId === o2));//item => item.employeeId == this.transferForm.value.xEmployeeId);
        } else{
          //  this.selectedItemsemp = [{ 'employeeId': this.employeeList[0].employeeId, 'displayName': this.employeeList[0].displayName }];          
        }
        

      });
    }

selectedItemsemp: Array<any> = [];
dropdownSettingsemp: any = {};

tepMethodemp() {
  this.dropdownSettingsemp = {
    singleSelection: true,
    idField: 'employeeId',
    textField: 'displayName',
    selectAllText: 'Select All',
    unSelectAllText: 'UnSelect All',
    itemsShowLimit: 3,
    allowSearchFilter: true
  };
}

onItemSelectemp(item: any) {
  this.transferForm.controls['xEmployeeId'].setValue(item.employeeId);
  this.getHistoryByEmpId(item.employeeId);
}
onSelectAllemp(items: any) {
  console.log('onSelectAll', items);
}


getHistoryByEmpId(id){
  this.transferService.getHistoryByEmpId(id).subscribe(success=>{
      var data:any = success;
      this.dateTrackingList = data.data;
  })
}

edit(obj){
 
this.transferForm.get('xupdatetrackrId').setValue(obj.xupdatetrackrId);
this.transferForm.get('currentPosition').setValue(obj.moduleCode);
//this.selCurPosition(obj.moduleCode);
if(obj.moduleName){
  this.getListByPosition((obj.moduleName).toUpperCase());
}
// alert(JSON.stringify(obj))
obj.procSettlement=='Y' ?  this.transferForm.get('eosbSettlement1').setValue(true) :this.transferForm.get('eosbSettlement1').setValue(false);
if(obj.effDt){
  let effedate: Date = new Date(obj.effDt);
  let effedateModel: IMyDateModel = { isRange: false, singleDate: { jsDate: effedate }, dateRange: null };
  this.transferForm.controls['effectivedate1'].setValue(effedateModel);
}

if(obj.transDt){
  let transdate: Date = new Date(obj.transDt);
  let fromModel: IMyDateModel = { isRange: false, singleDate: { jsDate: transdate }, dateRange: null };
  this.transferForm.controls['transactiondate1'].setValue(fromModel);
}

this.transferForm.get("newIdName").setValue(obj.newName);
this.transferForm.controls['previousId'].setValue(obj.prevName);
this.transferForm.get("remark").setValue(obj.remark);

}


}
