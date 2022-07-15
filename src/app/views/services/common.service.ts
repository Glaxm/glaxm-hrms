import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IAngularMyDpOptions } from 'angular-mydatepicker';
import * as moment from 'moment';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  datepickerFormat: IAngularMyDpOptions = {
    dateRange: false,
    dateFormat: 'dd-mmm-yyyy'
  };

  dateFormat(date) {
    return moment(date).format("DD-MMM-yyyy");
  }

  timeFormat(time) {
    return moment(time).format("hh:mm:ss a");
  }

  addTimeToDate(time: string) {
    return moment(new Date()).add(moment.duration(time));
  }

  getSupervisorListByCompanyId(companyId) {
        return this.http.get(environment.IP + "/api/employee/getallSupervisor?companyId=" + companyId);
  }

  getGeneralListByCode(code: string) {
    return code ? this.http.get(environment.IP + "/api/masters/generallistvalue/getgeneralvaluelistbycode/" + code) : null;
  }

  getModuleDetailsByCode(id) {
    return id ? this.http.get(environment.IP + "/api/module/getbyid/" + id) : null;
  }

  getDateBefore18Year() {
    return moment().subtract(6570, 'days').format('DD-MMM-yyyy');
  }

  calDays(startdate,enddate) {

    if (startdate && enddate) {
      var date1: any = startdate;//new Date(sentDate);
      var date2: any = enddate;//new Date();
      var diffDays: any = Math.floor((date2 - date1) / (1000 * 60 * 60 * 24)) + 1;
      return diffDays;
    } else {
      return 0;
    }
  }

  constructor(private http: HttpClient) { }
}

export const statusList = [{ valueCode: 'ACTIVE', valueName: 'Active' }, { valueCode: 'INACTIVE', valueName: 'Inactive' }]


export const GeneralListCode = {
  OVERTIME_REFERENCE_LIST: 'GL1049',
  LEAVE_TYPE_LIST: 'GL1047',
  LEAVE_EXCED_DEDUCT_FROM_LIST:'GL1048',
  EXCED_LEAVE_BALANCE:'GL1011',
  VEHICLE_OWNERSHIP: 'GL1035',
  PROBATION_PERIOD_LIST: 'GL1046',
  SHIFT_TYPE_LIST: 'GL1044',
  ANNUAL_LEAVE_ENTITLEMENT_DAYS_LIST: 'GL1013',
  YES_NO_LIST: 'GL1011',
  GREETING: 'GL1001',
  MARITALL_STATUS_LIST: 'GL1002',
  VISA_COMPANY_LIST: 'GL1003',
  LABOUR_CONTRACTS_LIST: 'GL1004',
  EMIRATES_LIST: 'GL1005',
  AREA_LIST: 'GL1006',
  AIR_TICKET_ENTITLEMENT_LIST: 'GL1007',
  AIR_TICKET_LIST: 'GL1008',
  AIR_TICKET_ELIGIBILITY_LIST: 'GL1009',
  SECTION: 'GL1010',
  ANNUAL_LEAVE_ENTITLEMENT_TYPE_LIST: 'GL1012',
  GENDER_LIST: 'GL1014',
  CITY_LIST: 'GL1015',
  JOB_GRADE_LIST: 'GL1016',
  CURRENT_POSITION_LIST:'GL1060',
  DIVISION_LIST: 'GL1017',
  SUB_SECTION_LIST: 'GL1018',
  EMPLOYMENT_STATUS_LIST: 'GL1019',
  MANAGER_USER_ID_LIST: 'GL1020',
  SOURCE_DOCUMENT_LIST: 'GL1021',
  PAYMENT_MODE_LIST: 'GL1022',
  UNITS_LIST: 'GL1023',
  COUNTRY_LIST: 'GL1024',
  SPONSOR_TYPE: 'GL1003',
  NATIONALITY_LIST: 'GL1025',
  ROOM_UNITS_LIST: 'GL1026',
  ROOM_STATUS: 'GL1027',
  FLOOR_LIST: 'GL1028',
  INSURANCE_COMP_LIST: 'GL1029',
  STATUS_LIST: 'GL1030',
  VEHICLE_MONTHLY_ACTUAL_FUEL_EXPENSE: 'GL1033',
  VEHICLE_MONTHLY_MAINTANANCE_AVERAGE_EXPENSE: 'GL1033',
  VEHICLE_MONTHLY_AVG_SALIK_EXP: 'GL1033',
  VEHICLE_MONTHLY_AVG_PARKING_EXP: 'GL1033',
  FAMILY_BENEFITS_ENTITLEMENT: 'GL1007',
  POINT_OF_HIRE: 'GL1038',
  NO_DEPENDANCY_ENTITLEMENT_FOR_AIR_TICKET: 'GL1032',
  BUILDING_NO: 'GL1036',
  EXCHANGE_HOUSE_NAME: 'GL1037',
  DOCUMENT_TYPE: 'GL1040',
  ENABLE_DISABLE_LIST: 'GL1039',
  INCLDED_NONINCLUDED_LIST: 'GL1038',
  FROM_AIRPORT_LIST: 'GL1041',
  RELATION_LIST: 'GL1042',
  SOCIAL_NETWORKING_SITE: 'GL1043',
  POSSESSION_LIST: 'GL1050',
  TYPE_OF_ABSENCE:'GL1051',
  ABSENCE_REASON:'GL1052'

};

export const WorkflowRequestList = {
  LEAVE_REQUEST: 'EMPLOYEELEAVE'
}

export const IMPORT_FORMAT_SALARY_REVISION=[
  {
    "Employee Id":'',
    "Biometrics Id":'',
    "Pay Item":'',
    "Increament Amount":'',
    "Effective Date":'',
    "New Grade":'',
    "New Designation":'',
    "Remark":''
  }
]

export const IMPORT_FORMAT_DOCUMENT_HISTORY=[
  {
    "Employee Id":'',"Biometrics Id":'',"Document Type":'Emirates ID',"Document ID No.":'',"Document Card No.":'',"Issue Date":'',
    "Expiry Date":'',"Birth Place":'',"Issue Place":'',"Job Title in Res. Visa":'',"Possession":'',"Other Remark":''
  },
  {
    "Employee Id":'',"Biometrics Id":'',"Document Type":'Labour Card',"Document ID No.":'',"Document Card No.":'',"Issue Date":'',
    "Expiry Date":'',"Birth Place":'',"Issue Place":'',"Job Title in Res. Visa":'',"Possession":'',"Other Remark":''
  },
  {
    "Employee Id":'',"Biometrics Id":'',"Document Type":'Passport',"Document ID No.":'',"Document Card No.":'',"Issue Date":'',
    "Expiry Date":'',"Birth Place":'',"Issue Place":'',"Job Title in Res. Visa":'',"Possession":'',"Other Remark":''
  },
  {
    "Employee Id":'',"Biometrics Id":'',"Document Type":'Visa',"Document ID No.":'',"Document Card No.":'',"Issue Date":'',
    "Expiry Date":'',"Birth Place":'',"Issue Place":'',"Job Title in Res. Visa":'',"Possession":'',"Other Remark":''
  }
]

export const IMPORT_FORMAT_EMPLOYEE_ATTENDANCE=[
  {
    "Employee Id":'',"Biometrics Id":'',"Shift Code":'',"From Date":'',"To Date":'',"Time IN":'',
    "Break Start":'',"Break End":'',"Time OUT":'',"Is Half Day":''
  }
]

export const IMPORT_FORMAT_SHIFT_ROSTER=[{
  "From Date": "",
  "To Date": "",
  "Employee ID": "",
  "Biometrics ID":"",
  "Shift Code": ""
}
]

export const IMPORT_FORMAT_EMPLOYEE = [
  { 
    "Company": '', "Employee ID": '',"Biometrics ID": '',"Internal ID":"", "Greeting":'Mr',"First Name":'',
    "Middle Name":'',"Last Name":'',"Gender":'Male',"Date of Birth":'',"Education":'Bcom',"Function":'',"Department":'',"Section":'',
    "Sub-Section":'',"Work Location":'',"Visa Sponsor Company":'',"Date of Joining":'',"MOL ID":'',
    "Employee Category":'',"Employee Grade":'',"Employee Designation":'',
    "User ID":'',"Email ID":'',"Manager ID":'',"Manager Email ID":'',
    "Office Telephone Number":'',"Office Extension Number":'',"Shift Rule":'',"Air Sector":'',
    "Probation period":'',"Probation completion date":'',"Employement Status":'Confirmed',"Service period":'',"Leaving Date":'',"Status":'Active',
    "Source Document":'Attendance',"Normal Hours":'',"Overtime Hours":'',"Payment Mode":'Cash',"Exchange House Name":"", "Bank name":'',"Bank Branch":'',
    "Bank Account No":'',"Employee Name In Bank":'',"IBAN Number":'',"Routing No":'',"Swift Code":'',"IFSC Code":'',
    "Bank City":'',"Exchange Account No":'',"Currency":'',"Description":'',"Holiday Paid":'Yes',"Overtime Paid":'Yes',"Weekly Off Paid":'Yes',
    "Overtime Reference":'Basic',"Basic":'',"Food Allowance":'',"House Rent Allowance":'',"Other Allowance":'',"Fixed OT Allowance":'',
    "Telephone Allowance":'',"Transportation Allowance":'',"Fuel Allowance":'',"Effective Date":'',"Per Units":'Month',
    "Marital Status":"","Nationality":"","Religion":"","Father's Name":"","Mother's Name":"","Spouse Name":"",
    "Home Country Tel. No.":"","Home Country Address":"","Local Home Tel. No.":"","Local Address":"","Annual Leave Entitlement Type":"",
    "Annual Leave Entitlement Days":"","Passport No.":"","Place of Birth":"","Place of Issue":"",
    "Date of Issue":"","Date of Expiry":"","Emirates ID Number":"","Emirates ID Card No.":"","Emirates ID Expiry Date":"","Residence Visa Number":"",
    "Residence Visa File No.":"","Residence Visa Issue Date":"","Residence Visa Expiry Date":"","Job. Title in Res. Visa":"",
    "Labour Card Number":"","Labour Card Expiry Date":"","Personnel ID in Labour Card":"",
    "Regular off Day":'',"Alternate off Day":'',"Alternate off Date":'',"Superior":'',"Shift Supervisor":''
  },
  { 
    "Company": '', "Employee ID": '',"Biometrics ID": '',"Internal ID":"","Greeting":'Mrs',"First Name":'',
    "Middle Name":'',"Last Name":'',"Gender":'Female',"Date of Birth":'',"Education":'',"Function":'',"Department":'',"Section":'',
    "Sub-Section":'',"Work Location":'',"Visa Sponsor Company":'',"Date of Joining":'',"MOL ID":'',
    "Employee Category":'',"Employee Grade":'',"Employee Designation":'',
    "User ID":'',"Email ID":'',"Manager ID":'',"Manager Email ID":'',
    "Office Telephone Number":'',"Office Extension Number":'',"Shift Rule":'',"Air Sector":'',
    "Probation period":'',"Probation completion date":'',"Employement Status":'Temporary',"Service period":'',"Leaving Date":'',"Status":'Inactive',
    "Source Document":'TimeSheet',"Normal Hours":'',"Overtime Hours":'',"Payment Mode":'Bank Transfer',"Exchange House Name":"","Bank name":'',"Bank Branch":'',
    "Bank Account No":'',"Employee Name In Bank":'',"IBAN Number":'',"Routing No":'',"Swift Code":'',"IFSC Code":'',
    "Bank City":'',"Exchange Account No":'',"Currency":'',"Description":'',"Holiday Paid":'No',"Overtime Paid":'No',"Weekly Off Paid":'No',
    "Overtime Reference":'Gross',"Basic":'',"Food Allowance":'',"House Rent Allowance":'',"Other Allowance":'',"Fixed OT Allowance":'',
    "Telephone Allowance":'',"Transportation Allowance":'',"Fuel Allowance":'',"Effective Date":'',"Per Units":'Week',
    "Marital Status":"","Nationality":"","Religion":"","Father's Name":"","Mother's Name":"","Spouse Name":"",
    "Home Country Tel. No.":"","Home Country Address":"","Local Home Tel. No.":"","Local Address":"","Annual Leave Entitlement Type":"",
    "Annual Leave Entitlement Days":"","Passport No.":"","Place of Birth":"","Place of Issue":"",
    "Date of Issue":"","Date of Expiry":"","Emirates ID Number":"","Emirates ID Card No.":"","Emirates ID Expiry Date":"","Residence Visa Number":"",
    "Residence Visa File No.":"","Residence Visa Issue Date":"","Residence Visa Expiry Date":"","Job. Title in Res. Visa":"",
    "Labour Card Number":"","Labour Card Expiry Date":"","Personnel ID in Labour Card":"",
    "Regular off Day":'',"Alternate off Day":'',"Alternate off Date":'',"Superior":'',"Shift Supervisor":''

  },
  { 
    "Company": '', "Employee ID": '',"Biometrics ID": '',"Internal ID":"", "Greeting":'Miss',"First Name":'',
    "Middle Name":'',"Last Name":'',"Gender":'',"Date of Birth":'',"Education":'',"Function":'',"Department":'',"Section":'',
    "Sub-Section":'',"Work Location":'',"Visa Sponsor Company":'',"Date of Joining":'',"MOL ID":'',
    "Employee Category":'',"Employee Grade":'',"Employee Designation":'',
    "User ID":'',"Email ID":'',"Manager ID":'',"Manager Email ID":'',
    "Office Telephone Number":'',"Office Extension Number":'',"Shift Rule":'',"Air Sector":'',
    "Probation period":'',"Probation completion date":'',"Employement Status":'InActive',"Service period":'',"Leaving Date":'',"Status":'',
    "Source Document":'None',"Normal Hours":'',"Overtime Hours":'',"Payment Mode":'Cheque',"Exchange House Name":"","Bank name":'',"Bank Branch":'',
    "Bank Account No":'',"Employee Name In Bank":'',"IBAN Number":'',"Routing No":'',"Swift Code":'',"IFSC Code":'',
    "Bank City":'',"Exchange Account No":'',"Currency":'',"Description":'',"Holiday Paid":'',"Overtime Paid":'',"Weekly Off Paid":'',
    "Overtime Reference":'',"Basic":'',"Food Allowance":'',"House Rent Allowance":'',"Other Allowance":'',"Fixed OT Allowance":'',
    "Telephone Allowance":'',"Transportation Allowance":'',"Fuel Allowance":'',"Effective Date":'',"Per Units":'Day',
    "Marital Status":"","Nationality":"","Religion":"","Father's Name":"","Mother's Name":"","Spouse Name":"",
    "Home Country Tel. No.":"","Home Country Address":"","Local Home Tel. No.":"","Local Address":"","Annual Leave Entitlement Type":"",
    "Annual Leave Entitlement Days":"","Passport No.":"","Place of Birth":"","Place of Issue":"",
    "Date of Issue":"","Date of Expiry":"","Emirates ID Number":"","Emirates ID Card No.":"","Emirates ID Expiry Date":"","Residence Visa Number":"",
    "Residence Visa File No.":"","Residence Visa Issue Date":"","Residence Visa Expiry Date":"","Job. Title in Res. Visa":"",
    "Labour Card Number":"","Labour Card Expiry Date":"","Personnel ID in Labour Card":"",
    "Regular off Day":'',"Alternate off Day":'',"Alternate off Date":'',"Superior":'',"Shift Supervisor":''

  },
  { 
    "Company": '', "Employee ID": '',"Biometrics ID": '', "Internal ID":"","Greeting":'',"First Name":'',
    "Middle Name":'',"Last Name":'',"Gender":'',"Date of Birth":'',"Education":'',"Function":'',"Department":'',"Section":'',
    "Sub-Section":'',"Work Location":'',"Visa Sponsor Company":'',"Date of Joining":'',"MOL ID":'',
    "Employee Category":'',"Employee Grade":'',"Employee Designation":'',
    "User ID":'',"Email ID":'',"Manager ID":'',"Manager Email ID":'',
    "Office Telephone Number":'',"Office Extension Number":'',"Shift Rule":'',"Air Sector":'',
    "Probation period":'',"Probation completion date":'',"Employement Status":'absconding',"Service period":'',"Leaving Date":'',"Status":'',
    "Source Document":'',"Normal Hours":'',"Overtime Hours":'',"Payment Mode":'Exchange House',"Exchange House Name":"","Bank name":'',"Bank Branch":'',
    "Bank Account No":'',"Employee Name In Bank":'',"IBAN Number":'',"Routing No":'',"Swift Code":'',"IFSC Code":'',
    "Bank City":'',"Exchange Account No":'',"Currency":'',"Description":'',"Holiday Paid":'',"Overtime Paid":'',"Weekly Off Paid":'',
    "Overtime Reference":'',"Basic":'',"Food Allowance":'',"House Rent Allowance":'',"Other Allowance":'',"Fixed OT Allowance":'',
    "Telephone Allowance":'',"Transportation Allowance":'',"Fuel Allowance":'',"Effective Date":'',"Per Units":'Hour',
    "Marital Status":"","Nationality":"","Religion":"","Father's Name":"","Mother's Name":"","Spouse Name":"",
    "Home Country Tel. No.":"","Home Country Address":"","Local Home Tel. No.":"","Local Address":"","Annual Leave Entitlement Type":"",
    "Annual Leave Entitlement Days":"","Passport No.":"","Place of Birth":"","Place of Issue":"",
    "Date of Issue":"","Date of Expiry":"","Emirates ID Number":"","Emirates ID Card No.":"","Emirates ID Expiry Date":"","Residence Visa Number":"",
    "Residence Visa File No.":"","Residence Visa Issue Date":"","Residence Visa Expiry Date":"","Job. Title in Res. Visa":"",
    "Labour Card Number":"","Labour Card Expiry Date":"","Personnel ID in Labour Card":"",
    "Regular off Day":'',"Alternate off Day":'',"Alternate off Date":'',"Superior":'',"Shift Supervisor":''

  },
  { 
    "Company": '', "Employee ID": '',"Biometrics ID": '',"Internal ID":"", "Greeting":'',"First Name":'',
    "Middle Name":'',"Last Name":'',"Gender":'',"Date of Birth":'',"Education":'',"Function":'',"Department":'',"Section":'',
    "Sub-Section":'',"Work Location":'',"Visa Sponsor Company":'',"Date of Joining":'',"MOL ID":'',
    "Employee Category":'',"Employee Grade":'',"Employee Designation":'',
    "User ID":'',"Email ID":'',"Manager ID":'',"Manager Email ID":'',
    "Office Telephone Number":'',"Office Extension Number":'',"Shift Rule":'',"Air Sector":'',
    "Probation period":'',"Probation completion date":'',"Employement Status":'Left',"Service period":'',"Leaving Date":'',"Status":'',
    "Source Document":'',"Normal Hours":'',"Overtime Hours":'',"Payment Mode":'',"Bank name":'',"Bank Branch":'',
    "Bank Account No":'',"Employee Name In Bank":'',"IBAN Number":'',"Routing No":'',"Swift Code":'',"IFSC Code":'',
    "Bank City":'',"Exchange Account No":'',"Currency":'',"Description":'',"Holiday Paid":'',"Overtime Paid":'',"Weekly Off Paid":'',
    "Overtime Reference":'',"Basic":'',"Food Allowance":'',"House Rent Allowance":'',"Other Allowance":'',"Fixed OT Allowance":'',
    "Telephone Allowance":'',"Transportation Allowance":'',"Fuel Allowance":'',"Effective Date":'',"Per Units":'',
    "Marital Status":"","Nationality":"","Religion":"","Father's Name":"","Mother's Name":"","Spouse Name":"",
    "Home Country Tel. No.":"","Home Country Address":"","Local Home Tel. No.":"","Local Address":"","Annual Leave Entitlement Type":"",
    "Annual Leave Entitlement Days":"","Passport No.":"","Place of Birth":"","Place of Issue":"",
    "Date of Issue":"","Date of Expiry":"","Emirates ID Number":"","Emirates ID Card No.":"","Emirates ID Expiry Date":"","Residence Visa Number":"",
    "Residence Visa File No.":"","Residence Visa Issue Date":"","Residence Visa Expiry Date":"","Job. Title in Res. Visa":"",
    "Labour Card Number":"","Labour Card Expiry Date":"","Personnel ID in Labour Card":"",
    "Regular off Day":'',"Alternate off Day":'',"Alternate off Date":'',"Superior":'',"Shift Supervisor":''

  }
];

export const IMPORT_FORMAT_EMPLOYEE_LOAN =[{
  'Employee Id':'',
  'Biometrics Id':'',
  'Loan Item':'',
  'Loan Date':'',
  'Loan Amount':'',
  'Interest Rate':'',
  'Amount Repaid':'',
  'Installment Start Date':'',
  'Total No. of Installments':'',
  'No. of Paid Installments':'',
  'Remark':''
}]

export const IMPORT_FORMAT_EMPLOYEE_SHIFT_ALLOCATION = [{
  'From Date':'',
  'To Date':'',
  'Employee ID':'',
  'Biometrics ID':'',
  'Shift Code':''
}];

export const IMPORT_FORMAT_EMP_PAY_TRANSACTION = [
  {
    'Employee Id': '',
    'Biometrics Id': '',
    'Transaction Date': '',
    'Effective Date': '',
    'Trans. Type': 'Advance',
    'Amount': '',
    'Description': '',
    'Pay Type': 'Earning',
    'OT Hours':''
  },
  {
    'Employee Id': '',
    'Biometrics Id': '',
    'Transaction Date': '',
    'Effective Date': '',
    'Trans. Type': 'Misc Deduction',
    'Amount': '',
    'Description': '',
    'Pay Type': 'Deduction',
    'OT Hours':''
  },
  {
    'Employee Id': '',
    'Biometrics Id': '',
    'Transaction Date': '',
    'Effective Date': '',
    'Trans. Type': 'Misc Earnings',
    'Amount': '',
    'Description': '',
    'Pay Type': '',
    'OT Hours':''
  }
];

export const IMPORT_FORMAT_EMPLOYEE_LEAVE_NEW=[
{
  "Employee Id":'',
  "Biometrics Id":'',
  "Leave Type Name":'',
  "Leave From":'',
  "Leave To":'',
  "Paid Leave Days":'',
  "Unpaid Leave Days":'',
  "Friday during leave":'',
  "Saturday during leave":'',
  "Compensatory/compassionate off in Leave":'',
  "Public Holidays during Leave":'',
  "Remarks":'',
  "Rejoining date":'',
  "Last Leave settled upto":'',
  "Current Leave Settled up to":'',
  "Air Ticket Entitlement":'',
  "Air Ticket Amount":'',
  "Last Air ticket settled upto":'',
  "Current Airticket Settled up to":''

}
];

export const IMPORT_FORMAT_EMPLOYEE_LEAVE = [
  {
    "Prefix":'',
    "Suffix":'',
    "Staff No.":'',
    "Staff Name":'',
    "Job title":'',
    "Co.":'',
    "Joining Date":'',
    "Leave From":'',
    "Leave To":'',
    "No. of Days Leave":'',
    "Friday during leave":'',
    "Saturday during leave":'',
    "Compensatory/compassionate off":'',
    "Encashment":'',
    "Public Holidays":'',
    "Rejoining date":'',
    "Annual leave days":'',
    "Last Leave settled upto":'',
    "Current Leave Settled up to":'',
    "Air Ticket Entitlement":'',
    "Last Air ticket settled upto":'',
    "Current Airticket Settled up to":'',
    "Home Town ( For air ticket)":'',
    "Posting date (date of processing)":'',
    "Unpaid":'',
    "Sick":'',
    "Business Trip":'',
    "Emergency":'',
    "Marriage leave":'',
    "Maternity/Peternity":'',
    "Accident at work":'',
    "Training":'',
    "vlook":'',
    "last Bonus setteled upto":'',
    "Current Bonus setteled upto":'',
    "Last bonus amount payed":'',
    "Current bonus amount payed":'',
    "Remarks":'',
    "Certificate provided":''
  }];

export const IMPORT_FORMAT_OPENING_LEAVE_BAL = [
  { 'Employee ID':'', 'Biometrics ID':'', 'Leave Type':'Annual Leave', 'Last Leave Settlement Date':'','Current Leave Settlement Date':'',  'Resumption Date':'',"Leave Balance":"","Balance Opening Date":"","Balance Renewal Date":"","Air ticket entitlement":'Annually','Last Air ticket Settlement Date':'','Current Air ticket Settlement Date':'','Home town Air Port Name':''},
  { 'Employee ID':'', 'Biometrics ID':'', 'Leave Type':'', 'Last Leave Settlement Date':'','Current Leave Settlement Date':'',  'Resumption Date':'',"Leave Balance":"","Balance Opening Date":"","Balance Renewal Date":"","Air ticket entitlement":'Once in two years','Last Air ticket Settlement Date':'','Current Air ticket Settlement Date':'','Home town Air Port Name':''}
 
];

