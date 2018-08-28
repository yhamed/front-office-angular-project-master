import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {AppDataService} from "./services/app-data.service";
import {ChartEntry} from "./domain/chartEntry";
import {Observable} from "rxjs/Rx";
import {UserService} from "./services/user.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy{
  constructor(private router: Router, private appData: AppDataService, private userService: UserService) {}
  fetch: boolean;
  articleNbr: number = 0;
  chart: ChartEntry[] = [];
  sumMoney: any = 0;
ngOnDestroy() {
    this.fetch = false;
}
ngOnInit() {
  // this.chart = JSON.parse(localStorage.getItem('chart'));
    this.fetch = true;
      Observable.interval ( 2000 ).subscribe ( x => {
        if (this.fetch && (localStorage.getItem('chart') !== '')) {
          this.chart = JSON.parse ( localStorage.getItem ( 'chart' ) );
          this.articleNbr = this.chart.length;
          this.sum();
        }
      } );
}
logout(){
this.userService.logout();
this.router.navigate(['/login']);
}
remove(item: ChartEntry) {
console.log("removed: "+ item.product.label);
  localStorage.setItem('chart',  JSON.stringify(this.chart.filter(e=> e !== item)));
  this.ngOnInit();
}
sum() {
  this.sumMoney = 0;
  this.chart.forEach(e=>{
    this.sumMoney+= (e.quantity*e.product.price);
  });
}
  redirectTo(path) {
    this.router.navigate([path]);
  }
}
