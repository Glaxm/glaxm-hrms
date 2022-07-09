import { Injectable } from '@angular/core';
import { ToastType, Toaster } from 'ngx-toast-notifications';

@Injectable({
  providedIn: 'root'
})
export class ToastrService {

  constructor(private toaster: Toaster) { }

  // private types: Array<ToastType> = ['success', 'danger', 'warning', 'info', 'primary', 'secondary', 'dark', 'light'];
  // private text = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt...';
  
  // get randomType() {
  //   return this.types[Math.ceil((Math.random() * 8)) % this.types.length];
  // }

  showToast(t:any,txt:any) {
    const type = t;
    this.toaster.open({
      text: txt,
      //caption: type + ' notification',
      position:"top-right",
      duration:5000,
      type: type,
    });
  }

  showToastCenter(t:any,txt:any) {
    const type = t;
    this.toaster.open({
      text: txt,
      //caption: type + ' notification',
      position:"top-center",
      duration:5000,
      type: type,
    });
  }

  showToastLongMsg(t:any,txt:any) {
    const type = t;
    this.toaster.open({
      text: txt,
      //caption: type + ' notification',
      position:"top-right",
      duration:10000,
      type: type,
    });
  }


}
