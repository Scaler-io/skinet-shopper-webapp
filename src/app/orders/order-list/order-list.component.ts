import { Component, Input, OnInit } from '@angular/core';
import { IOrder } from 'src/app/shared/models/order';

@Component({
  selector: 'skinet-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss']
})
export class OrderListComponent implements OnInit {
  @Input() orders: IOrder[];

  constructor() { }

  ngOnInit(): void {}

}
