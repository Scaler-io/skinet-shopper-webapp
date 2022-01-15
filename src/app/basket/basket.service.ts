import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, map, Observable, Subscription } from 'rxjs';
import { environment as env } from 'src/environments/environment';
import { ProductToBasketItemMapper } from '../shared/mappers/product-to-basket-item.mapper';
import { Basket, IBasket, IBasketItem, IBasketTotal } from '../shared/models/basket';
import { IDeliveryMethod } from '../shared/models/deliveryMethod';
import { Product } from '../shared/models/product';

@Injectable({
  providedIn: 'root'
})
export class BasketService {
  private baseUrl: string = env.skinetCatalogApiBase;
  private basketSource: BehaviorSubject<IBasket> = new BehaviorSubject<IBasket>(null);
  basket$: Observable<IBasket> = this.basketSource.asObservable();
  private basketTotalSource: BehaviorSubject<IBasketTotal> = new BehaviorSubject<IBasketTotal>(null);
  basketTotal$: Observable<IBasketTotal> = this.basketTotalSource.asObservable();
  shipping:number = 0;


  constructor(private http: HttpClient,
    private toastr: ToastrService) { }

  
  setShippingPrice(deliveryMethod: IDeliveryMethod): void {
    this.shipping = deliveryMethod.price;
    this.calculateTotals();
  }

  getBasket(id: string): Observable<void> {
    return this.http.get<IBasket>(`${this.baseUrl}basket/${id}`)
      .pipe(
        map((basket: IBasket) => {
          this.basketSource.next(basket);
          this.calculateTotals();
        })
      )
  } 

  setBasket(basket: IBasket, showNotification: boolean = false): Subscription {
    return this.http.post<IBasket>(`${this.baseUrl}basket`, basket)
      .subscribe({
        next: (response: IBasket) => {
          this.basketSource.next(response);
          if(showNotification) this.toastr.success('Item added to basket');
          this.calculateTotals();
        },
        error: (error: any) => {
          this.toastr.error('Something went wrong', error.status);
          console.log(error)
        }
      })
  }

  getCurrentBasketValue(): IBasket {
    return this.basketSource.value;
  }

  addItemToBasket(item: Product, quantity: number = 1): void {
    const itemToAdd: IBasketItem = ProductToBasketItemMapper.map(item, quantity);
    const basket: IBasket = this.getCurrentBasketValue() ?? this.createBasket(); 
    basket.items = this.addOrUpdateItem(basket.items, quantity, itemToAdd);
    this.setBasket(basket, true);
  }

  increamentItemQuantity(item: IBasketItem): void {
    const basket: IBasket = this.getCurrentBasketValue();
    const index: number = basket.items.findIndex(i => i.id === item.id);
    basket.items[index].quantity++;
    this.setBasket(basket); 
  }

  decreamentItemQuantity(item: IBasketItem): void {
    const basket: IBasket = this.getCurrentBasketValue();
    const index: number = basket.items.findIndex(i => i.id === item.id);
    if(basket.items[index].quantity > 1) {
      basket.items[index].quantity--;
      this.setBasket(basket);
    }else{
      this.removeItemFromBasket(item);
    }
    this.setBasket(basket); 
  }
  
  removeItemFromBasket(item: IBasketItem): void {
    const basket: IBasket = this.getCurrentBasketValue();
    if(basket.items.some(i => i.id === item.id)){
      basket.items = basket.items.filter(i => i.id !== item.id);
      if(basket.items.length > 0){
        this.setBasket(basket);
      }else{
        this.deleteBasket(basket);
      }
    }
  }

  deleteBasket(basket: IBasket) {
    this.http.delete(`${this.baseUrl}basket/${basket.id}`)
      .subscribe({
        next: () => {
          localStorage.removeItem('basket_id');
          this.basketSource.next(null);
          this.basketTotalSource.next(null);
          location.reload();
        },
        error: (error: any) => {
          console.log(error);
          this.toastr.error('Something went wrong');
        }
      });
  }

  private calculateTotals() {
    const basket: IBasket = this.getCurrentBasketValue();
    const shipping: number = this.shipping;
    const subTotal: number = basket.items.reduce((acc, i) => (i.price * i.quantity) + acc, 0);
    const total: number = subTotal + shipping;
    this.basketTotalSource.next({shipping, subTotal, total});
  }

  private addOrUpdateItem(items: IBasketItem[], quantity: number, itemToAdd: IBasketItem): IBasketItem[] {
    const index: number = items.findIndex(i => i.id === itemToAdd.id);
    if(index === -1){
      itemToAdd.quantity = quantity;
      items.push(itemToAdd);
    }
    else
      items[index].quantity += quantity;
    
    return items;
  }

  private createBasket(): IBasket {
    const basket: IBasket = new Basket();
    localStorage.setItem('basket_id', basket.id);
    return basket;
  }
}


