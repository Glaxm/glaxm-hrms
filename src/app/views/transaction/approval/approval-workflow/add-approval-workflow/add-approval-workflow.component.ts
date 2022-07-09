import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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
  isView:boolean=false;
  holdingList: any = [];
  companyList:any=[];
  moduleList:any=[];
  parentUrl: any;
  submitted:boolean=false;
  statusList: any = [{ valueCode: 'ACTIVE', valueName: 'Active' }, { valueCode: 'INACTIVE', valueName: 'Inactive' }]
  constructor(private toastService:ToastrService,private approvalService:ApprovalService,private router:Router, private activatedRoute:ActivatedRoute) {
    this.approvalForm = new FormGroup({
      gApprovalwfId: new FormControl(null),
      gHoldingId: new FormControl(null),
      gCompanyId: new FormControl(null),
      isActive: new FormControl(null),
      status:new FormControl(null),
      created: new FormControl(null),
      createdBy: new FormControl(null),
      updated: new FormControl(null),
      updatedBy: new FormControl(null),
      name: new FormControl(null),
      code: new FormControl(null),
      description: new FormControl(null),
      moduleid: new FormControl(null)
  });

  this.approvalLevelForm= new FormGroup({
    gApprovallevelId: new FormControl(null),
    gApprovalwfId: new FormControl(null),
    gHoldingId: new FormControl(null),
    gCompanyId: new FormControl(null),
    isActive: new FormControl(null),
    responsibletype:new FormControl(null),
    created: new FormControl(null),
    createdBy: new FormControl(null),
    updated: new FormControl(null),
    updatedBy: new FormControl(null),
    name: new FormControl(null),
    description: new FormControl(null),
    moduleid: new FormControl(null),
    userid: new FormControl(null),
    valuemin: new FormControl(null),
    valuemax: new FormControl(null),
    action: new FormControl(null),
    levelno: new FormControl(null),
    isselfapprove: new FormControl(null),
    isvaluecheck: new FormControl(null),
  });
	
    this.activatedRoute.queryParams.subscribe(params => {
      this.approvalForm.controls['gApprovalwfId'].setValue(params.id);
      this.isView = params.view;
    });
   }

   get f() { return this.approvalForm.controls; }

   get f1() { return this.approvalLevelForm.controls; }

  //  this.moduleService.moduleDateTable().subscribe(s=>{
  //   this.moduleList = s;
  // })

  ngOnInit() {
    this.getHoldingList();
    this.getUserList();
    this.getModuleList();
    if(this.approvalForm.value.gApprovalwfId){
      this.isGeneralListValue=false;
      this.getApprovalLevelListById(this.approvalForm.value.gApprovalwfId);
      this.approvalService.getApprovalDetailsById(this.approvalForm.value.gApprovalwfId).subscribe(s=>{
        var success:any = s;
        this.approvalForm.patchValue(success.data);
        success.data.isActive == 'Y' ? this.approvalForm.get('status').setValue("ACTIVE") : this.approvalForm.get('status').setValue("INACTIVE");
        if (this.isView) { this.approvalForm.disable(); }
      });

      // this.getApprovalLevelListById(this.approvalForm.value.gApprovalwfId);
    } else {
      this.approvalForm.controls['isActive'].setValue('ACTIVE');
    }
  }
  getCOmpanyById(id) {
    this.approvalService.getCompanyById(id).subscribe(s=>{
      this.companyList=s;
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
    this.approvalForm.get('createdBy').setValue(sessionStorage.getItem('userId'));
    this.approvalForm.get('created').setValue(new Date());
    this.approvalForm.get('updatedBy').setValue(sessionStorage.getItem('userId'));
    this.approvalForm.get('updated').setValue(new Date());
    this.approvalForm.value.status=="ACTIVE" ? this.approvalForm.get('isActive').setValue('Y') : this.approvalForm.get('isActive').setValue('N');

    this.submitted = true;
    if (this.approvalForm.invalid) {
      return;
    } else {
      this.approvalService.saveUpdateApproval(this.approvalForm.value).subscribe(success=>{
        var s: any = success;
        this.submitted = false;
        this.toastService.showToast('success', s.message);
        this.router.navigate(['/views/transaction/approvals/add-approval'], { queryParams: { id: s.data.gApprovalwfId } });
      })
    }
  }

  back() {
      this.router.navigate(["/views/transaction/approvals/approval-summary"]);
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
    this.approvalLevelForm.controls['valuestatus'].setValue("ACTIVE");
    this.approvalLevelForm.controls['groupcode'].setValue(this.approvalForm.value.value);
  }

  editGeneralListValue(){ 
    this.approvalService.getApprovalLevelById(this.approvalLevelForm.value.gApprovallevelId).subscribe(s=>{
        // alert(JSON.stringify(success))
        var success:any = s;
        this.approvalLevelForm.patchValue(success.data);
        success.data.isActive == 'Y' ? this.approvalLevelForm.get('valuestatus').setValue("ACTIVE") : this.approvalLevelForm.get('valuestatus').setValue("INACTIVE");
       
    })
  }

  getDataUsingRedioBtn(data){
    // alert(JSON.stringify(data))
    this.approvalLevelForm.controls['gApprovallevelId'].setValue(data.gApprovallevelId);
  }

  deleteGeneralListValue(){ }

  getApprovalLevelListById(listId){
      this.approvalService.getApprovalLevelListById(listId).subscribe(s=>{
        this.approvalLevelList =s;
      });
  }

  getUserList(){
      this.approvalService.getUserList().subscribe(s=>{
        this.usersList =s;
      });
  }

  saveApprovalLevel(){
    this.approvalLevelForm.get('createdBy').setValue(sessionStorage.getItem('userId'));
    this.approvalLevelForm.get('created').setValue(new Date());
    this.approvalLevelForm.get('updatedBy').setValue(sessionStorage.getItem('userId'));
    this.approvalLevelForm.get('updated').setValue(new Date());

    this.approvalLevelForm.get('gHoldingId').setValue(this.approvalForm.value.gHoldingId);
    this.approvalLevelForm.get('gApprovalwfId').setValue(this.approvalForm.value.gApprovalwfId);
    this.approvalLevelForm.get('gCompanyId').setValue(this.approvalForm.value.gCompanyId);
    this.approvalLevelForm.value.valuestatus=="ACTIVE" ? this.approvalLevelForm.get('isActive').setValue('Y') : this.approvalLevelForm.get('isActive').setValue('N');

    this.approvalLevelForm.get('responsibletype').setValue('Y');
    this.approvalLevelForm.get('moduleid').setValue(this.approvalForm.value.moduleid);
    this.approvalLevelForm.get('action').setValue('Y');
    this.approvalLevelForm.get('isselfapprove').setValue('Y');
    this.approvalLevelForm.get('isvaluecheck').setValue('Y');

    this.submittedValue = true;
    if (this.approvalLevelForm.invalid) {
      return;
    } else {
      this.approvalService.saveUpdateApprovalLevel(this.approvalLevelForm.value).subscribe(success=>{
        var s: any = success;
        if(s.code==0){
          this.toastService.showToast('danger', s.message);
        } else{
        this.toastService.showToast('success', s.message);
       this.isGeneralListValue=false;
       this.getApprovalLevelListById(this.approvalForm.value.gApprovalwfId);
        }
      })
    }
  }



  

}
