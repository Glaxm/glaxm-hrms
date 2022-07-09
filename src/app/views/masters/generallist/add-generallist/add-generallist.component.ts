import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'src/app/views/services/toastr.service';
import { GenerallistService } from '../generallist.service';

@Component({
  selector: 'app-add-generallist',
  templateUrl: './add-generallist.component.html',
  styleUrls: ['./add-generallist.component.scss']
})
export class AddGenerallistComponent implements OnInit {
  generallistForm:FormGroup;
  generalListValueForm:FormGroup;
  isView:boolean=false;
  holdingList: any = [];
  companyList:any=[];
  parentUrl: any;
  submitted:boolean=false;
  statusList: any = [{ valueCode: 'ACTIVE', valueName: 'Active' }, { valueCode: 'INACTIVE', valueName: 'Inactive' }]
  constructor(private toastService:ToastrService,private generallistService:GenerallistService,private router:Router, private activatedRoute:ActivatedRoute) {
    this.generallistForm = new FormGroup({
      lListcodeId: new FormControl(null),
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
      value: new FormControl(null),
  });

  this.generalListValueForm= new FormGroup({
    lListcodeId: new FormControl(null),
    lListitemId: new FormControl(null),
    gHoldingId: new FormControl(null),
    gCompanyId: new FormControl(null),
    isActive: new FormControl(null),
    valuestatus:new FormControl(null),
    created: new FormControl(null),
    createdBy: new FormControl(null),
    updated: new FormControl(null),
    updatedBy: new FormControl(null),
    name: new FormControl(null),
    listValueName: new FormControl(null),
    listvalue: new FormControl(null),
    value: new FormControl(null),
    groupcode: new FormControl(null),
  });
	
    this.activatedRoute.queryParams.subscribe(params => {
      this.generallistForm.controls['lListcodeId'].setValue(params.id);
      this.isView = params.view;
    });
   }

   get f() { return this.generallistForm.controls; }

   get f1() { return this.generalListValueForm.controls; }

  ngOnInit() {
    this.getHoldingList();
    if(this.generallistForm.value.lListcodeId){
      this.isGeneralListValue=false;
      this.getGeneralListValueListById(this.generallistForm.value.lListcodeId);
      this.generallistService.getGenerallistDetailsById(this.generallistForm.value.lListcodeId).subscribe(s=>{
        var success:any = s;
        if(success.code==0){
          this.toastService.showToast('danger', success.message);
        } else{
        this.generallistForm.patchValue(success.data);
        success.data.isActive == 'Y' ? this.generallistForm.get('status').setValue("ACTIVE") : this.generallistForm.get('status').setValue("INACTIVE");
        if (this.isView) { this.generallistForm.disable(); }
      }
      });

      // this.getGeneralListValueListById(this.generallistForm.value.lListcodeId);
    } else {
      this.generallistForm.controls['isActive'].setValue('ACTIVE');
    }
  }

  getHoldingList() {
    this.generallistService.getAllHolding().subscribe(s=>{
      this.holdingList = s;
        this.generallistForm.controls['gHoldingId'].setValue(this.holdingList[0].gHoldingId);
    })
  }

  addUpdateGenerallist(){
    this.generallistForm.get('createdBy').setValue(Number(sessionStorage.getItem('userId')));
    this.generallistForm.get('created').setValue(new Date());
    this.generallistForm.get('updatedBy').setValue(Number(sessionStorage.getItem('userId')));
    this.generallistForm.get('updated').setValue(new Date());
    this.generallistForm.value.status=="ACTIVE" ? this.generallistForm.get('isActive').setValue('Y') : this.generallistForm.get('isActive').setValue('N');
     
    this.generallistForm.get('gCompanyId').setValue(null);

    this.submitted = true;
    if (this.generallistForm.invalid) {
      return;
    } else {
      this.generallistService.saveUpdateGenerallist(this.generallistForm.value).subscribe(success=>{
        var s: any = success;
        this.submitted = false;
        this.toastService.showToast('success', s.message);
        this.router.navigate(['/views/masters/generallist/add-generallist'], { queryParams: { id: s.data.lListcodeId ,log:Math.random()} });
      })
    }
  }

  back() {
      this.router.navigate(["/views/masters/generallist/generallist-summary"]);
  }


  // ---------------------------------------------------------------------------------------------------------

  isGeneralListValue:boolean=false;
  enableFilter:boolean = false;
  generalListValueList: any;
  submittedValue:boolean=false;

  

  addGeneralListValue(){ 
    this.generalListValueForm.reset();
    this.isGeneralListValue = true;
    this.generalListValueForm.controls['valuestatus'].setValue("ACTIVE");
    this.generalListValueForm.controls['lListitemId'].setValue(undefined);
    this.generalListValueForm.controls['groupcode'].setValue(this.generallistForm.value.value);
    this.generalListValueForm.get('listValueName').setValue(this.generallistForm.value.name);
         this.generalListValueForm.get('listvalue').setValue(this.generallistForm.value.value);
  }

  editGeneralListValue(){ 
    this.generallistService.getListValueById(this.generalListValueForm.value.lListitemId).subscribe(s=>{
        // alert(JSON.stringify(success))
        var success:any = s;
        this.generalListValueForm.patchValue(success.data);
        this.generalListValueForm.get('listValueName').setValue(success.data.name);
         this.generalListValueForm.get('listvalue').setValue(success.data.value);
        success.data.isActive == 'Y' ? this.generalListValueForm.get('valuestatus').setValue("ACTIVE") : this.generalListValueForm.get('valuestatus').setValue("INACTIVE");
       
    })
  }

  getDataUsingRedioBtn(data){
    // alert(JSON.stringify(data))
    this.generalListValueForm.controls['lListitemId'].setValue(Number(data.lListitemId));
  }

  deleteGeneralListValue(){ }

  getGeneralListValueListById(listId){
      this.generallistService.getGeneralListValueListById(listId).subscribe(s=>{
    
        this.generalListValueList =s;
      });
  }

  saveGeneralListValue(){
    this.generalListValueForm.get('createdBy').setValue(Number(sessionStorage.getItem('userId')));
    this.generalListValueForm.get('created').setValue(new Date());
    this.generalListValueForm.get('updatedBy').setValue(Number(sessionStorage.getItem('userId')));
    this.generalListValueForm.get('updated').setValue(new Date());

    if(this.generalListValueForm.value.listValueName){
    this.generalListValueForm.get('name').setValue(this.generalListValueForm.value.listValueName);
    }

    if(this.generalListValueForm.value.listvalue){
      this.generalListValueForm.get('value').setValue(this.generalListValueForm.value.listvalue);
    }

    this.generalListValueForm.get('gHoldingId').setValue(this.generallistForm.value.gHoldingId);
    this.generalListValueForm.get('lListcodeId').setValue(Number(this.generallistForm.value.lListcodeId));

    this.generalListValueForm.get('gCompanyId').setValue(this.generallistForm.value.gCompanyId);
    this.generalListValueForm.value.valuestatus=="ACTIVE" ? this.generalListValueForm.get('isActive').setValue('Y') : this.generalListValueForm.get('isActive').setValue('N');

    this.submittedValue = true;
    if (this.generalListValueForm.invalid) {
      return;
    } else {
      this.generallistService.saveUpdateGenerallistValue(this.generalListValueForm.value).subscribe(success=>{
        var s: any = success;
        this.toastService.showToast('success', s.message);
       this.isGeneralListValue=false;
       this.getGeneralListValueListById(this.generallistForm.value.lListcodeId);
      })
    }
  }



  


}
