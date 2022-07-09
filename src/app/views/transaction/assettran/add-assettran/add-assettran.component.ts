import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularMyDatePickerDirective, IMyDateModel } from 'angular-mydatepicker';
import { CommonService } from 'src/app/views/services/common.service';
import { ToastrService } from 'src/app/views/services/toastr.service';
import { AssettranService } from '../assettran.service';

@Component({
  selector: 'app-add-assettran',
  templateUrl: './add-assettran.component.html',
  styleUrls: ['./add-assettran.component.scss']
})
export class AddAssettranComponent implements OnInit {

  assettranForm: FormGroup;
  submitted = false;
  isView: boolean = false;
  holdingList: any = [];
  companyList: any = [];
  employeeList: any = [];
  itemList: any = [];
  moduleid:any;
  assetGroupList: any = [];
  assetTypeList: any = [];
  assetItemList: any = [];
  empList:any =[];
  public myDatePickerOptions = this.commonService.datepickerFormat;
  @ViewChild('dp1', { static: false }) myDp1: AngularMyDatePickerDirective;
  @ViewChild('dp2', { static: false }) myDp2: AngularMyDatePickerDirective;
  @ViewChild('dp3', { static: false }) myDp3: AngularMyDatePickerDirective;
  statusList: any = [{ valueCode: 'ACTIVE', valueName: 'Active' }, { valueCode: 'INACTIVE', valueName: 'Inactive' }]

  

  
selectedItems: Array<any> = [];
dropdownSettings: any = {};


tepMethod(){
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

onItemSelect(item: any) {
  this.assettranForm.controls['employeeId'].setValue(item.employeeId);
}
onSelectAll(items: any) {
  console.log('onSelectAll', items);
}

  constructor(private commonService: CommonService, private toastService: ToastrService, private activatedRoute: ActivatedRoute, private assettranService: AssettranService, private router: Router) {
    this.assettranForm = new FormGroup({
      assettranId: new FormControl(null),
      companyId: new FormControl(null),
      holdingId: new FormControl(null),
      isActive: new FormControl(null),
      status: new FormControl(null),
      employeeId : new FormControl(null),
      created: new FormControl(null),
      createdBy: new FormControl(null),
      updated: new FormControl(null),
      updatedBy: new FormControl(null),
      description: new FormControl(null),
      code: new FormControl(null),
      name: new FormControl(null),
      DOCUMENTNO: new FormControl(null),
      DATETRX: new FormControl(null),
      trxdate: new FormControl(null),
      stdate: new FormControl(null),
      endate: new FormControl(null),
      daterx1: new FormControl(null),
      x_asset_item_id: new FormControl(null),
      x_asset_type_id: new FormControl(null),
      x_asset_group_id: new FormControl(null),
      qty: new FormControl(null),
      G_APPROVALREQ_ID:new FormControl(null),
      amount: new FormControl(null),
      DATEFROM: new FormControl(null),
      datefrom1: new FormControl(null),
      DATETO: new FormControl(null),
      employee: new FormControl(null),
      dateto1: new FormControl(null),
    });

    this.activatedRoute.queryParams.subscribe(params => {
      this.assettranForm.controls['assettranId'].setValue(params.id);
      this.isView = params.view;
      this.moduleid = params.moduleid;
    });
  }

  changeloanDate(event) {

  }

  ngOnInit() {
   // this.getEmployeeList();
    this.tepMethod();
    this.getHoldingList();
   this.getAssetGroupList();
    if (this.assettranForm.value.assettranId) {
      this.assettranService.getAssettranById(this.assettranForm.value.assettranId).subscribe(success => {
        var s: any = success;
        this.assettranForm.patchValue(s.data);
        this.getCompanyListByHoldingId(s.data.holdingId);
        this.selectcompany(s.data.companyId)

        this.assettranForm.get('x_asset_group_id').setValue(s.data.x_ASSET_GROUP_ID);
        this.getAssetTypeListByGroup(s.data.x_ASSET_GROUP_ID);
        this.getAssetItemListByType(s.data.x_asset_type_id);
        this.getEmployeeByCompany(s.data.companyId);
        s.data.isActive == 'Y' ? this.assettranForm.get('status').setValue("ACTIVE") : this.assettranForm.get('status').setValue("INACTIVE");
       
        
        this.assettranForm.controls['DOCUMENTNO'].setValue(s.data.documentno);

        let transDate: Date = new Date(s.data.datetrx);
        let transDateModel: IMyDateModel = {isRange: false, singleDate: {jsDate: transDate}, dateRange: null};
        this.assettranForm.controls['daterx1'].setValue(transDateModel);

        let fromdate: Date = new Date(s.data.datefrom);
        let fromModel: IMyDateModel = {isRange: false, singleDate: {jsDate: fromdate}, dateRange: null};
        this.assettranForm.controls['datefrom1'].setValue(fromModel);
        
        let toDate: Date = new Date(s.data.dateto);
        let toModel: IMyDateModel = {isRange: false, singleDate: {jsDate: toDate}, dateRange: null};
        this.assettranForm.controls['dateto1'].setValue(toModel);

        if (this.isView) { this.assettranForm.disable(); }


       
      });
    } else {
      this.assettranForm.get('status').setValue("ACTIVE");
    }
  }

  getAssetGroupList() {
    this.assettranService.getAssetGroupList().subscribe(data => {
      this.assetGroupList = data;
    })
  }

  getAssetTypeListByGroup(id) {
    this.assetTypeList = [];
    if(this.assetTypeList.length==0){
      this.assetItemList = [];
    }
    this.assettranService.getAssetTypeListByGroup(id).subscribe(data => {
      this.assetTypeList = data;
    })
  }

  getAssetItemListByType(id){
    this.assettranService.getAssetItemListByType(id).subscribe(data => {
      this.assetItemList = data;
    })
  }

  getEmployeeByCompany(id){
    this.assettranService.getEmpListByCompany(id).subscribe(data => {
      this.empList = data;
    })
  }

  get f() { return this.assettranForm.controls; }

  changeTransactionDate(event) {
    this.assettranForm.get('trxdate').setValue(this.commonService.dateFormat(event.singleDate.jsDate));
  }

  changeStartDate(event) {
    this.assettranForm.get('stdate').setValue(this.commonService.dateFormat(event.singleDate.jsDate));
  }
  changeEndDate(event) {
    this.assettranForm.get('endate').setValue(this.commonService.dateFormat(event.singleDate.jsDate));
  }

  getCompanyListByHoldingId(holdinId) {

    this.assettranService.getCompanyListByHoldingId(holdinId).subscribe(s => {
      this.companyList = s;

    });
  }

  getEmployeeList(cmpList){
    let l:any = [Number(cmpList)]//sessionStorage.getItem("company");

   
    this.assettranService.getAllEmployee(this.moduleid,l).subscribe(s=>{
      this.employeeList=s;
      if(this.assettranForm.value.assettranId && this.assettranForm.value.employeeId){
        let list = this.employeeList.filter(item => item.employeeId == this.assettranForm.value.employeeId);
        if(list.length>0){
          this.selectedItems=[{'employeeId':list[0].employeeId,'displayName':list[0].displayName}];
        }
      }
    });
  }

  getHoldingList() {
    this.assettranService.getHoldingList().subscribe(s => {
      this.holdingList = s;
      this.assettranForm.get('holdingId').setValue(this.holdingList[0].gHoldingId);
      this.getCompanyListByHoldingId(this.holdingList[0].gHoldingId)
    });
  }

  addUpdateAirSector() {
   
    this.assettranForm.get('createdBy').setValue(Number(sessionStorage.getItem('userId')));
    this.assettranForm.get('created').setValue(new Date());
    this.assettranForm.get('updatedBy').setValue(Number(sessionStorage.getItem('userId')));
    this.assettranForm.get('companyId').setValue(Number(this.assettranForm.value.companyId));
    this.assettranForm.get('G_APPROVALREQ_ID').setValue(Number(this.assettranForm.value.G_APPROVALREQ_ID));
    this.assettranForm.get('amount').setValue(parseFloat(this.assettranForm.value.amount));
    this.assettranForm.get('employeeId').setValue(Number(this.assettranForm.value.employeeId));
    this.assettranForm.get('qty').setValue(Number(this.assettranForm.value.qty));
    this.assettranForm.get('x_asset_group_id').setValue(Number(this.assettranForm.value.x_asset_group_id));
    this.assettranForm.get('x_asset_item_id').setValue(Number(this.assettranForm.value.x_asset_item_id));
    this.assettranForm.get('x_asset_type_id').setValue(Number(this.assettranForm.value.x_asset_type_id));

    this.assettranForm.get('updated').setValue(new Date());
    this.assettranForm.value.status == "ACTIVE" ? this.assettranForm.get('isActive').setValue('Y') : this.assettranForm.get('isActive').setValue('N');

    this.submitted = true;
    if (this.assettranForm.invalid) {
      return;
    } else {
      this.assettranService.addUpdateAssettran(this.assettranForm.value).subscribe(success => {
        var s: any = success;
        if(s.code==0){
          this.toastService.showToast('danger', s.message);
        } else{
        this.toastService.showToast('success', s.message);
        this.back();
      }
      });
    }
  }

  back() {
    // if (this.parentUrl) {
    //   this.router.navigate([this.parentUrl]);
    // } else {
    this.router.navigate(["/views/transaction/assettran/assettran-summary"]);
    // }
  }

  selectcompany(id)
  {
    this.getEmployeeList(id);
  }


}
