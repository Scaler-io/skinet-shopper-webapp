import { Component, Input, OnInit } from '@angular/core';
import { IOrderItem } from 'src/app/shared/models/order';

@Component({
  selector: 'skinet-order-item',
  templateUrl: './order-item.component.html',
  styleUrls: ['./order-item.component.scss']
})
export class OrderItemComponent implements OnInit {
  @Input() orderItem: IOrderItem;

  constructor() { }

  ngOnInit(): void {
  }

}
