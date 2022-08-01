import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path:"country", loadChildren:()=> import('./country/country.module').then(m=>m.CountryModule)
  },
  {
    path:"transfer-form", loadChildren:()=> import('./transfer-form/transfer-form.module').then(m=>m.TransferFormModule)
  },
  {
    path:'employee',  loadChildren:()=> import('./employee/employee.module').then(m=>m.EmployeeModule) 
  },
  {
    path:'dept', loadChildren:()=> import('./department/department.module').then(m=>m.DepartmentModule)
  },
  {
    path:'company', loadChildren:()=> import('./company/company.module').then(m=>m.CompanyModule)
  },
  {
    path:'holding',loadChildren:()=>import('./holding/holding.module').then(m=>m.HoldingModule)
  },
  {
    path:'empgrade',loadChildren:()=>import('./emp-grade/emp-grade.module').then(m=>m.EmpGradeModule)
  },
  {
    path:'empcat',loadChildren:()=>import('./emp-cat/emp-cat.module').then(m=>m.EmpCatModule)
  },
  {
    path:'designation',loadChildren:()=>import('./designation/designation.module').then(m=>m.DesignationModule)
  },
  {
    path:'jobfunction',loadChildren:()=>import('./job-function/job-function.module').then(m=>m.JobFunctionModule)
  },
  {
    path:'air-sector',loadChildren:()=>import('./air-sector/air-sector.module').then(m=>m.AirSectorModule)
  },
  {
    path:'edu-cat',loadChildren:()=>import('./edu-cat/edu-cat.module').then(m=>m.EduCatModule)
  },
  {
    path:'religion',loadChildren:()=>import('./religion/religion.module').then(m=>m.ReligionModule)
  },
  {
    path:'skills',loadChildren:()=>import('./skills/skills.module').then(m=>m.SkillsModule)
  },
  {
    path:'holiday',loadChildren:()=>import('./holiday/holiday.module').then(m=>m.HolidayModule)
  },
  {
    path:'ramadan-rule',loadChildren:()=>import('./ramadan-rule/ramadan-rule.module').then(m=>m.RamadanRuleModule)
  },
  {
    path:'leave-rule', loadChildren:()=>import('./leave-rule/leave-rule.module').then(m=>m.LeaveRuleModule)
  },
  {
    path:'leave-item', loadChildren:()=>import('./leave-item/leave-item.module').then(m=>m.LeaveItemModule)
  },
  {
    path:'pay-item', loadChildren:()=>import('./pay-item/pay-item.module').then(m=>m.PayItemModule)
  },
  {
    path:'shift-rule', loadChildren:()=>import('./shift-rule/shift-rule.module').then(m=>m.ShiftRuleModule)
  },
  {
    path:'currency', loadChildren:()=>import('./currency/currency.module').then(m=>m.CurrencyModule)
  },
  {
    path:'bank', loadChildren:()=>import('./bank/bank.module').then(m=>m.BankModule)
  },
  {
    path:'monthyear',loadChildren:()=>import('./monthyear/monthyear.module').then(m=>m.MonthyearModule)
  },
  {
    path:'payroll-setting',loadChildren:()=>import('./payroll-setting/payroll-setting.module').then(m=>m.PayrollSettingModule)
  },
  {
    path:'generallist', loadChildren:()=>import('./generallist/generallist.module').then(m=>m.GenerallistModule)
  },
  {
    path:'assettype', loadChildren:()=>import('./assettype/assettype.module').then(m=>m.AssettypeModule)
  },
  {
    path:'assetitem',loadChildren:()=>import('./assetitem/assetitem.module').then(m=>m.AssetitemModule)
  },
  {
    path:'assetgroup',loadChildren:()=>import('./assetgroup/assetgroup.module').then(m=>m.AssetgroupModule)
  },{
    path:'vehicle',loadChildren:()=>import('./vehicletran/vehicletran.module').then(m=>m.VehicletranModule)
  },
  {
    path:'accomodation',loadChildren:()=>import('./accommodation/accommodation.module').then(m=>m.AccommodationModule)
  },
  {
    path:'assign-shift',loadChildren:()=>import('./assign-shift/assign-shift.module').then(m=>m.AssignShiftModule)
  },
  {
    path:'shiftrotation',loadChildren:()=>import('./shift-rotation/shift-rotation.module').then(m=>m.ShiftRotationModule)
  },
  {
    path:'division',loadChildren:()=>import('./division/division.module').then(m=>m.DivisionModule)
  },
  {
    path:'subsection',loadChildren:()=>import('./subsection/subsection.module').then(m=>m.SubsectionModule)
  },
  {
    path:'section',loadChildren:()=>import('./section/section.module').then(m=>m.SectionModule)
  },
  {
    path:'emp-increment',loadChildren:()=>import('./emp-increament/emp-increament.module').then(m=>m.EmpIncreamentModule)
  },
  {
    path:'visasponsor',loadChildren:()=>import('./visasponsor/visasponsor.module').then(m=>m.VisasponsorModule)
  },{
    path:'openingleavebalance',loadChildren:()=>import('./opening-leave-bala/opening-leave-bala.module').then(m=>m.OpeningLeaveBalaModule)
  },
  {
    path:'documenttype',loadChildren:()=>import('./documenttype/documenttype.module').then(m=>m.DocumenttypeModule)
  },
  {
    path:'uom',loadChildren:()=>import('./uom/uom.module').then(m=>m.UomModule)
  },
  {
    path:'job-defination',loadChildren:()=>import('./job-defination/job-defination.module').then(m=>m.JobDefinationModule)
  },
  {
    path:'jobcard',loadChildren:()=>import('./jobcard/jobcard.module').then(m=>m.JobcardModule)
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MastersRoutingModule { }
