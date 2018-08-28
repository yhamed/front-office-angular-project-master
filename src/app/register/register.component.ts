import { Component, OnInit } from '@angular/core';
import {User} from "../domain/user";
import {AppDataService} from "../services/app-data.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
user: User = new User();
passwordC: string ;
emailFree: boolean;
  constructor(private appData:AppDataService, private router: Router) { }

  ngOnInit() {
  }
  log() {
    console.log(this.user);
  }
  checkEmail() {
    if (this.user.email!== '') {
      this.appData.checkUsername(this.user.email).subscribe((e:any) => {
        this.emailFree = e.json();
        if (e === false) {
          // this.toast.Info('Le nom d\'utilisateur est déja utilisé', 'Tanit');
        }
      });
    }
  }
  register() {
    this.appData.inscription(this.user).toPromise().then(e=> {
      this.router.navigate(['/login']);
    });
  }
  canSubmit() {
    return (!this.emailFree || (this.user.password !== this.passwordC));
  }

}
