import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-delete-payment-modal',
  templateUrl: './delete-payment-modal.component.html',
  styleUrls: ['./delete-payment-modal.component.css']
})
export class DeletePaymentModalComponent {
  @Input() title: string = ""
  @Input() body: string = ""
  @Input() confirmButtonText: string = ""

  constructor(public activeModal: NgbActiveModal) { }
}
