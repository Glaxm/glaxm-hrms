import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { ToastrService } from 'src/app/views/services/toastr.service';
import { DocumenttypeService } from '../documenttype.service';

@Component({
  selector: 'app-add-documenttype',
  templateUrl: './add-documenttype.component.html',
  styleUrls: ['./add-documenttype.component.scss']
})
export class AddDocumenttypeComponent implements OnInit {

  documenttypeForm:any;
  submitted = false;

  isView:boolean=false;
  companyList:any=[];
  holdingList:any=[];
  statusList: any = [{ valueCode: 'ACTIVE', valueName: 'Active' }, { valueCode: 'INACTIVE', valueName: 'Inactive' }]
  obj={ companyId:null }

  constructor(private activatedRoute:ActivatedRoute,private toastService:ToastrService,private router:Router,private documenttypeService:DocumenttypeService) {
    this.documenttypeForm = new FormGroup({
      xdoctypeId: new FormControl(null),
      gCompanyId:new FormControl(null),
      company: new FormControl(null, [Validators.required]),
      gHoldingId: new FormControl(null),
      isActive: new FormControl(null),
      status: new FormControl(null),
      created: new FormControl(null,[Validators.required]),
      createdBy: new FormControl(null,[Validators.required]),
      updated: new FormControl(null,[Validators.required]),
      updatedBy: new FormControl(null,[Validators.required]),
      description: new FormControl(null),
      code: new FormControl(null),
      docName:new FormControl(null,[Validators.required])
    });

    this.activatedRoute.queryParams.subscribe(params => {
      this.documenttypeForm.controls['xdoctypeId'].setValue(params.id);
      this.isView = params.view;
    });

   }

   get f() { return this.documenttypeForm.controls; }

  ngOnInit() {
    this.companySetting();
    this.documenttypeService.getAllHolding().subscribe(s=>{
     
        this.holdingList = s;
        this.documenttypeForm.get('gHoldingId').setValue(this.holdingList[0].gHoldingId);
      this.selectHolding(this.holdingList[0].gHoldingId) 
    });    

    if(this.documenttypeForm.value.xdoctypeId){
      this.documenttypeService.getDocumenttypeById(this.documenttypeForm.value.xdoctypeId).subscribe(success=>{
        var s:any = success;
        this.documenttypeForm.patchValue(s.data);
        this.obj.companyId = s.data.gCompanyId;
        this.selectHolding(s.data.holdingId);
        s.data.isActive=='Y' ? this.documenttypeForm.get('status').setValue('ACTIVE') : this.documenttypeForm.get('status').setValue('INACTIVE');   
        if(this.isView){ this.documenttypeForm.disable(); }
      });
    }
    else{
      this.documenttypeForm.get('status').setValue("ACTIVE")
    }
  }

  selectHolding(holdingId){
    this.documenttypeService.getAllCompaniesByHoldingId(holdingId).subscribe(s=>{
        this.companyList = s;
        if(this.documenttypeForm.value.xdoctypeId){
          this.selectedCompanyList = this.companyList.filter(o1 => this.obj.companyId.some(o2 => o1.gCompanyId === o2));
        }
        
        
    });
  }

  addUpdateDocumenttype(){

    this.documenttypeForm.get('createdBy').setValue(1);
    this.documenttypeForm.get('created').setValue(new Date());
    this.documenttypeForm.get('updatedBy').setValue(1);
    this.documenttypeForm.get('updated').setValue(new Date());
    let compList: any = this.setCompanyList(this.selectedCompanyList)
    this.documenttypeForm.controls['gCompanyId'].setValue(compList);
    this.documenttypeForm.value.status=="ACTIVE" ? this.documenttypeForm.get('isActive').setValue('Y'):this.documenttypeForm.get('isActive').setValue('N');
    
// console.log(JSON.stringify(this.documenttypeForm.value))
    this.submitted = true;
    if (this.documenttypeForm.invalid) {
      return;
    } else{
     
      
      this.documenttypeService.addUpdateDocumenttype(this.documenttypeForm.value).subscribe(success=>{
        var success1:any = success;
        if(success1.code==0){
          this.toastService.showToast('danger',success1.message);
        }else{
        this.toastService.showToast('success',success1.message);
        this.back();}
      });
    }
  }

  back(){
    this.router.navigate(['/views/masters/documenttype/documenttype-summary']);
  }

  setCompanyList(list) {
    let elm: any = [];
    list.forEach(element => {
      elm.push(element.gCompanyId);
    });
    let unique = [...new Set(elm)];
    return unique;
  }

    //////////////////// multi select ////////////////////

    selectedCompanyList = [];
    dropdownSettings: IDropdownSettings;
  
    companySetting() {
      this.dropdownSettings = {
        singleSelection: false,
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
    }
  
    onCompanyDeSelect(items: any) {
      this.selectedCompanyList = this.selectedCompanyList.filter(item => item.gCompanyId !== items.gCompanyId);
    }
  
    onSelectAllCompnay(items: any) {
      this.selectedCompanyList = [];
      this.selectedCompanyList.push(...[items]);
    }


}
