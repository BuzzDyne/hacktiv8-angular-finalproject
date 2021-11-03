import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-delete-payment-modal',
  templateUrl: './delete-payment-modal.component.html',
  styleUrls: ['./delete-payment-modal.component.css']
})
export class DeletePaymentModalComponent implements OnInit {
  @Input() payID: number = 0

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit(): void {
  }

}
