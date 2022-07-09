import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { ToastrService } from 'src/app/views/services/toastr.service';
import { VisasponsorService } from '../visasponsor.service';

@Component({
  selector: 'app-add-visasponsor',
  templateUrl: './add-visasponsor.component.html',
  styleUrls: ['./add-visasponsor.component.scss']
})
export class AddVisasponsorComponent implements OnInit {

  visasponsorForm: FormGroup;
  submitted = false;
  isView: boolean = false;
  holdingList: any = [];
  companyList: any = [];
  obj={
    companyId:null
  }
  statusList: any = [{ valueCode: 'ACTIVE', valueName: 'Active' }, { valueCode: 'INACTIVE', valueName: 'Inactive' }]
  constructor(private toastService: ToastrService, private activatedRoute: ActivatedRoute,
    private visasponsorService: VisasponsorService, private router: Router) {
    this.visasponsorForm = new FormGroup({
      xvisasponsorId: new FormControl(null),
      companyId: new FormControl(null),
      holdingId: new FormControl(null, [Validators.required]),
      isActive: new FormControl(null),
      status: new FormControl(null),
      created: new FormControl(null),
      createdBy: new FormControl(null),
      updated: new FormControl(null),
      updatedBy: new FormControl(null),
      companyDisc: new FormControl(null),
      CODE: new FormControl(null),
      company: new FormControl(null, [Validators.required]),
      companyName: new FormControl(null,[Validators.required])
    });

    this.activatedRoute.queryParams.subscribe(params => {
      this.visasponsorForm.controls['xvisasponsorId'].setValue(params.id);
      this.isView = params.view;
      // this.parentUrl = params.parentUrl;
    });
  }

  ngOnInit() {
    this.getHoldingList();
    this.companySetting();
    if (this.visasponsorForm.value.xvisasponsorId) {
      this.visasponsorService.getVisasponsorDataById(this.visasponsorForm.value.xvisasponsorId).subscribe(success => {
        var s: any = success;
        this.visasponsorForm.patchValue(s.data);
        this.getCompanyListByHoldingId(s.data.holdingId);
        this.obj.companyId = s.data.companyId;
        s.data.isActive == 'Y' ? this.visasponsorForm.get('status').setValue("ACTIVE") : this.visasponsorForm.get('status').setValue("INACTIVE");
        if (this.isView) { this.visasponsorForm.disable(); }
      });
    }
    else {
      this.visasponsorForm.controls['status'].setValue("ACTIVE");

    }
  }


  get f() { return this.visasponsorForm.controls; }

  getCompanyListByHoldingId(holdinId) {

    this.visasponsorService.getCompanyListByHoldingId(holdinId).subscribe(s => {
      this.companyList = s;
      this.visasponsorForm.get('holdingId').setValue(this.holdingList[0].gHoldingId);
      if(this.visasponsorForm.value.xvisasponsorId){
        this.selectedCompanyList = this.companyList.filter(o1 => this.obj.companyId.some(o2 => o1.gCompanyId === o2));
      }

    });
  }



  getHoldingList() {
    this.visasponsorService.getHoldingList().subscribe(s => {
      this.holdingList = s;
      this.visasponsorForm.get('holdingId').setValue(this.holdingList[0].gHoldingId);
      this.getCompanyListByHoldingId(this.holdingList[0].gHoldingId)

    });
  } 

  setCompanyList(list) {
    let elm: any = [];
    list.forEach(element => {
      elm.push(element.gCompanyId);
    });
    let unique = [...new Set(elm)];
    return unique;
  }

  addUpdateVisasponsor() {
    this.visasponsorForm.get('createdBy').setValue(Number(sessionStorage.getItem('userId')));
    this.visasponsorForm.get('created').setValue(new Date());
    this.visasponsorForm.get('updatedBy').setValue(Number(sessionStorage.getItem('userId')));
    this.visasponsorForm.get('updated').setValue(new Date());
    let compList: any = this.setCompanyList(this.selectedCompanyList)
    this.visasponsorForm.get('companyId').setValue(compList);
    if (this.visasponsorForm.value.xvisasponsorId) {
      this.visasponsorForm.get('xvisasponsorId').setValue(Number(this.visasponsorForm.value.xvisasponsorId));
    }

    this.visasponsorForm.value.status == "ACTIVE" ? this.visasponsorForm.get('isActive').setValue('Y') : this.visasponsorForm.get('isActive').setValue('N');

    this.submitted = true;
    if (this.visasponsorForm.invalid) {
      return;
    } else {
      this.visasponsorService.addUpdateVisasponsor(this.visasponsorForm.value).subscribe(success => {
        var s: any = success;
        if(s.code==0){
          this.toastService.showToast('danger', s.message);
        } else{
        this.toastService.showToast('success', s.message);
        this.back();}
      });
    }
  }

  back() {
    // if (this.parentUrl) {
    //   this.router.navigate([this.parentUrl]);
    // } else {
    this.router.navigate(["/views/masters/visasponsor/visasponsor-summary"]);
    // }
  }


  //================================================ Multiselect Company list

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
