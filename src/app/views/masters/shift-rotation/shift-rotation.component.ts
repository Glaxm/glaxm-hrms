import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-shift-rotation',
  templateUrl: './shift-rotation.component.html',
  styleUrls: ['./shift-rotation.component.scss']
})
export class ShiftRotationComponent implements OnInit {

  shiftrotaionlist:any =[];
  enableFilter:boolean;
  constructor(private router:Router) { }

  ngOnInit() {
  }

  add(){
    this.router.navigate(['views/masters/shiftrotation/add-shiftrotation'])
  }

  edit(){}

  delete(){}

  view(){}

  getDataUsingRedioBtn(){}

}
