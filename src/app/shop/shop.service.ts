import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import {environment as env} from '../../environments/environment';
import { Brand } from '../shared/models/brand';
import { Pagination } from '../shared/models/pagination';
import { Product } from '../shared/models/product';
import { ProductType } from '../shared/models/productType';

@Injectable({
  providedIn: 'root'
})
export class ShopService {
  private baseUrl: string = env.skinetCatalogApiBase;

  constructor(private http: HttpClient) { }

  getProducts() : Observable<Pagination<Product>>{
    return this.http.get<Pagination<Product>>(this.baseUrl + 'product');
  }

  getBrands() : Observable<Brand[]> {
    return this.http.get<Brand[]>(this.baseUrl + 'brand');
  }

  getTypes() : Observable<ProductType[]> {
    return this.http.get<ProductType[]>(this.baseUrl + 'type');
  }
}
