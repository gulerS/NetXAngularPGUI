import { AlertifyService, AlertLocation, AlertType } from './../../services/admin/alertify.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
  constructor(private alertify: AlertifyService) { }

  ngOnInit(): void {

   }
}

