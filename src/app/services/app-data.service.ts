import { Injectable } from '@angular/core';
import {AuthHttp, JwtHelper} from "angular2-jwt";
import {AuthenticationService} from "./authentication.service";
import {User} from "../domain/user";
import {TOKEN_NAME} from "./auth.constant";
import {UserService} from "./user.service";

@Injectable({
  providedIn: 'root'
})
export class AppDataService {
  jwtHelper: JwtHelper = new JwtHelper();
  constructor(private http: AuthHttp, private userService: UserService ) { }

  getProducts() {
    return this.http.get('/springjwt/product');
  }
  inscription(user) {
    return this.http.post('/springjwt/inscription', user);
  }
  checkUsername(username: string) {
    return this.http.get('/springjwt/user/username/' + username + '/');
  }
  cashout(product, quantity) {

    return this.http.post('/springjwt/cashout/'+quantity+'/'+localStorage.getItem('mail')+'/', product);
  }
}
