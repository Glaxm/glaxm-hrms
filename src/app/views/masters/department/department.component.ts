import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ExcelService } from '../../services/excel.service';
import { DepatmentService } from './depatment.service';

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.scss']
})
export class DepartmentComponent implements OnInit {

  deptId:any;
  deptList:any=[];
  enableFilter = false;

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

  constructor(private router:Router,private deptService:DepatmentService,private excelService:ExcelService) {
    this.moduleList = JSON.parse(sessionStorage.getItem("moduleList"));
    if (this.moduleList) {
      this.moduleList.map((e) => {
        if (e.moduleGroup == 'Company Master' && e.moduleCode == 'DEPARTMENT') {
          this.flags = { 'createFlag': e.createFlag, 'editFlag': e.editFlag, 'readFlag': e.readFlag, 'deleteFlag': e.deleteFlag,'importFlag': e.importFlag,
          'exportFlag': e.exportFlag,
          'forSelf': e.forSelf };
        }
      });
    }
    
   }
  
  

  ngOnInit() {
    this.getAllDept();
   }

  getAllDept(){
    let list:any =JSON.parse(sessionStorage.getItem("company"));
    var l:any=[];
    // alert(list.length)
    for(var i=0;i<list.length;i++){
     
     // if(list[i]!=','){
        l.push(Number(list[i]));
     // }
    }
 
      this.deptService.getAllDept(l).subscribe(s=>{
          this.deptList = s;
      });

      // this.deptList = {"draw":null,"recordsTotal":52,"recordsFiltered":52,"data":[{"status":"ACTIVE","userId":2345,"mobileNumber":"9111111117","userType":"CUSTOMER","userName":"Aditi Patil","flatNo":"3","address":"Baner","area":"3, Baner, 87","city":"Pune"},{"status":"ACTIVE","userId":2386,"mobileNumber":"8182838485","userType":"CUSTOMER","userName":"Ajay","flatNo":"90","address":"90","area":"90, 90, chimbali","city":"Pune"},{"status":"ACTIVE","userId":2392,"mobileNumber":"4142434445","userType":"CUSTOMER","userName":"Ajit","flatNo":"25","address":"Pimpri","area":"25, Pimpri, 86","city":"Pune"},{"status":"ACTIVE","userId":2396,"mobileNumber":"2526272829","userType":"CUSTOMER","userName":"Aniket","flatNo":"90","address":"A90","area":"90, A90, Pimpri","city":"Pune"},{"status":"ACTIVE","userId":2537,"mobileNumber":"4200000002","userType":"CUSTOMER","userName":"Gotya","flatNo":"Flat0001","address":"Baner","area":"Flat0001, Baner, 87","city":"Pune"},{"status":"ACTIVE","userId":2342,"mobileNumber":"9111111114","userType":"CUSTOMER","userName":"Jay Patil","flatNo":"6","address":"Baner","area":"6, Baner, baner","city":"Pune"},{"status":"ACTIVE","userId":2357,"mobileNumber":"8000000008","userType":"CUSTOMER","userName":"Kishor Jadhav","flatNo":"90","address":"90","area":"90, 90, DC","city":"Pune"},{"status":"ACTIVE","userId":2326,"mobileNumber":"9595959511","userType":"DELIVERYAGENT","userName":"Komal Patil","flatNo":"12","address":"Baner","area":"12, Baner, baner","city":"Pune"},{"status":"ACTIVE","userId":2277,"mobileNumber":"9111111112","userType":"CUSTOMER","userName":"Mahesh Mishra","flatNo":"12","address":"Baner","area":"12, Baner, baner","city":"Pune"},{"status":"ACTIVE","userId":2375,"mobileNumber":"2626262626","userType":"CUSTOMER","userName":"Mangesh L","flatNo":"26","address":"26","area":"26, 26, karvenagar","city":"Pune"},{"status":"ACTIVE","userId":2384,"mobileNumber":"8283828382","userType":"CUSTOMER","userName":"Manoj","flatNo":"90","address":"90","area":"90, 90, pimpri","city":"Pune"},{"status":"ACTIVE","userId":2551,"mobileNumber":"9800000001","userType":"CUSTOMER","userName":"Mohan Mishra","flatNo":"20","address":"20","area":"20, 20, Pimpri","city":"Pune"},{"status":"ACTIVE","userId":2344,"mobileNumber":"9111111116","userType":"CUSTOMER","userName":"Monal Patil","flatNo":"7","address":"Baner","area":"7, Baner, baner","city":"Pune"},{"status":"ACTIVE","userId":2351,"mobileNumber":"9111111125","userType":"CUSTOMER","userName":"Monika Patil","flatNo":"8","address":"Baner","area":"8, Baner, baner","city":"Pune"},{"status":"ACTIVE","userId":2559,"mobileNumber":"9800000006","userType":"CUSTOMER","userName":"Mukund","flatNo":"90","address":"90","area":"90, 90, Pimpri","city":"Pune"}]}
  }

  
  deptDatabase(){
    this.deptService.deptDatabase().subscribe(s=>{
      
    });        
  }



  getDataUsingRedioBtn(data){
    this.deptId = data.deptId;
  }

  add(){ 
    this.router.navigate(['views/masters/dept/add-edit-dept']);
  }
  edit(){ 
    if(this.deptId){
      this.router.navigate(['views/masters/dept/add-edit-dept'],{queryParams:{id:this.deptId}});
    }
  }
  view(){ 
    if(this.deptId){
      this.router.navigate(['views/masters/dept/add-edit-dept'],{queryParams:{id:this.deptId,view:true}});
    }
  }
  delete(){ }

  search(data){}
  getRows(data){}

  exporttoexcel() {
    let title = "Depatment";
  
  
    let exportDataList = Array(this.deptList.length).fill(0).map((x, i) => (
      {
        "Department Name": this.deptList[i].name,
        "Description": this.deptList[i].desc
       
  
      }));
  
    this.excelService.exportAsExcelFile(exportDataList, title);
  //  this.excelService.exportAsExcelFile(this.reportSummaryList, "AttendanceSummary");
  
  }
  
  

}
