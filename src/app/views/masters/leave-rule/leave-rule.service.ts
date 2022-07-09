import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LeaveRuleService {

  constructor(private http: HttpClient) { }

  getLeaveRuleList() {
    return this.http.get(environment.IP + "/api/masters/leaverule/getallleaverule");
  }
  getEmpCat() {
    return this.http.get(environment.IP + "/api/masters/empcat/getallempcat?userId="+sessionStorage.getItem("userId"));
  }

  getReligionList(){
    return this.http.get(environment.IP + "/api/masters/religion/getallreligion?userId="+sessionStorage.getItem("userId"));
  }

  getPayitemList(){
    return this.http.get(environment.IP + "/api/masters/payitem/getpayitembytype/E");
  }

  getCompanyListByHoldingId(id) {
    return this.http.get(environment.IP + "/api/masters/company/getallcompaniesbyholdingid/" + id)
  }

  getHoldingList() {
    return this.http.get(environment.IP + "/api/masters/holding/getallholding")
  }

  getEmpGradeList() {
    return this.http.get(environment.IP + "/api/masters/empgrade/getallempgrade?userId="+sessionStorage.getItem("userId"))
  }

  getPayItemList() {
    return this.http.get(environment.IP + "/api/masters/payitem/getallpayitem")
  }

  getEmpCatList() {
    return this.http.get(environment.IP + "/api/masters/empcat/getallempcat?userId="+sessionStorage.getItem("userId"))
  }

  getLeaveRuleDataById(id) {
    return this.http.get(environment.IP + "/api/masters/leaverule/getleaverulebyid/" + id)
  }

  getLeaveItemById(id) {
    return this.http.get(environment.IP + "/api/masters/leaveitem/getleaveitembyruleid/" + id)
  }

  addUpdateLeaveRule(data) {
    return this.http.post(environment.IP + "/api/masters/leaverule/saveleaverule", data)
  }

  saveLeaveItem(data) {
    return this.http.post(environment.IP + "/api/masters/leaveitem/saveleaveitem", data)
  }

  saveLeavePayBreakup(data) {
    return this.http.post(environment.IP + "/api/masters/leavepaybreakup/saveleavepaybreakup", data)
  }

  editLeaveItem(id) {
    return this.http.get(environment.IP + "/api/masters/leaveitem/getleaveitembyid/" + id)
  }

  setBreakpointListById(id) {
    return this.http.get(environment.IP + "/api/masters/leavepaybreakup/getleavebrkupbyleaveid/" + id)
  }
  getEntitlementById(id) {
    return this.http.get(environment.IP + "/api/masters/leavepolicy/getleavepolicybyleaveid/" + id)
  }

  saveEntitlement(data) {
    return this.http.post(environment.IP + "/api/masters/leavepolicy/saveleavepolicy", data)
  }

  getGradeByCompanyId(data){
    return this.http.post(environment.IP + "/api/masters/empgrade/getempgradebyCompid", data)
  }

}
