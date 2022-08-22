import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-alert-control',
  templateUrl: './alert-control.component.html',
  styleUrls: ['./alert-control.component.css']
})
export class AlertControlComponent implements OnInit {

  mensaje = '';
  constructor(
    public bsModalRef: BsModalRef,    
  ) { }

  ngOnInit(): void {
    this.bsModalRef.onHidden.subscribe(() => {      })
  }

  aceptar() {
    this.bsModalRef.hide();
  }

}
