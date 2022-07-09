import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularMyDatePickerDirective, IMyDateModel } from 'angular-mydatepicker';
import { CommonService } from 'src/app/views/services/common.service';
import { ToastrService } from 'src/app/views/services/toastr.service';
import { EmpIncrementService } from '../emp-increment.service';

@Component({
  selector: 'app-add-emp-increment',
  templateUrl: './add-emp-increment.component.html',
  styleUrls: ['./add-emp-increment.component.scss']
})
export class AddEmpIncrementComponent implements OnInit {

  isUserRole: boolean = false;
  enableFilter: boolean = false;
  userForm: any;
  submitted = false;
  lineForm: any;
  isView: boolean = false;
  employeeList: any = [];
  designationList: any = [];
  gradeList: any = [];
  moduleid:any;
  statusList: any = [{ valueCode: 'ACTIVE', valueName: 'Active' }, { valueCode: 'INACTIVE', valueName: 'Inactive' }];
  public myDatePickerOptions = this.commonService.datepickerFormat;
  @ViewChild('dp1', { static: false }) myDp1: AngularMyDatePickerDirective;
  @ViewChild('dp2', { static: false }) myDp2: AngularMyDatePickerDirective;
  @ViewChild('dp3', { static: false }) myDp3: AngularMyDatePickerDirective;
  @ViewChild('dp4', { static: false }) myDp4: AngularMyDatePickerDirective;

  selectedItems: Array<any> = [];
  dropdownSettings: any = {};


  tepMethod() {
    this.dropdownSettings = {
      singleSelection: true,
      idField: 'employeeId',
      textField: 'displayName',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 1,
      allowSearchFilter: true,
      closeDropDownOnSelection: true
    };
  }

  onItemSelect(item: any) {
    this.empincrementForm.controls['empId'].setValue(item.employeeId);
    this.onEmployeeById(item.employeeId);

  }

  onSelectAll(items: any) {
    console.log('onSelectAll', items);
  }

  empincrementForm: any;


  constructor(private router: Router, private toastService: ToastrService, private cdr: ChangeDetectorRef,
    private activatedRoute: ActivatedRoute, private commonService: CommonService, private empIncrementService: EmpIncrementService) {

    this.empincrementForm = new FormGroup({
      lempincremId: new FormControl(null),
      companyId: new FormControl(null),
      holdingId: new FormControl(null),
      isActive: new FormControl(null),
      createdBy: new FormControl(null),
      updatedBy: new FormControl(null),
      created: new FormControl(null),
      updated: new FormControl(null),
      transDate: new FormControl(null),
      empId: new FormControl(null),
      desc: new FormControl(null),
      remark: new FormControl(null),
      newempdesignationId: new FormControl(null),
      newempgradeId: new FormControl(null),
      empdesignationId: new FormControl(null),
      empgradeId: new FormControl(null),
      effectiveDate: new FormControl(null),
      effectiveDate1: new FormControl(null),
      trxdate: new FormControl(null),
      trxdate1: new FormControl(null),
      effdate: new FormControl(null),
      employee: new FormControl(null),
      docNo: new FormControl(null),
    });

    this.lineForm = new FormGroup({
      lempincremlineId: new FormControl(null),
      lempincremId: new FormControl(null),
      payItemId: new FormControl(null),
      companyId: new FormControl(null),
      holdingId: new FormControl(null),
      isActive: new FormControl(null),
      status: new FormControl(null),
      createdBy: new FormControl(null),
      updatedBy: new FormControl(null),
      created: new FormControl(null),
      updated: new FormControl(null),
      curamount: new FormControl(null),
      amount: new FormControl(null)
    });

    this.activatedRoute.queryParams.subscribe(params => {
      this.empincrementForm.controls['lempincremId'].setValue(params.id);
      this.isView = params.view;
      this.moduleid=params.moduleid;
    });

  }

  get f() { return this.empincrementForm.controls; }

  ngOnInit() {
    this.tepMethod();
    this.getHoldingList();
   // this.getAllEmployee();
    this.getAllGrade();
    this.getAllDesignation();
    this.getAllPayitems();
    if (this.empincrementForm.value.lempincremId) {

      this.empIncrementService.getEmpIncrementById(this.empincrementForm.value.lempincremId).subscribe(success => {
        var s: any = success;
        this.empincrementForm.patchValue(s.data);
        this.selectcompany(s.data.companyId)
        let startDate: Date = new Date(s.data.transDate);
        let fromModel: IMyDateModel = { isRange: false, singleDate: { jsDate: startDate }, dateRange: null };
        this.empincrementForm.controls['trxdate1'].setValue(fromModel);

        let endDate: Date = new Date(s.data.effectiveDate);
        let toModel: IMyDateModel = { isRange: false, singleDate: { jsDate: endDate }, dateRange: null };
        this.empincrementForm.controls['effectiveDate1'].setValue(toModel);
        if (this.isView) { this.empincrementForm.disable() }
      });

      this.lineDataTable();

    } else {
      let startDate: Date = new Date();
      let fromModel: IMyDateModel = { isRange: false, singleDate: { jsDate: startDate }, dateRange: null };
      this.empincrementForm.controls['trxdate1'].setValue(fromModel);
      this.changeStartDate(fromModel)

      let endDate: Date = new Date();
      let toModel: IMyDateModel = { isRange: false, singleDate: { jsDate: endDate }, dateRange: null };
      this.empincrementForm.controls['effectiveDate1'].setValue(toModel);
      this.changeEndDate(toModel)
    }



  }

  companyList: any = [];
  holdingList: any = [];

  getCompanyListByHoldingId(holdinId) {
    this.empIncrementService.getComapnyList(holdinId).subscribe(s => {
      this.companyList = s;
      if(this.companyList){

        let list:any = JSON.parse(sessionStorage.getItem("company"));
        var l:any=[];
        if(list){
        for(var i=0;i<list.length;i++){
          //if(list[i]!=','){
            l.push(Number(list[i]));
          // }
        }
        }
      this.companyList = this.companyList.filter(o1 => l.some(o2 => o1.gCompanyId === o2));
    }
    });
  }

  getAllEmployee(cmpList) {
    let l:any = [Number(cmpList)]//sessionStorage.getItem("company");
   
    this.empIncrementService.getAllEmployee(this.moduleid,l).subscribe(s => {
      this.employeeList = s;
      if (this.empincrementForm.value.lempincremId && this.empincrementForm.value.empId) {
        let list = this.employeeList.filter(item => item.employeeId == this.empincrementForm.value.empId);
        if (list.length > 0) {
          this.selectedItems = [{ 'employeeId': list[0].employeeId, 'displayName': list[0].displayName }];
        }
      }
    });
  }

  onEmployeeById(id) {
    this.empIncrementService.getEmployeeById(id).subscribe(success => {
      var data: any = success;
      this.empincrementForm.get('empgradeId').setValue(data.data.empGradeId);
      this.empincrementForm.get('empdesignationId').setValue(data.data.empDesignationId);

    })
  }

  getAllGrade() {
    this.empIncrementService.getAllGrade().subscribe(s => {
      this.gradeList = s;
    });
  }

  getAllDesignation() {
    this.empIncrementService.getAllDesignation().subscribe(s => {
      this.designationList = s;
    });
  }

  getHoldingList() {
    this.empIncrementService.getHoldingList().subscribe(s => {
      this.holdingList = s;
      this.empincrementForm.get('holdingId').setValue(this.holdingList[0].gHoldingId);
      this.getCompanyListByHoldingId(this.holdingList[0].gHoldingId)

    });
  }

  toggleCalendar(): void {
    this.cdr.detectChanges();
    this.myDp1.toggleCalendar();
  }
  changeStartDate(event) {
    this.empincrementForm.get('transDate').setValue(event.singleDate.jsDate);
    this.empincrementForm.get('trxdate').setValue(this.commonService.dateFormat(event.singleDate.jsDate));
  }
  changeEndDate(event) {
    this.empincrementForm.get('effectiveDate').setValue(event.singleDate.jsDate);
    this.empincrementForm.get('effdate').setValue(this.commonService.dateFormat(event.singleDate.jsDate));
  }

  addEmpIncrement() {
    this.empincrementForm.get('createdBy').setValue(1);
    this.empincrementForm.get('updatedBy').setValue(1);
    this.empincrementForm.get('created').setValue(new Date());
    this.empincrementForm.get('updated').setValue(new Date());
    this.empincrementForm.get('empId').setValue(Number(this.empincrementForm.value.empId));
    // this.empincrementForm.get('employee').setValue(Number(this.empincrementForm.value.employee));
          if(this.empincrementForm.value.newempdesignationId){
      this.empincrementForm.get('newempdesignationId').setValue(Number(this.empincrementForm.value.newempdesignationId));
    } else{
      this.empincrementForm.get('newempdesignationId').setValue(null);
    }

    if(this.empincrementForm.value.newempgradeId){
      this.empincrementForm.get('newempgradeId').setValue(Number(this.empincrementForm.value.newempgradeId));
    } else{
      this.empincrementForm.get('newempgradeId').setValue(null);
    }

    if(this.empincrementForm.value.empdesignationId){
      this.empincrementForm.get('empdesignationId').setValue(Number(this.empincrementForm.value.empdesignationId));
    } else{
      this.empincrementForm.get('empdesignationId').setValue(null);
    }

    if(this.empincrementForm.value.empgradeId){
      this.empincrementForm.get('empgradeId').setValue(Number(this.empincrementForm.value.empgradeId));
    } else{
      this.empincrementForm.get('empgradeId').setValue(null);
    }

   
    this.empincrementForm.get('companyId').setValue(Number(this.empincrementForm.value.companyId));
    if (this.empincrementForm.value.lempincremId) {
      this.empincrementForm.get('lempincremId').setValue(Number(this.empincrementForm.value.lempincremId));
    } else {
      this.empincrementForm.get('lempincremId').setValue(undefined);
    }
    this.empincrementForm.get('isActive').setValue("N");


    this.submitted = true;
    if (this.empincrementForm.invalid) {
      return;
    } else {
      this.empIncrementService.addUpdateEmpIncrement(this.empincrementForm.value).subscribe(s => {
        var success: any = s;
        if(success.code==0){
          this.toastService.showToast('success', success.message);
        } else{
        this.empincrementForm.patchValue(success.data);
        this.empincrementForm.get('lempincremId').setValue(success.data.lempincremId);
        this.toastService.showToast('success', success.message);
        this.router.navigate(['views/masters/emp-increment/add-increment-summary'], { queryParams: { id: success.data.lempincremId } });//success.data.lempincremId
        }
      });
    }
  }

  back() {
    this.router.navigate(['views/masters/emp-increment/increment-summary']);
  }

  selectcompany(id)
  {
    this.getAllEmployee(id);
  }



  //************************************************USER ROLE********************************************* */



  lineList: any = [];
  roleList: any = [];
  moduleList: any = [];
  lineDataTable() {
    this.empIncrementService.lineDataTable(this.empincrementForm.value.lempincremId).subscribe(s => {
      this.lineList = s;
    })
  }
  changeStartDate1(event) {
    this.lineForm.get('startDate').setValue(event.singleDate.jsDate);
  }
  changeEndDate1(event) {
    this.lineForm.get('endDate').setValue(event.singleDate.jsDate);
  }

  addUserRole() {
    this.lineForm.reset();
    this.lineForm.get('status').setValue("ACTIVE");
  }


  saveLines() {
    this.lineForm.get('createdBy').setValue(1);
    this.lineForm.get('updatedBy').setValue(1);
    this.lineForm.get('created').setValue(new Date());
    this.lineForm.get('updated').setValue(new Date());
    this.lineForm.controls['payItemId'].setValue(Number(this.lineForm.value.payItemId));
    this.lineForm.value.status == "ACTIVE" ? this.lineForm.controls['isActive'].setValue("Y") : this.lineForm.controls['isActive'].setValue("N");
    this.lineForm.controls['holdingId'].setValue(Number(this.empincrementForm.value.holdingId));
    this.lineForm.controls['companyId'].setValue(Number(this.empincrementForm.value.companyId));
    this.lineForm.controls['curamount'].setValue(Number(this.lineForm.value.curamount));
    this.lineForm.controls['amount'].setValue(Number(this.lineForm.value.amount));
    this.lineForm.controls['lempincremId'].setValue(Number(this.empincrementForm.value.lempincremId));

    if (this.lineForm.value.lempincremlineId) {
      if(!isNaN(this.lineForm.value.lempincremlineId)){
        
      } else{
        this.lineForm.get('lempincremlineId').setValue(Number(this.empincrementForm.value.lempincremlineId));
      }
    } else {
      this.lineForm.get('lempincremlineId').setValue(0);
    }
   
    this.empIncrementService.saveLines(this.lineForm.value).subscribe(s => {
      var success: any = s;
      this.isUserRole = false;
      this.lineForm.reset();
      this.toastService.showToast('success', success.message);
      this.lineDataTable();
    });
  }

  payitemList: any = [];


  getAllPayitems() {
    this.empIncrementService.getAllPayitems().subscribe(data => {
      this.payitemList = data;
    });
  }

  getAllActiveRoles() {
    // this.empIncrementService.getAllActiveRoles().subscribe(s=>{
    //   this.roleList=s;
    // })
  }

  getDataUsingRedioBtn(data) {
    if (data) {
      this.lineForm.controls['lempincremlineId'].setValue(data.lempincremlineId);
    }

  }


  editLine() {
    if (this.lineForm.value.lempincremlineId) {

      this.empIncrementService.getLineById(this.lineForm.value.lempincremlineId).subscribe(success => {
        var s: any = success;
        this.lineForm.patchValue(s.data);
        s.data.isActive == "Y" ? this.lineForm.controls['status'].setValue("ACTIVE") : this.lineForm.controls['status'].setValue("INACTIVE");
        if (this.isView) { this.lineForm.disable(); }

      });
      // }
    }


    // getDataUsingRedioBtn(data){
    //   this.lineForm.controls['userRoleId'].setValue(data.userRoleId);
    // }

    // deleteUserRole(){
    //  if(this.lineForm.value.userRoleId){
    //      this.empIncrementService.deleteUserRole(this.lineForm.value.userRoleId).subscribe(success1=>{
    //       var success:any = success1;
    //       this.toastService.showToast('success',success.message); 
    //       this.userRoleDataTable();         
    //      });
    //  }
    // }

  }

  onSelectPayItem(id) {
    if (this.empincrementForm.value.empId) {
      this.empIncrementService.onSelectPayItem(this.empincrementForm.value.empId, id).subscribe(data => {
        var d: any = data;
        this.lineForm.controls['curamount'].setValue(d.data.amount);

      })
    }
  }
}
