import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {TOKEN_AUTH_PASSWORD, TOKEN_AUTH_USERNAME} from '../services/auth.constant';
import {TOKEN_NAME} from './auth.constant';
import {JwtHelper} from 'angular2-jwt';
import 'rxjs/Rx';

@Injectable()
export class AuthenticationService {
  static AUTH_TOKEN = 'oauth/token';
  accessToken: string;
  email: string;
  jwtHelper: JwtHelper = new JwtHelper();
  constructor(private http: Http) {
  }

  login(email: string, password: string) {
    const body = `username=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}&grant_type=password`;

    const headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    headers.append('Authorization', 'Basic ' + btoa(TOKEN_AUTH_USERNAME + ':' + TOKEN_AUTH_PASSWORD));

    return this.http.post(AuthenticationService.AUTH_TOKEN, body, {headers})
      .map(res => res.json())
      .map((res: any) => {
        if (res.access_token) {
          return res.access_token;
        }
        return null;
      });
  }

  Dologin(accessToken: string) {
    const decodedToken = this.jwtHelper.decodeToken(accessToken);

    this.accessToken = accessToken;
    console.log('******************');
    console.log('bearer: ' +this.accessToken);
    console.log('******************');
    console.log('decoded token: ');
    console.log(decodedToken);
    console.log('******************');
    localStorage.setItem(TOKEN_NAME, accessToken);

  }
  getLogedUser() {
    this.accessToken = localStorage.getItem(TOKEN_NAME);
    const decodedToken = this.jwtHelper.decodeToken(this.accessToken);
    this.email =  decodedToken.user_name;
    localStorage.setItem('mail', this.email);
  }
}
