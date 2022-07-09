import { Component, OnInit } from '@angular/core';
import OrgChart from '@balkangraph/orgchart.js';
import { DashboardService } from 'src/app/views/services/dashboard.service';
import { ToastrService } from 'src/app/views/services/toastr.service';

@Component({
  selector: 'app-org-chart',
  templateUrl: './org-chart.component.html',
  styleUrls: ['./org-chart.component.scss']
})
export class OrgChartComponent implements OnInit {
  companyList: any = [];
  defaultCompany: any;
  isDefCompany:any;
  constructor(private toastService:ToastrService,private dashaboardService: DashboardService) {
    dashaboardService.getcompanybyuserid().subscribe(success => {
      var data: any = success;
      this.companyList = data.userwisecomplist;
      this.defaultCompany = data.defaultCompanyId ? data.defaultCompanyId : data.userwisecomplist[0].companyId;
      this.defaultCompany ? this.isDefCompany=true : this.isDefCompany=false;
      this.getOrgChartBycompId(this.defaultCompany);
    });

  }
  tree: any;
  ngOnInit() {

    this.tree = document.getElementById("tree");
    console.log(this.tree);

  }

  setDefaultCompany(){
    if(this.defaultCompany && !(this.isDefCompany)){
      this.dashaboardService.setDefaultCompany(this.defaultCompany).subscribe(success=>{
        var data:any = success;
        this.toastService.showToast('success', data.message);
        
      });
    } else{
     this.isDefCompany = false;
    }
    
  }

  getCompanyDetails(companyid) {
    // this.isDefCompany=false;
    this.getOrgChartBycompId(companyid);
  }

  getOrgChartBycompId(companyid) {
    if (this.tree) {

      this.dashaboardService.getOrgstucture(companyid).subscribe(success => {
        var data: any = success;

        var chart = new OrgChart(this.tree, {
          template:"polina",
          enableSearch: false,
          scaleInitial:(data.length > 10 ? OrgChart.match.boundary:0.5),
          nodeBinding: {
            field_0: "name",
            field_1: "title",
            img_0: "img"
          },
          collapse:{
            level:2,
            allChildren:true
          },
          
          nodes:data
      
        });
        // alert(JSON.stringify(data));
        console.log(JSON.stringify(data));

        // chart.load(data);
        //  chart.load([{"id":1109,"name":"abc  test","stpid":"Billing-Team","title":"Accountant"},{"id":1024,"name":"Vandana  Shrivastav","stpid":"Accounts-Team","title":"Accountant","pid":1023},{"id":1024,"name":"Vandana  Shrivastav","stpid":"Accounts-Team","title":"Accountant","pid":1023},{"id":1024,"name":"Vandana  Shrivastav","stpid":"Accounts-Team","title":"Accountant","pid":1023},{"id":1024,"name":"Vandana  Shrivastav","stpid":"Accounts-Team","title":"Accountant","pid":1023},{"id":1024,"name":"Vandana  Shrivastav","stpid":"Accounts-Team","title":"Accountant","pid":1023},{"id":1026,"name":"Vinay  Malhotra","stpid":"Accounts-Team","title":"Accountant","pid":1023},{"id":1026,"name":"Vinay  Malhotra","stpid":"Accounts-Team","title":"Accountant","pid":1023},{"id":1026,"name":"Vinay  Malhotra","stpid":"Accounts-Team","title":"Accountant","pid":1023},{"id":1026,"name":"Vinay  Malhotra","stpid":"Accounts-Team","title":"Accountant","pid":1023},{"id":1026,"name":"Vinay  Malhotra","stpid":"Accounts-Team","title":"Accountant","pid":1023},{"id":1027,"name":"Raju  M","stpid":"Accounts-Team","title":"Accountant","pid":1023},{"id":1027,"name":"Raju  M","stpid":"Accounts-Team","title":"Accountant","pid":1023},{"id":1027,"name":"Raju  M","stpid":"Accounts-Team","title":"Accountant","pid":1023},{"id":1027,"name":"Raju  M","stpid":"Accounts-Team","title":"Accountant","pid":1023},{"id":1027,"name":"Raju  M","stpid":"Accounts-Team","title":"Accountant","pid":1023},{"id":1028,"name":"Ram  Last Name","stpid":"Accounts-Team","title":"Accountant","pid":1023},{"id":1028,"name":"Ram  Last Name","stpid":"Accounts-Team","title":"Accountant","pid":1023},{"id":1028,"name":"Ram  Last Name","stpid":"Accounts-Team","title":"Accountant","pid":1023},{"id":1028,"name":"Ram  Last Name","stpid":"Accounts-Team","title":"Accountant","pid":1023},{"id":1028,"name":"Ram  Last Name","stpid":"Accounts-Team","title":"Accountant","pid":1023},{"id":1025,"name":"Sham  Sinha","stpid":"Accounts-Team","title":"Glaxm - manager","pid":1023},{"id":1025,"name":"Sham  Sinha","stpid":"Accounts-Team","title":"Glaxm - manager","pid":1023},{"id":1025,"name":"Sham  Sinha","stpid":"Accounts-Team","title":"Glaxm - manager","pid":1023},{"id":1025,"name":"Sham  Sinha","stpid":"Accounts-Team","title":"Glaxm - manager","pid":1023},{"id":1025,"name":"Sham  Sinha","stpid":"Accounts-Team","title":"Glaxm - manager","pid":1023},{"id":1029,"name":"Ashutosh   Raina","stpid":"Administration-Team","title":"Glaxm - manager","pid":1024},{"id":965,"name":"Vedika  T","stpid":"Human Resources-Team","title":"Helper","pid":1025},{"id":1110,"name":"hari  o","stpid":"Accounts-Team","title":"Accountant","pid":1109}]

        // );
      });



    }

  }
  isshow:boolean=false;
  hideShowFun() {
    this.isshow == false ? this.isshow = true : this.isshow = false;
  }
  

}
