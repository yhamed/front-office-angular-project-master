import { Component, OnInit } from '@angular/core';
import {ChartEntry} from "../domain/chartEntry";
import {AppDataService} from "../services/app-data.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
chart: ChartEntry[] = [];
  constructor(private appData: AppDataService, private router: Router) { }

  ngOnInit() {
    this.chart = JSON.parse(localStorage.getItem('chart'));
  }
  remove(item: ChartEntry) {
    console.log("removed: "+ item.product.label);
    localStorage.setItem('chart',  JSON.stringify(this.chart.filter(e=> e !== item)));
    this.ngOnInit();
  }
  cashout() {
    this.chart.forEach(e=>{
      this.appData.cashout(e.product, e.quantity).subscribe(e => console.log(e.json()));
      this.remove(e);
    });
this.router.navigate(['/']);
  }

}
