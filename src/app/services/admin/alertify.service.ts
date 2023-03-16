import { Injectable } from '@angular/core';
declare var alertify: any;

@Injectable({
  providedIn: 'root'
})
export class AlertifyService {

  constructor() { }

  message(message: string, options: Partial<AlertifyOptions>) {
    alertify.set('notifier', 'delay', options.delay);
    alertify.set('notifier', 'position', options.location)
    var alert = alertify[options.alertType](message);

    if (options.dismissOther) {
      alert.dismissOthers();
    }
  }
  dismissAll() {
    alertify.dismissAll();

  }

}

export class AlertifyOptions {
  alertType: AlertType = AlertType.Message;
  location: AlertLocation = AlertLocation.BottomRight;
  delay: number = 5;
  dismissOther: boolean = false;
}

export enum AlertType {
  Error = "error",
  Message = "message",
  Notify = "notify",
  Success = "success",
  Warning = "warning"

}


export enum AlertLocation {
  TopRight = "top-right",
  TopCenter = "top-center",
  TopLeft = "top-left",
  BottomRight = "bottom-right",
  BottomCenter = "bottom-center",
  BottomLeft = "bottom-left"

}
