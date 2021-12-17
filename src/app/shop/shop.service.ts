import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import {environment as env} from '../../environments/environment';
import { Pagination } from '../shared/models/pagination';
import { Product } from '../shared/models/product';

@Injectable({
  providedIn: 'root'
})
export class ShopService {
  public baseUrl: string = env.skinetCatalogApiBase;

  constructor(private http: HttpClient) { }

  getProducts() : Observable<Pagination<Product>>{
    return this.http.get<Pagination<Product>>(this.baseUrl + 'product');
  }
}
