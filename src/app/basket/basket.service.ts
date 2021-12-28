import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, findIndex, map, Observable } from 'rxjs';
import { environment as env } from 'src/environments/environment';
import { ProductToBasketItemMapper } from '../shared/mappers/product-to-basket-item.mapper';
import { Basket, IBasket, IBasketItem } from '../shared/models/basket';
import { Product } from '../shared/models/product';

@Injectable({
  providedIn: 'root'
})
export class BasketService {
  private baseUrl = env.skinetCatalogApiBase;
  private basketSource = new BehaviorSubject<IBasket>(null);
  public basket$ = this.basketSource.asObservable();

  constructor(private http: HttpClient) { }

  getBasket(id: string) {
    return this.http.get<IBasket>(`${this.baseUrl}basket/${id}`)
      .pipe(
        map((basket: IBasket) => {
          this.basketSource.next(basket);
        })
      )
  } 

  setBasket(basket: IBasket) {
    return this.http.post<IBasket>(`${this.baseUrl}basket`, basket)
      .subscribe({
        next: (response: IBasket) => {
          this.basketSource.next(response);
          console.log(response);
        },
        error: (error: any) => console.log(error)
      })
  }

  getCurrentBasketValue() {
    return this.basketSource.value;
  }

  addItemToBasket(item: Product, quantity: number = 1) {
    const itemToAdd: IBasketItem = ProductToBasketItemMapper.map(item, quantity);
    const basket = this.getCurrentBasketValue() ?? this.createBasket(); 
    basket.items = this.addOrUpdateItem(basket.items, quantity, itemToAdd);
    this.setBasket(basket);
  }

  private addOrUpdateItem(items: IBasketItem[], quantity: number, itemToAdd: IBasketItem): IBasketItem[] {
    const index = items.findIndex(i => i.id === itemToAdd.id);
    if(index === -1){
      itemToAdd.quantity = quantity;
      items.push(itemToAdd);
    }
    else
      items[index].quantity += quantity;
    
    return items;
  }

  private createBasket(): IBasket {
    const basket = new Basket();
    localStorage.setItem('basket_id', basket.id);
    return basket;
  }
}


