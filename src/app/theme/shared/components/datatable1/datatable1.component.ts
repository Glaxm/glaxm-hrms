import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Column1Component } from '../column1/column1.component';
import { DataTableModel } from '../entity/datatable.model';
import { Observable } from 'rxjs';
import * as moment from 'moment';
@Component({
  selector: 'datatable1',
  templateUrl: './datatable1.component.html',
  styleUrls: ['./datatable1.component.css'],
  providers: [DataTableModel]
})
export class Datatable1Component implements OnInit {
  ngOnInit(): void {

  }

  id1: any;
  height: any;
  @Input() data: (searchTerm: string) => Observable<any[]>;
  @Input() dataset;
  @Input() id;
  @Input() actionEvent;
  @Input() enableFilter = false;
  @Output() getIdEvent = new EventEmitter<any>();
  @Output() getCheckBoxIdEvent = new EventEmitter<any>();
  @Output() aTagEvent = new EventEmitter<any>();
  currentPageNo:any=1;
  // @Output() clickEvent = new EventEmitter<any>();
  // @Output() pagenoEvent = new EventEmitter<any>();
  @Output() searchEvent = new EventEmitter<string>();
  // @Output() sortEvent = new EventEmitter<any>();
  @Output() getNavigate = new EventEmitter<any>();
  rowsOnPage = 10;
  result: number = 0;
  qtd = [];
  columns: Column1Component[] = [];
  query = "";
  filteredList;
  pageno: number = 1;
  count: any = 0;
  totalPageCount = [];
  options: any;
  currentPage: number = 1;
  sortColumnNo: number = 1;
  recordsFiltered = 0;
  pageentry: any;
  start: number = 0;
  sortorder: any = 1;
  radio1(data) {
    this.getIdEvent.emit(data);

    //console.log(JSON.stringify(this.columns));
  }
  checkbox1(data, event) {

    data.eEvent = event;
    // var obj = {edata:data,eEvent:event}
    this.getCheckBoxIdEvent.emit(data);
    console.log(event);
  }
  navigate(data,data1) {
    data.navigatekey = data1;
    this.getNavigate.emit(data)

  }
  aTag(data, data1) {

    //  alert("hi///")
    this.id1 = data[this.id];
    data.key = data1;

    // this.clickEvent.emit(data);
    this.aTagEvent.emit(data);
  }
  funSort(data) {
    if (this.columns[data].type != 'radio') {
      this.sortorder = data;
      this.sortColumnNo = data;
      this.columns[data].sortVal = this.columns[data].sortVal == '' || this.columns[data].sortVal == "asc" ? "desc" : "asc";
      var sortUrl = this.sortUrl(this.sortorder, 0);
      var url = this.setUrl();
      url = url + "&" + sortUrl;
      // alert(url);
      this.searchEvent.emit(url);
    }
  }
  sortUrl(data, start) {
    //console.log("i"+data);


    //console.log(JSON.stringify(this.columns[data]));
    var a = JSON.parse(JSON.stringify(this.columns[data]));
    a.number = data + 1;
    a.rowsOnPage = this.rowsOnPage;
    a.pageno = this.pageno;
   // var url = "draw=" + 0 + "&start=" + start + "&length=" + this.rowsOnPage + "&columnNo=" + (data + 1) + "&sort=" + this.columns[data].sortVal;
   var url = "length=" + this.rowsOnPage + "&page=" + this.currentPageNo;
 
   return url;
  }

  setUrl() {
    var a: string = "";
    for (var i = 1; i < this.columns.length; i++) {
      if (this.qtd[i] == undefined) {
        this.qtd[i] = "";
      }

      if (this.columns[i].type == 'Date' && this.qtd[i] != undefined && this.qtd[i] != "") {
        var dateDemo = moment(this.qtd[i]).format("DD-MM-YYYY");
        var st = this.columns[i].searchVar;
        (this.columns.length-1)==i ? a = a + this.columns[i].searchVar + '=' + dateDemo.valueOf() : a = a + this.columns[i].searchVar + '=' + dateDemo.valueOf() + '&';
      } else if (this.columns[i].type == 'Date') {
        this.qtd[i] = ""
        a = a + this.columns[i].searchVar + "=" + this.qtd[i] + "&";
        (this.columns.length-1)== i ? a = a + this.columns[i].searchVar + "=" + this.qtd[i] : a = a + this.columns[i].searchVar + "=" + this.qtd[i] + "&";
      } else {
        (this.columns.length-1) == i ? a = a + this.columns[i].value + "=" + this.qtd[i] : a = a + this.columns[i].value + "=" + this.qtd[i] + "&";
      }
    }
    return a;
  }

  search(data) {
    var a = this.setUrl();
    var sortUrl = this.sortUrl(this.sortorder, 0);
    
    a = sortUrl + "&" + a;
    this.searchEvent.emit(a)
  }

  changePage(pageno) {
    this.currentPageNo = pageno;
    var a = { pageno: null, rowsOnPage: 10 };
    a.pageno = pageno;
    a.rowsOnPage = this.rowsOnPage;
    var start = (this.rowsOnPage * (pageno - 1));
    var searchurl1 = this.setUrl();
    var sortUrl = this.sortUrl(this.sortorder, start);

    searchurl1 =   sortUrl + "&" + searchurl1;

    // this.messageEvent.emit(a)
    this.searchEvent.emit(searchurl1);
    // alert("in child"+pageno);
    if (pageno == 0) {
      this.pageno = 1;
      this.currentPage = 1;
      pageno = 1;
    } else {
      this.pageno = pageno;
      this.currentPage = pageno;
    }
  }


  constructor(private datatableEntity: DataTableModel) {
    // this.totalPageMethod(50);
    this.dataset = {}
  }

  showEntries(data) {

    this.changePage(1);
  }
  addColumn(column) {
    this.columns.push(column);

  }

  getData() {
    if (this.query !== "") {
      return this.filteredList;
    } else {
      this.totalPageMethod(this.dataset.recordsTotal);
      this.pageentry = this.pageno * this.rowsOnPage;
      if (this.pageentry > this.dataset.recordsTotal) {
        this.pageentry = this.dataset.recordsTotal;
      }

      if (this.dataset.recordsFiltered == 0) {
        this.start = 0;
      } else {
        this.start = (this.rowsOnPage * (this.pageno - 1)) + 1;
      }
      return this.dataset.data;
    }
  }

  filter(data) {
    // alert(data)
    // this.filteredList = this.dataset.filter(function(el){
    //   var result="";
    //     for(var key in el){
    //       result+= el[key];
    //     }
    //     return result.toLowerCase().indexOf(this.query.toLowerCase()) > -1;
    // }.bind(this));
  }

  // changePage(pageno)
  //   {



  //     if(pageno<=50)
  //     {
  //         if(pageno==0)
  //         {
  //             this.pageno=1;
  //             pageno=1;
  //         }else{
  //             this.pageno=pageno;
  //         }
  //         this.totalPageMethod(50);

  //         // this.datatableEntity.draw = this.count;
  //         // this.datatableEntity.start = (this.datatableEntity.length*(pageno-1));
  //         // this.datatableEntity.length =this.datatableEntity.length;
  //         // this.datatableEntity.column =0;

  //         // this.divisionService.datatable(this.datatableEntity).subscribe(success =>{
  //         //       //this.data = success.data;
  //         //       this.asssingValuetoDatatable(success.data);
  //         //       this.totalPageMethod(success.recordsTotal);
  //         // });
  //     }

  //     this.count++;
  //   }

  totalPageMethod(total) {
    var i;

    this.datatableEntity.length = this.rowsOnPage;
    if (total % this.datatableEntity.length === 0) {
      this.result = (total / this.datatableEntity.length);
    } else {
      this.result = (total / this.datatableEntity.length) + 1;
    }

    
    this.totalPageCount = [];
    
    if (this.result == 0) {
    }
    //total count less than equal to 5 
    else if (Math.floor(this.result) <= 5) {
      for (i = 0; i < Math.floor(this.result); i++) {
        this.totalPageCount[i] = i + 1;
      }
    } else if ((this.pageno) == Math.floor(this.result)) {
      for (i = 1; i <= 4; i++) {
        this.totalPageCount[i] = (this.pageno - 4) + i;
      }
      this.totalPageCount[0] = 1;
    }
    //totla amount gretaer than equal to 5'
    else {
      if (this.pageno <= 5) {
        for (i = 0; i <= 5; i++) {
          this.totalPageCount[i] = i + 1;
        }
        this.totalPageCount[i] = Math.floor(this.result);
      } else if ((this.pageno - 3) >= 1 && (this.pageno + 3) <= Math.floor(this.result)) {
        for (i = 1; i <= 5; i++) {
          this.totalPageCount[i] = (this.pageno - 3) + i;
        }
        this.totalPageCount[0] = 1;
        this.totalPageCount[i] = Math.floor(this.result);
      } else if ((this.pageno + 3) >= Math.floor(this.result)) {
        for (i = 1; i < 5; i++) {
          this.totalPageCount[i] = Math.floor(this.result) - 4 + i;
        }
        this.totalPageCount[0] = 1;
      }
    }
    // console.log("------------------------:  " + this.totalPageCount);
  }
}
