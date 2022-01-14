import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment as env } from 'src/environments/environment';
import { IDeliveryMethod } from '../shared/models/deliveryMethod';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {
  baseUrl: string = env.skinetCatalogApiBaseV2;

  constructor(private http: HttpClient) { }

  getDeliveryMethods(): Observable<IDeliveryMethod[]> {
    return this.http.get<IDeliveryMethod[]>(`${this.baseUrl}order/deliveryMethods`).pipe(
      map((deliveryMethods: IDeliveryMethod[]) => {
        return deliveryMethods.sort( (a, b) => b.price - a.price);
      })
    )
  }
}
