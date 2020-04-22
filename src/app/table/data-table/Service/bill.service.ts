import { Injectable } from '@angular/core';
import * as jwt_decode from 'jwt-decode';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Configuration} from '../../../shared/config';

@Injectable()
export class BillService {
  private actionUrl: string;

  constructor(private http: HttpClient,private _configuration: Configuration) {
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

  getMonitorId(custId: any) {
    return this.http.get(`${this.actionUrl}/monitor/${custId}`);
  }

  getBills(monitorid: any) {
    return this.http.get(`${this.actionUrl}/bills/${monitorid}`);
  }
  DeleteBill(monitorId, BillId) {
    return this.http.delete(`${this.actionUrl}/Delete_Bills/${monitorId}/${BillId}`);

  }
}
