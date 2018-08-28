import { Component, OnInit } from '@angular/core';
import {Product} from "../domain/product";
import {AppDataService} from "../services/app-data.service";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
products: Product[] = [];
  constructor(private appData: AppDataService) { }

  ngOnInit() {
    this.appData.getProducts().subscribe(e=> this.products = e.json());
  }

}
