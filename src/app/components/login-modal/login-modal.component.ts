import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, ValidatorFn, ValidationErrors, AbstractControl, FormBuilder } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Login, AuthResponse } from 'src/app/models/Auth';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-login-modal',
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.css']
})
export class LoginModalComponent{
  submitted = false
  form: FormGroup

  postError: string = ""

  constructor(
    public activeModal: NgbActiveModal,
    public authService: AuthService
  ) { 
    this.form = new FormGroup({
      email     : new FormControl('', [
        Validators.required, 
        Validators.email
      ]),
      password  : new FormControl('', [
        Validators.required
      ])
    })
  }

  get f() {return this.form.controls}

  onSubmit() {
    this.submitted = true

    if(this.form.invalid) {
      return 
    }

    // POST
    let l: Login = {
      email   : this.f['email'].value,
      password: this.f['password'].value
    }

    this.authService.signIn(l).subscribe(
      result => {
        console.log(result)
        this.authService.setAuthorizationToken(result['token'])
      },
      error => this.postError = error,
      () => this.activeModal.close("onSuccess")
    )
  }

}
