import { HttpHeaders, HttpErrorResponse, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import jwtDecode from 'jwt-decode';

import { Login, Register, Jwt, AuthResponse } from '../models/Auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  endpoint: string = `https://localhost:5001/api/AuthManagement`;
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient) { }

  getCurrUserEmail() {
    console.log("Inside auth.service.getCurrUserEmail");
    let token = localStorage.getItem('app_token')
    console.log(`token: ${token}`);
    
    
    if (token) {
      let tokenInfo: Jwt = jwtDecode(token)
      console.log(`tokenInfo: ${tokenInfo}`);
      console.log(`tokenInfo.email: ${tokenInfo.email}`);
    return tokenInfo.email 
    } else {
      return ""
    }
  }

  getAuthorizationToken () {
    return localStorage.getItem('app_token')
  }

  setAuthorizationToken (token: string) {
    return localStorage.setItem('app_token', token)
  }

  signUp(user: Register): Observable<any>{
    const api = `${this.endpoint}/Register`;

    return this.http
    .post(api, user)
    .pipe( catchError(this.handleError) )
  }

  signIn(user: Login): Observable<any> {
    const api = `${this.endpoint}/Login`;

    return this.http
    .post(api, user)
    .pipe( catchError(this.handleError) )
  }

  signOut() {
    localStorage.removeItem('app_token')
  }

  handleError(err: HttpErrorResponse){
    console.log(err.error.errors);
    
    
    if(err.error.errors[0] === "Invalid login request") {
      return throwError(err.error.errors[0])
    } else if(err.error.errors[0] === "Email already in user") {
      return throwError("Email already in use")
    } else if(err.error.errors) {
      let errStr = err.error.errors.join('$')
      return throwError(errStr)
    } else if(err.error instanceof ErrorEvent)
      return throwError(err.error.message)
    else
      return throwError(`Server-side error code: ${err.status}\nMessage: ${err.message}`)
  }
}
