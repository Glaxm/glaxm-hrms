import {
  Component,
  ChangeDetectionStrategy,
  ViewChild,
  TemplateRef,
} from '@angular/core';
import {
  startOfDay,
  endOfDay,
  subDays,
  addDays,
  endOfMonth,
  isSameDay,
  isSameMonth,
  addHours,
} from 'date-fns';
import { DatePipe } from '@angular/common';
import { Subject } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {
  CalendarEvent,
  CalendarEventAction,
  CalendarEventTimesChangedEvent,
  CalendarView,
} from 'angular-calendar';
import { Router } from '@angular/router';
import { DashboardService } from 'src/app/views/services/dashboard.service';
import { ModalService } from '../_modal/modal.service';

const colors: any = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3',
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF',
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA',
  },
  orange:{
    primary: '#ff5722',
    secondary: '#ff980030',
  },
  green:{
    primary: '#00963c',
    secondary: '#0080002b',
  },
  leave:{
    primary: '#fff',
    secondary: '#b94a48',
  },
  black:{
    primary: '#333',
    secondary: '#fff',
  },
  purple:{
    primary:'#800080',
    secondart:'#BB29BB'
  }

};






@Component({
  selector: 'app-calendar-view',
  templateUrl: './calendar-view.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: [
    `
      h3 {
        margin: 0 0 10px;
      }

      pre {
        background-color: #f5f5f5;
        padding: 15px;
      }
    `,
  ],
})
export class CalendarViewComponent  {
  // -----------------
    @ViewChild('modalContent', { static: true }) modalContent: TemplateRef<any>;
  
    view: CalendarView = CalendarView.Month;
    calendarEvent: CalendarEvent;
    CalendarView = CalendarView;
    startDate: Date = new Date();
    endDate: Date = new Date();
    viewDate: Date = new Date();
    pipe = new DatePipe('en-US');
    modalData: {
      action: string;
      event: CalendarEvent;
    };
   
    // actions: CalendarEventAction[] = [
    //   {
    //     label: 'Edit',
    //     a11yLabel: 'Edit',
    //     onClick: ({ event }: { event: CalendarEvent }): void => {
    //       this.handleEvent('Edited', event);
    //     },
    //   },
    //   {
    //     label: 'Delete',
    //     a11yLabel: 'Delete',
    //     onClick: ({ event }: { event: CalendarEvent }): void => {
    //       this.events = this.events.filter((iEvent) => iEvent !== event);
    //       this.handleEvent('Deleted', event);
    //     },
    //   },
    // ];
  
    refresh = new Subject<void>();
  
    datalist:any=[];
    
    events: CalendarEvent[] = [];
    
    // = [
    //   {
    //     start: subDays(startOfDay(new Date()), 1),
    //     end: addDays(new Date(), 1),
    //     title: 'A 3 day event',
    //     meta: "Present",
    //     color: colors.red
    //   }];
      
      // {
      //   start: startOfDay(new Date()),
      //   title: 'An event with no end date',
      //   color: colors.red,
      //   meta:'Present',
      //   // actions: this.actions,
      // },
      // {
      //   start: subDays(endOfMonth(new Date()), 3),
      //   end: addDays(endOfMonth(new Date()), 3),
      //   title: 'A long event that spans 2 months',
      //   color: colors.red,
      //   allDay: false,
      //   meta:'Absent',
      // }
      // {
      //   start: addHours(startOfDay(new Date()), 2),
      //   end: addHours(new Date(), 2),
      //   title: 'A draggable and resizable event',
      //   color: colors.yellow,
      //   // actions: this.actions,
      //   resizable: {
      //     beforeStart: true,
      //     afterEnd: true,
      //   },
      //   draggable: true,
      //   meta:'Present',
      // },
    // ];
    hideLoader:boolean = true;
  employee_id:any[]=[];
    activeDayIsOpen: boolean = false;
    tempList:any=[];
    eventMnth: any;
    employeeInfo:any;
    constructor(private modalService: ModalService,private modal: NgbModal, private router:Router,private dashboardService:DashboardService) {
      this.setView(CalendarView.Month);
      this.employeeInfo= JSON.parse(sessionStorage.getItem("empinfo"));
      this.employee_id.push(this.employeeInfo.data.employeeId);
      console.log(this.employee_id);
      // setTimeout(() => {
      //   $('#content').css('display','block');
      //    this.hideLoader = false;
      // }, 30000);
     console.log(this.hideLoader);
    }
    ngOnInit() {
      this.listEvents(this.viewDate);
    }
    listEvents(EventMonth)
    {
      
       console.log(EventMonth);
       var firstDay = new Date(EventMonth.getFullYear(), EventMonth.getMonth(), 1);
       var lastDay = new Date(EventMonth.getFullYear(), EventMonth.getMonth() + 1, 0);
      //  this.startDate = new Date(this.pipe.transform(firstDay, 'dd-MMMM-y'));
       var firstDate = this.pipe.transform(firstDay, 'dd-MMM-y');
       var endDate = this.pipe.transform(lastDay, 'dd-MMM-y');
      
      //  this.eventMnth = new Date(this.pipe.transform(EventMonth, 'MMMM'));
      this.dashboardService.getEmpAttendance(this.employee_id,firstDate,endDate).subscribe(success=>{
        // alert(JSON.stringify(success));
        
        this.datalist = success;
        console.log(this.datalist);
        this.events = [];
        this.datalist.forEach(element => {
          this.viewDate = new Date(this.pipe.transform(element.dateAttendance, 'E MMM d y h:mm:ss a zzzz'));
          
          
          if(element.status=="Present")
          {
            var color = colors.black;
           
          }
          else if(element.status=="Weekly Off")
          {
            var color = colors.green;
          }
          else if(element.status=="Leave")
          {
            var color = colors.blue;
          }
          else if(element.status=="Absent")
          {
            var color = colors.red;
          }
          else if(element.status=="Iomiss")
          {
            var color = colors.red;
          }
          else if(element.status=="Holiday")
          {
            var color = colors.blue;
          }
          else if(element.status=="shortfall")
          {
            var color = colors.purple;
          }
          else
          {
            var color = colors.yellow;
          }
          this.events.push({'start': this.viewDate , 
          // 'end' : addDays(new Date(), 1), 
          'title':element.status,
          'meta': element.status,
          'color': color});
        });
        console.log(this.events);
        this.refresh.next();
        // console.log(this.CalendarView);
        // if(success){
        //   this.datalist.forEach((ele,i) => {
        //     this.tempList[i]={
        //       start: subDays(startOfDay(new Date()), 1),
        //       end: addDays(new Date(), 1),
        //       title: 'A 3 day event',
        //       meta: ele.status,
        //       color: colors.red
        //     };
        //   });
        //   this.events = this.tempList;
         
        // }
    })
    }
    // dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    //   if (isSameMonth(date, this.viewDate)) {
    //     if (
    //       (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
    //       events.length === 0
    //     ) {
    //       this.activeDayIsOpen = false;
    //     } else {
    //       this.activeDayIsOpen = true;
    //     }
    //     this.viewDate = date;
    //   }
    // }
  
    eventTimesChanged({
      event,
      newStart,
      newEnd,
    }: CalendarEventTimesChangedEvent): void {
      this.events = this.events.map((iEvent) => {
        if (iEvent === event) {
          return {
            ...event,
            start: newStart,
            end: newEnd,
          };
        }
        return iEvent;
      });
      this.handleEvent('Dropped or resized', event);
    }
  
    handleEvent(action: string, event: CalendarEvent): void {
      this.modalData = { event, action };
      this.modal.open(this.modalContent, { size: 'lg' });
    }
  
    addEvent(): void {
      this.events = [
        ...this.events,
        {
          title: 'New event',
          start: startOfDay(new Date()),
          end: endOfDay(new Date()),
          color: colors.red,
          draggable: true,
          resizable: {
            beforeStart: true,
            afterEnd: true,
          },
        },
      ];
    }
  
    deleteEvent(eventToDelete: CalendarEvent) {
      this.events = this.events.filter((event) => event !== eventToDelete);
    }
  
    setView(view: CalendarView) {
      this.view = view;
    }
  
    closeOpenMonthViewDay() {
      console.log(this.viewDate);
      this.listEvents(this.viewDate);
      this.activeDayIsOpen = false;
    }

    
    back(){
      this.router.navigate(['/views/report/emp-attendance-report']);
    }

    stdate:any;
    calendarDayEvent(data){
      
      this.stdate = data.start;
      if(data.title=="IOMiss" || data.title=="Absent"){
        this.modalService.open('custom-modal-1');
      }
    }

    closeModal(id:string){
        this.modalService.close(id);
    }

    redirectPage(id){
      
      this.modalService.close('custom-modal-1');
      if(id=="ARF"){
        this.router.navigate(['views/report/emp-attendance-report'], { queryParams: { redirectfromdashboard: 'Y', startdate:this.stdate} });
      } else{
        this.router.navigate(['views/approval-flow/approvalrequest/add-request'], { queryParams: { redirectfromdashboard: 'Y'} });
        // this.router.navigateByUrl('/views/approval-flow/approvalrequest/add-request');
      }
    }

    closeFun(){
      this.modalService.close('custom-modal-1');
    }   

    // list:any =[{attendance:'Present'},{attendance:'Present'},{attendance:'Present'},{attendance:'Present'},{attendance:'Present'}]


  // ------------------



}

