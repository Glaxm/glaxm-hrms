// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
   // IP:"http://localhost:8080/expense"

  //IP:"http://localhost:8081/expense",
  
   //  IP:"https://glaxm-hr.cloudiax.com:8443/expense",
      IP:"https://glaxm.cloudiax.com/hrms",
      IMG_URL:"https://glaxm.cloudiax.com",
      PRINT_LINK:"https://glaxm.cloudiax.com/CrystalPayslip/PAYSLIPWF.aspx?transId=",
      PRINT_PAYSLIP:"https://glaxm.cloudiax.com/CrystalPayslip/PAYSLIPWF.aspx",
      LEAVE_FORM_LINK:"https://glaxm.cloudiax.com/CrystalPayslip/LEAVEAPPLICATIONWF.aspx?leaveId=",
      EOSM_FORM:"https://glaxm.cloudiax.com/CrystalPayslip/EOSBCALCULATION_WF.aspx?eosbId=",
      RESIGN_FORM:"https://glaxm.cloudiax.com/CrystalPayslip/EOSB_CRWF.aspx?eosbId=",
      ADVANCE_PAY_TRANS_FORM:"https://glaxm.cloudiax.com/CrystalPayslip/WORKADVANCE_WF.aspx?advId=",
      LEAVE_CAL_REPORT_LINK:"https://glaxm.cloudiax.com/CrystalPayslip/EOSBCALCULATION_WF.aspx?eosbId=",

      IS_VIEW_DASHBOARD:true

};
 
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
