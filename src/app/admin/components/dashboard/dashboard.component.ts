import { BaseComponent, SpinnerType } from './../../../base/base.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { AlertType, AlertLocation, AlertifyService } from './../../../services/admin/alertify.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent extends BaseComponent implements OnInit {

  constructor(private alertify: AlertifyService, spinner: NgxSpinnerService) {

    super(spinner);
  }

  ngOnInit(): void {
    this.showSpinner(SpinnerType.BallSpinClockwiseFadeRotating)
  }


}
