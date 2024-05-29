import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { jwtDecode } from "jwt-decode";
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  baseUrl: string = 'https://note-sigma-black.vercel.app/api/v1/users';
  userLogin: BehaviorSubject<any> = new BehaviorSubject<any>(null)
  constructor(private _HttpClient: HttpClient,
    private _Router: Router
  ) { if (localStorage.getItem('LoginToken')) this.decodeToken() }
  signUp(data: any): Observable<any> {
    return this._HttpClient.post(`${this.baseUrl}/signUp`, data)
  }
  signIn(data: any): Observable<any> {
    return this._HttpClient.post(`${this.baseUrl}/signIn`, data)
  }
  setToken(token: string) {
    localStorage.setItem('LoginToken', `3b8ny__${token}`);
  }
  decodeToken() {
    const token = JSON.stringify(localStorage.getItem('LoginToken'));
    const decoded = jwtDecode(token);
    this.userLogin.next(decoded)
  }
  signOut() {
    localStorage.removeItem('LoginToken');
    this.userLogin.next(null)
    this._Router.navigate(['/login']);
  }
}
