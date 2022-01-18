import { Component, Input, OnInit } from '@angular/core';
import { IOrder } from 'src/app/shared/models/order';

@Component({
  selector: 'skinet-order-shipping-address',
  templateUrl: './order-shipping-address.component.html',
  styleUrls: ['./order-shipping-address.component.scss']
})
export class OrderShippingAddressComponent implements OnInit {
  @Input() order:IOrder;
  
  constructor() { }

  ngOnInit(): void {
  }

}
