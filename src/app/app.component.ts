import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Payment } from './models/Payment';
import { PaymentService } from './services/payment.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  payments: Payment[] = []

  constructor(
    private modalService: NgbModal,
    public payService: PaymentService
  ) { this.refreshTable() }

  refreshTable() {
    this.payService.getAllPayments().subscribe(res => this.payments = res)
  }
}
