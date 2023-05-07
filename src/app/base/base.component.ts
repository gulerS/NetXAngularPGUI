import { NgxSpinnerService } from 'ngx-spinner';
import { Component } from '@angular/core';

export class BaseComponent {

  constructor(private spinner: NgxSpinnerService) { }
  showSpinner(type: SpinnerType) {
    this.spinner.show(type)

    // setTimeout(() => {
    //   this.hideSpinner(SpinnerType.BallSpinClockwiseFadeRotating)
    // }, 1000);
  }


  hideSpinner(type: SpinnerType) {
    this.spinner.hide(type)
  }

}

export enum SpinnerType {
  BallSpinClockwiseFadeRotating = "spinner1",
  BallScale = "spinner2",
  BallAtom = "spinner3"
}
