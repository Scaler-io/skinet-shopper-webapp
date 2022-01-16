import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment as env } from 'src/environments/environment';
import { IOrder } from '../shared/models/order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  baseUrl: string = env.skinetCatalogApiBaseV2;

  constructor(private http: HttpClient) { }

  getOrdersForUser(): Observable<IOrder[]>{
    return this.http.get<IOrder[]>(this.baseUrl + 'order');
  }

  getOrderDetails(id: number): Observable<IOrder>{
    return this.http.get<IOrder>(this.baseUrl + `order/${id}`);
  }

}
