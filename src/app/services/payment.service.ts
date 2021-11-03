import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Payment, PaymentCreate } from '../models/Payment';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  endpoint: string = 'https://localhost:5001/api/Payment'

  constructor(private http: HttpClient) { }

  getAllPayments(): Observable<Payment[]>{
    return this.http.get<Payment[]>(this.endpoint)
      .pipe(catchError(this.handleError))
  }

  getPaymentById(id: number): Observable<Payment> {
    const url = `${this.endpoint}/${id}`
    return this.http.get<Payment>(url)
      .pipe(catchError(this.handleError))
  }

  createPayment(pay: PaymentCreate) {
    return this.http.post<Payment>(this.endpoint, pay)
      .pipe(catchError(this.handleError))
  }

  updatePayment(id: number, pay: Payment) {
    const url = `${this.endpoint}/${id}`
    return this.http.put(url, pay)
      .pipe(catchError(this.handleError))
  }

  deletePaymentById(id: number) {
    const url = `${this.endpoint}/${id}`
    return this.http.delete(url)
      .pipe(catchError(this.handleError))
  }


  handleError(err: HttpErrorResponse) {
    let msg = ''
    if (err.error instanceof ErrorEvent) {
      // Client-side error
      msg = err.error.message
    } else {
      // Server-side
      console.log(err);
      
      msg = `Error Code: ${err.status}\nMessage: ${err.message}`
    }

    return throwError(msg)
  }
}
