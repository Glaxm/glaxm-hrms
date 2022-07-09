import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { Router } from '@angular/router';
import {NextConfig} from '../../../../app-config';
import { NavigationItem } from '../navigation/navigation';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {
  public nextConfig: any;
  public menuClass: boolean;
  public collapseStyle: string;
  public windowWidth: number;

  @Output() onNavCollapse = new EventEmitter();
  @Output() onNavHeaderMobCollapse = new EventEmitter();

  inputText:any;

  constructor(private route:Router,public navItem:NavigationItem) {
    this.nextConfig = NextConfig.config;
    this.menuClass = false;
    this.collapseStyle = 'none';
    this.windowWidth = window.innerWidth;
  }

  ngOnInit() { 
    this.moduleList = JSON.parse(sessionStorage.getItem("moduleList"));
    // alert(JSON.stringify(this.moduleList))
    this.menubarList = this.setMenuList(this.moduleList);
    // alert(JSON.stringify(this.menubarList));

  }

  toggleMobOption() {
    this.menuClass = !this.menuClass;
    this.collapseStyle = (this.menuClass) ? 'block' : 'none';
    
  }

  navCollapse() {
    if (this.windowWidth >= 992) {
      this.onNavCollapse.emit();
    } else {
      this.onNavHeaderMobCollapse.emit();
    }
  }

  moduleList:any=[];
  menubarList:any=[];
  filterString = "";
  presentUrlString:any;
  onSelected(inputData){
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
