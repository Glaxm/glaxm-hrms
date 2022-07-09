import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GenerallistService } from 'src/app/views/masters/generallist/generallist.service';
import { ApprovalService } from './approval.service';

@Component({
  selector: 'app-approval-workflow',
  templateUrl: './approval-workflow.component.html',
  styleUrls: ['./approval-workflow.component.scss']
})
export class ApprovalWorkflowComponent implements OnInit {
  gApprovalwfId: any;
  enableFilter: boolean = false;
  approvalList: any = [];

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

  constructor(private router: Router, private approvalService: ApprovalService) { }

  ngOnInit() {
    this.getAllApprovalList();
    this.moduleList = JSON.parse(sessionStorage.getItem("moduleList"));
    if (this.moduleList) {
      this.moduleList.map((e) => {
        if (e.moduleGroup == 'Approvals' && e.moduleName == 'Approval Workflow') {
         
          this.flags = { 
                'createFlag': e.createFlag, 
                'editFlag': e.editFlag, 
                'readFlag': e.readFlag, 
                'deleteFlag': e.deleteFlag,
                'importFlag': e.importFlag,
                'exportFlag': e.exportFlag,
                'forSelf': e.forSelf
                };
        }
      });
    }
  }
  getAllApprovalList() {
      // alert(sessionStorage.getItem("company"))
      let list: any = JSON.parse(sessionStorage.getItem("company"));
      var l: any = [];
      if (list) {
        for (var i = 0; i < list.length; i++) {
          l.push(Number(list[i]));
        }
      }
    this.approvalService.getAllApprovalList(l).subscribe(success => {
      this.approvalList = success;
    });
  }

  getDataUsingRedioBtn(data) {
    this.gApprovalwfId = data.gApprovalwfId;
  }

  add() {
    this.router.navigate(['/views/approval-flow/approvals/add-approval']);
  }
  edit() {
    if (this.gApprovalwfId) {
      this.router.navigate(['/views/approval-flow/approvals/add-approval'], { queryParams: { id: this.gApprovalwfId } });
    }
  }
  view() {
    if (this.gApprovalwfId) {
      this.router.navigate(['/views/approval-flow/approvals/add-approval'], { queryParams: { id: this.gApprovalwfId, view: true } });
    }
  }
  delete() { }


}
