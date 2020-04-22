import { Injectable } from '@angular/core';
import * as jwt_decode from 'jwt-decode';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Configuration} from '../../../shared/config';

@Injectable({
  providedIn: 'root'
})
export class NewAccountService {

  private actionUrl: string;
  constructor(private http: HttpClient, private _configuration: Configuration) {
    this.actionUrl = this._configuration.ServerWithPort;
  }

  getIdentity(): any {
    const token = localStorage.getItem('token');
    const decoded = jwt_decode(token);
    console.log('identity', decoded['identity']);
    return decoded['identity'];
  }
  getCustomerId(): any {
    const email = this.getIdentity();
    // console.log('DBname',email);
    return this.http.get(`${this.actionUrl}/account/${email}`);
  }
  addnewAccount(id, account: any) {
    return this.http.post(`${this.actionUrl}/accounts/${id}`, account);
  }
  validateEmail(email) {
    return this.http.get(`${this.actionUrl}/validateMail/${email}`);
  }
}
