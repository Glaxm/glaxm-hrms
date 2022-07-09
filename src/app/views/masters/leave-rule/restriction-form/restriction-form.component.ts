import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { LeaveRuleService } from '../leave-rule.service';

@Component({
  selector: 'app-restriction-form',
  templateUrl: './restriction-form.component.html',
  styleUrls: ['./restriction-form.component.scss']
})
export class RestrictionFormComponent implements OnInit {

  @Input() considerholidays: string;
  @Input() considerweekend: string;
  @Input() exceedleavebal: string;
  @Input() excddeductfrom: string;
  @Input() fulldayAllowed: string;
  @Input() halfdayAllowed: string;
  @Input() leaveRuleId: string;
  @Input() docreq: string;
  @Input() leaveperReq: any;
  @Output() restriction = new EventEmitter;
  
  yesNoList:any =[{id:'Y',name:'Yes'},{id:'N',name:'No'}];
  restrictionForm:FormGroup;
  leaveItemList:any=[{id:'AL',name:'Annual Leave'},{id:'UL',name:'Unpaid Leave'}];

  constructor(private leaveRuleService:LeaveRuleService) {
      this.restrictionForm = new FormGroup({
        considerholidays: new FormControl(null),
        considerweekend: new FormControl(null),
        exceedleavebal: new FormControl(null),
        excddeductfrom: new FormControl(null),
        fulldayAllowed: new FormControl(null),
        halfdayAllowed: new FormControl(null),
        fulldayAllowed1: new FormControl(null),
        halfdayAllowed1: new FormControl(null),
        docreq: new FormControl(null),
        leaveperReq: new FormControl(null)
      });
     }

  ngOnInit() {
    this.restrictionForm.get('considerholidays').setValue(this.considerholidays);
    this.restrictionForm.get('considerweekend').setValue(this.considerweekend);
    this.restrictionForm.get('exceedleavebal').setValue(this.exceedleavebal);
    this.restrictionForm.get('excddeductfrom').setValue(this.excddeductfrom);
    this.restrictionForm.get('docreq').setValue(this.docreq);
    this.restrictionForm.get('leaveperReq').setValue(this.leaveperReq);

    this.fulldayAllowed=="Y" ? this.restrictionForm.get('fulldayAllowed1').setValue(true):this.restrictionForm.get('fulldayAllowed1').setValue(false);
    this.halfdayAllowed=="Y" ? this.restrictionForm.get('halfdayAllowed1').setValue(true):this.restrictionForm.get('halfdayAllowed1').setValue(false);
  
    if(this.restrictionForm.value.exceedleavebal=="N"){
      this.restrictionForm.get('excddeductfrom').disable();
    } else{
      this.restrictionForm.get('excddeductfrom').enable();
    }
  }

  isviewExcededDeduct:boolean;
  restrictionEvent() {
    if(this.restrictionForm.value.exceedleavebal=="N"){
      this.restrictionForm.get('excddeductfrom').disable();
    } else{
      this.restrictionForm.get('excddeductfrom').enable();
    }
    
    this.restrictionForm.value.fulldayAllowed1 ? this.restrictionForm.get('fulldayAllowed').setValue("Y"):this.restrictionForm.get('fulldayAllowed').setValue("N")
    this.restrictionForm.value.halfdayAllowed1 ? this.restrictionForm.get('halfdayAllowed').setValue("Y"):this.restrictionForm.get('halfdayAllowed').setValue("N")
    this.restriction.emit(this.restrictionForm.value);
  }

 

}
