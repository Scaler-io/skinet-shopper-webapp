import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrdersComponent } from './orders.component';
import { OrdersRoutingModule } from './orders-routing.module';
import { SharedModule } from '../shared/shared.module';
import { OrderListComponent } from './order-list/order-list.component';


@NgModule({
  declarations: [
    OrdersComponent,
    OrderListComponent
  ],
  imports: [
    CommonModule,
    OrdersRoutingModule,
    SharedModule,
  ],
  exports: [
    // components
    OrderListComponent
  ]
})
export class OrdersModule { }
