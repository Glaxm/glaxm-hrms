import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/login/login.service';
import { ToastrService } from 'src/app/views/services/toastr.service';
import { CommonService } from 'src/app/views/services/common.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-search',
  templateUrl: './nav-search.component.html',
  styleUrls: ['./nav-search.component.scss']
})
export class NavSearchComponent implements OnInit {
  moduleList: any
  menubarList: any; 
  filterString = "";
  inputText:any;
  constructor(private route:Router) {  
    
   }


  ngOnInit() {
    this.moduleList = JSON.parse(sessionStorage.getItem("moduleList"));
    this.menubarList = this.setMenuList(this.moduleList);
  }

  onSelected(inputData){
   // alert(inputData);
    this.inputText = [];
    // alert(inputData)
    this.route.navigate([inputData.value]);
}

isMatch(item) {
  if (item instanceof Object) {
    return Object.keys(item).some((k) => this.isMatch(item[k]));
  } else {
    return item ? item.toString().indexOf(this.filterString) > -1 : null;
  }
}


setMenuList(list) {
  let elm: any = [];
  list.forEach(element => {
    elm.push({'label': element.moduleName , 'value' : element.moduleUrl});
  });

  let unique = [...new Set(elm)];
  return unique;
}



}
