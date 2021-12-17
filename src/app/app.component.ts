import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import {environment as env}  from "../environments/environment";
import { Pagination } from './shared/models/pagination';
import { Product } from './shared/models/product';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy{
  title = "skinet-shopper";
  catalogApiSubscription: Subscription;
  products: Product[];

  constructor(private http: HttpClient){}
  
  ngOnInit(): void {
    this.catalogApiSubscription = this.http.get(env.skinetCatalogApiBase+'/product?pageSize=50')
    .subscribe({
      next: (response: Pagination<Product>) => this.products = response.data,
      error: (error: any) => console.log(error)
    });
  }

  ngOnDestroy(): void {
    this.catalogApiSubscription.unsubscribe();
  }
  
}
