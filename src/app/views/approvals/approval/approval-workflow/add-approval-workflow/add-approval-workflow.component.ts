import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { ToastrService } from 'src/app/views/services/toastr.service';
import { ApprovalService } from '../approval.service';

@Component({
  selector: 'app-add-approval-workflow',
  templateUrl: './add-approval-workflow.component.html',
  styleUrls: ['./add-approval-workflow.component.scss']
})
export class AddApprovalWorkflowComponent implements OnInit {

  approvalForm:FormGroup;
  approvalLevelForm:FormGroup;
  approvalEmailForm:FormGroup;
  isView:boolean=false;
  holdingList: any = [];
  companyList:any=[];
  moduleList:any=[];
  parentUrl: any;
  submitted:boolean=false;
  empobj={ employeeId:null };
  funobj={ xdivId:null };
  deptobj={ deptId:null };

     
  statusList: any = [{ valueCode: 'ACTIVE', valueName: 'Active' }, { valueCode: 'INACTIVE', valueName: 'Inactive' }]
  constructor(private toastService:ToastrService,private approvalService:ApprovalService,private router:Router, private activatedRoute:ActivatedRoute) {
    this.approvalForm = new FormGroup({
     gApprovalwfId: new FormControl(null),
      gHoldingId: new FormControl(0),
      gCompanyId: new FormControl(0),
      isActive: new FormControl(null),
      status:new FormControl(null),
      created: new FormControl(null),
      createdBy: new FormControl(0),
      updated: new FormControl(null),
      updatedBy: new FormControl(0),
      name: new FormControl(null),
      code: new FormControl(null),
      description: new FormControl(null),
      moduleid: new FormControl(0),
      dept: new FormControl(null),
      emp: new FormControl(null),
      function: new FormControl(null),
      divId: new FormControl(null),
      deptId: new FormControl(null),
      empId: new FormControl(null),
      prevempId:new FormControl(null)
  });

  this.approvalLevelForm= new FormGroup({
   gApprovallevelId: new FormControl(null),
    gApprovalwfId: new FormControl(null),
    gHoldingId: new FormControl(0),
    gCompanyId: new FormControl(0),
    isActive: new FormControl(null),
    status:new FormControl(null),
    responsibletype:new FormControl(null),
    created: new FormControl(null),
    createdBy: new FormControl(0),
    updated: new FormControl(null),
    updatedBy: new FormControl(0),
    name: new FormControl(null),
    description: new FormControl(null),
    moduleid: new FormControl(0),
    userid: new FormControl(0),
    valuemin: new FormControl(0),
    valuemax: new FormControl(0),
    action: new FormControl(null),
    levelno: new FormControl(0),
    isselfapprove: new FormControl(null),
    isvaluecheck: new FormControl(null),
  });

  this.approvalEmailForm= new FormGroup({
    xmailgrplineId: new FormControl(null),
    xmailgrpId: new FormControl(null),
    gHoldingId: new FormControl(null),
    isActive: new FormControl(null),
    status: new FormControl(null),
    created: new FormControl(null),
    createdBy:new FormControl(null),
    updated: new FormControl(null),
    updatedBy: new FormControl(null),
    mailId: new FormControl(null),
    recipientType: new FormControl(null),
    userId: new FormControl(null),
    gApprovalwfId: new FormControl(null)
  });
	
    this.activatedRoute.queryParams.subscribe(params => {
     this.approvalForm.controls['gApprovalwfId'].setValue(params.id);
      // debugger
      // this.approvalForm.get('gApprovalwfId').setValue(params.id);
      // gApprovalwfId
      
      this.isView = params.view;
    });
   }

   get f() { return this.approvalForm.controls; }

   get f1() { return this.approvalLevelForm.controls; }

  //  this.moduleService.moduleDateTable().subscribe(s=>{
  //   this.moduleList = s;
  // })
   tempempId:any=[];
  ngOnInit() {
    this.getHoldingList();
    this.getUserList();
    this.getModuleList();
    // this.getAllFunction();
    // this.getAllDept();
    this.deptSetting();
    this.functionSetting();
    this.empSetting();

    if(this.approvalForm.value.gApprovalwfId){
      this.isGeneralListValue=false;
      this.isApprovalEmail = false;
      this.getApprovalLevelListById(this.approvalForm.value.gApprovalwfId);
      this.getApprovalEmailListById(this.approvalForm.value.gApprovalwfId);
      this.approvalService.getApprovalDetailsById(this.approvalForm.value.gApprovalwfId).subscribe(s=>{
        var success:any = s;
        
        // this.empobj.employeeId = success.data.empId;
        // this.deptobj.deptId = success.data.deptId;
        // this.funobj.xdivId = success.data.divId;
        
        this.approvalForm.get('gCompanyId').setValue(success.data.gCompanyId);
      
        this.approvalForm.get('dept').setValue(success.data.deptIdwithname);
        this.approvalForm.get('function').setValue(success.data.divIdwithname);
        this.approvalForm.get('emp').setValue(success.data.empIdwithname); 
       
        this.tempempId = success.data.empId;
        this.selectedCompanyFun(success.data.gCompanyId);
        this.getemplbycompDeptid([success.data.gCompanyId],success.data.deptId,success.data.divId);
        this.approvalForm.patchValue(success.data);
        
        // success.data.deptIdwithname ? this.selectedDeptList.push(...success.data.deptIdwithname) : '';
        // success.data.divIdwithname ? this.selectedFunctionList.push(...success.data.divIdwithname) : '';
        // success.data.empIdwithname ? this.selectedEmpList.push(...success.data.empIdwithname) : '';
       
        success.data.isactive == 'Y' ? this.approvalForm.get('status').setValue("ACTIVE") : this.approvalForm.get('status').setValue("INACTIVE");
        if (this.isView) { this.approvalForm.disable(); }
      });

    } else {
      this.approvalForm.controls['status'].setValue('ACTIVE');
    }
  }
  getCOmpanyById(id) {
    this.approvalService.getCompanyById(id).subscribe(s=>{
      this.companyList=s;
      if(this.companyList){
        let list:any = JSON.parse(sessionStorage.getItem("company"));
        var l:any=[];
        if(list){
        for(var i=0;i<list.length;i++){
            l.push(Number(list[i]));
        }}
      
      this.companyList = this.companyList.filter(o1 => l.some(o2 => o1.gCompanyId === o2));
      if(this.approvalForm.value.gApprovalwfId){

      } else{
        // this.selectedCompanyFun(this.companyList[0].gCompanyId);
      }
    }
    });
  }

  getModuleList() {
    this.approvalService.getModuleList().subscribe(s=>{
      this.moduleList=s;
    });
  }

  getHoldingList() {
    this.approvalService.getAllHolding().subscribe(s=>{
      this.holdingList = s;
        this.approvalForm.controls['gHoldingId'].setValue(this.holdingList[0].gHoldingId);
        this.getCOmpanyById(this.holdingList[0].gHoldingId);
    })
  }

  addUpdateApproval(){
    this.approvalForm.get('createdBy').setValue(Number(sessionStorage.getItem('userId')));
    this.approvalForm.get('created').setValue(new Date());
    this.approvalForm.get('updatedBy').setValue(Number(sessionStorage.getItem('userId')));
    this.approvalForm.get('updated').setValue(new Date());
    this.approvalForm.get('gCompanyId').setValue(Number(this.approvalForm.value.gCompanyId));
    this.approvalForm.get('moduleid').setValue(Number(this.approvalForm.value.moduleid));
    this.approvalForm.value.status=="ACTIVE" ? this.approvalForm.get('isActive').setValue('Y') : this.approvalForm.get('isActive').setValue('N');

    let deptList: any = this.selectedDeptList!=null && this.selectedDeptList.length !=0 ? this.setDeptList(this.selectedDeptList) : [];
    this.approvalForm.controls['deptId'].setValue(deptList);

    let funList: any = this.selectedFunctionList!=null && this.selectedFunctionList.length!=0?this.setFunList(this.selectedFunctionList):[];
    this.approvalForm.controls['divId'].setValue(funList);
    
    let empList: any = this.selectedEmpList!=null && this.selectedEmpList.length!=0 ? this.setEmpList(this.selectedEmpList):[];
    this.approvalForm.controls['empId'].setValue(empList);

    
    if(this.approvalForm.value.gApprovalwfId){
      this.approvalForm.controls['prevempId'].setValue(this.tempempId);
    } else{
      this.approvalForm.controls['prevempId'].setValue([]);
    }
     

    this.submitted = true;
    if (this.approvalForm.invalid) {
      return;
    } else {
      this.approvalService.saveUpdateApproval(this.approvalForm.value).subscribe(success=>{
        var s: any = success;
        this.submitted = false;
        this.toastService.showToast('success', s.message);
        this.approvalForm.get('code').enable();
        this.approvalForm.get('code').setValue(s.data.code);
        this.approvalForm.get('code').disable();
        this.router.navigate(['/views/approval-flow/approvals/add-approval'], { queryParams: { id: s.data.gApprovalwfId } });
      })
    }
  }

  back() {
      this.router.navigate(["/views/approval-flow/approvals/approval-summary"]);
  }


  setDeptList(list) {
    let elm: any = [];
    list.forEach(element => {
      elm.push(element.deptId);
    });
    let unique = [...new Set(elm)];
    return unique;
  }

  setFunList(list) {
    let elm: any = [];
    list.forEach(element => {
      elm.push(element.xdivId | element.divId);
    });
    let unique = [...new Set(elm)];
    return unique;
  }

  setEmpList(list) {
    let elm: any = [];
    if(list){
      list.forEach(element => {
        elm.push(element.employeeId);
      });
    } else{ elm=[];}
    let unique = [...new Set(elm)];
    return unique;
  }

  selectedCompanyFun(CompanyId){
 // debugger
    let companyid = typeof CompanyId !='number' ? [Number(this.approvalForm.value.gCompanyId)] : [this.approvalForm.value.gCompanyId];
    let depList =this.selectedDeptList!= null &&  this.selectedDeptList.length!= 0 ? this.setDeptList(this.selectedDeptList):[];
    let funList =  this.selectedFunctionList!=null &&this.selectedFunctionList.length!=0 ? this.setFunList(this.selectedFunctionList):[];

    this.getemplbycompDeptid(companyid,depList,funList);
    this.getAllDept();
    this.getAllFunction();
  }

  // ---------------------------------------------------------------------------------------------------------

  isGeneralListValue:boolean=false;
  
  enableFilter:boolean = false;
  approvalLevelList: any=[];
  submittedValue:boolean=false;
  usersList:any=[];
  

  addGeneralListValue(){ 
    this.approvalLevelForm.reset();
    this.isGeneralListValue = true;
    this.approvalLevelList.length > 0 ?  this.approvalLevelForm.controls['levelno'].setValue(this.approvalLevelList.length+1) :  this.approvalLevelForm.controls['levelno'].setValue(1);
    this.approvalLevelForm.controls['status'].setValue("ACTIVE");
    // this.approvalLevelForm.controls['groupcode'].setValue(this.approvalForm.value.value);
  }

  editGeneralListValue(){ 
    this.approvalService.getApprovalLevelById(this.approvalLevelForm.value.gApprovallevelId).subscribe(s=>{
        
        var success:any = s;
        success.data.isActive == 'Y' ? this.approvalLevelForm.get('status').setValue("ACTIVE") : this.approvalLevelForm.get('status').setValue("INACTIVE");
        this.approvalLevelForm.patchValue(success.data);
        
       
    })
  }

  getDataUsingRedioBtn(data){
   
    this.approvalLevelForm.controls['gApprovallevelId'].setValue(data.gApprovallevelId);
  }

  deleteGeneralListValue(){ }

  getApprovalLevelListById(listId){
      this.approvalService.getApprovalLevelListById(listId).subscribe(s=>{
        var data:any=s;
        this.approvalLevelList =data.data;

      });
  }

  getUserList(){
      this.approvalService.getUserList().subscribe(s=>{
        this.usersList =s;
      });
  }

  saveApprovalLevel(){
    this.approvalLevelForm.get('createdBy').setValue(Number(sessionStorage.getItem('userId')));
    this.approvalLevelForm.get('created').setValue(new Date());
    this.approvalLevelForm.get('updatedBy').setValue(Number(sessionStorage.getItem('userId')));
    this.approvalLevelForm.get('updated').setValue(new Date());

    this.approvalLevelForm.get('gHoldingId').setValue(Number(this.approvalForm.value.gHoldingId));
    this.approvalLevelForm.get('gApprovalwfId').setValue(Number(this.approvalForm.value.gApprovalwfId));
    this.approvalLevelForm.get('gCompanyId').setValue(Number(this.approvalForm.value.gCompanyId));
    this.approvalLevelForm.value.status=="ACTIVE" ? this.approvalLevelForm.get('isActive').setValue('Y') : this.approvalLevelForm.get('isActive').setValue('N');
   
    this.approvalLevelForm.get('userid').setValue(Number(this.approvalLevelForm.value.userid));
    this.approvalLevelForm.get('valuemin').setValue(Number(0));
    this.approvalLevelForm.get('valuemax').setValue(Number(0));

    this.approvalLevelForm.get('responsibletype').setValue('Y');
    this.approvalLevelForm.get('moduleid').setValue(Number(this.approvalForm.value.moduleid));
    this.approvalLevelForm.get('action').setValue('Y');
    this.approvalLevelForm.get('isselfapprove').setValue('Y');
    this.approvalLevelForm.get('isvaluecheck').setValue('Y');
    
      
      if (this.approvalLevelForm.value.gApprovallevelId){
        this.approvalLevelForm.get('gApprovallevelId').setValue(Number(this.approvalLevelForm.value.gApprovallevelId));
      }
      else {
        this.approvalLevelForm.get('gApprovallevelId').setValue(undefined);
      }

    this.submittedValue = true;
    if (this.approvalLevelForm.invalid) {
      return;
    } else {
      this.approvalService.saveUpdateApprovalLevel(this.approvalLevelForm.value).subscribe(success=>{
        var s: any = success;
        this.toastService.showToast('success', s.message);
       this.isGeneralListValue=false;
       
       this.getApprovalLevelListById(this.approvalForm.value.gApprovalwfId);
      })
    }
  }


// ========================================= Approval Email

isApprovalEmail:boolean=false;
approvalEmailList: any=[];
recipientTypeList:any =[{id:"TO",name:"TO"},{id:"CC",name:"CC"},{id:"BCC",name:"BCC"}]

getApprovalEmailListById(listId){
  this.approvalService.getApprovalEmailListById(listId).subscribe(s=>{
    this.approvalEmailList =s;
  });
}

selectUser(userId){
    if(userId){
      let filterData = this.usersList.filter(data=>data.userId==userId);
      this.approvalEmailForm.controls['mailId'].setValue(filterData[0].email);
    }
}

addApprovalEmail(){ 
  this.approvalEmailForm.reset();
  this.isApprovalEmail = true;
  this.approvalEmailForm.controls['status'].setValue("ACTIVE");
  this.approvalEmailForm.controls['recipientType'].setValue("TO");
}

editApprovalEmail(){ 
  this.approvalService.getApprovalEmailById(this.approvalEmailForm.value.xmailgrplineId).subscribe(s=>{
      var success:any = s;
      this.approvalEmailForm.patchValue(success.data);
      success.data.isActive == 'Y' ? this.approvalEmailForm.get('status').setValue("ACTIVE") : this.approvalEmailForm.get('status').setValue("INACTIVE");
     
  })
}

getApprovalEmailRadioBtn(data){
  this.approvalEmailForm.controls['xmailgrplineId'].setValue(data.xmailgrplineId);
}

addUpdateApprovalEmail(){
  this.approvalEmailForm.get('createdBy').setValue(Number(sessionStorage.getItem('userId')));
  this.approvalEmailForm.get('created').setValue(new Date());
  this.approvalEmailForm.get('updatedBy').setValue(Number(sessionStorage.getItem('userId')));
  this.approvalEmailForm.get('updated').setValue(new Date());
  this.approvalEmailForm.get('userId').setValue(Number(this.approvalEmailForm.value.userId));
  this.approvalEmailForm.get('gHoldingId').setValue(Number(this.approvalForm.value.gHoldingId));
  this.approvalEmailForm.get('gApprovalwfId').setValue(Number(this.approvalForm.value.gApprovalwfId));
  this.approvalEmailForm.value.status=="ACTIVE" ? this.approvalEmailForm.get('isActive').setValue('Y') : this.approvalEmailForm.get('isActive').setValue('N');
  
  if (this.approvalEmailForm.value.xmailgrplineId){
      this.approvalEmailForm.get('xmailgrplineId').setValue(Number(this.approvalEmailForm.value.xmailgrplineId));
  }else {
      this.approvalEmailForm.get('xmailgrplineId').setValue(undefined);
      this.approvalEmailForm.get('xmailgrpId').setValue(undefined);
      
  }

  // this.submittedValue = true;
  // if (this.approvalLevelForm.invalid) {
  //   return;
  // } else {
    this.approvalService.saveUpdateApprovalEmail(this.approvalEmailForm.value).subscribe(success=>{
      var s: any = success;
      this.toastService.showToast('success', s.message);
     this.isApprovalEmail=false;
     this.getApprovalEmailListById(this.approvalForm.value.gApprovalwfId);
    })
  // }    
}

checkNumber(data){

}


// -------------------

functionList:any=[];
deptList:any=[];
empList:any=[];
  //////////////////// multi select - function////////////////////

  getAllFunction(){
    // let list:any =JSON.parse(sessionStorage.getItem("company"));
   
    let compid = this.approvalForm.value.gCompanyId;

    var l:any=[typeof compid == 'number' ? compid : Number(compid)];
    
      this.approvalService.getAllFunction(l).subscribe(s=>{
          this.functionList = s;

          // if(this.approvalForm.value.gApprovalwfId){
          //   this.selectedFunctionList = this.functionList.filter(o1 => this.funobj.xdivId.some(o2 => o1.xdivId === o2));
          // }
      });
  }

  selectedFunctionList = [];
  dropdownFunctionSettings: IDropdownSettings;

  functionSetting() {
    this.dropdownFunctionSettings = {
      singleSelection: false,
      idField: 'xdivId',
      textField: 'name',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };
  }
 
  onFunctionSelect(item: any) {
    this.selectedFunctionList.push(item);
   // alert(this.approvalForm.value.gCompanyId)
    this.selectedCompanyFun(this.approvalForm.value.gCompanyId);
  }

  onFunctionDeSelect(items: any) {
    this.selectedFunctionList = this.selectedFunctionList.filter(item => item.gCompanyId !== items.gCompanyId);
    this.selectedCompanyFun(this.approvalForm.value.gCompanyId);
  }

  onSelectAllFunction(items: any) {
    this.selectedFunctionList = [];
    this.selectedFunctionList.push(...items);
   // alert(this.approvalForm.value.gCompanyId)
    this.selectedCompanyFun(this.approvalForm.value.gCompanyId);
  }

//////////////////// multi select - dept////////////////////

selectedDeptList = [];
dropdownDeptSettings: IDropdownSettings;

deptSetting() {
  this.dropdownDeptSettings = {
    singleSelection: false,
    idField: 'deptId',
    textField: 'name',
    selectAllText: 'Select All',
    unSelectAllText: 'UnSelect All',
    itemsShowLimit: 3,
    allowSearchFilter: true
  };
}

getAllDept(){
    // let list:any =JSON.parse(sessionStorage.getItem("company"));

    let compid = this.approvalForm.value.gCompanyId;

    var l:any=[typeof compid == 'number' ? compid : Number(compid)];
    // for(var i=0;i<list.length;i++){
    //  l.push(Number(list[i]));
    // }
 

      this.approvalService.getAllDept(l).subscribe(s=>{
          this.deptList = s;
          // if(this.approvalForm.value.gApprovalwfId){
          //   this.selectedDeptList = this.functionList.filter(o1 => this.deptobj.deptId.some(o2 => o1.deptId === o2));
          // }
      });
}

onDeptSelect(item: any) {
  this.selectedDeptList.push(item);
  this.selectedCompanyFun(this.approvalForm.value.gCompanyId);
}

onDeptDeSelect(items: any) {
  this.selectedDeptList = this.selectedDeptList.filter(item => item.gCompanyId !== items.gCompanyId);
  this.selectedCompanyFun(this.approvalForm.value.gCompanyId);
}

onSelectAllDept(items: any) {
  this.selectedDeptList = [];
  this.selectedDeptList.push(...items);
  this.selectedCompanyFun(this.approvalForm.value.gCompanyId);
}

//////////////////// multi select - employee////////////////////

selectedEmpList = [];
dropdownEmpSettings: IDropdownSettings;

empSetting() {
  this.dropdownEmpSettings = {
    singleSelection: false,
    idField: 'employeeId',
    textField: 'displayName',
    selectAllText: 'Select All',
    unSelectAllText: 'UnSelect All',
    itemsShowLimit: 3,
    allowSearchFilter: true
  };
}

getemplbycompDeptid(company,dept,func){
  let data ={
    "eligibleforCompany":company ? company : [],
    "eligiblefordept":dept ? dept : [],
    "eligiblefordiv":func ? func : []
  };
  this.approvalService.getemplbycompDeptid(data).subscribe(data=>{
      this.empList=data;
      // if(this.approvalForm.value.gApprovalwfId){
      //   this.selectedEmpList = this.empList.filter(o1 => this.empobj.employeeId.some(o2 => o1.employeeId === o2));
      // }
  });
}

onEmpSelect(item: any) {
  this.selectedEmpList.push(item);
}

onEmpDeSelect(items: any) {
  this.selectedEmpList = this.selectedEmpList.filter(item => item.employeeId !== items.employeeId);
}

onSelectAllEmp(items: any) {
  this.selectedEmpList = [];
  this.selectedEmpList.push(...items);
//  alert(JSON.stringify(this.selectedEmpList))
}




  

}
