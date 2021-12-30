import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IBasket, IBasketItem } from '../shared/models/basket';
import { BasketService } from './basket.service';

@Component({
  selector: 'skinet-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss']
})
export class BasketComponent implements OnInit {
  basket$: Observable<IBasket>;
  
  constructor(private basketService: BasketService) { }

  ngOnInit(): void {
    this.basket$ = this.basketService.basket$;
  }

  onRemoveBasketItem(item: IBasketItem): void {
    this.basketService.removeItemFromBasket(item);
  }

  onIncrementItemQuantity(item: IBasketItem): void{
    this.basketService.increamentItemQuantity(item);
  } 

  onDecreamentItemQuantity(item: IBasketItem): void{
    this.basketService.decreamentItemQuantity(item);
  } 
}
