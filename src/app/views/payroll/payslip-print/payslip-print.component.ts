import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { environment } from 'src/environments/environment';
import { CommonService } from '../../services/common.service';
import { ToastrService } from '../../services/toastr.service';
import { PayrollProcessingService } from '../payroll-processing/payroll-processing.service';

@Component({
  selector: 'app-payslip-print',
  templateUrl: './payslip-print.component.html',
  styleUrls: ['./payslip-print.component.scss']
})
export class PayslipPrintComponent implements OnInit {

  payslipprintform: any;
  submitted = false;
  isView: boolean = false;
  insanceId: any;
  filterString = "";
  filtered;
  items = [];
  tempList: any = [];


  companyList: any;

  empList: any;

  monthList: any;
  holdingList: any = [];
  btnLoader: boolean;
  wpsList: any = [];

  
  moduleid:any;
  moduleList: any = [];
  flags = {
    createFlag: '',
    editFlag: '',
    readFlag: '',
    deleteFlag: '',
    exportFlag:'',
    importFlag:''
  }
  

  constructor(private toastService: ToastrService, private cdr: ChangeDetectorRef,
    private payrollProcessingService: PayrollProcessingService, private commonService: CommonService,
    private formBuilder: FormBuilder) {
    this.payslipprintform = new FormGroup({
      companyId: new FormControl(null,[Validators.required]),
      employeeId: new FormControl(null),
      holdingId: new FormControl(null),
      monthId: new FormControl(null,[Validators.required]),
    });

    this.moduleList = JSON.parse(sessionStorage.getItem("moduleList"));
    if (this.moduleList) {
      this.moduleList.map((e) => {
        if (e.moduleGroup == 'Payroll' && e.moduleName == 'Payslip-Print') {
          this.moduleid=e.moduleId;
          this.flags = { 
                'createFlag': e.createFlag, 
                'editFlag': e.editFlag, 
                'readFlag': e.readFlag, 
                'deleteFlag': e.deleteFlag,
                'importFlag': e.importFlag,
                'exportFlag': e.exportFlag
                };
        }
      });
    }

  }


  changeCompany(id) {
    let list = [Number(id)];
    this.selectedEmpList = [];
    this.getEmpList(list);
  }


  getEmpList(l) {

    this.payrollProcessingService.getEmpList(this.moduleid,l).subscribe(data => {

      this.empList = data;
    });
  }

  getMonthList() {
    this.payrollProcessingService.getMonthList().subscribe(data => {
      this.monthList = data;
    });
  }


  get f() { return this.payslipprintform.controls; }

  ngOnInit() {


    this.getAssignCompany();
    this.getMonthList();
    this.getHoldingList();

  }

  getAssignCompany() {
    let list: any = JSON.parse(sessionStorage.getItem("company"));
    var l: any = [];
    if(list){
    for (var i = 0; i < list.length; i++) {

     // if (list[i] != ',') {
        l.push(Number(list[i]));
      // }
    }}
    this.getEmpList(l);
  }




  getHoldingList() {
    this.payrollProcessingService.getHoldingList().subscribe(data => {
      this.holdingList = data;
      this.payslipprintform.get('holdingId').setValue(this.holdingList[0].gHoldingId);
      this.getCompanyList(this.holdingList[0].gHoldingId);
    });
  }



  getCompanyList(holdingId) {
    this.payrollProcessingService.getCompanyList(holdingId).subscribe(data => {
      this.companyList = data;
      if (this.companyList) {

        let list: any =JSON.parse(sessionStorage.getItem("company"));
        var l: any = [];
        if(list){
        for (var i = 0; i < list.length; i++) {
         // if (list[i] != ',') {
            l.push(Number(list[i]));
          // }
        }}

        this.companyList = this.companyList.filter(o1 => l.some(o2 => o1.gCompanyId === o2));

      }
    });
  }

  setEmpList(list) {
    let elm: any = [];
    list.forEach(element => {
      elm.push(element.employeeId);
    });
    let unique = [...new Set(elm)];
    return unique;
  }
  
   
  print() {
    this.submitted = true;
    if (this.payslipprintform.invalid) {
      return;
    } else{
      this.btnLoader = true;

    let empIdList: any;
    if (this.selectedEmpList.length > 0) {
      empIdList = this.setEmpList(this.selectedEmpList);
    } else {
      empIdList = [];
    }
    this.btnLoader=false;
    let str = "?transId=&compId=" + this.payslipprintform.value.companyId + "&empId=" + empIdList + "&userId=" + sessionStorage.getItem("userId") + "&month=" + this.payslipprintform.value.monthId;
    window.open(environment.PRINT_PAYSLIP + str);
  }
}

  selectedEmpList = [];
  dropdownSettings: IDropdownSettings = {
    singleSelection: false,
    idField: 'employeeId',
    textField: 'displayName',
    selectAllText: 'Select All',
    unSelectAllText: 'UnSelect All',
    itemsShowLimit: 5,
    allowSearchFilter: true
  };

  onEmployeeSelect(item: any) {
    this.selectedEmpList.push(item);
  }

  onEmployeeDeSelect(items: any) {
    this.selectedEmpList = this.selectedEmpList.filter(item => item.employeeId !== items.employeeId);
  }

  onSelectAllEmployee(items: any) {
    this.selectedEmpList = [];
    this.selectedEmpList.push(...[items]);
  }


}
