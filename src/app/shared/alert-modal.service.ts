
import { AlertModalComponent } from 'src/app/shared/alert-modal/alert-modal.component';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Injectable } from '@angular/core';
import { ConfirmModalComponent } from './confirm-modal/confirm-modal.component';

export enum AlertTypes {
  DANGER = 'danger',
  SUCCESS = 'success'
}

@Injectable({
  providedIn: 'root'
})
export class AlertModalService {

  constructor(private modalService: BsModalService) { }

private showAlert(message: string, typo: AlertTypes, dismissTimout?: number) {
  const bsModalRef: BsModalRef = this.modalService.show(AlertModalComponent);
  bsModalRef.content.type = typo;
  bsModalRef.content.message = message;

  if (dismissTimout) {
     setTimeout(() => bsModalRef.hide(), dismissTimout);
  }
}
  shoAlertDanger(message: string) {
     this.showAlert(message, AlertTypes.DANGER);
  }
  shoAlertSuccess(message: string) {
    this.showAlert(message, AlertTypes.SUCCESS, 3000);
}
  showConfirm(title: string, msg: string, okTxt?: string, cancelTxt?: string) {
    const bsModalRef: BsModalRef = this.modalService.show(ConfirmModalComponent);
    bsModalRef.content.title = title;
    bsModalRef.content.msg = msg;

    if (okTxt) {
      bsModalRef.content.okTxt = okTxt;
    }
    if (cancelTxt) {
      bsModalRef.content.cancelTxt = cancelTxt;
    }
    return ( bsModalRef.content as ConfirmModalComponent).confirmResult;
  }
}
