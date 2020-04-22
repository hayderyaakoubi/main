import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import * as jwt_decode from 'jwt-decode';
import {Configuration} from '../../shared/config';


@Injectable()
export class AccountslistService {
  private actionUrl: string;

  constructor(private http: HttpClient, private _configuration: Configuration) {
    this.actionUrl = this._configuration.ServerWithPort;
  }

  /*getIdentity(): any {
    const token = localStorage.getItem('token');
    const decoded = jwt_decode(token);
    console.log('identity', decoded['identity']);
    return decoded['identity'];
  }
  getCustomerId() {
    const email = this.getIdentity();
    // console.log('DBname',email);
    return this.http.get(`${this.actionUrl}/account/${email}`);
  }
  getRule(id, accid: any) {
    return this.http.get(`${this.actionUrl}/rules/${id}/${accid}`);
  }/*
  /**getAccountsList(id: any) {
    return this.http.get(`${this.actionUrl}/accounts/${id}`);
  }

  addnewAccount(id, account: any) {
    return this.http.post(`${this.actionUrl}/accounts/${id}`, account);
  }
  validateEmail(email) {
    return this.http.get(`http://127.0.0.1:5000/ValidateMail/${email}`);
  }**/
  //newpassword(email) {
    //return this.http.get(`http://127.0.0.1:5000/newpassword/${email}`);
  //}
  //deleteAccount(id: any, email) {
    /*      let httpOptions = {
              headers: new HttpHeaders(
                  {
                  'Content-Type': 'application/json',
              }),
              data: {Email: email},
          };
  */
    // httpOptions.data.Email = email;
    // console.log(httpOptions.data);
    // return this.http.delete(`${this.actionUrl}/accounts/${id}`,email)
   // return this.http.delete(`${this.actionUrl}/accounts/${id}/${email}`);
  //}
  //getMonitorId(custId: any) {
    //return this.http.get(`${this.actionUrl}/monitor/${custId}`);
 // }

 // getAlerts(id: any) {
   // return this.http.get(`${this.actionUrl}/alerts/${id}`);
 // }
}
