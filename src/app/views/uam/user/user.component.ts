import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from './user.service';
import { error } from 'util';
import { ExcelService } from '../../services/excel.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  userList:any=[];
  userId:any;
  enableFilter:boolean=false;
  filterString = "";
  filtered;
  selectRadioBtn: boolean = false;

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
 
  constructor(private router:Router,private userService:UserService,private excelService:ExcelService) {
    
    this.moduleList = JSON.parse(sessionStorage.getItem("moduleList"));
    if (this.moduleList) {
      this.moduleList.map((e) => {
        if (e.moduleGroup == 'Admin Settings' && e.moduleName == 'User') {
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

  ngOnInit() {
    this.roleDateTable();
  }

  // roleDateTable(){
  //   this.userService.userDateTable().subscribe(s=>{
  //     this.userList = s;
  //     this.onFilterChange();
  //     this.filtered = Array(this.userList.length).fill(0).map((x, i) => (
  //       {
  //         userId: this.userList[i].userId,
  //         userName: this.userList[i].userName,
  //         email: this.userList[i].email,
  //         status: this.userList[i].status
  //       }));
  //   },error=>{ alert(JSON.stringify(error))})
  // }

  // onFilterChange() {
  //   this.filtered = this.userList.filter((invoice) => this.isMatch(invoice));
  // }

  // isMatch(item) {
  //   if (item instanceof Object) {
  //     return Object.keys(item).some((k) => this.isMatch(item[k]));
  //   } else {
  //     return item ? item.toString().indexOf(this.filterString) > -1 : null;
  //   }
  // }

  selectTableRow(data) {

    if (!this.selectRadioBtn && data && this.flags.editFlag=="Y") {
      this.router.navigate(['views/user/add-edit-user'], { queryParams: { id: data.userId,moduleid:this.moduleid } });
    }
  }

  add(){ 
    this.router.navigate(['views/user/add-edit-user'],{ queryParams: { moduleid:this.moduleid } });
  }
  edit(){ 
    if(this.userId){
      this.router.navigate(['views/user/add-edit-user'],{queryParams:{id:this.userId, moduleid:this.moduleid}});
    }
  }
  view(){ 
    if(this.userId){
      this.router.navigate(['views/user/add-edit-user'],{queryParams:{id:this.userId,view:true,moduleid:this.moduleid}});
    }
  }
  delete(){ }

  // getDataUsingRedioBtn(data){
  //   this.userId = data.userId;
  // }

  exporttoexcel() {
    let title = "User";
  //  alert(this.searchDataStr)
    this.userService.userExport(this.searchDataStr).subscribe(data=>{
   // alert(JSON.stringify(data))
    var userdatalist: any = data;
    if(userdatalist){
      let exportDataList = Array(userdatalist.length).fill(0).map((x, i) => (
      {
        "Username": userdatalist[i].userName,
        "Email": userdatalist[i].email,
        "Status": userdatalist[i].status
      }));
       this.excelService.exportAsExcelFile(exportDataList, title);
    }
    })

    // let exportDataList = Array(this.userList.length).fill(0).map((x, i) => (
    //   {
    //     "Username": this.userList[i].userName,
    //     "Email": this.userList[i].email,
    //     "Status": this.userList[i].status
    //   }));
  //  this.excelService.exportAsExcelFile(exportDataList, title);
  //  this.excelService.exportAsExcelFile(this.reportSummaryList, "AttendanceSummary");
  
  }

    //============================================ Datatable

    data: any = [];
    roleDateTable() {
      this.userService.userdatatable().subscribe(s => {
      this.data = s;
      });
     }
    
    searchDataStr: any; 
    search(data) {
       this.data = {};
       this.searchDataStr=data;
       this.userService.userdatatable1(data).subscribe(s => {
       this.data = s;
      });
     }
  
  
     getRows(data){
      this.userId = data.userId;
      if(data.key==""){
      } else{
       this.edit();
     }
     }

}
