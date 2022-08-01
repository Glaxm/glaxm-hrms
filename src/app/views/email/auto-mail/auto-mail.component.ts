import { Component, OnInit } from '@angular/core';
import { ToastrService } from '../../services/toastr.service';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ExcelService } from '../../services/excel.service';
import { AirSectorService } from '../../masters/air-sector/air-sector.service';
import { AutoMailService } from './auto-mail.service';


@Component({
  selector: 'app-auto-mail',
  templateUrl: './auto-mail.component.html',
  styleUrls: ['./auto-mail.component.scss']
})
export class AutoMailComponent implements OnInit {

  airSectorList: any = [];
  xmailgrpId: any;
  enableFilter: boolean = false;

 
  filterString = "";
  filtered;
  items = [];
  pageOfItems: Array<any>;

  onChangePage(pageOfItems: Array<any>) {
    this.pageOfItems = pageOfItems;
  }

  moduleList: any = [];
  flags = {
    createFlag: '',
    editFlag: '',
    readFlag: '',
    deleteFlag: '',
    exportFlag:'',
    importFlag:'',
    forSelf: ''
  }

  fileUploadForm: FormGroup;
  constructor(private toastService:ToastrService, private router: Router, private autoMailService: AutoMailService, private excelService:ExcelService) { }

  ngOnInit() {
    
    this.moduleList = JSON.parse(sessionStorage.getItem("moduleList"));
    if (this.moduleList) {
      this.moduleList.map((e) => {
        if (e.moduleGroup == 'Company Master' && e.moduleName == 'Air Sector') {
         
          this.flags = { 
                'createFlag': e.createFlag, 
                'editFlag': e.editFlag, 
                'readFlag': e.readFlag, 
                'deleteFlag': e.deleteFlag,
                'importFlag': e.importFlag,
                'exportFlag': e.exportFlag,
                'forSelf': e.forSelf
                };
        }
      });

   this.getAutoMailList();
  }
  }
  add() {
   this.router.navigate(['/views/email/auto-mail/add-update-auto-mail'])
  }
  edit() {
    if (this.xmailgrpId) {
      this.router.navigate(['/views/email/auto-mail/add-update-auto-mail'], { queryParams: { id: this.xmailgrpId } });
    }
  }
  view() {
    if (this.xmailgrpId) {
      this.router.navigate(['/views/email/auto-mail/add-update-auto-mail'], { queryParams: { id: this.xmailgrpId, view: true } });
    }
  }
  delete() { }

  getRowByObj(data){
      this.xmailgrpId = data.xmailgrpId;
  }


   //============================================ Datatable

   data: any = [];
   getAutoMailList() {
     this.autoMailService.getAutoMailDatatable().subscribe(s => {
     this.data = s;
     });
   }
   
 
  //  search(data) {
  //     this.data = {};
  //     this.airSectorService.airsectordatatable1(data).subscribe(s => {
  //     this.data = s;
  //    });
 
  //   }
 
 
    getRows(data){
     this.xmailgrpId = data.xmailgrpId;
     if(data.key==""){

    } else{
      this.edit();
    }
    }



}
