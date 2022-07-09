import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';
 @Pipe({ name: 'dateFormat' }) 
 export class DateFormat implements PipeTransform {
    transform(value:any, args:string[]):any { 
    if(value!=undefined){
      return moment(value).utcOffset("+07:00").format("DD-MM-YYYY");
 
    } else{
      return "";
    }
  
}
  }
