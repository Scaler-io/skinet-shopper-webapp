import { Component, OnInit } from '@angular/core';
import { IOrder } from '../shared/models/order';
import { OrderService } from './order.service';

@Component({
  selector: 'skinet-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {
  orders: IOrder[];

  constructor(private orderService: OrderService) { }

  ngOnInit(): void {
    this.getOrderLists();
  }

  getOrderLists(): void{
    this.orderService.getOrdersForUser().subscribe({
      next: (orders: IOrder[]) => {
        this.orders = orders;
        console.log(orders);
      },
      error: (error: any) => console.log(error)
    });
  }
}
