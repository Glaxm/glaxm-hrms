import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularMyDatePickerDirective, IMyDateModel } from 'angular-mydatepicker';
import { CommonService } from 'src/app/views/services/common.service';
import { ToastrService } from 'src/app/views/services/toastr.service';
import { EmpleaveresumptionService } from '../empleaveresumption.service';

@Component({
  selector: 'app-add-empleaveresumption',
  templateUrl: './add-empleaveresumption.component.html',
  styleUrls: ['./add-empleaveresumption.component.scss']
})
export class AddEmpleaveresumptionComponent implements OnInit {

  empleaveresumptionForm:any;
  submitted = false;
  btnLoader:boolean;
  isView:boolean=false;
  companyList:any=[];
  empleaveList:any=[];
  holdingList:any=[];
  employeeList:any=[];
  leaveTypeList:any =[];
  statusList: any = [{ valueCode: 'ACTIVE', valueName: 'Active' }, { valueCode: 'INACTIVE', valueName: 'Inactive' }]
  moduleid:any;
  public myDatePickerOptions = this.commonService.datepickerFormat;
  @ViewChild('dp1', {static: false}) myDp1: AngularMyDatePickerDirective;
  @ViewChild('dp2', {static: false}) myDp2: AngularMyDatePickerDirective;
  @ViewChild('dp3', {static: false}) myDp3: AngularMyDatePickerDirective;
  @ViewChild('dp4', {static: false}) myDp4: AngularMyDatePickerDirective;
  @ViewChild('dp5', {static: false}) myDp5: AngularMyDatePickerDirective;
  @ViewChild('dp6', {static: false}) myDp6: AngularMyDatePickerDirective;
 

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
  this.empleaveresumptionForm.controls['xEmployeeId'].setValue(item.employeeId);
  this.getReferenceByID(item.employeeId);
}
onSelectAll(items: any) {
  console.log('onSelectAll', items);
}

  constructor(private activatedRoute:ActivatedRoute,private commonService:CommonService,private toastService:ToastrService,private router:Router,private empleaveresumptionService:EmpleaveresumptionService) {
    this.empleaveresumptionForm = new FormGroup({
      xdivId: new FormControl(null),
      code: new FormControl(null),
      xleaveitemId: new FormControl(null),
      employee: new FormControl(null),
      lEmpleaveresumeId: new FormControl(null),
      lEmpleaveId: new FormControl(null),
      gCompanyId:new FormControl(null,[Validators.required]),
      gHoldingId: new FormControl(null,[Validators.required]),
      isActive: new FormControl(null,[Validators.required]),
      status: new FormControl(null),
      created: new FormControl(null,[Validators.required]),
      createdBy: new FormControl(null,[Validators.required]),
      updated: new FormControl(null,[Validators.required]),
      updatedBy: new FormControl(null,[Validators.required]),
      description: new FormControl(null),
      documentno: new FormControl(null),
      datetrx: new FormControl(null),
      startdate: new FormControl(null),
      enddate: new FormControl(null),
      resumptiondate:new FormControl(null),
      resumptiondate1:new FormControl(null),
      datetrx1: new FormControl(null),
      startdate1: new FormControl(null),
      enddate1: new FormControl(null),
      trxdate: new FormControl(null),
      stdate: new FormControl(null),
      endate: new FormControl(null),
      resumdate:new FormControl(null),
      xEmployeeId: new FormControl(null),
      leavedays:new FormControl(null),
      latedays:new FormControl(null),
      
      actualfrom:new FormControl(null),
      afrom:new FormControl(null),
      actualto:new FormControl(null),
      ato:new FormControl(null),
      actualfrom1:new FormControl(null),
      actualto1:new FormControl(null),
      remarks:new FormControl(null),

    });

    this.activatedRoute.queryParams.subscribe(params => {
      this.empleaveresumptionForm.controls['lEmpleaveresumeId'].setValue(params.id);
      this.isView = params.view;
      this.moduleid = params.moduleid;
    });

   }

   get f() { return this.empleaveresumptionForm.controls; }

  ngOnInit() {
    this.tepMethod();
   // this.getEmployeeList();
    this.getAllLeaveType();
    
    this.empleaveresumptionService.getAllHolding().subscribe(s=>{
     
        this.holdingList = s;
        this.empleaveresumptionForm.get('gHoldingId').setValue(this.holdingList[0].gHoldingId);
      this.selectHolding(this.holdingList[0].gHoldingId) 
    });    

    if(this.empleaveresumptionForm.value.lEmpleaveresumeId){
      this.empleaveresumptionService.getEmpleaveresumptionById(this.empleaveresumptionForm.value.lEmpleaveresumeId).subscribe(success=>{
        var s:any = success;
      //  this.getReferenceByID(s.data.xEmployeeId);
        this.empleaveresumptionForm.patchValue(s.data);
        let lEmpleaveId = s.data.lEmpleaveId;
        this.selectHolding(s.data.gHoldingId);
        this.selectcompany(s.data.gCompanyId)

        let startdate: Date = new Date(s.data.datetrx);
        let fromModel: IMyDateModel = { isRange: false, singleDate: { jsDate: startdate }, dateRange: null };
        this.empleaveresumptionForm.controls['datetrx1'].setValue(fromModel);

        this.changeTransactionDate(fromModel);

        let enddate: Date = new Date(s.data.resumptiondate);
        let fromModel1: IMyDateModel = { isRange: false, singleDate: { jsDate: enddate }, dateRange: null };
        this.empleaveresumptionForm.controls['resumptiondate1'].setValue(fromModel1);
        // this.changeRansactionDate(fromModel1);


        this.empleaveresumptionService.getReferenceByID(s.data.xEmployeeId,true).subscribe(s=>{
          this.referenceList = s; 
          this.selectLeaveRef(lEmpleaveId);
      });
        s.data.isActive=='Y' ? this.empleaveresumptionForm.get('status').setValue('ACTIVE') : this.empleaveresumptionForm.get('status').setValue('INACTIVE');   
        if(this.isView){ this.empleaveresumptionForm.disable(); }
    
        
      });
    } else{
      this.empleaveresumptionForm.get('status').setValue("ACTIVE");

      let startdate: Date = new Date();
      let fromModel: IMyDateModel = { isRange: false, singleDate: { jsDate: startdate }, dateRange: null };
      this.empleaveresumptionForm.controls['datetrx1'].setValue(fromModel);

      this.changeTransactionDate(fromModel);

      let enddate: Date = new Date();
      let fromModel1: IMyDateModel = { isRange: false, singleDate: { jsDate: enddate }, dateRange: null };
      this.empleaveresumptionForm.controls['resumptiondate1'].setValue(fromModel1);
      this.changeRansactionDate(fromModel1);

    }
  }

  calDays(st,en) {
  
      let resumptiondate = this.commonService.dateFormat(st);
      let enddate = this.commonService.dateFormat(en);
      
if(resumptiondate!="Invalid date" && enddate!="Invalid date"){
      let date1:any= new Date(resumptiondate);
      let date2:any= new Date(enddate);
      let diffDays:any = Math.floor((date1 - date2) / (1000 * 60 * 60 * 24));
      return diffDays;  
    } else{
      return 0;
    }
}

// calLateDays(){
//       this.calDays();
//  }


  getAllLeaveType(){
    this.empleaveresumptionService.getAllLeaveType().subscribe(data=>{
        this.leaveTypeList = data;
    });
  }

  getEmployeeList(cmpList){
    let l:any = [Number(cmpList)]//sessionStorage.getItem("company");
   
    this.empleaveresumptionService.getEmployeeList(this.moduleid,l).subscribe(s=>{
      this.employeeList = s;
      if(this.empleaveresumptionForm.value.lEmpleaveresumeId && this.empleaveresumptionForm.value.xEmployeeId){
        let list = this.employeeList.filter(item => item.employeeId == this.empleaveresumptionForm.value.xEmployeeId);
        if(list.length>0){
          this.selectedItems=[{'employeeId':list[0].employeeId,'displayName':list[0].displayName}];
        }
      }
    })
  }

  selectHolding(holdingId){
    this.empleaveresumptionService.getAllCompaniesByHoldingId(holdingId).subscribe(s=>{
        this.companyList = s;
        if(this.companyList){

          let list:any = JSON.parse(sessionStorage.getItem("company"));
          var l:any=[];
          for(var i=0;i<list.length;i++){
          //  if(list[i]!=','){
              l.push(Number(list[i]));
            //}
          }
        
        this.companyList = this.companyList.filter(o1 => l.some(o2 => o1.gCompanyId === o2));
      }
        
    });
  }

  addUpdateEmpleaveresumption(){

    this.empleaveresumptionForm.get('createdBy').setValue(1);
    this.empleaveresumptionForm.get('created').setValue(new Date());
    this.empleaveresumptionForm.get('updatedBy').setValue(1);
    this.empleaveresumptionForm.get('updated').setValue(new Date());
    this.empleaveresumptionForm.get('gCompanyId').setValue(Number(this.empleaveresumptionForm.value.gCompanyId));
    this.empleaveresumptionForm.get('lEmpleaveId').setValue(Number(this.empleaveresumptionForm.value.lEmpleaveId));
    this.empleaveresumptionForm.get('gHoldingId').setValue(Number(this.empleaveresumptionForm.value.gHoldingId));
    this.empleaveresumptionForm.get('xEmployeeId').setValue(Number(this.empleaveresumptionForm.value.xEmployeeId));
    this.empleaveresumptionForm.get('leavedays').setValue(Number(this.empleaveresumptionForm.value.leavedays));
    this.empleaveresumptionForm.get('latedays').setValue(Number(this.empleaveresumptionForm.value.latedays));


    this.empleaveresumptionForm.value.status=="ACTIVE" ? this.empleaveresumptionForm.get('isActive').setValue('Y'):this.empleaveresumptionForm.get('isActive').setValue('N');
    

    this.submitted = true;
    if (this.empleaveresumptionForm.invalid) {
      return;
    } else{
     
      this.btnLoader=true;
      this.empleaveresumptionService.addUpdateEmpleaveresumption(this.empleaveresumptionForm.value).subscribe(success=>{
        this.btnLoader =false;
        var success1:any = success;
        if(success1.code==0){
          this.toastService.showToast('danger', success1.message);
        } else{
        this.toastService.showToast('success',success1.message);
        this.back();}
      }, error => { this.btnLoader = false; console.log('oops', error); });
    }
  }

  back(){
    this.router.navigate(['/views/transaction/empleaveresumption/empleaveresumption-summary']);
  }


  changeTransactionDate(event){
    this.empleaveresumptionForm.get('trxdate').setValue(this.commonService.dateFormat(event.singleDate.jsDate));
    this.empleaveresumptionForm.get('datetrx').setValue(event.singleDate.jsDate);
  }
  changeRansactionDate(event){
    this.empleaveresumptionForm.get('resumdate').setValue(this.commonService.dateFormat(event.singleDate.jsDate));
    this.empleaveresumptionForm.get('resumptiondate').setValue(event.singleDate.jsDate);
   
    var date = new Date(event.singleDate.jsDate);
    var yesterday = new Date(date.getTime() - 24*60*60*1000);

    let enddate: Date = new Date(yesterday);
    let fromModel1: IMyDateModel = { isRange: false, singleDate: { jsDate: enddate }, dateRange: null };
    this.empleaveresumptionForm.controls['actualto1'].setValue(fromModel1);
    this.changeActualTo(fromModel1);
 
    this.empleaveresumptionForm.get('latedays').setValue(this.calDays(fromModel1.singleDate.jsDate,this.empleaveresumptionForm.value.enddate1.singleDate.jsDate));

  }
  changeEndDate(event){
    this.empleaveresumptionForm.get('endate').setValue(this.commonService.dateFormat(event.singleDate.jsDate));
    this.empleaveresumptionForm.get('enddate').setValue(event.singleDate.jsDate);
  }
  changeStartDate(event){
    this.empleaveresumptionForm.get('startdate').setValue(event.singleDate.jsDate);
    this.empleaveresumptionForm.get('stdate').setValue(this.commonService.dateFormat(event.singleDate.jsDate));
  }

  changeActualFrom(event){
    this.empleaveresumptionForm.get('actualfrom').setValue(event.singleDate.jsDate);
    this.empleaveresumptionForm.get('afrom').setValue(this.commonService.dateFormat(event.singleDate.jsDate));
  }

  changeActualTo(event){
    this.empleaveresumptionForm.get('actualto').setValue(event.singleDate.jsDate);
    this.empleaveresumptionForm.get('ato').setValue(this.commonService.dateFormat(event.singleDate.jsDate));
  }

  referenceList:any =[];
  getReferenceByID(id){
    this.empleaveresumptionService.getReferenceByID(id,false).subscribe(s=>{
      this.referenceList = s; 
  });
  }

  selectLeaveRef(id){
      let selected = this.referenceList.filter(data=>data.lEmpleaveId==id);
        this.empleaveresumptionForm.get('lEmpleaveId').setValue(selected[0].lEmpleaveId);
        this.empleaveresumptionForm.get('leavedays').setValue(selected[0].leavedays);
        this.empleaveresumptionForm.get('xleaveitemId').setValue(selected[0].xLeaveitemId);

        let startdate: Date = new Date(selected[0].startdate);
        let fromModel: IMyDateModel = { isRange: false, singleDate: { jsDate: startdate }, dateRange: null };
        this.empleaveresumptionForm.controls['startdate1'].setValue(fromModel);
        this.empleaveresumptionForm.controls['actualfrom1'].setValue(fromModel);
        this.changeActualFrom(fromModel);
        this.changeStartDate(fromModel);

        let enddate: Date = new Date(selected[0].enddate);
        let fromModel1: IMyDateModel = { isRange: false, singleDate: { jsDate: enddate }, dateRange: null };
        this.empleaveresumptionForm.controls['enddate1'].setValue(fromModel1);
        this.changeEndDate(fromModel1);

         this.empleaveresumptionForm.get('latedays').setValue(this.calDays(this.empleaveresumptionForm.value.actualto1.singleDate.jsDate,fromModel1.singleDate.jsDate));
     
  }

  selectcompany(id)
  {
    this.getEmployeeList(id);
  }

}
