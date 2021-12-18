import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import {environment as env} from '../../environments/environment';
import { Brand } from '../shared/models/brand';
import { Pagination } from '../shared/models/pagination';
import { Product } from '../shared/models/product';
import { ProductSpecParams } from '../shared/models/productSpecParams';
import { ProductType } from '../shared/models/productType';

@Injectable({
  providedIn: 'root'
})
export class ShopService {
  private baseUrl: string = env.skinetCatalogApiBase;

  constructor(private http: HttpClient) { }

  getProducts(productParams: ProductSpecParams) : Observable<Pagination<Product>>{
    let params: HttpParams = new HttpParams();
    
    if(productParams.brandId !== 0){
      params = params.append('brandId', productParams.brandId.toString());
    }

    if(productParams.typeId !== 0){
      params = params.append('typeId', productParams.typeId.toString());
    }

    if(productParams.search){
      params = params.append('search', productParams.search);
    }

    params = params.append('sort', productParams.sort);
    params = params.append('pageIndex', productParams.pageNumber.toString());
    params = params.append('pageSize', productParams.pageSize.toString());
    
    return this.http.get<Pagination<Product>>(this.baseUrl + 'product', {params});
  }

  getBrands() : Observable<Brand[]> {
    return this.http.get<Brand[]>(this.baseUrl + 'brand');
  }

  getTypes() : Observable<ProductType[]> {
    return this.http.get<ProductType[]>(this.baseUrl + 'type');
  }
}
