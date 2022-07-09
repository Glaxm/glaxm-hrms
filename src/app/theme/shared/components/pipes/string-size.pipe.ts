import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'stringSize'
})
export class StringSizePipe implements PipeTransform {

  transform(value: any, size: number): any {
    // if(value.length >=size+5){
    //      return value.substring(0,size) +"..."; ;
    // }else{
       return value;
    // }
    
  }

}
