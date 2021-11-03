import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Payment, PaymentCreate } from 'src/app/models/Payment';
import { PaymentService } from 'src/app/services/payment.service';

@Component({
  selector: 'app-edit-payment-modal',
  templateUrl: './edit-payment-modal.component.html',
  styleUrls: ['./edit-payment-modal.component.css']
})
export class EditPaymentModalComponent implements OnInit {
  @Input() payID: number = 0

  submitted = false
  form: FormGroup

  constructor(
      public activeModal: NgbActiveModal,
      public payService: PaymentService 
    ) { 
      this.form = new FormGroup({
        OwnerName       : new FormControl('', [Validators.required]),
        CardNumber      : new FormControl('', [
          Validators.required, 
          Validators.minLength(16),
          Validators.pattern('^[0-9]+')
        ]),
        SecurityCode    : new FormControl('', [
          Validators.required,
          Validators.minLength(3),
          Validators.pattern('^[0-9]+')
        ]),  
        expMonth        : new FormControl('', [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(2),
          Validators.pattern('^[0-9]+')
        ]),
        expYear         : new FormControl('', [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(2),
          Validators.pattern('^[0-9]+')
        ])
    })
  }

  ngOnInit() {
    console.log(this.payID);
    
    this.payService.getPaymentById(this.payID)
      .subscribe(res => {
        let expDate = new Date(res.expirationDate)

        let expM = expDate.getUTCMonth() + 1
        let expY = expDate.getUTCFullYear()

        let strM = ''

        if(expM < 10) {
          strM = `0${expM}`
        } else {
          strM = `${expM}`
        } 
        let strY = expY.toString().slice(2)

        // console.log(`expM: ${expM}\nexpY: ${expY}`);
        // console.log(`strM: ${strM}\nstrY: ${strY}`);
        

        this.f['OwnerName'].setValue(res.cardOwnerName)
        this.f['CardNumber'].setValue(res.cardNumber)
        this.f['SecurityCode'].setValue(res.securityCode)
        this.f['expMonth'].setValue(strM)
        this.f['expYear'].setValue(strY)
      })
  }

  get f() {return this.form.controls}

  onSubmit() {
    this.submitted = true

    if(this.form.invalid) {
      return 
    }

    //POST
    let expY: number = +`20${this.f['expYear'].value}`
    let expM: number = this.f['expMonth'].value

    console.log(`expYear: ${this.f['expYear'].value}}, expY: ${expY}`);
    console.log(`expMonth: ${this.f['expMonth'].value}}, expM: ${expM}`);
    

    let p: Payment = {
      cardOwnerName: this.f['OwnerName'].value,
      cardNumber: this.f['CardNumber'].value,
      expirationDate: new Date(expY, expM),
      securityCode: this.f['SecurityCode'].value,
      id: this.payID,
      sumOfPayment: 0
    }

    this.payService.updatePayment(this.payID, p).subscribe(
      result => console.log(result),
      error => {},
      () => this.activeModal.close("onSuccess")
    )
  }
}
