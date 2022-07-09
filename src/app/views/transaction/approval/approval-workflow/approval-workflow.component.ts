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
  constructor(private router: Router, private approvalService: ApprovalService) { }

  ngOnInit() {
    this.getAllApprovalList();
  }
  getAllApprovalList() {
    this.approvalService.getAllApprovalList().subscribe(success => {
      this.approvalList = success;
    });
  }

  getDataUsingRedioBtn(data) {
    this.gApprovalwfId = data.gApprovalwfId;
  }

  add() {
    this.router.navigate(['/views/transaction/approvals/add-approval']);
  }
  edit() {
    if (this.gApprovalwfId) {
      this.router.navigate(['/views/transaction/approvals/add-approval'], { queryParams: { id: this.gApprovalwfId } });
    }
  }
  view() {
    if (this.gApprovalwfId) {
      this.router.navigate(['/views/transaction/approvals/add-approval'], { queryParams: { id: this.gApprovalwfId, view: true } });
    }
  }
  delete() { }


}
