import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { IDeliveryMethod } from 'src/app/shared/models/deliveryMethod';
import { CheckoutService } from '../checkout.service';

@Component({
  selector: 'skinet-checkout-delivery',
  templateUrl: './checkout-delivery.component.html',
  styleUrls: ['./checkout-delivery.component.scss']
})
export class CheckoutDeliveryComponent implements OnInit {
  @Input() checkoutForm: FormGroup;
  deliveryMethods: IDeliveryMethod[];

  constructor(private chackoutService: CheckoutService) { }

  ngOnInit(): void {
    this.chackoutService.getDeliveryMethods().subscribe({
      next: (dm: IDeliveryMethod[]) => this.deliveryMethods = dm,
      error: (error: any) => console.log(error)
    });
  }

}
