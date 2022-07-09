import { Component, OnInit, ChangeDetectorRef, ViewChild } from '@angular/core';
import { UserService } from '../user.service';
import { CommonService } from 'src/app/views/services/common.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'src/app/views/services/toastr.service';
import { AngularMyDatePickerDirective, IMyDateModel } from 'angular-mydatepicker';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Base64 } from 'js-base64';
import { IDropdownSettings } from 'ng-multiselect-dropdown';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {
  isUserRole: boolean = false;
  enableFilter: boolean = false;
  userForm: any;
  submitted = false;
  userRoleForm: any;
  isView: boolean = false;
  moduleid:any;
  statusList: any = [{ valueCode: 'ACTIVE', valueName: 'Active' }, { valueCode: 'INACTIVE', valueName: 'Inactive' }];
  public myDatePickerOptions = this.commonService.datepickerFormat;
  @ViewChild('dp1', { static: false }) myDp1: AngularMyDatePickerDirective;
  @ViewChild('dp2', { static: false }) myDp2: AngularMyDatePickerDirective;
  @ViewChild('dp3', { static: false }) myDp3: AngularMyDatePickerDirective;
  @ViewChild('dp4', { static: false }) myDp4: AngularMyDatePickerDirective;

  employeeList: any = [];
  companyList: any = [];
  dashSettingList: any = [];
  selectedItemsemp: Array<any> = [];
  dropdownSettingsemp: any = {};

  deptObj = { deptId: null }
  deptWiseEmp = { employeeId: null }
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
    this.userForm.controls['employeeId'].setValue(item.employeeId);
  }
  onSelectAllemp(items: any) {
    console.log('onSelectAll', items);
  }


  constructor(private router: Router, private toastService: ToastrService, private cdr: ChangeDetectorRef, private activatedRoute: ActivatedRoute, private commonService: CommonService, private userService: UserService) {
    this.userForm = new FormGroup({
      userId: new FormControl(null),
      userName: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [Validators.required]),
      employeeId: new FormControl(null, [Validators.required]),
      startDate: new FormControl(null),
      endDate: new FormControl(null),
      companyId: new FormControl(null,[Validators.required]),
      companyId1: new FormControl(null),
      startDate1: new FormControl(null),
      endDate1: new FormControl(null),
      status: new FormControl(null, [Validators.required]),
      description: new FormControl(null),
      password: new FormControl(null),
      passwordDate: new FormControl(new Date()),
      changePwd: new FormControl('Y'),
      createdBy: new FormControl(null),
      creationDate: new FormControl(null),
      lastUpdatedBy: new FormControl(null),
      lastUpdateDate: new FormControl(null),
      lastUpdateLogin: new FormControl(null),
      employee: new FormControl(null,[Validators.required]),
      workflow: new FormControl(null),
      workflowId: new FormControl(null),
      dept: new FormControl(null),
      deptId: new FormControl(null),
      deptWiseEmp: new FormControl(null),
      deptWiseEmp1: new FormControl(null),
      dashSetting: new FormControl(null),
      dashboardId: new FormControl(null),
      dashIdwithname: new FormControl(null)

    });

    this.userRoleForm = new FormGroup({
      userRoleId: new FormControl(null),
      roleId: new FormControl(null),
      userId: new FormControl(null),
      status: new FormControl(null),
      startDate: new FormControl(null),
      endDate: new FormControl(null),
      startDate11: new FormControl(null),
      endDate11: new FormControl(null),

      createdBy: new FormControl(null),
      creationDate: new FormControl(null),
      lastUpdatedBy: new FormControl(null),
      lastUpdateDate: new FormControl(null),
      lastUpdateLogin: new FormControl(null)
    });

    this.activatedRoute.queryParams.subscribe(params => {
      this.userForm.controls['userId'].setValue(params.id);
      this.isView = params.view;
      this.moduleid = params.moduleid;
    });
  }

  get f() { return this.userForm.controls; }
  obj = {
    companyId: null
  }

  workflowObj = {
    gApprovalwfId: null
  }

  dashSettObj = {
    dashboardId:null
  }

  ngOnInit() {

    this.tepMethodemp();
   this.deptMultiSelFun();
  this.deptWiseMultiSelFun();
  this.dashboardSSetting();
 
    if (this.userForm.value.userId) {

      this.userService.getUserDataById(this.userForm.value.userId).subscribe(success => {
        var s: any = success;
        this.userForm.patchValue(s.data);
        let startDate: Date = new Date(s.data.startDate);
        let fromModel: IMyDateModel = { isRange: false, singleDate: { jsDate: startDate }, dateRange: null };
        this.userForm.controls['startDate1'].setValue(fromModel);

        let endDate: Date = new Date(s.data.endDate);
        let toModel: IMyDateModel = { isRange: false, singleDate: { jsDate: endDate }, dateRange: null };
        this.userForm.controls['endDate1'].setValue(toModel);

        this.dashSettObj.dashboardId = s.data.dashboardId;
        
        this.obj.companyId = s.data.companyId1;
        this.compList = s.data.companyId1;
        this.workflowObj.gApprovalwfId = s.data.workflowId;
        this.deptObj.deptId = s.data.deptId;
        this.selDeptList = s.data.deptId;
        this.deptWiseEmp.employeeId = s.data.deptWiseEmp;
      if(s.data.companyId1){  
        this.userService.getAllEmployee(this.moduleid,s.data.companyId1).subscribe(s => {
          this.employeeList = s;
          if (this.userForm.value.userId) {
            let list = this.employeeList.filter(item => item.employeeId == this.userForm.value.employeeId);
            this.selectedItemsemp = [{ 'employeeId': list[0].employeeId, 'displayName': list[0].displayName }];
          }
        });
      }
if(s.data.companyId1){
      this.userService.getWorkflowList(s.data.companyId1).subscribe(data => {
        this.workflowList = data;
        if (this.workflowObj.gApprovalwfId) {
          this.selectedworkflowList = this.workflowList.filter(o1 => this.workflowObj.gApprovalwfId.some(o2 => o1.gApprovalwfId === o2));
        }
      });
    }

    // s.data.deptIdwithname = [{"deptId":19,"name":"Accounts"},{"deptId":32,"name":"Accounts2"}];
    this.selectedDeptList = s.data.deptIdwithname;
    // this.getAllDept(s.data.companyId1);
        if(s.data.companyId1){
          this.userService.getAllDept(s.data.companyId1).subscribe(s => {
            this.deptList = s;
            // if(this.userForm.value.userId){       
            //   this.selectedDeptList = this.deptList.filter(o1 => this.deptObj.deptId.some(o2 => o1.deptId === o2));
            // }
          }); 
        }

        if(s.data.companyId1 && s.data.deptId){
          this.userService.getemplbycompDeptid({"eligibleforCompany":s.data.companyId1,"eligiblefordept":s.data.deptId}).subscribe(data=>{
            this.departtWiseList = data;
            if(this.userForm.value.userId && this.deptWiseEmp.employeeId){
              this.selectedDeptWiseList = this.departtWiseList.filter(o1 => this.deptWiseEmp.employeeId.some(o2 => o1.employeeId === o2));
            }
         });
        }
        this.getDashboardSettingList();
        this.getAllCompanies();
        if (this.isView) { this.userForm.disable() }

      });

      this.userRoleDataTable();

    } else {
      let startDate: Date = new Date();
      let fromModel: IMyDateModel = { isRange: false, singleDate: { jsDate: startDate }, dateRange: null };
      this.userForm.controls['startDate1'].setValue(fromModel);

      let endDate: Date = new Date();
      let toModel: IMyDateModel = { isRange: false, singleDate: { jsDate: endDate }, dateRange: null };
      this.userForm.controls['endDate1'].setValue(toModel);
      this.userForm.controls['status'].setValue("ACTIVE");
      this.getAllCompanies();
      this.getDashboardSettingList();
    }


  

  }

  getDashboardSettingList(){
    this.userService.getDashboardSettingList().subscribe(data => {
      this.dashSettingList = data;
      if (this.userForm.value.userId && this.dashSettObj.dashboardId) {
        this.selectedDashSettingList = this.dashSettingList.filter(o1 => this.dashSettObj.dashboardId.some(o2 => o1.dashboardId === o2));
      }
    });
  }

  getAllCompanies() {
    this.userService.getAllCompanies().subscribe(data => {
      this.companyList = data;
      if (this.userForm.value.userId && this.obj.companyId) {
        this.selectedEmpList = this.companyList.filter(o1 => this.obj.companyId.some(o2 => o1.companyId === o2));
      }
    });
  }

  getAllEmployeeById(l){
    this.userService.getAllEmployee(this.moduleid,l).subscribe(s => {
      this.employeeList = s;
      if (this.userForm.value.userId) {
        let list = this.employeeList.filter(item => item.employeeId == this.userForm.value.employeeId);
        this.selectedItemsemp = [{ 'employeeId': list[0].employeeId, 'displayName': list[0].displayName }];
      }
    });
  }

  toggleCalendar(): void {
    this.cdr.detectChanges();
    this.myDp1.toggleCalendar();
  }
  changeStartDate(event) {
    this.userForm.get('startDate').setValue(event.singleDate.jsDate);
  }
  changeEndDate(event) {
    this.userForm.get('endDate').setValue(event.singleDate.jsDate);
  }

  setDeptWiseList1(list) {
    let elm: any = [];
    list.forEach(element => {
      elm.push(element.employeeId);
    });
    let unique = [...new Set(elm)];
    return unique;
  }

  setdashbrdSettList(list) {
    let elm: any = [];
    list.forEach(element => {
      elm.push(element.dashboardId);
    });
    let unique = [...new Set(elm)];
    return unique;
  }



  addUser() {
    console.log(JSON.stringify(this.userForm.value));
    if (this.userForm.value.startDate == null) {
      this.userForm.get('startDate').setValue(this.userForm.value.startDate1.singleDate.jsDate);
    }
    if (this.userForm.value.endDate == null) {
      this.userForm.get('endDate').setValue(this.userForm.value.endDate1.singleDate.jsDate);
    }

    this.userForm.get('companyId1').setValue(this.setCompanyList(this.selectedEmpList))
    this.userForm.get('workflowId').setValue(this.setWorkflowList(this.selectedworkflowList));
    this.userForm.get('createdBy').setValue(1);
    this.userForm.get('creationDate').setValue(new Date());
    this.userForm.get('lastUpdatedBy').setValue(1);
    this.userForm.get('lastUpdateDate').setValue(new Date());
    this.userForm.get('lastUpdateLogin').setValue(1);
    this.userForm.get('employeeId').setValue(Number(this.userForm.value.employeeId));
    
    this.userForm.controls['deptId'].setValue(this.selDeptList);
    
    let deptWiseEmp1: any = this.setDeptWiseList1(this.selectedDeptWiseList);
    this.userForm.get('deptWiseEmp').setValue(deptWiseEmp1);

    let dashsettList: any = this.setdashbrdSettList(this.selectedDashSettingList);
    this.userForm.get('dashboardId').setValue(dashsettList);

    if (this.userForm.value.userId) {
      this.userForm.controls['userId'].setValue(Number(this.userForm.value.userId));
    } else {
      this.userForm.get('password').setValue(Base64.encode('Steel@123'));
    }
    console.log(JSON.stringify(this.userForm.value))
    this.submitted = true;
    if (this.userForm.invalid) {
      return;
    } else {
      this.userService.saveUser(this.userForm.value).subscribe(s => {
        var success: any = s;
        if(success.code==0){
          this.toastService.showToast('danger', success.message);
        } else{
        this.userForm.patchValue(success.data);
        this.toastService.showToast('success', success.message);
        this.router.navigate(['views/user/add-edit-user'], { queryParams: { id: success.data.userId } });
        }
      });
    }
  }

  back() {
    this.router.navigate(['views/user/user-summary']);
  }

  workflowList: any = [];
  getWorkflowList(list) {
    this.userService.getWorkflowList(list).subscribe(data => {
      this.workflowList = data;
      if (this.workflowObj.gApprovalwfId) {
        this.selectedworkflowList = this.workflowList.filter(o1 => this.workflowObj.gApprovalwfId.some(o2 => o1.gApprovalwfId === o2));
      }
    });
  }


  //************************************************USER ROLE********************************************* */



  userRoleList: any = [];
  roleList: any = [];
  moduleList: any = [];
  userRoleDataTable() {
    this.userService.userRoleDataTable(this.userForm.value.userId).subscribe(s => {
      this.userRoleList = s;
    })
  }
  changeStartDate1(event) {
    this.userRoleForm.get('startDate').setValue(event.singleDate.jsDate);
  }
  changeEndDate1(event) {
    this.userRoleForm.get('endDate').setValue(event.singleDate.jsDate);
  }

  addUserRole() {
    let startDate: Date = new Date();
    this.userRoleForm.controls['userRoleId'].setValue(null);
    let fromModel: IMyDateModel = { isRange: false, singleDate: { jsDate: startDate }, dateRange: null };
    this.userRoleForm.controls['startDate11'].setValue(fromModel);

    let endDate: Date = new Date();
    let toModel: IMyDateModel = { isRange: false, singleDate: { jsDate: endDate }, dateRange: null };
    this.userRoleForm.controls['endDate11'].setValue(toModel);
    this.getAllActiveRoles();
    this.userRoleForm.controls['status'].setValue("ACTIVE");
  }


  saveUserRole() {
    this.userRoleForm.controls['userId'].setValue(this.userForm.value.userId);
    if (this.userRoleForm.value.startDate == null) {
      this.userRoleForm.get('startDate').setValue(this.userRoleForm.value.startDate11.singleDate.jsDate);
    }
    if (this.userRoleForm.value.endDate == null) {
      this.userRoleForm.get('endDate').setValue(this.userRoleForm.value.endDate11.singleDate.jsDate);
    }
    this.userRoleForm.value.userRoleId ? this.userRoleForm.controls['userRoleId'].setValue(Number(this.userRoleForm.value.userRoleId)) : this.userRoleForm.controls['userRoleId'].setValue(undefined);
    this.userRoleForm.get('roleId').setValue(Number(this.userRoleForm.value.roleId));
    this.userRoleForm.get('createdBy').setValue(1);
    this.userRoleForm.get('creationDate').setValue(new Date());
    this.userRoleForm.get('lastUpdatedBy').setValue(1);
    this.userRoleForm.get('lastUpdateDate').setValue(new Date());
    this.userRoleForm.get('lastUpdateLogin').setValue(1);
    this.userRoleForm.get('userId').setValue(Number(this.userRoleForm.value.userId));

    this.userService.addUserRole(this.userRoleForm.value).subscribe(s => {
      var success: any = s;
      this.isUserRole = false;
      this.userRoleForm.reset();
      this.toastService.showToast('success', success.message);
      this.userRoleDataTable();
    });
  }

  getAllActiveRoles() {
    this.userService.getAllActiveRoles().subscribe(s => {
      this.roleList = s;
    })
  }


  editUserRole() {
    this.getAllActiveRoles();
    if (this.userRoleForm.value.userRoleId) {

      this.userService.getUserRoleByUserRoleId(this.userRoleForm.value.userRoleId).subscribe(success => {
        var s: any = success;
        this.userRoleForm.patchValue(s);
        this.userRoleForm.controls['roleId'].setValue(s.data.roleId);
        this.userRoleForm.controls['status'].setValue(s.data.status);


        let startDate: Date = new Date(s.data.startDate);
        let fromModel: IMyDateModel = { isRange: false, singleDate: { jsDate: startDate }, dateRange: null };
        this.userRoleForm.controls['startDate11'].setValue(fromModel);

        let endDate: Date = new Date(s.data.endDate);
        let toModel: IMyDateModel = { isRange: false, singleDate: { jsDate: endDate }, dateRange: null };
        this.userRoleForm.controls['endDate11'].setValue(toModel);
        if (this.isView) { this.userRoleForm.disable(); }

      });
    }
  }
  getDataUsingRedioBtn(data) {
    this.userRoleForm.controls['userRoleId'].setValue(data.userRoleId);
  }

  deleteUserRole() {
    if (this.userRoleForm.value.userRoleId) {
      this.userService.deleteUserRole(this.userRoleForm.value.userRoleId).subscribe(success1 => {
        var success: any = success1;
        this.toastService.showToast('success', success.message);
        this.userRoleDataTable();
      });
    }
  }


  selectedEmpList = [];
  dropdownSettings: IDropdownSettings = {
    singleSelection: false,
    idField: 'companyId',
    textField: 'companyName',
    selectAllText: 'Select All',
    unSelectAllText: 'UnSelect All',
    itemsShowLimit: 3,
    allowSearchFilter: true
  };

  onEmployeeSelect(item: any) {
    this.selectedEmpList.push(item);
    this.getAllDept(this.selectedEmpList);
  }

  onEmployeeDeSelect(items: any) {
    this.selectedEmpList = this.selectedEmpList.filter(item => item.companyId !== items.companyId);
    this.getAllDept(this.selectedEmpList);
  }

  onSelectAllEmployee(items: any) {
    this.selectedEmpList = [];
    this.selectedEmpList.push(...[items]);
    this.getAllDept(this.selectedEmpList);
  }

  setCompanyList(list) {
    let elm: any = [];
    list.forEach(element => {
      elm.push(element.companyId);
    });
    let unique = [...new Set(elm)];
    return unique;
  }

  ////////////////////////////////////

  selectedworkflowList = [];
  dropdownSettingsWorkflow: IDropdownSettings = {
    singleSelection: false,
    idField: 'gApprovalwfId',
    textField: 'name',
    selectAllText: 'Select All',
    unSelectAllText: 'UnSelect All',
    itemsShowLimit: 3,
    allowSearchFilter: true
  };

  onWorkflowSelect(item: any) {
    this.selectedworkflowList.push(item);
  }

  onWorkflowDeSelect(items: any) {
    this.selectedworkflowList = this.selectedworkflowList.filter(item => item.gApprovalwfId !== items.gApprovalwfId);
  }

  onSelectAllWorkflow(items: any) {

    this.selectedworkflowList = [];
    this.selectedworkflowList.push(...[items]);
  }

  setWorkflowList(list) {
    let elm: any = [];
    list.forEach(element => {
      elm.push(element.gApprovalwfId);
    });
    let unique = [...new Set(elm)];
    return unique;
  }

  //================================================ Multiselect Department list
  
  setSelectedCompList(list) {
    let elm: any = [];
    list.forEach(element => {
      elm.push(element.companyId);
    });
    let unique = [...new Set(elm)];
    return unique;
  }


  deptList: any = [];
  compList:any=[];
  getAllDept(selCompnyList) {
    
    this.compList = this.selectedEmpList.length==1 ? this.setSelectedCompList(selCompnyList[0]) : this.setSelectedCompList(selCompnyList);
    this.getWorkflowList(this.compList); 
    this.getAllEmployeeById(this.compList);
    this.userService.getAllDept(this.compList).subscribe(s => {
      this.deptList = s;
      // if(this.userForm.value.userId){
      //   this.selectedDeptList = this.deptList.filter(o1 => this.deptObj.deptId.some(o2 => o1.deptId === o2));
      // }
    });

  }

  selectedDeptList = [];
  deptSettings: any = {};
  deptMultiSelFun() {
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


  onDeptSelect(item: any) {
    this.selectedDeptList.push(item);
    this.deptWiseEmpListFun(this.selectedDeptList);
  }

  onDeptDeSelect(items: any) {
    this.selectedDeptList = this.selectedDeptList.filter(item => item.deptId !== items.deptId);
    this.deptWiseEmpListFun(this.selectedDeptList);
  }

  onSelectAllDept(items: any) {
    this.selectedDeptList = [];
    this.selectedDeptList.push(...[items]);
    this.deptWiseEmpListFun(this.selectedDeptList);
  }

  // ===========================================

  setSelectedDeptList1(list) {
    let elm: any = [];
    list.forEach(element => {
      elm.push(element.deptId);
    });
    let unique = [...new Set(elm)];
    return unique;
  }

  
  selDeptList:any=[];
  departtWiseList:any=[];
  deptWiseEmpListFun(selDepartmentlist){
    this.selDeptList = this.selectedDeptList.length==1 ? this.setSelectedDeptList1(selDepartmentlist[0]) : this.setSelectedDeptList1(selDepartmentlist);

    this.userService.getemplbycompDeptid({"eligibleforCompany":this.compList,"eligiblefordept":this.selDeptList}).subscribe(data=>{
       this.departtWiseList = data;
    });
  }


  // ================================================

  selectedDeptWiseList = [];
  deptWiseSettings: any = {};
  deptWiseMultiSelFun() {
    this.deptWiseSettings = {
      singleSelection: false,
      idField: 'employeeId',
      textField: 'displayName',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };
  }


  onDeptWiseSelect(item: any) {
    this.selectedDeptWiseList.push(item);
  }

  onDeptWiseDeSelect(items: any) {
    this.selectedDeptWiseList = this.selectedDeptWiseList.filter(item => item.employeeId !== items.employeeId);
  }

  onSelectAllDeptWise(items: any) {
    this.selectedDeptWiseList = [];
    this.selectedDeptWiseList.push(...[items]);
  }

    //================================================ Multiselect DashboardSettings list

    selectedDashSettingList = [];
    dashboardSettings: IDropdownSettings;
  
    dashboardSSetting() {
      this.dashboardSettings = {
        singleSelection: false,
        idField: 'dashboardId',
        textField: 'name',
        selectAllText: 'Select All',
        unSelectAllText: 'UnSelect All',
        itemsShowLimit: 3,
        allowSearchFilter: true
      };
    }
   
    onDashSettingSelect(item: any) {
      this.selectedDashSettingList.push(item);
    }
  
    onDashSettingDeSelect(items: any) {
      this.selectedDashSettingList = this.selectedDashSettingList.filter(item => item.dashboardId !== items.dashboardId);
    }
  
    onSelectAllDashSetting(items: any) {
      this.selectedDashSettingList = [];
      this.selectedDashSettingList.push(...[items]);
    }

}
