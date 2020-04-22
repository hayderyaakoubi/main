import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import * as jwt_decode from 'jwt-decode';
import {Configuration} from '../../../shared/config';

@Injectable({
  providedIn: 'root'
})
export class ChangepasswordService {

  private actionUrl: string;

  constructor(private http: HttpClient, private _configuration: Configuration) {
    this.actionUrl = this._configuration.ServerWithPort;
  }
  confirmMail(token) {
    return this.http.get(`${this.actionUrl}/confirmMail/${token}`);

  }
  newPassword(email,password) {
    return this.http.post(`${this.actionUrl}/newpassword/${email}`,password);

  }
}
