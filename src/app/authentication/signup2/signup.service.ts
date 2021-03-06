import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import * as jwt_decode from 'jwt-decode';


@Injectable()
export class SignupService {

  constructor(public http: HttpClient) {
    console.log('connected');
  }

  verifylogin(cred: any) {
    return this.http.post(`http://localhost:3000/api/user/signup`, cred);
  }
  isLoggedIn() {
    return !!localStorage.getItem('token');
  }

  logOut() {
    localStorage.removeItem('token');
    localStorage.clear();
  }
}
