import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { BasketService } from 'src/app/basket/basket.service';
import { IBasketTotal } from '../../models/basket';

@Component({
  selector: 'skinet-order-summery',
  templateUrl: './order-summery.component.html',
  styleUrls: ['./order-summery.component.scss']
})
export class OrderSummeryComponent implements OnInit {
  basketTotal$: Observable<IBasketTotal>;

  constructor(private basketService: BasketService) { }

  ngOnInit(): void {
    this.basketTotal$ = this.basketService.basketTotal$;
  }

}
