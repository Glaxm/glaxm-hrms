import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PayrollProcessingService } from '../payroll-processing/payroll-processing.service';
// import jspdf, { jsPDF } from "jspdf";
import html2canvas from 'html2canvas';
// Default export is a4 paper, portrait, using millimeters for units
const doc = new jsPDF();
import {jsPDF} from 'jspdf';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-payroll-processing-detail',
  templateUrl: './payroll-processing-detail.component.html',
  styleUrls: ['./payroll-processing-detail.component.scss']
})
export class PayrollProcessingDetailComponent implements OnInit {
  detailsList: any = [];
  tPayrolljournalId: any;
  payslipObj: any;
  empName: any;
  empCode: any;
  jobFunction: any;
  payMode: any;
  month: any;
  payslipNo: any;
  normalOT: any;
  holidayOT: any;
  weeklyOffOT: any;
  payslipProcessList: any;
  instanceId: any;
  compName: any;
  deptName: any;
  totalDeductionList: any = [{
    name: 'Loan',
    amount: Math.floor(1000 + Math.random() * 9000)
  }, {
    name: 'Advance',
    amount: Math.floor(1000 + Math.random() * 9000)
  }]

  constructor(private router: Router, private processingService: PayrollProcessingService, private activatedRoute: ActivatedRoute) {
    this.activatedRoute.queryParams.subscribe(params => {
      this.tPayrolljournalId = params.id;
      this.instanceId = params.instanceid;
    });
  }

  ngOnInit() {
    if (this.tPayrolljournalId) {
      this.getPayslipObj(this.tPayrolljournalId);
    }
  }

  header: any;
  lines: any;
  calPayitem: any;
  loanAmt: any = 0;
  totalAdvanceAmt: any = 0;
  totalDeductionAmt: any = 0;
  normalOTHrs: any = 0;
  fridayOTHrs: any = 0;
  holidayOTHrs: any = 0;
  totalOTHrs: any = 0;
  date: any = new Date();
  bankbranch: any;
  bankaccno: any;
  bankname: any;
  miscEarning: any;
  bankName: any;
  bankCode: any;
  bankAccNo: any;

  getPayslipObj(id) {
    this.processingService.getPaslipObjById(id).subscribe(s => {
      this.payslipObj = s;
      this.header = this.payslipObj.header;
      this.lines = this.payslipObj.payLine;
      this.bankName = this.payslipObj.header.transfeR_BRANCH;
      this.bankAccNo = this.payslipObj.header.transfeR_ACCT;
      this.payslipNo = this.payslipObj.header.payslipId;
      this.normalOT = this.payslipObj.header.overtimeAmount;
      this.holidayOT = this.payslipObj.header.otholidayAmt;
      this.miscEarning = this.payslipObj.totalMiscEarningAmt;
      this.payMode = this.payslipObj.header.payMode;
      var Nhrs = this.header.otnormalHours / 60;
      var NMin = this.header.otnormalHours % 60;
      var NMin1 = NMin / 60;
      this.normalOTHrs = this.header.otnormalHours;//Nhrs+":"+NMin1;

      var Fhrs = this.header.otweeklyoffhrs / 60;
      var FMin = this.header.otweeklyoffhrs % 60;
      var FMin1 = FMin / 60;
      this.fridayOTHrs = this.header.otweeklyoffhrs;//Fhrs+":"+FMin1;
      var Hhrs = this.header.otholidayHours / 60;
      var HMin = this.header.otholidayHours % 60;
      var HMin1 = HMin / 60;
      this.holidayOTHrs = this.header.otholidaY_HRS;//Hhrs+":"+HMin1;
      var totalOT: any = this.header.otholidayHours + this.header.otweeklyoffhrs + this.header.otnormalHours;
      var THrs = totalOT / 60;
      var TMin = totalOT % 60;
      this.totalOTHrs = this.header.totalOTHrs// THrs+":"+TMin;
      this.weeklyOffOT = this.payslipObj.header.otweeklyoffAmt;
      this.calPayitem = this.calAmount(this.payslipObj.payLine) + this.normalOT + this.holidayOT + this.weeklyOffOT + this.miscEarning;
      this.getEmployeeDetailsById(this.payslipObj.header.xEmployeeId);
      // this.getBankDetailsById(this.payslipObj.header.xEmployeeId);
      this.getMonthyearDetailsById(this.payslipObj.header.xMonthId);
      for (var i = 0; i < this.payslipObj.loan.length; i++) {
        this.loanAmt = this.loanAmt + this.payslipObj.loan[0].calPayitem;
      }
      this.totalAdvanceAmt = this.payslipObj.totalAdvanceAmt;
      this.totalDeductionAmt = this.payslipObj.totalDeductionAmt;
    });
  }

  // getBankDetailsById(id){
  //   this.processingService.getBankDetailsById(id).subscribe(s=>{
  //     var success:any =s;
  //   });
  // }

  getMonthyearDetailsById(id) {
    this.processingService.getMonthyearDetailsById(id).subscribe(s => {
      var success: any = s;
      this.month = success.data.name;
    });
  }

  calAmount(list) {
    var totalAmt: number = 0;
    for (var i = 0; i < list.length; i++) {
      totalAmt = totalAmt + list[i].calPayitem;
    }
    return totalAmt;
  }

  getEmployeeDetailsById(id) {
    this.processingService.getEmployeeDetailsById(id).subscribe(s => {
      var success: any = s;
      this.empName = success.data.displayName;
      this.empCode = success.data.value;
      this.getDesignationById(success.data.empDesignationId);
      //this.getEmpSalaryByEmpId(id);
      this.getCompanyDetailsById(success.data.companyId);
      this.getDeptDetailsById(success.data.departmentId);
      this.getBankDetailsByEmpId(id);
    });
  }

  getBankDetailsByEmpId(id) {
    this.processingService.getBankDetailsByEmpId(id).subscribe(d => {
      var data: any = d;
      if (data.length > 0) {
        this.bankbranch = data[0].empbankbranch;
        this.bankname = data[0].bankname;
        this.bankaccno = data[0].empaccountno;
      }
    });
  }

  getDeptDetailsById(id) {
    this.processingService.getDeptDetailsById(id).subscribe(d => {
      var data: any = d;

      this.deptName = data.data.name;
      // alert(JSON.stringify(d));
    });
  }

  getDesignationById(id) {
    if (id) {
      this.processingService.getDesignationById(id).subscribe(s => {
        var success: any = s;
        this.jobFunction = success.data.name;
      });
    }
  }

  getCompanyDetailsById(id) {

    this.processingService.getCompanyById(id).subscribe(s => {
      var success: any = s;
      this.compName = success.data.companyName;
    });
  }

  // getEmpSalaryByEmpId(id){
  //   if(id){
  //     this.processingService.getEmpSalaryByEmpId(id).subscribe(s=>{
  //       var success:any = s;
  //       alert(JSON.stringify(success));
  //       if(success.data.payMode=="C"){
  //         this.payMode = "Cash"
  //       } else if(success.data.payMode=="H"){
  //         this.payMode="Cheque";
  //       } else if(success.data.payMode=="B"){
  //         this.payMode="Bank Transfer";
  //       } else{
  //         this.payMode="NA";
  //       }
  //     });
  //   }
  // }

  getJobTitle(id) {
    if (id) {
      this.processingService.getJobFunDataById(id).subscribe(s => {
        var success: any = s;
        this.jobFunction = success.data.name;
      });
    }
  }

  back() {
    this.router.navigate(['/views/payroll/payroll-processing'], { queryParams: { instanceid: this.instanceId } });
  }


  downloadPayslip2()  {
    var input = document.getElementById('contentToConvert');
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'landscape',
      });
      const imgProps= pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();//(imgProps.height * pdfWidth) / imgProps.width;
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save('download.pdf');
    });
  }

  @ViewChild('content', {static: false}) content: ElementRef;

  downloadPayslip() {
    window.open(environment.PRINT_LINK+this.tPayrolljournalId);
//     let DATA = document.getElementById('contentToConvert');
    
// html2canvas(DATA).then(canvas => {
    
//     let fileWidth = 208;
//     let fileHeight = canvas.height * fileWidth / canvas.width;
    
//     const FILEURI = canvas.toDataURL('image/png')
//     let PDF = new jsPDF('p', 'mm', 'a4');
//     let position = 0;
//     PDF.addImage(FILEURI, 'PNG', 0, position, fileWidth, fileHeight)
    
//     PDF.save('payslip_'+Math.random()+'.pdf');
// });   
  }

  downloadPayslip1() {
    // doc.text("Hello world!", 10, 10);
    // doc.save("a4.pdf");

    var data = document.getElementById('contentToConvert');
    html2canvas(data).then(canvas => {
      // Few necessary setting options
      var imgWidth = 210;   //210
      var pageHeight = 297;  //297
      var imgHeight =canvas.height * imgWidth / canvas.width;
      var heightLeft = imgHeight;

      const contentDataURL = canvas.toDataURL('image/png',1.0)
     // let pdf = new jspdf('l', 'mm', 'a4'); // A4 size page of PDF
      //var position = 0;

      var doc = new jsPDF("p", "mm", "a4");

      var width = doc.internal.pageSize.getWidth();
      var height = doc.internal.pageSize.getHeight();

      var imgData = 'data:image/jpeg;base64,/9j/4AAQSkZJ......';

      doc.addImage(contentDataURL, 'JPEG', 0, 0, width, height);
      doc.save('Payslip.pdf'); // Generated PDF

     // pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight)
      //  pdf.addImage(contentDataURL, 'JPEG', 10, 10, 180,150)
        //pdf.save('Payslip.pdf'); // Generated PDF
    });

  }

}
