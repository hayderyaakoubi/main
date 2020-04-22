import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import * as jwt_decode from 'jwt-decode';
import {Configuration} from '../../shared/config';
import { PARAMETERS } from '@angular/core/src/util/decorators';

@Injectable({
  providedIn: 'root'
})
export class RulesService {

  private actionUrl: string;

  constructor(private http: HttpClient, private _configuration: Configuration) {
    this.actionUrl = this._configuration.ServerWithPort;
  }


  getIdentity(): any {
    const token = localStorage.getItem('token');
    const decoded = jwt_decode(token);
    console.log(decoded['email']);
    
    return decoded['email'];
  }

  getCustomerId(): any {
    const email = this.getIdentity();
    const token = localStorage.getItem('token');
    const decoded = jwt_decode(token);
    let params1 = new HttpParams().set("email", email);
    return this.http.get(`http://localhost:3000/api/user/getUser`, {params:params1} );
  }


  getRule(id, accid: any) {
    return this.http.get(`${this.actionUrl}/rules/${id}/${accid}`);
  }

  getInfoAccount(accid: any) {
    return this.http.get(`${this.actionUrl}/account/${accid}`);
  }

  updateRule(id, accid, rule: any) {
    return this.http.put(`${this.actionUrl}/rules/${id}/${accid}`, rule);

  }

  updateAccount(acc: any) {
    const email = this.getIdentity();
    const token = localStorage.getItem('token');
    const decoded = jwt_decode(token);
    //console.log(acc)
    return this.http.put(`http://localhost:3000/api/user/updateUser`, acc);
  }
  changePassword(email, passwords: any) {
    console.log(passwords);
    return this.http.post(`${this.actionUrl}/ChangePassword/pwd/${email}`, passwords
    );
  }
  getDBNAME(): any {
    const email = this.getIdentity();
    // console.log('DBname',email);
    return this.http.get(`${this.actionUrl}/account/${email}`);

  }
  getDaily(db: any) {
    return this.http.get(`${this.actionUrl}/influx/${db}/daily`);
  }

}
