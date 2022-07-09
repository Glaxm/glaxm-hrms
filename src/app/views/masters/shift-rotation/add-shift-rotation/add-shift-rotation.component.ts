import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-shift-rotation',
  templateUrl: './add-shift-rotation.component.html',
  styleUrls: ['./add-shift-rotation.component.scss']
})
export class AddShiftRotationComponent implements OnInit {
  shiftrotationform:any;
  isView:boolean;
  daysList:any =[{code:'Monday',value:'Monday'},{code:'Tuesday',value:'Tuesday'},{code:'Wednesday',value:'Wednesday'},
  {code:'Thursday',value:'Thursday'},{code:'Friday',value:'Friday'},{code:'Saturday',value:'Saturday'},{code:'Sunday',value:'Sunday'}];
  
  schedulefrequencyList:any =[{code:'Weekly',value:'Weekly'},{code:'Monthly',value:'Monthly'},{code:'Yearly',value:'Yearly'}];
  
  constructor(private router:Router) {
      this.shiftrotationform = new FormGroup({
        scheduleName: new FormControl(null),
        timeofschedule:new FormControl(null),
        applicablefrom:new FormControl(null),
        applicableto:new FormControl(null),
        everyweek:new FormControl(null),
        schedulefrequency:new FormControl(null),
      })
   }

  ngOnInit() {
  }

  back(){
    this.router.navigate(['views/masters/shiftrotation/shiftrotation-summary'])
  }

}
