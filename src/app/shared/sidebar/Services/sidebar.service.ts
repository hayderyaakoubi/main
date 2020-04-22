import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import * as jwt_decode from 'jwt-decode';
import {Configuration} from '../../config';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {
  private actionUrl: string;

  constructor(private http: HttpClient, private _configuration: Configuration) {
    this.actionUrl = this._configuration.ServerWithPort;
  }
  isLoggedIn() {
    return !!localStorage.getItem('token')
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
  getInfoAccount(accid: any) {
    return this.http.get(`${this.actionUrl}/account/${accid}`);
  }
}
