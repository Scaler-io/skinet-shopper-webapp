import { Component, Input, OnInit, Output } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { BasketService } from 'src/app/basket/basket.service';
import { IBasket, IBasketItem } from '../../models/basket';

@Component({
  selector: 'skinet-basket-summary',
  templateUrl: './basket-summary.component.html',
  styleUrls: ['./basket-summary.component.scss']
})
export class BasketSummaryComponent implements OnInit {
  basket$: Observable<IBasket>;
  
  @Output() decreament: Subject<IBasketItem> = new Subject<IBasketItem>();
  @Output() increament: Subject<IBasketItem> = new Subject<IBasketItem>();
  @Output() remove: Subject<IBasketItem> = new Subject<IBasketItem>();
  @Input() isBasket: boolean = true;
 

  constructor(private basketService: BasketService) { }

  ngOnInit(): void {
    this.basket$ = this.basketService.basket$;
  }

  decreamentItemQuantity(item: IBasketItem): void {
    this.decreament.next(item);
  }

  increamentItemQuantity(item: IBasketItem): void{
    this.increament.next(item);
  }

  removeBasketItem(item: IBasketItem): void{
    this.remove.next(item);
  }

}
