import {Injectable} from '@angular/core';
import { Router } from '@angular/router';

export interface NavigationItem {
  id: string;
  title: string;
  type: 'item' | 'collapse' | 'group';
  translate?: string;
  icon?: string;
  hidden?: boolean;
  url?: string;
  classes?: string;
  exactMatch?: boolean;
  external?: boolean;
  target?: boolean;
  breadcrumbs?: boolean;
  function?: any;
  badge?: {
    title?: string;
    type?: string;
  };
  children?: Navigation[];
}

export interface Navigation extends NavigationItem {
  children?: NavigationItem[];
}

// const NavigationItems = null;
// declare var NavigationItems;
// const test=[
//   {
//     id: 'navigation',
//     title: 'Navigation',
//     type: 'group',
//     icon: 'feather icon-monitor',
//     children: [
//       {
//         id: 'dashboard',
//         title: 'Dashboard',
//         type: 'item',
//         url: '/dashboard/analytics',
//         icon: 'feather icon-home'
//       }
//     ]
//   },
//   {
//     id: 'project-mangement',
//     title: 'Project Mangement',
//     type: 'group',
//     icon: 'feather icon-layers',
//     children: [
//       {
//         id: 'uam',
//         title: 'User Management',
//         type: 'collapse',
//         icon: 'feather icon-box',
//         children: [
//           {
//             id: 'user',
//             title: 'User',
//             type: 'item',
//             url: '/views/user/user-summary'
//           },
//           {
//             id: 'role',
//             title: 'Role',
//             type: 'item',
//             url: '/views/role/role-summary'
//           },
//           {
//             id: 'module',
//             title: 'Module',
//             type: 'item',
//             url: '/views/module/module-summary'
//           }
//         ]
//       }
//     ]
//   },
//   {
//     id: 'masters',
//     title: 'Masters',
//     type: 'group',
//     icon: 'feather icon-layers',
//     children: [
//       {
//         id: 'masters',
//         title: 'Masters',
//         type: 'collapse',
//         icon: 'feather icon-box',
//         children: [
//           {
//             id: 'dept',
//             title: 'Department',
//             type: 'item',
//             url: '/views/masters/dept/dept-summary'
//           },
//           {
//             id: 'employee',
//             title: 'Employee',
//             type: 'item',
//             url: '/views/masters/employee'
//           }
//         ]
//       },
//     ]
//   },
//   {
//     id: 'Reports',
//     title: 'Reports',
//     type: 'group',
//     icon: 'feather icon-layers',
//     children: [
//       {
//         id: 'reports',
//         title: 'Reports',
//         type: 'collapse',
//         icon: 'feather icon-box',
//         children: [
//           {
//             id: 'employee-report',
//             title: 'Employee Report',
//             type: 'item',
//             url: '/views/reports/employee-report'
//           }
//         ]
//       },
//     ]
//   },
 
  // {
  //   id: 'ui-element',
  //   title: 'UI ELEMENT & FORMS',
  //   type: 'group',
  //   icon: 'feather icon-layers',
  //   children: [
  //     {
  //       id: 'basic',
  //       title: 'Basic',
  //       type: 'collapse',
  //       icon: 'feather icon-box',
  //       children: [
  //         {
  //           id: 'alert',
  //           title: 'Alert',
  //           type: 'item',
  //           url: '/basic/alert'
  //         },
  //         {
  //           id: 'button',
  //           title: 'Button',
  //           type: 'item',
  //           url: '/basic/button'
  //         },
  //         {
  //           id: 'badges',
  //           title: 'Badges',
  //           type: 'item',
  //           url: '/basic/badges'
  //         },
  //         {
  //           id: 'breadcrumb-pagination',
  //           title: 'Breadcrumbs & Pagination',
  //           type: 'item',
  //           url: '/basic/breadcrumb-paging'
  //         },
  //         {
  //           id: 'cards',
  //           title: 'Cards',
  //           type: 'item',
  //           url: '/basic/cards'
  //         },
  //         {
  //           id: 'collapse',
  //           title: 'Collapse',
  //           type: 'item',
  //           url: '/basic/collapse'
  //         },
  //         {
  //           id: 'carousel',
  //           title: 'Carousel',
  //           type: 'item',
  //           url: '/basic/carousel'
  //         },
  //         {
  //           id: 'grid-system',
  //           title: 'Grid System',
  //           type: 'item',
  //           url: '/basic/grid-system'
  //         },
  //         {
  //           id: 'progress',
  //           title: 'Progress',
  //           type: 'item',
  //           url: '/basic/progress'
  //         },
  //         {
  //           id: 'modal',
  //           title: 'Modal',
  //           type: 'item',
  //           url: '/basic/modal'
  //         },
  //         {
  //           id: 'spinner',
  //           title: 'Spinner',
  //           type: 'item',
  //           url: '/basic/spinner'
  //         },
  //         {
  //           id: 'tabs-pills',
  //           title: 'Tabs & Pills',
  //           type: 'item',
  //           url: '/basic/tabs-pills'
  //         },
  //         {
  //           id: 'typography',
  //           title: 'Typography',
  //           type: 'item',
  //           url: '/basic/typography'
  //         },
  //         {
  //           id: 'tooltip-popovers',
  //           title: 'Tooltip & Popovers',
  //           type: 'item',
  //           url: '/basic/tooltip-popovers'
  //         },
  //         {
  //           id: 'other',
  //           title: 'Other',
  //           type: 'item',
  //           url: '/basic/other'
  //         }
  //       ]
  //     },
  //     {
  //       id: 'forms-element',
  //       title: 'Form Elements',
  //       type: 'item',
  //       url: '/forms/basic',
  //       icon: 'feather icon-file-text'
  //     }
  //   ]
  // },
  // {
  //   id: 'table',
  //   title: 'Table & Charts',
  //   type: 'group',
  //   icon: 'feather icon-list',
  //   children: [
  //     {
  //       id: 'bootstrap',
  //       title: 'Bootstrap Table',
  //       type: 'item',
  //       url: '/tbl-bootstrap/bt-basic',
  //       icon: 'feather icon-server'
  //     },
  //     {
  //       id: 'apex',
  //       title: 'Apex Chart',
  //       type: 'item',
  //       url: '/charts/apex',
  //       icon: 'feather icon-pie-chart'
  //     }
  //   ]
  // },
  // {
  //   id: 'pages',
  //   title: 'Pages',
  //   type: 'group',
  //   icon: 'feather icon-file-text',
  //   children: [
  //     {
  //       id: 'auth',
  //       title: 'Authentication',
  //       type: 'collapse',
  //       icon: 'feather icon-lock',
  //       children: [
  //         {
  //           id: 'signup',
  //           title: 'Sign up',
  //           type: 'item',
  //           url: '/auth/signup',
  //           target: true,
  //           breadcrumbs: false
  //         },
  //         {
  //           id: 'signin',
  //           title: 'Sign in',
  //           type: 'item',
  //           url: '/auth/signin',
  //           target: true,
  //           breadcrumbs: false
  //         },
  //         {
  //           id: 'reset-password',
  //           title: 'Reset Password',
  //           type: 'item',
  //           url: '/auth/reset-password',
  //           target: true,
  //           breadcrumbs: false
  //         },
  //         {
  //           id: 'change-password',
  //           title: 'Change Password',
  //           type: 'item',
  //           url: '/auth/change-password',
  //           target: true,
  //           breadcrumbs: false
  //         }
  //       ]
  //     },
  //     {
  //       id: 'maintenance',
  //       title: 'Maintenance',
  //       type: 'collapse',
  //       icon: 'feather icon-sliders',
  //       children: [
  //         {
  //           id: 'error',
  //           title: 'Error',
  //           type: 'item',
  //           url: '/maintenance/error',
  //           target: true,
  //           breadcrumbs: false
  //         },
  //         {
  //           id: 'coming-soon',
  //           title: 'Maintenance',
  //           type: 'item',
  //           url: '/maintenance/coming-soon',
  //           target: true,
  //           breadcrumbs: false
  //         }
  //       ]
  //     }
  //   ]
  // },
  // {
  //   id: 'other',
  //   title: 'Other',
  //   type: 'group',
  //   icon: 'feather icon-align-left',
  //   children: [
  //     {
  //       id: 'menu-level',
  //       title: 'Menu Levels',
  //       type: 'collapse',
  //       icon: 'feather icon-menu',
  //       children: [
  //         {
  //           id: 'menu-level-2.1',
  //           title: 'Menu Level 2.1',
  //           type: 'item',
  //           url: 'javascript:',
  //           external: true
  //         },
  //         {
  //           id: 'menu-level-2.2',
  //           title: 'Menu Level 2.2',
  //           type: 'collapse',
  //           children: [
  //             {
  //               id: 'menu-level-2.2.1',
  //               title: 'Menu Level 2.2.1',
  //               type: 'item',
  //               url: 'javascript:',
  //               external: true
  //             },
  //             {
  //               id: 'menu-level-2.2.2',
  //               title: 'Menu Level 2.2.2',
  //               type: 'item',
  //               url: 'javascript:',
  //               external: true
  //             }
  //           ]
  //         }
  //       ]
  //     },
  //     {
  //       id: 'disabled-menu',
  //       title: 'Disabled Menu',
  //       type: 'item',
  //       url: 'javascript:',
  //       classes: 'nav-item disabled',
  //       icon: 'feather icon-power',
  //       external: true
  //     },
  //     {
  //       id: 'sample-page',
  //       title: 'Sample Page',
  //       type: 'item',
  //       url: '/sample-page',
  //       classes: 'nav-item',
  //       icon: 'feather icon-sidebar'
  //     }
  //   ]
  // }
//];

@Injectable()
export class NavigationItem {
  moduleList:any = [];

  groupList:any=[];
  NavigationItems: any;
  constructor(private router:Router){
    var list = JSON.parse(sessionStorage.getItem("moduleList"));
    this.setMenuData(list);  
  }


  setMenuData(list){
    
    this.moduleList = list;//JSON.parse(sessionStorage.getItem("moduleList"));
    var index:number = 0;
    var insert:number = 0;
    var isPresent:boolean=false;
    
    // window.location.reload();
console.log(JSON.stringify(this.moduleList));
this.NavigationItems = [];
// this.groupList=[];
// alert(JSON.stringify(this.groupList))
    this.groupList.push(
      // {
      //     id: 'navigation',
      //     title: 'Navigation',
      //     type: 'group',
      //     icon: 'feather icon-monitor',
      //     children: [
      //       {
      //         id: 'dashboard',
      //         title: 'Dashboard',
      //         type: 'item',
      //         url: '/dashboard/analytics',
      //         icon: 'feather icon-home'
      //       }
      //     ]
      //   }

        {
    id: 'navigation',
    title: 'Navigation',
    type: 'group',
    icon: 'feather icon-monitor',
    children: [
      {
        id: 'dashboard',
        title: 'Dashboard',
        type: 'collapse',
        icon: 'feather icon-box',
        children: [
          {
            id: 'dashboardchart',
            title: 'Dashboard',
            type: 'item',
            url: '/dashboard/analytics'
          },
          {
            id: 'organizationchart',
            title: 'Organization Chart',
            type: 'item',
            url: '/dashboard/org-chart'
          }
        ]
      }
    ]
  }
        
        );
    if(this.moduleList){
    for(var i=0;i<this.moduleList.length;i++){
      for(var j=0;j<this.groupList.length;j++){
        if(this.groupList[j].title==this.moduleList[i].moduleGroup){
            index = i;
            insert=j;
            isPresent=true;
            break;    
        } else{
          isPresent=false;
        }    
      }
      if(isPresent){
        this.groupList[insert].children[0].children.push({
          id: this.moduleList[index].moduleCode,
          title: this.moduleList[index].moduleName,
          type: 'item',
          url: this.moduleList[index].moduleUrl  
        });
       //}
      isPresent=false;
      } else{
      this.groupList.push({
          id:this.moduleList[i].moduleId,
          title: this.moduleList[i].moduleGroup,
          type: 'group',
          icon: 'feather icon-layers',
          children:[{
            id:this.moduleList[i].moduleGroup,
            title:this.moduleList[i].moduleGroup,
            type: 'collapse',
            icon: this.setIcon(this.moduleList[i].moduleGroup),//this.moduleList[i].moduleGroup=='Admin Settings' ? 'feather icon-settings' : 'feather icon-box',
            children:[{
                id: this.moduleList[i].moduleCode,
                title: this.moduleList[i].moduleName,
                type: 'item',
                url: this.moduleList[i].moduleUrl
              }]
          }]
        });
      }
    }
  } else{ this.router.navigate(['/login']);}

  // alert("AFTER==========="+JSON.stringify(this.groupList))
  this.NavigationItems = this.groupList.length > 0 ? this.groupList: [];        //alert(JSON.stringify(this.groupList));

       
  }


  public get() {
    return this.NavigationItems;
  }

  setIcon(module){
    if(module=='Admin Settings'){
      return 'feather icon-settings'
    } 
    else if(module=='Approvals'){
      return 'feather icon-users'
    } 
    else if(module=='Asset'){
      return 'feather icon-grid'
    } 
    else if(module=='Employee Profile'){
      return 'feather icon-user'
    } 
    else if(module=='Employee Master'){
      return 'feather icon-user-plus'
    }
    else if(module=='Report'){
      return 'feather icon-book'
    }
    else if(module=='Shift Management'){
      return 'feather icon-activity'
    }
    else if(module=='Transactions'){
      return 'feather icon-airplay'
    }
    else if(module=='Payroll'){
      return 'feather icon-clipboard'
    }
    else if(module=='Leave Management'){
      return 'feather icon-calendar'
    }
    else if(module=='Loan Management'){
      return 'feather icon-list'
    }
    
    
    else{
      return 'feather icon-box';
    }
  }

}
