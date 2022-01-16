import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { BasketService } from 'src/app/basket/basket.service';
import { IBasketTotal } from '../../models/basket';
import { IOrder } from '../../models/order';

@Component({
  selector: 'skinet-order-summery',
  templateUrl: './order-summery.component.html',
  styleUrls: ['./order-summery.component.scss']
})
export class OrderSummeryComponent implements OnInit {
  basketTotal$: Observable<IBasketTotal>;
  @Input() isForCheckout: boolean = true;
  @Input() order: IOrder;
  
  constructor(private basketService: BasketService) { }

  ngOnInit(): void {
    if(this.isForCheckout){
      this.basketTotal$ = this.basketService.basketTotal$;
    }
  }

}
