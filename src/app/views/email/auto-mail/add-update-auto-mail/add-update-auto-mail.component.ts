import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { GenerallistService } from 'src/app/views/masters/generallist/generallist.service';
import { ToastrService } from 'src/app/views/services/toastr.service';
import { AutoMailService } from '../auto-mail.service';

@Component({
  selector: 'app-add-update-auto-mail',
  templateUrl: './add-update-auto-mail.component.html',
  styleUrls: ['./add-update-auto-mail.component.scss']
})
export class AddUpdateAutoMailComponent implements OnInit {

  // DECLARATION EMAIL GROUP
  mailgroupForm:FormGroup;
  holdingList:any =[];
  submitted:any;
  isView:boolean=false;
  companyList:any =[];
  selectedCompanyList = [];
  companySettings: IDropdownSettings;
  sponsorList:any=[];
  selectedSponsorList = [];
  sponsorSettings: IDropdownSettings;
  deptList:any =[];
  selectedDeptList = [];
  deptSettings: IDropdownSettings;
  shiftList:any=[];
  selectedShiftList = [];
  shiftSettings: IDropdownSettings;
  
  // DECLARATION EMAIL LINES
  maillineForm: FormGroup;
  MAILLINE_ENUM = { MAILLINES_SUMMARY:0 };
  mailLineList:any=[];
  userList:any=[];

  // SET DEFAULT VALUE
  frequencyList:any=[{ id: 'DAILY', name: 'Daily' },{ id: 'MONTHLY', name: 'Monthly' },{ id: 'YEARLY', name: 'Yearly' }];
  statusList: any = [{ valueCode: 'ACTIVE', valueName: 'Active' }, { valueCode: 'INACTIVE', valueName: 'Inactive' }]
  recipientTypeList:any =[{id:"TO",name:"TO"},{id:"CC",name:"CC"},{id:"BCC",name:"BCC"}];

  constructor(private toastService:ToastrService,private autoMailService:AutoMailService,private router:Router, private activatedRoute:ActivatedRoute) {
    this.mailgroupForm = new FormGroup({
        xmailgrpId: new FormControl(null),
        gHoldingId: new FormControl(null),
        status: new FormControl(null),
        isActive: new FormControl(null),
        created: new FormControl(null),
        createdBy: new FormControl(null),
        updated: new FormControl(null),
        updatedBy: new FormControl(null),
        name: new FormControl(null),
        grpCode: new FormControl(null),
        description: new FormControl(null),
        frequency: new FormControl(null),
        company: new FormControl(null),
        companyId: new FormControl(null),
        dept: new FormControl(null),
        deptId: new FormControl(null),
        sponsor: new FormControl(null),
        sponsorId: new FormControl(null),
        shift: new FormControl(null),
        shiftId: new FormControl(null)
    });

      this.maillineForm = new FormGroup({
        xmailgrplineId: new FormControl(null),
        xmailgrpId: new FormControl(null),
        gHoldingId: new FormControl(null),
        g_HOLDING: new FormControl(null),
        status: new FormControl(null),
        isActive: new FormControl(null),
        created: new FormControl(null),
        createdBy: new FormControl(null),
        updated: new FormControl(null),
        updatedBy: new FormControl(null),
        mailId: new FormControl(null),
        recipientType: new FormControl(null),
        userId: new FormControl(null),
        gApprovalwfId: new FormControl(null),
    });

    this.activatedRoute.queryParams.subscribe(params => {
      this.mailgroupForm.controls['xmailgrpId'].setValue(params.id);
      this.isView = params.view;
    });
}

   get f() { return this.mailgroupForm.controls; }

  ngOnInit() {

    this.companyMultiselctSetting();
    this.deptMultiselctSetting();
    this.shiftMultiselctSetting();
    this.sponsorMultiselctSetting();
    this.getHoldingList();

    if(this.mailgroupForm.value.xmailgrpId){
        this.getAutoMailHeaderByXmailgrpId(this.mailgroupForm.value.xmailgrpId);
        this.getAutoMailLinesSummaryByXmailGroupId(this.mailgroupForm.value.xmailgrpId);
    } else{
      this.mailgroupForm.controls['frequency'].setValue('D');
      this.mailgroupForm.controls['status'].setValue('ACTIVE');
    }
  }

  getDataByComapnyID(companyId){
    let compid = companyId!= null &&  companyId.length!= 0 ? this.setCompanyList(companyId):[];  
    this.getDeptDataByComapnyID(compid);
    this.getShiftDataByComapnyID(compid);
    this.getSponsorDataByComapnyID(compid);
  }


  saveMailAuto(){
    this.mailgroupForm.get('createdBy').setValue(Number(sessionStorage.getItem('userId')));
    this.mailgroupForm.get('created').setValue(new Date());
    this.mailgroupForm.get('updatedBy').setValue(Number(sessionStorage.getItem('userId')));
    this.mailgroupForm.get('updated').setValue(new Date());
    this.mailgroupForm.value.status=="ACTIVE" ? this.mailgroupForm.controls['isActive'].setValue('Y') : this.mailgroupForm.controls['isActive'].setValue('N');  

    let compid = this.selectedCompanyList!= null &&  this.selectedCompanyList.length!= 0 ? this.setCompanyList(this.selectedCompanyList):[];
    let deptid = this.selectedDeptList!= null &&  this.selectedDeptList.length!= 0 ? this.setDeptList(this.selectedDeptList):[];
    let sponsorid = this.selectedSponsorList!= null && this.selectedSponsorList.length!= 0 ? this.setSponsorList(this.selectedSponsorList):[];
    let shiftid = this.selectedShiftList!= null &&  this.selectedShiftList.length!= 0 ? this.setShiftList(this.selectedShiftList):[];

    this.mailgroupForm.get('companyId').setValue(compid);
    this.mailgroupForm.get('deptId').setValue(deptid);
    this.mailgroupForm.get('sponsorId').setValue(sponsorid);
    this.mailgroupForm.get('shiftId').setValue(shiftid);

    if(this.mailgroupForm.value.xmailgrpId){
      this.mailgroupForm.controls['xmailgrpId'].setValue(this.mailgroupForm.value.xmailgrpId);
    } else{
      this.mailgroupForm.controls['xmailgrpId'].setValue(undefined);
    }
   
    this.saveAutoMailHeader(this.mailgroupForm.value);


  }


  back(){
    this.router.navigate(['/views/email/auto-mail/auto-mail-summary']);
  }

  // MAIL LINES

  addMailLines(){ 
    this.MAILLINE_ENUM.MAILLINES_SUMMARY=1;
    this.maillineForm.controls['status'].setValue('ACTIVE');
    this.getAllUser();
  }

  editMailLines(){
    this.getAllUser();
    if(this.maillineForm.value.xmailgrplineId){
      this.getAutoMailLineByXmailgrplineId(this.maillineForm.value.xmailgrplineId);
    }
  }

  selectUser(userId){
    let userData= this.userList.filter(data=>data.userId==userId);
     if(userData){
        this.maillineForm.controls['mailId'].setValue(userData[0].email);
     }
  }

  getMailLineRowData(data){
      this.maillineForm.controls['xmailgrplineId'].setValue(data.xmailgrplineId);
  }

  saveMailLine(){
    this.maillineForm.get('createdBy').setValue(Number(sessionStorage.getItem('userId')));
    this.maillineForm.get('created').setValue(new Date());
    this.maillineForm.get('updatedBy').setValue(Number(sessionStorage.getItem('userId')));
    this.maillineForm.get('updated').setValue(new Date());
    this.maillineForm.value.status=="ACTIVE" ? this.maillineForm.controls['isActive'].setValue('Y') : this.maillineForm.controls['isActive'].setValue('N');  
    if(typeof this.mailgroupForm.value.xmailgrpId=='string'){
      this.maillineForm.controls['xmailgrpId'].setValue(Number(this.mailgroupForm.value.xmailgrpId));
    }else{
      this.maillineForm.controls['xmailgrpId'].setValue(this.mailgroupForm.value.xmailgrpId);
    }
    
    
    if(this.maillineForm.value.xmailgrplineId){
    } else{
      this.maillineForm.controls['xmailgrplineId'].setValue(undefined);
    }

    (typeof this.maillineForm.value.userId == 'string') ? this.maillineForm.controls['userId'].setValue(Number(this.maillineForm.value.userId)) : null;
    this.saveAutoMailLine(this.maillineForm.value);
  }

  cancelMailLine(){
    this.MAILLINE_ENUM.MAILLINES_SUMMARY=0;
  }

  // COMPANY MULTISELECT LIST

  companyMultiselctSetting() {
    this.companySettings = {
      singleSelection: false,
      idField: 'gCompanyId',
      textField: 'name',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };
  }
  
  setCompanyList(list) {
    let elm: any = [];
    list.forEach(element => {
      elm.push(element.gCompanyId);
    });
    let unique = [...new Set(elm)];
    return unique;
  }

  onCompnaySelect(item: any) {
    this.selectedCompanyList.push(item);
    this.getDataByComapnyID(this.selectedCompanyList);
  }

  onCompanyDeSelect(items: any) {
    this.selectedCompanyList = this.selectedCompanyList.filter(item => item.gCompanyId !== items.gCompanyId);
    this.getDataByComapnyID(this.selectedCompanyList);
  }

  onSelectAllCompnay(items: any) {
    this.selectedCompanyList = [];
    this.selectedCompanyList.push(...items);
    this.getDataByComapnyID(this.selectedCompanyList);
  }

  // SPONSOR MULTISELECT LIST

  sponsorMultiselctSetting() {
    this.sponsorSettings = {
      singleSelection: false,
      idField: 'xvisasponsorId',
      textField: 'name',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };
  }
  
  setSponsorList(list) {
    let elm: any = [];
    list.forEach(element => {
      elm.push(element.xvisasponsorId);
    });
    let unique = [...new Set(elm)];
    return unique;
  }

  onSponsorSelect(item: any) {
    this.selectedSponsorList.push(item);
  }

  onSponsorDeSelect(items: any) {
    this.selectedSponsorList = this.selectedSponsorList.filter(item => item.xvisasponsorId !== items.xvisasponsorId);
  }

  onSelectAllSponsor(items: any) {
    this.selectedSponsorList = [];
    this.selectedSponsorList.push(...items);
  }

    // DEPARTMENT MULTISELECT LIST

    deptMultiselctSetting() {
      this.deptSettings = {
        singleSelection: false,
        idField: 'deptId',
        textField: 'name',
        selectAllText: 'Select All',
        unSelectAllText: 'UnSelect All',
        itemsShowLimit: 3,
        allowSearchFilter: true
      };
    }
    
    setDeptList(list) {
      let elm: any = [];
      list.forEach(element => {
        elm.push(element.deptId);
      });
      let unique = [...new Set(elm)];
      return unique;
    }
  
    onDeptSelect(item: any) {
      this.selectedDeptList.push(item);
    }
  
    onDeptDeSelect(items: any) {
      this.selectedDeptList = this.selectedDeptList.filter(item => item.deptId !== items.deptId);
    }
  
    onSelectAllDept(items: any) {
      this.selectedDeptList = [];
      this.selectedDeptList.push(...items);
    }
  
  // SHIFT MULTISELECT LIST

  shiftMultiselctSetting() {
    this.shiftSettings = {
      singleSelection: false,
      idField: 'shiftRuleId',
      textField: 'name',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };
  }
  
  setShiftList(list) {
    let elm: any = [];
    list.forEach(element => {
      elm.push(element.shiftRuleId);
    });
    let unique = [...new Set(elm)];
    return unique;
  }

  onShiftSelect(item: any) {
    this.selectedShiftList.push(item);
  }

  onShiftDeSelect(items: any) {
    this.selectedShiftList = this.selectedShiftList.filter(item => item.shiftRuleId !== items.shiftRuleId);
  }

  onSelectAllShift(items: any) {
    this.selectedShiftList = [];
    this.selectedShiftList.push(...items);
  }
  // SERVICE METHOD CALLED FOR COMMUNICATE WITH BACKEND API

  getHoldingList(){
    this.autoMailService.getHoldingList().subscribe(success=>{  
      this.holdingList = success ? success : [];
      if(this.holdingList){
        this.mailgroupForm.get('gHoldingId').setValue(this.holdingList[0].gHoldingId);
        this.getCompanyListByHoldingId(this.holdingList[0].gHoldingId);
      }
    });
  }
  
  getCompanyListByHoldingId(holdingId){
    this.autoMailService.getCompanyListByHoldingId(holdingId).subscribe(success=>{
        this.companyList = success ? success : [];
    });
  }

  getAllUser(){
    this.autoMailService.getAllUser().subscribe(success=>{
        this.userList = success;
    })
  }

  getSponsorDataByComapnyID(company){
      this.autoMailService.getSponsorDataByComapnyID(company).subscribe(success=>{
          this.sponsorList = success;    
      });
  }

  getDeptDataByComapnyID(company){
      this.autoMailService.getDeptDataByComapnyID(company).subscribe(success=>{
        this.deptList = success;
      })
  }
  getShiftDataByComapnyID(company){
    this.autoMailService.getShiftDataByComapnyID(company).subscribe(success=>{
      this.shiftList = success;
    })
  }

  saveAutoMailHeader(data){
    this.autoMailService.saveAutoMail(data).subscribe(success=>{
        var data:any = success;
        if(data.code==1){
          this.toastService.showToast('success',data.message);
          this.router.navigate(['/views/email/auto-mail/add-update-auto-mail'],{queryParams:{id:data.data.xmailgrpId}})
        }
    });
  }

  getAutoMailHeaderByXmailgrpId(id){
    this.autoMailService.getAutoMailHeaderByXmailgrpId(id).subscribe(success=>{
        var data:any = success;
        if(data.data){
          this.mailgroupForm.get('company').setValue(data.data.compIdwithname);
          this.mailgroupForm.get('dept').setValue(data.data.deptIdwithname);
          this.mailgroupForm.get('sponsor').setValue(data.data.sponsorIdwithname);
          this.mailgroupForm.get('shift').setValue(data.data.shiftIdwithname);

          this.mailgroupForm.patchValue(data.data);

          data.data.isActive == 'Y' ? this.mailgroupForm.get('status').setValue("ACTIVE") : this.mailgroupForm.get('status').setValue("INACTIVE");
          if (this.isView) { this.mailgroupForm.disable(); }
        }
    });
  }

  saveAutoMailLine(data){
    this.autoMailService.saveAutoMailLine(data).subscribe(success=>{
      var data:any = success;
      if(data.code==1){
        this.toastService.showToast('success',data.message);
        this.MAILLINE_ENUM.MAILLINES_SUMMARY=0;
        this.getAutoMailLinesSummaryByXmailGroupId(this.mailgroupForm.value.xmailgrpId);
      }
  });
  }

  getAutoMailLinesSummaryByXmailGroupId(id){
    this.autoMailService.getAutoMailLinesSummaryByXmailGroupId(id).subscribe(success=>{
      var data:any = success;
      if(data.data){
        this.mailLineList = data.data;
      }
    })
  }

  getAutoMailLineByXmailgrplineId(id){
    this.autoMailService.getAutoMailLineByXmailgrplineId(id).subscribe(success=>{
      var data:any = success;
      if(data.data){
        this.MAILLINE_ENUM.MAILLINES_SUMMARY=1;
        this.maillineForm.patchValue(data.data);
        data.data.isActive == 'Y' ? this.maillineForm.get('status').setValue("ACTIVE") : this.maillineForm.get('status').setValue("INACTIVE");
        if (this.isView) { this.maillineForm.disable(); }
      }
    });    
  }
}
