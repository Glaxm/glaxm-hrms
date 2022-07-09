import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularMyDatePickerDirective, IMyDateModel } from 'angular-mydatepicker';
import { CommonService, IMPORT_FORMAT_EMPLOYEE_SHIFT_ALLOCATION } from '../../services/common.service';
import { ExcelService } from '../../services/excel.service';
import { ToastrService } from '../../services/toastr.service';
import { ModuleService } from '../../uam/module/module.service';
import { AssignShiftService } from './assign-shift.service';

@Component({
  selector: 'app-assign-shift',
  templateUrl: './assign-shift.component.html',
  styleUrls: ['./assign-shift.component.scss']
})
export class AssignShiftComponent implements OnInit {

  moduleForm:any;
  fileUploadFormAssignShift:any;
  emplist: any=[];
  emplistform:any=FormGroup;
  submitted = false;
  isView:boolean=false;
  
  divList:any=[];
  catList:any=[];
  sectionList:any=[];
  deptList:any=[];
  existingShiftSelectionList:any=[];

  moduleList: any = [];
  moduleid:any;
  flags = {
    createFlag: '',
    editFlag: '',
    readFlag: '',
    deleteFlag: '',
    exportFlag:'',
    importFlag:''
  }


  statusList:any=[ {valueCode:'ACTIVE', valueName:'Active'}, {valueCode:'INACTIVE', valueName:'Inactive'} ];
  moduleGroupList=[
    {valueCode:'Report', valueName:'Report'},
    {valueCode:'Payroll', valueName:'Payroll'},
    {valueCode:'Admin Settings', valueName:'Admin Settings'}, 
    {valueCode:'Employee Profile', valueName:'Employee Profile'},
    {valueCode:'Masters', valueName:'Masters'}, 
    {valueCode:'Transactions', valueName:'Transactions'}, 
    {valueCode:'Approvals', valueName:'Approvals'},
    {valueCode:'Asset', valueName:'Asset'}];
  public myDatePickerOptions = this.commonService.datepickerFormat;
  @ViewChild('dp1', {static: false}) myDp1: AngularMyDatePickerDirective;
  @ViewChild('dp2', {static: false}) myDp2: AngularMyDatePickerDirective;
  
  constructor(private router:Router,private toastService:ToastrService,
    private cdr: ChangeDetectorRef,private activatedRoute:ActivatedRoute,private excelService:ExcelService,
    private commonService:CommonService,private moduleService:ModuleService
    ,private formBuilder: FormBuilder,private asignShiftService:AssignShiftService) {
    this.moduleForm = new FormGroup({
      moduleId: new FormControl(null),
      empCategory: new FormControl(null),
      moduleCode: new FormControl(null,[Validators.required]),
      moduleName: new FormControl(null,[Validators.required]),
      moduleDesc: new FormControl(null),
      moduleUrl: new FormControl(null,[Validators.required]),
      moduleGroup: new FormControl(null,[Validators.required]),
      startDate: new FormControl(null,[Validators.required]),
      endDate: new FormControl(null),
      startDate1: new FormControl(null),
      endDate1: new FormControl(null),
      divisionId:new FormControl(null),
      status: new FormControl(null,[Validators.required]),
      createdBy: new FormControl(null,[Validators.required]),
      creationDate: new FormControl(null,[Validators.required]),
      lastUpdatedBy: new FormControl(null,[Validators.required]),
      lastUpdateDate: new FormControl(null,[Validators.required]),
      lastUpdateLogin: new FormControl(null,[Validators.required]),

      sectionId: new FormControl(null),
      deptId: new FormControl(null),
      existShiftId: new FormControl(null),
    });

    this.fileUploadFormAssignShift = new FormGroup({
      fileName:new FormControl(null)
    });
    this.activatedRoute.queryParams.subscribe(params => {
      this.moduleForm.controls['moduleId'].setValue(params.id);
      this.isView = params.view;
    });

    this.moduleList = JSON.parse(sessionStorage.getItem("moduleList"));
    if (this.moduleList) {
      this.moduleList.map((e) => {
        if (e.moduleGroup == 'Shift Management' && e.moduleName == 'Shift Allocation') {
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

   get f() { return this.moduleForm.controls; }

  ngOnInit() {

    this.getDivList();
    this.getCatList();
    this.getSectionList();
    this.getDeptList();
    this.getExistingShiftSelectionList();


    if(this.moduleForm.value.moduleId){
     
      this.moduleService.getModuleById(this.moduleForm.value.moduleId).subscribe(success=>{
        var s:any=success;
        this.moduleForm.patchValue(s.data);
        let startDate: Date = new Date(s.data.startDate);
        let fromModel: IMyDateModel = {isRange: false, singleDate: {jsDate: startDate}, dateRange: null};
        this.moduleForm.controls['startDate1'].setValue(fromModel);
        
        let endDate: Date = new Date(s.data.endDate);
        let toModel: IMyDateModel = {isRange: false, singleDate: {jsDate: endDate}, dateRange: null};
        this.moduleForm.controls['endDate1'].setValue(toModel);
        if(this.isView){ this.moduleForm.disable(); }
      });
    } else{
        let startDate: Date = new Date();
        let fromModel: IMyDateModel = {isRange: false, singleDate: {jsDate: startDate}, dateRange: null};
        this.moduleForm.controls['startDate1'].setValue(fromModel);
        
        let endDate: Date = new Date();
        let toModel: IMyDateModel = {isRange: false, singleDate: {jsDate: endDate}, dateRange: null};
        this.moduleForm.controls['endDate1'].setValue(toModel);
    }

    this.getShiftList();
    this.getEmpCatList();
  }

  getDivList(){
    this.asignShiftService.getDivList().subscribe(s=>{
        this.divList = s;
    });
  }
  getCatList(){
    this.asignShiftService.getEmpCatList().subscribe(data=>{
      this.empCatList = data;
    }) 
  }
  getSectionList(){
    this.asignShiftService.getSectionList().subscribe(s=>{
      this.sectionList = s;
    })
  }
  getDeptList(){
    this.asignShiftService.getDeptList().subscribe(s=>{
      this.deptList = s;
    })
  }
  getExistingShiftSelectionList(){
    this.asignShiftService.getExistingShiftSelectionList().subscribe(s=>{
      this.existingShiftSelectionList = s;
    })
  }

  shiftList:any=[];
  getShiftList(){
      this.asignShiftService.getShiftRuleList().subscribe(data=>{
        this.shiftList = data;
      })
  }

  empCatList:any=[];
  getEmpCatList(){
    this.asignShiftService.getEmpCatList().subscribe(data=>{
      this.empCatList = data;
    })
  }
  toggleCalendar(): void {
    this.cdr.detectChanges();
    this.myDp1.toggleCalendar();
  }
  changeStartDate(event){
    this.moduleForm.get('startDate').setValue(event.singleDate.jsDate);
  }
  changeEndDate(event){
    this.moduleForm.get('endDate').setValue(event.singleDate.jsDate);
  }

  addModule(){
    if(this.moduleForm.value.startDate==null){
      this.moduleForm.get('startDate').setValue(this.moduleForm.value.startDate1.singleDate.jsDate);
    }
    if(this.moduleForm.value.endDate==null){
      this.moduleForm.get('endDate').setValue(this.moduleForm.value.endDate1.singleDate.jsDate);
    }
    this.moduleForm.value.moduleId ? this.moduleForm.controls['moduleId'].setValue(Number(this.moduleForm.value.moduleId)):this.moduleForm.controls['moduleId'].setValue(undefined);

    this.moduleForm.get('createdBy').setValue(1);
    this.moduleForm.get('creationDate').setValue(new Date());
    this.moduleForm.get('lastUpdatedBy').setValue(1);
    this.moduleForm.get('lastUpdateDate').setValue(new Date());
    this.moduleForm.get('lastUpdateLogin').setValue(1);
    this.submitted = true;
    if (this.moduleForm.invalid) {
      return;
    } else{
      this.moduleService.saveModule(this.moduleForm.value).subscribe(s=>{
        var success:any = s;
        this.submitted = true;
        this.toastService.showToast('success',success.message);
        this.back();
     });
    }
  }

  back(){
    this.router.navigate(['views/assign-shift/shift-assign']);
  }

 

  getEmpListByCat(catId){
    let list:any = JSON.parse(sessionStorage.getItem("company"));
    var l:any=[];
    // alert(list.length)
    if(list){
    for(var i=0;i<list.length;i++){
     
     // if(list[i]!=','){
        l.push(Number(list[i]));
      // }
    }}
    this.asignShiftService.getEmpList(this.moduleid,l).subscribe(data=>{
        this.emplist = data;
    })
  }


  // Import file

  uploadDataByFile(){
    
  }

  fileUpload1(event, tab){
   console.log(event);
   // this.formData.append('fileinfo', tab);
    if (this.file.name) {
      this.asignShiftService.uploadCsvFileAssignShift(this.formData).subscribe(s => {
        var data: any = s;
        this.file = null;
        this.formData = null;
        this.toastService.showToast('success', data.message);
        this.getShiftList();
      });
    } else {
    }
  }

  file: File;
  formData: FormData; // = new FormData();
  fileChange(event,str){
    this.formData = new FormData();
    let fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      this.file = fileList[0];
      this.formData.append('file', this.file, this.file.name)
    }
  }

  sampleFileFormat(){
    this.excelService.exportAsExcelFile(IMPORT_FORMAT_EMPLOYEE_SHIFT_ALLOCATION,'Employee_Shift_Allocation_Import_Format')
  }

  
}
