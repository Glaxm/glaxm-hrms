import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CommonService, GeneralListCode } from 'src/app/views/services/common.service';
import { environment } from 'src/environments/environment';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-emp-docs',
  templateUrl: './emp-docs.component.html',
  styleUrls: ['./emp-docs.component.scss']
})
export class EmpDocsComponent implements OnInit {

  @Input() empId: string;
  @Input() companyId: string;
  @Input() holdingId: string;
  @Input() displayName: string;
  doctypeList:any =[];
  addList:any =[];
  removeList:any =[];
  empDocsForm: any;
  isview:string;
  empDocList:any=[];
  constructor(private activeRoute: ActivatedRoute,private commonService:CommonService,private empService:EmployeeService) {
    this.empDocsForm = new FormGroup({
      docType: new FormControl(null),
    });
    this.activeRoute.queryParams.subscribe(params => {
      this.isview =params.view;
    });

   }

  ngOnInit() {
    this.getDocType();
    this.getDocListByEmpId();
  }

  getDocListByEmpId(){
      this.empService.getDocListByEmpId(this.empId).subscribe(data=>{
          this.empDocList = data;
      })
  }

  getDocType(){
      this.commonService.getGeneralListByCode(GeneralListCode.DOCUMENT_TYPE).subscribe(data=>{
          this.doctypeList = data;
      });
  }

  view(data){
    window.open(environment.IMG_URL+data.path);
  }




}
