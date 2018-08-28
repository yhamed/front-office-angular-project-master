import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from "../services/authentication.service";
import {Router} from "@angular/router";
import {User} from "../domain/user";
import {Credentials} from "../domain/credential";
import {UserService} from "../services/user.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
credentials: Credentials;
user: User;
  constructor(private authenticationService: AuthenticationService, private router: Router, private userService:UserService) { }

  ngOnInit() {
    this.userService.logout();
    this.credentials = new Credentials();
    this.user= new User();
  }

  login() {
    this.authenticationService.login (this.credentials.email, this.credentials.password).subscribe ( rslt => {
      if (rslt) {
        this.authenticationService.Dologin ( rslt );
        this.authenticationService.getLogedUser();
this.router.navigate(['/']);
      }
    } );

  }
  sendToRegister() {
    this.router.navigate(['register']);
  }
}
