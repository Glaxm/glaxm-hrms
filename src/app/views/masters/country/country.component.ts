import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from '../../services/toastr.service';
import { CountryService } from './country-service/country.service';

@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.scss']
})
export class CountryComponent implements OnInit {
  countryId: any;
  enableFilter: boolean = false;
  moduleList: any = [];
  flags = {
    createFlag: '',
    editFlag: '',
    readFlag: '',
    deleteFlag: '',
    exportFlag:'',
    importFlag:'',
    forSelf: ''
  };
  data: any = [];

  constructor(private toastService:ToastrService, private router: Router, private countryService: CountryService) { }

  ngOnInit() {
    this.getCountrySummary();
    this.moduleList = JSON.parse(sessionStorage.getItem("moduleList"));
    if (this.moduleList) {
      this.moduleList.map((e) => {
        if (e.moduleGroup == 'Company Master' && e.moduleName == 'Country') {         
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
    }
  }

  addCountry() {
    this.router.navigate(['/views/masters/country/add-update-country'])
  }

  editCountry() {
    if (this.countryId) {
      this.router.navigate(['/views/masters/country/add-update-country'], { queryParams: { id: this.countryId } });
    }
  }

  viewCountry() {
    if (this.countryId) {
      this.router.navigate(['/views/masters/country/add-update-country'], { queryParams: { id: this.countryId, view: true } });
    }
  }

  deleteCountry() { }

  // Datatable  
    getCountrySummary() {
      this.countryService.getCountrySummary().subscribe(s => {
        this.data = s;
      });
    }
   
    search(data) {
      this.data = {};
      this.countryService.getCountrySummaryWithSearch(data).subscribe(s => {
      this.data = s;
     });
    }

    getRows(data){
     this.countryId = data.xflycountryId;
     if(data.key==""){ } else{ this.editCountry(); }
    }

}
