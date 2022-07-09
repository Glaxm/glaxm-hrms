import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ExcelService } from '../../services/excel.service';
import { ToastrService } from '../../services/toastr.service';
import { AirSectorService } from './air-sector.service';

@Component({
  selector: 'app-air-sector',
  templateUrl: './air-sector.component.html',
  styleUrls: ['./air-sector.component.scss']
})
export class AirSectorComponent implements OnInit {
  airSectorList: any = [];
  airSectorId: any;
  enableFilter: boolean = false;

 
  filterString = "";
  filtered;
  items = [];
  pageOfItems: Array<any>;

  onChangePage(pageOfItems: Array<any>) {
    // update current page of items
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
  constructor(private toastService:ToastrService, private router: Router, private airSectorService: AirSectorService, private excelService:ExcelService) { }

  ngOnInit() {
    this.getAirSectorList();

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

      this.fileUploadForm = new FormGroup({
        fileName: new FormControl("")
      });

    }

    this.items = Array(150).fill(0).map((x, i) => ({ id: (i + 1), name: `Item ${i + 1}` }));
  }

  add() {
    this.router.navigate(['/views/masters/air-sector/add-edit-airsector'])
  }
  edit() {
    if (this.airSectorId) {
      this.router.navigate(['/views/masters/air-sector/add-edit-airsector'], { queryParams: { id: this.airSectorId } });
    }
  }
  view() {
    if (this.airSectorId) {
      this.router.navigate(['/views/masters/air-sector/add-edit-airsector'], { queryParams: { id: this.airSectorId, view: true } });
    }
  }
  delete() {

  }
  // getDataUsingRedioBtn(data) {
  //   this.airSectorId = data.airsectorId;
  // }

  // getAirSectorList() {
  //   this.airSectorService.getAirSectorList().subscribe(s => {
  //     this.airSectorList = s;
  //     this.onFilterChange();
  //     this.filtered = Array(this.airSectorList.length).fill(0).map((x, i) => ({ airsectorId: this.airSectorList[i].airsectorId, code:this.airSectorList[i].code,name: this.airSectorList[i].name,country:this.airSectorList[i].country}));
  //   });
  // }

  // onFilterChange() {
  //   this.filtered = this.airSectorList.filter((invoice) => this.isMatch(invoice));
  // }

  // isMatch(item) {
  //   if (item instanceof Object) {
  //     return Object.keys(item).some((k) => this.isMatch(item[k]));
  //   } else {
  //     return item.toString().indexOf(this.filterString) > -1
  //   }
  // }


  // 

  exporttoexcel() {
    let title = "Air_Sector";
  
  
    let exportDataList = Array(this.airSectorList.length).fill(0).map((x, i) => (
      {
        "Airport Code": this.airSectorList[i].code,
        "Airport Name": this.airSectorList[i].name,
        "Country": this.airSectorList[i].country,
       
  
      }));
  
    this.excelService.exportAsExcelFile(exportDataList, title);
  //  this.excelService.exportAsExcelFile(this.reportSummaryList, "AttendanceSummary");
  
  }


   //============================================ Datatable

   data: any = [];
   getAirSectorList() {
     this.airSectorService.airsectordatatable().subscribe(s => {
     this.data = s;
     });

   }
   
 
   search(data) {
      this.data = {};
      this.airSectorService.airsectordatatable1(data).subscribe(s => {
      this.data = s;
     });
 
    }
 
 
    getRows(data){
     // this.airSectorId = data.airsectorId;
     // this.edit();
     // alert(JSON.stringify(data));
     this.airSectorId = data.airsectorId;
     debugger;
     if(data.key==""){

    } else{
      this.edit();
    }
    }

//************************************************ */      // Excel file upload
  isuploadfile: boolean = false;

  fileUploadFun(event) {

    if (this.file.name) {
      this.isuploadfile = true;
      this.airSectorService.uploadCsvFile(this.formData).subscribe(s => {
        var data: any = s;
        this.isuploadfile = false;
        this.file = null;
        this.formData = null;
        this.toastService.showToast('success', data.message);
        this.getAirSectorList();
      });
    } else {
    }
  }

  file: File;
  formData: FormData;
  fileChange(event) {
    this.formData = new FormData();
    let fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      this.file = fileList[0];
      this.formData.append('file', this.file, this.file.name)
    }
  }

}
