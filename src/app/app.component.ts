import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CreatePaymentModalComponent } from './components/create-payment-modal/create-payment-modal.component';
import { Payment } from './models/Payment';
import { PaymentService } from './services/payment.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  payments: Payment[] = []

  toastText: string = ""
  isToastShowing: boolean = false
  constructor(
    private modalService: NgbModal,
    public payService: PaymentService
  ) { this.refreshTable() }

  refreshTable() {
    this.payService.getAllPayments().subscribe(res => this.payments = res)
  }

  onAddButtonClick() {
    const modalRef = this.modalService.open(CreatePaymentModalComponent).result.then(
      (res) => { //Success (closed)
        console.log(`Res = ${res}`);
        if(res == "onSuccess") {
          // TODO 1 
          // this.modalService.open(CreateUserModalComponent)
          this.showToast("Data was successfully sent to server!")
          this.refreshTable()
        }
      }, 
      (reason) => { //Dismissed
        console.log(`Reason = ${reason}`);
      }
    )
  }

  onDeleteBtnClick(id: number) {

  }


  showToast(text: string) {
    this.toastText = text
    this.isToastShowing = true
  }
  onToastHidden() {
    this.isToastShowing = false
  }
}
