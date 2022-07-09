import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularMyDatePickerDirective, IMyDateModel } from 'angular-mydatepicker';
import { CommonService, GeneralListCode } from 'src/app/views/services/common.service';
import { ToastrService } from 'src/app/views/services/toastr.service';
import { environment } from 'src/environments/environment';
import { DocumentsService } from '../documents.service';

@Component({
  selector: 'app-add-documents',
  templateUrl: './add-documents.component.html',
  styleUrls: ['./add-documents.component.scss']
})
export class AddDocumentsComponent implements OnInit {

  public myDatePickerOptions = this.commonService.datepickerFormat;
  @ViewChild('dp1', { static: false }) myDp1: AngularMyDatePickerDirective;
  @ViewChild('dp2', { static: false }) myDp2: AngularMyDatePickerDirective;
  @ViewChild('dp3', { static: false }) myDp3: AngularMyDatePickerDirective;
  statusList: any = [{ valueCode: 'ACTIVE', valueName: 'Active' }, { valueCode: 'INACTIVE', valueName: 'Inactive' }]
  moduleid:any;
  docObj: any = {
    lEmppdocId: null, xdoctypeId: null, xEmployeeId: null, gCompanyId: null, gHoldingId: null,
    isActive: null, createdBy: null, updatedBy: null, created: null, updated: null, birthplace: null,
    docno: null, doccardno: null, issueplace: null, issuedate: null, expirydate: null, visajobtitle: null,
    medinsprovname: null, iDt: null, eDt: null, empname: null, oldEmpId: null, empcode: null,
    docname: null,lspossessionId :null,remark:null
  }

  documentsForm: FormGroup;
  submitted:boolean=false;
  isView: boolean = false;
  holdingList: any = [];
  companyList: any = [];
  employeeList: any = [];
  documenttypeList: any = [];
  empList: any = [];
  selectedItems: Array<any> = [];
  dropdownSettings: any = {};
  lEmppdocId: any;
  docType: any = [];
  filePath: any;
  possessionList:any=[];

  tepMethod() {
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
    this.documentsForm.controls['xEmployeeId'].setValue(item.employeeId);
  }
  onSelectAll(items: any) {
    console.log('onSelectAll', items);
  }


  constructor(private commonService: CommonService, private toastService: ToastrService, private activatedRoute: ActivatedRoute, private documentsService: DocumentsService, private router: Router) {
    this.documentsForm = new FormGroup({
      fileName: new FormControl(null),
      file: new FormControl(null),
      lEmppdocId: new FormControl(null),
      xdoctypeId: new FormControl(null,[Validators.required]),
      xEmployeeId: new FormControl(null),
      gCompanyId: new FormControl(null,[Validators.required]),
      gHoldingId: new FormControl(null),
      isActive: new FormControl(null),
      createdBy: new FormControl(null),
      updatedBy: new FormControl(null),
      created: new FormControl(null),
      updated: new FormControl(null),
      birthplace: new FormControl(null),
      docno: new FormControl(null),
      doccardno: new FormControl(null),
      issueplace: new FormControl(null),
      issuedate: new FormControl(null),
      expirydate: new FormControl(null),
      visajobtitle: new FormControl(null),
      medinsprovname: new FormControl(null),
      iDt: new FormControl(null),
      eDt: new FormControl(null),
      empname: new FormControl(null),
      oldEmpId: new FormControl(null),
      empcode: new FormControl(null),
      docname: new FormControl(null),
      employee: new FormControl(null,[Validators.required]),
      
      p_passportno: new FormControl(null),
      p_birthplace: new FormControl(null),
      p_placeissue: new FormControl(null),
      p_dateofissue1: new FormControl(null),
      p_dateofexpiry1: new FormControl(null),
      p_dateofissue: new FormControl(null),
      p_dateofexpiry: new FormControl(null),
      p_lspossessionId : new FormControl(null),
      p_remark: new FormControl(null),
      e_emiratesid: new FormControl(null),
      e_emiratesidcardno: new FormControl(null),
      e_eiddateexpiry: new FormControl(null),
      e_eiddateexpiry1: new FormControl(null),
      v_visano: new FormControl(null),
      v_visafileno: new FormControl(null),
      v_visadateissue: new FormControl(null),
      v_visadateexpiry: new FormControl(null),
      v_visadateissue1: new FormControl(null),
      v_visadateexpiry1: new FormControl(null),
      v_visajobtitle: new FormControl(null),
      l_labourcardno: new FormControl(null),
      l_lcdateexpiry: new FormControl(null),
      l_lcdateexpiry1: new FormControl(null),
      l_lcpersonalid: new FormControl(null),
      j_jzidcardno: new FormControl(null),
      j_jzidateexpiry: new FormControl(null),
      j_jzidateexpiry1: new FormControl(null),
      m_medinscardno: new FormControl(null),
      m_medinsprovname: new FormControl(null),
      m_medinsdateexpiry: new FormControl(null),
      m_medinsdateexpiry1: new FormControl(null),
      d_drivinglicno: new FormControl(null),
      d_trafficcardno: new FormControl(null),
      d_placeofissue: new FormControl(null),
      d_dateofissue: new FormControl(null),
      d_dateofissue1: new FormControl(null),
    });

    this.activatedRoute.queryParams.subscribe(params => {
      this.lEmppdocId = params.id;
      this.isView = params.view;
      this.moduleid = params.moduleid;
    });
  }

  resetData() {
    this.documentsForm.controls['p_passportno'].reset();
    this.documentsForm.controls['p_birthplace'].reset();
    this.documentsForm.controls['p_placeissue'].reset();
    this.documentsForm.controls['p_dateofissue1'].reset();
    this.documentsForm.controls['p_dateofexpiry1'].reset();
    this.documentsForm.controls['p_dateofissue'].reset();
    this.documentsForm.controls['p_dateofexpiry'].reset();
    this.documentsForm.controls['p_lspossessionId'].reset();
    this.documentsForm.controls['p_remark'].reset();
    this.documentsForm.controls['e_emiratesid'].reset();
    this.documentsForm.controls['e_emiratesidcardno'].reset();
    this.documentsForm.controls['e_eiddateexpiry'].reset();
    this.documentsForm.controls['e_eiddateexpiry1'].reset();
    this.documentsForm.controls['v_visano'].reset();
    this.documentsForm.controls['v_visafileno'].reset();
    this.documentsForm.controls['v_visadateissue'].reset();
    this.documentsForm.controls['v_visadateexpiry'].reset();
    this.documentsForm.controls['v_visadateissue1'].reset();
    this.documentsForm.controls['v_visadateexpiry1'].reset();
    this.documentsForm.controls['v_visajobtitle'].reset();
    this.documentsForm.controls['l_labourcardno'].reset();
    this.documentsForm.controls['l_lcdateexpiry'].reset();
    this.documentsForm.controls['l_lcdateexpiry1'].reset();
    this.documentsForm.controls['l_lcpersonalid'].reset();
    this.documentsForm.controls['j_jzidcardno'].reset();
    this.documentsForm.controls['j_jzidateexpiry'].reset();
    this.documentsForm.controls['j_jzidateexpiry1'].reset();
    this.documentsForm.controls['m_medinscardno'].reset();
    this.documentsForm.controls['m_medinsprovname'].reset();
    this.documentsForm.controls['m_medinsdateexpiry'].reset();
    this.documentsForm.controls['m_medinsdateexpiry1'].reset();
    this.documentsForm.controls['d_drivinglicno'].reset();
    this.documentsForm.controls['d_trafficcardno'].reset();
    this.documentsForm.controls['d_placeofissue'].reset();
    this.documentsForm.controls['d_dateofissue'].reset();
    this.documentsForm.controls['d_dateofissue1'].reset();
  }

  ngOnInit() {
    this.tepMethod();
    this.getHoldingList();
    this.getDocType();
    this.getPossession();
    if (this.lEmppdocId) {
      this.documentsService.getDocHistoryById(this.lEmppdocId).subscribe(success => {
        var s: any = success;
        this.getEmployeeList(s.data.gCompanyId);
        this.selectedItems = [{ 'employeeId': s.data.xEmployeeId, 'displayName': s.data.empname }];
        this.documentsForm.patchValue(s.data);
        // this.doctypecode = s.data.doctypeCode;
        this.selectDocType(s.data.xdoctypeId);
        this.filePath = s.data.path;
        let fullPath = s.data.path;
        if (s.data.path) {
          this.documentsForm.get('fileName').setValue(fullPath.split(/[\\\/]/).pop());
          this.documentsForm.get('file').setValue(this.documentsForm.value.fileName);
        }
        if (s.data.doctypeCode == 'PP') {
          this.documentsForm.get('p_passportno').setValue(s.data.docno);
          this.documentsForm.get('p_birthplace').setValue(s.data.birthplace);
          this.documentsForm.get('p_placeissue').setValue(s.data.issueplace);
          this.documentsForm.get('p_lspossessionId').setValue(s.data.lspossessionId);
          this.documentsForm.get('p_remark').setValue(s.data.remark);
          if (s.data.issuedate) {
            let p_placeissue = new Date(s.data.issuedate);
            let p_placeissue1: IMyDateModel = { isRange: false, singleDate: { jsDate: p_placeissue }, dateRange: null };
            this.documentsForm.controls['p_dateofissue'].setValue(p_placeissue1);
            this.changeDateofIssue(p_placeissue1);
          }
          if (s.data.expirydate) {
            let p_dateofexpiry = new Date(s.data.expirydate);
            let p_dateofexpiry1: IMyDateModel = { isRange: false, singleDate: { jsDate: p_dateofexpiry }, dateRange: null };
            this.documentsForm.controls['p_dateofexpiry'].setValue(p_dateofexpiry1);
            this.changeDateofExpiry(p_dateofexpiry1);
          }
        }
        if (s.data.doctypeCode == 'EID') {
          this.documentsForm.get('e_emiratesid').setValue(s.data.docno);
          this.documentsForm.get('e_emiratesidcardno').setValue(s.data.doccardno);
          if (s.data.expirydate) {
            let e_eiddateexpiry = new Date(s.data.expirydate);
            let e_eiddateexpiry1: IMyDateModel = { isRange: false, singleDate: { jsDate: e_eiddateexpiry }, dateRange: null };
            this.documentsForm.controls['e_eiddateexpiry'].setValue(e_eiddateexpiry1);
            this.changeEDateofExpiry(e_eiddateexpiry1);
          }
        }
        if (s.data.doctypeCode == 'VISA') {
          this.documentsForm.get('v_visano').setValue(s.data.doccardno);
          this.documentsForm.get('v_visafileno').setValue(s.data.doccardno);
          this.documentsForm.get('v_visadateissue').setValue(s.data.issuedate);
          this.documentsForm.get('v_visadateexpiry').setValue(s.data.expirydate);
          this.documentsForm.get('v_visajobtitle').setValue(s.data.visajobtitle);
          if (s.data.issuedate) {
            let v_visadateissue = new Date(s.data.issuedate);
            let v_visadateissue1: IMyDateModel = { isRange: false, singleDate: { jsDate: v_visadateissue }, dateRange: null };
            this.documentsForm.controls['v_visadateissue'].setValue(v_visadateissue1);
            this.changeVIssueDate(v_visadateissue1);
          }
          if (s.data.expirydate) {
            let v_visadateexpiry = new Date(s.data.expirydate);
            let v_visadateexpiry1: IMyDateModel = { isRange: false, singleDate: { jsDate: v_visadateexpiry }, dateRange: null };
            this.documentsForm.controls['v_visadateexpiry'].setValue(v_visadateexpiry1);
            this.changeVExpiryDate(v_visadateexpiry1);
          }
        }
        if (s.data.doctypeCode == 'LBRCRD') {
          this.documentsForm.get('l_labourcardno').setValue(s.data.doccardno);
          this.documentsForm.get('l_lcpersonalid').setValue(s.data.docno);
          if (s.data.expirydate) {
            let l_lcdateexpiry = new Date(s.data.expirydate);
            let l_lcdateexpiry1: IMyDateModel = { isRange: false, singleDate: { jsDate: l_lcdateexpiry }, dateRange: null };
            this.documentsForm.controls['l_lcdateexpiry'].setValue(l_lcdateexpiry1);
            this.changeLExpiryDate(l_lcdateexpiry1);
          }
        }
        if (s.data.doctypeCode == 'JFZCRD') {
          this.documentsForm.get('j_jzidcardno').setValue(s.data.doccardno);
          if (s.data.expirydate) {
            let j_jzidateexpiry = new Date(s.data.expirydate);
            let j_jzidateexpiry1: IMyDateModel = { isRange: false, singleDate: { jsDate: j_jzidateexpiry }, dateRange: null };
            this.documentsForm.controls['j_jzidateexpiry'].setValue(j_jzidateexpiry1);
            this.changeJExpiryDate(j_jzidateexpiry1);
          }
        }
        if (s.data.doctypeCode == 'MEDINS') {
          this.documentsForm.get('m_medinscardno').setValue(s.data.doccardno);
          this.documentsForm.get('m_medinsprovname').setValue(s.data.medinsprovname);
          if (s.data.expirydate) {
            let m_medinsdateexpiry = new Date(s.data.expirydate);
            let fromModel: IMyDateModel = { isRange: false, singleDate: { jsDate: m_medinsdateexpiry }, dateRange: null };
            this.documentsForm.controls['m_medinsdateexpiry'].setValue(fromModel);
            this.changeMExpiryDate(fromModel);
          }
        }

        if (s.data.doctypeCode == 'DRVLIC') {
          this.documentsForm.get('d_drivinglicno').setValue(s.data.docno);
          this.documentsForm.get('d_trafficcardno').setValue(s.data.doccardno);
          this.documentsForm.get('d_placeofissue').setValue(s.data.issueplace);

          if (s.data.issuedate) {
            let d_dateofissue = new Date(s.data.issuedate);
            let d_dateofissue1: IMyDateModel = { isRange: false, singleDate: { jsDate: d_dateofissue }, dateRange: null };
            this.documentsForm.controls['d_dateofissue'].setValue(d_dateofissue1);
            this.changeDDOI(d_dateofissue1);
          }
        }
      });
    }
  }

  doctypecode: any;
  selectDocType(type) {
    this.resetData();
    if (type) {
      let doctypelist = this.docType.filter(el => el.xdoctypeId == type);
      this.doctypecode = doctypelist[0].code;
    }
    if(this.doctypecode=='PP'){
      
      this.documentsForm.controls["p_passportno"].setValidators([Validators.required]);
      this.documentsForm.controls["p_passportno"].updateValueAndValidity();
      this.documentsForm.controls["p_dateofissue"].setValidators([Validators.required]);
      this.documentsForm.controls["p_dateofissue"].updateValueAndValidity();
      this.documentsForm.controls["p_dateofexpiry"].setValidators([Validators.required]);
      this.documentsForm.controls["p_dateofexpiry"].updateValueAndValidity();
    }
    if (this.doctypecode == 'EID') {
      this.documentsForm.controls["e_emiratesid"].setValidators([Validators.required]);
      this.documentsForm.controls["e_emiratesid"].updateValueAndValidity();
      this.documentsForm.controls["e_eiddateexpiry"].setValidators([Validators.required]);
      this.documentsForm.controls["e_eiddateexpiry"].updateValueAndValidity();
    }
    if (this.doctypecode == 'VISA') {
      this.documentsForm.controls["v_visano"].setValidators([Validators.required]);
      this.documentsForm.controls["v_visano"].updateValueAndValidity();
      this.documentsForm.controls["v_visadateissue"].setValidators([Validators.required]);
      this.documentsForm.controls["v_visadateissue"].updateValueAndValidity();
      this.documentsForm.controls["v_visadateexpiry"].setValidators([Validators.required]);
      this.documentsForm.controls["v_visadateexpiry"].updateValueAndValidity();
    }
    if (this.doctypecode == 'LBRCRD') {
      this.documentsForm.controls["l_labourcardno"].setValidators([Validators.required]);
      this.documentsForm.controls["l_labourcardno"].updateValueAndValidity();
      this.documentsForm.controls["l_lcdateexpiry"].setValidators([Validators.required]);
      this.documentsForm.controls["l_lcdateexpiry"].updateValueAndValidity();
    }
    if (this.doctypecode == 'JFZCRD') {
      this.documentsForm.controls["j_jzidcardno"].setValidators([Validators.required]);
      this.documentsForm.controls["j_jzidcardno"].updateValueAndValidity();
      this.documentsForm.controls["j_jzidateexpiry"].setValidators([Validators.required]);
      this.documentsForm.controls["j_jzidateexpiry"].updateValueAndValidity();
    }
    if (this.doctypecode == 'MEDINS') {
      this.documentsForm.controls["m_medinscardno"].setValidators([Validators.required]);
      this.documentsForm.controls["m_medinscardno"].updateValueAndValidity();
      this.documentsForm.controls["m_medinsdateexpiry"].setValidators([Validators.required]);
      this.documentsForm.controls["m_medinsdateexpiry"].updateValueAndValidity();
    }
    if (this.doctypecode == 'DRVLIC') {
      this.documentsForm.controls["d_drivinglicno"].setValidators([Validators.required]);
      this.documentsForm.controls["d_drivinglicno"].updateValueAndValidity();
      this.documentsForm.controls["d_dateofissue"].setValidators([Validators.required]);
      this.documentsForm.controls["d_dateofissue"].updateValueAndValidity();
    }
  }

  getDocType() {
    this.documentsService.getAllDocumenttype().subscribe(data => {
      this.docType = data;
    });
  }

 
  getPossession(){
    this.commonService.getGeneralListByCode(GeneralListCode.POSSESSION_LIST).subscribe(data => {
        this.possessionList = data;
    })
  }

  getEmployeeByCompany(id) {
    this.documentsService.getEmpListByCompany(id).subscribe(data => {
      this.empList = data;
    })
  }

  get f() { return this.documentsForm.controls; }

  changeTransactionDate(event) {
    this.documentsForm.get('trxdate').setValue(this.commonService.dateFormat(event.singleDate.jsDate));
  }

  changeStartDate(event) {
    this.documentsForm.get('stdate').setValue(this.commonService.dateFormat(event.singleDate.jsDate));
  }
  changeEndDate(event) {
    this.documentsForm.get('endate').setValue(this.commonService.dateFormat(event.singleDate.jsDate));
  }

  changeDDOI(event) {
    this.documentsForm.get('d_dateofissue1').setValue(event.singleDate.jsDate);
  }

  getCompanyListByHoldingId(holdinId) {
    this.documentsService.getCompanyListByHoldingId(holdinId).subscribe(s => {
      this.companyList = s;
      if(this.companyList){
        let list:any = JSON.parse(sessionStorage.getItem("company"));
        var l:any=[];
        if(list){
        for(var i=0;i<list.length;i++){
            l.push(Number(list[i]));
        }}
      
      this.companyList = this.companyList.filter(o1 => l.some(o2 => o1.gCompanyId === o2));
    }
    });
  }

  getEmployeeList(cmpList) {
    let l: any = [Number(cmpList)];
    this.documentsService.getAllEmployee(this.moduleid,l).subscribe(s => {
      this.employeeList = s;
      if (this.documentsForm.value.documentsId && this.documentsForm.value.employeeId) {
        let list = this.employeeList.filter(item => item.employeeId == this.documentsForm.value.employeeId);
        if (list.length > 0) {
          this.selectedItems = [{ 'employeeId': list[0].employeeId, 'displayName': list[0].displayName }];
        }
      }
    });
  }

  getHoldingList() {
    this.documentsService.getHoldingList().subscribe(s => {
      this.holdingList = s;
      this.documentsForm.get('gHoldingId').setValue(this.holdingList[0].gHoldingId);
      this.getCompanyListByHoldingId(this.holdingList[0].gHoldingId)
    });
  }

  // *********************************** Add Update Documents

  addUpdatedocuments() {
    this.documentsForm.get('isActive').setValue("Y");
    this.documentsForm.get('createdBy').setValue(Number(sessionStorage.getItem('userId')));
    this.documentsForm.get('updatedBy').setValue(Number(sessionStorage.getItem('userId')));
    this.documentsForm.get('created').setValue(new Date());
    this.documentsForm.get('updated').setValue(new Date());

    this.docObj.lEmppdocId = this.documentsForm.value.lEmppdocId ? this.documentsForm.value.lEmppdocId : undefined;
    this.docObj.xdoctypeId = Number(this.documentsForm.value.xdoctypeId);
    this.docObj.xEmployeeId = this.documentsForm.value.xEmployeeId;
    this.docObj.gCompanyId = Number(this.documentsForm.value.gCompanyId);
    this.docObj.gHoldingId = this.documentsForm.value.gHoldingId;
    this.docObj.isActive = this.documentsForm.value.isActive;
    this.docObj.createdBy = this.documentsForm.value.createdBy;
    this.docObj.updatedBy = this.documentsForm.value.updatedBy;
    this.docObj.created = this.documentsForm.value.created;
    this.docObj.updated = this.documentsForm.value.updated;
    
    if (this.doctypecode == 'PP') {
      this.docObj.docno = this.documentsForm.value.p_passportno;
      this.docObj.birthplace = this.documentsForm.value.p_birthplace;
      this.docObj.issueplace = this.documentsForm.value.p_placeissue;
      this.docObj.issuedate = this.documentsForm.value.p_dateofissue1;
      this.docObj.expirydate = this.documentsForm.value.p_dateofexpiry1;
      this.docObj.remark = this.documentsForm.value.p_remark;
      this.docObj.iDt = this.commonService.dateFormat(this.documentsForm.value.p_dateofissue1);
      this.docObj.eDt = this.commonService.dateFormat(this.documentsForm.value.p_dateofexpiry1);
      this.docObj.lspossessionId  = this.documentsForm.value.p_lspossessionId ? Number(this.documentsForm.value.p_lspossessionId) : null;
    }
    if (this.doctypecode == 'EID') {
      this.docObj.docno = this.documentsForm.value.e_emiratesid;
      this.docObj.doccardno = this.documentsForm.value.e_emiratesidcardno;
      this.docObj.expirydate = this.documentsForm.value.e_eiddateexpiry1;
      this.docObj.eDt = this.commonService.dateFormat(this.documentsForm.value.e_eiddateexpiry1);
      this.docObj.issuedate = null;
      this.docObj.iDt = null;
    }
    if (this.doctypecode == 'VISA') {
      this.docObj.docno = this.documentsForm.value.v_visano;
      this.docObj.doccardno = this.documentsForm.value.v_visafileno;
      this.docObj.expirydate = this.documentsForm.value.v_visadateissue1;
      this.docObj.issuedate = this.documentsForm.value.v_visadateexpiry1;
      this.docObj.iDt = this.commonService.dateFormat(this.documentsForm.value.v_visadateissue1);
      this.docObj.eDt = this.commonService.dateFormat(this.documentsForm.value.v_visadateexpiry1);
      this.docObj.visajobtitle = this.documentsForm.value.v_visajobtitle;
    }
    if (this.doctypecode == 'LBRCRD') {
      this.docObj.doccardno = this.documentsForm.value.l_labourcardno;
      this.docObj.eDt = this.commonService.dateFormat(this.documentsForm.value.l_lcdateexpiry1);
      this.docObj.expirydate = this.documentsForm.value.l_lcdateexpiry1;
      this.docObj.docno = this.documentsForm.value.l_lcpersonalid;
      this.docObj.issuedate = null;
      this.docObj.iDt = null;
    }
    if (this.doctypecode == 'JFZCRD') {
      this.docObj.doccardno = this.documentsForm.value.j_jzidcardno;
      this.docObj.eDt = this.commonService.dateFormat(this.documentsForm.value.j_jzidateexpiry1);
      this.docObj.expirydate = this.documentsForm.value.j_jzidateexpiry1;
      this.docObj.issuedate = null;
      this.docObj.iDt = null;
    }
    if (this.doctypecode == 'MEDINS') {
      this.docObj.doccardno = this.documentsForm.value.m_medinscardno;
      this.docObj.medinsprovname = this.documentsForm.value.m_medinsprovname;
      this.docObj.eDt = this.commonService.dateFormat(this.documentsForm.value.m_medinsdateexpiry1);
      this.docObj.expirydate = this.documentsForm.value.m_medinsdateexpiry1;
      this.docObj.issuedate = null;
      this.docObj.iDt = null;
    }
    if (this.doctypecode == 'DRVLIC') {
      this.docObj.docno = this.documentsForm.value.d_drivinglicno;
      this.docObj.doccardno = this.documentsForm.value.d_trafficcardno;
      this.docObj.issueplace = this.documentsForm.value.d_placeofissue;
      this.docObj.issuedate = this.documentsForm.value.d_dateofissue1;
      this.docObj.iDt = this.commonService.dateFormat(this.documentsForm.value.d_dateofissue1);
      this.docObj.eDt = null;
      this.docObj.expirydate = null;
    }
    this.submitted = true;
    if (this.documentsForm.invalid) {
      return;
    } else { 
    this.documentsService.saveupdatedoc(this.docObj).subscribe(success => {
      var s: any = success;
      if(s.code==0){
        this.toastService.showToast('danger', s.message);
      } else{
      this.uploadDocAttachment(s.data.lEmppdocId);
      this.toastService.showToast('success', s.message);
      this.back();}
    })
  }

  }

  back() {
    this.router.navigate(["/views/transaction/documents/documents-summary"]);
  }

  selectcompany(id) {
    this.getEmployeeList(id);
  }

  // *********************************** Date Change Methods

  changeDateofIssue(event) {
    this.documentsForm.get('p_dateofissue1').setValue(event.singleDate.jsDate);
  }

  changeDateofExpiry(event) {
    this.documentsForm.get('p_dateofexpiry1').setValue(event.singleDate.jsDate);
  }

  changeEDateofExpiry(event) {
    this.documentsForm.get('e_eiddateexpiry1').setValue(event.singleDate.jsDate);
  }

  changeVIssueDate(event) {
    this.documentsForm.get('v_visadateissue1').setValue(event.singleDate.jsDate);
  }

  changeVExpiryDate(event) {
    this.documentsForm.get('v_visadateexpiry1').setValue(event.singleDate.jsDate);
  }

  changeLExpiryDate(event) {
    this.documentsForm.get('l_lcdateexpiry1').setValue(event.singleDate.jsDate);
  }

  changeJExpiryDate(event) {
    this.documentsForm.get('j_jzidateexpiry1').setValue(event.singleDate.jsDate);
  }

  changeMExpiryDate(event) {
    this.documentsForm.get('m_medinsdateexpiry1').setValue(event.singleDate.jsDate);
  }

  // *********************************** Document Attachment

  @ViewChild('labelImport', { static: false })
  labelImport: ElementRef;
  fileToUpload: File = null;

  onFileChange(files: FileList) {
    this.filePath = null;
    this.labelImport.nativeElement.innerText = Array.from(files)
      .map(f => f.name)
      .join(', ');
    this.documentsForm.get('file').setValue(files.item(0));
  }

  openAttachment() {
    window.open(environment.IMG_URL + this.filePath);
  }

  uploadDocAttachment(id) {
    const formData = new FormData();
    formData.append('file', this.documentsForm.value.file);
    this.documentsService.uploadDocAttachment(id, formData).subscribe(s => {
      var success: any = s;
    });
  }
}
