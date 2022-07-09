import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ExcelService } from '../../services/excel.service';
import { HolidayService } from './holiday.service';

@Component({
  selector: 'app-holiday',
  templateUrl: './holiday.component.html',
  styleUrls: ['./holiday.component.scss']
})
export class HolidayComponent implements OnInit {

  holidayList:any=[];
  holidayId:any;
  enableFilter:boolean=false;
  filterString = "";
  filtered;
  selectRadioBtn: boolean = false;

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

  constructor(private router:Router,private holidayService:HolidayService,private excelService:ExcelService) { }

  ngOnInit() {
    this.getHolidayList();
    this.moduleList = JSON.parse(sessionStorage.getItem("moduleList"));
    if (this.moduleList) {
      this.moduleList.map((e) => {
        if (e.moduleGroup == 'Leave Management' && e.moduleName == 'Public Holiday') {
         
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



  // getHolidayList(){
  //   let list: any = JSON.parse(sessionStorage.getItem("company"));
  //   var l: any = [];
  //   for (var i = 0; i < list.length; i++) {
  //     l.push(Number(list[i]));
  //   }
  //   this.holidayService.getHolidayList(l).subscribe(s=>{
  //     this.holidayList = s;
  //     this.onFilterChange();
  //     this.filtered = Array(this.holidayList.length).fill(0).map((x, i) => (
  //       {
  //         holidayId: this.holidayList[i].holidayId,
  //         name:this.holidayList[i].name,
  //         startDate:this.holidayList[i].startDate,
  //         endDate: this.holidayList[i].endDate
  //       }));

  //   })
  // }

  // onFilterChange() {
  //   this.filtered = this.holidayList.filter((data) => this.isMatch(data));
  // }
  
  isMatch(item) {
    if (item instanceof Object) {
      return Object.keys(item).some((k) => this.isMatch(item[k]));
    } else {
      return item ? item.toString().indexOf(this.filterString) > -1 : null;
    }
  }

  add(){ 
    this.router.navigate(['/views/masters/holiday/add-holiday']);
  }

  selectTableRow(data) {
    if (!this.selectRadioBtn && data) {
     
      this.router.navigate(['/views/masters/holiday/add-holiday'],{queryParams:{id:data.holidayId}});
    }
  }
  edit(){ 
    if(this.holidayId){
      this.router.navigate(['/views/masters/holiday/add-holiday'],{queryParams:{id:this.holidayId}});
    }
  }
  view(){ 
    if(this.holidayId){
      this.router.navigate(['/views/masters/holiday/add-holiday'],{queryParams:{id:this.holidayId,view:true}});
    }
  }
  delete(){ }

  // getDataUsingRedioBtn(data){
  //   this.holidayId = data.holidayId;
  // }

  exporttoexcel() {
    let title = "Public_Holiday";
  
    this.holidayService.holidayExport(this.searchDataStr).subscribe(data=>{

      var hoidaydatalist: any = data;
      if(hoidaydatalist){
        let exportDataList = Array(hoidaydatalist.length).fill(0).map((x, i) => (
        {
          "Holiday": hoidaydatalist[i].name,
        "Start Date": hoidaydatalist[i].stdate,
        "End Date": hoidaydatalist[i].endate,
        "Status":  hoidaydatalist[i].status
        }));
         this.excelService.exportAsExcelFile(exportDataList, title);
      }
      })
  
    // let exportDataList = Array(this.holidayList.length).fill(0).map((x, i) => (
    //   {
    //     "Holiday": this.holidayList[i].name,
    //     "Start Date": this.holidayList[i].startDate,
    //     "End Date": this.holidayList[i].endDate
        
  
    //   }));
  
    // this.excelService.exportAsExcelFile(exportDataList, title);
  //  this.excelService.exportAsExcelFile(this.reportSummaryList, "AttendanceSummary");
  
  }

   //============================================ Datatable

   data: any = [];
   getHolidayList() {
     this.holidayService.holidaydatatable().subscribe(s => {
     this.data = s;
      });
   }
   
    searchDataStr: any;
    search(data) {
      this.data = {};
      this.searchDataStr=data;
      this.holidayService.holidaydatatable1(data).subscribe(s => {
      this.data = s;
     });
     }
 
 
    getRows(data){
      this.holidayId = data.holidayId;
    }

}
