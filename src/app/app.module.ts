import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CreatePaymentModalComponent } from './components/create-payment-modal/create-payment-modal.component';
import { DeletePaymentModalComponent } from './components/delete-payment-modal/delete-payment-modal.component';
import { EditPaymentModalComponent } from './components/edit-payment-modal/edit-payment-modal.component';
import { LoginModalComponent } from './components/login-modal/login-modal.component';
import { RegisterModalComponent } from './components/register-modal/register-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    CreatePaymentModalComponent,
    DeletePaymentModalComponent,
    EditPaymentModalComponent,
    LoginModalComponent,
    RegisterModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
