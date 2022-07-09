import { Component, OnInit, ViewChild } from '@angular/core';

import { ChartDB } from '../../../fack-db/chart-data';
import { ApexChartService } from '../../../theme/shared/components/chart/apex-chart/apex-chart.service';

import { Label, MultiDataSet } from 'ng2-charts';
import { DashboardService } from 'src/app/views/services/dashboard.service';
import { environment } from 'src/environments/environment';
import { ApexAxisChartSeries, ApexChart, ApexDataLabels, ApexFill, ApexLegend, ApexNonAxisChartSeries, ApexPlotOptions, ApexResponsive, ApexStroke, ApexTooltip, ApexXAxis, ApexYAxis, ChartComponent } from 'ng-apexcharts';
import { ToastrService } from 'src/app/views/services/toastr.service';
import { error } from 'jquery';


export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  responsive: ApexResponsive[];
  labels: any;
};

export type ColumnChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  responsive: ApexResponsive[];
  xaxis: ApexXAxis;
  legend: ApexLegend;
  fill: ApexFill;
};

export type BarChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  xaxis: ApexXAxis;
  stroke: ApexStroke;
};


@Component({
  selector: 'app-dash-analytics',
  templateUrl: './dash-analytics.component.html',
  styleUrls: ['./dash-analytics.component.scss']
})
export class DashAnalyticsComponent implements OnInit {
  public chartDB: any;
  public dailyVisitorStatus: string;
  public dailyVisitorAxis: any;
  public deviceProgressBar: any;
  isDivView:boolean=false;
  isshow:boolean=false;
  isDefCompany:any;

  username:any =  sessionStorage.getItem("username");
  empObj:any = JSON.parse(sessionStorage.getItem("empinfo"));
  lastLogin: any = sessionStorage.getItem("formatedloginTime");
  leavedetailslist:any=[{ annualleave:12, sickleave:4, wfh:20}];

  @ViewChild("chart",{static:true}) chart: ChartComponent;
  public pieChartOptions: Partial<ChartOptions>;

  @ViewChild("columnChart",{static:true}) columnChart: ChartComponent;
  public columnChartOptions: Partial<ColumnChartOptions>;

  @ViewChild("barChart",{static:true}) barChart: ChartComponent;
  public barChartOptions: Partial<BarChartOptions>;
  

  assetExpiryDetails:any;
  empurl:any;
  // ----------------------- BAR Chart

  // barChartOptions: ChartOptions = {
  //   responsive: true,
  //   scales: { xAxes: [{}], yAxes: [{}] },
  // };

  barChartLabels: Label[] = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  // barChartType: ChartType = 'bar';
  barChartLegend = true;
  barChartPlugins = [];

  // barChartData: ChartDataSets[] = [
  //   { data: [100, 23, 59, 81, 86, 44, 45, 20, 67, 34, 67, 90], label: 'HeadCount' },
  //   { data: [78, 56, 12, 77, 22, 55, 99, 34, 56, 23, 66, 78], label: 'HeadCount LY' }
  // ];

  doughnutChartLabels: Label[] = ['Permanent', 'Contract/Temp'];
  doughnutChartData: MultiDataSet = [
    [55, 20]
  ];
  // doughnutChartType: ChartType = 'doughnut';

  // ---------------------

  // public barChartOptions1: ChartOptions = {
  //   responsive: true,

  // };
  // public barChartType1: ChartType = 'horizontalBar';
  public barChartLegend1 = true;

  // public barChartData1: ChartDataSets[] = [
  //   { data: [80, 90, 50, 10, 10], label: 'Male', stack: 'a' },
  //   { data: [50, 70, 100, 12, 12], label: 'Female', stack: 'a' },
  // ];
  public barChartLabels1: string[] = ['0-40k', '40k-70k', '70k-100K', '100k-130K', '130k-160K'];
  //******************************************ABSENTATION**************************************************** */
  companyList:any=[];
  public barChartLabels3: Label[] = ['Production', 'IT/IS', 'Sales', 'Software Eng.', 'Admin Offices', 'Human Resources', 'Executive Office'];
  // public barChartType3: ChartType = 'bar';
  public barChartLegend3 = true;
  public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public barChartLegend5 = true;

public barChartLabels5: string[] = ['Production', 'IT/IS', 'Sales','Software Eng.','Admin Offices', 'Human Resources', 'Executive Office'];

defaultCompany:any;
  //********************************************************************************************** */
  constructor(public apexEvent: ApexChartService, public dashaboardService:DashboardService,private toastService:ToastrService) {
    this.chartDB = ChartDB;
    this.dailyVisitorStatus = '1y';

    this.deviceProgressBar = [
      {
        type: 'success',
        value: 45
      },
      {
        type: 'blue',
        value: 26
      }
    ];


    let list: any = JSON.parse(sessionStorage.getItem("company"));
    var l: any = [];
    if (list) {
      for (var i = 0; i < list.length; i++) {
        l.push(Number(list[i]));
      }
    }



    // api/users/getcompanybyuserid?userId=27

    dashaboardService.getcompanybyuserid().subscribe(success=>{
        var data:any = success;
        // alert(JSON.stringify(data))
          this.companyList = data.userwisecomplist;
          this.defaultCompany = data.defaultCompanyId ? data.defaultCompanyId : data.userwisecomplist[0].companyId;
          this.defaultCompany ? this.isDefCompany=true : this.isDefCompany=false;
          this.getnewJoineeDetails(this.defaultCompany);
          this.getattendanceDetails(this.defaultCompany);
          this.getDeptwisePayheadcount(this.defaultCompany);
          this.getcatwisePayheadcount(this.defaultCompany);
          this.getOtAnalysisList(this.defaultCompany);
          this.getdeptwiseheadcount(this.defaultCompany);
         this.getheadcountbyGender(this.defaultCompany);
         this.getEmploymentStatus(this.defaultCompany);
        
        });

  }

  deptwisePayheadcount:any;


  dashboardHide:boolean;
  

  ngOnInit() {
      this.getBirthdayDetails();
      this.getLeaveRecords();
      this.getLeaveRejoinDetails(); 
      this.getProbationCompletionDetails();   
      this.getDocExpiryDetails();
      this.getUserwiseDashboard(); 
      this.dashboardHide = environment.IS_VIEW_DASHBOARD; 
      this.getEmpLeaveCount();
      this.getSixMonthSalarySlip();
      this.getLoanDetails();
      this.getApprovalRequestDetails();
      // alert(JSON.stringify(this.empObj))
      this.empurl = this.empObj.data.path ? environment.IMG_URL + this.empObj.data.path : "../assets/images/user/no_image.png";
      // ==================
    }

    getEmploymentStatus(companyid){
      this.dashaboardService.getEmploymentStatus(companyid).subscribe(success=>{
        var data:any = success;
        
        //PIE CHART JSON
    this.pieChartOptions = {
      series: data.status_wise_percentage,
      chart: {
        type: "donut"
      },
      labels: data.empStatus,
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 150
            },
            legend: {
              position: "bottom"
            }
          }
        }
      ]
    };   
    });
  
    }

   empLeaveDetails:any; 
  getEmpLeaveCount(){
    this.dashaboardService.getEmpLeaveCount().subscribe(data=>{
       this.empLeaveDetails=data;
      //  alert(JSON.stringify(data))
    })
  }

    getcatwisePayheadcount(companyid){
        
    this.dashaboardService.getcatwisePayheadcount(companyid).subscribe(success=>{
      var data:any = success;
    
      this.barChartOptions = {
        series: data.empCat_list,
        chart: {
          type: "bar",
          height: 430
        },
        plotOptions: {
          bar: {
            horizontal: true,
            dataLabels: {
              position: "top"
            }
          }
        },
        dataLabels: {
          enabled: true,
          offsetX: -6,
          style: {
            fontSize: "12px",
            colors: ["#fff"]
          }
        },
        stroke: {
          show: true,
          width: 1,
          colors: ["#fff"]
        },
        xaxis: {
          categories: data.monthwise
        }
      };
  
     
  });


    }

    deptWiseData:any;
    getDeptwisePayheadcount(companyid){

      this.dashaboardService.getdeptwisePayheadcount(companyid).subscribe(success=>{
        var data:any = success;
        this.deptWiseData = success;
        this.columnChartOptions = {
          series: data.empcatwiselist,
          chart: {
            type: "bar",
            height: 350,
            stacked: true,
            toolbar: {
              show: true
            },
            zoom: {
              enabled: true
            }
          },
          responsive: [
            {
              breakpoint: 480,
              options: {
                legend: {
                  position: "bottom",
                  offsetX: -10,
                  offsetY: 0
                }
              }
            }
          ],
          plotOptions: {
            bar: {
              horizontal: false
            }
          },
          xaxis: {
            type: "category",
            categories: data.deptlist
          },
          legend: {
            position: "right",
            offsetY: 40
          },
          fill: {
            opacity: 1
          }
        };
    });

    }

   otAnalysisList:any;
   getOtAnalysisList(companyid){
     
     this.dashaboardService.getOtAnalysisList(companyid).subscribe(success=>{
       this.otAnalysisList = success;
     })
   }

   attenDetailsObj:any;
   getattendanceDetails(companyid){
    
      this.dashaboardService.getattendanceDetails(companyid).subscribe(data=>{
        var s:any = data;
        this.attenDetailsObj = s;
      });
  
   }

   newJoineeDetailsObj:any={
    totalempjoin:null,
    joiningPeriod:null
   };
   getnewJoineeDetails(companyid){
    this.dashaboardService.getnewJoineeDetails(companyid).subscribe(data=>{
      var s:any = data;
      this.newJoineeDetailsObj = s;
    });
   }

   headCountByGender:any;
   getheadcountbyGender(companyid){
    this.dashaboardService.getheadcountbyGender(companyid).subscribe(data=>{
      var s:any = data;
      this.headCountByGender = s;
    },error=>{
      this.headCountByGender = {
        totalemployee:0,
        gender_list:[{
          percentage:0
        },{
          percentage:0
        }]
      };
    });
   }

   deptwiseheadcount:any;
   getdeptwiseheadcount(companyid){
    this.dashaboardService.getdeptwiseheadcount(companyid).subscribe(success=>{
      var data:any = success;
      this.deptwiseheadcount = data;
    });
   }

  //  ==============================================================

  birthdayDetails:any;
   getBirthdayDetails(){
    let list: any = JSON.parse(sessionStorage.getItem("company"));
    var l: any = [];
    if (list) {
      for (var i = 0; i < list.length; i++) {
        l.push(Number(list[i]));
      }
    }

    this.dashaboardService.getBirthdayDetails(l).subscribe(data=>{
        this.birthdayDetails = data;
    })

   }

   
   leaveDetails:any;
   getLeaveRecords(){
    let list: any = JSON.parse(sessionStorage.getItem("company"));
    var l: any = [];
    if (list) {
      for (var i = 0; i < list.length; i++) {
        l.push(Number(list[i]));
      }
    }

    this.dashaboardService.getLeaveRecords(l).subscribe(data=>{
        this.leaveDetails = data;
    })

   }

   leaveRejoinDetails:any;
   getLeaveRejoinDetails(){
    let list: any = JSON.parse(sessionStorage.getItem("company"));
    var l: any = [];
    if (list) {
      for (var i = 0; i < list.length; i++) {
        l.push(Number(list[i]));
      }
    }

    this.dashaboardService.getLeaveRejoinDetails(l).subscribe(data=>{
        this.leaveRejoinDetails = data;
    },error=>{
      this.leaveRejoinDetails = {
        currentandpreviousleaves_rejoin:[],
        upcomming_leave_rejoin:[]
      }
    })

   }

   probCompDetails:any;
   getProbationCompletionDetails(){
    let list: any = JSON.parse(sessionStorage.getItem("company"));
    var l: any = [];
    if (list) {
      for (var i = 0; i < list.length; i++) {
        l.push(Number(list[i]));
      }
    }

    this.dashaboardService.getProbationCompletionDetails(l).subscribe(data=>{
        this.probCompDetails = data;
    })

   }

   docExpiryDetails:any;
   getDocExpiryDetails(){
    let list: any = JSON.parse(sessionStorage.getItem("company"));
    var l: any = [];
    if (list) {
      for (var i = 0; i < list.length; i++) {
        l.push(Number(list[i]));
      }
    }

    this.dashaboardService.getDocExpiryDetails(l).subscribe(data=>{
        this.docExpiryDetails = data;
    })

   }

   getAssetExpiryDetails(){
    let list: any = JSON.parse(sessionStorage.getItem("company"));
    var l: any = [];
    if (list) {
      for (var i = 0; i < list.length; i++) {
        l.push(Number(list[i]));
      }
    }

    this.dashaboardService.getAssetExpiryDetails(l).subscribe(data=>{
        this.assetExpiryDetails = data;
    })

   }




  setImgUsingLeaveType(leavetype){
    if(leavetype=="Annual Leave"){  return "assets/images/user/leavetypeicon/annual_leave.jpg"; } 
    if(leavetype=="Sick Leave"){ return "assets/images/user/leavetypeicon/sick_leave.png"; }
    if(leavetype=="Employment Accident Leave"){ return "assets/images/user/leavetypeicon/employee_accident_leave.png";}
    if(leavetype=="Compassionate Leave"){ return "assets/images/user/leavetypeicon/compassionate_leave.PNG";}
    if(leavetype=="Work From Home"){ return "assets/images/user/leavetypeicon/work_from_home.png"; }
    if(leavetype=="Unpaid Leave"){ return "assets/images/user/leavetypeicon/unpaid_leave.png"; }
    if(leavetype=="Saturday Off"){ return "assets/images/user/leavetypeicon/saturday_off.png"; }
    if(leavetype=="Relocation Leave"){ return "assets/images/user/leavetypeicon/relocation_leave.png"; }
    if(leavetype=="Paternity Leave"){ return "assets/images/user/leavetypeicon/paternity_leave.jpg";}
    if(leavetype=="Pandemic Leave"){ return "assets/images/user/leavetypeicon/pandemic_leave.png";}
    if(leavetype=="Maternity Leave"){ return "assets/images/user/leavetypeicon/maternity_leave.png"; }
    if(leavetype=="Marriage Leave"){ return "assets/images/user/leavetypeicon/marriage_leave.PNG"; }
    if(leavetype=="Hajj Leave"){ return "assets/images/user/leavetypeicon/hajj_leave.jpg"; }
    if(leavetype=="Fully Paid Absence"){ return "assets/images/user/leavetypeicon/fully_paid_absence.png"; }
    if(leavetype=="Examination Leave"){ return "assets/images/user/leavetypeicon/examination_leave.png"; }
    if(leavetype=="Compensatory Leave"){ return "assets/images/user/leavetypeicon/compensatory_leave.png";}
    if(leavetype=="Business Absence"){ return "assets/images/user/leavetypeicon/business_absence.PNG"; }
    
    return "assets/images/user/no_image.png";
  }

  dashboardRoleList:any=[];
  getUserwiseDashboard(){
    this.dashaboardService.getUserwiseDashboard().subscribe(data=>{

      this.dashboardRoleList=data;
      this.dashboardRoleList.length==0 ? this.isDivView=true : this.isDivView=false;
    }, error=>{
      this.dashboardRoleList.length==0  ? this.isDivView=true : this.isDivView=false;
    });
  }


  /////////////////////////////////////////

  // topEmployee: any = {
  //   name: 'Janis Martin',
  //   designation: 'CEO',
  //   subordinates: [
  //     {
  //       name: 'Matthew Wikes',
  //       designation: 'VP',
  //       subordinates: [
  //         {
  //           name: 'Tina Landry',
  //           designation: 'Budget Analyst',
  //           subordinates: []
  //         }

  //       ]
  //     },
  //     {
  //       name: 'Patricia Lyons',
  //       designation: 'VP',
  //       subordinates: [
  //         {
  //           name: 'Dylan Wilson',
  //           designation: 'Web Manager',
  //           subordinates: []
  //         },
  //         {
  //           name: 'Deb Curtis',
  //           designation: 'Art Director',
  //           subordinates: []
  //         }
  //       ]
  //     },
  //     {
  //       name: 'Larry Phung',
  //       designation: 'VP',
  //       subordinates: []
  //     }
  //   ]
  // };


  ////////////////////////////////////////

  hideShowFun(){
    this.isshow==false ? this.isshow=true : this.isshow=false;
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

  getCompanyDetails(companyid){
   
    this.isDefCompany=false;
    this.getnewJoineeDetails(companyid);
        this.getattendanceDetails(companyid);
        this.getDeptwisePayheadcount(companyid);
        this.getcatwisePayheadcount(companyid);
        this.getOtAnalysisList(companyid);
        this.getdeptwiseheadcount(companyid);
        this.getheadcountbyGender(companyid);
  }


  //====================================
  payslipList:any=[];
  loandetailsList:any=[];
  approvalRequestDetails:any;



  getSixMonthSalarySlip(){
    this.dashaboardService.getSixMonthSalarySlip().subscribe(success=>{
        this.payslipList = success;
    });
  } 

  getLoanDetails(){
    this.dashaboardService.getLoanDetails().subscribe(success=>{
     this.loandetailsList = success;
  });
  }

  getApprovalRequestDetails(){
    this.dashaboardService.getApprovalRequestDetails().subscribe(success=>{
     this.approvalRequestDetails = success;
  });
  }

  paySlipView(data,option){
    if(option=="PRINT"){
      window.open(environment.PRINT_LINK+data.tPayrolljournalId);
    }
   }


}
