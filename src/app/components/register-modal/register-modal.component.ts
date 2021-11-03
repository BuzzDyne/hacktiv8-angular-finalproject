import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Register } from 'src/app/models/Auth';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register-modal',
  templateUrl: './register-modal.component.html',
  styleUrls: ['./register-modal.component.css']
})
export class RegisterModalComponent{
  submitted = false
  form: FormGroup

  postError: string[] = []

  constructor(
    public activeModal: NgbActiveModal,
    public authService: AuthService
  ) { 
    this.form = new FormGroup({
      username     : new FormControl('', [
        Validators.required
      ]),
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
    let r: Register = {
      username: this.f['username'].value,
      email   : this.f['email'].value,
      password: this.f['password'].value,
    }

    this.authService.signUp(r).subscribe(
      result => {
        console.log(result)
        this.authService.setAuthorizationToken(result['token'])
      },
      error => {
        this.postError = error.split('$')
      },
      () => this.activeModal.close("onSuccess")
    )
  }

}
