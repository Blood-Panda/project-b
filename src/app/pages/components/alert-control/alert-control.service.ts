import { Injectable } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { AlertControlComponent } from './alert-control.component';

@Injectable({
  providedIn: 'root'
})
export class AlertControlService {
  constructor( 
    private modalService: BsModalService,
    //private orientacionService: OrientacionService,
  ){  }

  show(msg: string, tipo: number = 1) {    
    const initialState: any = {      
      mensaje: msg,
      tipo      
    };
    const modal = this.modalService.show(
      AlertControlComponent,
      {        
        class: `modal-dialog-centered modal-width-500`,
        animated: true,
        initialState,
        ignoreBackdropClick: true,
      },
    );    
    //this.orientacionService.modal = modal;
  }
}
