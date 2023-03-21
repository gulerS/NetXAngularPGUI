import { AlertifyService, AlertLocation, AlertType } from './../../services/admin/alertify.service';
import { DeleteDialogComponent, DeleteState } from './../../dialogs/delete-dialog/delete-dialog.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { ProductService } from './../../services/common/models/product.service';
import { HttpClientService } from './../../services/common/http-client.service';
import { Directive, ElementRef, HostListener, Input, Output, Renderer2, EventEmitter } from '@angular/core';
import { SpinnerType } from 'src/app/base/base.component';
import { MatDialog } from '@angular/material/dialog';

declare var $: any;
@Directive({
  selector: '[appDelete]'
})
export class DeleteDirective {

  constructor(private element: ElementRef,
    private _renderer: Renderer2,
    private httpClientService: HttpClientService,
    private spinner: NgxSpinnerService,
    public dialog: MatDialog,
    private alertify: AlertifyService
  ) {

    const img = _renderer.createElement("img");
    img.setAttribute("src", "../../../../../assets/delete.png");
    img.setAttribute("style", "cursor: pointer;");
    img.width = 25;
    img.height = 25;
    _renderer.appendChild(element.nativeElement, img);

  }

  @Input() id: string;
  @Input() controller: string;
  @Output() callback: EventEmitter<any> = new EventEmitter();


  @HostListener("click")
  async onclick() {

    this.openDialog(async () => {

      this.spinner.show(SpinnerType.BallSpinClockwiseFadeRotating);
      const td: HTMLTableCellElement = this.element.nativeElement;
      await this.httpClientService.delete({
        controller:this.controller
      }, this.id).subscribe(data => {

        $(td.parentElement)
          .animate({
            opacity: 0,
            left: "+50",
            height: "toggle"
          }, 700, () => {
            this.callback.emit();
            this.alertify.message("Deleted Successfully", {
              dismissOther:true,
              alertType:AlertType.Success,
              location:AlertLocation.BottomRight
            });
          })

      }, (errorResponse) => {
        this.spinner.hide(SpinnerType.BallSpinClockwiseFadeRotating);
        this.alertify.message("An Error occurred", {
          dismissOther: true,
          alertType: AlertType.Error,
          location: AlertLocation.BottomRight
        });

      });
    })



  }

  openDialog(afterClose: any): void {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      data: DeleteState.Yes,
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result == DeleteState.Yes) {
        afterClose();
      }
    });
  }

}
