import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { NavigationExtras, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs';
import { BasketService } from 'src/app/basket/basket.service';
import { IBasket } from 'src/app/shared/models/basket';
import { IOrder, IOrderToCreate } from 'src/app/shared/models/order';
import { CheckoutService } from '../checkout.service';

@Component({
  selector: 'skinet-checkout-payment',
  templateUrl: './checkout-payment.component.html',
  styleUrls: ['./checkout-payment.component.scss']
})
export class CheckoutPaymentComponent implements OnInit {
  @Input() checkoutForm: FormGroup; 

  constructor(private basketService: BasketService,
    private checkoutService: CheckoutService,
    private toastr: ToastrService,
    private router: Router) { }

  ngOnInit(): void {

  }

  submitOrder(): void {
    const basket = this.basketService.getCurrentBasketValue();
    const orderToCreate = this.getOrderToCreate(basket);
    this.checkoutService.createOrder(orderToCreate).subscribe({
      next: (order: IOrder) => {
        this.toastr.success('Your order is placed successfully');
        this.basketService.deleteBasketLocally(basket.id);
        const navExtras: NavigationExtras = {state: order};
        this.router.navigate(['checkout/success'], navExtras);
      },
      error: (error: any) => {
        console.log(error);
        this.toastr.error(error.message);
      }
    });
  }

  private getOrderToCreate(basket: IBasket): IOrderToCreate {
    return {
      basketId: basket.id,
      deliveryMethodId: +this.checkoutForm.get('deliveryFormGroup').get('deliveryMethod').value,
      shippingAddress: this.checkoutForm.get('addressFormGroup').value
    }; 
  }

}
