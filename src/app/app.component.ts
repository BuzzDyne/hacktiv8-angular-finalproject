import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CreatePaymentModalComponent } from './components/create-payment-modal/create-payment-modal.component';
import { DeletePaymentModalComponent } from './components/delete-payment-modal/delete-payment-modal.component';
import { EditPaymentModalComponent } from './components/edit-payment-modal/edit-payment-modal.component';
import { LoginModalComponent } from './components/login-modal/login-modal.component';
import { RegisterModalComponent } from './components/register-modal/register-modal.component';
import { Payment } from './models/Payment';
import { AuthService } from './services/auth.service';
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

  // De Facto authState for app.component
  currUserEmail: string = ""

  constructor(
    private modalService: NgbModal,
    public payService: PaymentService,
    public authService: AuthService
  ) { 
    this.refreshCurrUserEmail()
    this.refreshTable() 
    console.log(`Inside Constructor, currUserEmail is (${this.currUserEmail})`);
    
  }

  refreshTable() {
    this.payService.getAllPayments().subscribe(res => this.payments = res)
  }
  refreshCurrUserEmail() {
    this.currUserEmail = this.authService.getCurrUserEmail()
  }

  onLoginBtnClick() { 
    const modalRef = this.modalService.open(LoginModalComponent)

    modalRef.result.then(
      (res) => { //Success (closed)
        this.refreshCurrUserEmail()
        this.showToast("You are logged in!")
      }, 
      (reason) => { //Dismissed
        console.log(`Reason = ${reason}`);
      }
    )
  }
  onRegisterBtnClick() { 
    const modalRef = this.modalService.open(RegisterModalComponent)

    modalRef.result.then(
      (res) => { //Success (closed)
        this.refreshCurrUserEmail()
        this.showToast("Register successful, welcome!")
      }, 
      (reason) => { //Dismissed
        console.log(`Reason = ${reason}`);
      }
    )
  }

  onLogoutBtnClick() {
    const modalRef = this.modalService.open(DeletePaymentModalComponent)
    // modalRef.componentInstance.payID = id
    modalRef.componentInstance.title = "Logout"
    modalRef.componentInstance.body = `Are you sure to logout?`
    modalRef.componentInstance.confirmButtonText = "Yes, Logout"

    modalRef.result.then(
      (res) => { //Success (closed)
        this.authService.signOut()
        this.refreshCurrUserEmail()
        this.showToast("You are logged out!")
      }, 
      (reason) => { //Dismissed
        console.log(`Reason = ${reason}`);
      }
    )
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
  onEditBtnClick(id: number) {
    const modalRef = this.modalService.open(EditPaymentModalComponent)
    modalRef.componentInstance.payID = id

    modalRef.result.then(
      (res) => { //Success (closed)
        console.log(`Res = ${res}`);
        if(res == "onSuccess") {
          this.showToast("Data was successfully updated to server!")
          this.refreshTable()
        }
      }, 
      (reason) => { //Dismissed
        console.log(`Reason = ${reason}`);
      }
    )
  }
  onDeleteBtnClick(id: number) {
    const modalRef = this.modalService.open(DeletePaymentModalComponent)
    // modalRef.componentInstance.payID = id
    modalRef.componentInstance.title = "Delete Payment"
    modalRef.componentInstance.body = `Are you sure to delete Payment Detail of ID (${id})?`
    modalRef.componentInstance.confirmButtonText = "Delete"

    modalRef.result.then(
      (res) => { //Success (closed)
        this.payService.deletePaymentById(id).subscribe(() => this.refreshTable())
        this.showToast("Data was successfully deleted from server!")
      }, 
      (reason) => { //Dismissed
        console.log(`Reason = ${reason}`);
      }
    )
  }


  showToast(text: string) {
    this.toastText = text
    this.isToastShowing = true
  }
  onToastHidden() {
    this.isToastShowing = false
  }
}
