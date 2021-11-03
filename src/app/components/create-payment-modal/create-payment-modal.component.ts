import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, ValidatorFn, ValidationErrors, AbstractControl, FormBuilder } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { PaymentCreate } from 'src/app/models/Payment';
import { PaymentService } from 'src/app/services/payment.service';

@Component({
  selector: 'app-create-payment-modal',
  templateUrl: './create-payment-modal.component.html',
  styleUrls: ['./create-payment-modal.component.css']
})
export class CreatePaymentModalComponent {
  submitted = false
  form: FormGroup
  postError: string = ''

  constructor(
    public activeModal: NgbActiveModal, 
    private fb: FormBuilder,
    public payService: PaymentService
    ) { 
    // this.form = this.fb.group({
    //   OwnerName       : new FormControl('', [Validators.required]),
    //   CardNumber      : new FormControl('', [
    //     Validators.required, 
    //     Validators.minLength(16),
    //     Validators.pattern('/^[0-9]+$/')
    //   ]),
    //   SecurityCode    : new FormControl('', [
    //     Validators.required,
    //     Validators.minLength(3),
    //     Validators.pattern('/^[0-9]+$/')
    //   ]),  
    //   expMonth        : new FormControl('', [Validators.required]),
    //   expYear         : new FormControl('', [Validators.required])
    // })

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
          Validators.pattern('^[0-9]+')
        ]),
        expYear         : new FormControl('', [
          Validators.required,
          Validators.minLength(2),
          Validators.pattern('^[0-9]+')
        ])
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
    let expM: number = +this.f['expMonth'].value

    console.log(`exp Y = ${expY}`);
    console.log(`exp M = ${expM}`);
    

    let p: PaymentCreate = {
      cardOwnerName: this.f['OwnerName'].value,
      cardNumber: this.f['CardNumber'].value,
      expirationDate: new Date(expY,expM),
      securityCode: this.f['SecurityCode'].value
    }

    this.payService.createPayment(p).subscribe(
      result => console.log(result),
      error => this.postError = error,
      () => this.activeModal.close("onSuccess")
    )
  }

}
