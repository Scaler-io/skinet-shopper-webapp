import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IOrder } from 'src/app/shared/models/order';
import { BreadcrumbService } from 'xng-breadcrumb';
import { OrderService } from '../order.service';

@Component({
  selector: 'skinet-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss']
})
export class OrderDetailsComponent implements OnInit {
  order: IOrder;

  constructor(private route: ActivatedRoute,
    private breadcrumbService: BreadcrumbService,
    private orderService: OrderService) {
      this.breadcrumbService.set('@OrderDetailed', '')
    }

  ngOnInit(): void {
    this.loadOrderDeatails();
  }

  loadOrderDeatails(): void {
    const orderId = this.route.snapshot.params['id'];
    this.orderService.getOrderDetails(orderId).subscribe({
      next: (order: IOrder) => {
        this.order = order;         
        this.breadcrumbService.set('@OrderDetailed', `Order# ${order.id} - ${order.status}`);
      },
      error: (error: any) => console.log(error)
    });
  }

}
