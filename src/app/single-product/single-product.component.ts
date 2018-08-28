import {Component, Input, OnInit} from '@angular/core';
import {Product} from "../domain/product";
import {CHART} from "../services/auth.constant";
import {ChartEntry} from "../domain/chartEntry";

@Component({
  selector: 'app-single-product',
  templateUrl: './single-product.component.html',
  styleUrls: ['./single-product.component.css']
})
export class SingleProductComponent implements OnInit {
@Input() p : Product;
quantity: number;
  constructor() { }

  ngOnInit() {
    this.quantity = 0;
  }
inc() {
    if(this.quantity < this.p.quantity)
    this.quantity++;
}
dec() {
    if(this.quantity>1)
    this.quantity--;
}
pushToChart() {
    const entry: ChartEntry = new ChartEntry();
    entry.product = this.p;
    entry.quantity = this.quantity;
    CHART.push(entry);
    localStorage.setItem('chart', JSON.stringify(CHART));
    this.quantity = 0;
}
}
