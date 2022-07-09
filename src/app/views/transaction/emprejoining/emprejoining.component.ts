import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EmprejoiningService } from './emprejoining.service';

@Component({
  selector: 'app-emprejoining',
  templateUrl: './emprejoining.component.html',
  styleUrls: ['./emprejoining.component.scss']
})
export class EmprejoiningComponent implements OnInit {
  L_EMPLEAVEREJOIN_ID: any;
  enableFilter: boolean = false;
  emprejoiningList: any = [];
  moduleList: any = [];
  moduleid:any;
  flags = {
    createFlag: '',
    editFlag: '',
    readFlag: '',
    deleteFlag: '',
    exportFlag:'',
    importFlag:''
  }
  constructor(private router: Router, private emprejoiningService: EmprejoiningService) {
    this.moduleList = JSON.parse(sessionStorage.getItem("moduleList"));
    if (this.moduleList) {
      this.moduleList.map((e) => {
        if (e.moduleGroup == 'Admin Settings' && e.moduleName == 'User') {
         this.moduleid=e.moduleId;
          this.flags = { 
                'createFlag': e.createFlag, 
                'editFlag': e.editFlag, 
                'readFlag': e.readFlag, 
                'deleteFlag': e.deleteFlag,
                'importFlag': e.importFlag,
                'exportFlag': e.exportFlag
                };
        }
      });
    }

   }

  ngOnInit() {
    this.getAllEmprejoining();
  }
  getAllEmprejoining() {
    this.emprejoiningService.getAllEmprejoining().subscribe(success => {
      this.emprejoiningList = success;
    });
  }
  getDataUsingRedioBtn(data) {
    this.L_EMPLEAVEREJOIN_ID = data.lEmpleaverejoinId;
  }
  add() {
    this.router.navigate(['/views/transaction/emp-rejoin/add-emprejoining'],{queryParams:{ moduleid:this.moduleid }});
  }
  edit() {
    if (this.L_EMPLEAVEREJOIN_ID) {
      this.router.navigate(['/views/transaction/emp-rejoin/add-emprejoining'], { queryParams: { id: this.L_EMPLEAVEREJOIN_ID, moduleid:this.moduleid } });
    }
  }
  view() {
    if (this.L_EMPLEAVEREJOIN_ID) {
      this.router.navigate(['/views/transaction/emp-rejoin/add-emprejoining'], { queryParams: { id: this.L_EMPLEAVEREJOIN_ID, view: true, moduleid:this.moduleid } });
    }
  }
  delete() { }
}
