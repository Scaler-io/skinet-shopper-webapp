import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrdersComponent } from './orders.component';
import { OrdersRoutingModule } from './orders-routing.module';
import { SharedModule } from '../shared/shared.module';
import { OrderListComponent } from './order-list/order-list.component';
import { OrderDetailsComponent } from './order-details/order-details.component';
import { OrderShippingAddressComponent } from './order-details/order-shipping-address/order-shipping-address.component';
import { OrderItemComponent } from './order-details/order-item/order-item.component';

@NgModule({
  declarations: [
    OrdersComponent,
    OrderListComponent,
    OrderDetailsComponent,
    OrderShippingAddressComponent,
    OrderItemComponent,
  ],
  imports: [
    CommonModule,
    OrdersRoutingModule,
    SharedModule,
  ]
})
export class OrdersModule { }
